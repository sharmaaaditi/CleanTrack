# 🌱 CleanTrack — Waste & Pollution Reporting Platform

## 📌 Overview

**CleanTrack** is a community-driven waste and pollution reporting platform that allows users to report environmental issues such as garbage dumping, plastic waste, overflowing dustbins, polluted open spaces, and waste burning incidents.

The platform helps users submit structured reports with location, description, severity level, status, and image proof. It is designed to encourage public participation in keeping local surroundings cleaner, safer, and more environmentally responsible.

---

## 🎯 Purpose

The purpose of CleanTrack is to provide a simple digital solution for reporting and tracking local pollution-related issues.

This project demonstrates:

* Dynamic form handling
* Component-based frontend development
* Browser-based data storage using `localStorage`
* Interactive dashboard creation
* Search and filter functionality
* Status tracking for submitted reports
* Responsive UI design

---

## 🚀 Core Features

### 🗑️ Issue Reporting

Users can report different types of environmental issues, including:

* Garbage dumping
* Plastic waste
* Waste burning
* Overflowing dustbins
* Polluted open spaces
* Other local cleanliness issues

Each report includes:

* Reporter name
* Issue type
* Location
* Description
* Severity level
* Image proof
* Report status
* Submission date

---

### 📊 Reports Dashboard

CleanTrack includes a dashboard where all submitted reports are displayed in an organized way.

Dashboard features:

* View all submitted reports
* Display issue details with image preview
* Track report status
* View severity level
* Delete reports
* Update report progress

---

### 🔍 Search and Filter

Users can manage reports easily using:

* Search by location
* Filter by issue type
* Filter by severity
* Filter by status

This makes it easier to find important reports and track serious pollution issues quickly.

---

### 🔄 Status Management

Each report can be tracked using three status levels:

* **Pending**
* **In Progress**
* **Resolved**

Status updates are saved in the browser, so changes remain available even after refreshing the page.

---

### 🖼️ Image Preview

Users can upload an image while submitting a report.
The uploaded image is previewed and saved with the report data to provide visual proof of the issue.

---

## 🌍 Environmental Impact

CleanTrack promotes awareness about:

* Waste management
* Plastic pollution
* Air pollution caused by waste burning
* Public cleanliness
* Community participation
* Environmental responsibility

The project encourages users to take action by reporting local pollution problems instead of ignoring them.

---

## 🛠️ Technologies Used

* React.js
* JavaScript ES6+
* HTML5
* CSS3
* Tailwind CSS
* React Router DOM
* React Hooks

  * `useState`
  * `useEffect`
* Browser `localStorage`
* FileReader API

---

## ⚙️ Project Structure

```txt
src/
 ├── components/
 │    ├── Navbar.jsx
 │    ├── Hero.jsx
 │    ├── Stats.jsx
 │    ├── ReportForm.jsx
 │    ├── ReportCard.jsx
 │    ├── ReportList.jsx
 │    └── Footer.jsx
 │
 ├── pages/
 │    ├── Home.jsx
 │    ├── Report.jsx
 │    └── Dashboard.jsx
 │
 ├── App.jsx
 ├── main.jsx
 └── index.css
```

---

## 🧠 How CleanTrack Works

1. User opens the CleanTrack website.
2. User clicks on **Report Issue**.
3. User fills in the issue details.
4. User uploads an optional image proof.
5. The report is saved in browser `localStorage`.
6. The dashboard displays all submitted reports.
7. User can search, filter, update status, or delete reports.
8. Updated data remains saved after page refresh.

---

## 📦 Installation & Setup

### Clone the repository

```bash
git clone https://github.com/sharmaaaditi/CleanTrack.git
```

### Go to the project folder

```bash
cd CleanTrack
```

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

### Open in browser

```txt
http://localhost:5173
```

---

## 💾 Data Storage

CleanTrack uses browser `localStorage` to store report data.

Example report object:

```js
{
  id: Date.now(),
  name: "User Name",
  issueType: "Plastic Waste",
  location: "Near college gate",
  description: "Plastic bottles dumped near the road.",
  severity: "High",
  status: "Pending",
  image: "Uploaded image data",
  date: "30/05/2026"
}
```

No backend or database is required for the basic version.

---

## 🚀 Future Improvements

Possible future upgrades:

* User authentication
* Admin dashboard
* Backend database integration
* Google Maps location picker
* Live location detection
* Report verification system
* NGO or municipality contact support
* Dark mode

---

## 🌐 Deployment

This project can be deployed on platforms like **Vercel** or **Netlify**.

---

## 🏁 Conclusion

**CleanTrack** is a practical frontend project that solves a real-world environmental problem. It allows users to report and track waste-related issues through a clean, responsive, and interactive interface.

The project demonstrates important frontend development concepts such as form handling, state management, conditional rendering, localStorage data persistence, image preview, filtering, searching, and responsive UI design.

CleanTrack shows how technology can support cleaner communities and encourage responsible environmental action.
