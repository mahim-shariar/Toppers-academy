// src/pages/Dashboard/CoursesManagement.jsx
import {
  BookOpen,
  Plus,
  Search,
  Edit,
  Trash2,
  Upload,
  X,
  FileText,
  Image as ImageIcon,
  Link,
  User,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Modal from "../../components/Modal"; // Assume you have a Modal component

const CoursesManagement = () => {
  // Sample data - in a real app, this would come from your backend
  const [teachers, setTeachers] = useState([
    { id: 1, name: "Dr. Sarah Johnson", subject: "Mathematics" },
    { id: 2, name: "Prof. Ahmed Rahman", subject: "Physics" },
    { id: 3, name: "Ms. Fatima Begum", subject: "Chemistry" },
  ]);

  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "HSC Advanced Mathematics",
      description: "Master calculus, algebra, and geometry...",
      longDescription: "<p>This intensive course covers all aspects...</p>",
      imageUrl: "https://example.com/math.jpg",
      duration: "12 Weeks",
      students: "24 Students",
      level: "Advanced",
      category: "Academic",
      programType: "HSC",
      deliveryMode: "Offline",
      price: 299,
      startDate: "2024-01-15",
      schedule: "Mon & Wed, 6:00 PM - 8:00 PM",
      instructorId: 1,
      syllabus: [
        "Week 1-3: Calculus Fundamentals",
        "Week 4-6: Advanced Algebra",
      ],
      requirements: [
        "Completion of Year 11 Mathematics",
        "Scientific calculator",
      ],
      documents: [
        { name: "Syllabus.pdf", url: "https://example.com/syllabus.pdf" },
        { name: "Materials.zip", url: "https://example.com/materials.zip" },
      ],
      galleryImages: [
        { name: "classroom.jpg", url: "https://example.com/classroom.jpg" },
      ],
    },
  ]);

  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    longDescription: "",
    duration: "",
    level: "",
    category: "",
    programType: "",
    deliveryMode: "",
    price: "",
    startDate: "",
    schedule: "",
    instructorId: "",
    syllabus: [],
    requirements: [],
    documents: [],
    galleryImages: [],
  });

  const [currentSyllabusItem, setCurrentSyllabusItem] = useState("");
  const [currentRequirement, setCurrentRequirement] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [documentUrl, setDocumentUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Initialize Tiptap editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
      }),
    ],
    content: newCourse.longDescription,
    onUpdate: ({ editor }) => {
      setNewCourse({ ...newCourse, longDescription: editor.getHTML() });
    },
  });

  // Update editor content when editing a course
  useEffect(() => {
    if (editor && newCourse.longDescription) {
      editor.commands.setContent(newCourse.longDescription);
    }
  }, [editor, newCourse.longDescription]);

  const handleAddCourse = () => {
    if (newCourse.title && newCourse.description && newCourse.category) {
      const courseToAdd = {
        ...newCourse,
        id: editingId || courses.length + 1,
        documents: [
          ...selectedFiles.map((file) => ({
            name: file.name,
            url: URL.createObjectURL(file),
          })),
          ...(documentUrl
            ? [{ name: "External Document", url: documentUrl }]
            : []),
        ],
        galleryImages: [
          ...selectedImages.map((img) => ({
            name: img.name,
            url: URL.createObjectURL(img),
          })),
          ...(imageUrl ? [{ name: "External Image", url: imageUrl }] : []),
        ],
      };

      if (editingId) {
        setCourses(
          courses.map((course) =>
            course.id === editingId ? courseToAdd : course
          )
        );
      } else {
        setCourses([...courses, courseToAdd]);
      }

      resetForm();
      setIsModalOpen(false);
    }
  };

  const resetForm = () => {
    setNewCourse({
      title: "",
      description: "",
      longDescription: "",
      duration: "",
      level: "",
      category: "",
      programType: "",
      deliveryMode: "",
      price: "",
      startDate: "",
      schedule: "",
      instructorId: "",
      syllabus: [],
      requirements: [],
      documents: [],
      galleryImages: [],
    });
    setSelectedFiles([]);
    setSelectedImages([]);
    setDocumentUrl("");
    setImageUrl("");
    setEditingId(null);
  };

  const handleEdit = (course) => {
    setNewCourse({
      ...course,
      instructorId: course.instructorId || "",
    });
    setSelectedFiles([]);
    setSelectedImages([]);
    setDocumentUrl("");
    setImageUrl("");
    setEditingId(course.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const handleFileChange = (e) => {
    setSelectedFiles([...selectedFiles, ...Array.from(e.target.files)]);
  };

  const handleImageChange = (e) => {
    setSelectedImages([...selectedImages, ...Array.from(e.target.files)]);
  };

  const removeFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const removeImage = (index) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const addDocumentUrl = () => {
    if (documentUrl) {
      setNewCourse({
        ...newCourse,
        documents: [
          ...newCourse.documents,
          { name: "External Document", url: documentUrl },
        ],
      });
      setDocumentUrl("");
    }
  };

  const addImageUrl = () => {
    if (imageUrl) {
      setNewCourse({
        ...newCourse,
        galleryImages: [
          ...newCourse.galleryImages,
          { name: "External Image", url: imageUrl },
        ],
      });
      setImageUrl("");
    }
  };

  const addSyllabusItem = () => {
    if (currentSyllabusItem) {
      setNewCourse({
        ...newCourse,
        syllabus: [...newCourse.syllabus, currentSyllabusItem],
      });
      setCurrentSyllabusItem("");
    }
  };

  const removeSyllabusItem = (index) => {
    setNewCourse({
      ...newCourse,
      syllabus: newCourse.syllabus.filter((_, i) => i !== index),
    });
  };

  const addRequirement = () => {
    if (currentRequirement) {
      setNewCourse({
        ...newCourse,
        requirements: [...newCourse.requirements, currentRequirement],
      });
      setCurrentRequirement("");
    }
  };

  const removeRequirement = (index) => {
    setNewCourse({
      ...newCourse,
      requirements: newCourse.requirements.filter((_, i) => i !== index),
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Courses Management</h1>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Course
        </button>
      </div>

      {/* Course Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title={editingId ? "Edit Course" : "Add New Course"}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">Basic Information</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Title*
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={newCourse.title}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, title: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Short Description*
                </label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  rows="3"
                  value={newCourse.description}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, description: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Long Description
                </label>
                <div className="border rounded-lg p-2 min-h-[200px] bg-white">
                  <EditorContent editor={editor} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration*
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={newCourse.duration}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, duration: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Level*
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={newCourse.level}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, level: e.target.value })
                    }
                  >
                    <option value="">Select Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Schedule & Instructor */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">
                Schedule & Instructor
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={newCourse.startDate}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, startDate: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Schedule
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={newCourse.schedule}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, schedule: e.target.value })
                  }
                  placeholder="e.g. Mon & Wed, 6:00 PM - 8:00 PM"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instructor*
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={newCourse.instructorId}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, instructorId: e.target.value })
                  }
                >
                  <option value="">Select Instructor</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name} ({teacher.subject})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category*
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={newCourse.category}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, category: e.target.value })
                    }
                  >
                    <option value="">Select Category</option>
                    <option value="Academic">Academic</option>
                    <option value="Professional">Professional</option>
                    <option value="Competitive">Competitive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Program Type
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={newCourse.programType}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        programType: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Type</option>
                    <option value="HSC">HSC</option>
                    <option value="Medical">Medical</option>
                    <option value="Engineering">Engineering</option>
                    <option value="BSC">BSC</option>
                    <option value="Job Preparation">Job Preparation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Mode
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={newCourse.deliveryMode}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        deliveryMode: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Mode</option>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (USD)
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={newCourse.price}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, price: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Syllabus */}
          <div className="mt-6">
            <h3 className="font-medium text-gray-700 mb-2">Syllabus</h3>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                className="flex-1 p-2 border border-gray-300 rounded-lg"
                value={currentSyllabusItem}
                onChange={(e) => setCurrentSyllabusItem(e.target.value)}
                placeholder="Add syllabus item (e.g. Week 1: Introduction)"
                onKeyPress={(e) => e.key === "Enter" && addSyllabusItem()}
              />
              <button
                onClick={addSyllabusItem}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Add
              </button>
            </div>
            <div className="space-y-2">
              {newCourse.syllabus.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-2 rounded"
                >
                  <span>{item}</span>
                  <button
                    onClick={() => removeSyllabusItem(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div className="mt-6">
            <h3 className="font-medium text-gray-700 mb-2">Requirements</h3>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                className="flex-1 p-2 border border-gray-300 rounded-lg"
                value={currentRequirement}
                onChange={(e) => setCurrentRequirement(e.target.value)}
                placeholder="Add requirement (e.g. Basic knowledge of algebra)"
                onKeyPress={(e) => e.key === "Enter" && addRequirement()}
              />
              <button
                onClick={addRequirement}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Add
              </button>
            </div>
            <div className="space-y-2">
              {newCourse.requirements.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-2 rounded"
                >
                  <span>{item}</span>
                  <button
                    onClick={() => removeRequirement(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Documents Upload */}
          <div className="mt-6">
            <h3 className="font-medium text-gray-700 mb-2">Course Documents</h3>

            <div className="flex space-x-2 mb-4">
              <input
                type="text"
                className="flex-1 p-2 border border-gray-300 rounded-lg"
                value={documentUrl}
                onChange={(e) => setDocumentUrl(e.target.value)}
                placeholder="Enter document URL"
              />
              <button
                onClick={addDocumentUrl}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <Link className="w-4 h-4 mr-1" />
                Add URL
              </button>
            </div>

            <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 mb-4">
              <div className="flex flex-col items-center justify-center">
                <Upload className="w-8 h-8 text-gray-500 mb-2" />
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  PDF, DOC, PPT (MAX. 10MB each)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                multiple
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.ppt,.pptx"
              />
            </label>

            <div className="space-y-2">
              {newCourse.documents.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-2 rounded"
                >
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm">{doc.name}</span>
                  </div>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    View
                  </a>
                </div>
              ))}

              {selectedFiles.map((file, index) => (
                <div
                  key={`new-${index}`}
                  className="flex items-center justify-between bg-gray-50 p-2 rounded"
                >
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm">{file.name}</span>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery Images Upload */}
          <div className="mt-6">
            <h3 className="font-medium text-gray-700 mb-2">Gallery Images</h3>

            <div className="flex space-x-2 mb-4">
              <input
                type="text"
                className="flex-1 p-2 border border-gray-300 rounded-lg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image URL"
              />
              <button
                onClick={addImageUrl}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <Link className="w-4 h-4 mr-1" />
                Add URL
              </button>
            </div>

            <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 mb-4">
              <div className="flex flex-col items-center justify-center">
                <ImageIcon className="w-8 h-8 text-gray-500 mb-2" />
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  JPG, PNG (MAX. 5MB each)
                </p>
              </div>
              <input
                id="dropzone-image"
                type="file"
                className="hidden"
                multiple
                onChange={handleImageChange}
                accept="image/*"
              />
            </label>

            <div className="grid grid-cols-3 gap-2">
              {newCourse.galleryImages.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img.url}
                    alt={img.name}
                    className="w-full h-24 object-cover rounded"
                  />
                </div>
              ))}

              {selectedImages.map((img, index) => (
                <div key={`new-${index}`} className="relative group">
                  <img
                    src={URL.createObjectURL(img)}
                    alt={img.name}
                    className="w-full h-24 object-cover rounded"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-6 space-x-2">
            <button
              onClick={() => {
                setIsModalOpen(false);
                resetForm();
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleAddCourse}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              {editingId ? "Update Course" : "Save Course"}
            </button>
          </div>
        </div>
      </Modal>

      {/* Courses Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
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
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Instructor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map((course) => {
                const instructor = teachers.find(
                  (t) => t.id === course.instructorId
                );
                return (
                  <tr key={course.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {course.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {instructor
                        ? `${instructor.name} (${instructor.subject})`
                        : "Not assigned"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${course.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2">
                      <button
                        onClick={() => handleEdit(course)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CoursesManagement;
