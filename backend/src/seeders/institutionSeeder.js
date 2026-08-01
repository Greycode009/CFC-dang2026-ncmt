import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import Institution from "../models/institutionModel.js";

const demoInstitutions = [
  {
    fullName: "Nepalgunj Medical College Teaching Hospital",
    email: "info@nmcth.edu.np",
    phoneNumber: "+977-81-520123",
    institutionType: "hospital",
    registrationNumber: "NMA-2080-REG-1092",
    province: "Lumbini Province",
    district: "Banke",
    municipality: "Nepalgunj Sub-Metropolitan",
    fullAddress: "BP Chowk, Ward No. 2, Nepalgunj, Banke",
    department: "Cardiology, General Surgery, Orthopedics, Pediatrics, Neurology, ICU, Emergency",
    services: "24/7 Casualty & Emergency, CT Scan, MRI, Digital X-Ray, Blood Bank, Automated Pathology Lab, Ambulance Service",
    openingTime: "08:00 AM",
    closingTime: "08:00 PM",
    beds: 350,
    noOfDoctor: 45,
    authPersonName: "Dr. Rajesh Sharma (Medical Director)",
    authPersonNumber: "9858023456"
  },
  {
    fullName: "Dang Apex Hospital & Trauma Center",
    email: "info@dangapex.org.np",
    phoneNumber: "+977-82-560111",
    institutionType: "hospital",
    registrationNumber: "NMA-2081-DANG-204",
    province: "Lumbini Province",
    district: "Dang",
    municipality: "Ghorahi Sub-Metropolitan",
    fullAddress: "Ratna Road, Ward No. 15, Ghorahi, Dang",
    department: "Orthopedics, General Surgery, Emergency, ICU, Physiotherapy",
    services: "24/7 Trauma Emergency, Joint Replacement, Digital X-Ray, ICU Support, Ambulance Service",
    openingTime: "08:00 AM",
    closingTime: "08:00 PM",
    beds: 110,
    noOfDoctor: 18,
    authPersonName: "Dr. Prakash Chand (Medical Superintendent)",
    authPersonNumber: "9857822334"
  },
  {
    fullName: "Tulsipur City Heart & Diabetes Care",
    email: "heart.tulsipur@gmail.com",
    phoneNumber: "+977-82-520555",
    institutionType: "clinic",
    registrationNumber: "NMA-2080-CARD-991",
    province: "Lumbini Province",
    district: "Dang",
    municipality: "Tulsipur Sub-Metropolitan",
    fullAddress: "BP Chowk, Ward No. 5, Tulsipur, Dang",
    department: "Cardiology, Endocrinology, Internal Medicine",
    services: "Echocardiogram (ECHO), ECG, Diabetes Screening, Holter Monitoring, OPD Consultations",
    openingTime: "09:00 AM",
    closingTime: "06:00 PM",
    beds: 15,
    noOfDoctor: 5,
    authPersonName: "Dr. Bishnu Prasad Gautam (Cardiologist)",
    authPersonNumber: "9847811223"
  },
  {
    fullName: "Kohalpur Regional Children & Maternity Hospital",
    email: "info@kohalpurpediatrics.np",
    phoneNumber: "+977-81-540333",
    institutionType: "hospital",
    registrationNumber: "NMA-2079-PED-332",
    province: "Lumbini Province",
    district: "Banke",
    municipality: "Kohalpur Municipality",
    fullAddress: "Near New Bus Park, Ward No. 11, Kohalpur, Banke",
    department: "Pediatrics, Neonatology, NICU, Gynecology & Obstetrics",
    services: "24/7 NICU Support, High-Risk Delivery Unit, Pediatric Emergency, Routine Immunization",
    openingTime: "08:00 AM",
    closingTime: "08:00 PM",
    beds: 75,
    noOfDoctor: 14,
    authPersonName: "Dr. Sunita Shrestha (Senior Pediatrician)",
    authPersonNumber: "9803456789"
  },
  {
    fullName: "Rapti Specialized Eye & Laser Hospital",
    email: "eyecare@rapti.org.np",
    phoneNumber: "+977-82-561222",
    institutionType: "hospital",
    registrationNumber: "NMA-2081-EYE-402",
    province: "Lumbini Province",
    district: "Dang",
    municipality: "Ghorahi Sub-Metropolitan",
    fullAddress: "Tulsipur Chowk, Ward No. 10, Ghorahi, Dang",
    department: "Ophthalmology, Cornea, Cataract & Refractive Surgery",
    services: "Laser Cataract Phaco Surgery, Glaucoma Clinic, Retina Evaluation, Computerized Refraction",
    openingTime: "09:00 AM",
    closingTime: "05:30 PM",
    beds: 30,
    noOfDoctor: 6,
    authPersonName: "Dr. Roshan Giri (Ophthalmic Director)",
    authPersonNumber: "9857898765"
  },
  {
    fullName: "Nepalgunj Gastro & Endoscopy Care",
    email: "gastro.care@gmail.com",
    phoneNumber: "+977-81-529000",
    institutionType: "clinic",
    registrationNumber: "NMA-2080-GASTRO-309",
    province: "Lumbini Province",
    district: "Banke",
    municipality: "Nepalgunj Sub-Metropolitan",
    fullAddress: "Karkando, Ward No. 18, Nepalgunj, Banke",
    department: "Gastroenterology, Hepatology, Gastro Surgery",
    services: "Upper GI Endoscopy, Colonoscopy, Liver Function Testing, Polypectomy, GI Cancer Screening",
    openingTime: "10:00 AM",
    closingTime: "06:00 PM",
    beds: 10,
    noOfDoctor: 4,
    authPersonName: "Dr. Prakash Karki (Gastroenterologist)",
    authPersonNumber: "9848011223"
  },
  {
    fullName: "Kathmandu Central Neuro & Spine Institute",
    email: "contact@ktmneuro.org.np",
    phoneNumber: "+977-1-4420111",
    institutionType: "hospital",
    registrationNumber: "NMA-2078-NEURO-001",
    province: "Bagmati Province",
    district: "Kathmandu",
    municipality: "Kathmandu Metropolitan",
    fullAddress: "Maharajgunj, Ward No. 3, Kathmandu",
    department: "Neurosurgery, Spine Surgery, Neurology, Stroke ICU",
    services: "Brain Tumor Resection, Minimally Invasive Spine Surgery, 24/7 Stroke Management, MRI 3T",
    openingTime: "08:00 AM",
    closingTime: "08:00 PM",
    beds: 200,
    noOfDoctor: 35,
    authPersonName: "Dr. Upendra Devkota Foundation (Admin Board)",
    authPersonNumber: "9851012345"
  },
  {
    fullName: "Gandaki Medical Center & Research Institute",
    email: "info@gandakimedical.np",
    phoneNumber: "+977-61-532222",
    institutionType: "hospital",
    registrationNumber: "NMA-2079-GEN-882",
    province: "Gandaki Province",
    district: "Kaski",
    municipality: "Pokhara Metropolitan",
    fullAddress: "Prithvi Chowk, Ward No. 9, Pokhara, Kaski",
    department: "General Medicine, Cardiology, Dermatology, Nephrology, Dialysis",
    services: "24/7 Hemodialysis Unit, Critical Care Unit, Comprehensive Diagnostics, Pathology Lab",
    openingTime: "08:00 AM",
    closingTime: "08:00 PM",
    beds: 180,
    noOfDoctor: 28,
    authPersonName: "Dr. Ramesh Gurung (Medical Director)",
    authPersonNumber: "9856012890"
  },
  {
    fullName: "Chitwan Cancer & Surgical Care Hospital",
    email: "info@chitwancancer.org.np",
    phoneNumber: "+977-56-524100",
    institutionType: "hospital",
    registrationNumber: "NMA-2080-ONCO-504",
    province: "Bagmati Province",
    district: "Chitwan",
    municipality: "Bharatpur Metropolitan",
    fullAddress: "Cancer Hospital Road, Ward No. 7, Bharatpur, Chitwan",
    department: "Medical Oncology, Surgical Oncology, Radiation Therapy, Chemotherapy",
    services: "PET-CT Scan, Chemotherapy Infusion Center, Radiation Therapy, Palliative Care Unit",
    openingTime: "08:30 AM",
    closingTime: "06:30 PM",
    beds: 150,
    noOfDoctor: 22,
    authPersonName: "Dr. Bina Adhikari (Oncology Department Head)",
    authPersonNumber: "9855011999"
  },
  {
    fullName: "Dang Women's Health & IVF Clinic",
    email: "ivf.dang@gmail.com",
    phoneNumber: "+977-82-562999",
    institutionType: "clinic",
    registrationNumber: "NMA-2081-GYNE-611",
    province: "Lumbini Province",
    district: "Dang",
    municipality: "Ghorahi Sub-Metropolitan",
    fullAddress: "Bank Road, Ward No. 14, Ghorahi, Dang",
    department: "Gynecology, Obstetrics, IVF & Fertility",
    services: "Infertility Consultations, 4D Fetal Ultrasound, Laparoscopic Surgery, Antenatal Care",
    openingTime: "09:00 AM",
    closingTime: "06:00 PM",
    beds: 20,
    noOfDoctor: 6,
    authPersonName: "Dr. Manisha Rijal (Gynecologist)",
    authPersonNumber: "9857844332"
  }
];

