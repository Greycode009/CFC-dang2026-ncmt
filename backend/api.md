# API Documentation for Frontend Development

Welcome to the API Documentation for the CFC Healthcare Platform backend. This document provides a complete guide for frontend developers integrating with the backend API endpoints.

---

## 📌 Base URL & Headers

- **Base URL**: `http://localhost:5000` *(or configured server port)*
- **Content-Type**: `application/json` (unless handling file uploads with `multipart/form-data`)

### Authentication Header
Endpoints requiring authentication must include the JWT token in the HTTP Authorization header:
```http
Authorization: Bearer <YOUR_JWT_TOKEN>
```

---

## 👥 User Roles & Access Control

| Role | Description |
| :--- | :--- |
| `patient` | Individual user seeking healthcare services, booking appointments, and managing medical records. |
| `institution` | Healthcare provider (Hospital or Clinic) managing appointments, verification status, and viewing patient records. |
| `admin` | Platform administrator approving or rejecting institution verification requests. |

---

## 📑 Table of Contents

1. [Authentication APIs (`/api/auth`)](#1-authentication-apis-apiauth)
2. [Patient Management APIs (`/api/patients`)](#2-patient-management-apis-apipatients)
3. [Institution Profile APIs (`/api/institutions`)](#3-institution-profile-apis-apiinstitutions)
4. [Hospital & Clinic Discovery (`/api/hospitals`)](#4-hospital--clinic-discovery-apihospitals)
5. [Appointments APIs (`/api/appointments`)](#5-appointments-apis-apiappointments)
6. [Medical Records APIs (`/api/medical-records`)](#6-medical-records-apis-apimedical-records)
7. [Admin Management APIs (`/api/admin`)](#7-admin-management-apis-apiadmin)
8. [File Storage & Static Assets (`/uploads`)](#8-file-storage--static-assets-uploads)

---

## 1. Authentication APIs (`/api/auth`)

### 1.1 Register User
- **Method**: `POST`
- **Endpoint**: `/api/auth/register`
- **Access**: Public
- **Request Body**:
```json
{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "9800000000",
  "password": "SecurePassword123",
  "confirmPassword": "SecurePassword123",
  "role": "patient"
}
```
*Note: `role` must be either `"patient"` or `"institution"`.*

- **Success Response (`201 Created`)**:
```json
{
  "message": "Registration successful.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "e4b6c891-628d-4e9a-9e12-87f54c9321ef",
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "9800000000",
    "role": "patient"
  }
}
```
- **Error Responses**:
  - `400 Bad Request`: `{ "message": "Please provide all required fields." }`
  - `400 Bad Request`: `{ "message": "Invalid role." }`
  - `400 Bad Request`: `{ "message": "Email or phone number already exists." }`
  - `400 Bad Request`: `{ "message": "Passwords do not match." }`

---

### 1.2 Login User
- **Method**: `POST`
- **Endpoint**: `/api/auth/login`
- **Access**: Public
- **Request Body**:
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePassword123"
}
```
- **Success Response (`200 OK`)**:
```json
{
  "message": "Login successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "e4b6c891-628d-4e9a-9e12-87f54c9321ef",
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "9800000000",
    "role": "patient",
    "profileCompleted": false
  }
}
```
- **Error Responses**:
  - `400 Bad Request`: `{ "message": "Email and password are required." }`
  - `401 Unauthorized`: `{ "message": "Invalid email or password." }`

---

## 2. Patient Management APIs (`/api/patients`)

### 2.1 Get Patient Profile
- **Method**: `GET`
- **Endpoint**: `/api/patients/profile`
- **Access**: Private (`patient` role)
- **Success Response (`200 OK`)**:
```json
{
  "message": "Patient profile fetched successfully",
  "patient": {
    "id": "c71a39f1-432d-4567-890a-bcdef1234567",
    "age": 28,
    "gender": "Male",
    "height": 175.5,
    "weight": 70.0,
    "bloodGroup": "O+",
    "allergies": "Penicillin",
    "chronicConditions": "Asthma",
    "currentMedications": "Albuterol Inhaler",
    "emergencyContactName": "Jane Doe",
    "emergencyContactNumber": "9811111111",
    "address": "Kathmandu, Nepal",
    "profileCompleted": true,
    "User": {
      "id": "e4b6c891-628d-4e9a-9e12-87f54c9321ef",
      "fullName": "John Doe",
      "email": "john.doe@example.com",
      "phoneNumber": "9800000000",
      "role": "patient"
    }
  }
}
```
- **Error Responses**:
  - `401 Unauthorized`: `{ "message": "Unauthorized" }`
  - `403 Forbidden`: `{ "message": "Access denied." }`
  - `404 Not Found`: `{ "message": "Patient profile not found" }`

---

### 2.2 Update Patient Profile
- **Method**: `PATCH`
- **Endpoint**: `/api/patients/profile`
- **Access**: Private (`patient` role)
- **Request Body**: *(All fields optional for partial updates)*
```json
{
  "fullName": "John Doe",
  "email": "john.updated@example.com",
  "phoneNumber": "9800000000",
  "age": 29,
  "gender": "Male",
  "height": 176.0,
  "weight": 72.5,
  "bloodGroup": "O+",
  "allergies": "None",
  "chronicConditions": "None",
  "currentMedications": "None",
  "emergencyContactName": "Jane Doe",
  "emergencyContactNumber": "9811111111",
  "address": "Lalitpur, Nepal"
}
```
*Enums:*
- `gender`: `"Male"` | `"Female"` | `"Other"`
- `bloodGroup`: `"A+"` | `"A-"` | `"B+"` | `"B-"` | `"AB+"` | `"AB-"` | `"O+"` | `"O-"`

- **Success Response (`200 OK`)**:
```json
{
  "message": "Patient profile updated successfully",
  "user": { ... },
  "patient": { ... }
}
```
- **Error Responses**:
  - `400 Bad Request`: `{ "message": "Email or phone number already exists." }`

---

## 3. Institution Profile APIs (`/api/institutions`)

### 3.1 Get Institution Profile
- **Method**: `GET`
- **Endpoint**: `/api/institutions/profile`
- **Access**: Private (`institution` role)
- **Success Response (`200 OK`)**:
```json
{
  "message": "Institution profile fetched successfully",
  "institution": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "institutionType": "hospital",
    "registrationNumber": "REG-123456",
    "province": "Bagmati",
    "district": "Kathmandu",
    "municipality": "Kathmandu Metropolitan",
    "fullAddress": "Ward No. 10, New Baneshwor",
    "department": "Cardiology, Neurology, Pediatrics",
    "services": "24/7 Emergency, ICU, Lab Tests",
    "openingTime": "08:00 AM",
    "closingTime": "08:00 PM",
    "beds": "150",
    "noOfDoctor": 45,
    "authPersonName": "Dr. Ram Sharma",
    "authPersonNumber": "9841234567",
    "profileCompleted": true,
    "verificationStatus": "verified",
    "User": {
      "id": "b9876543-210f-edcba-9876-543210fedcba",
      "fullName": "City General Hospital",
      "email": "info@cityhospital.com",
      "phoneNumber": "014200000",
      "role": "institution"
    }
  }
}
```

---

### 3.2 Update Institution Profile
- **Method**: `PATCH`
- **Endpoint**: `/api/institutions/profile`
- **Access**: Private (`institution` role)
- **Request Body**:
```json
{
  "fullName": "City General Hospital",
  "email": "info@cityhospital.com",
  "phoneNumber": "014200000",
  "institutionType": "hospital",
  "registrationNumber": "REG-123456",
  "province": "Bagmati",
  "district": "Kathmandu",
  "municipality": "Kathmandu Metropolitan",
  "fullAddress": "Ward No. 10, New Baneshwor",
  "department": "Cardiology, Neurology, Pediatrics",
  "services": "24/7 Emergency, ICU, Lab Tests",
  "openingTime": "08:00 AM",
  "closingTime": "08:00 PM",
  "beds": "200",
  "noOfDoctor": 50,
  "authPersonName": "Dr. Ram Sharma",
  "authPersonNumber": "9841234567"
}
```
*Enum:* `institutionType`: `"hospital"` | `"clinic"`

- **Success Response (`200 OK`)**:
```json
{
  "message": "Institution profile updated successfully",
  "institution": { ... },
  "user": { ... }
}
```

---

### 3.3 Request Verification
- **Method**: `POST`
- **Endpoint**: `/api/institutions/request-verification`
- **Access**: Private (`institution` role)
- **Description**: Submits institution for admin verification after profile completion.
- **Success Response (`200 OK`)**:
```json
{
  "message": "Verification request submitted successfully."
}
```
- **Error Responses**:
  - `400 Bad Request`: `{ "message": "Complete your profile before requesting verification." }`
  - `400 Bad Request`: `{ "message": "Verification request is already pending." }`
  - `400 Bad Request`: `{ "message": "Institution is already verified." }`

---

## 4. Hospital & Clinic Discovery (`/api/hospitals`)

### 4.1 Get Verified Hospitals / Clinics
- **Method**: `GET`
- **Endpoint**: `/api/hospitals`
- **Access**: Public
- **Success Response (`200 OK`)**:
```json
{
  "hospitals": [
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "institutionType": "hospital",
      "district": "Kathmandu",
      "municipality": "Kathmandu Metropolitan",
      "department": "Cardiology, Neurology",
      "services": "Emergency, OPD",
      "verificationStatus": "verified",
      "User": {
        "fullName": "City General Hospital",
        "email": "info@cityhospital.com",
        "phoneNumber": "014200000"
      }
    }
  ]
}
```

---

### 4.2 Search Hospitals
- **Method**: `GET`
- **Endpoint**: `/api/hospitals/search`
- **Access**: Public
- **Query Parameters**:
  - `district` (string, optional)
  - `municipality` (string, optional)
  - `department` (string, optional - partial match)
  - `services` (string, optional - partial match)
- **Example Request**: `/api/hospitals/search?district=Kathmandu&department=Cardiology`
- **Success Response (`200 OK`)**:
```json
{
  "count": 1,
  "hospitals": [ ... ]
}
```

---

### 4.3 Get Hospital Details by ID
- **Method**: `GET`
- **Endpoint**: `/api/hospitals/:id`
- **Access**: Public
- **Path Parameters**: `id` (UUID of Institution)
- **Success Response (`200 OK`)**:
```json
{
  "hospital": { ... }
}
```
- **Error Response (`404 Not Found`)**: `{ "message": "Hospital not found." }`

---

## 5. Appointments APIs (`/api/appointments`)

### 5.1 Book Appointment
- **Method**: `POST`
- **Endpoint**: `/api/appointments`
- **Access**: Private (`patient` role)
- **Request Body**:
```json
{
  "institutionId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "appointmentDate": "2026-08-15",
  "appointmentTime": "10:30 AM",
  "reason": "General Health Checkup & Consultation"
}
```
- **Success Response (`201 Created`)**:
```json
{
  "message": "Appointment booked successfully.",
  "appointment": {
    "id": "f5e4d3c2-b1a0-9876-5432-10fedcba9876",
    "patientId": "c71a39f1-432d-4567-890a-bcdef1234567",
    "institutionId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "appointmentDate": "2026-08-15",
    "appointmentTime": "10:30 AM",
    "reason": "General Health Checkup & Consultation",
    "status": "pending",
    "createdAt": "2026-08-01T10:45:00.000Z"
  }
}
```
- **Error Responses**:
  - `400 Bad Request`: `{ "message": "Please provide all required fields." }`
  - `400 Bad Request`: `{ "message": "Complete your profile before booking an appointment." }`
  - `400 Bad Request`: `{ "message": "Institution is not verified." }`

---

### 5.2 Get Patient's Appointments
- **Method**: `GET`
- **Endpoint**: `/api/appointments/my`
- **Access**: Private (`patient` role)
- **Success Response (`200 OK`)**:
```json
{
  "appointments": [
    {
      "id": "f5e4d3c2-b1a0-9876-5432-10fedcba9876",
      "appointmentDate": "2026-08-15",
      "appointmentTime": "10:30 AM",
      "reason": "General Health Checkup",
      "status": "pending",
      "Institution": {
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "institutionType": "hospital",
        "User": {
          "fullName": "City General Hospital",
          "phoneNumber": "014200000"
        }
      }
    }
  ]
}
```

---

### 5.3 Cancel Appointment (Patient)
- **Method**: `PATCH`
- **Endpoint**: `/api/appointments/:id/cancel`
- **Access**: Private (`patient` role)
- **Path Parameters**: `id` (UUID of Appointment)
- **Success Response (`200 OK`)**:
```json
{
  "message": "Appointment cancelled.",
  "appointment": { ... }
}
```
- **Error Responses**:
  - `400 Bad Request`: `{ "message": "Only pending appointments can be cancelled." }`
  - `403 Forbidden`: `{ "message": "You are not authorized to cancel this appointment." }`

---

### 5.4 Get Institution's Appointments
- **Method**: `GET`
- **Endpoint**: `/api/appointments/institution`
- **Access**: Private (`institution` role)
- **Success Response (`200 OK`)**:
```json
{
  "appointments": [
    {
      "id": "f5e4d3c2-b1a0-9876-5432-10fedcba9876",
      "appointmentDate": "2026-08-15",
      "appointmentTime": "10:30 AM",
      "reason": "General Health Checkup",
      "status": "pending",
      "Patient": {
        "id": "c71a39f1-432d-4567-890a-bcdef1234567",
        "age": 28,
        "gender": "Male",
        "User": {
          "fullName": "John Doe",
          "phoneNumber": "9800000000"
        }
      }
    }
  ]
}
```

---

### 5.5 Accept Appointment (Institution)
- **Method**: `PATCH`
- **Endpoint**: `/api/appointments/:id/accept`
- **Access**: Private (`institution` role)
- **Path Parameters**: `id` (UUID of Appointment)
- **Success Response (`200 OK`)**:
```json
{
  "message": "Appointment accepted.",
  "appointment": { ... }
}
```

---

### 5.6 Reject Appointment (Institution)
- **Method**: `PATCH`
- **Endpoint**: `/api/appointments/:id/reject`
- **Access**: Private (`institution` role)
- **Path Parameters**: `id` (UUID of Appointment)
- **Success Response (`200 OK`)**:
```json
{
  "message": "Appointment rejected.",
  "appointment": { ... }
}
```

---

### 5.7 Complete Appointment (Institution)
- **Method**: `PATCH`
- **Endpoint**: `/api/appointments/:id/complete`
- **Access**: Private (`institution` role)
- **Path Parameters**: `id` (UUID of Appointment)
- **Success Response (`200 OK`)**:
```json
{
  "message": "Appointment completed.",
  "appointment": { ... }
}
```

---

## 6. Medical Records APIs (`/api/medical-records`)

### 6.1 Upload Medical Record
- **Method**: `POST`
- **Endpoint**: `/api/medical-records`
- **Access**: Private (`patient` role)
- **Content-Type**: `multipart/form-data`
- **Form Data Fields**:
  - `title` (text, required): e.g., `"Blood Test Report"`
  - `recordType` (text, required): One of `"Prescription"`, `"Lab Report"`, `"X-Ray"`, `"MRI"`, `"CT Scan"`, `"Vaccination"`, `"Discharge Summary"`, `"Other"`
  - `description` (text, optional): e.g., `"Fasting blood sugar test result"`
  - `medicalRecord` (file, required): Image (`.png`, `.jpg`, `.jpeg`, `.webp`) or PDF (`.pdf`), max size 10MB.

- **Success Response (`201 Created`)**:
```json
{
  "message": "Medical record uploaded successfully.",
  "record": {
    "id": "11223344-5566-7788-9900-aabbccddeeff",
    "patientId": "c71a39f1-432d-4567-890a-bcdef1234567",
    "title": "Blood Test Report",
    "recordType": "Lab Report",
    "description": "Fasting blood sugar test result",
    "fileUrl": "uploads\\1722510000000-blood-test.pdf",
    "createdAt": "2026-08-01T10:46:00.000Z"
  }
}
```

---

### 6.2 Get Patient's Own Medical Records
- **Method**: `GET`
- **Endpoint**: `/api/medical-records/my`
- **Access**: Private (`patient` role)
- **Success Response (`200 OK`)**:
```json
{
  "records": [
    {
      "id": "11223344-5566-7788-9900-aabbccddeeff",
      "title": "Blood Test Report",
      "recordType": "Lab Report",
      "fileUrl": "uploads\\1722510000000-blood-test.pdf",
      "description": "Fasting blood sugar test result",
      "createdAt": "2026-08-01T10:46:00.000Z"
    }
  ]
}
```

---

### 6.3 Update Medical Record Info
- **Method**: `PATCH`
- **Endpoint**: `/api/medical-records/:id`
- **Access**: Private (`patient` role)
- **Path Parameters**: `id` (UUID of Medical Record)
- **Request Body**:
```json
{
  "title": "Updated Title",
  "recordType": "Lab Report",
  "description": "Updated description text"
}
```
- **Success Response (`200 OK`)**:
```json
{
  "message": "Medical record updated successfully.",
  "record": { ... }
}
```

---

### 6.4 Delete Medical Record
- **Method**: `DELETE`
- **Endpoint**: `/api/medical-records/:id`
- **Access**: Private (`patient` role)
- **Path Parameters**: `id` (UUID of Medical Record)
- **Success Response (`200 OK`)**:
```json
{
  "message": "Medical record deleted successfully."
}
```

---

### 6.5 Get Patient Records by Institution
- **Method**: `GET`
- **Endpoint**: `/api/medical-records/patient/:patientId`
- **Access**: Private (`institution` role)
- **Path Parameters**: `patientId` (UUID of Patient)
- **Success Response (`200 OK`)**:
```json
{
  "records": [ ... ]
}
```

---

## 7. Admin Management APIs (`/api/admin`)

### 7.1 Get All Institutions
- **Method**: `GET`
- **Endpoint**: `/api/admin/institutions`
- **Access**: Private (`admin` role)
- **Success Response (`200 OK`)**:
```json
{
  "message": "Institutions fetched successfully.",
  "institutions": [ ... ]
}
```

---

### 7.2 Get Pending Verification Requests
- **Method**: `GET`
- **Endpoint**: `/api/admin/institutions/pending`
- **Access**: Private (`admin` role)
- **Success Response (`200 OK`)**:
```json
{
  "message": "Pending institutions fetched successfully.",
  "institutions": [ ... ]
}
```

---

### 7.3 Approve & Verify Institution
- **Method**: `PATCH`
- **Endpoint**: `/api/admin/institutions/:id/verify`
- **Access**: Private (`admin` role)
- **Path Parameters**: `id` (UUID of Institution)
- **Success Response (`200 OK`)**:
```json
{
  "message": "Institution verified successfully.",
  "institution": { ... }
}
```

---

### 7.4 Reject Institution Verification
- **Method**: `PATCH`
- **Endpoint**: `/api/admin/institutions/:id/reject`
- **Access**: Private (`admin` role)
- **Path Parameters**: `id` (UUID of Institution)
- **Success Response (`200 OK`)**:
```json
{
  "message": "Institution rejected successfully.",
  "institution": { ... }
}
```

---

## 8. File Storage & Static Assets (`/uploads`)

- **Base URL for static files**: `http://localhost:5000/uploads/`
- **Example Usage**: When a `fileUrl` returned from the API is `"uploads/1722510000000-file.pdf"`, you can render or download it at:
  `http://localhost:5000/uploads/1722510000000-file.pdf`

---

## 💡 Frontend Integration Best Practices

1. **Authentication Token Storage**: Store the returned `token` securely in `localStorage` or `sessionStorage`. Include it as `Bearer <token>` in headers for all non-public requests.
2. **Form Data Uploads**: Use `FormData` object when uploading medical records (`/api/medical-records`), setting the `Content-Type` header automatically with boundary.
3. **Role Checks**: Always check `user.role` from the login response to conditionally render patient, institution, or admin dashboards.
4. **Profile Completion Gate**: Check `user.profileCompleted` or `patient.profileCompleted` / `institution.profileCompleted` before allowing users to book appointments or request institution verification.
