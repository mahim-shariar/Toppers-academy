// src/pages/Dashboard/TeachersManagement.jsx
import { GraduationCap, Plus, Search, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

const TeachersManagement = () => {
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: "Dr. Rahman",
      subject: "Physics",
      contact: "01712345678",
      email: "rahman@example.com",
    },
    {
      id: 2,
      name: "Ms. Fatima",
      subject: "Chemistry",
      contact: "01787654321",
      email: "fatima@example.com",
    },
    {
      id: 3,
      name: "Mr. Khan",
      subject: "Mathematics",
      contact: "01812345678",
      email: "khan@example.com",
    },
    {
      id: 4,
      name: "Mrs. Akter",
      subject: "Accounting",
      contact: "01912345678",
      email: "akter@example.com",
    },
  ]);

  const [newTeacher, setNewTeacher] = useState({
    name: "",
    subject: "",
    contact: "",
    email: "",
  });

  const [isAdding, setIsAdding] = useState(false);

  const handleAddTeacher = () => {
    if (
      newTeacher.name &&
      newTeacher.subject &&
      newTeacher.contact &&
      newTeacher.email
    ) {
      setTeachers([
        ...teachers,
        {
          id: teachers.length + 1,
          name: newTeacher.name,
          subject: newTeacher.subject,
          contact: newTeacher.contact,
          email: newTeacher.email,
        },
      ]);
      setNewTeacher({ name: "", subject: "", contact: "", email: "" });
      setIsAdding(false);
    }
  };

  const handleDelete = (id) => {
    setTeachers(teachers.filter((teacher) => teacher.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Teachers Management</h1>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Teacher
        </button>
      </div>

      {isAdding && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Add New Teacher</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={newTeacher.name}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={newTeacher.subject}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, subject: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Number
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={newTeacher.contact}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, contact: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={newTeacher.email}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, email: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <button
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleAddTeacher}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Save Teacher
            </button>
          </div>
        </div>
      )}

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
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {teacher.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {teacher.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {teacher.subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {teacher.contact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {teacher.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
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
