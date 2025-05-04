
import React from 'react';
import { DataSourceType } from '../types';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

interface ToggleDataSourceProps {
  dataSource: DataSourceType;
  onChange: (dataSource: DataSourceType) => void;
}

const ToggleDataSource: React.FC<ToggleDataSourceProps> = ({
  dataSource,
  onChange
}) => {
  const isMobile = useIsMobile();
  
  const handleToggleChange = (checked: boolean) => {
    onChange(checked ? 'websocket' : 'polling');
  };
  
  return (
    <Card className="mb-6">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium leading-none">
            Data Source
          </p>
          <p className="text-sm text-muted-foreground">
            {isMobile 
              ? dataSource === 'websocket' ? 'Real-time' : 'Every 30 seconds' 
              : `Choose between WebSocket real-time updates or REST API polling`
            }
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="data-source-toggle" className="text-sm">
            {dataSource === 'polling' ? 'Polling' : 'WebSocket'}
          </Label>
          <Switch
            id="data-source-toggle"
            checked={dataSource === 'websocket'}
            onCheckedChange={handleToggleChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ToggleDataSource;
