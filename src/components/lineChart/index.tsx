// components/LineChartComponent.tsx
'use client';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

interface LineChartComponentProps {
  data: {
    session: string;
    semester1: number;
    semester2: number;
  }[];
}

export default function LineChartComponent({ data }: LineChartComponentProps) {
    return (
        <div className="w-full h-[350px]">
            <ResponsiveContainer>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="session" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line
                type="monotone"
                dataKey="semester1"
                name="1st Semester"
                stroke="#8884d8"
                strokeWidth={2}
                />
                <Line
                type="monotone"
                dataKey="semester2"
                name="2nd Semester"
                stroke="#82ca9d"
                strokeWidth={2}
                />
            </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
