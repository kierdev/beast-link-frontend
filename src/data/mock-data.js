// Simulate API fetch with delay
export const fetchAdminData = async (endpoint) => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay

  if (endpoint === "/admin") {
    return {
      stats: {
        totalApplicants: 245,
        passedApplicants: 120,
        failedApplicants: 75,
        pendingApplicants: 50,
        totalCourses: 8,
      },
      charts: {
        pieChartData: [
          { label: "Failed", value: 75, color: "#FF0000" },
          { label: "Passed", value: 120, color: "#00ff00" },
          { label: "Pending", value: 50, color: "#ffa500" },
        ],
        barChartData: [
          { label: "BSIT", value: 65, color: "#FF6384" },
          { label: "BSCS", value: 59, color: "#36A2EB" },
          { label: "BSCE", value: 80, color: "#FFCE56" },
          { label: "BSA", value: 56, color: "#4BC0C0" },
          { label: "BSSW", value: 40, color: "#9966FF" },
        ],
        lineChartData: [
          { label: "Jan", value: 65 },
          { label: "Feb", value: 59 },
          { label: "Mar", value: 80 },
          { label: "Apr", value: 81 },
          { label: "May", value: 56 },
          { label: "Jun", value: 55 },
          { label: "Jul", value: 40 },
          { label: "Aug", value: 30 },
          { label: "Sep", value: 54 },
          { label: "Nov", value: 32 },
          { label: "Dec", value: 15 },
        ],
      },
      applicants: Array.from({ length: 50 }, (_, i) => ({
        id: `APP-${1000 + i}`,
        name: `Applicant ${i + 1}`,
        email: `applicant${i + 1}@example.com`,
        course: ["BSIT", "BSCS", "BSCE", "BSA", "BSSW"][i % 5],
        status: ["Pending", "Approved", "Rejected"][i % 3],
        appliedDate: new Date(Date.now() - i * 86400000)
          .toISOString()
          .split("T")[0],
        documents: i % 4 === 0 ? "Incomplete" : "Complete",
      })),
      courses: [
        {
          id: 1,
          code: "BSIT",
          name: "Information Technology",
          seats: 120,
          enrolled: 85,
        },
        {
          id: 2,
          code: "BSCS",
          name: "Computer Science",
          seats: 100,
          enrolled: 92,
        },
        {
          id: 3,
          code: "BSCE",
          name: "Computer Engineering",
          seats: 80,
          enrolled: 65,
        },
        {
          id: 4,
          code: "BSA",
          name: "Accountancy",
          seats: 150,
          enrolled: 140,
        },
        {
          id: 5,
          code: "BSSW",
          name: "Social Work",
          seats: 60,
          enrolled: 45,
        },
        { 
          id: 6, 
          code: "BSN", 
          name: "Nursing", 
          seats: 200, 
          enrolled: 185 },
        { 
          id: 7, 
          code: "BSED", 
          name: "Education", 
          seats: 90, 
          enrolled: 72 },
        {
          id: 8,
          code: "BSM",
          name: "Management",
          seats: 110,
          enrolled: 98,
        },
      ],
      notifications: [
        {
          id: 1,
          type: "Application Update",
          message: "Your Computer Science application has been received.",
          time: "10 minutes ago",
          read: false,
        },
      ],
    };
  }

  throw new Error(`Unknown endpoint: ${endpoint}`);
};

// /data/mock-service.js

export const getCourses = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Computer Science",
          count: "5,000+ Courses",
          description:
            "Covers algorithms, programming, and problem-solving, essential for computing and software development.",
          college: "College of Technology",
          date: "Apr 25, 2025",
          category: "technology",
          icon: "Monitor",
        },
        {
          id: 2,
          title: "Special Education",
          count: "5,000+ Courses",
          description:
            "Equips teachers with strategies to support students with disabilities and special needs, promoting inclusive and adaptive learning.",
          college: "College of Education",
          date: "Apr 25, 2025",
          category: "education",
          icon: "Search",
        },
        
      ]);
    }, 500);
  });
};

export const getApplications = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Computer Science",
          date: "2025-02-15",
          status: "pending",
        },
        {
          id: 2,
          name: "Human Resource Development Management",
          date: "2025-02-20",
          status: "pending",
        },
      ]);
    }, 500);
  });
};

export const mockInterviewData = [
  {
    id: 1,
    name: "John Doe",
    date: new Date().toISOString().split('T')[0], // Today's date
    time: "10:00 AM",
    program: "Computer Science",
    location: "Room 101",
    status: "scheduled",
    result: ""
  },
  {
    id: 2,
    name: "Alice Johnson",
    date: new Date().toISOString().split('T')[0], // Today's date
    time: "2:30 PM",
    program: "Medicine",
    location: "Room 205",
    status: "scheduled",
    result: ""
  },
  {
    id: 3,
    name: "Jane Smith",
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // 2 days from now
    time: "9:00 AM",
    program: "Business Administration",
    location: "Room 102",
    status: "pending",
    result: ""
  },
  {
    id: 4,
    name: "Mike Brown",
    date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0], // 3 days from now
    time: "11:00 AM",
    program: "Electrical Engineering",
    location: "Room 103",
    status: "completed",
    result: "passed"
  },
  {
    id: 5,
    name: "Sarah Williams",
    date: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0], // 5 days from now
    time: "3:00 PM",
    program: "Law",
    location: "Room 201",
    status: "completed",
    result: "failed"
  },
  {
    id: 6,
    name: "David Lee",
    date: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0], // 1 week from now
    time: "1:30 PM",
    program: "Architecture",
    location: "Room 104",
    status: "scheduled",
    result: ""
  }
];

export const mockDashboardStats = {
  todaysInterviews: 2,
  passedInterviews: 1,
  failedInterviews: 1,
  pendingRemarks: 1
};
