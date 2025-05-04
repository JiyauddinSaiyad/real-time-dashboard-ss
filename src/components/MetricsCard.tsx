
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';
import { MetricData } from '../types';

interface MetricsCardProps {
  metric: MetricData;
  isLoading?: boolean;
}

const MetricsCard: React.FC<MetricsCardProps> = ({ 
  metric,
  isLoading = false
}) => {
  // Helper to get trend icon
  const getTrendIcon = () => {
    switch (metric.trend) {
      case 'up':
        return <ArrowUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <ArrowDown className="h-4 w-4 text-red-500" />;
      case 'stable':
        return <Minus className="h-4 w-4 text-yellow-500" />;
    }
  };
  
  // Helper to get trend color
  const getTrendColor = () => {
    switch (metric.trend) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      case 'stable':
        return 'text-yellow-500';
    }
  };
  
  return (
    <Card className={`metrics-card ${isLoading ? 'animate-pulse-slow' : ''}`}>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-2">
          <div className="text-sm font-medium text-muted-foreground">{metric.name}</div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold">
              {metric.value}
              <span className="ml-1 text-sm font-normal text-muted-foreground">
                {metric.unit}
              </span>
            </div>
            
            {metric.percentageChange !== undefined && (
              <div className="flex items-center gap-1">
                {getTrendIcon()}
                <span className={`text-xs ${getTrendColor()}`}>
                  {metric.percentageChange > 0 ? '+' : ''}
                  {metric.percentageChange}%
                </span>
              </div>
            )}
          </div>
          
          <div className="text-xs text-muted-foreground">
            Last updated: {new Date(metric.timestamp).toLocaleTimeString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
