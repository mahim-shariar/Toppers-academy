// src/pages/Dashboard/SuccessStories.jsx
import { Trophy, Plus, Search, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

const SuccessStories = () => {
  const [stories, setStories] = useState([
    {
      id: 1,
      studentName: "Rahim Khan",
      achievement: "Got admitted to DU Medical College",
      year: "2023",
      description:
        "Scored GPA 5.0 in HSC and secured admission in DU Medical College through competitive exam.",
    },
    {
      id: 2,
      studentName: "Fatima Begum",
      achievement: "Admitted to BUET CSE",
      year: "2022",
      description:
        "Secured 12th position in BUET admission test for Computer Science and Engineering.",
    },
    {
      id: 3,
      studentName: "Karim Ahmed",
      achievement: "Scholarship at NSU",
      year: "2023",
      description:
        "Received 100% scholarship at North South University for outstanding results.",
    },
  ]);

  const [newStory, setNewStory] = useState({
    studentName: "",
    achievement: "",
    year: "",
    description: "",
  });

  const [isAdding, setIsAdding] = useState(false);

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
          studentName: newStory.studentName,
          achievement: newStory.achievement,
          year: newStory.year,
          description: newStory.description,
        },
      ]);
      setNewStory({
        studentName: "",
        achievement: "",
        year: "",
        description: "",
      });
      setIsAdding(false);
    }
  };

  const handleDelete = (id) => {
    setStories(stories.filter((story) => story.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Success Stories</h1>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Story
        </button>
      </div>

      {isAdding && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Add New Success Story</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student Name
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={newStory.studentName}
                onChange={(e) =>
                  setNewStory({ ...newStory, studentName: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Achievement
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={newStory.achievement}
                onChange={(e) =>
                  setNewStory({ ...newStory, achievement: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={newStory.year}
                onChange={(e) =>
                  setNewStory({ ...newStory, year: e.target.value })
                }
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows="3"
              value={newStory.description}
              onChange={(e) =>
                setNewStory({ ...newStory, description: e.target.value })
              }
            ></textarea>
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <button
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleAddStory}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Save Story
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
              placeholder="Search success stories..."
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
                  Student Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Achievement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stories.map((story) => (
                <tr key={story.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {story.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {story.studentName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {story.achievement}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {story.year}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(story.id)}
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

export default SuccessStories;
