import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./pages/program-head/layout";
import AcademicYearPage from "./pages/program-head/admission-criteria/academic-year/page";
import AdminAcademicYearPage from "./pages/admin/admission-criteria/academic-year/page";
import AdmissionCriteriaLayout from "./pages/program-head/admission-criteria/layout";
import ProgramPage from "./pages/program-head/admission-criteria/program/page";
import AdministratorLayout from "./pages/admin/layout";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to="/program-head/admission-criteria/academic-year"
              replace
            />
          }
        />
        <Route
          path="/program-head/admission-criteria/academic-year"
          element={
            <AdminLayout>
              <AdmissionCriteriaLayout>
                <AcademicYearPage />
              </AdmissionCriteriaLayout>
            </AdminLayout>
          }
        />
        <Route
          path="/program-head/admission-criteria/program"
          element={
            <AdminLayout>
              <AdmissionCriteriaLayout>
                <ProgramPage />
              </AdmissionCriteriaLayout>
            </AdminLayout>
          }
        />
        <Route
          path="/administrator/admission-criteria/academic-year"
          element={
            <AdministratorLayout>
              <AdmissionCriteriaLayout>
                <AdminAcademicYearPage />
              </AdmissionCriteriaLayout>
            </AdministratorLayout>
          }
        />
      </Routes>
    </Router>
  );
}
