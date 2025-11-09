import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Body Momentum - Workout Tracker",
  description: "Track your workouts, build strength, and achieve your fitness goals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <main className="pb-20">
              {children}
            </main>
            <Navigation />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
