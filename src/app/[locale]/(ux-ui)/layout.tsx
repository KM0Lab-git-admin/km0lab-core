import '@/styles/globals.css';

export default function UxUiLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Aquí puedes poner un header, sidebar, etc. */}
      {children}
    </div>
  );
}

export function generateStaticParams() {
  return [];
}