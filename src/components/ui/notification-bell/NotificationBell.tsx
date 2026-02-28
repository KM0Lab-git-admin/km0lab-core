interface NotificationBellProps {
  hasAlerts?: boolean;
  className?: string;
}

const NotificationBell = ({ hasAlerts = false, className = '' }: NotificationBellProps) => (
  <div className={`relative inline-flex items-center justify-center text-km0-blue-800 ${className}`}>
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>

    <span
      className={`absolute -top-0.5 -right-0.5 size-2.5 rounded-full border-2 border-white animate-dot-pulse ${hasAlerts ? 'bg-km0-coral-400' : 'bg-km0-beige-200'}`}
      aria-hidden
    />
  </div>
);

export default NotificationBell;
