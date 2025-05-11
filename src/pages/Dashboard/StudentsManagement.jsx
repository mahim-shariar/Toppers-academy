// src/pages/Dashboard/StudentsManagement.jsx
import { Users, Plus, Search, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

const StudentsManagement = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Rahim Khan",
      course: "Physics HSC",
      contact: "01712345678",
      joinDate: "2023-01-15",
    },
    {
      id: 2,
      name: "Karim Ahmed",
      course: "Chemistry HSC",
      contact: "01787654321",
      joinDate: "2023-02-20",
    },
    {
      id: 3,
      name: "Fatima Begum",
      course: "Higher Math",
      contact: "01812345678",
      joinDate: "2023-03-10",
    },
    {
      id: 4,
      name: "Ayesha Akter",
      course: "Accounting",
      contact: "01912345678",
      joinDate: "2023-01-05",
    },
  ]);

  const [newStudent, setNewStudent] = useState({
    name: "",
    course: "",
    contact: "",
    joinDate: "",
  });

  const [isAdding, setIsAdding] = useState(false);

  const handleAddStudent = () => {
    if (
      newStudent.name &&
      newStudent.course &&
      newStudent.contact &&
      newStudent.joinDate
    ) {
      setStudents([
        ...students,
        {
          id: students.length + 1,
          name: newStudent.name,
          course: newStudent.course,
          contact: newStudent.contact,
          joinDate: newStudent.joinDate,
        },
      ]);
      setNewStudent({ name: "", course: "", contact: "", joinDate: "" });
      setIsAdding(false);
    }
  };

  const handleDelete = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Students Management</h1>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Student
        </button>
      </div>

      {isAdding && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Add New Student</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={newStudent.name}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={newStudent.course}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, course: e.target.value })
                }
              >
                <option value="">Select Course</option>
                <option value="Physics HSC">Physics HSC</option>
                <option value="Chemistry HSC">Chemistry HSC</option>
                <option value="Higher Math">Higher Math</option>
                <option value="Accounting">Accounting</option>
                <option value="Business Studies">Business Studies</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Number
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={newStudent.contact}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, contact: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Join Date
              </label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={newStudent.joinDate}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, joinDate: e.target.value })
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
              onClick={handleAddStudent}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Save Student
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
              placeholder="Search students..."
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
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.course}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.contact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.joinDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
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

export default StudentsManagement;