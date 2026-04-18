/**
 * components/Projects.jsx — 专业项目区域
 *
 * 以卡片网格形式展示项目经历，每张卡片包含：
 *  emoji 图标、日期徽章、项目名称、归属机构、职责要点、技术标签
 *
 * 末尾有一张虚线"占位卡片"，提示未来还有更多项目。
 *
 * 如需添加新项目：在 PROJECTS 数组末尾追加新对象（格式见现有条目）。
 */

'use client';

import { useLang } from '@/context/LangContext';

/**
 * 项目数据配置
 * emoji       卡片顶部的装饰图标
 * date        项目时间范围
 * nameZh/En   项目名称（中/英）
 * companyZh/En 归属机构（中/英）
 * bullets     项目要点列表，每项含 zh 和 en
 * tags        用到的技术栈标签
 */
const PROJECTS = [
  {
    emoji: '🎓',
    date: 'Sep. 2023 – Dec. 2023',
    nameZh: '学生管理平台',
    nameEn: 'Student Management Platform',
    companyZh: '高校项目 @ 北京',
    companyEn: 'University Project @ Beijing',
    bullets: [
      {
        zh: '基于 Spring Boot、Thymeleaf 和 MySQL 设计并开发类 Brightspace 系统，定制化仪表盘，上手时间缩短 30%。',
        en: 'Built a Brightspace-like platform with Spring Boot, Thymeleaf, and MySQL — reduced onboarding time by 30%.',
      },
      {
        zh: '集成阿里云 OSS 文件存储及在线批改功能，批改效率提升约 35%。',
        en: 'Integrated Alibaba Cloud OSS for file storage and built-in grading — improved grading efficiency by ~35%.',
      },
      {
        zh: '基于 Redis 和 RabbitMQ 实现实时通知系统，支持成绩、截止时间及反馈的即时推送。',
        en: 'Implemented real-time notifications with Redis and RabbitMQ for grades, deadlines, and feedback.',
      },
      {
        zh: '采用 Docker Compose、Nginx 及 GitLab CI 优化部署，环境搭建时间缩短约 40%。',
        en: 'Streamlined deployment with Docker Compose, Nginx, and GitLab CI — reducing setup time by ~40%.',
      },
    ],
    tags: ['Spring Boot', 'MySQL', 'Redis', 'RabbitMQ', 'Docker', 'GitLab CI'],
  },
];

export default function Projects() {
  const { t } = useLang();

  return (
    <section id="projects" style={{ padding: 0 }}>
      <div className="section-wrap">

        {/* 区块标题 */}
        <div className="reveal">
          <p className="section-label">{t('项目经验', 'Projects')}</p>
          <h2 className="section-title">{t('专业项目', 'Professional Projects')}</h2>
        </div>

        {/* 项目卡片网格：auto-fit + minmax(300px, 1fr) */}
        <div className="proj-grid">
          {PROJECTS.map((p) => (
            <div className="proj-card reveal" key={p.nameEn}>

              {/* 卡片顶部：emoji 图标（左）+ 日期徽章（右） */}
              <div className="proj-head">
                <div className="proj-emoji">{p.emoji}</div>
                <div className="proj-date-badge">{p.date}</div>
              </div>

              {/* 项目名称 */}
              <div className="proj-name">{t(p.nameZh, p.nameEn)}</div>
              {/* 归属机构 */}
              <div className="proj-company">{t(p.companyZh, p.companyEn)}</div>

              {/* 项目要点列表（flex:1 让卡片内容区撑满，保持底部标签对齐） */}
              <ul className="proj-list">
                {p.bullets.map((b, i) => (
                  <li key={i}>{t(b.zh, b.en)}</li>
                ))}
              </ul>

              {/* 技术标签 */}
              <div className="proj-tags">
                {p.tags.map((tag) => (
                  <span className="tag" key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          ))}

          {/* 占位卡片：虚线边框，提示"更多项目即将到来" */}
          <div className="proj-card dashed reveal">
            <div style={{ fontSize: '2.2rem' }}>🚀</div>
            <div style={{ color: 'var(--text3)', fontSize: '0.88rem', lineHeight: 1.8 }}>
              {t('更多项目正在进行中…', 'More projects in progress…')}
              <br />
              {t('敬请期待', 'Stay tuned')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
