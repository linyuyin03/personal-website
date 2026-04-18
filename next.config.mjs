/**
 * next.config.mjs — Next.js 项目配置
 *
 * 常用配置项说明：
 *  - images.unoptimized: true
 *      关闭 Next.js 内置的图片优化 API（需要服务端支持）。
 *      如果你将项目导出为纯静态文件（next export / output: 'export'），
 *      必须设置此项，否则 <Image> 组件会报错。
 *      代价：不会自动转 WebP / 按需裁剪尺寸，但 Vercel 部署时可去掉此配置以享受图片优化。
 *
 * 如需开启静态导出（生成纯 HTML，无需 Node 服务器），取消下面的注释：
 *   output: 'export',
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 允许 <Image> 组件在没有图片优化服务的环境下正常运行
    unoptimized: true,
  },

  // 开启后 `npm run build` 会在 out/ 目录生成纯静态 HTML，
  // 可部署到 GitHub Pages、Cloudflare Pages 等静态托管服务。
  // output: 'export',
};

export default nextConfig;
