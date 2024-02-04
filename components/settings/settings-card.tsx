import { cn } from 'lib/utils';

export default function SettingsCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'border h-fit border-border justify-between rounded-lg flex gap-4 items-center',
        className,
      )}
    >
      {children}
    </div>
  );
}
