
import { useState } from "react";

const initialStudents = [
  { id: "STU-101", name: "Aarav Patel", course: "BCA Honours", semester: 5, grade: "A+", color: "from-violet-500 to-indigo-600" },
  { id: "STU-102", name: "Diya Shah", course: "BCA Honours", semester: 3, grade: "A", color: "from-pink-500 to-rose-500" },
  { id: "STU-103", name: "Krish Mehta", course: "B.Sc IT", semester: 5, grade: "A+", color: "from-cyan-500 to-blue-600" },
  { id: "STU-104", name: "Ananya Desai", course: "BCA Honours", semester: 1, grade: "B+", color: "from-amber-400 to-orange-500" },
  { id: "STU-105", name: "Reyansh Joshi", course: "B.Sc IT", semester: 3, grade: "A", color: "from-emerald-400 to-teal-600" },
  { id: "STU-106", name: "Mira Trivedi", course: "BCA Honours", semester: 5, grade: "A+", color: "from-fuchsia-500 to-purple-600" },
];

export default function App() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [course, setCourse] = useState("All Courses");
  const [selected, setSelected] = useState(null);
  const [deletedCount, setDeletedCount] = useState(0);
  const [toast, setToast] = useState("");

  const filteredStudents = students.filter((student) => {
    const text = `${student.name} ${student.id} ${student.course}`.toLowerCase();
    return (
      text.includes(search.toLowerCase()) &&
      (course === "All Courses" || student.course === course)
    );
  });

  function deleteStudent() {
    const student = students.find((s) => s.id === selected);
    if (!student) return;

    setStudents((previous) =>
      previous.filter((s) => s.id !== selected)
    );
    setDeletedCount((count) => count + 1);
    setSelected(null);
    showToast(`${student.name} deleted successfully!`);
  }

  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(""), 3000);
  }

  function resetDemo() {
    setStudents(initialStudents);
    setDeletedCount(0);
    setSearch("");
    setCourse("All Courses");
    showToast("Demo records restored!");
  }

  return (
    <div className="min-h-screen bg-[#080b16] text-slate-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-violet-600/15 blur-[120px]" />
        <div className="absolute -right-40 top-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <main className="relative mx-auto max-w-7xl px-5 py-8 sm:px-8">
        {/* Header */}
        <header className="mb-9 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-2xl shadow-lg">
              🎓
            </div>
            <div>
              <h1 className="text-xl font-black">
                Campus<span className="text-violet-400">Flow</span>
              </h1>
              <p className="text-xs text-slate-500">
                STUDENT MANAGEMENT SYSTEM
              </p>
            </div>
          </div>
          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-2 text-xs font-semibold text-emerald-300">
            ● SYSTEM ONLINE
          </span>
        </header>

        {/* Hero banner */}
        <section className="mb-8 rounded-3xl border border-white/10 bg-gradient-to-br from-[#21183e] via-[#111528] to-[#10202e] p-6 sm:p-9">
          <span className="inline-block rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1.5 text-xs font-bold text-violet-300">
            ✦ PRACTICAL 09 · DELETE OPERATION
          </span>
          <div className="mt-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black leading-tight sm:text-5xl">
                Manage your campus,
                <br />
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                  one student at a time.
                </span>
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                Search student records, explore academic profiles,
                and remove records using this interactive dashboard.
              </p>
            </div>
            <div className="hidden text-7xl sm:block">✨</div>
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          <StatCard icon="👥" label="Active Students" value={students.length} note="Currently enrolled" />
          <StatCard icon="🗑️" label="Records Deleted" value={deletedCount} note="This session" />
          <StatCard icon="📚" label="Courses Available" value={new Set(students.map(s => s.course)).size} note="Across all programs" />
        </section>

        {/* Student directory */}
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#101525]/90 shadow-2xl">
          <div className="flex flex-col justify-between gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:p-7">
            <div>
              <h3 className="text-xl font-bold">Student Directory</h3>
              <p className="mt-1 text-sm text-slate-500">
                Your student records, all in one place.
              </p>
            </div>
            <button
              onClick={resetDemo}
              className="w-fit rounded-xl border border-violet-400/25 bg-violet-400/10 px-4 py-2.5 text-sm font-semibold text-violet-300 hover:bg-violet-400/20"
            >
              ↻ Reset Demo
            </button>
          </div>

          {/* Search and course filter */}
          <div className="flex flex-col gap-3 p-5 sm:flex-row sm:p-7">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="⌕  Search name, ID or course..."
              className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#0a0e1b] px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-violet-400"
            />
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="rounded-xl border border-white/10 bg-[#0a0e1b] px-4 py-3 text-sm text-slate-300 outline-none focus:border-violet-400"
            >
              <option>All Courses</option>
              <option>BCA Honours</option>
              <option>B.Sc IT</option>
            </select>
          </div>

          <p className="px-5 pb-3 text-xs font-semibold uppercase tracking-widest text-slate-500 sm:px-7">
            Showing {filteredStudents.length} of {students.length} students
          </p>

          {/* Student cards */}
          <div className="grid gap-3 p-5 pt-2 sm:grid-cols-2 sm:p-7 sm:pt-2">
            {filteredStudents.map((student) => (
              <article
                key={student.id}
                className="group flex min-w-0 items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-violet-400/30 hover:bg-violet-400/[0.04] sm:gap-4 sm:p-5"
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${student.color} text-lg font-black text-white shadow-lg`}>
                  {student.name.split(" ").map((part) => part[0]).join("")}
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="truncate font-bold">{student.name}</h4>
                  <p className="mt-1 text-xs text-slate-500">{student.id}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-white/[0.06] px-2 py-1 text-[10px] text-slate-400">
                      {student.course}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Semester {student.semester}
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-3">
                  <span className="rounded-lg border border-emerald-400/15 bg-emerald-400/10 px-2.5 py-1 text-xs font-bold text-emerald-300">
                    {student.grade}
                  </span>
                  <button
                    onClick={() => setSelected(student.id)}
                    className="rounded-lg border border-rose-400/20 bg-rose-400/[0.07] px-3 py-2 text-xs font-bold text-rose-300 transition hover:bg-rose-500 hover:text-white"
                  >
                    🗑 Delete
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Empty search or empty directory */}
          {filteredStudents.length === 0 && (
            <div className="px-5 py-16 text-center">
              <div className="text-5xl">🔎</div>
              <h4 className="mt-4 text-lg font-bold">No students found</h4>
              <p className="mt-2 text-sm text-slate-500">
                Try another search or clear your filters.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setCourse("All Courses");
                }}
                className="mt-5 rounded-xl bg-violet-500 px-4 py-2.5 text-sm font-bold hover:bg-violet-400"
              >
                Clear Filters
              </button>
            </div>
          )}

          <footer className="border-t border-white/10 px-5 py-4 text-center text-xs text-slate-600">
            CampusFlow · React useState · Array filter · Tailwind CSS
          </footer>
        </section>

        <p className="mt-6 text-center text-xs text-slate-600">
          Practical 09 · Student Record Management
        </p>

        {/* Delete confirmation modal */}
        {selected && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-5 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <div
              role="dialog"
              aria-modal="true"
              className="w-full max-w-md rounded-3xl border border-rose-400/20 bg-[#111525] p-7 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/10 text-3xl">
                🗑️
              </div>
              <h3 className="mt-5 text-center text-2xl font-black">
                Delete student?
              </h3>
              <p className="mt-3 text-center text-sm leading-6 text-slate-400">
                Are you sure you want to remove{" "}
                <span className="font-bold text-white">
                  {students.find((s) => s.id === selected)?.name}
                </span>{" "}
                from the student list?
              </p>
              <div className="mt-7 grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSelected(null)}
                  className="rounded-xl border border-white/10 py-3 text-sm font-bold text-slate-300 hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteStudent}
                  className="rounded-xl bg-rose-500 py-3 text-sm font-bold text-white hover:bg-rose-400"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success toast */}
        {toast && (
          <div role="status" className="fixed bottom-6 right-6 z-[60] max-w-sm rounded-2xl border border-emerald-400/20 bg-[#10231f] px-5 py-4 text-sm font-semibold text-emerald-300 shadow-2xl">
            ✓ {toast}
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, note }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-violet-400/30 sm:p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-400">{label}</p>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="mt-4 text-4xl font-black tracking-tight">{value}</p>
      <p className="mt-2 text-xs text-slate-500">{note}</p>
    </div>
  );
}
