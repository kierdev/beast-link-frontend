const API_BASE_URL = "https://beast-link-backend-git-development-knthlxs-projects.vercel.app/api/api";

export async function getApplicantDashboard(applicantId) {
  const response = await fetch(
    `${API_BASE_URL}/applicant/dashboard?applicant_id=${applicantId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch applicant dashboard data");
  }
  return response.json();
}

export async function getProgramStatistics(programCode) {
  const response = await fetch(
    `${API_BASE_URL}/program/statistics?program_code=${programCode}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch program statistics");
  }
  return response.json();
}

export async function getInterviewerDashboard() {
  const response = await fetch(`${API_BASE_URL}/interviewer/dashboard`);
  if (!response.ok) {
    throw new Error("Failed to fetch interviewer dashboard data");
  }
  return response.json();
}

export async function getAdminDashboard() {
  const response = await fetch(`${API_BASE_URL}/admin/dashboard`);
  if (!response.ok) {
    throw new Error("Failed to fetch admin dashboard data");
  }
  return response.json();
}
