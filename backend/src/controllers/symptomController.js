import { Op } from "sequelize";
import ai from "../services/geminiService.js";
import Institution from "../models/institutionModel.js";
import Patient from "../models/patientModel.js";
import User from "../models/userModel.js";

async function symptomChecker(req, res) {
    try {
        const { symptoms } = req.body;

        if (!symptoms || symptoms.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Please provide your symptoms."
            });
        }

        const patient = await Patient.findOne({
            where: {
                userId: req.user.id
            }
        });

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient profile not found."
            });
        }

        const prompt = `
You are MedAssist AI, an AI-powered symptom triage assistant.

Patient Symptoms:
${symptoms}

Respond ONLY in valid JSON.

{
  "possibleConditions": [],
  "urgency": "",
  "recommendedDepartment": "",
  "homeCare": "",
  "warning": "",
  "emergency": false
}

Rules:
- Do not diagnose with certainty.
- Give only 2-4 possible conditions.
- Urgency must be Low, Moderate or High.
- Recommend ONE specific specialized medical department (e.g. Cardiology, Orthopedics, Neurology, Gastroenterology, Pulmonology, Dermatology, ENT, Pediatrics, Gynecology, Nephrology, General Medicine, Psychiatry).
- NEVER set recommendedDepartment to "Emergency" or "Emergency Department". Always identify the actual specialized medical department (e.g. Cardiology for chest/heart pain, Orthopedics for bone/joint pain, Gastroenterology for stomach issues).
- Give short home care advice.
- If symptoms could indicate an emergency, set emergency=true.
- Do NOT return markdown or any extra text.
`;

        let responseText = "";
        const modelsToTry = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash", "gemini-flash-latest"];

        for (const modelName of modelsToTry) {
            try {
                const resGemini = await ai.models.generateContent({
                    model: modelName,
                    contents: prompt
                });
                if (resGemini && resGemini.text) {
                    responseText = resGemini.text;
                    break;
                }
            } catch (mErr) {
                console.warn(`Gemini Model ${modelName} call warning:`, mErr?.message || mErr);
            }
        }

        let parsed;

        if (responseText) {
            let cleanText = responseText
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();

            try {
                parsed = JSON.parse(cleanText);
            } catch (err) {
                console.error("Invalid JSON returned by Gemini:", cleanText);
                parsed = null;
            }
        }

        // Local Rule Triage Fallback if API key/quota or JSON parse fails
        if (!parsed) {
            const lowerSymptoms = symptoms.toLowerCase();
            let dept = "General Medicine";
            let conditions = ["Viral Infection", "General Fatigue"];
            let urgency = "Moderate";
            let isEmergency = false;

            if (lowerSymptoms.includes("chest") || lowerSymptoms.includes("heart") || lowerSymptoms.includes("breath")) {
                dept = "Cardiology";
                conditions = ["Cardiovascular Strain", "Angina Pectoris"];
                urgency = "High";
                isEmergency = lowerSymptoms.includes("severe") || lowerSymptoms.includes("sharp");
            } else if (lowerSymptoms.includes("stomach") || lowerSymptoms.includes("abdominal") || lowerSymptoms.includes("vomit") || lowerSymptoms.includes("nausea")) {
                dept = "Gastroenterology";
                conditions = ["Acute Gastritis", "Gastroenteritis", "Digestive Upset"];
                urgency = "Moderate";
            } else if (lowerSymptoms.includes("bone") || lowerSymptoms.includes("joint") || lowerSymptoms.includes("fracture") || lowerSymptoms.includes("knee") || lowerSymptoms.includes("back")) {
                dept = "Orthopedics";
                conditions = ["Joint Inflammation", "Musculoskeletal Strain", "Arthritis"];
                urgency = "Moderate";
            } else if (lowerSymptoms.includes("skin") || lowerSymptoms.includes("rash") || lowerSymptoms.includes("itch")) {
                dept = "Dermatology";
                conditions = ["Allergic Dermatitis", "Skin Irritation"];
                urgency = "Low";
            } else if (lowerSymptoms.includes("headache") || lowerSymptoms.includes("migraine") || lowerSymptoms.includes("dizzy")) {
                dept = "Neurology";
                conditions = ["Tension Headache", "Migraine", "Neuralgic Fatigue"];
                urgency = "Moderate";
            }

            parsed = {
                possibleConditions: conditions,
                urgency: urgency,
                recommendedDepartment: dept,
                homeCare: "Maintain adequate hydration, get bed rest, and monitor body vitals.",
                warning: "If symptoms persist beyond 48 hours or worsen unexpectedly, consult a medical specialist immediately.",
                emergency: isEmergency
            };
        }

        // Search verified hospitals & clinics STRICTLY matching specialized departments (excluding generic "Emergency")
        let hospitals = [];
        
        const deptTerms = [];
        if (parsed.recommendedDepartment && typeof parsed.recommendedDepartment === "string") {
            const cleanDept = parsed.recommendedDepartment.trim();
            if (!cleanDept.toLowerCase().includes("emergency")) {
                deptTerms.push(cleanDept);
                const words = cleanDept.split(/[\s,/-]+/).filter(w => w.length > 3 && !w.toLowerCase().includes("emergency"));
                words.forEach(w => {
                    if (!deptTerms.includes(w)) {
                        deptTerms.push(w);
                    }
                });
            }
        }

        // Filter out any "emergency" terms so we match specific departments like Cardiology, Orthopedics, etc.
        const filteredTerms = deptTerms.filter(t => !t.toLowerCase().includes("emergency"));

        if (filteredTerms.length > 0) {
            const orConditions = [];
            filteredTerms.forEach(term => {
                orConditions.push({ department: { [Op.iLike]: `%${term}%` } });
                orConditions.push({ services: { [Op.iLike]: `%${term}%` } });
            });

            hospitals = await Institution.findAll({
                where: {
                    verificationStatus: "verified",
                    [Op.or]: orConditions
                },
                include: [
                    {
                        model: User,
                        attributes: ["fullName", "phoneNumber", "email"]
                    }
                ]
            });
        }

        return res.status(200).json({
            success: true,
            assessment: parsed,
            hospitals
        });

    } catch (error) {
        console.error("Symptom Checker Error:", error);

        return res.status(500).json({
            success: false,
            message: "AI service failed. Please try again."
        });
    }
}

export { symptomChecker };