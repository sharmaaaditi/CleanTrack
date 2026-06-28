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
  { value: "Critical"}, 
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

// fetch states when country change
  useEffect(() => {
    if (!fields.country) {
      setStates([]);
      setCities([]);
      set("state", "");
      set("city", "");
      return;
    }

    const load = async () => {
      setLoading((prev) => ({ ...prev, states: true }));
      set("state", "");
      set("city", "");
      setCities([]);

      try {
        const res = await fetch(`${API_BASE}/countries/states`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country: fields.country }),
        });
        const data = await res.json();
        const list = data?.data?.states ?? [];
        setStates(list.map((s) => s.name).sort((a, b) => a.localeCompare(b)));
      } catch (err) {
        console.error("couldn't load states:", err);
        setStates([]);
      } finally {
        setLoading((prev) => ({ ...prev, states: false }));
      }
    };
    load();
  }, [fields.country]);

  // fetch cities when states changes
  useEffect(() => {
    if (!fields.country || !fields.state) {
      setCities([]);
      set("city", "");
      return;
    }

    const load = async () => {
      setLoading((prev) => ({ ...prev, cities: true }));
      set("city", "");

      try {
        const res = await fetch(`${API_BASE}/countries/state/cities`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country: fields.country, state: fields.state }),
        });
        const data = await res.json();
        const list = data?.data ?? [];
        setCities([...list].sort((a, b) => a.localeCompare(b)));
      } catch (err) {
        console.error("couldn't load cities:", err);
        setCities([]);
      } finally {
        setLoading((prev) => ({ ...prev, cities: false }));
      }
    };
    load();
  }, [fields.state, fields.country]);

  const handelImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Image should be under 5MB");
      return;
  }
  setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const validate = () => {
    const e = {};
    if (!fields.name.trim()) e.name = "Name is required";
    if (!fields.country)     e.country = "Country is required";
    if (!fields.state)       e.state = "State is required";
    if (!fields.city)        e.city = "City is required";
    if (!fields.issueType)   e.issueType = "Issue type is required";
    if (!fields.severity)    e.severity = "Severity is required";
    if (!fields.description.trim()) {
      e.description = "Description is required";
    } else if (fields.description.trim().length < 10) {
      e.description = "At least 10 characters please";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

   const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setTimeout(() => {
      onSubmit({
        ...fields,
        name: fields.name.trim(),
        area: fields.area.trim(),
        locationDetails: fields.locationDetails.trim(),
        description: fields.description.trim(),
        image: imagePreview ?? null,
      });
      setSubmitting(false);
    }, 800);
  };

  return{
    
  }



}

export default ReportForm;