import { useState, useMemo, useContext, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import ActionMenu from "./action-menu";
import Pagination from "./pagination";
import { GlobalDataContext } from "./global-data-context";
import ActionMenuAcademic from "./action-menu-academic";
import ViewAcademicModal from "./view-academic-modal";

export default function AdminAcademicYearTable({ filters, searchTerm = "" }) {
  const { academicYears, fetchAcademicYears } = useContext(GlobalDataContext);

  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedAcademic, setSelectedAcademic] = useState(null);

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleView = (id) => {
    const academic = academicYears.find((academic) => academic.id === id);
    setSelectedAcademic(academic);
  };

  const handleDelete = async (id) => {
    const response = await fetch(`/api/academic-years/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      fetchAcademicYears();
    }
  };
  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    // First filter by search term
    let result = academicYears.filter((item) => {
      if (!searchTerm) return true;

      return (
        item.academic_year.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.academic_semester.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.created_at.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    // Then filter by dropdown selections
    if (filters?.year) {
      result = result.filter(
        (item) => item.academic_year === filters.year
      );
    }

    // Then sort
    if (sortField) {
      result.sort((a, b) => {
        if (a[sortField] < b[sortField]) {
          return sortDirection === "asc" ? -1 : 1;
        }
        if (a[sortField] > b[sortField]) {
          return sortDirection === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [academicYears, searchTerm, sortField, sortDirection, filters]);

  // Get current page data
  const currentData = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredAndSortedData.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredAndSortedData, currentPage, itemsPerPage]);

  const handleCloseModal = () => {
    setSelectedAcademic(null);
  };

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th
                className="column-year"
                onClick={() => handleSort("academic_year")}
              >
                <div className="sortable-header">
                  <span>Academic Year</span>
                  {sortField === "academic_year" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp size={14} />
                    ) : (
                      <ChevronDown size={14} />
                    ))}
                </div>
              </th>
              <th
                className="column-semester"
                onClick={() => handleSort("academic_semester")}
              >
                <div className="sortable-header">
                  <span>Semester</span>
                  {sortField === "academic_semester" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp size={14} />
                    ) : (
                      <ChevronDown size={14} />
                    ))}
                </div>
              </th>
              <th
                className="column-date"
                onClick={() => handleSort("created_at")}
              >
                <div className="sortable-header">
                  <span>Created At</span>
                  {sortField === "created_at" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp size={14} />
                    ) : (
                      <ChevronDown size={14} />
                    ))}
                </div>
              </th>
              <th className="column-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((data) => (
                <tr key={data.id}>
                  <td>{data.academic_year}</td>
                  <td>{data.academic_semester}</td>
                  <td>{new Date(data.created_at).toLocaleDateString()}</td>
                  <td>
                    <ActionMenuAcademic
                      onView={() => handleView(data.id)}
                      onDelete={() => handleDelete(data.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="empty-table">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredAndSortedData.length >= 0 && (
        <Pagination
          totalItems={filteredAndSortedData.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}

      {selectedAcademic && (
        <ViewAcademicModal
          academicData={selectedAcademic}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
