import { useState, useMemo } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import ActionMenu from "./action-menu"
import Pagination from "./pagination"

export default function AcademicYearTable({ filters, searchTerm = "" }) {
  const initialData = [
    {
      id: 1,
      year: "2023-2024",
      status: "Active",
      createdAt: "2023-01-15",
      semester: "2nd Semester",
    },
    {
      id: 2,
      year: "2022-2023",
      status: "Inactive",
      createdAt: "2022-01-10",
      semester: "2nd Semester",
    },
  ];

  const [sortField, setSortField] = useState(null)
  const [sortDirection, setSortDirection] = useState("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    // First filter by search term
    let result = initialData.filter((item) => {
      if (!searchTerm) return true

      return (
        item.year.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toString().includes(searchTerm) ||
        item.createdAt.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })

    // Then filter by dropdown selections
    if (filters?.year) {
      result = result.filter((item) => item.year === filters.year)
    }

    if (filters?.college) {
      result = result.filter((item) => item.college === filters.college)
    }

    // Then sort
    if (sortField) {
      result.sort((a, b) => {
        if (a[sortField] < b[sortField]) {
          return sortDirection === "asc" ? -1 : 1
        }
        if (a[sortField] > b[sortField]) {
          return sortDirection === "asc" ? 1 : -1
        }
        return 0
      })
    }

    return result
  }, [initialData, searchTerm, sortField, sortDirection, filters])

  // Get current page data
  const currentData = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    return filteredAndSortedData.slice(indexOfFirstItem, indexOfLastItem)
  }, [filteredAndSortedData, currentPage, itemsPerPage])

  // Action handlers
  const handleView = (id) => {
    console.log("View item", id)
  }

  const handleDelete = (id) => {
    console.log("Delete item", id)
  }

  // Render sort indicator
  const renderSortIndicator = (field) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />
  }

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th className="column-year" onClick={() => handleSort("year")}>
                <div className="sortable-header">
                  <span>Academic Year</span>
                  {renderSortIndicator("year")}
                </div>
              </th>
              <th
                className="column-semester"
                onClick={() => handleSort("semester")}
              >
                <div className="sortable-header">
                  <span>Semester</span>
                  {renderSortIndicator("semester")}
                </div>
              </th>
              <th
                className="column-status"
                onClick={() => handleSort("status")}
              >
                <div className="sortable-header">
                  <span>Status</span>
                  {renderSortIndicator("status")}
                </div>
              </th>
              <th
                className="column-date"
                onClick={() => handleSort("createdAt")}
              >
                <div className="sortable-header">
                  <span>Created At</span>
                  {renderSortIndicator("createdAt")}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((year) => (
                <tr key={year.id}>
                  <td>{year.year}</td>
                  <td>{year.semester}</td>
                  <td>
                    <span
                      className={`status-badge ${year.status.toLowerCase()}`}
                    >
                      {year.status}
                    </span>
                  </td>
                  <td>{year.createdAt}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="empty-table">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredAndSortedData.length > 0 && (
        <Pagination
          totalItems={filteredAndSortedData.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
