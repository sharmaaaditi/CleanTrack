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

  return(
    <form className="report-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <lable htmlFor="report-name">
          Your Name <span ClassName="required">*</span>
        </lable>
         <input
          type="text"
          id="report-name"
          className={`form-input ${errors.name ? "error" : ""}`}
          placeholder="e.g. Chirag Sharma"
          value={fields.name}
          onChange={(e) => set("name", e.target.value)}
        />
        {errors.name && <span className="error-text">{errors.name}</span> }
      </div>

      <div className="form-section">
        <h3 className="form-section-title">
          <span className="section-icon"></span> Location Details
        </h3>

        <div className="form-row">
          <div className="form-group">
            <lable htmlform="report-country">
              country<span className = "required">*</span>
            </lable>

            <select
              id="report-country"
              className={`form-select ${errors.country ? "error" : ""}`}
              value={fields.country}
              onChange={(e) => set("country", e.target.value)}
              disabled={loading.countries}
            >
              <option value="">
                {loading.countries ? "Loading..." : "— Select country —"}
              </option>
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {errors.country && <span className="error-text">{errors.country}</span>}

          </div>

          <div className="form-group">
            <label htmlFor="report-state">
              State <span className="required">*</span>
            </label>
            <select
              id="report-state"
              className={`form-select ${errors.state ? "error" : ""}`}
              value={fields.state}
              onChange={(e) => set("state", e.target.value)}
              disabled={!fields.country || loading.states}
            >
              <option value="">
                {loading.states
                  ? "Loading..."
                  : !fields.country
                  ? " Select country first "
                  : states.length === 0
                  ? " No states found "
                  : " Select state "}
              </option>
              {states.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {errors.state && <span className="error-text">{errors.state}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="report-city">
              City<span className="required">*</span>
            </label>
            <select
              id="report-city"
              className={`form-select ${errors.city ? "error" : ""}`}
              value={fields.city}
              onChange={(e) => set("city", e.target.value)}
              disabled={!fields.state || loading.cities}
            >
              <option value="">
                {loading.cities
                  ? "Loading..."
                  : !fields.state
                  ? " Select state first "
                  : cities.length === 0
                  ? " No cities found "
                  : " Select city "}
              </option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {errors.city && <span className="error-text">{errors.city}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="report-area">Area / Locality</label>
            <input
              type="text"
              id="report-area"
              className="form-input"
              placeholder="e.g. Sector 15, Vasundhara"
              value={fields.area}
              onChange={(e) => set("area", e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="report-location-details">Location Details (optional)</label>
          <input
            type="text"
            id="report-location-details"
            className="form-input"
            placeholder="e.g. Near main market, opposite SBI bank"
            value={fields.locationDetails}
            onChange={(e) => set("locationDetails", e.target.value)}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="report-issue-type">
            Issue Type <span className="required">*</span>
          </label>
          <select
            id="report-issue-type"
            className={`form-select ${errors.issueType ? "error" : ""}`}
            value={fields.issueType}
            onChange={(e) => set("issueType", e.target.value)}
          >
            <option value="">— Select type —</option>
            {ISSUE_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.issueType && <span className="error-text">{errors.issueType}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="report-severity">
            Severity <span className="required">*</span>
          </label>
          <select
            id="report-severity"
            className={`form-select ${errors.severity ? "error" : ""}`}
            value={fields.severity}
            onChange={(e) => set("severity", e.target.value)}
          >
            <option value="">— Select severity —</option>
            {SEVERITY_LEVELS.map((l) => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>
          {errors.severity && <span className="error-text">{errors.severity}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="report-description">
          Description <span className="required">*</span>
        </label>
        <textarea
          id="report-description"
          className={`form-textarea ${errors.description ? "error" : ""}`}
          placeholder="Describe the issue — since when, how widespread, any health risk..."
          rows="5"
          value={fields.description}
          onChange={(e) => set("description", e.target.value)}
        />
        <div className="char-count">{fields.description.length} / 1000</div>
        {errors.description && <span className="error-text">{errors.description}</span>}
      </div>

      <div className="form-group">
        <label>Image Proof (optional)</label>
        {!imagePreview ? (
          <div className="image-upload-area">
            <input
              type="file"
              id="report-image"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input-hidden"
            />
            <label htmlFor="report-image" className="image-upload-label">
              <span className="upload-icon">📷</span>
              <span className="upload-text">Click to upload or drag & drop</span>
              <span className="upload-hint">PNG, JPG up to 5MB</span>
            </label>
          </div>
        ) : (
          <div className="image-preview-container">
            <img src={imagePreview} alt="preview" className="image-preview" />
            <button type="button" className="remove-image-btn" onClick={removeImage}>
              ✕ Remove
            </button>
          </div>
        )}
      </div>

      <button type="submit" className="btn-submit" disabled={submitting}>
        {submitting ? <><span className="spinner" /> Submitting...</> : "Submit Report"}
      </button>
    </form>
  );
}


export default ReportForm;