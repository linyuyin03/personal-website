/**
 * components/Nav.jsx — 顶部固定导航栏
 *
 * 功能：
 *  1. 固定在视口顶部（CSS position: fixed），滚动时始终可见
 *  2. 滚动后背景添加阴影（scrolled class），增强层次感
 *  3. 监听页面滚动，高亮当前所在 section 对应的导航链接（active class）
 *  4. 包含语言切换按钮，调用 LangContext 的 toggle 函数
 */

'use client'; // 使用了 useState、useEffect，必须是 Client Component

import { useEffect, useState } from 'react';
import { useLang } from '@/context/LangContext';

/**
 * 导航链接配置列表
 * href 对应页面中各 section 的 id，点击后平滑滚动到对应位置（由 CSS scroll-behavior: smooth 实现）
 */
const LINKS = [
  { href: '#about',      zh: '关于', en: 'About'      },
  { href: '#skills',     zh: '技能', en: 'Skills'     },
  { href: '#experience', zh: '经历', en: 'Experience' },
  { href: '#projects',   zh: '项目', en: 'Projects'   },
  { href: '#gallery',    zh: '相册', en: 'Gallery'    },
  { href: '#contact',    zh: '联系', en: 'Contact'    },
];

export default function Nav() {
  const { lang, toggle, t } = useLang(); // 从 LangContext 获取语言状态和工具函数

  // active：当前高亮的 section id（不含 #）
  const [active, setActive] = useState('');
  // scrolled：页面是否已滚动超过 20px（用于切换导航栏阴影样式）
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // 滚动超过 20px 时给导航栏加上阴影效果
      setScrolled(window.scrollY > 20);

      // 遍历所有 section，找出当前视口顶部对应的 section
      const sections = document.querySelectorAll('section[id]');
      let cur = '';
      sections.forEach((s) => {
        // offsetTop - 130：提前 130px 触发高亮，让用户体验更自然
        if (window.scrollY >= s.offsetTop - 130) cur = s.id;
      });
      setActive(cur);
    };

    // passive: true 表示不会调用 preventDefault，允许浏览器优化滚动性能
    window.addEventListener('scroll', onScroll, { passive: true });

    // 清理函数：组件卸载时移除监听，防止内存泄漏
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    // scrolled 为 true 时追加 'scrolled' class，CSS 会为其添加 box-shadow
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>

      {/* Logo：点击后滚回页面顶部 */}
      <a href="#hero" className="nav-logo">
        {t('林雨音', 'Yuyin Lin')}
      </a>

      <div className="nav-links">
        {/* 根据配置列表动态渲染各导航链接 */}
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            // 当前 section 对应的链接添加 active class（CSS 会显示下划线）
            className={active === l.href.slice(1) ? 'active' : ''}
          >
            {t(l.zh, l.en)} {/* 根据语言显示中文或英文 */}
          </a>
        ))}

        {/* 语言切换按钮：显示"切换到另一种语言"的提示文字 */}
        <button className="lang-btn" onClick={toggle}>
          {lang === 'zh' ? 'English' : '中文'}
        </button>
      </div>
    </nav>
  );
}
