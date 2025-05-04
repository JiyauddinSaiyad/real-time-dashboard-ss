
// Data source type (WebSocket or Polling)
export type DataSourceType = 'websocket' | 'polling';

// Metric data structure
export interface MetricData {
  id: string;
  name: string;
  value: number;
  unit: string;
  timestamp: number;
  trend: 'up' | 'down' | 'stable';
  percentageChange?: number;
}

// Historical data point
export interface HistoricalDataPoint {
  timestamp: number;
  value: number;
}

// Historical data series
export interface HistoricalSeries {
  id: string;
  name: string;
  unit: string;
  data: HistoricalDataPoint[];
}

// Dashboard state
export interface DashboardState {
  metrics: MetricData[];
  isLoading: boolean;
  error: string | null;
}

// API response for historical data
export interface HistoricalDataResponse {
  series: HistoricalSeries[];
  timeRange: {
    start: number;
    end: number;
  }
}

// Time range for historical data
export type TimeRange = '1h' | '6h' | '24h' | '7d' | '30d';

// WebSocket message types
export type WebSocketMessageType = 'metrics' | 'alert' | 'status';

// WebSocket message format
export interface WebSocketMessage {
  type: WebSocketMessageType;
  data: any;
  timestamp: number;
}
