import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { WEIGHT_DATA } from '../constants';

export function WeightChart() {
  return (
    <div className="w-full h-80 bg-white dark:bg-neutral-800 p-4 rounded-sm shadow-inner border border-neutral-200 dark:border-neutral-700" style={{ backgroundColor: 'var(--color-neutral-50)', borderColor: 'var(--color-neutral-200)' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={WEIGHT_DATA}>
          <defs>
            <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2d5a27" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#2d5a27" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis 
            dataKey="woche" 
            label={{ value: 'Wochen', position: 'insideBottom', offset: -5 }} 
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            label={{ value: 'kg', angle: -90, position: 'insideLeft' }} 
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            contentStyle={{ 
              fontFamily: 'Caveat, cursive',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#ffffff',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="gewicht" 
            stroke="#2d5a27" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorWeight)" 
            animationDuration={2000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
