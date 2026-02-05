import axios from "../utils/axios";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ClockIcon,
  UsersIcon,
  TicketIcon,
  ArrowPathIcon,
  CheckBadgeIcon,
  BuildingOfficeIcon,
  QueueListIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  FunnelIcon
} from "@heroicons/react/24/outline";

const DashboardAdmin = () => {
  const [services, setServices] = useState([]);
  const [queues, setQueues] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState({});
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [autoRefresh, setAutoRefresh] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        Object.keys(queues).forEach(deptId => {
          fetchQueue(deptId);
        });
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, queues]);

  // Compute unique department names
  const uniqueDepartmentNames = useMemo(() => {
    const names = new Set();
    services.forEach(center => {
      center.departments.forEach(dept => {
        names.add(dept.name);
      });
    });
    return Array.from(names);
  }, [services]);

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

  const fetchQueue = (deptId) => {
    setRefreshing(prev => ({ ...prev, [deptId]: true }));
    axios
      .get(`/queue/list/${deptId}`)
      .then((res) => {
        setQueues(prev => ({
          ...prev,
          [deptId]: res.data,
        }));
      })
      .catch((err) => {
        console.error("Error fetching queue:", err);
      })
      .finally(() => {
        setRefreshing(prev => ({ ...prev, [deptId]: false }));
      });
  };

  const serveToken = (tokenNumber, deptId) => {
    if (!window.confirm(`Serve token #${tokenNumber}?`)) return;
    axios
      .post(`/queue/serve/${tokenNumber}`)
      .then(() => {
        fetchQueue(deptId);
      })
      .catch((err) => {
        console.error("Error serving token:", err);
        alert("Failed to serve token.");
      });
  };

  const filteredServices = useMemo(() => {
    return services.filter(center => {
      const matchesSearch =
        searchTerm === "" ||
        center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        center.departments.some(dept =>
          dept.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesTab =
        activeTab === "all" ||
        center.departments.some(dept => dept.name === activeTab);

      return matchesSearch && matchesTab;
    });
  }, [services, searchTerm, activeTab]);

  const clearSearch = () => {
    setSearchTerm("");
    setActiveTab("all");
  };

  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
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
        <p className="font-bold">Error</p>
        <p>Failed to load services: {error}</p>
        <button
          onClick={fetchServices}
          className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
        >
          Retry
        </button>
      </motion.div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center mb-4">
          <QueueListIcon className="w-8 h-8 mr-2 text-cyan-600" />
          Queue Management Dashboard
        </h1>

        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search services or departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
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

          <div className="flex items-center gap-4">
            <button
              onClick={toggleAutoRefresh}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
                autoRefresh
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              <ArrowPathIcon
                className={`w-4 h-4 mr-2 ${autoRefresh ? "animate-spin" : ""}`}
              />
              {autoRefresh ? "Auto Refresh ON" : "Auto Refresh OFF"}
            </button>

            <div className="relative">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              >
                <option value="all">All Departments</option>
                {uniqueDepartmentNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FunnelIcon className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {filteredServices.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
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
                    transition={{ duration: 0.3 }}
                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center mb-2">
                            <BuildingOfficeIcon className="w-5 h-5 text-gray-500 mr-2" />
                            <h2 className="text-xl font-bold text-gray-800">
                              {center.name}
                            </h2>
                          </div>
                          <div className="flex items-center text-gray-600 mb-1">
                            <UsersIcon className="w-4 h-4 mr-1" />
                            <span className="text-sm">{dept.name}</span>
                          </div>
                        </div>
                        <div className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-xs font-semibold">
                          {dept.maxSlots} slots
                        </div>
                      </div>

                      <div className="flex justify-between mt-4 text-sm">
                        <div className="flex items-center text-gray-500">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          <span>Avg: {dept.avgServiceTime} mins</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <TicketIcon className="w-4 h-4 mr-1" />
                          <span>
                            {queues[dept.id]?.length || 0} in queue
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 flex space-x-2">
                        <button
                          onClick={() => fetchQueue(dept.id)}
                          className="flex-1 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                        >
                          {refreshing[dept.id] ? (
                            <ArrowPathIcon className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <ArrowPathIcon className="w-4 h-4 mr-2" />
                              Refresh Queue
                            </>
                          )}
                        </button>
                      </div>

                      {queues[dept.id] && (
                        <div className="mt-4 border-t pt-4">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-gray-700 flex items-center">
                              <QueueListIcon className="w-4 h-4 mr-2" />
                              Current Queue
                            </h3>
                            <span className="text-xs text-gray-500">
                              {queues[dept.id].length} waiting
                            </span>
                          </div>

                          {queues[dept.id].length === 0 ? (
                            <p className="text-gray-400 text-sm italic py-2">
                              No customers in queue
                            </p>
                          ) : (
                            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                              {queues[dept.id].map((token, index) => (
                                <motion.div
                                  key={`${dept.id}-${token.tokenNumber}`}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: index * 0.05 }}
                                  className={`flex justify-between items-center rounded-lg px-3 py-2 ${
                                    index === 0
                                      ? "bg-green-50 border border-green-100"
                                      : "bg-gray-50 hover:bg-gray-100"
                                  } transition-colors`}
                                >
                                  <div className="flex items-center">
                                    <span
                                      className={`font-medium ${
                                        index === 0
                                          ? "text-green-800"
                                          : "text-gray-800"
                                      }`}
                                    >
                                      #{token.tokenNumber}
                                    </span>
                                    {token.priority && (
                                      <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
                                        Priority
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {index === 0 && (
                                      <span className="text-xs text-green-600 font-medium">
                                        NEXT
                                      </span>
                                    )}
                                    <button
                                      onClick={() =>
                                        serveToken(token.tokenNumber, dept.id)
                                      }
                                      className={`flex items-center px-3 py-1 rounded-md text-sm ${
                                        index === 0
                                          ? "bg-green-600 hover:bg-green-700 text-white"
                                          : "bg-green-100 hover:bg-green-200 text-green-800"
                                      }`}
                                    >
                                      <CheckBadgeIcon className="w-4 h-4 mr-1" />
                                      {index === 0
                                        ? "Serve Now"
                                        : "Serve"}
                                    </button>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
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

export default DashboardAdmin;
