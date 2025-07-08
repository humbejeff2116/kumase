'use client';
import { 
    PieChart, 
    Pie, 
    Cell, 
    Tooltip, 
    Legend, 
    ResponsiveContainer 
} from 'recharts';

const COLORS = [
    '#8884d8', 
    '#82ca9d', 
    '#ffc658', 
    '#ff7f50', 
    '#00c49f', 
    '#ffbb28'
];

interface DonutChartProps {
    title: string;
    data: { name: string; value: number }[];
}

export default function DonutChart({ 
    title, 
    data 
}: DonutChartProps) {
    return (
        <div className="w-full h-[300px]">
            <ResponsiveContainer>
            <PieChart>
                <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                nameKey="name"
                label
                isAnimationActive={true}
                >
                {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
