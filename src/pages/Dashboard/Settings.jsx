// src/pages/Dashboard/Settings.jsx
import { Settings, Save, Image as ImageIcon, X } from "lucide-react";
import { useState, useRef } from "react";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    instituteName: "Toppers Academy",
    contactEmail: "info@toppersacademy.edu",
    contactPhone: "+8801XXXXXXXXX",
    whatsappNumber: "+8801XXXXXXXXX",
    facebookLink: "https://facebook.com/toppersacademy",
    instagramLink: "https://instagram.com/toppersacademy",
    address: "123 Education Road, Dhaka, Bangladesh",
    maintenanceMode: false,
    locationMap:
      "https://maps.googleapis.com/maps/api/staticmap?center=23.8103,90.4125&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7C23.8103,90.4125&key=YOUR_API_KEY",
  });

  const [previewImage, setPreviewImage] = useState("");
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const removeImage = () => {
    setPreviewImage("");
    setSettings({
      ...settings,
      locationMap: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save settings logic here
    const finalSettings = {
      ...settings,
      locationMap: previewImage || settings.locationMap,
    };
    console.log("Saving settings:", finalSettings);
    alert("Settings saved successfully!");
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
        <Settings className="w-6 h-6 mr-2" />
        Institute Settings
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Institute Name*
            </label>
            <input
              type="text"
              name="instituteName"
              value={settings.instituteName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Email*
            </label>
            <input
              type="email"
              name="contactEmail"
              value={settings.contactEmail}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Phone*
            </label>
            <input
              type="tel"
              name="contactPhone"
              value={settings.contactPhone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              WhatsApp Number*
            </label>
            <input
              type="tel"
              name="whatsappNumber"
              value={settings.whatsappNumber}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Social Media Links */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Social Media Links
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Facebook Page URL
                </label>
                <div className="flex rounded-lg shadow-sm">
                  <span className="px-4 inline-flex items-center min-w-fit rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-sm text-gray-500">
                    fb.com/
                  </span>
                  <input
                    type="text"
                    name="facebookLink"
                    value={settings.facebookLink.replace(
                      "https://facebook.com/",
                      ""
                    )}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        facebookLink: `https://facebook.com/${e.target.value.replace(
                          "https://facebook.com/",
                          ""
                        )}`,
                      })
                    }
                    className="py-3 px-4 block w-full border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="yourpage"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instagram Profile URL
                </label>
                <div className="flex rounded-lg shadow-sm">
                  <span className="px-4 inline-flex items-center min-w-fit rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-sm text-gray-500">
                    instagram.com/
                  </span>
                  <input
                    type="text"
                    name="instagramLink"
                    value={settings.instagramLink.replace(
                      "https://instagram.com/",
                      ""
                    )}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        instagramLink: `https://instagram.com/${e.target.value.replace(
                          "https://instagram.com/",
                          ""
                        )}`,
                      })
                    }
                    className="py-3 px-4 block w-full border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="yourprofile"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Address*
            </label>
            <textarea
              name="address"
              value={settings.address}
              onChange={handleChange}
              rows="2"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>

          {/* Location Map */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location Map Image
            </label>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">
                      {previewImage || settings.locationMap
                        ? "Change Image"
                        : "Upload Map Screenshot"}
                    </span>
                    <span className="text-xs text-gray-500">
                      PNG, JPG up to 2MB
                    </span>
                  </div>
                </button>
              </div>

              <div className="flex-1">
                {(previewImage || settings.locationMap) && (
                  <div className="relative h-full min-h-[200px] border border-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={previewImage || settings.locationMap}
                      alt="Location Map"
                      className="w-full h-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-600 p-1 rounded-full shadow-sm"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Upload a screenshot of your Google Maps location or paste the
              Google Maps embed URL
            </p>
            <input
              type="text"
              name="locationMap"
              value={settings.locationMap}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg text-sm"
              placeholder="Or paste Google Maps image URL here"
            />
          </div>

          {/* Maintenance Mode */}
          <div className="md:col-span-2 mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={handleChange}
                className="rounded h-5 w-5 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">
                Maintenance Mode
              </span>
            </label>
            <p className="mt-1 text-xs text-gray-500">
              When enabled, the website will be temporarily unavailable to
              visitors.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Save className="w-5 h-5" />
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;
