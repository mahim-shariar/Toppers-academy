// src/pages/Dashboard/SuccessStories.jsx
import {
  Trophy,
  Plus,
  Search,
  Edit,
  Trash2,
  X,
  Image as ImageIcon,
  Filter,
  BarChart2,
} from "lucide-react";
import { useState, useRef } from "react";

const SuccessStories = () => {
  // Bangladeshi Universities Data
  const universities = {
    public: [
      "University of Dhaka (DU)",
      "Bangladesh University of Engineering and Technology (BUET)",
      "University of Chittagong (CU)",
      "University of Rajshahi (RU)",
      "Jahangirnagar University (JU)",
      "Islamic University, Bangladesh (IU)",
      "Khulna University (KU)",
      "Bangabandhu Sheikh Mujibur Rahman Agricultural University (BSMRAU)",
      "Bangabandhu Sheikh Mujibur Rahman Maritime University (BSMRMU)",
      "Bangladesh Agricultural University (BAU)",
      "Bangladesh University of Professionals (BUP)",
      "Chittagong University of Engineering & Technology (CUET)",
      "Dhaka University of Engineering & Technology (DUET)",
      "Khulna University of Engineering & Technology (KUET)",
      "Rajshahi University of Engineering & Technology (RUET)",
      "Sher-e-Bangla Agricultural University (SAU)",
      "Hajee Mohammad Danesh Science & Technology University (HSTU)",
    ],
    medical: [
      "Dhaka Medical College",
      "Sir Salimullah Medical College",
      "Mymensingh Medical College",
      "Chittagong Medical College",
      "Rajshahi Medical College",
      "Shaheed Suhrawardy Medical College",
      "Rangpur Medical College",
      "Sher-e-Bangla Medical College",
      "Sylhet MAG Osmani Medical College",
      "Faridpur Medical College",
      "Shaheed Ziaur Rahman Medical College",
    ],
    gst: ["GST"],
    nursing: [
      "Bangladesh Nursing College",
      "Dhaka Nursing College",
      "Rajshahi Nursing College",
      "Chittagong Nursing College",
      "Khulna Nursing College",
    ],
  };

  const [stories, setStories] = useState([
    {
      id: 1,
      studentName: "Rahim Khan",
      achievement: "Got admitted to DU Medical College",
      year: "2023",
      description:
        "Scored GPA 5.0 in HSC and secured admission in DU Medical College through competitive exam.",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=60",
      batch: "HSC Batch 2023",
      quote:
        "Toppers Academy's methods helped me understand concepts I struggled with for years!",
      university: "Dhaka Medical College",
      result: "GPA 5.0",
      category: "medical",
    },
    {
      id: 2,
      studentName: "Fatima Begum",
      achievement: "Admitted to BUET CSE",
      year: "2022",
      description:
        "Secured 12th position in BUET admission test for Computer Science and Engineering.",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=60",
      batch: "HSC Batch 2022",
      quote:
        "The admission test preparation was exactly what I needed to succeed.",
      university: "Bangladesh University of Engineering and Technology (BUET)",
      result: "12th Position",
      category: "public",
    },
    {
      id: 3,
      studentName: "Karim Ahmed",
      achievement: "Scholarship at NSU",
      year: "2023",
      description:
        "Received 100% scholarship at North South University for outstanding results.",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=60",
      batch: "University Admission 2023",
      quote:
        "I couldn't have cracked the admission test without their guidance.",
      university: "North South University",
      result: "100% Scholarship",
      category: "private",
    },
    {
      id: 4,
      studentName: "Ayesha Siddiqua",
      achievement: "Admitted to Dhaka University",
      year: "2023",
      description:
        "Got admitted to Dhaka University Economics Department with excellent results.",
      image:
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=600&auto=format&fit=crop&q=60",
      batch: "HSC Batch 2023",
      quote:
        "The guidance from Toppers Academy was invaluable for my admission test.",
      university: "University of Dhaka (DU)",
      result: "GPA 5.0",
      category: "public",
    },
    {
      id: 5,
      studentName: "Tasnim Rahman",
      achievement: "Nursing College Admission",
      year: "2022",
      description:
        "Secured admission in top nursing college with excellent marks.",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&auto=format&fit=crop&q=60",
      batch: "HSC Batch 2022",
      quote:
        "The specialized coaching helped me ace the nursing admission test.",
      university: "Dhaka Nursing College",
      result: "Top 10",
      category: "nursing",
    },
  ]);

  const [stats, setStats] = useState([
    { id: 1, category: "public", count: 125, percentage: "32%" },
    { id: 2, category: "medical", count: 78, percentage: "20%" },
    { id: 3, category: "gst", count: 42, percentage: "11%" },
    { id: 4, category: "nursing", count: 35, percentage: "9%" },
    { id: 5, category: "private", count: 110, percentage: "28%" },
  ]);

  const [newStory, setNewStory] = useState({
    studentName: "",
    achievement: "",
    year: "",
    description: "",
    batch: "",
    quote: "",
    image: "",
    university: "",
    result: "",
    category: "public",
  });

  const [newStat, setNewStat] = useState({
    category: "public",
    count: "",
    percentage: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatModalOpen, setIsStatModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingStat, setIsEditingStat] = useState(false);
  const [currentStory, setCurrentStory] = useState(null);
  const [currentStat, setCurrentStat] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedUniversity, setSelectedUniversity] = useState("all");
  const fileInputRef = useRef(null);

  // Filtered stories based on search and filters
  const filteredStories = stories.filter((story) => {
    const matchesSearch =
      story.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.achievement.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.university.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || story.category === selectedCategory;
    const matchesUniversity =
      selectedUniversity === "all" || story.university === selectedUniversity;

    return matchesSearch && matchesCategory && matchesUniversity;
  });

  // Statistics calculations
  const totalStudents = stories.length;
  const gpa5Students = stories.filter((s) => s.result.includes("GPA 5")).length;
  const universityCounts = stories.reduce((acc, story) => {
    acc[story.university] = (acc[story.university] || 0) + 1;
    return acc;
  }, {});

  const handleAddStory = () => {
    if (
      newStory.studentName &&
      newStory.achievement &&
      newStory.year &&
      newStory.description
    ) {
      setStories([
        ...stories,
        {
          id: stories.length + 1,
          ...newStory,
          image: previewImage || newStory.image,
        },
      ]);
      setNewStory({
        studentName: "",
        achievement: "",
        year: "",
        description: "",
        batch: "",
        quote: "",
        image: "",
        university: "",
        result: "",
        category: "public",
      });
      setPreviewImage("");
      setIsModalOpen(false);
    }
  };

  const handleUpdateStory = () => {
    if (
      currentStory.studentName &&
      currentStory.achievement &&
      currentStory.year &&
      currentStory.description
    ) {
      setStories(
        stories.map((story) =>
          story.id === currentStory.id
            ? {
                ...currentStory,
                image: previewImage || currentStory.image,
              }
            : story
        )
      );
      setPreviewImage("");
      setIsModalOpen(false);
    }
  };

  const handleEdit = (story) => {
    setCurrentStory({ ...story });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setStories(stories.filter((story) => story.id !== id));
  };

  const handleAddStat = () => {
    if (newStat.category && newStat.count && newStat.percentage) {
      setStats([
        ...stats,
        {
          id: stats.length + 1,
          ...newStat,
        },
      ]);
      setNewStat({
        category: "public",
        count: "",
        percentage: "",
      });
      setIsStatModalOpen(false);
    }
  };

  const handleUpdateStat = () => {
    if (currentStat.category && currentStat.count && currentStat.percentage) {
      setStats(
        stats.map((stat) => (stat.id === currentStat.id ? currentStat : stat))
      );
      setIsStatModalOpen(false);
    }
  };

  const handleEditStat = (stat) => {
    setCurrentStat({ ...stat });
    setIsEditingStat(true);
    setIsStatModalOpen(true);
  };

  const handleDeleteStat = (id) => {
    setStats(stats.filter((stat) => stat.id !== id));
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

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Success Stories</h1>
          <p className="text-gray-600">
            Inspiring achievements of our students
          </p>
        </div>
        <button
          onClick={() => {
            setIsEditing(false);
            setCurrentStory(null);
            setPreviewImage("");
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Story
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="relative flex justify-end">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search success stories..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="public">Public Universities</option>
            <option value="medical">Medical Colleges</option>
            <option value="gst">GST</option>
            <option value="nursing">Nursing</option>
            <option value="private">Private Universities</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            University
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedUniversity}
            onChange={(e) => setSelectedUniversity(e.target.value)}
          >
            <option value="all">All Universities</option>
            {selectedCategory === "all" || selectedCategory === "public"
              ? universities.public.map((uni, index) => (
                  <option key={`public-${index}`} value={uni}>
                    {uni}
                  </option>
                ))
              : null}
            {selectedCategory === "all" || selectedCategory === "medical"
              ? universities.medical.map((uni, index) => (
                  <option key={`medical-${index}`} value={uni}>
                    {uni}
                  </option>
                ))
              : null}
            {selectedCategory === "all" || selectedCategory === "gst"
              ? universities.gst.map((uni, index) => (
                  <option key={`gst-${index}`} value={uni}>
                    {uni}
                  </option>
                ))
              : null}
            {selectedCategory === "all" || selectedCategory === "nursing"
              ? universities.nursing.map((uni, index) => (
                  <option key={`nursing-${index}`} value={uni}>
                    {uni}
                  </option>
                ))
              : null}
          </select>
        </div>
      </div>

      {/* Success Stats Summary */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Admission Statistics
          </h2>
          <button
            onClick={() => {
              setIsEditingStat(false);
              setCurrentStat(null);
              setIsStatModalOpen(true);
            }}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
          >
            <Plus className="w-4 h-4" /> Add Stat
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{totalStudents}</p>
            <p className="text-sm text-gray-600">Total Students</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{gpa5Students}</p>
            <p className="text-sm text-gray-600">GPA 5 Achievers</p>
          </div>
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-purple-50 p-4 rounded-lg relative group"
            >
              <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEditStat(stat)}
                  className="text-blue-600 hover:text-blue-800 p-1"
                >
                  <Edit className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleDeleteStat(stat.id)}
                  className="text-red-600 hover:text-red-800 p-1"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <p className="text-2xl font-bold text-purple-600">{stat.count}</p>
              <p className="text-sm text-gray-600 capitalize">
                {stat.category} Students
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {stat.percentage} of total
              </p>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <h3 className="font-medium mb-3">University-wise Distribution</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(universityCounts)
              .sort((a, b) => b[1] - a[1])
              .map(([uni, count]) => (
                <div
                  key={uni}
                  className="bg-gray-50 p-3 rounded-lg flex justify-between items-center"
                >
                  <p className="text-sm font-medium">{uni}</p>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {count}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Success Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredStories.length > 0 ? (
          filteredStories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="relative h-48 overflow-hidden group">
                <img
                  src={
                    story.image ||
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&auto=format&fit=crop&q=60"
                  }
                  alt={story.studentName}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <p className="text-sm text-white/80">{story.batch}</p>
                  <h3 className="text-xl font-bold text-white">
                    {story.studentName}
                  </h3>
                </div>
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(story)}
                    className="bg-white/90 text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-white transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(story.id)}
                    className="bg-white/90 text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-white transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {story.achievement}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {story.university}
                      </span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        {story.result}
                      </span>
                    </div>
                  </div>
                  <Trophy className="w-6 h-6 text-yellow-500" />
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {story.description}
                </p>
                {story.quote && (
                  <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <p className="text-sm italic text-gray-700">
                      "{story.quote}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">
              No success stories found matching your criteria
            </p>
          </div>
        )}
      </div>

      {/* Add/Edit Story Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {isEditing ? "Edit Success Story" : "Add New Success Story"}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setPreviewImage("");
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student Image
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-300">
                      {previewImage || (isEditing && currentStory.image) ? (
                        <img
                          src={previewImage || currentStory.image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        onClick={triggerFileInput}
                        type="button"
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                      >
                        Upload Image
                      </button>
                      <p className="text-xs text-gray-500 mt-2">
                        or paste image URL below
                      </p>
                      <input
                        type="text"
                        className="w-full mt-2 p-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="Image URL"
                        value={isEditing ? currentStory.image : newStory.image}
                        onChange={(e) =>
                          isEditing
                            ? setCurrentStory({
                                ...currentStory,
                                image: e.target.value,
                              })
                            : setNewStory({
                                ...newStory,
                                image: e.target.value,
                              })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Student Name*
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={
                      isEditing
                        ? currentStory.studentName
                        : newStory.studentName
                    }
                    onChange={(e) =>
                      isEditing
                        ? setCurrentStory({
                            ...currentStory,
                            studentName: e.target.value,
                          })
                        : setNewStory({
                            ...newStory,
                            studentName: e.target.value,
                          })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Achievement*
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={
                      isEditing
                        ? currentStory.achievement
                        : newStory.achievement
                    }
                    onChange={(e) =>
                      isEditing
                        ? setCurrentStory({
                            ...currentStory,
                            achievement: e.target.value,
                          })
                        : setNewStory({
                            ...newStory,
                            achievement: e.target.value,
                          })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year*
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={isEditing ? currentStory.year : newStory.year}
                    onChange={(e) =>
                      isEditing
                        ? setCurrentStory({
                            ...currentStory,
                            year: e.target.value,
                          })
                        : setNewStory({ ...newStory, year: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Batch
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={isEditing ? currentStory.batch : newStory.batch}
                    onChange={(e) =>
                      isEditing
                        ? setCurrentStory({
                            ...currentStory,
                            batch: e.target.value,
                          })
                        : setNewStory({ ...newStory, batch: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category*
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={
                      isEditing ? currentStory.category : newStory.category
                    }
                    onChange={(e) =>
                      isEditing
                        ? setCurrentStory({
                            ...currentStory,
                            category: e.target.value,
                          })
                        : setNewStory({ ...newStory, category: e.target.value })
                    }
                  >
                    <option value="public">Public University</option>
                    <option value="medical">Medical College</option>
                    <option value="gst">GST</option>
                    <option value="nursing">Nursing</option>
                    <option value="private">Private University</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    University/College*
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={
                      isEditing ? currentStory.university : newStory.university
                    }
                    onChange={(e) =>
                      isEditing
                        ? setCurrentStory({
                            ...currentStory,
                            university: e.target.value,
                          })
                        : setNewStory({
                            ...newStory,
                            university: e.target.value,
                          })
                    }
                    placeholder="Name of institution"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Result*
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={isEditing ? currentStory.result : newStory.result}
                    onChange={(e) =>
                      isEditing
                        ? setCurrentStory({
                            ...currentStory,
                            result: e.target.value,
                          })
                        : setNewStory({ ...newStory, result: e.target.value })
                    }
                    placeholder="GPA 5.0, Position, etc."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description*
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                    value={
                      isEditing
                        ? currentStory.description
                        : newStory.description
                    }
                    onChange={(e) =>
                      isEditing
                        ? setCurrentStory({
                            ...currentStory,
                            description: e.target.value,
                          })
                        : setNewStory({
                            ...newStory,
                            description: e.target.value,
                          })
                    }
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Student Quote
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="2"
                    value={isEditing ? currentStory.quote : newStory.quote}
                    onChange={(e) =>
                      isEditing
                        ? setCurrentStory({
                            ...currentStory,
                            quote: e.target.value,
                          })
                        : setNewStory({ ...newStory, quote: e.target.value })
                    }
                    placeholder="What did the student say about their success?"
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-end mt-6 space-x-3">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setPreviewImage("");
                  }}
                  className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={isEditing ? handleUpdateStory : handleAddStory}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-colors"
                >
                  {isEditing ? "Update Story" : "Save Story"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Stat Modal */}
      {isStatModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {isEditingStat ? "Edit Statistic" : "Add New Statistic"}
              </h2>
              <button
                onClick={() => setIsStatModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category*
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={
                      isEditingStat ? currentStat.category : newStat.category
                    }
                    onChange={(e) =>
                      isEditingStat
                        ? setCurrentStat({
                            ...currentStat,
                            category: e.target.value,
                          })
                        : setNewStat({ ...newStat, category: e.target.value })
                    }
                  >
                    <option value="public">Public University</option>
                    <option value="medical">Medical College</option>
                    <option value="gst">GST</option>
                    <option value="nursing">Nursing</option>
                    <option value="private">Private University</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Student Count*
                  </label>
                  <input
                    type="number"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={isEditingStat ? currentStat.count : newStat.count}
                    onChange={(e) =>
                      isEditingStat
                        ? setCurrentStat({
                            ...currentStat,
                            count: e.target.value,
                          })
                        : setNewStat({ ...newStat, count: e.target.value })
                    }
                    placeholder="Number of students"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Percentage*
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={
                      isEditingStat
                        ? currentStat.percentage
                        : newStat.percentage
                    }
                    onChange={(e) =>
                      isEditingStat
                        ? setCurrentStat({
                            ...currentStat,
                            percentage: e.target.value,
                          })
                        : setNewStat({ ...newStat, percentage: e.target.value })
                    }
                    placeholder="Percentage of total"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6 space-x-3">
                <button
                  onClick={() => setIsStatModalOpen(false)}
                  className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={isEditingStat ? handleUpdateStat : handleAddStat}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-colors"
                >
                  {isEditingStat ? "Update Stat" : "Save Stat"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessStories;
