/**
 * components/Contact.jsx — 联系方式区域
 *
 * 居中布局的卡片，包含：
 *  - 顶部彩色渐变线条（CSS ::before 伪元素）
 *  - 背景径向渐变光晕（.contact-glow 绝对定位层）
 *  - 问候标题、说明文字
 *  - Email / GitHub / LinkedIn 三个链接按钮
 *
 * 如需修改联系方式：直接更新 href 属性中的邮箱地址和 URL 即可。
 */

'use client';

import { useLang } from '@/context/LangContext';

export default function Contact() {
  const { t } = useLang();

  return (
    <section id="contact" style={{ padding: 0 }}>
      {/* contact-outer：flex 居中容器，给卡片提供上下内边距 */}
      <div className="contact-outer">
        <div className="contact-card reveal">

          {/* 背景光晕层（radial-gradient，absolute 定位，pointer-events: none 不阻挡点击） */}
          <div className="contact-glow" />

          {/* 标题 */}
          <h2 className="contact-title">{t('一起合作吧 👋', "Let's Connect 👋")}</h2>

          {/* 说明文字：支持 \n 换行（whitespace: pre-line 由 CSS 处理，或直接换行） */}
          <p className="contact-desc">
            {t(
              '我对实习、全职及项目合作机会保持开放。\n无论是想聊技术还是合作机会，欢迎随时联系！',
              "I'm open to internship, full-time, and collaboration opportunities.\nWhether it's tech talk or career discussions — feel free to reach out!",
            )}
          </p>

          {/* 联系方式链接列表 */}
          <div className="contact-links">
            {/* Email 链接：mailto 协议，点击打开系统邮件客户端 */}
            <a href="mailto:linyuyin03@gmail.com" className="contact-link">
              <EmailIcon />
              linyuyin03@gmail.com
            </a>

            {/* GitHub 个人主页 */}
            <a
              href="https://github.com/linyuyin03"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <GithubIcon />
              GitHub
            </a>

            {/* LinkedIn 个人主页 */}
            <a
              href="https://linkedin.com/in/yuyin-lin-7377b4361/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <LinkedinIcon />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 内联 SVG 图标 ── */

function EmailIcon() {
  return (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7 10-7" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
