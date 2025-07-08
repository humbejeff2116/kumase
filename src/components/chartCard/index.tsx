// components/ChartCard.tsx
import { ReactNode } from 'react';


export default function ChartCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl hover:shadow-xl transition-shadow">
      <h2 className="text-lg font-bold mb-4 text-gray-700">{title}</h2>
      {children}
    </div>
  );
}
