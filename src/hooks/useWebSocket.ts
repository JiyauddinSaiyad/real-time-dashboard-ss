import { useState, useEffect } from "react";
import { MetricData } from "../types";

/**
 * Custom hook to handle WebSocket connection and data
 *
 * @returns WebSocket state and data
 */
export const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const ws = new WebSocket("wss://dashboard-backend-latest.onrender.com");

    ws.onopen = () => {
      setIsConnected(true);
      setIsLoading(false);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMetrics(data.data);
    };

    ws.onerror = () => {
      setError("WebSocket connection failed");
      setIsLoading(false);
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    return () => {
      ws.close();
      setIsConnected(false);
    };
  }, []);

  const reconnect = () => {
    setIsLoading(true);
    setError(null);
    setIsConnected(false);
  };

  return {
    isConnected,
    metrics,
    error,
    isLoading,
    reconnect,
  };
};
