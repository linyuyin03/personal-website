# 林雨音 | Yuyin Lin — 个人网站 / Personal Portfolio

基于 **Next.js 14 (App Router)** 构建的个人作品集网站，支持中英文一键切换，包含教育背景、技能、实习经历、项目展示与照片相册。

A personal portfolio website built with **Next.js 14 (App Router)**, featuring bilingual (Chinese/English) toggle, education, skills, internship experience, project showcase, and a photo gallery.

---

## 技术栈 / Tech Stack

| 类别 | 技术 |
|------|------|
| 框架 | [Next.js 14](https://nextjs.org/) (App Router) |
| UI | React 18 + 纯 CSS (globals.css) |
| 语言切换 | React Context API (`LangContext`) |
| 图片优化 | Next.js `<Image />` 组件 |
| 动画 | CSS transitions + IntersectionObserver (scroll reveal) |
| 部署 | [Vercel](https://vercel.com/)（推荐）|

**依赖包（仅 3 个）：**
```
next        框架本体
react       UI 库
react-dom   DOM 渲染
```

---

## 项目结构 / Project Structure

```
f:/File/
│
├── app/                        # Next.js App Router 核心目录
│   ├── layout.js               # 根布局：HTML 结构、<head> meta、字体引入
│   ├── page.js                 # 主页面：组合所有 Section 组件
│   └── globals.css             # 全局 CSS 样式（变量、动画、组件样式）
│
├── components/                 # 页面各区块的 React 组件
│   ├── Nav.jsx                 # 顶部固定导航栏（含语言切换按钮）
│   ├── Hero.jsx                # 首屏：头像、姓名、简介、快速链接
│   ├── About.jsx               # 教育背景 + 数据统计卡片
│   ├── Skills.jsx              # 技能分类标签展示
│   ├── Experience.jsx          # 实习经历时间线
│   ├── Projects.jsx            # 专业项目卡片
│   ├── Gallery.jsx             # 照片相册 + 灯箱预览
│   ├── Contact.jsx             # 联系方式区域
│   └── ScrollReveal.jsx        # 滚动入场动画挂载器（IntersectionObserver）
│
├── context/
│   └── LangContext.jsx         # 全局语言状态（zh/en），提供 t() 翻译函数
│
├── public/                     # 静态资源目录（直接通过 / 路径访问）
│   ├── avatar.jpg              # ← 放入你的职业照
│   ├── photo1.jpg              # ← 放入生活照 1
│   ├── photo2.jpg              # ← 放入生活照 2
│   ├── photo3.jpg              # ← 放入生活照 3
│   ├── photo4.jpg              # ← 放入生活照 4
│   └── photo5.jpg              # ← 放入生活照 5
│
├── package.json                # 项目依赖与脚本
├── next.config.mjs             # Next.js 配置
├── jsconfig.json               # 路径别名配置（@/ → 项目根目录）
└── .gitignore                  # Git 忽略规则
```

---

## 快速开始 / Quick Start

### 1. 安装依赖

```bash
cd "f:/File"
npm install
```

> 首次执行会生成 `node_modules/` 文件夹（约 200MB），之后无需重复执行。

### 2. 启动开发服务器

```bash
npm run dev
```

打开浏览器访问 → **http://localhost:3000**

热更新已启用，修改代码后页面自动刷新。

### 3. 放入照片

将图片文件复制到 `public/` 目录：

```
public/
├── avatar.jpg      职业照（显示在 Hero 区域的头像）
├── photo1.jpg      生活照（显示在 Gallery 区域）
├── photo2.jpg
├── photo3.jpg
├── photo4.jpg
└── photo5.jpg
```

> 图片缺失时网站不会报错，会显示 emoji 占位符。

### 4. 构建生产版本

```bash
npm run build    # 编译优化
npm run start    # 运行生产服务器（本地测试用）
```

---

## 部署 / Deployment

### 方式一：Vercel（推荐，免费）

```bash
# 全局安装 Vercel CLI
npm i -g vercel

# 在项目目录执行，按提示操作
vercel
```

或通过 GitHub 自动部署：
1. 将代码推送到 GitHub 仓库
2. 登录 [vercel.com](https://vercel.com) → **Add New Project** → 选择仓库
3. 点击 **Deploy**，完成后获得公网 URL

每次 `git push` 会自动触发重新部署。

### 方式二：Netlify

```bash
npm run build   # 生成 .next/ 目录
# 在 netlify.com 拖拽上传 .next/ 文件夹
```

### 方式三：静态导出（纯 HTML，无需服务器）

在 `next.config.mjs` 中添加 `output: 'export'`，然后：

```bash
npm run build
# 生成 out/ 文件夹，直接部署到任意静态托管服务
# （GitHub Pages、Cloudflare Pages 等）
```

---

## 语言切换机制 / Bilingual System

语言状态由 `context/LangContext.jsx` 统一管理：

```
LangProvider（在 page.js 包裹全部组件）
  └── lang 状态：'zh' | 'en'
  └── toggle()：切换语言
  └── t(zh, en)：根据当前语言返回对应文字
```

各组件通过 `useLang()` Hook 消费上下文：

```jsx
const { t } = useLang();
// t('中文内容', 'English content') 根据当前语言返回对应字符串
```

---

## 如何添加新内容 / How to Add Content

### 添加新实习经历

打开 [components/Experience.jsx](components/Experience.jsx)，在 `JOBS` 数组中追加一个对象：

```jsx
{
  date: 'Jun. 2026 – Aug. 2026',
  titleZh: '软件工程师实习生',
  titleEn: 'Software Engineer Intern',
  companyZh: '@ 公司名称，城市',
  companyEn: '@ Company Name, City',
  bullets: [
    { zh: '中文描述...', en: 'English description...' },
  ],
  tags: ['React', 'Node.js'],
}
```

### 添加新项目

打开 [components/Projects.jsx](components/Projects.jsx)，在 `PROJECTS` 数组中追加对象（格式同上）。

### 修改个人信息

Hero 区域文字在 [components/Hero.jsx](components/Hero.jsx) 中修改。
联系方式链接在 [components/Contact.jsx](components/Contact.jsx) 中修改。

---

## 开发命令 / Scripts

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器（localhost:3000） |
| `npm run build` | 生产构建 |
| `npm run start` | 启动生产服务器（需先 build） |
| `npm run lint` | ESLint 代码检查 |
