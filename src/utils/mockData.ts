
import { MetricData, HistoricalSeries, HistoricalDataPoint, TimeRange } from '../types';

// Generate random value within a range
const randomValue = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate random trend
const randomTrend = (): 'up' | 'down' | 'stable' => {
  const trends: ('up' | 'down' | 'stable')[] = ['up', 'down', 'stable'];
  return trends[Math.floor(Math.random() * trends.length)];
};

// Generate random percentage change
const randomPercentageChange = (): number => {
  return parseFloat((Math.random() * 10 - 5).toFixed(2));
};

// Sample metric names with units
const metricDefinitions = [
  { name: 'CPU Usage', unit: '%' },
  { name: 'Memory Usage', unit: 'MB' },
  { name: 'Network In', unit: 'Mbps' },
  { name: 'Network Out', unit: 'Mbps' },
  { name: 'Disk I/O', unit: 'MB/s' },
  { name: 'Response Time', unit: 'ms' },
  { name: 'Error Rate', unit: '%' },
  { name: 'Requests', unit: 'req/s' }
];

// Generate random metrics
export const generateMetrics = (count = 8): MetricData[] => {
  return Array.from({ length: count }, (_, i) => {
    const metricDef = metricDefinitions[i % metricDefinitions.length];
    const trend = randomTrend();
    const percentageChange = randomPercentageChange();
    
    return {
      id: `metric-${i + 1}`,
      name: metricDef.name,
      value: randomValue(
        metricDef.name.includes('Usage') ? 0 : 10,
        metricDef.name.includes('Usage') ? 100 : 1000
      ),
      unit: metricDef.unit,
      timestamp: Date.now(),
      trend,
      percentageChange
    };
  });
};

// Update existing metrics with new random values
export const updateMetrics = (metrics: MetricData[]): MetricData[] => {
  return metrics.map(metric => {
    const trend = randomTrend();
    const percentageChange = randomPercentageChange();
    
    // Generate a value that changes slightly from the previous value
    const min = Math.max(0, metric.value - metric.value * 0.1);
    const max = metric.value + metric.value * 0.1;
    const newValue = Math.round(Math.random() * (max - min) + min);
    
    return {
      ...metric,
      value: newValue,
      timestamp: Date.now(),
      trend,
      percentageChange
    };
  });
};

// Generate historical data points
export const generateHistoricalPoints = (
  timeRange: TimeRange,
  baseValue: number,
  volatility: number
): HistoricalDataPoint[] => {
  const now = Date.now();
  const points: HistoricalDataPoint[] = [];
  
  // Determine time span and interval based on time range
  let timeSpanMs: number;
  let intervalMs: number;
  
  switch (timeRange) {
    case '1h':
      timeSpanMs = 60 * 60 * 1000;
      intervalMs = 60 * 1000; // 1 minute
      break;
    case '6h':
      timeSpanMs = 6 * 60 * 60 * 1000;
      intervalMs = 5 * 60 * 1000; // 5 minutes
      break;
    case '24h':
      timeSpanMs = 24 * 60 * 60 * 1000;
      intervalMs = 15 * 60 * 1000; // 15 minutes
      break;
    case '7d':
      timeSpanMs = 7 * 24 * 60 * 60 * 1000;
      intervalMs = 3 * 60 * 60 * 1000; // 3 hours
      break;
    case '30d':
      timeSpanMs = 30 * 24 * 60 * 60 * 1000;
      intervalMs = 12 * 60 * 60 * 1000; // 12 hours
      break;
  }
  
  // Generate points from past to now
  let value = baseValue;
  let timestamp = now - timeSpanMs;
  
  while (timestamp <= now) {
    // Randomly adjust value with volatility factor
    value = Math.max(
      0, 
      value + (Math.random() * volatility * 2 - volatility)
    );
    
    points.push({
      timestamp,
      value: Math.round(value * 100) / 100
    });
    
    timestamp += intervalMs;
  }
  
  return points;
};

// Generate historical data series
export const generateHistoricalData = (
  timeRange: TimeRange
): HistoricalSeries[] => {
  return metricDefinitions.map((def, index) => {
    const baseValue = def.name.includes('Usage') 
      ? randomValue(30, 70) 
      : randomValue(100, 500);
    
    const volatility = def.name.includes('Error') 
      ? 0.5 
      : def.name.includes('Response') 
        ? 10 
        : 20;
    
    return {
      id: `series-${index + 1}`,
      name: def.name,
      unit: def.unit,
      data: generateHistoricalPoints(timeRange, baseValue, volatility)
    };
  });
};
