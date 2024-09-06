import { ReactNode } from "react";
import "../styles/globals.css";

interface LayoutProps {
  children: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
