import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/layout-wrapper";
import { Toaster } from "sonner";

// const inter = Inter({ subsets: ["latin"] });             

export const metadata = {
  title: "NetworX - LinkedIn Growth Platform",
  description: "Supercharge your LinkedIn growth with AI-powered insights",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Toaster position="bottom-right" />
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
