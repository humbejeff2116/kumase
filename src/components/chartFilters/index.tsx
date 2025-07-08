// components/ChartFilters.tsx
interface ChartFiltersProps {
  selectedSession: string;
  selectedSemester: string;
  selectedDepartment: string;
  sessions: string[];
  departments: string[];
  onChange: (session: string, semester: string, department: string) => void;
}

export default function ChartFilters({
  selectedSession,
  selectedSemester,
  selectedDepartment,
  sessions,
  departments,
  onChange,
}: ChartFiltersProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <label className="flex flex-col text-sm">
            Session
            <select
                value={selectedSession}
                onChange={(e) => onChange(e.target.value, selectedSemester, selectedDepartment)}
                className="mt-1 p-2 border rounded"
            >
                {sessions.map((session) => (
                <option key={session} value={session}>
                    {session}
                </option>
                ))}
            </select>
            </label>

            <label className="flex flex-col text-sm">
            Semester
            <select
                value={selectedSemester}
                onChange={(e) => onChange(selectedSession, e.target.value, selectedDepartment)}
                className="mt-1 p-2 border rounded"
            >
                <option value="1">1st Semester</option>
                <option value="2">2nd Semester</option>
            </select>
            </label>

            <label className="flex flex-col text-sm">
            Department
            <select
                value={selectedDepartment}
                onChange={(e) => onChange(selectedSession, selectedSemester, e.target.value)}
                className="mt-1 p-2 border rounded"
            >
                <option value="all">All Departments</option>
                {departments.map((dept) => (
                <option key={dept} value={dept}>
                    {dept}
                </option>
                ))}
            </select>
            </label>
        </div>
    );
}
