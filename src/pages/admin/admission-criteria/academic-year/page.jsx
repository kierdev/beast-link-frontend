import { useState, useContext, useEffect } from "react";
import { Filter, Search } from "lucide-react";
import AdminAcademicYearTable from "../../../../components/academic-year-table-admin";
import { GlobalDataContext } from "../../../../components/global-data-context";
import AddAcademicButton from "../../../../components/add-academic-button";

export default function AdminAcademicYearPage() {
  const { academicYears, fetchAcademicYears } = useContext(GlobalDataContext);
  const [filters, setFilters] = useState({
    year: "",
    college: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      year: "",
      college: "",
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="academic-year-page">
      <div className="page-header">
        <h2>Academic Year</h2>
        <div className="header-actions">
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
          <button
            className="filter-button"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <AddAcademicButton />
        </div>
      </div>

      {showFilters && (
        <div className="filter-container">
          <div className="filter-form">
            <div className="filter-group">
              <label htmlFor="year">Academic Year</label>
              <select
                id="year"
                name="year"
                value={filters.year}
                onChange={handleFilterChange}
              >
                <option value="">All Years</option>
                {academicYears.map((year) => (
                  <option key={year.academic_year} value={year.academic_year}>
                    {year.academic_year}
                  </option>
                ))}
              </select>
            </div>
            <button className="clear-filter-button" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        </div>
      )}

      <AdminAcademicYearTable filters={filters} searchTerm={searchTerm} />
    </div>
  );
}
