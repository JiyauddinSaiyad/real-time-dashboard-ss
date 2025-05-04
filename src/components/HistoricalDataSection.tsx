
import React, { useState, useEffect } from 'react';
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
import { TimeRange, HistoricalSeries } from '../types';
import { fetchHistoricalData } from '../services/api';
import { Button } from '@/components/ui/button';
import { useTheme } from './ThemeProvider';

interface HistoricalDataSectionProps {
  title: string;
}

const HistoricalDataSection: React.FC<HistoricalDataSectionProps> = ({ title }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('1h');
  const [series, setSeries] = useState<HistoricalSeries[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  // Generate colors for each series
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
  
  useEffect(() => {
    const loadHistoricalData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchHistoricalData(timeRange);
        setSeries(response.series);
        setError(null);
      } catch (err) {
        setError('Failed to load historical data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadHistoricalData();
  }, [timeRange]);
  
  // Format data for chart
  const formatData = (series: HistoricalSeries[]) => {
    // For this example, we'll just use the first series
    if (series.length === 0) return [];
    
    return series[0].data.map(point => ({
      timestamp: new Date(point.timestamp).toLocaleTimeString(),
      value: point.value,
      unit: series[0].unit
    }));
  };
  
  const chartData = formatData(series);
  
  const handleTimeRangeChange = (range: TimeRange) => {
    setTimeRange(range);
  };
  
  return (
    <Card className="chart-container">
      <CardHeader className="pb-2">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <CardTitle className="text-xl">{title}</CardTitle>
          <div className="flex space-x-2">
            <Button
              variant={timeRange === '1h' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleTimeRangeChange('1h')}
              className="rounded-full px-4"
            >
              1h
            </Button>
            <Button
              variant={timeRange === '6h' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleTimeRangeChange('6h')}
              className="rounded-full px-4"
            >
              6h
            </Button>
            <Button
              variant={timeRange === '24h' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleTimeRangeChange('24h')}
              className="rounded-full px-4"
            >
              24h
            </Button>
            <Button
              variant={timeRange === '7d' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleTimeRangeChange('7d')}
              className="rounded-full px-4"
            >
              7d
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className={`${isLoading ? 'animate-pulse-slow' : ''}`}>
        <div className="h-[400px] w-full">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground">Loading historical data...</p>
            </div>
          ) : error ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-destructive">{error}</p>
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
                  dataKey="timestamp" 
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
                  formatter={(value) => [`${value} ${chartData[0]?.unit || ''}`, 'Value']}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={colors[0]} 
                  dot={false}
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

export default HistoricalDataSection;
