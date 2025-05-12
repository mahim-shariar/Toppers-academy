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
  Link as LinkIcon,
  User,
  Image as ImageIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Modal from "../../components/Modal";

const CoursesManagement = () => {
  // Sample data
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
      ],
    },
  ]);

  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    longDescription: "",
    imageUrl: "",
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
  });

  const [currentSyllabusItem, setCurrentSyllabusItem] = useState("");
  const [currentRequirement, setCurrentRequirement] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [documentUrl, setDocumentUrl] = useState("");
  const [documentName, setDocumentName] = useState("");

  // Rich Text Editor Configuration
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: true,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: true,
        },
      }),
      Link.configure({
        HTMLAttributes: {
          class: "text-blue-500 hover:underline",
        },
        openOnClick: false,
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Color,
      CharacterCount.configure({
        limit: 10000,
      }),
      Placeholder.configure({
        placeholder: "Write your detailed course description here...",
      }),
    ],
    content: newCourse.longDescription,
    onUpdate: ({ editor }) => {
      setNewCourse({ ...newCourse, longDescription: editor.getHTML() });
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none p-4 min-h-[300px]",
      },
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
        imageUrl: selectedImage
          ? URL.createObjectURL(selectedImage)
          : imageUrl || newCourse.imageUrl,
        documents: [
          ...newCourse.documents,
          ...selectedFiles.map((file) => ({
            name: file.name,
            url: URL.createObjectURL(file),
          })),
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
      imageUrl: "",
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
    });
    setSelectedFiles([]);
    setSelectedImage(null);
    setImageUrl("");
    setDocumentUrl("");
    setDocumentName("");
    setEditingId(null);
  };

  const handleEdit = (course) => {
    setNewCourse({
      ...course,
      instructorId: course.instructorId || "",
    });
    setSelectedFiles([]);
    setSelectedImage(null);
    setImageUrl("");
    setDocumentUrl("");
    setDocumentName("");
    setEditingId(course.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      setImageUrl("");
    }
  };

  const removeFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImageUrl("");
    setNewCourse({ ...newCourse, imageUrl: "" });
  };

  const addDocumentUrl = () => {
    if (documentUrl) {
      setNewCourse({
        ...newCourse,
        documents: [
          ...newCourse.documents,
          {
            name: documentName || "External Document",
            url: documentUrl,
          },
        ],
      });
      setDocumentUrl("");
      setDocumentName("");
    }
  };

  const removeDocument = (index) => {
    setNewCourse({
      ...newCourse,
      documents: newCourse.documents.filter((_, i) => i !== index),
    });
  };

  const addImageUrl = () => {
    if (imageUrl) {
      setNewCourse({ ...newCourse, imageUrl });
      setImageUrl("");
      setSelectedImage(null);
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

  // Editor Menu Bar Component
  const EditorMenuBar = ({ editor }) => {
    if (!editor) {
      return null;
    }

    return (
      <div className="flex flex-wrap items-center gap-2 p-2 border-b border-gray-200 bg-gray-50">
        {/* Text Formatting */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("bold") ? "bg-gray-200" : ""
          }`}
          title="Bold"
        >
          <span className="font-bold">B</span>
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("italic") ? "bg-gray-200" : ""
          }`}
          title="Italic"
        >
          <span className="italic">I</span>
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("underline") ? "bg-gray-200" : ""
          }`}
          title="Underline"
        >
          <span className="underline">U</span>
        </button>

        {/* Headings */}
        <select
          value={editor.getAttributes("heading").level || "paragraph"}
          onChange={(e) => {
            e.preventDefault();
            const level = e.target.value;
            if (level === "paragraph") {
              editor.chain().focus().setParagraph().run();
            } else {
              editor
                .chain()
                .focus()
                .toggleHeading({ level: parseInt(level) })
                .run();
            }
          }}
          className="p-1 border rounded text-sm"
        >
          <option value="paragraph">Paragraph</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
        </select>

        {/* Lists */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("bulletList") ? "bg-gray-200" : ""
          }`}
          title="Bullet List"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M8 4h13v2H8V4zM4.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 6.9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM8 11h13v2H8v-2zm0 7h13v2H8v-2z" />
          </svg>
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("orderedList") ? "bg-gray-200" : ""
          }`}
          title="Numbered List"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M8 4h13v2H8V4zM5 3v3h1v1H3V6h1V4H3V3h2zM3 14v-2.5h2V11H3v-1h3v2.5H4v.5h2v1H3zm2 5.5H3v-1h2V18H3v-1h3v4H3v-1h2v-.5zM8 11h13v2H8v-2zm0 7h13v2H8v-2z" />
          </svg>
        </button>

        {/* Text Alignment */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setTextAlign("left").run();
          }}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive({ textAlign: "left" }) ? "bg-gray-200" : ""
          }`}
          title="Align Left"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M3 4h18v2H3V4zm0 15h14v2H3v-2zm0-5h18v2H3v-2zm0-5h14v2H3V9z" />
          </svg>
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setTextAlign("center").run();
          }}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive({ textAlign: "center" }) ? "bg-gray-200" : ""
          }`}
          title="Align Center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M3 4h18v2H3V4zm2 15h14v2H5v-2zm-2-5h18v2H3v-2zm2-5h14v2H5V9z" />
          </svg>
        </button>

        {/* Links */}
        <button
          onClick={(e) => {
            e.preventDefault();
            const previousUrl = editor.getAttributes("link").href;
            const url = window.prompt("URL", previousUrl);

            if (url === null) return;
            if (url === "") {
              editor.chain().focus().extendMarkRange("link").unsetLink().run();
              return;
            }

            editor
              .chain()
              .focus()
              .extendMarkRange("link")
              .setLink({ href: url })
              .run();
          }}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("link") ? "bg-gray-200" : ""
          }`}
          title="Link"
        >
          <LinkIcon className="w-4 h-4" />
        </button>

        {/* Text Color */}
        <div className="relative inline-block group">
          <button
            onClick={(e) => e.preventDefault()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive("textStyle") ? "bg-gray-200" : ""
            }`}
            title="Text Color"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M15.246 14H8.754l-1.6 4H5l6-15h2l6 15h-2.154l-1.6-4zm-.8-2L12 5.885 9.554 12h4.892z" />
            </svg>
          </button>
          <div className="absolute z-10 mt-1 w-48 p-2 bg-white rounded shadow-lg border border-gray-200 hidden group-hover:block">
            <div className="grid grid-cols-5 gap-1">
              {["#000000", "#ef4444", "#3b82f6", "#10b981", "#f59e0b"].map(
                (color) => (
                  <button
                    key={color}
                    onClick={(e) => {
                      e.preventDefault();
                      editor.chain().focus().setColor(color).run();
                    }}
                    className="w-6 h-6 rounded border border-gray-200"
                    style={{ backgroundColor: color }}
                  />
                )
              )}
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().unsetColor().run();
              }}
              className="mt-2 text-xs text-gray-600 hover:text-gray-900"
            >
              Remove color
            </button>
          </div>
        </div>
      </div>
    );
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
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Course
        </button>
      </div>

      {/* Enhanced Course Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title={editingId ? "Edit Course" : "Add New Course"}
        size="xl"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700 text-lg">
                Basic Information
              </h3>

              {/* Course Image Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Image
                </label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    value={imageUrl}
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                      setSelectedImage(null);
                    }}
                    placeholder="Enter image URL"
                  />
                  <button
                    onClick={addImageUrl}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200"
                  >
                    <LinkIcon className="w-4 h-4 mr-1" />
                    Add URL
                  </button>
                </div>

                <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 mb-2 transition-colors duration-200">
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="w-8 h-8 text-gray-500 mb-2" />
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
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
                {(selectedImage || newCourse.imageUrl) && (
                  <div className="mt-2">
                    <div className="relative group">
                      <img
                        src={
                          selectedImage
                            ? URL.createObjectURL(selectedImage)
                            : newCourse.imageUrl
                        }
                        alt="Course preview"
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <button
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Title*
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={newCourse.title}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, title: e.target.value })
                  }
                  placeholder="Enter course title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Short Description*
                </label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  rows="3"
                  value={newCourse.description}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, description: e.target.value })
                  }
                  placeholder="Brief description of the course"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Long Description
                </label>
                <div className="border rounded-lg bg-white overflow-hidden shadow-sm">
                  <EditorMenuBar editor={editor} />
                  <div className="border-t border-gray-200">
                    <EditorContent
                      editor={editor}
                      className="min-h-[300px] max-h-[500px] overflow-y-auto p-4 focus:outline-none"
                    />
                  </div>
                  <div className="px-4 py-2 text-xs text-gray-500 border-t bg-gray-50">
                    {editor?.storage.characterCount.characters()}/{10000}{" "}
                    characters
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration*
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    value={newCourse.duration}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, duration: e.target.value })
                    }
                    placeholder="e.g. 12 Weeks"
                  />
                </div>
              </div>
            </div>

            {/* Schedule & Instructor */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700 text-lg">
                Schedule & Instructor
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
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
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
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
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
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
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
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
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
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
                    <option value="Nursing">Nursing</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Mode
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
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
                    Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      className="w-full pl-8 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      value={newCourse.price}
                      onChange={(e) =>
                        setNewCourse({ ...newCourse, price: e.target.value })
                      }
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Syllabus */}
          <div className="mt-6">
            <h3 className="font-medium text-gray-700 text-lg mb-2">Syllabus</h3>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                value={currentSyllabusItem}
                onChange={(e) => setCurrentSyllabusItem(e.target.value)}
                placeholder="Add syllabus item (e.g. Week 1: Introduction)"
                onKeyPress={(e) => e.key === "Enter" && addSyllabusItem()}
              />
              <button
                onClick={addSyllabusItem}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Add
              </button>
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {newCourse.syllabus.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-2 rounded hover:bg-gray-100 transition-colors duration-200"
                >
                  <span className="text-sm">{item}</span>
                  <button
                    onClick={() => removeSyllabusItem(index)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Documents Upload */}
          <div className="mt-6">
            <h3 className="font-medium text-gray-700 text-lg mb-2">
              Course Documents
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Document Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={documentName}
                  onChange={(e) => setDocumentName(e.target.value)}
                  placeholder="Enter document name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Document URL
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    value={documentUrl}
                    onChange={(e) => setDocumentUrl(e.target.value)}
                    placeholder="Enter document URL"
                  />
                  <button
                    onClick={addDocumentUrl}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200"
                  >
                    <LinkIcon className="w-4 h-4 mr-1" />
                    Add URL
                  </button>
                </div>
              </div>
            </div>

            {/* File upload section */}

            <div className="space-y-2 max-h-40 overflow-y-auto">
              {newCourse.documents.map((doc, index) => (
                <div
                  key={`existing-${index}`}
                  className="flex items-center justify-between bg-gray-50 p-2 rounded hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm">{doc.name}</span>
                  </div>
                  <div className="flex items-center">
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 mr-2 transition-colors duration-200"
                    >
                      View
                    </a>
                    <button
                      onClick={() => removeDocument(index)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}

              {selectedFiles.map((file, index) => (
                <div
                  key={`new-${index}`}
                  className="flex items-center justify-between bg-gray-50 p-2 rounded hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm">{file.name}</span>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200"
                  >
                    <X size={16} />
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
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleAddCourse}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
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
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
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
                  <tr
                    key={course.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
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
                        className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="text-red-600 hover:text-red-900 transition-colors duration-200"
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
