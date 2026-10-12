import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pr-case-library.earthyshore32.chatgpt.site"),
  title: "CrisisLens｜AI 营销公关决策情报库",
  description: "将 111 个中国与海外公关案例，转化为可检索、可比较、可生成策略简报的 AI 营销决策产品。",
  openGraph: {
    title: "CrisisLens｜AI 营销公关决策情报库",
    description: "把危机案例，训练成可调用的营销判断。",
    images: [{ url: "/og.png", width: 1732, height: 908, alt: "CrisisLens AI Marketing Intelligence" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CrisisLens｜AI 营销公关决策情报库",
    description: "把危机案例，训练成可调用的营销判断。",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
