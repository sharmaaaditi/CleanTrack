# 🌱 CleanTrack — Community Waste & Pollution Reporting Platform

## 📌 Overview

CleanTrack is a community-driven waste and pollution reporting platform that empowers citizens to report environmental issues in their local areas. The platform helps users identify, document, and track problems such as garbage dumping, plastic waste, overflowing dustbins, waste burning, and polluted public spaces.

By providing structured reporting and tracking mechanisms, CleanTrack encourages community participation in maintaining cleaner and healthier environments.

---

## 🎯 Problem Statement

Improper waste disposal and pollution remain significant challenges in many communities. Citizens often lack a simple and centralized platform to report environmental issues and monitor their resolution.

CleanTrack aims to bridge this gap by providing an accessible digital platform where users can report, track, and manage environmental concerns efficiently.

---

## 🚀 Key Features

### 🗑️ Waste & Pollution Reporting

Users can report:

* Garbage Dumping
* Plastic Waste
* Waste Burning
* Overflowing Dustbins
* Polluted Open Spaces
* Other Environmental Issues

Each report includes:

* Reporter Name
* Issue Type
* Location
* Description
* Severity Level
* Image Proof
* Status Tracking
* Submission Date

---

### 📊 Reports Dashboard

A centralized dashboard provides an overview of all submitted reports.

Features:

* View all reports
* Track issue status
* Display uploaded images
* Manage report progress
* Delete reports
* Monitor environmental issues efficiently

---

### 🔍 Search & Filter System

Users can quickly find reports using:

* Search by Location
* Filter by Issue Type
* Filter by Severity
* Filter by Status

---

### 🔄 Status Tracking

Each report can be tracked through multiple stages:

* Pending
* In Progress
* Resolved

This helps users understand the current progress of reported issues.

---

### 🖼️ Image Upload & Preview

Users can upload image evidence while reporting issues.

Benefits:

* Visual proof of environmental problems
* Improved report credibility
* Better issue assessment

---

### 💾 Persistent Data Storage

The current MVP uses browser LocalStorage to persist report data.

Benefits:

* No backend required for initial version
* Data remains available after page refresh
* Fast development and testing

---

## 🌍 Environmental Impact

CleanTrack promotes:

* Waste Management Awareness
* Plastic Pollution Reduction
* Cleaner Public Spaces
* Community Participation
* Environmental Responsibility

The platform encourages citizens to actively contribute toward cleaner and more sustainable communities.

---

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript (ES6+)
* HTML5
* CSS3
* Tailwind CSS
* React Router DOM

### React Features

* React Hooks

  * useState
  * useEffect

### Storage

* Browser LocalStorage

### Browser APIs

* FileReader API

### Future Backend

* FastAPI
* PostgreSQL
* REST APIs

### Future Analytics

* Power BI
* Tableau

### Future AI Integration

* Python
* YOLOv8
* Waste Classification Models

---

## ⚙️ Project Structure

```text
src/

├── assets/
│
├── components/
│   ├── common/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   │
│   ├── report/
│   │   ├── ReportForm.jsx
│   │   ├── ReportCard.jsx
│   │   └── ReportList.jsx
│   │
│   └── dashboard/
│       ├── StatsCard.jsx
│       └── FilterBar.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Report.jsx
│   ├── Dashboard.jsx
│   └── About.jsx
│
├── services/
├── hooks/
├── utils/
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🧠 How It Works

1. User visits the CleanTrack platform.
2. User selects **Report Issue**.
3. User fills in issue details.
4. User uploads an image proof (optional).
5. Report is stored in LocalStorage.
6. Dashboard displays all submitted reports.
7. Users can search, filter, update, or delete reports.
8. Data remains available after page refresh.

---

## 📦 Installation & Setup

### Clone Repository

```bash
git clone https://github.com/sharmaaaditi/CleanTrack.git
```

### Navigate to Project Directory

```bash
cd CleanTrack
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Open Browser

```text
http://localhost:5173
```

---

## 📈 Future Vision

CleanTrack aims to evolve into a civic-tech platform that enables collaboration between:

* Citizens
* Municipal Authorities
* NGOs
* Educational Institutions
* Smart City Initiatives

The long-term goal is to create data-driven environmental monitoring and reporting systems that improve urban cleanliness and sustainability.

---

## 🌐 Deployment

The application can be deployed using:

* Vercel
* Netlify

---

## 🏁 Conclusion

CleanTrack demonstrates how technology can help communities identify, report, and track environmental issues effectively. The project combines modern frontend development practices with a real-world social impact problem and lays the foundation for future AI-powered and data-driven environmental solutions.
