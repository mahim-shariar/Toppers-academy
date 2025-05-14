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
  ChevronDown,
  Check,
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
import FontSize from "@tiptap/extension-font-size";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [documentUrl, setDocumentUrl] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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
        alignments: ["left", "center", "right"],
      }),
      TextStyle,
      Color,
      FontSize,
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
        class:
          "prose prose-sm max-w-none focus:outline-none p-4 min-h-[300px] max-h-[500px] overflow-y-auto",
      },
    },
  });

  // Update editor content when editing a course
  useEffect(() => {
    if (editor && newCourse.longDescription) {
      editor.commands.setContent(newCourse.longDescription);
    }
  }, [editor, newCourse.longDescription]);

  // Filter courses based on search term
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teachers
        .find((t) => t.id === course.instructorId)
        ?.name.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      course.programType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCourse = () => {
    if (newCourse.title && newCourse.description && newCourse.instructorId) {
      const courseToAdd = {
        ...newCourse,
        id: editingId || Math.max(...courses.map((c) => c.id), 0) + 1,
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
    if (editor) {
      editor.commands.clearContent();
    }
  };

  const handleEdit = (course) => {
    setNewCourse({
      ...course,
      instructorId: course.instructorId || "",
    });
    setSelectedFiles([]);
    setSelectedImage(null);
    setImageUrl(course.imageUrl);
    setDocumentUrl("");
    setDocumentName("");
    setEditingId(course.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((course) => course.id !== id));
    }
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
            name: documentName || `Document ${newCourse.documents.length + 1}`,
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

  // Enhanced Editor Menu Bar Component
  const EditorMenuBar = ({ editor }) => {
    if (!editor) {
      return null;
    }

    const textSizes = [
      { label: "Small", value: "12px" },
      { label: "Normal", value: "14px" },
      { label: "Large", value: "16px" },
      { label: "Extra Large", value: "18px" },
      { label: "Huge", value: "20px" },
    ];

    const textColors = [
      "#000000",
      "#4B5563",
      "#EF4444",
      "#3B82F6",
      "#10B981",
      "#F59E0B",
      "#8B5CF6",
      "#EC4899",
    ];

    const ToolbarButton = ({ onClick, active, children, title }) => (
      <button
        type="button" // Add type="button" to prevent form submission
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
        className={`p-2 rounded hover:bg-gray-100 transition-colors ${
          active ? "bg-gray-100 text-blue-600" : "text-gray-700"
        }`}
        title={title}
      >
        {children}
      </button>
    );

    const ToolbarDropdown = ({ icon, label, children }) => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <div className="relative">
          <button
            type="button" // Add type="button" to prevent form submission
            className="flex items-center gap-1 p-2 rounded hover:bg-gray-100 text-gray-700"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(!isOpen);
            }}
          >
            {icon}
            <span className="text-xs">{label}</span>
            <ChevronDown className="w-3 h-3" />
          </button>
          {isOpen && (
            <div
              className="absolute z-10 mt-1 bg-white rounded shadow-lg border border-gray-200 p-2 min-w-[150px]"
              onMouseLeave={() => setIsOpen(false)}
            >
              {children}
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        {/* Text Formatting */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-md">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
            title="Bold"
          >
            <span className="font-bold text-sm">B</span>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
            title="Italic"
          >
            <span className="italic text-sm">I</span>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive("underline")}
            title="Underline"
          >
            <span className="underline text-sm">U</span>
          </ToolbarButton>
        </div>

        {/* Text Size */}
        <ToolbarDropdown
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              className="text-gray-700"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M12 6v15h-2v-5H6v5H4V6h8zm-2 2H8v5h2V8zm10 11v-3h-5v-1h6v5h-1zm-1-8v-1h-7v1h7zm-9-2V3h-2v6H7V3H5v6H2v2h10v-2h-1z" />
            </svg>
          }
          label="Size"
        >
          {textSizes.map((size) => (
            <button
              key={size.value}
              type="button" // Add type="button" to prevent form submission
              onClick={() =>
                editor.chain().focus().setFontSize(size.value).run()
              }
              className={`w-full text-left px-2 py-1 text-xs hover:bg-gray-100 rounded ${
                editor.isActive("textStyle", { fontSize: size.value })
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700"
              }`}
              style={{ fontSize: size.value }}
            >
              {size.label}
            </button>
          ))}
          <button
            type="button" // Add type="button" to prevent form submission
            onClick={() => editor.chain().focus().unsetFontSize().run()}
            className="mt-1 w-full text-left px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded"
          >
            Reset size
          </button>
        </ToolbarDropdown>

        {/* Text Color */}
        <ToolbarDropdown
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              className="text-gray-700"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M15.246 14H8.754l-1.6 4H5l6-15h2l6 15h-2.154l-1.6-4zm-.8-2L12 5.885 9.554 12h4.892z" />
            </svg>
          }
          label="Color"
        >
          <div className="grid grid-cols-5 gap-2 p-2">
            {textColors.map((color) => (
              <button
                key={color}
                type="button" // Add type="button" to prevent form submission
                onClick={() => editor.chain().focus().setColor(color).run()}
                className="w-6 h-6 rounded border border-gray-200 hover:ring-2 hover:ring-gray-300"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
          <button
            type="button" // Add type="button" to prevent form submission
            onClick={() => editor.chain().focus().unsetColor().run()}
            className="mt-1 w-full text-left px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded"
          >
            Reset color
          </button>
        </ToolbarDropdown>

        {/* Headings */}
        <select
          value={editor.getAttributes("heading").level || "paragraph"}
          onChange={(e) => {
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
          className="p-1 border rounded text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="paragraph">Normal text</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
        </select>

        {/* Lists */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-md">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
            title="Bullet List"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              className="text-gray-700"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M8 4h13v2H8V4zM4.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 6.9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM8 11h13v2H8v-2zm0 7h13v2H8v-2z" />
            </svg>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
            title="Numbered List"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              className="text-gray-700"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M8 4h13v2H8V4zM5 3v3h1v1H3V6h1V4H3V3h2zM3 14v-2.5h2V11H3v-1h3v2.5H4v.5h2v1H3zm2 5.5H3v-1h2V18H3v-1h3v4H3v-1h2v-.5zM8 11h13v2H8v-2zm0 7h13v2H8v-2z" />
            </svg>
          </ToolbarButton>
        </div>

        {/* Text Alignment */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-md">
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            active={editor.isActive({ textAlign: "left" })}
            title="Align Left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              className="text-gray-700"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M3 4h18v2H3V4zm0 15h14v2H3v-2zm0-5h18v2H3v-2zm0-5h14v2H3V9z" />
            </svg>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            active={editor.isActive({ textAlign: "center" })}
            title="Align Center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              className="text-gray-700"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M3 4h18v2H3V4zm2 15h14v2H5v-2zm-2-5h18v2H3v-2zm2-5h14v2H5V9z" />
            </svg>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            active={editor.isActive({ textAlign: "right" })}
            title="Align Right"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              className="text-gray-700"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M3 4h18v2H3V4zm4 15h14v2H7v-2zm-4-5h18v2H3v-2zm4-5h14v2H7V9z" />
            </svg>
          </ToolbarButton>
        </div>

        {/* Links */}
        <ToolbarButton
          onClick={() => {
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
          active={editor.isActive("link")}
          title="Link"
        >
          <LinkIcon className="w-4 h-4" />
        </ToolbarButton>

        {/* Clear Formatting */}
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().clearNodes().unsetAllMarks().run()
          }
          title="Clear Formatting"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            className="text-gray-700"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M12.651 14.065L11.605 20H9.574l1.35-7.661-7.41-7.41L4.93 3.515 20.485 19.07l-1.414 1.414-6.42-6.42zm-.878-6.535l.27-1.53h-1.8l-2-2H20v2h-5.927L13.5 9.257 11.773 7.53z" />
          </svg>
        </ToolbarButton>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Courses Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage all your courses in one place
            </p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
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
                <h3 className="font-medium text-gray-700 text-lg border-b pb-2 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  Basic Information
                </h3>

                {/* Course Image Upload Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                    <ImageIcon className="w-4 h-4" />
                    Course Image
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
                      value={imageUrl}
                      onChange={(e) => {
                        setImageUrl(e.target.value);
                        setSelectedImage(null);
                      }}
                      placeholder="Enter image URL"
                    />
                    <button
                      onClick={addImageUrl}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center gap-1 text-sm transition-colors duration-200"
                    >
                      <Check className="w-4 h-4" />
                      Add
                    </button>
                  </div>

                  <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 mb-3 transition-colors duration-200">
                    <div className="flex flex-col items-center justify-center">
                      <Upload className="w-8 h-8 text-gray-500 mb-2" />
                      <p className="text-sm text-gray-500 text-center">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        JPG, PNG (MAX. 5MB)
                      </p>
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
                          className="w-full h-40 object-cover rounded-lg border"
                        />
                        <button
                          onClick={removeImage}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          title="Remove image"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 truncate">
                        {selectedImage ? selectedImage.name : "External image"}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    Course Title*
                  </label>
                  <input
                    type="text"
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
                    value={newCourse.title}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, title: e.target.value })
                    }
                    placeholder="Enter course title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    Short Description*
                  </label>
                  <textarea
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
                    rows="3"
                    value={newCourse.description}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        description: e.target.value,
                      })
                    }
                    placeholder="Brief description of the course"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <FileText className="w-4 h-4" />
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
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
                      value={newCourse.duration}
                      onChange={(e) =>
                        setNewCourse({ ...newCourse, duration: e.target.value })
                      }
                      placeholder="e.g. 12 Weeks"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Level
                    </label>
                    <select
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
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
                <h3 className="font-medium text-gray-700 text-lg border-b pb-2 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-500" />
                  Schedule & Instructor
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
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
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
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
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
                    value={newCourse.instructorId}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        instructorId: e.target.value,
                      })
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Program Type
                  </label>
                  <select
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Mode
                    </label>
                    <select
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
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
                      Price ($)
                    </label>
                    <input
                      type="number"
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
                      value={newCourse.price}
                      onChange={(e) =>
                        setNewCourse({ ...newCourse, price: e.target.value })
                      }
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                {/* Syllabus */}
                <div className="mt-4">
                  <h3 className="font-medium text-gray-700 text-sm mb-2 flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    Syllabus
                  </h3>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      className="flex-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
                      value={currentSyllabusItem}
                      onChange={(e) => setCurrentSyllabusItem(e.target.value)}
                      placeholder="Add syllabus item (e.g. Week 1: Introduction)"
                      onKeyPress={(e) => e.key === "Enter" && addSyllabusItem()}
                    />
                    <button
                      onClick={addSyllabusItem}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2.5 rounded-lg transition-colors duration-200 text-sm flex items-center"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {newCourse.syllabus.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 p-2.5 rounded hover:bg-gray-100 transition-colors duration-200"
                      >
                        <span className="text-sm">{item}</span>
                        <button
                          onClick={() => removeSyllabusItem(index)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200"
                          title="Remove item"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Documents Upload */}
            <div className="mt-4">
              <h3 className="font-medium text-gray-700 text-lg mb-2 border-b pb-2 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                Course Documents
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Document Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
                    value={documentName}
                    onChange={(e) => setDocumentName(e.target.value)}
                    placeholder="Enter document name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Document URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
                      value={documentUrl}
                      onChange={(e) => setDocumentUrl(e.target.value)}
                      placeholder="Enter document URL"
                    />
                    <button
                      onClick={addDocumentUrl}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2.5 rounded-lg flex items-center gap-1 transition-colors duration-200 text-sm"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* File upload section */}
              <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 mb-4 transition-colors duration-200">
                <div className="flex flex-col items-center justify-center">
                  <Upload className="w-8 h-8 text-gray-500 mb-2" />
                  <p className="text-sm text-gray-500 text-center">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, DOC, PPT (MAX. 10MB)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  multiple
                  onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
                />
              </label>

              <div className="space-y-2 max-h-40 overflow-y-auto">
                {newCourse.documents.map((doc, index) => (
                  <div
                    key={`existing-${index}`}
                    className="flex items-center justify-between bg-gray-50 p-2.5 rounded hover:bg-gray-100 transition-colors duration-200"
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
                        className="text-blue-500 hover:text-blue-700 mr-2 transition-colors duration-200 text-sm"
                      >
                        View
                      </a>
                      <button
                        onClick={() => removeDocument(index)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                        title="Remove document"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}

                {selectedFiles.map((file, index) => (
                  <div
                    key={`new-${index}`}
                    className="flex items-center justify-between bg-gray-50 p-2.5 rounded hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-sm">{file.name}</span>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200"
                      title="Remove file"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCourse}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2.5 rounded-lg transition-all duration-200 text-sm shadow-md hover:shadow-lg"
              >
                {editingId ? "Update Course" : "Save Course"}
              </button>
            </div>
          </div>
        </Modal>

        {/* Courses Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row items-start md:items-center gap-3 bg-gradient-to-r from-blue-50 to-gray-50">
            <div className="relative w-full md:w-auto md:flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses by title, instructor or program..."
                className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="text-sm text-gray-500 bg-white px-3 py-1.5 rounded-full shadow-sm">
              {filteredCourses.length}{" "}
              {filteredCourses.length === 1 ? "course" : "courses"} found
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
                    Program
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
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => {
                    const instructor = teachers.find(
                      (t) => t.id === course.instructorId
                    );
                    return (
                      <tr
                        key={course.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {course.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            {course.imageUrl && (
                              <img
                                src={course.imageUrl}
                                alt={course.title}
                                className="w-10 h-10 rounded-md object-cover"
                              />
                            )}
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {course.title}
                              </div>
                              <div className="text-xs text-gray-500">
                                {course.duration}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {instructor ? (
                            <>
                              <div className="text-sm text-gray-900">
                                {instructor.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {instructor.subject}
                              </div>
                            </>
                          ) : (
                            <span className="text-sm text-gray-500">
                              Not assigned
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            {course.programType}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ${course.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex gap-2">
                          <button
                            onClick={() => handleEdit(course)}
                            className="text-blue-600 hover:text-blue-900 transition-colors duration-200 p-1.5 rounded-md hover:bg-blue-50"
                            title="Edit"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(course.id)}
                            className="text-red-600 hover:text-red-900 transition-colors duration-200 p-1.5 rounded-md hover:bg-red-50"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      <div className="flex flex-col items-center justify-center py-8">
                        <BookOpen className="w-12 h-12 text-gray-300 mb-2" />
                        <p className="text-gray-500">
                          No courses found. Try a different search or add a new
                          course.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesManagement;
