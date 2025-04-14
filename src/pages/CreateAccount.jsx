import React, { useState, useEffect } from "react";
import { Country, State } from "country-state-city";
import { apiPost } from "../utils/apiHelper";
import "../styles/createAccount.css";

const CreateAccount = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    user_name: "",
    password: "",
    country: "",
    city: "",
  });

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (formData.country) {
      const stateList = State.getStatesOfCountry(formData.country);
      setCities(stateList);
      setFormData((prev) => ({ ...prev, city: "" }));
    }
  }, [formData.country]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await apiPost("auth/sign-up", formData);
      if (result.success) {
        alert("Account created successfully!");
        if (onSubmit) onSubmit(formData);
      } else {
        alert(result.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred during signup.");
    }
  };

  return (
    <div className="create-account-container">
      <form onSubmit={handleSubmit} className="create-account-form">
        <h2 className="form-title">Create Account</h2>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">City</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="">Select City</option>
              {cities.map((item) => (
                <option key={item.isoCode} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="submit-button-wrapper text-right mt-6">
          <button type="submit" className="submit-button w-full">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;
