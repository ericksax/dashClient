"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { ToastProvider } from "@/components/tostProvider";
import { usePathname } from "next/navigation";
import IsAuthenticated from "@/components/isAuthenticated/page";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "DashClient",
//   description: "client your self",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const privatePaths = ["/clients", "/dash", "client_edit"];
  const path = usePathname();

  const checkIsPrivate = (path: string) => {
    return privatePaths.includes(path);
  };

  const isPrivate = checkIsPrivate(path);

  return (
    <html lang="en">
      <body className={(inter.className, "bg-gray-900 text-gray-100")}>
        <ToastProvider>
          {!isPrivate && children}
          {isPrivate && <IsAuthenticated>{children}</IsAuthenticated>}
        </ToastProvider>
      </body>
    </html>
  );
}
