/** @format */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { WebSocketProvider } from '@/lib/websocket/websocket.context';


const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "REF3R ",
	description: "REF3R - Elevate your Creator Journey",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<QueryProvider>
					<AuthProvider>
            <WebSocketProvider>
						{children}
        
						<Toaster
							position="top-right"
							toastOptions={{
								duration: 3000,
								style: {
									background: "#333",
									color: "#fff",
									borderRadius: "8px",
								},
								success: {
									iconTheme: {
										primary: "#00B24E",
										secondary: "#fff",
									},
								},
								error: {
									iconTheme: {
										primary: "#ff4b4b",
										secondary: "#fff",
									},
								},
							}}
						/>
                </WebSocketProvider>
					</AuthProvider>
				</QueryProvider>
			</body>
		</html>
	);
}