const API_BASE_URL = "http://127.0.0.1:8000/api";

export async function getApplicantDashboardData() {
  const response = await fetch(`${API_BASE_URL}/applicant/dashboard`);
  if (!response.ok) {
    throw new Error("Failed to fetch applicant dashboard data");
  }
  return response.json();
}

export async function getChairpersonDashboardData(programCode) {
  const response = await fetch(
    `${API_BASE_URL}/chairperson/dashboard?program_code=${programCode}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch program statistics");
  }
  return response.json();
}

export async function getInterviewerDashboardData() {
  const response = await fetch(`${API_BASE_URL}/interviewer/dashboard`);
  if (!response.ok) {
    throw new Error("Failed to fetch interviewer dashboard data");
  }
  return response.json();
}

export async function getAdminDashboardData() {
  const response = await fetch(`${API_BASE_URL}/admin/dashboard`);
  if (!response.ok) {
    throw new Error("Failed to fetch admin dashboard data");
  }
  return response.json();
}
