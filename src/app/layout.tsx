'use client'; // Mark this part as client-side only
import { usePathname } from 'next/navigation';
import { Inter } from 'next/font/google';
import './globals.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import Sidebar from './components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname(); // Get the current path

  // Show sidebar only if not on the login page
  const showSidebar = pathname !== '/login';

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          {showSidebar && (
            <aside className="w-64 h-full fixed top-0 left-0 bg-gray-50 shadow-lg z-10">
              <Sidebar />
            </aside>
          )}
          <main className={`flex-1 p-8 ${showSidebar ? 'ml-64' : ''} bg-gray-100 overflow-auto`}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