async function seedInstitutions() {
  try {
    const hashedPassword = await bcrypt.hash("Password123!", 10);

    for (const item of demoInstitutions) {
      let user = await User.findOne({ where: { email: item.email } });
      if (!user) {
        user = await User.create({
          fullName: item.fullName,
          email: item.email,
          phoneNumber: item.phoneNumber,
          password: hashedPassword,
          role: "institution"
        });
      } else {
        user.fullName = item.fullName;
        user.phoneNumber = item.phoneNumber;
        await user.save();
      }

      let inst = await Institution.findOne({ where: { userId: user.id } });
      const instData = {
        userId: user.id,
        institutionType: item.institutionType,
        registrationNumber: item.registrationNumber,
        province: item.province,
        district: item.district,
        municipality: item.municipality,
        fullAddress: item.fullAddress,
        department: item.department,
        services: item.services,
        openingTime: item.openingTime,
        closingTime: item.closingTime,
        beds: item.beds,
        noOfDoctor: item.noOfDoctor,
        authPersonName: item.authPersonName,
        authPersonNumber: item.authPersonNumber,
        profileCompleted: true,
        verificationStatus: "verified"
      };

      if (!inst) {
        await Institution.create(instData);
      } else {
        await inst.update(instData);
      }
    }
    console.log("Successfully seeded 10 real institutions across Nepal (Nepalgunj, Dang, etc.)!");
  } catch (err) {
    console.error("Failed seeding institutions:", err);
  }
}

export default seedInstitutions;
