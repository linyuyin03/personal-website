/**
 * app/page.js — 主页面（Home Page）
 *
 * Next.js App Router 的页面入口，对应路由 "/"。
 * 这是一个 Server Component（无 'use client'），负责：
 *  1. 用 <LangProvider> 包裹全部内容，为所有子组件提供语言状态
 *  2. 按顺序组合各个 Section 组件，构成完整的单页网站
 *  3. 挂载 <ScrollReveal> 触发滚动入场动画
 *
 * 组件加载顺序（从上到下对应页面各区块）：
 *   Nav → Hero → About → Skills → Experience → Projects → Gallery → Contact → Footer
 */

import { LangProvider }  from '@/context/LangContext';
import Nav          from '@/components/Nav';
import Hero         from '@/components/Hero';
import About        from '@/components/About';
import Skills       from '@/components/Skills';
import Experience   from '@/components/Experience';
import Projects     from '@/components/Projects';
import Gallery      from '@/components/Gallery';
import Contact      from '@/components/Contact';
import ScrollReveal from '@/components/ScrollReveal';

export default function Page() {
  return (
    /*
     * LangProvider 是语言状态的根节点。
     * 包裹在最外层，使任意深度的子组件都能通过 useLang() 获取语言状态，
     * 无需逐层传递 props（避免 prop drilling）。
     */
    <LangProvider>

      {/*
       * ScrollReveal 本身不渲染任何 DOM 元素（返回 null），
       * 仅在 useEffect 中注册一个 IntersectionObserver，
       * 监听所有带 .reveal / .reveal-left / .reveal-right class 的元素，
       * 进入视口时添加 .in class 触发 CSS 过渡动画。
       */}
      <ScrollReveal />

      {/* 固定在顶部的导航栏，包含锚点链接和语言切换按钮 */}
      <Nav />

      <main>
        {/* 首屏：姓名、职业标签、简介、头像、快速链接按钮 */}
        <Hero />

        {/* 各 section 之间的水平分割线（渐变线，CSS class: section-divider） */}
        <div className="section-divider" />

        {/* 教育背景时间线 + 数据统计卡片（GPA、实习次数等） */}
        <About />

        <div className="section-divider" />

        {/* 技能分类标签：编程语言、框架、数据库、工具/云平台 */}
        <Skills />

        <div className="section-divider" />

        {/* 实习经历时间线：按时间倒序排列，每条经历含公司、职责、技术标签 */}
        <Experience />

        <div className="section-divider" />

        {/* 专业项目卡片：项目名称、描述要点、技术标签 */}
        <Projects />

        <div className="section-divider" />

        {/*
         * 照片相册区域：马赛克网格布局
         * 含灯箱（Lightbox）功能，点击图片可全屏预览
         * 照片文件放在 public/ 目录下即可自动显示
         */}
        <Gallery />

        <div className="section-divider" />

        {/* 联系方式：Email、GitHub、LinkedIn 链接卡片 */}
        <Contact />
      </main>

      {/* 页脚 */}
      <footer className="footer">
        © 2025 林雨音 / Yuyin Lin · Built with Next.js &amp; deployed on Vercel
      </footer>

    </LangProvider>
  );
}
