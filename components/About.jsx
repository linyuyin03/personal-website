/**
 * components/About.jsx — 教育背景区域
 *
 * 包含两部分：
 *  1. 教育时间线：USC 硕士 + 北京工商大学本科，垂直时间线布局
 *  2. 数据统计卡片：以数字卡片形式展示核心成就（GPA、实习次数等）
 *
 * 布局特点：
 *  - 时间线通过左侧 padding + 伪元素竖线 + 绝对定位圆点实现（纯 CSS）
 *  - 统计卡片使用 CSS Grid auto-fit + minmax 自适应列数
 */

'use client';

import { useLang } from '@/context/LangContext';

/**
 * 统计数据配置
 * num：显示的数字/文字
 * zh/en：对应的标签文字
 */
const STATS = [
  { num: '3.85', zh: 'USC 硕士 GPA',   en: "USC Master's GPA"  },
  { num: '4.0',  zh: '本科 GPA',        en: 'Undergrad GPA'    },
  { num: '2',    zh: 'SDE 实习经历',    en: 'SDE Internships'  },
  { num: '15+',  zh: '掌握技术栈',      en: 'Technologies'     },
  { num: '5K+',  zh: '并发用户支持',    en: 'Concurrent Users' },
];

export default function About() {
  const { t } = useLang();

  return (
    <section id="about" style={{ padding: 0 }}>
      <div className="section-wrap">

        {/* 区块标题：section-label（小标签）+ section-title（大标题） */}
        <div className="reveal">
          <p className="section-label">{t('教育背景', 'Education')}</p>
          <h2 className="section-title">{t('求学经历', 'Academic Journey')}</h2>
        </div>

        {/* ── 教育时间线 ── */}
        {/* edu-timeline 通过 CSS 伪元素 ::before 绘制左侧竖线 */}
        <div className="edu-timeline">

          {/* 硕士 */}
          <div className="edu-item reveal">
            {/* edu-dot：时间线上的圆点，通过 absolute 定位到竖线上 */}
            <div className="edu-dot" />
            <div className="edu-card">
              <div className="edu-row">
                <div className="edu-school">{t('南加州大学 (USC)', 'University of Southern California')}</div>
                <div className="edu-date">Sep. 2024 – May 2027</div>
              </div>
              <div className="edu-degree">
                {t(
                  '地理信息科技与技术，硕士 | GPA 3.85 | 洛杉矶，美国',
                  'M.S. Geographic Information Science & Technology | GPA 3.85 | Los Angeles, CA',
                )}
              </div>
            </div>
          </div>

          {/* 本科 */}
          <div className="edu-item reveal">
            <div className="edu-dot" />
            <div className="edu-card">
              <div className="edu-row">
                <div className="edu-school">{t('北京工商大学', 'Beijing Technology and Business University')}</div>
                <div className="edu-date">Sep. 2020 – Jul. 2024</div>
              </div>
              <div className="edu-degree">
                {t(
                  '计算机科学，学士 | GPA 4.0 | 北京，中国',
                  'B.S. Computer Science and Technology | GPA 4.0 | Beijing, CN',
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── 数据统计卡片 Grid ── */}
        {/* CSS Grid auto-fit + minmax(160px, 1fr)：自动根据容器宽度决定列数 */}
        <div className="stats-row reveal">
          {STATS.map((s) => (
            <div className="stat-card" key={s.num}>
              {/* 渐变色大数字 */}
              <div className="stat-num">{s.num}</div>
              {/* 数字说明文字 */}
              <div className="stat-label">{t(s.zh, s.en)}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
