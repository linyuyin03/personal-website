/**
 * app/layout.js — 根布局（Root Layout）
 *
 * Next.js App Router 中每个页面都会被这个布局包裹。
 * 职责：
 *  1. 设置 <html> 和 <body> 标签
 *  2. 注入 SEO metadata（title、description、Open Graph）
 *  3. 引入全局字体（Inter via next/font，Noto Sans SC via Google Fonts）
 *  4. 引入全局 CSS（globals.css）
 *
 * 注意：这是一个 Server Component（无 'use client'），可以导出 metadata 对象。
 */

import { Inter } from 'next/font/google';
import './globals.css';

// next/font/google 会在构建时下载字体并通过 CSS 变量注入，
// 避免 FOUT（无样式文字闪烁）并保障字体隐私。
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// metadata 对象由 Next.js 自动注入到 <head>，无需手写 <meta> 标签。
export const metadata = {
  title: '林雨音 | Yuyin Lin',
  description:
    "Software Engineer · Full-Stack · AI Applications — USC Master's student passionate about RAG systems, cloud infrastructure, and modern web development.",
  keywords: ['Yuyin Lin', '林雨音', 'Software Engineer', 'Full Stack', 'React', 'Next.js', 'USC'],
  openGraph: {
    title: '林雨音 | Yuyin Lin',
    description: 'Software Engineer · Full-Stack · AI Applications',
    type: 'website',
  },
};

/**
 * RootLayout — 所有页面的外层包裹组件
 * @param {{ children: React.ReactNode }} props
 */
export default function RootLayout({ children }) {
  return (
    // lang 属性影响屏幕阅读器和浏览器的语言行为
    <html lang="zh-CN">
      <head>
        {/* Noto Sans SC 用于中文字符显示，Inter 由 next/font 处理 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Noto+Sans+SC:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* inter.variable 将字体作为 CSS 变量 --font-inter 注入，globals.css 中使用 */}
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
