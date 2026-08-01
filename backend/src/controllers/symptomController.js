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
- Recommend ONE medical department.
- Give short home care advice.
- If symptoms could indicate an emergency, set emergency=true.
- Do NOT return markdown or any extra text.
`;

        const response = await ai.models.generateContent({
            model: "gemini-flash-latest",
            contents: prompt
        });

        let text = response.text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        let parsed;

        try {
            parsed = JSON.parse(text);
        } catch (err) {
            console.error("Invalid JSON returned by Gemini:");
            console.log(text);

            return res.status(500).json({
                success: false,
                message: "AI returned an invalid response."
            });
        }

        // Search verified hospitals with matching department
        const hospitals = await Institution.findAll({
            where: {
                verificationStatus: "verified",
                department: {
                    [Op.iLike]: `%${parsed.recommendedDepartment}%`
                }
            },
            include: [
                {
                    model: User,
                    attributes: ["fullName", "phoneNumber", "email"]
                }
            ]
        });

        return res.status(200).json({
            success: true,
            assessment: parsed,
            hospitals
        });

    } catch (error) {
        console.error("Symptom Checker Error:", error);

        return res.status(500).json({
            success: false,
            message: "AI service failed."
        });
    }
}

export { symptomChecker };