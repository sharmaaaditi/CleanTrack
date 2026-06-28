import { useState, useEffect } from "react";

const API_BASE = "https://countriesnow.space/api/v0.1";

const ISSUE_TYPES = [
  "Garbage Dumping",
  "Plastic Waste",
  "Water Pollution",
  "Air Pollution",
  "Industrial Pollution",
  "Waste Burning",
  "Sewage / Drainage",
  "Deforestation",
  "Noise Pollution",
  "Illegal Construction",
  "Road Damage",
  "Stray Animals",
  "Streetlight Issue",
  "Other",
];

const SEVERITY_LEVELS = [
  { value: "Low"},      
  { value: "Medium"},   
  { value: "High"},     
  { value: "Critical"}, ,
];

function ReportForm({ onSubmit }) {
  const [fields, setFields] = useState({
    name: "",
    country: "",
    state: "",
    city: "",
    area: "",
    locationDetails: "",
    issueType: "",
    severity: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [loading, setLoading] = useState({
    countries: true,
    states: false,
    cities: false,
  });

  const set = (key, val) => {
    setFields((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  // fetch countries on mount
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/countries/positions`);
        const data = await res.json();
        if (!data.error && data.data) {
          setCountries(data.data.map((c) => c.name).sort((a, b) => a.localeCompare(b)));
          return;
        }
        throw new Error("primary failed");
      } catch {
        // fallback endpoint
        try {
          const res = await fetch(`${API_BASE}/countries`);
          const data = await res.json();
          if (!data.error && data.data) {
            setCountries(data.data.map((c) => c.country).sort((a, b) => a.localeCompare(b)));
          }
        } catch (err) {
          console.error("couldn't load countries:", err);
        }
      } finally {
        setLoading((prev) => ({ ...prev, countries: false }));
      }
    };
    load();
  }, []);
  
  useEffect(() => {
    if (!fields.country){
        setStates([]);
        setCities([]);
        set ("State", "");
        set ("City", "");
        return;
    }
    const load = async() => {
        setLoading((prev) => ({...prev, states:true}));
        set("State", "");
        set("City", "");
        setCities([]);

        try{
            
        }
    }
  }
 
}



export default ReportForm;