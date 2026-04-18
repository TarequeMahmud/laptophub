'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>({
    theme: 'light',
    toggleTheme: () => { },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('light');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const savedTheme = localStorage.getItem('theme') as Theme | null;
        const initialTheme = savedTheme
            ? savedTheme
            : window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light';

        setTheme(initialTheme);
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) {
            return;
        }

        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme, mounted]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        return { theme: 'light' as Theme, toggleTheme: () => { } };
    }
    return context;
}