/**
 * components/Hero.jsx — 首屏展示区域
 *
 * 页面打开后第一个看到的区域，包含：
 *  - 左侧：状态徽章、姓名、职业标题、简介文字、快捷操作按钮
 *  - 右侧：头像（带旋转彩色光环）+ 身份徽章
 *  - 背景：多层径向渐变光晕 + 3 个浮动光球（CSS animation）
 *
 * 图片说明：
 *  - 头像图片从 public/avatar.jpg 读取（Next.js Image 组件自动优化）
 *  - 图片加载失败时显示 avatar-placeholder（SVG 人像图标 + 文字提示）
 */

'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useLang } from '@/context/LangContext';

export default function Hero() {
  const { t } = useLang();

  // imgError：标记头像是否加载失败，失败时显示占位符
  const [imgError, setImgError] = useState(false);

  return (
    <section id="hero" className="hero">
      {/* 背景多层径向渐变光晕 */}
      <div className="hero-glow" />

      {/* 浮动光球（CSS @keyframes floatOrb 控制上下浮动） */}
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />

      {/* 左右两列布局容器 */}
      <div className="hero-inner">

        {/* ── 左列：文字内容 ── */}
        {/* reveal-left：ScrollReveal 监听到可见时，从左侧滑入 */}
        <div className="hero-left reveal-left">

          {/* 顶部状态徽章：绿色脉冲点 + "正在寻找实习机会" */}
          <div className="hero-badge">
            <span className="dot-pulse" /> {/* CSS animation: pulse，绿色呼吸灯 */}
            {t('正在寻找实习机会', 'Open to Opportunities')}
          </div>

          {/* 姓名（渐变色大字） */}
          <h1 className="hero-name">{t('林雨音', 'Yuyin Lin')}</h1>

          {/* 职业副标题 */}
          <p className="hero-subtitle">
            {t(
              '软件工程师 · 全栈开发 · AI 应用',
              'Software Engineer · Full-Stack · AI Applications',
            )}
          </p>

          {/* 个人简介段落 */}
          <p className="hero-desc">
            {t(
              '南加州大学在读硕士。热爱全栈开发、RAG 系统与云基础设施。具备从前端到部署的完整工程能力。',
              "Master's student at USC. Passionate about full-stack development, RAG systems, and cloud infrastructure — with end-to-end engineering experience from two internships.",
            )}
          </p>

          {/* 快捷操作按钮组 */}
          <div className="hero-btns">
            {/* 主要按钮：发送邮件（填充样式，视觉权重最高） */}
            <a href="mailto:linyuyin03@gmail.com" className="btn-primary">
              <EmailIcon />
              {t('发送邮件', 'Email Me')}
            </a>

            {/* 次要按钮：GitHub（描边样式） */}
            <a
              href="https://github.com/linyuyin03"
              target="_blank"
              rel="noopener noreferrer" // 安全属性：防止新标签页访问 window.opener
              className="btn-ghost"
            >
              <GithubIcon />
              GitHub
            </a>

            {/* 次要按钮：LinkedIn */}
            <a
              href="https://linkedin.com/in/yuyin-lin-7377b4361/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <LinkedinIcon />
              LinkedIn
            </a>
          </div>
        </div>

        {/* ── 右列：头像 ── */}
        {/* reveal-right：ScrollReveal 监听到可见时，从右侧滑入 */}
        <div className="hero-right reveal-right">
          <div className="avatar-wrap">

            {/* 旋转彩色光环（CSS @keyframes spinRing） */}
            <div className="avatar-ring" />
            {/* 光环内侧遮罩，与背景色一致，制造"空心环"效果 */}
            <div className="avatar-ring-mask" />

            {/* 头像图片：来自 public/avatar.jpg，Next.js Image 自动优化 */}
            {/* 用 div 控制 inset 偏移和圆形裁剪，Image 只负责 fill 填充 */}
            {/* fill 模式不能同时设置 style.width/height，需要由父容器决定尺寸 */}
            {!imgError ? (
              <div style={{
                position: 'absolute',
                inset: 6,
                borderRadius: '50%',
                overflow: 'hidden',
                zIndex: 1,
              }}>
                <Image
                  src="/avatar.jpg"
                  alt={t('林雨音', 'Yuyin Lin')}
                  fill
                  style={{ objectFit: 'cover' }}
                  onError={() => setImgError(true)}
                  priority
                />
              </div>
            ) : (
              /* 图片不存在时显示的占位符 */
              <div className="avatar-placeholder">
                <PersonIcon />
                <span style={{ fontSize: '0.75rem' }}>
                  {t('请将 avatar.jpg 放入 public/', 'Place avatar.jpg in public/')}
                </span>
              </div>
            )}

            {/* 头像右下角的身份标签徽章 */}
            <div className="avatar-badge">
              <span className="dot-pulse" />
              {t('USC 在读', 'USC Student')}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ── 内联 SVG 图标组件 ── */
/* 使用内联 SVG 而非图标库，减少依赖，且不增加包体积 */

function EmailIcon() {
  return (
    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7 10-7" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ opacity: 0.4 }}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}
