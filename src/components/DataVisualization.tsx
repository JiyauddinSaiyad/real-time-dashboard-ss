
import React from 'react';
import { MetricData } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useTheme } from './ThemeProvider';

interface DataVisualizationProps {
  metrics: MetricData[];
  title: string;
  isLoading?: boolean;
}

const DataVisualization: React.FC<DataVisualizationProps> = ({
  metrics,
  title,
  isLoading = false
}) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  // Format metrics for chart display
  const chartData = metrics.map(metric => ({
    name: metric.name,
    value: metric.value,
    unit: metric.unit
  }));
  
  // Generate colors for each line
  const colors = [
    '#0ea5e9', // blue
    '#10b981', // green
    '#f97316', // orange
    '#8b5cf6', // purple
    '#f43f5e', // pink
    '#06b6d4', // cyan
    '#84cc16', // lime
    '#facc15'  // yellow
  ];
  
  return (
    <Card className="chart-container">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className={`${isLoading ? 'animate-pulse-slow' : ''}`}>
        <div className="h-[300px] w-full">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground">Loading chart data...</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke={isDarkMode ? "#444" : "#eee"}
                  vertical={false} 
                />
                <XAxis 
                  dataKey="name" 
                  stroke={isDarkMode ? "#888" : "#666"} 
                  fontSize={12}
                  tick={{ fill: isDarkMode ? "#888" : "#666" }}
                  axisLine={{ stroke: isDarkMode ? "#444" : "#eee" }}
                />
                <YAxis 
                  stroke={isDarkMode ? "#888" : "#666"}
                  fontSize={12}
                  tick={{ fill: isDarkMode ? "#888" : "#666" }}
                  axisLine={{ stroke: isDarkMode ? "#444" : "#eee" }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDarkMode ? 'hsl(240 10% 3.9%)' : 'white', 
                    border: isDarkMode ? '1px solid #444' : '1px solid #eee',
                    borderRadius: '8px',
                    color: isDarkMode ? '#fff' : '#333'
                  }} 
                  itemStyle={{ color: isDarkMode ? '#fff' : '#333' }}
                  formatter={(value, name, props) => [`${value} ${props.payload.unit}`, name]}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={colors[0]} 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DataVisualization;
