import { TimeRange, HistoricalDataResponse, MetricData } from "../types";
import { generateHistoricalData, generateMetrics } from "../utils/mockData";

// Base URL for API requests
const API_BASE_URL = "https://dashboard-backend-latest.onrender.com";

/**
 * Fetch historical data for a specific time range
 *
 * @param timeRange - Time range to fetch data for
 * @returns Promise with historical data
 */
export const fetchHistoricalData = async (
  timeRange: TimeRange
): Promise<HistoricalDataResponse> => {
  // In a real application, this would be an actual API call
  // For this demo, we're using simulated data
  try {
    // Simulate API latency
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Generate mock historical data
    const series = generateHistoricalData(timeRange);
    const now = Date.now();

    let start: number;
    switch (timeRange) {
      case "1h":
        start = now - 60 * 60 * 1000;
        break;
      case "6h":
        start = now - 6 * 60 * 60 * 1000;
        break;
      case "24h":
        start = now - 24 * 60 * 60 * 1000;
        break;
      case "7d":
        start = now - 7 * 24 * 60 * 60 * 1000;
        break;
      case "30d":
        start = now - 30 * 24 * 60 * 60 * 1000;
        break;
    }

    return {
      series,
      timeRange: {
        start,
        end: now,
      },
    };
  } catch (error) {
    console.error("Error fetching historical data:", error);
    throw new Error("Failed to fetch historical data");
  }
};

/**
 * Fetch current metrics via polling
 *
 * @returns Promise with current metrics data
 */
export const fetchCurrentMetrics = async (): Promise<MetricData[]> => {
  // In a real application, this would be an actual API call
  // For this demo, we're using simulated data
  try {
    // Simulate API latency
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Generate mock metrics data
    return generateMetrics();
  } catch (error) {
    console.error("Error fetching current metrics:", error);
    throw new Error("Failed to fetch current metrics");
  }
};
