"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { ReactNode } from "react";

// Type for route objects
interface Route {
  name: string;
  path: string;
  element?: ReactNode;
}

// Define your routes
export const routes: Route[] = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
 { name: "Portfolio", path: "/Portfolio" },
  { name: "Contact", path: "/contact" },
];

interface AppRouterProps {
  children: ReactNode;
}

export default function AppRouter({ children }: AppRouterProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-1">
        {children}
      </main>


      {/* Optional: Quick links or debug current path */}
      <div className="fixed bottom-4 right-4 bg-white p-2 border rounded shadow">
        <span className="text-sm text-gray-500">Current Path: {pathname}</span>
        <div className="flex gap-2 mt-1">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className="text-xs text-blue-600 hover:underline"
            >
              {route.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
