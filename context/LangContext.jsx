/**
 * context/LangContext.jsx — 全局语言状态管理
 *
 * 采用 React Context API 实现中英文切换，避免在每个组件之间手动传递 lang prop。
 *
 * 使用方式：
 *  1. 在顶层组件（app/page.js）用 <LangProvider> 包裹全部内容
 *  2. 任意子组件调用 useLang() Hook 获取语言状态和工具函数
 *
 * 示例：
 *   const { t, lang, toggle } = useLang();
 *   <h1>{t('你好', 'Hello')}</h1>
 *   <button onClick={toggle}>{lang === 'zh' ? 'English' : '中文'}</button>
 */

'use client'; // Context 依赖 useState，必须是 Client Component

import { createContext, useContext, useState } from 'react';

// 创建 Context 对象，初始值为 null（由 LangProvider 提供实际值）
const LangContext = createContext(null);

/**
 * LangProvider — 语言状态提供者
 *
 * 包裹在应用顶层，所有子组件都可通过 useLang() 消费其提供的值。
 *
 * @param {{ children: React.ReactNode }} props
 */
export function LangProvider({ children }) {
  // lang 状态：'zh'（中文）或 'en'（英文），默认中文
  const [lang, setLang] = useState('en');

  /** 切换语言：zh ↔ en */
  const toggle = () => setLang((l) => (l === 'zh' ? 'en' : 'zh'));

  /**
   * t() — 翻译函数（translation shorthand）
   * 根据当前语言返回对应的字符串。
   *
   * @param {string} zh - 中文文本
   * @param {string} en - 英文文本
   * @returns {string} 当前语言对应的文本
   *
   * @example
   *   t('软件工程师', 'Software Engineer') // 当前为 zh → '软件工程师'
   */
  const t = (zh, en) => (lang === 'zh' ? zh : en);

  return (
    // value 向所有后代组件暴露：lang（当前语言）、toggle（切换函数）、t（翻译函数）
    <LangContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LangContext.Provider>
  );
}

/**
 * useLang() — 消费语言 Context 的自定义 Hook
 *
 * 必须在 <LangProvider> 内部的组件中调用，否则抛出错误。
 *
 * @returns {{ lang: 'zh'|'en', toggle: () => void, t: (zh: string, en: string) => string }}
 */
export function useLang() {
  const ctx = useContext(LangContext);
  // 防御性检查：确保在 Provider 外不会静默失败
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
