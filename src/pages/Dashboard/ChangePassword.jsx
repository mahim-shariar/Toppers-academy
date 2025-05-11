// src/pages/Dashboard/ChangePassword.jsx
import { Lock, Save } from "lucide-react";
import { useState } from "react";

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value,
    });
    // Clear error when typing
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validate = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!passwords.currentPassword) {
      newErrors.currentPassword = "Current password is required";
      valid = false;
    }

    if (!passwords.newPassword) {
      newErrors.newPassword = "New password is required";
      valid = false;
    } else if (passwords.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
      valid = false;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Change password logic here
      alert("Password changed successfully!");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <Lock className="w-6 h-6 mr-2" />
        Change Password
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6 max-w-lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handleChange}
              className={`w-full p-2 border ${
                errors.currentPassword ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
            />
            {errors.currentPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.currentPassword}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleChange}
              className={`w-full p-2 border ${
                errors.newPassword ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
            />
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleChange}
              className={`w-full p-2 border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Save className="w-5 h-5 mr-2" />
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;