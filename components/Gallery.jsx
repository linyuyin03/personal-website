/**
 * components/Gallery.jsx — 照片相册区域
 *
 * 功能：
 *  1. 马赛克网格布局（3 列，部分图片占 2 行或 2 列）
 *  2. 灯箱（Lightbox）：点击图片全屏预览，支持 ESC 键关闭
 *  3. 图片加载失败时显示 emoji 占位符，不影响整体布局
 *  4. 图片 hover 时显示渐变遮罩 + 说明文字
 *
 * 照片文件放置：将图片放到 public/ 目录即可
 *  public/avatar.jpg   → 职业照（显示在相册左侧大图位置）
 *  public/photo1.jpg   → 生活照 1
 *  public/photo2.jpg   → 生活照 2
 *  public/photo3.jpg   → 生活照 3（宽图，占 2 列）
 *  public/photo4.jpg   → 生活照 4
 *  public/photo5.jpg   → 生活照 5
 */

'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useLang } from '@/context/LangContext';

/**
 * 照片配置列表
 * src        图片路径（相对于 public/）
 * captionZh/En 图片说明（悬停时显示）
 * cls        CSS 附加类名：'tall'（占 2 行）| 'wide'（占 2 列）| ''（标准）
 */
const PHOTOS = [
  { src: '/avatar.jpg', captionZh: '职业照',  captionEn: 'Professional Photo', cls: 'tall' },
  { src: '/photo1.jpg', captionZh: '生活照 1', captionEn: 'Photo 1',            cls: ''     },
  { src: '/photo2.jpg', captionZh: '生活照 2', captionEn: 'Photo 2',            cls: ''     },
  { src: '/photo3.jpg', captionZh: '生活照 3', captionEn: 'Photo 3',            cls: 'wide' },
  { src: '/photo4.jpg', captionZh: '生活照 4', captionEn: 'Photo 4',            cls: ''     },
  { src: '/photo5.jpg', captionZh: '生活照 5', captionEn: 'Photo 5',            cls: ''     },
];

// 图片加载失败时显示的 emoji 占位符（与 PHOTOS 顺序对应）
const FALLBACK_EMOJIS = ['📷', '🌸', '🏙️', '🌅', '✈️', '🎓'];

export default function Gallery() {
  const { t } = useLang();

  // lightbox：当前灯箱显示的图片 src，null 表示关闭
  const [lightbox, setLightbox] = useState(null);
  // errors：记录哪些图片加载失败（key = src，value = true）
  const [errors, setErrors]     = useState({});

  // 监听键盘 ESC 键，关闭灯箱
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // 灯箱打开时锁定页面滚动，关闭时恢复
  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
  }, [lightbox]);

  // 标记某张图片加载失败，触发 fallback emoji 渲染
  const markError = (src) => setErrors((prev) => ({ ...prev, [src]: true }));

  return (
    <>
      {/* ── 灯箱遮罩层 ── */}
      {/* 点击背景关闭；lightbox.open class 通过 CSS transition 控制淡入淡出 */}
      <div
        className={`lightbox${lightbox ? ' open' : ''}`}
        onClick={() => setLightbox(null)}
      >
        {/* 关闭按钮（右上角） */}
        <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>

        {/* 全屏预览图片：点击图片本身不关闭灯箱（stopPropagation） */}
        {lightbox && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={lightbox} alt="preview" onClick={(e) => e.stopPropagation()} />
        )}
      </div>

      {/* ── 相册区域 ── */}
      {/* gallery-section-bg 给整个区域添加深色背景和上下边框，与其他 section 区分 */}
      <section id="gallery" className="gallery-section-bg">
        <div className="section-wrap" style={{ paddingTop: 88, paddingBottom: 88 }}>

          {/* 区块标题 */}
          <div className="reveal">
            <p className="section-label">{t('生活点滴', 'Life & Moments')}</p>
            <h2 className="section-title">{t('相册', 'Gallery')}</h2>
          </div>

          {/* 瀑布流布局：CSS columns 自动适应每张图片原始高度 */}
          <div className="photo-masonry reveal">
            {PHOTOS.map((photo, i) => (
              <div
                key={photo.src}
                className="photo-item"
                onClick={() => !errors[photo.src] && setLightbox(photo.src)}
              >
                {errors[photo.src] ? (
                  <div className="photo-placeholder">
                    <span style={{ fontSize: '2rem' }}>{FALLBACK_EMOJIS[i]}</span>
                    <span style={{ fontSize: '0.72rem' }}>{photo.src.replace('/', '')}</span>
                  </div>
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={photo.src}
                    alt={t(photo.captionZh, photo.captionEn)}
                    onError={() => markError(photo.src)}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                )}
                {!errors[photo.src] && (
                  <div className="photo-overlay">
                    <span className="photo-caption">{t(photo.captionZh, photo.captionEn)}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
