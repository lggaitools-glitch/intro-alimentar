'use client';

interface ProgressBarProps {
  percentage: number;
  label?: string;
  color?: 'green' | 'orange' | 'blue';
  size?: 'sm' | 'md';
}

export default function ProgressBar({ percentage, label, color = 'green', size = 'md' }: ProgressBarProps) {
  const colorClasses = {
    green: 'bg-green-app',
    orange: 'bg-orange-app',
    blue: 'bg-blue-app',
  };
  const bgClasses = {
    green: 'bg-green-light',
    orange: 'bg-orange-light',
    blue: 'bg-blue-light',
  };
  const h = size === 'sm' ? 'h-1.5' : 'h-2.5';

  return (
    <div>
      {label && (
        <div className="flex justify-between text-xs text-text-muted mb-1">
          <span>{label}</span>
          <span>{percentage}%</span>
        </div>
      )}
      <div className={`${bgClasses[color]} rounded-full ${h} overflow-hidden`}>
        <div
          className={`${colorClasses[color]} ${h} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
        />
      </div>
    </div>
  );
}
