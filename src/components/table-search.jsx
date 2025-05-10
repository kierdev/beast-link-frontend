import { Search } from "lucide-react"
import { useState } from "react"

export default function TableSearch({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value)
  }

  return (
    <div className="table-search">
      <Search className="search-icon" />
      <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} className="search-input" />
    </div>
  )
}
