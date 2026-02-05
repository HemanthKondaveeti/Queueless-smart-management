import axios from "../utils/axios";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClockIcon,
  UsersIcon,
  TicketIcon,
  BuildingOfficeIcon,
  ArrowRightIcon,
  UserGroupIcon,
  MagnifyingGlassIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";

const DashboardUser = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [joiningQueue, setJoiningQueue] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = () => {
    setLoading(true);
    axios
      .get("/services")
      .then((res) => {
        setServices(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API ERROR ===>", err);
        setError(err.message);
        setLoading(false);
      });
  };

  const joinQueue = (deptId) => {
    setJoiningQueue(deptId);
    axios
      .post("/queue/join", { departmentId: deptId })
      .then((res) => {
        setJoiningQueue(null);
        alert(
          `🎟️ Your Token Number: ${res.data.tokenNumber}\n⏱️ Estimated Wait Time: ${res.data.estimatedWaitTime} minutes`
        );
      })
      .catch((err) => {
        setJoiningQueue(null);
        console.error("Error joining queue:", err);
        alert(
          `❌ Failed to join queue: ${
            err.response?.data?.message || err.message
          }`
        );
      });
  };

  // Compute unique department names and ids
  const uniqueDepartments = [];
  const seenNames = new Set();

  services.forEach(center => {
    center.departments.forEach(dept => {
      if (!seenNames.has(dept.name)) {
        uniqueDepartments.push({
          id: dept.id,
          name: dept.name
        });
        seenNames.add(dept.name);
      }
    });
  });

  const filteredServices = services.filter(center => {
    const matchesSearch =
      center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.departments.some(dept =>
        dept.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesTab =
      activeTab === "all" ||
      center.departments.some(dept => dept.name === activeTab);

    return matchesSearch && matchesTab;
  });

  const clearSearch = () => {
    setSearchTerm("");
    setActiveTab("all");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-cyan-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mx-6 my-4"
      >
        <p className="font-bold">Error Loading Services</p>
        <p>{error}</p>
        <button
          onClick={fetchServices}
          className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
        >
          Retry
        </button>
      </motion.div>
    );
  }

  if (!Array.isArray(services)) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg mx-6 my-4"
      >
        <p>Unexpected data format from backend</p>
        <button
          onClick={fetchServices}
          className="mt-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md"
        >
          Reload
        </button>
      </motion.div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold text-gray-800 flex justify-center items-center gap-3"
        >
          <UserGroupIcon className="w-10 h-10 text-cyan-600" />
          Available Services
        </motion.h1>
        <p className="text-gray-500 mt-2">
          Select a department to join the queue instantly.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="relative max-w-md mx-auto mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search services or departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === "all"
                ? "bg-cyan-100 text-cyan-800"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Departments
          </button>
          {uniqueDepartments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setActiveTab(dept.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === dept.name
                  ? "bg-cyan-100 text-cyan-800"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {dept.name}
            </button>
          ))}
        </div>
      </div>

      {filteredServices.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-gray-400 mb-4">
            <MagnifyingGlassIcon className="mx-auto h-12 w-12" />
          </div>
          <h3 className="text-lg font-medium text-gray-700">
            No services found
          </h3>
          <p className="text-gray-500 mt-1">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={clearSearch}
            className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Clear search
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredServices.map((center) =>
              center.departments
                .filter(
                  (dept) =>
                    activeTab === "all" ||
                    dept.name === activeTab
                )
                .map((dept) => (
                  <motion.div
                    key={dept.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                    }}
                    transition={{ duration: 0.4, type: "spring" }}
                    className="bg-gradient-to-br from-white via-gray-50 to-gray-100 border border-gray-200 rounded-xl overflow-hidden shadow hover:shadow-lg"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center mb-3">
                            <BuildingOfficeIcon className="w-5 h-5 text-gray-400 mr-2" />
                            <h2 className="text-xl font-bold text-gray-700">
                              {center.name}
                            </h2>
                          </div>
                          <div className="flex items-center text-gray-500 mb-2">
                            <UsersIcon className="w-4 h-4 mr-1" />
                            <span className="text-sm">{dept.name}</span>
                          </div>
                        </div>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3, type: "spring" }}
                          className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-xs font-semibold"
                        >
                          {dept.maxSlots} slots
                        </motion.div>
                      </div>

                      <div className="flex justify-between mt-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          <span>Avg: {dept.avgServiceTime} mins</span>
                        </div>
                        <div className="flex items-center">
                          <TicketIcon className="w-4 h-4 mr-1" />
                          <span>Join now</span>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => joinQueue(dept.id)}
                        disabled={joiningQueue === dept.id}
                        className={`w-full mt-5 py-3 rounded-lg font-semibold flex items-center justify-center transition-colors duration-300 ${
                          joiningQueue === dept.id
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white"
                        }`}
                      >
                        {joiningQueue === dept.id ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            Join Queue <ArrowRightIcon className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                ))
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default DashboardUser;
