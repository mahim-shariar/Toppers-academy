// src/pages/Dashboard/StudentsManagement.jsx
import {
  Users,
  Plus,
  Search,
  Edit,
  Trash2,
  Filter,
  X,
  BookOpen,
  Check,
  Phone,
  Home,
  User,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import Modal from "../../components/Modal";

const StudentsManagement = () => {
  // Core Subjects (for display only)
  const sscCoreSubjects = ["Bangla", "English", "Mathematics"];
  const hscCoreSubjects = [
    "Bangla",
    "English",
    "Information and Communication Technology",
  ];

  // SSC Science Subjects
  const sscScienceSubjects = [
    "Physics",
    "Chemistry",
    "Biology",
    "Higher Mathematics",
    "Islam & Moral Education",
    "Bangladesh & World",
    "Agriculture Studies",
    "Home Science",
  ];

  // SSC Humanities Subjects
  const sscHumanitiesSubjects = [
    "Geography",
    "Civic & Citizenship",
    "Economics",
    "General Science",
    "Islam & Moral Education",
    "History of Bangladesh",
    "Agriculture Studies",
    "Home Science",
    "Music",
  ];

  // SSC Commerce Subjects
  const sscCommerceSubjects = [
    "Finance & Banking",
    "Accounting",
    "Business Entrepreneurship",
    "General Science",
    "Islam & Moral Education",
    "Agriculture Studies",
    "Home Science",
    "Music",
  ];

  // HSC Science Subjects
  const hscScienceSubjects = [
    "Physics",
    "Chemistry",
    "Biology",
    "Higher Mathematics",
  ];

  // HSC Humanities Subjects
  const hscHumanitiesSubjects = [
    "History",
    "Islamic History",
    "Geography",
    "Civic & Good Governance",
    "Psychology",
    "Sociology",
    "Social Work",
    "Logic",
    "Arts and crafts",
    "Agriculture Education",
    "Soil Science",
    "Economics",
  ];

  // HSC Commerce Subjects
  const hscCommerceSubjects = [
    "Accounting",
    "Finance & Banking",
    "Statistics",
    "Production Management & Marketing",
    "Business Organization and Management",
  ];

  // Course types
  const courseTypes = [
    "SSC Science",
    "SSC Humanities",
    "SSC Commerce",
    "HSC Science",
    "HSC Humanities",
    "HSC Commerce",
    "Medical Admission",
    "Engineering Admission",
    "University Admission",
  ];

  // Combine all subjects for filtering
  const allSubjects = [
    ...new Set([
      ...sscCoreSubjects,
      ...hscCoreSubjects,
      ...sscScienceSubjects,
      ...sscHumanitiesSubjects,
      ...sscCommerceSubjects,
      ...hscScienceSubjects,
      ...hscHumanitiesSubjects,
      ...hscCommerceSubjects,
    ]),
  ].sort();

  // Sample student data (without core subjects in the data)
  const [students, setStudents] = useState([
    {
      id: "SSC-SCI-2023-001",
      name: "Rahim Khan",
      courseType: "SSC Science",
      subjects: ["Physics", "Chemistry", "Biology"], // Only elective subjects
      contact: "01712345678",
      parentContact: "01712345679",
      joinDate: "2023-01-15",
      feePaid: true,
      address: "Mirpur, Dhaka",
      lastPayment: "2023-10-05",
    },
    {
      id: "SSC-HUM-2023-002",
      name: "Karim Ahmed",
      courseType: "SSC Humanities",
      subjects: ["History of Bangladesh", "Geography", "Civic & Citizenship"],
      contact: "01787654321",
      parentContact: "01787654322",
      joinDate: "2023-02-20",
      feePaid: false,
      address: "Uttara, Dhaka",
      lastPayment: null,
    },
    {
      id: "HSC-SCI-2023-003",
      name: "Fatima Begum",
      courseType: "HSC Science",
      subjects: ["Physics", "Chemistry", "Biology"],
      contact: "01812345678",
      parentContact: "01812345679",
      joinDate: "2023-03-10",
      feePaid: true,
      address: "Dhanmondi, Dhaka",
      lastPayment: "2023-10-10",
    },
  ]);

  const [newStudent, setNewStudent] = useState({
    name: "",
    courseType: "",
    subjects: [], // Only stores elective subjects
    contact: "",
    parentContact: "",
    joinDate: "",
    feePaid: false,
    address: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState("");
  const [selectedCourseFilter, setSelectedCourseFilter] = useState("");
  const [feeStatusFilter, setFeeStatusFilter] = useState("all");
  const [maxSubjectsSelected, setMaxSubjectsSelected] = useState(false);

  // Track when maximum subjects are selected (only counting electives)
  useEffect(() => {
    setMaxSubjectsSelected(newStudent.subjects.length >= 4);
  }, [newStudent.subjects]);

  // Generate student ID
  const generateStudentId = (courseType) => {
    const prefix = courseType.includes("SSC Science")
      ? "SSC-SCI"
      : courseType.includes("SSC Humanities")
      ? "SSC-HUM"
      : courseType.includes("SSC Commerce")
      ? "SSC-COM"
      : courseType.includes("HSC Science")
      ? "HSC-SCI"
      : courseType.includes("HSC Humanities")
      ? "HSC-HUM"
      : courseType.includes("HSC Commerce")
      ? "HSC-COM"
      : courseType.includes("Medical")
      ? "MED"
      : courseType.includes("Engineering")
      ? "ENG"
      : "UNI";
    const year = new Date().getFullYear();
    const randomNum = Math.floor(100 + Math.random() * 900);
    return `${prefix}-${year}-${randomNum}`;
  };

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.courseType && newStudent.contact) {
      // Ensure at least 1 elective subject is selected for SSC/HSC students
      // (since core subjects are not stored in the data)
      if (
        (newStudent.courseType.includes("SSC") ||
          newStudent.courseType.includes("HSC")) &&
        newStudent.subjects.length < 1
      ) {
        alert("Please select at least 1 elective subject for SSC/HSC students");
        return;
      }

      const studentToAdd = {
        ...newStudent,
        id: editingId || generateStudentId(newStudent.courseType),
      };

      if (editingId) {
        setStudents(
          students.map((student) =>
            student.id === editingId ? studentToAdd : student
          )
        );
      } else {
        setStudents([...students, studentToAdd]);
      }

      resetForm();
      setIsModalOpen(false);
    }
  };

  const resetForm = () => {
    setNewStudent({
      name: "",
      courseType: "",
      subjects: [],
      contact: "",
      parentContact: "",
      joinDate: "",
      feePaid: false,
      address: "",
    });
    setEditingId(null);
    setMaxSubjectsSelected(false);
  };

  const handleEdit = (student) => {
    setNewStudent({
      ...student,
    });
    setEditingId(student.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const toggleSubject = (subject) => {
    // If subject is already selected, remove it
    if (newStudent.subjects.includes(subject)) {
      setNewStudent((prev) => ({
        ...prev,
        subjects: prev.subjects.filter((s) => s !== subject),
      }));
    }
    // If not selected and we haven't reached max, add it
    else if (newStudent.subjects.length < 4) {
      setNewStudent((prev) => ({
        ...prev,
        subjects: [...prev.subjects, subject],
      }));
    }
  };

  // Get all subjects for display (including core for the current course type)
  const getAllDisplaySubjects = (student) => {
    let coreSubjects = [];
    if (student.courseType.includes("SSC")) {
      coreSubjects = [...sscCoreSubjects];
    } else if (student.courseType.includes("HSC")) {
      coreSubjects = [...hscCoreSubjects];
    }
    return [...coreSubjects, ...student.subjects];
  };

  // Filter students
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubjectFilter
      ? getAllDisplaySubjects(student).includes(selectedSubjectFilter)
      : true;
    const matchesCourse = selectedCourseFilter
      ? student.courseType === selectedCourseFilter
      : true;
    const matchesFeeStatus =
      feeStatusFilter === "all"
        ? true
        : feeStatusFilter === "paid"
        ? student.feePaid
        : !student.feePaid;

    return matchesSearch && matchesSubject && matchesCourse && matchesFeeStatus;
  });

  // Get appropriate elective subjects based on course type
  const getDepartmentalSubjects = () => {
    if (!newStudent.courseType) return [];

    if (newStudent.courseType === "SSC Science") {
      return sscScienceSubjects;
    } else if (newStudent.courseType === "SSC Humanities") {
      return sscHumanitiesSubjects;
    } else if (newStudent.courseType === "SSC Commerce") {
      return sscCommerceSubjects;
    } else if (newStudent.courseType === "HSC Science") {
      return hscScienceSubjects;
    } else if (newStudent.courseType === "HSC Humanities") {
      return hscHumanitiesSubjects;
    } else if (newStudent.courseType === "HSC Commerce") {
      return hscCommerceSubjects;
    }
    return [];
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Students Management
          </h1>
          <p className="text-sm text-gray-600">
            Manage all student records and information
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-4 py-2 rounded-lg flex items-center shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Student
        </button>
      </div>

      {/* Filters - Enhanced Design */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm p-4 mb-6 border border-blue-100">
        <div className="flex items-center mb-3">
          <Filter className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-blue-800">
            Filter Students
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative flex justify-end">
            <div className="absolute inset-y-0 left-0 pl-3  flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-blue-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name or ID..."
              className="block w-full pl-10 pr-3 py-2 border border-blue-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Course Type */}
          <div>
            <label className="block text-sm font-medium text-blue-800 mb-1">
              Course Type
            </label>
            <div className="relative">
              <select
                className="block w-full pl-3 pr-8 py-2 text-base border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg bg-white shadow-sm transition-all appearance-none"
                value={selectedCourseFilter}
                onChange={(e) => setSelectedCourseFilter(e.target.value)}
              >
                <option value="">All Courses</option>
                {courseTypes.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  className="h-5 w-5 text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              {selectedCourseFilter && (
                <button
                  onClick={() => setSelectedCourseFilter("")}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-blue-800 mb-1">
              Subject
            </label>
            <div className="relative">
              <select
                className="block w-full pl-3 pr-8 py-2 text-base border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg bg-white shadow-sm transition-all appearance-none"
                value={selectedSubjectFilter}
                onChange={(e) => setSelectedSubjectFilter(e.target.value)}
              >
                <option value="">All Subjects</option>
                {allSubjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  className="h-5 w-5 text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              {selectedSubjectFilter && (
                <button
                  onClick={() => setSelectedSubjectFilter("")}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Fee Status */}
          <div>
            <label className="block text-sm font-medium text-blue-800 mb-1">
              Fee Status
            </label>
            <div className="relative">
              <select
                className="block w-full pl-3 pr-8 py-2 text-base border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg bg-white shadow-sm transition-all appearance-none"
                value={feeStatusFilter}
                onChange={(e) => setFeeStatusFilter(e.target.value)}
              >
                <option value="all">All Students</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  className="h-5 w-5 text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Student Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title={editingId ? "Edit Student" : "Add New Student"}
        size="xl"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name*
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={newStudent.name}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, name: e.target.value })
                }
                placeholder="Enter student's full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Type*
              </label>
              <select
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={newStudent.courseType}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, courseType: e.target.value })
                }
              >
                <option value="">Select Course Type</option>
                {courseTypes.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Number*
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={newStudent.contact}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, contact: e.target.value })
                }
                placeholder="Enter student's contact number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Parent's Contact
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={newStudent.parentContact}
                onChange={(e) =>
                  setNewStudent({
                    ...newStudent,
                    parentContact: e.target.value,
                  })
                }
                placeholder="Enter parent's contact number"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Join Date
              </label>
              <input
                type="date"
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={newStudent.joinDate}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, joinDate: e.target.value })
                }
              />
            </div>

            <div className="flex items-center justify-center">
              <div className="flex items-center h-full">
                <input
                  type="checkbox"
                  id="feePaid"
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={newStudent.feePaid}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, feePaid: e.target.checked })
                  }
                />
                <label
                  htmlFor="feePaid"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Fee Paid
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={newStudent.address}
              onChange={(e) =>
                setNewStudent({ ...newStudent, address: e.target.value })
              }
              placeholder="Enter student's address"
            />
          </div>

          {/* Subjects Selection */}
          <div className="pt-2">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Subjects*
              </label>
              <div className="text-xs text-gray-500">
                Selected Electives: {newStudent.subjects.length}/4
                {maxSubjectsSelected && (
                  <span className="ml-2 text-orange-600 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Maximum electives selected
                  </span>
                )}
              </div>
            </div>

            {/* Core Subjects (Display only) */}
            <div className="mb-4 bg-blue-50 p-3 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <BookOpen className="w-4 h-4 mr-1 text-blue-600" /> Core
                Subjects (Mandatory)
              </h4>
              <div className="flex flex-wrap gap-2">
                {newStudent.courseType.includes("SSC")
                  ? sscCoreSubjects.map((subject) => (
                      <span
                        key={subject}
                        className="px-3 py-1 rounded-full text-sm flex items-center bg-blue-100 text-blue-800 border border-blue-300 shadow-inner"
                      >
                        {subject}
                      </span>
                    ))
                  : newStudent.courseType.includes("HSC")
                  ? hscCoreSubjects.map((subject) => (
                      <span
                        key={subject}
                        className="px-3 py-1 rounded-full text-sm flex items-center bg-blue-100 text-blue-800 border border-blue-300 shadow-inner"
                      >
                        {subject}
                      </span>
                    ))
                  : null}
              </div>
            </div>

            {/* Departmental Subjects */}
            {newStudent.courseType && (
              <>
                {(newStudent.courseType.includes("SSC") ||
                  newStudent.courseType.includes("HSC")) && (
                  <div className="mb-4 bg-blue-50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <BookOpen className="w-4 h-4 mr-1 text-blue-600" />
                      {newStudent.courseType === "SSC Science" &&
                        "SSC Science Electives"}
                      {newStudent.courseType === "SSC Humanities" &&
                        "SSC Humanities Electives"}
                      {newStudent.courseType === "SSC Commerce" &&
                        "SSC Commerce Electives"}
                      {newStudent.courseType === "HSC Science" &&
                        "HSC Science Electives"}
                      {newStudent.courseType === "HSC Humanities" &&
                        "HSC Humanities Electives"}
                      {newStudent.courseType === "HSC Commerce" &&
                        "HSC Commerce Electives"}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {getDepartmentalSubjects().map((subject) => (
                        <button
                          key={subject}
                          type="button"
                          className={`px-3 py-1 rounded-full text-sm flex items-center transition-all ${
                            newStudent.subjects.includes(subject)
                              ? "bg-blue-100 text-blue-800 border border-blue-300 shadow-inner"
                              : maxSubjectsSelected
                              ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
                              : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50"
                          }`}
                          onClick={() =>
                            !maxSubjectsSelected && toggleSubject(subject)
                          }
                          disabled={
                            maxSubjectsSelected &&
                            !newStudent.subjects.includes(subject)
                          }
                        >
                          {subject}
                          {newStudent.subjects.includes(subject) && (
                            <Check className="w-3 h-3 ml-1" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              onClick={() => {
                setIsModalOpen(false);
                resetForm();
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddStudent}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
              disabled={
                (newStudent.courseType.includes("SSC") ||
                  newStudent.courseType.includes("HSC")) &&
                newStudent.subjects.length < 1
              }
            >
              {editingId ? "Update Student" : "Save Student"}
            </button>
          </div>
        </div>
      </Modal>

      {/* Students Cards */}
      {filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStudents.map((student) => {
            const displaySubjects = student.courseType.includes("SSC")
              ? [...sscCoreSubjects, ...student.subjects]
              : student.courseType.includes("HSC")
              ? [...hscCoreSubjects, ...student.subjects]
              : student.subjects;

            return (
              <div
                key={student.id}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {student.name}
                      </h3>
                      <p className="text-xs text-blue-600 font-medium">
                        {student.id}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full flex items-center ${
                        student.feePaid
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {student.feePaid ? (
                        <>
                          <Check className="w-3 h-3 mr-1" /> Paid
                        </>
                      ) : (
                        <>
                          <X className="w-3 h-3 mr-1" /> Unpaid
                        </>
                      )}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">
                        {student.courseType}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-600">
                        Joined: {student.joinDate}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-600">
                        {student.contact}
                      </span>
                    </div>

                    {student.parentContact && (
                      <div className="flex items-center">
                        <User className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-600">
                          Parent: {student.parentContact}
                        </span>
                      </div>
                    )}

                    {student.address && (
                      <div className="flex items-start">
                        <Home className="w-4 h-4 text-gray-500 mr-2 mt-0.5" />
                        <span className="text-sm text-gray-600">
                          {student.address}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center">
                      <BookOpen className="w-3 h-3 mr-1" /> Subjects
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {displaySubjects.map((subject, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 text-xs rounded-full flex items-center ${
                            sscCoreSubjects.includes(subject) ||
                            hscCoreSubjects.includes(subject)
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end space-x-2">
                    <button
                      onClick={() => handleEdit(student)}
                      className="p-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-full transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-full transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow p-8 text-center border border-gray-100">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No students found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedSubjectFilter("");
              setSelectedCourseFilter("");
              setFeeStatusFilter("all");
            }}
            className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentsManagement;
