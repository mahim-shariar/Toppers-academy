// src/pages/Dashboard/TeachersManagement.jsx
import {
  GraduationCap,
  Plus,
  Search,
  Edit,
  Trash2,
  User,
  X,
  Upload,
  Link as LinkIcon,
} from "lucide-react";
import { useState } from "react";
import Modal from "../../components/Modal";

const TeachersManagement = () => {
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: "Dr. Ayesha Rahman",
      subject: "Physics",
      qualification: "PhD in Physics, BUET",
      experience: "12 years teaching experience",
      bio: "Specialized in modern physics and quantum mechanics. Has trained 5 national Olympiad winners.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      contact: "01712345678",
      email: "ayesha@example.com",
    },
    {
      id: 2,
      name: "Md. Farhan Hossain",
      subject: "Mathematics",
      qualification: "MSc in Applied Mathematics, DU",
      experience: "8 years teaching experience",
      bio: "Expert in calculus and algebra. Developed unique problem-solving techniques for competitive exams.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      contact: "01787654321",
      email: "farhan@example.com",
    },
    {
      id: 3,
      name: "Nusrat Jahan",
      subject: "Chemistry",
      qualification: "MSc in Chemistry, RU",
      experience: "10 years teaching experience",
      bio: "Specializes in organic chemistry and chemical bonding. Makes complex concepts easy to understand.",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      contact: "01812345678",
      email: "nusrat@example.com",
    },
    {
      id: 4,
      name: "Rahim Ahmed",
      subject: "Biology",
      qualification: "MBBS, Dhaka Medical College",
      experience: "7 years teaching experience",
      bio: "Medical doctor who teaches biology with clinical correlations. Focuses on conceptual understanding.",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      contact: "01912345678",
      email: "rahim@example.com",
    },
  ]);

  const [newTeacher, setNewTeacher] = useState({
    name: "",
    subject: "",
    qualification: "",
    experience: "",
    bio: "",
    image: "",
    contact: "",
    email: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleAddTeacher = () => {
    if (
      newTeacher.name &&
      newTeacher.subject &&
      newTeacher.contact &&
      newTeacher.email
    ) {
      const teacherToAdd = {
        ...newTeacher,
        id: editingId || teachers.length + 1,
        image: selectedImage
          ? URL.createObjectURL(selectedImage)
          : imageUrl || newTeacher.image,
      };

      if (editingId) {
        setTeachers(
          teachers.map((teacher) =>
            teacher.id === editingId ? teacherToAdd : teacher
          )
        );
      } else {
        setTeachers([...teachers, teacherToAdd]);
      }

      resetForm();
      setIsModalOpen(false);
    }
  };

  const resetForm = () => {
    setNewTeacher({
      name: "",
      subject: "",
      qualification: "",
      experience: "",
      bio: "",
      image: "",
      contact: "",
      email: "",
    });
    setSelectedImage(null);
    setImageUrl("");
    setEditingId(null);
  };

  const handleEdit = (teacher) => {
    setNewTeacher({
      ...teacher,
    });
    setSelectedImage(null);
    setImageUrl("");
    setEditingId(teacher.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setTeachers(teachers.filter((teacher) => teacher.id !== id));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      setImageUrl("");
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImageUrl("");
    setNewTeacher({ ...newTeacher, image: "" });
  };

  const addImageUrl = () => {
    if (imageUrl) {
      setNewTeacher({ ...newTeacher, image: imageUrl });
      setImageUrl("");
      setSelectedImage(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Teachers Management</h1>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Teacher
        </button>
      </div>

      {/* Teacher Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title={editingId ? "Edit Teacher" : "Add New Teacher"}
        size="lg"
      >
        <div className="space-y-4">
          {/* Teacher Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teacher Photo
            </label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setSelectedImage(null);
                }}
                placeholder="Enter image URL"
              />
              <button
                onClick={addImageUrl}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <LinkIcon className="w-4 h-4 mr-1" />
                Add URL
              </button>
            </div>

            <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 mb-2">
              <div className="flex flex-col items-center justify-center">
                <Upload className="w-8 h-8 text-gray-500 mb-2" />
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">JPG, PNG (MAX. 5MB)</p>
              </div>
              <input
                id="dropzone-image"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>

            {/* Preview of selected image */}
            {(selectedImage || newTeacher.image) && (
              <div className="mt-2">
                <div className="relative group">
                  <img
                    src={
                      selectedImage
                        ? URL.createObjectURL(selectedImage)
                        : newTeacher.image
                    }
                    alt="Teacher preview"
                    className="w-24 h-24 object-cover rounded-full"
                  />
                  <button
                    onClick={removeImage}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                  >
                    <X size={16} />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {selectedImage ? selectedImage.name : "External image"}
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name*
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newTeacher.name}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, name: e.target.value })
                }
                placeholder="Enter teacher's full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject*
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newTeacher.subject}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, subject: e.target.value })
                }
                placeholder="Enter subject taught"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Qualification
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newTeacher.qualification}
                onChange={(e) =>
                  setNewTeacher({
                    ...newTeacher,
                    qualification: e.target.value,
                  })
                }
                placeholder="Enter qualifications"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Experience
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newTeacher.experience}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, experience: e.target.value })
                }
                placeholder="Enter teaching experience"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Number*
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newTeacher.contact}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, contact: e.target.value })
                }
                placeholder="Enter contact number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email*
              </label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newTeacher.email}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, email: e.target.value })
                }
                placeholder="Enter email address"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              value={newTeacher.bio}
              onChange={(e) =>
                setNewTeacher({ ...newTeacher, bio: e.target.value })
              }
              placeholder="Enter teacher's bio"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              onClick={() => {
                setIsModalOpen(false);
                resetForm();
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleAddTeacher}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              {editingId ? "Update Teacher" : "Save Teacher"}
            </button>
          </div>
        </div>
      </Modal>

      {/* Teachers Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search teachers..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Photo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Qualification
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <img
                        src={teacher.image}
                        alt={teacher.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {teacher.name}
                    </div>
                    <div className="text-sm text-gray-500">{teacher.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {teacher.subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {teacher.qualification}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {teacher.contact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2">
                    <button
                      onClick={() => handleEdit(teacher)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(teacher.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeachersManagement;
