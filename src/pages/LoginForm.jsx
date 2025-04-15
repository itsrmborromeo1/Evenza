import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../utils/apiHelper";
import "../styles/LoginForm.css";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { user_name } = values;
    try {
      const response = await apiPost("auth/login", values);
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("username", user_name);
        setTimeout(() => {
          navigate("/dashboard", { state: { user_name } });
        }, 3000);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("Login failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="e-login-wrapper">
      <div className="e-login-container">
        <div className="e-form-container">
          <h2 className="login-title-a">Welcome</h2>
          <p className="sub-title-a">Please input details</p>

          <Form
            name="login-form"
            onFinish={onFinish}
            layout="vertical"
            initialValues={{ user_name: "" }}
          >
            <Form.Item label="Username" name="user_name" className="mb-4">
              <Input
                placeholder="Enter your username"
                disabled={loading}
                className="input-field"
              />
            </Form.Item>

            <Form.Item label="Password" name="password" className="mb-4">
              <Input.Password
                placeholder="Enter your password"
                disabled={loading}
                className="input-field"
              />
            </Form.Item>

            <Form.Item className="mb-4">
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                className="btn-login"
              >
                Login
              </Button>
            </Form.Item>

            <div className="register-link">
              <p className="text-sm">Don't have an account?</p>
              <Button type="link" onClick={() => navigate("/create-account")}>
                Register here
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
