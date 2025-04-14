import { useNavigate } from "react-router-dom";
import LoginForm from "../login/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl p-8 bg-white rounded-2xl shadow-2xl flex justify-center">
        <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
