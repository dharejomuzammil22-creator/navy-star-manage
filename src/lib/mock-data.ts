export const stats = {
  totalStudents: 2847,
  enrolledStudents: 2103,
  courses: 24,
  cities: 8,
  campuses: 14,
  trainers: 96,
  activeSlots: 132,
  openRegistrations: 41,
};

export const campusChart = [
  { name: "Karachi Main", students: 612 },
  { name: "Lahore Gulberg", students: 498 },
  { name: "Islamabad F-8", students: 421 },
  { name: "Sukkur", students: 316 },
  { name: "Faisalabad", students: 287 },
  { name: "Multan", students: 244 },
  { name: "Peshawar", students: 231 },
  { name: "Hyderabad", students: 238 },
];

export const courseChart = [
  { name: "Artificial Intelligence", students: 542 },
  { name: "Web & Mobile App", students: 487 },
  { name: "Graphic Design", students: 361 },
  { name: "Cloud Computing", students: 298 },
  { name: "Digital Marketing", students: 276 },
  { name: "Cyber Security", students: 214 },
  { name: "Data Science", students: 341 },
  { name: "UI/UX Design", students: 188 },
];

export type StudentStatus = "pending" | "enrolled" | "active" | "passed" | "failed" | "completed" | "dropout";
export type PaymentStatus = "Paid" | "Pending" | "Not Generated";

export interface Student {
  id: string;
  roll: string;
  name: string;
  fatherName: string;
  cnic: string;
  phone: string;
  course: string;
  campus: string;
  batch: number;
  status: StudentStatus;
  payment: PaymentStatus;
  gender: "Male" | "Female";
}

const firstNames = ["Ahmed", "Ali", "Bilal", "Hassan", "Usman", "Fatima", "Ayesha", "Zainab", "Sara", "Hina", "Danish", "Fahad", "Zoya", "Maryam", "Bilal", "Yasir", "Nimra", "Rida", "Tariq", "Kamran"];
const lastNames = ["Khan", "Ahmed", "Malik", "Siddiqui", "Qureshi", "Raza", "Sheikh", "Butt", "Chaudhry", "Rizvi"];
const courses = ["Artificial Intelligence", "Web & Mobile App", "Graphic Design", "Cloud Computing", "Cyber Security", "Data Science", "Digital Marketing", "UI/UX Design"];
const campuses = ["Karachi Main", "Lahore Gulberg", "Islamabad F-8", "Sukkur", "Faisalabad", "Multan", "Peshawar", "Hyderabad"];
const statuses: StudentStatus[] = ["pending", "enrolled", "active", "passed", "failed", "completed"];
const payments: PaymentStatus[] = ["Paid", "Pending", "Not Generated"];

export const students: Student[] = Array.from({ length: 42 }).map((_, i) => {
  const fn = firstNames[i % firstNames.length];
  const ln = lastNames[i % lastNames.length];
  return {
    id: `S${1000 + i}`,
    roll: `TIT-${2026}-${(1000 + i).toString()}`,
    name: `${fn} ${ln}`,
    fatherName: `${lastNames[(i + 3) % lastNames.length]} ${ln}`,
    cnic: `4210${(1000000 + i * 137).toString().slice(0, 7)}-${(i % 9) + 1}`,
    phone: `+92 3${(10 + (i % 80)).toString()} ${(1000000 + i * 971).toString().slice(0, 7)}`,
    course: courses[i % courses.length],
    campus: campuses[i % campuses.length],
    batch: (i % 6) + 1,
    status: statuses[i % statuses.length],
    payment: payments[i % payments.length],
    gender: i % 3 === 0 ? "Female" : "Male",
  };
});

export const slots = Array.from({ length: 14 }).map((_, i) => ({
  id: `SL-${100 + i}`,
  course: courses[i % courses.length],
  trainer: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
  campus: campuses[i % campuses.length],
  schedule: ["Mon/Wed/Fri 4:00–6:00 PM", "Tue/Thu/Sat 6:00–8:00 PM", "Sat/Sun 10:00 AM–1:00 PM"][i % 3],
  seatsUsed: 15 + ((i * 7) % 40),
  seatsTotal: 60,
  open: i % 3 !== 2,
}));

export const trainers = Array.from({ length: 12 }).map((_, i) => ({
  id: `EMP-${200 + i}`,
  name: `${firstNames[(i * 3) % firstNames.length]} ${lastNames[(i * 2) % lastNames.length]}`,
  email: `trainer${i + 1}@titan.edu.pk`,
  campus: campuses[i % campuses.length],
  courses: [courses[i % courses.length], courses[(i + 2) % courses.length]],
  phone: `+92 300 ${(1000000 + i * 8171).toString().slice(0, 7)}`,
}));

export const vouchers = [
  { id: "V-90121", type: "Registration", month: "—", due: "2026-06-15", amount: 1000, status: "Paid" },
  { id: "V-90122", type: "Monthly", month: "June 2026", due: "2026-06-25", amount: 1000, status: "Paid" },
  { id: "V-90123", type: "Monthly", month: "July 2026", due: "2026-07-25", amount: 1000, status: "Pending" },
];

export const assignments = [
  { id: "A-1", title: "Build a Portfolio Site", course: "Web & Mobile App", due: "2026-07-15", submitted: 34, total: 45, status: "Open" },
  { id: "A-2", title: "Linear Regression Notebook", course: "Data Science", due: "2026-07-12", submitted: 28, total: 40, status: "Open" },
  { id: "A-3", title: "Brand Identity System", course: "Graphic Design", due: "2026-07-08", submitted: 41, total: 42, status: "Grading" },
];

export const quizzes = [
  { id: "Q-1", title: "JavaScript Fundamentals", course: "Web & Mobile App", questions: 20, avg: 78 },
  { id: "Q-2", title: "Neural Networks Basics", course: "Artificial Intelligence", questions: 15, avg: 71 },
];

export const studentSchedule = [
  { day: "Mon", time: "4:00–6:00 PM", topic: "React State Management" },
  { day: "Wed", time: "4:00–6:00 PM", topic: "REST APIs" },
  { day: "Fri", time: "4:00–6:00 PM", topic: "Deployment & CI/CD" },
];

export const modules = [
  { name: "Foundations of JavaScript", topics: 8, done: 8 },
  { name: "React Fundamentals", topics: 10, done: 7 },
  { name: "State & Routing", topics: 6, done: 3 },
  { name: "APIs & Data Fetching", topics: 7, done: 1 },
  { name: "Deployment", topics: 4, done: 0 },
];
