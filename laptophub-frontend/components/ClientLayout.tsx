'use client';

import { Toaster } from "react-hot-toast";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";

export function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Toaster position="top-right" />
        </ThemeProvider>
    );
}