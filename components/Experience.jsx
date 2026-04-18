/**
 * components/Experience.jsx — 实习经历区域
 *
 * 以垂直时间线形式展示工作经历，从新到旧排列。
 * 每条经历包含：职位名称、日期、公司、职责要点列表、技术标签。
 *
 * 如需添加新实习经历：在 JOBS 数组头部插入新对象（保持时间倒序）。
 * 字段说明见下方 JOBS 注释。
 */

'use client';

import { useLang } from '@/context/LangContext';

/**
 * 实习经历数据
 * 每个对象代表一段工作经历，字段含义：
 *  date        显示的时间范围字符串
 *  titleZh/En  职位名称（中/英）
 *  companyZh/En 公司名称（中/英）
 *  bullets     职责要点列表，每项含 zh（中文）和 en（英文）
 *  tags        使用的技术标签
 */
const JOBS = [
  {
    date: 'Jun. 2025 – Aug. 2025',
    titleZh: '软件工程师实习生',
    titleEn: 'Software Engineer Intern',
    companyZh: '@ 北京云测信息技术有限公司，北京',
    companyEn: '@ Beijing Testin Information Technology, Beijing',
    bullets: [
      {
        zh: '负责全栈 RAG 系统架构设计与开发，基于 React、FastAPI 与 Kubernetes 集成自定义知识库智能问答功能，检索准确率提升 19.6%，系统扩展性显著增强。',
        en: 'Architected a full-stack RAG system with React, FastAPI, and Kubernetes, integrating a chatbot with a customizable knowledge base — improved retrieval accuracy by 19.6%.',
      },
      {
        zh: '基于 LangChain 与 vLLM 实现智能对话模块，支持多模型编排与 WebSocket 流式响应，响应延迟降低 24.5%。',
        en: 'Built an intelligent chatbot with LangChain and vLLM, enabling model orchestration and WebSocket streaming — reduced response latency by 24.5%.',
      },
      {
        zh: '搭建知识库处理链路，整合 Redis、MinIO、PostgreSQL、Milvus 与 Elasticsearch，数据集处理灵活性提升 42.3%，查询速度提升 27.8%。',
        en: 'Implemented a knowledge base pipeline with Redis, MinIO, PostgreSQL, Milvus, and Elasticsearch — increased dataset flexibility by 42.3% and boosted query speed by 27.8%.',
      },
      {
        zh: '使用 React、Next.js、Redux 与 Docker 开发前端模块，用户上手时间缩短 23.7%，参与度提升 31.4%。',
        en: 'Delivered user-facing modules with React, Next.js, Redux, and Docker — reduced onboarding time by 23.7% and improved user engagement by 31.4%.',
      },
      {
        zh: '基于 Docker 与 Kubernetes 在阿里云 ACK 上完成系统部署，系统可用性达 99.9%，部署周期缩短 19.5%，稳定支撑 3 倍流量峰值。',
        en: 'Deployed on Alibaba Cloud ACK with Docker and Kubernetes — ensured 99.9% uptime, reduced deployment cycles by 19.5%, and sustained triple traffic spikes.',
      },
    ],
    tags: ['React', 'FastAPI', 'LangChain', 'vLLM', 'Kubernetes', 'Milvus', 'Elasticsearch', 'Docker', 'Next.js'],
  },
  {
    date: 'Jun. 2024 – Aug. 2024',
    titleZh: '软件工程师实习生',
    titleEn: 'Software Engineer Intern',
    companyZh: '@ 北京东方道迩信息技术有限公司，北京',
    companyEn: '@ Eastdawn Information Technology, Beijing',
    bullets: [
      {
        zh: '参与协同办公 Web 平台开发，基于 Vue.js、Django、WebSocket 与 Docker，支持 5,000+ 并发用户，客户端渲染延迟降低 30%。',
        en: 'Developed a collaborative web platform with Vue.js, Django, WebSocket, and Docker — supported 5,000+ concurrent users and reduced client-side rendering latency by 30%.',
      },
      {
        zh: '设计协作流程与核心模块，涵盖任务管理、权限控制与实时数据看板，跨团队协作效率提升 35%。',
        en: 'Designed collaboration workflows with task management, access control, and real-time dashboards — improved cross-team efficiency by 35%.',
      },
      {
        zh: '整合 Django、Redis、WebSocket 与 MongoDB，支持 200ms 内实时更新与高效缓存，系统响应性与稳定性显著提升。',
        en: 'Integrated Django, Redis, WebSocket, and MongoDB — supporting real-time updates within 200ms with boosted responsiveness and reliability.',
      },
      {
        zh: '基于 Vue.js、Vuex 与 Element Plus 开发交互模块，实现安全认证与实时数据可视化，提升用户体验。',
        en: 'Built interactive modules with Vue.js, Vuex, and Element Plus — delivering secure authentication and real-time data visualization.',
      },
      {
        zh: '搭建可观测性体系，集成 Prometheus、Grafana 与 ELK，MTTR 降低 28%，高峰 P95 延迟降低 22%。',
        en: 'Established observability with Prometheus, Grafana, and ELK — reduced MTTR by 28% and cut P95 latency by 22% under peak load.',
      },
    ],
    tags: ['Vue.js', 'Django', 'WebSocket', 'MongoDB', 'Redis', 'Prometheus', 'Grafana', 'ELK'],
  },
];

export default function Experience() {
  const { t } = useLang();

  return (
    <section id="experience" style={{ padding: 0 }}>
      <div className="section-wrap">

        {/* 区块标题 */}
        <div className="reveal">
          <p className="section-label">{t('工作经历', 'Work Experience')}</p>
          <h2 className="section-title">{t('实习经历', 'Internship Experience')}</h2>
        </div>

        {/* 时间线容器：CSS 伪元素 ::before 绘制左侧渐变竖线 */}
        <div className="exp-timeline">
          {JOBS.map((job) => (
            <div className="exp-item reveal" key={job.date}>

              {/* 时间线圆点：absolute 定位，覆盖在竖线上 */}
              <div className="exp-dot" />

              <div className="exp-card">
                {/* 卡片顶部：职位名称（左）+ 时间范围（右） */}
                <div className="exp-header">
                  <div className="exp-title">{t(job.titleZh, job.titleEn)}</div>
                  <div className="exp-date">{job.date}</div>
                </div>

                {/* 公司名称 */}
                <div className="exp-company">{t(job.companyZh, job.companyEn)}</div>

                {/* 职责要点列表：每项以 ▸ 符号开头（CSS ::before） */}
                <ul className="exp-list">
                  {job.bullets.map((b, i) => (
                    <li key={i}>{t(b.zh, b.en)}</li>
                  ))}
                </ul>

                {/* 技术标签 */}
                <div className="exp-tags">
                  {job.tags.map((tag) => (
                    <span className="tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
