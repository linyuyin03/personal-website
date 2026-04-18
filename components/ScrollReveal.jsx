/**
 * components/ScrollReveal.jsx — 滚动入场动画挂载器
 *
 * 本组件不渲染任何可见的 DOM 元素，仅在挂载时（useEffect）注册一个
 * IntersectionObserver，监听页面中所有带动画 class 的元素。
 *
 * 工作原理：
 *  1. 页面初始化时，.reveal / .reveal-left / .reveal-right 元素处于透明 + 偏移状态
 *     （由 globals.css 中的 .reveal { opacity: 0; transform: translateY(30px) } 定义）
 *  2. 当元素进入视口（超过 10% 可见）时，Observer 为其添加 .in class
 *  3. globals.css 中 .reveal.in { opacity: 1; transform: none } 触发 CSS 过渡，
 *     产生平滑的淡入 + 上移动画
 *  4. 动画触发后立即 unobserve，避免重复触发
 *
 * CSS 动画类说明（在 globals.css 中定义）：
 *  .reveal       → 从下方淡入（translateY(30px) → none）
 *  .reveal-left  → 从左侧淡入（translateX(-30px) → none）
 *  .reveal-right → 从右侧淡入（translateX(30px) → none）
 */

'use client'; // 需要在浏览器环境执行 DOM 操作，必须是 Client Component

import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    // 创建 IntersectionObserver 实例
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 元素进入视口：添加 .in class 触发 CSS 过渡动画
            entry.target.classList.add('in');
            // 动画只需触发一次，观察后立即取消监听，节省性能
            io.unobserve(entry.target);
          }
        });
      },
      {
        // threshold: 0.1 表示元素露出 10% 时触发，避免元素刚出现就立即触发
        threshold: 0.1,
      },
    );

    // 选取页面中所有需要动画的元素并开始监听
    const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    targets.forEach((el) => io.observe(el));

    // 清理函数：组件卸载时断开所有监听，防止内存泄漏
    return () => io.disconnect();
  }, []); // 空依赖数组 → 仅在组件首次挂载时执行一次

  // 不渲染任何 DOM 元素
  return null;
}
