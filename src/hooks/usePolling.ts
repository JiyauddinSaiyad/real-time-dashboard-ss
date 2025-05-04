import { useState, useEffect, useRef } from "react";
import { MetricData } from "../types";

const API_URL = "https://dashboard-backend-latest.onrender.com/api/metrics";

/**
 * Custom hook to handle polling for data
 *
 * @param interval - Polling interval in milliseconds
 * @returns Polling state and data
 */
export const usePolling = (interval: number = 30000) => {
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPolling, setIsPolling] = useState(true);

  // Use ref to keep track of the interval ID
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setMetrics(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch metrics data");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Start polling
  useEffect(() => {
    // Initial fetch
    fetchData();

    // Set up polling interval if polling is enabled
    if (isPolling) {
      intervalRef.current = setInterval(fetchData, interval);
    }

    // Clean up on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [interval, isPolling]);

  // Toggle polling on/off
  const togglePolling = () => {
    if (isPolling && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else {
      fetchData();
      intervalRef.current = setInterval(fetchData, interval);
    }

    setIsPolling(!isPolling);
  };

  return {
    metrics,
    isLoading,
    error,
    isPolling,
    togglePolling,
    refresh: fetchData,
  };
};
