import { useState } from "react"
import { Filter, Search } from "lucide-react"
import AcademicYearTable from "../../../../components/academic-year-table"

export default function AcademicYearPage() {
  const [filters, setFilters] = useState({
    year: "",
    college: "",
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
    })
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

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
          <button className="filter-button" onClick={() => setShowFilters(!showFilters)}>
            <Filter size={16} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="filter-container">
          <div className="filter-form">
            <div className="filter-group">
              <label htmlFor="year">Academic Year</label>
              <select id="year" name="year" value={filters.year} onChange={handleFilterChange}>
                <option value="">All Years</option>
                <option value="2023-2024">2023-2024</option>
                <option value="2022-2023">2022-2023</option>
                <option value="2021-2022">2021-2022</option>
              </select>
            </div>


            <button className="clear-filter-button" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        </div>
      )}

      <AcademicYearTable filters={filters} searchTerm={searchTerm} />
    </div>
  )
}
