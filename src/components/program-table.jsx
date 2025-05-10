import { useState, useMemo, useContext } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import ActionMenu from "./action-menu";
import Pagination from "./pagination";
import { GlobalDataContext } from "./global-data-context";
import ViewProgramModal from "./view-program-modal";

export default function ProgramTable({ filters, searchTerm = "" }) {
  const { programs, fetchPrograms } = useContext(GlobalDataContext);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedProgram, setSelectedProgram] = useState(null);

  const mappedPrograms = useMemo(() => {
    return programs.map((program) => ({
      ...program,
      status: program.program_active ? "Active" : "Inactive",
      created_at: program.created_at,
    }));
  }, [programs]);

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

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    // First filter by search term
    let result = mappedPrograms.filter((item) => {
      if (!searchTerm) return true;
      return (
        item.program_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.program_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.workflow.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.program_college.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    // Then filter by dropdown selections
    if (filters?.workflow) {
      result = result.filter((item) => item.workflow === filters.workflow);
    }

    if (filters?.college) {
      result = result.filter((item) => item.program_college === filters.college);
    }

    if (filters?.status) {
      result = result.filter((item) => item.status === filters.status);
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
  }, [mappedPrograms, searchTerm, sortField, sortDirection, filters]);

  // Get current page data
  const currentData = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredAndSortedData.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredAndSortedData, currentPage, itemsPerPage]);

  // Action handlers
  const handleView = (id) => {
    const program = programs.find((program) => program.id === id);
    setSelectedProgram(program);
  };

  const handleDelete = async (id) => {
    const response = await fetch(`/api/programs/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      fetchPrograms();
    }
  };

  const handleDeactivate = async (id) => {
    const programResponse = await fetch(`/api/programs/${id}`);
    const program = await programResponse.json();

    console.log(program);
    const response = await fetch(`/api/programs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...program.program, program_active: 0 }),
    });

    if (response.ok) {
      console.log("Program deactivated successfully");
      fetchPrograms();
    }
  };

  const handleActivate = async (id) => {
    try {
      const programResponse = await fetch(`/api/programs/${id}`);
      const program = await programResponse.json();

      const response = await fetch(`/api/programs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...program.program, program_active: 1 }),
      });

      if (response.ok) {
        console.log("Program activated successfully");
        fetchPrograms();
      }
    } catch (error) {
      console.error("Error activating program:", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedProgram(null);
  };

  // Render sort indicator
  const renderSortIndicator = (field) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th
                className="column-name"
                onClick={() => handleSort("program_name")}
              >
                <div className="sortable-header">
                  <span> Name</span>
                  {renderSortIndicator("program_name")}
                </div>
              </th>
              <th
                className="column-code"
                onClick={() => handleSort("program_code")}
              >
                <div className="sortable-header">
                  <span> Code</span>
                  {renderSortIndicator("program_code")}
                </div>
              </th>
              <th
                className="column-year"
                onClick={() => handleSort("workflow")}
              >
                <div className="sortable-header">
                  <span>Workflow</span>
                  {renderSortIndicator("workflow")}
                </div>
              </th>
              <th
                className="column-college"
                onClick={() => handleSort("program_college")}
              >
                <div className="sortable-header">
                  <span>College</span>
                  {renderSortIndicator("program_college")}
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
                onClick={() => handleSort("created_at")}
              >
                <div className="sortable-header">
                  <span>Created At</span>
                  {renderSortIndicator("created_at")}
                </div>
              </th>
              <th className="column-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((program) => (
                <tr key={program.id}>
                  <td>{program.program_name}</td>
                  <td>{program.program_code}</td>
                  <td>{program.workflow}</td>
                  <td>{program.program_college}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        program.status === "Active" ? "active" : "inactive"
                      }`}
                    >
                      {program.status}
                    </span>
                  </td>
                  <td>{new Date(program.created_at).toLocaleDateString()}</td>
                  <td>
                    <ActionMenu
                      onView={() => handleView(program.id)}
                      onDelete={() => handleDelete(program.id)}
                      onDeactivate={() =>
                        program.status === "Active"
                          ? handleDeactivate(program.id, program)
                          : handleActivate(program.id, program)
                      }
                      status={program.status}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="empty-table">
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

      {selectedProgram && (
        <ViewProgramModal
          programData={selectedProgram}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
