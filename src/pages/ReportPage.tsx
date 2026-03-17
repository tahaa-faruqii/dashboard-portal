import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  Download,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  MoreVertical,
} from "lucide-react";
import { CSVLink } from "react-csv";

interface ReportData {
  id: number;
  customer: string;
  email: string;
  revenue: number;
  status: "paid" | "pending" | "overdue";
  date: string;
  category: string;
}

const ReportsPage: React.FC = () => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof ReportData;
    direction: "asc" | "desc";
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ status: "", category: "" });

  const reportData: ReportData[] = useMemo(
    () => [
      {
        id: 1,
        customer: "TechCorp Inc",
        email: "billing@techcorp.com",
        revenue: 12450,
        status: "paid",
        date: "2026-03-01",
        category: "Subscription",
      },
      {
        id: 2,
        customer: "WebSolutions",
        email: "john@websolutions.com",
        revenue: 8900,
        status: "pending",
        date: "2026-03-02",
        category: "Consulting",
      },
      {
        id: 3,
        customer: "Digital Agency",
        email: "sarah@digital.com",
        revenue: 23450,
        status: "paid",
        date: "2026-03-03",
        category: "Development",
      },
      {
        id: 4,
        customer: "StartupX",
        email: "team@startupx.com",
        revenue: 4500,
        status: "overdue",
        date: "2026-03-04",
        category: "Hosting",
      },
      {
        id: 5,
        customer: "E-commerce LLC",
        email: "orders@ecom.com",
        revenue: 15600,
        status: "paid",
        date: "2026-03-05",
        category: "Subscription",
      },
      {
        id: 6,
        customer: "Marketing Pro",
        email: "marketing@pro.com",
        revenue: 7800,
        status: "pending",
        date: "2026-03-06",
        category: "Advertising",
      },
      {
        id: 7,
        customer: "Design Studio",
        email: "hello@design.com",
        revenue: 18900,
        status: "paid",
        date: "2026-03-07",
        category: "Design",
      },
    ],
    [],
  );

  const filteredData = useMemo(() => {
    let filtered = reportData.filter(
      (item) =>
        item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (filters.status) {
      filtered = filtered.filter((item) => item.status === filters.status);
    }
    if (filters.category) {
      filtered = filtered.filter((item) => item.category === filters.category);
    }

    return filtered;
  }, [reportData, searchTerm, filters]);

  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  const ITEMS_PER_PAGE = 5;
  const paginatedData = sortedData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );
  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);

  const csvData = sortedData.map((item) => ({
    ID: item.id,
    Customer: item.customer,
    Email: item.email,
    Revenue: `$${item.revenue.toLocaleString()}`,
    Status: item.status.toUpperCase(),
    Date: item.date,
    Category: item.category,
  }));

  const getStatusColor = (status: ReportData["status"]) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200";
      case "pending":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200";
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200";
    }
  };

  const handleSort = (key: keyof ReportData) => {
    setSortConfig(
      sortConfig?.key === key && sortConfig.direction === "asc"
        ? { key, direction: "desc" }
        : { key, direction: "asc" },
    );
  };

  console.log("ReportsPage render - sortConfig:", sortConfig);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
            Reports
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Transaction history and detailed reports
          </p>
        </div>
        <CSVLink
          data={csvData}
          filename="reports.csv"
          className="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex items-center"
        >
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </CSVLink>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option>Period: All Time</option>
        </select>
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Status</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="overdue">Overdue</option>
        </select>
        <button className="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center">
          <Filter className="w-4 h-4 mr-2" />
          More Filters
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
              <tr>
                {[
                  { key: "customer", label: "Customer", sortable: true },
                  { key: "email", label: "Email", sortable: true },
                  { key: "revenue", label: "Revenue", sortable: true },
                  { key: "status", label: "Status", sortable: true },
                  { key: "date", label: "Date", sortable: true },
                  { key: "category", label: "Category", sortable: true },
                  { label: "" },
                ].map((header) => (
                  <th
                    key={header.key || header.label}
                    className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    onClick={() =>
                      header.sortable &&
                      handleSort(header.key as keyof ReportData)
                    }
                  >
                    <div className="flex items-center cursor-pointer group">
                      {header.label}
                      {sortConfig?.key === header.key &&
                        (sortConfig?.direction === "asc" ? (
                          <ChevronUp className="w-3 h-3 ml-1 group-hover:opacity-100 opacity-70" />
                        ) : (
                          <ChevronDown className="w-3 h-3 ml-1 group-hover:opacity-100 opacity-70" />
                        ))}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedData.map((row) => (
                <tr
                  key={row.id}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${row.revenue < 6000 ? "border-l-4 border-red-500" : ""}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {row.customer}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {row.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${row.revenue.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(row.status)}`}
                    >
                      {row.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {row.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200">
                      {row.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <MoreVertical className="w-5 h-5 text-gray-400 hover:text-gray-900 cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 flex items-center justify-between">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing{" "}
              <span className="font-medium">
                {(currentPage - 1) * ITEMS_PER_PAGE + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(currentPage * ITEMS_PER_PAGE, sortedData.length)}
              </span>{" "}
              of <span className="font-medium">{sortedData.length}</span>{" "}
              results
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                      currentPage === page
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-gray-500 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ReportsPage;
