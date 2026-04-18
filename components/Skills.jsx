/**
 * components/Skills.jsx — 技能展示区域
 *
 * 将技能按类别分组，以卡片 + 标签（tag）形式展示。
 * 布局：CSS Grid，自适应 2~4 列（取决于屏幕宽度）。
 *
 * 如需添加新技能：在 SKILL_GROUPS 对应分组的 tags 数组中追加字符串即可。
 * 如需添加新分类：在 SKILL_GROUPS 数组末尾添加一个新对象。
 */

'use client';

import { useLang } from '@/context/LangContext';

/**
 * 技能分组配置
 * icon：emoji 图标
 * iconBg：图标背景色（半透明色块）
 * zh/en：分组标题
 * tags：该分类下的技术标签列表
 */
const SKILL_GROUPS = [
  {
    icon: '💻',
    iconBg: 'rgba(124,106,255,.15)', // 紫色调
    zh: '编程语言',
    en: 'Languages',
    tags: ['Python', 'Java', 'JavaScript', 'TypeScript', 'Go', 'C/C++', 'SQL', 'HTML/CSS', 'Shell', 'PHP', 'MATLAB', 'LaTeX'],
  },
  {
    icon: '⚡',
    iconBg: 'rgba(56,189,248,.15)', // 蓝色调
    zh: '开发框架',
    en: 'Frameworks',
    tags: ['React', 'Next.js', 'Vue.js', 'Node.js', 'Django', 'Flask', 'FastAPI', 'Spring Boot', 'LangChain', 'PyTorch', 'TensorFlow', 'Pandas'],
  },
  {
    icon: '🗄️',
    iconBg: 'rgba(74,222,128,.15)', // 绿色调
    zh: '数据库 / 中间件',
    en: 'Database / Middleware',
    tags: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Milvus', 'DynamoDB', 'Firebase', 'RocketMQ', 'MinIO', 'RabbitMQ'],
  },
  {
    icon: '☁️',
    iconBg: 'rgba(251,146,60,.15)', // 橙色调
    zh: '工具 / 云平台',
    en: 'Tools / Cloud',
    tags: ['Docker', 'Kubernetes', 'AWS', 'Azure', 'Git', 'CI/CD', 'Nginx', 'Jenkins', 'Prometheus', 'Grafana', 'OpenCV', 'Figma'],
  },
];

export default function Skills() {
  const { t } = useLang();

  return (
    <section id="skills" style={{ padding: 0 }}>
      <div className="section-wrap">

        {/* 区块标题 */}
        <div className="reveal">
          <p className="section-label">{t('技能栈', 'Tech Stack')}</p>
          <h2 className="section-title">{t('专业技能', 'Technical Skills')}</h2>
        </div>

        {/* 技能卡片 Grid：auto-fit + minmax(250px, 1fr) 实现自适应列数 */}
        <div className="skills-grid">
          {SKILL_GROUPS.map((g) => (
            // 每张卡片在进入视口时触发 reveal 动画
            <div className="skill-card reveal" key={g.en}>

              {/* 卡片顶部：图标 + 分组标题 */}
              <div className="skill-icon-row">
                <div className="skill-icon" style={{ background: g.iconBg }}>
                  {g.icon}
                </div>
                <div className="skill-name">{t(g.zh, g.en)}</div>
              </div>

              {/* 技术标签列表：flex-wrap 自动换行 */}
              <div className="tags">
                {g.tags.map((tag) => (
                  // 每个技术名称渲染为一个 tag 徽章
                  <span className="tag" key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
