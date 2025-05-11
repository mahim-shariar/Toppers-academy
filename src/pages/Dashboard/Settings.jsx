// src/pages/Dashboard/Settings.jsx
import { Settings, Save } from "lucide-react";
import { useState } from "react";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    instituteName: "Toppers Academy",
    contactEmail: "info@toppersacademy.edu",
    contactPhone: "+8801XXXXXXXXX",
    address: "123 Education Road, Dhaka, Bangladesh",
    maintenanceMode: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save settings logic here
    alert("Settings saved successfully!");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <Settings className="w-6 h-6 mr-2" />
        Institute Settings
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Institute Name
            </label>
            <input
              type="text"
              name="instituteName"
              value={settings.instituteName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Email
            </label>
            <input
              type="email"
              name="contactEmail"
              value={settings.contactEmail}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Phone
            </label>
            <input
              type="text"
              name="contactPhone"
              value={settings.contactPhone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={settings.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="maintenanceMode"
              checked={settings.maintenanceMode}
              onChange={handleChange}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Maintenance Mode</span>
          </label>
          <p className="mt-1 text-xs text-gray-500">
            When enabled, the website will be temporarily unavailable to
            visitors.
          </p>
        </div>

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;