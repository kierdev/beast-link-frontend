import { useState } from "react"
import ProgramTable from "@/components/program-table"
import AddProgramButton from "@/components/add-program-button"
import { Filter, Search } from "lucide-react"

export default function ProgramPage() {
  const [filters, setFilters] = useState({
    year: "",
    college: "",
    status: "",
  })
  const [showFilters, setShowFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const clearFilters = () => {
    setFilters({
      year: "",
      college: "",
      status: "",
    })
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="program-page">
      <div className="page-header">
        <h2>Programs</h2>
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
          <AddProgramButton />
        </div>
      </div>

      {showFilters && (
        <div className="filter-container">
          <div className="filter-form">
            <div className="filter-group">
              <label htmlFor="workflow">Workflow</label>
              <select
                id="workflow"
                name="workflow"
                value={filters.workflow}
                onChange={handleFilterChange}
              >
                <option value="">All Workflow</option>
                <option value="Interview to Test">Interview to Test</option>
                <option value="Test to Interview">Test to Interview</option>
                <option value="Interview Only">Interview Only</option>
                <option value="Test Only">Test Only</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="college">College</label>
              <select
                id="college"
                name="college"
                value={filters.college}
                onChange={handleFilterChange}
              >
                <option value="">All Colleges</option>
                <option value="CBA">CBA</option>
                <option value="COED">COED</option>
                <option value="COT">COT</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <button className="clear-filter-button" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        </div>
      )}

      <ProgramTable filters={filters} searchTerm={searchTerm} />
    </div>
  );
}
