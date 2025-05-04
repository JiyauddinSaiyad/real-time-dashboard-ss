
import React from 'react';
import { LayoutDashboard } from 'lucide-react';
import { DataSourceType } from '../types';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from './ThemeToggle';
import { useIsMobile } from '@/hooks/use-mobile';

interface DashboardHeaderProps {
  dataSource: DataSourceType;
  onToggleDataSource: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  dataSource,
  onToggleDataSource
}) => {
  const isMobile = useIsMobile();

  return (
    <header className="mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
      
      {!isMobile && (
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Badge 
              variant={dataSource === 'websocket' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={onToggleDataSource}
            >
              {dataSource === 'websocket' ? 'WebSocket' : 'Polling'}
            </Badge>
            
            <div className="text-sm text-muted-foreground">
              {dataSource === 'websocket' 
                ? 'Real-time updates'
                : 'Updates every 30 seconds'}
            </div>
          </div>
          
          <button 
            className="text-sm text-primary hover:underline"
            onClick={onToggleDataSource}
          >
            Switch to {dataSource === 'websocket' ? 'Polling' : 'WebSocket'}
          </button>
        </div>
      )}
    </header>
  );
};

export default DashboardHeader;
