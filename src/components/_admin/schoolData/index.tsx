// app/dashboard/page.tsx or wherever your page lives
'use client';
// import styles from './index.module.css'
// import { departments } from '@/data/courses'
import ChartCard from '@/components/chartCard';
import DonutChart from '@/components/donutChart';
import { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BarChartComponent from '@/components/barChart';
import { getSchoolV2 } from '@/services/services.http';
import ChartFilters from '@/components/chartFilters';
import LineChartComponent from '@/components/lineChart';

interface School {
    name: string
    currentSession: string
    currentSemester: string
    totalNumberOfStudents: number
    departments: {
        total: number
        data: Array<{
            nameOfDepartment: string
            totalStudentsInDepartment: number
            studentsAtEachLevel: Array<{
                level: number
                totalStudents: number
            }>
        }>;
    }
}

interface TimeFilteredSchoolData {
  session: string;
  semester: string;
  data: School;
}

const school: School = {
    name: 'Kumase College of Health Tech.',
    currentSession: '2025/2026',
    currentSemester: '1',
    totalNumberOfStudents: 100,
    departments: {
        total: 3,
        data: [
            {
                nameOfDepartment: "CHEW",
                totalStudentsInDepartment: 10,
                studentsAtEachLevel: [
                    {
                        level: 100,
                        totalStudents: 2
                    },
                    {
                        level: 200,
                        totalStudents: 5
                    },
                    {
                        level: 300,
                        totalStudents: 3
                    }
                ]
            },

            {
                nameOfDepartment: "MLT",
                totalStudentsInDepartment: 10,
                studentsAtEachLevel: [
                    {
                        level: 100,
                        totalStudents: 2
                    },
                    {
                        level: 200,
                        totalStudents: 5
                    },
                    {
                        level: 300,
                        totalStudents: 3
                    }
                ]
            },
            {
                nameOfDepartment: "PHRM",
                totalStudentsInDepartment: 10,
                studentsAtEachLevel: [
                    {
                        level: 100,
                        totalStudents: 2
                    },
                    {
                        level: 200,
                        totalStudents: 5
                    },
                    {
                        level: 300,
                        totalStudents: 3
                    }
                ]
            }
        ]
    }
}

const schoolDataBySession: Record<string, Record<string, typeof school>> = {
    '2024/2025': {
        '1': { ...school, totalNumberOfStudents: 80 },
        '2': { ...school, totalNumberOfStudents: 85 },
    },
    '2025/2026': {
        '1': school, // original
        '2': {
            ...school,
            totalNumberOfStudents: 110,
            departments: {
                ...school.departments,
                data: school.departments.data.map((d) => ({
                    ...d,
                    totalStudentsInDepartment: d.totalStudentsInDepartment + 3,
                })),
            },
        },
    },
}

const studentTrendData = [
  { session: '2022/2023', semester1: 80, semester2: 85 },
  { session: '2023/2024', semester1: 90, semester2: 95 },
  { session: '2024/2025', semester1: 100, semester2: 105 },
  { session: '2025/2026', semester1: 110, semester2: 115 },
];


export default function SchoolData() {
  const [selectedSession, setSelectedSession] = useState('2025/2026');
  const [selectedSemester, setSelectedSemester] = useState('1');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
    const [loading, setLoading] = useState(false);
    const [schoolData, setSchoolData] = useState<School | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        (async () => {
            if (error) {
                setError(false);
            }
            setLoading(true);
            try {
                const { data:school } = await getSchoolV2();
                setSchoolData(school);
                setLoading(false); 
            } catch (err) {
                setError(true);
                setLoading(false);
            }
        })()
    }, []);

    const sessions = Object.keys(schoolDataBySession);
    const currentSchool = schoolDataBySession[selectedSession][selectedSemester];
    const allDepartments = currentSchool.departments.data.map((d) => d.nameOfDepartment);

    const handleFilterChange = (session: string, semester: string, department: string) => {
        setSelectedSession(session);
        setSelectedSemester(semester);
        setSelectedDepartment(department);
    };

  // 🔎 Filter department data
    const visibleDepartments =
    selectedDepartment === 'all'
        ? currentSchool.departments.data
        : currentSchool.departments.data.filter(
            (d) => d.nameOfDepartment === selectedDepartment
        );

    // 📊 Donut/Bar data: students per department (if viewing all)
    const departmentChartData =
    selectedDepartment === 'all'
        ? currentSchool.departments.data.map((dept) => ({
            name: dept.nameOfDepartment,
            value: dept.totalStudentsInDepartment,
        }))
        : visibleDepartments.map((dept) => ({
            name: dept.nameOfDepartment,
            value: dept.totalStudentsInDepartment,
        }));

    // 📊 Aggregate students per level
    const levelMap = new Map<number, number>();
    visibleDepartments.forEach((dept) => {
        dept.studentsAtEachLevel.forEach(({ level, totalStudents }) => {
            levelMap.set(level, (levelMap.get(level) || 0) + totalStudents);
        });
    });

    const levelChartData = Array.from(levelMap.entries()).map(([level, total]) => ({
        name: `Level ${level}`,
        value: total,
    }));

    const totalStudents = visibleDepartments.reduce(
        (sum, d) => sum + d.totalStudentsInDepartment,
        0
    );

    return (
        <main className="p-6 space-y-6">
            <section className="bg-white shadow-lg rounded-xl p-6 space-y-4">
                <h1 className="text-2xl font-bold">{currentSchool.name}</h1>

                <ChartFilters
                    selectedSession={selectedSession}
                    selectedSemester={selectedSemester}
                    selectedDepartment={selectedDepartment}
                    sessions={sessions}
                    departments={allDepartments}
                    onChange={handleFilterChange}
                />

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-700">
                    <div>
                    <p className="font-medium">Session</p>
                    <p>{currentSchool.currentSession}</p>
                    </div>
                    <div>
                    <p className="font-medium">Semester</p>
                    <p>{currentSchool.currentSemester}</p>
                    </div>
                    <div>
                    <p className="font-medium">Total Students</p>
                    <p>{totalStudents}</p>
                    </div>
                    <div>
                    <p className="font-medium">Departments</p>
                    <p>
                        {selectedDepartment === 'all' ? 
                        currentSchool.departments.total : 
                        '1'}
                    </p>
                    </div>
                </div>
            </section>

            <section className="grid md:grid-cols-2 gap-6">
                <ChartCard title="Students Per Department">
                    <Tabs defaultValue="donut" className="w-full">
                        <TabsList>
                            <TabsTrigger value="donut">Donut</TabsTrigger>
                            <TabsTrigger value="bar">Bar</TabsTrigger>
                        </TabsList>
                        <TabsContent value="donut">
                            <DonutChart data={departmentChartData} title="Department Donut" />
                        </TabsContent>
                        <TabsContent value="bar">
                            <BarChartComponent data={departmentChartData} title="Department Bar" />
                        </TabsContent>
                    </Tabs>
                </ChartCard>

                <ChartCard title="Students Per Level">
                    <Tabs defaultValue="bar" className="w-full">
                        <TabsList>
                            <TabsTrigger value="donut">Donut</TabsTrigger>
                            <TabsTrigger value="bar">Bar</TabsTrigger>
                        </TabsList>
                        <TabsContent value="donut">
                            <DonutChart data={levelChartData} title="Level Donut" />
                        </TabsContent>
                        <TabsContent value="bar">
                            <BarChartComponent data={levelChartData} title="Level Bar" />
                        </TabsContent>
                    </Tabs>
                </ChartCard>
            </section>

            <section className="bg-white shadow-lg rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4">Student Population Trend</h2>
                <LineChartComponent data={studentTrendData} />
            </section>
        </main>
    )
}