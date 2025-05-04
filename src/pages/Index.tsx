
import React, { useState } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import { usePolling } from '../hooks/usePolling';
import { DataSourceType } from '../types';
import DashboardHeader from '../components/DashboardHeader';
import MetricsCard from '../components/MetricsCard';
import ToggleDataSource from '../components/ToggleDataSource';
import FloatingToggle from '../components/FloatingToggle';
import DataVisualization from '../components/DataVisualization';
import HistoricalDataSection from '../components/HistoricalDataSection';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [dataSource, setDataSource] = useState<DataSourceType>('websocket');
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Set up WebSocket hook
  const {
    metrics: wsMetrics,
    isLoading: wsLoading,
    error: wsError,
    isConnected
  } = useWebSocket();

  // Set up polling hook (30 seconds)
  const {
    metrics: pollMetrics,
    isLoading: pollLoading,
    error: pollError,
    isPolling,
    refresh
  } = usePolling(30000);

  // Toggle between WebSocket and Polling
  const handleToggleDataSource = () => {
    const newDataSource = dataSource === 'websocket' ? 'polling' : 'websocket';
    setDataSource(newDataSource);
    
    toast({
      title: `Switched to ${newDataSource === 'websocket' ? 'WebSocket' : 'Polling'} data source`,
      description: newDataSource === 'websocket' 
        ? 'Data will update in real-time' 
        : 'Data will refresh every 30 seconds',
    });
  };

  // Select current metrics based on data source
  const currentMetrics = dataSource === 'websocket' ? wsMetrics : pollMetrics;
  const isLoading = dataSource === 'websocket' ? wsLoading : pollLoading;
  const error = dataSource === 'websocket' ? wsError : pollError;

  return (
    <div className="container mx-auto px-4 py-6 sm:px-6">
      <DashboardHeader 
        dataSource={dataSource} 
        onToggleDataSource={handleToggleDataSource} 
      />
      
      {isMobile && (
        <ToggleDataSource 
          dataSource={dataSource} 
          onChange={setDataSource} 
        />
      )}
      
      {error ? (
        <div className="mb-6 rounded-xl bg-destructive/10 p-4 text-destructive">
          <p className="font-medium">Error loading data</p>
          <p className="text-sm">{error}</p>
        </div>
      ) : null}
      
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {currentMetrics.length > 0
          ? currentMetrics.slice(0, 4).map((metric) => (
              <MetricsCard 
                key={metric.id} 
                metric={metric}
                isLoading={isLoading} 
              />
            ))
          : Array(4).fill(0).map((_, i) => (
              <div 
                key={i} 
                className="h-[120px] rounded-xl bg-card/50 animate-pulse-slow"
              ></div>
            ))
        }
      </div>
      
      <div className="mb-6">
        <DataVisualization 
          metrics={currentMetrics} 
          title="Current Metrics" 
          isLoading={isLoading}
        />
      </div>
      
      <div className="mb-6">
        <HistoricalDataSection title="Historical Data" />
      </div>
      
      <FloatingToggle 
        dataSource={dataSource} 
        onChange={setDataSource} 
      />
      
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>Real-time Dashboard - {new Date().getFullYear()}</p>
        <p className="mt-1">
          Data Source: {dataSource === 'websocket' ? 'WebSocket' : 'Polling'} | 
          {dataSource === 'websocket' 
            ? isConnected 
              ? ' Connected' 
              : ' Disconnected'
            : isPolling
              ? ' Auto-refresh enabled (30s)'
              : ' Auto-refresh disabled'
          }
        </p>
      </footer>
    </div>
  );
};

export default Index;
