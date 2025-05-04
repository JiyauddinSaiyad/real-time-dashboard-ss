
import React, { useState, useEffect } from 'react';
import { DataSourceType } from '../types';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface FloatingToggleProps {
  dataSource: DataSourceType;
  onChange: (dataSource: DataSourceType) => void;
}

const FloatingToggle: React.FC<FloatingToggleProps> = ({
  dataSource,
  onChange
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show the toggle when scrolling down 100px or more
      setVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleChange = (checked: boolean) => {
    onChange(checked ? 'websocket' : 'polling');
  };

  if (!visible) return null;

  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-card/80 backdrop-blur-sm p-3 rounded-full shadow-lg border border-border transition-all duration-300 fade-in flex items-center gap-2`}>
      <Label htmlFor="floating-data-source" className="text-sm">
        {dataSource === 'polling' ? 'Polling' : 'WebSocket'}
      </Label>
      <Switch
        id="floating-data-source"
        checked={dataSource === 'websocket'}
        onCheckedChange={handleToggleChange}
      />
    </div>
  );
};

export default FloatingToggle;
