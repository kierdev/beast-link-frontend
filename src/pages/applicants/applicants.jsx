import React, { useState, useEffect } from 'react';
import styles from './Applicants.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logo from '../../assets/logo.png'

// Use relative URL since we're using Vite's proxy
const API_BASE_URL = '/api';

const FullScreenLoader = () => (
  <div className={styles.fullScreenLoader}>
    <div className={styles.loaderContent}>
      <i className="fas fa-spinner fa-spin"></i>
      <span>Loading...</span>
    </div>
  </div>
);

export default function Applicants() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('oldest');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    from: 1,
    to: 1
  });
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    first_choice: '',
    academic_year: '',
    status: ''
  });

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        if (!isFiltering) {
          setLoading(true);
        }
        const activeFilters = Object.fromEntries(
          Object.entries(filters).filter(([_, value]) => value.trim() !== '')
        );

        const queryParams = new URLSearchParams({
          page,
          per_page: perPage,
          sort_by: sortBy,
          ...activeFilters
        });

        const response = await fetch(`${API_BASE_URL}/applicants?${queryParams}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        const data = await response.json();

        if (!data || !Array.isArray(data.data)) {
          throw new Error('Invalid data format received from server');
        }

        setApplicants(data.data);
        setPagination({
          current_page: data.current_page,
          last_page: data.last_page,
          total: data.total,
          from: data.from,
          to: data.to
        });
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
        setIsUpdating(false);
        setIsFiltering(false);
      }
    };

    fetchApplicants();
  }, [page, perPage, sortBy, filters]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setPage(1);
  };

  const handlePageChange = async (newPage) => {
    setIsUpdating(true);
    setPage(newPage);
  };

  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setPage(1);
  };

  const handleFilterChange = (key, value) => {
    const trimmedValue = value.trim();
    setIsFiltering(true);
    setFilters(prev => ({
      ...prev,
      [key]: trimmedValue
    }));
    setPage(1);
  };

  const clearFilters = () => {
    setIsFiltering(true);
    setFilters({
      name: '',
      email: '',
      first_choice: '',
      academic_year: '',
      status: ''
    });
    setPage(1);
  };

  const handleStatusUpdate = async (applicantId, newStatus) => {
    try {
      setIsUpdating(true);
      
      const response = await fetch(`${API_BASE_URL}/applicants/${applicantId}/status/${newStatus.replace(' ', '-')}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update status: ${errorText}`);
      }

      // Refresh the applicants list
      const queryParams = new URLSearchParams({
        page,
        per_page: perPage,
        sort_by: sortBy,
        ...filters
      });

      const updatedData = await fetch(`${API_BASE_URL}/applicants?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!updatedData.ok) {
        throw new Error('Failed to refresh applicants list');
      }

      const data = await updatedData.json();
      setApplicants(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      console.error('Status update error:', err);
      setError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className={styles.app}>
      {(loading || isUpdating) && <FullScreenLoader />}
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <h2>Beastlink University</h2>
        <hr className={styles.divider} />
        <div className={styles.menu}>
          <a href="dashboard" className={styles.menuItem}><i className="fas fa-home"></i> Dashboard</a>
          <a href="#" className={styles.menuItem}><i className="far fa-calendar-alt"></i> Events</a>
          <a className={`${styles.menuItem} ${styles.activeMenuItem}`}><i className="fas fa-user-graduate"></i> Students/Classes</a>
          <a href="#" className={styles.menuItem}><i className="fas fa-gear"></i> Settings and Profile</a>
          <a href="#" className={styles.menuItem}><i className="far fa-clipboard"></i> Exams</a>
        </div>
      </div>

      {/* Content */}
      <div className={styles.main}>
        <div className={styles.topBar}>
          <div className={styles.searchFilterContainer}>
            <div className={styles.filterWrapper}>
              <button 
                className={styles.filterButton} 
                onClick={() => setFilterOpen(!filterOpen)}
              >
                Filters <i className="fas fa-chevron-down"></i>
              </button>
              <div className={`${styles.filterDropdown} ${filterOpen ? styles.show : ''}`}>
                <div className={styles.filterSection}>
                  <h4>Search</h4>
                  <input
                    type="text"
                    placeholder="Search by name"
                    value={filters.name}
                    onChange={(e) => handleFilterChange('name', e.target.value)}
                    className={styles.filterInput}
                  />
                  <input
                    type="email"
                    placeholder="Search by email"
                    value={filters.email}
                    onChange={(e) => handleFilterChange('email', e.target.value)}
                    className={styles.filterInput}
                  />
                </div>

                <div className={styles.filterSection}>
                  <h4>Program & Year</h4>
                  <input
                    type="text"
                    placeholder="Program"
                    value={filters.first_choice}
                    onChange={(e) => handleFilterChange('first_choice', e.target.value)}
                    className={styles.filterInput}
                  />
                  <select
                    value={filters.academic_year}
                    onChange={(e) => handleFilterChange('academic_year', e.target.value)}
                    className={styles.filterSelect}
                  >
                    <option value="">Academic Year</option>
                    <option value="2024-2025">2024-2025</option>
                    <option value="2025-2026">2025-2026</option>
                    <option value="2026-2027">2026-2027</option>
                  </select>
                </div>

                <div className={styles.filterSection}>
                  <h4>Status</h4>
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className={styles.filterSelect}
                  >
                    <option value="">Status</option>
                    <option value="missing">Missing</option>
                    <option value="submitted">Submitted</option>
                    <option value="pending">Pending</option>
                    <option value="under review">Under Review</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <div className={styles.filterActions}>
                  <button onClick={clearFilters} className={styles.clearFiltersButton}>
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className={styles.notification}>
              <a href="notification"><i className="far fa-bell"></i></a>
            </div>
            <div className={styles.logout}>
              <button className={styles.logoutButton}>Log out</button>
            </div>
          </div>
        </div>

        {/* Applicants Table */}
        <div className={styles.tableContainer}>
          <div className={styles.tableHeaderRow}>
            <h3 className={styles.tableHeaderTitle}>
              Beastlink College Applicants
            </h3>
            <div className={styles.tableControls}>
              <div className={styles.sortContainer}>
                <label htmlFor="sort" className={styles.sortLabel}>Sort by</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={handleSortChange}
                  className={styles.sortSelect}
                >
                  <option value="oldest">Oldest</option>
                  <option value="newest">Newest</option>
                  <option value="name_asc">Name (A-Z)</option>
                  <option value="name_desc">Name (Z-A)</option>
                </select>
              </div>
            </div>
          </div>

          {error ? (
            <p style={{ color: 'red', padding: '30px', textAlign: 'center' }}>Error: {error}</p>
          ) : (
            <>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Academic Year</th>
                    <th>College</th>
                    <th>Program</th>
                    <th>Application</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applicants.map((app, idx) => (
                    <tr key={app.applicant_id} className={idx % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                      <td>{app.applicant_id}</td>
                      <td>{app.Last_Name}, {app.First_Name}</td>
                      <td>{app.Academic_Year || 'N/A'}</td>
                      <td>{app.College || 'N/A'}</td>
                      <td>{app.First_Choice || 'N/A'}</td>
                      <td>
                        <button className={styles.viewButton}>View</button>
                      </td>
                      <td className={`${styles[`status${app.status?.charAt(0).toUpperCase() + app.status?.slice(1).replace('-', '')}`] || ''}`}>
                        {app.status ? app.status.charAt(0).toUpperCase() + app.status.slice(1) : 'N/A'}
                      </td>
                      <td>
                        <select 
                          value={app.status || ''} 
                          onChange={(e) => handleStatusUpdate(app.applicant_id, e.target.value)}
                          className={styles.statusSelect}
                          disabled={isUpdating}
                        >
                          <option value="">Change Status</option>
                          <option value="missing">Missing</option>
                          <option value="submitted">Submitted</option>
                          <option value="pending">Pending</option>
                          <option value="under review">Under Review</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className={styles.paginationContainer}>
                <button 
                  onClick={() => handlePageChange(page - 1)} 
                  disabled={page === 1 || isUpdating} 
                  className={styles.paginationButton}
                >
                  <span>&lt;</span>
                </button>
                <span className={styles.pageInfo}>
                  Page {pagination.current_page} of {pagination.last_page}
                </span>
                <button 
                  onClick={() => handlePageChange(page + 1)} 
                  disabled={page === pagination.last_page || isUpdating} 
                  className={styles.paginationButton}
                >
                  <span>&gt;</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}