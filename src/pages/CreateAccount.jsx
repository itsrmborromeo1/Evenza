import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { Country, State } from "country-state-city";
import "../styles/createAccount.css";

const { Option } = Select;

const CreateAccount = () => {
  const [form] = Form.useForm();
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  const handleCountryChange = (code) => {
    setSelectedCountry(code);
    const states = State.getStatesOfCountry(code);
    setCities(states);
    form.setFieldsValue({ city: "" });
  };

  const handleSubmit = (values) => {
    console.log("Form Submitted:", values);
  };

  return (
    <div className="create-account-wrapper">
      <div className="create-account-container">
        <h2 className="form-title">Create Account</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="create-account-form"
        >
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please enter your full name" }]}
          >
            <Input className="form-input" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input className="form-input" />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter a username" }]}
          >
            <Input className="form-input" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter a password" }]}
          >
            <Input.Password className="form-input" />
          </Form.Item>

          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: "Please select a country" }]}
          >
            <Select
              showSearch
              placeholder="Select country"
              optionFilterProp="children"
              onChange={handleCountryChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
              className="form-input"
            >
              {countries.map((c) => (
                <Option key={c.isoCode} value={c.isoCode}>
                  {c.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="City/State"
            name="city"
            rules={[{ required: true, message: "Please select a city" }]}
          >
            <Select
              placeholder="Select city"
              className="form-input"
              disabled={!selectedCountry}
            >
              {cities.map((s) => (
                <Option key={s.isoCode} value={s.name}>
                  {s.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" className="submit-button">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateAccount;
