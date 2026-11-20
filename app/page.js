"use client";
import { useState, useEffect, useMemo } from "react";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
const ADMIN_EMAIL = "run4ravish@gmail.com";
/* ============================================================
   DATA
============================================================ */
const DEFAULT_PRODUCTS = [
  { id: "c09fbc05-5369-48c8-9c3c-b47cde236c7b", title: "Wireless Bluetooth Earbuds", slug: "wireless-bluetooth-earbuds", price: 999, mrp: 2999, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800", category: "Electronics", rating: "4.5", affiliate_url: "https://www.amazon.in/dp/B0CXYZ123", is_active: true },
  { id: "39e156f9-cb62-46c5-b622-8b81d2bcd23b", title: "Smart Watch with Fitness Tracker", slug: "smart-watch-fitness", price: 1499, mrp: 4999, image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800", category: "Electronics", rating: "4.4", affiliate_url: "https://www.amazon.in/dp/B0CXYZ124", is_active: true },
  { id: "6692f0fe-297a-42c5-9894-3c0dc4c39461", title: "Men Casual Shirt", slug: "men-casual-shirt", price: 599, mrp: 1499, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800", category: "Fashion", rating: "4.3", affiliate_url: "https://www.amazon.in/dp/B0CXYZ125", is_active: true },
  { id: "ec17db71-6365-4040-b2cb-30cadcdf9aa4", title: "Women Kurti Set", slug: "women-kurti-set", price: 799, mrp: 1999, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800", category: "Fashion", rating: "4.6", affiliate_url: "https://www.amazon.in/dp/B0CXYZ126", is_active: true },
  { id: "b8015a8c-e213-4019-befa-1727cbfe866b", title: "Stainless Steel Water Bottle 1L", slug: "steel-water-bottle-1l", price: 499, mrp: 999, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800", category: "Home", rating: "4.5", affiliate_url: "https://www.amazon.in/dp/B0CXYZ127", is_active: true },
];

const CATEGORIES = [
  { name: "All", icon: "🏷️" },
  { name: "Mobiles", icon: "📱" },
  { name: "Fashion", icon: "👗" },
  { name: "Electronics", icon: "💻" },
  { name: "Home", icon: "🏠" },
  { name: "Beauty", icon: "💄" },
];

const SLIDES = [
  { title: "Big Saving Days Are Live!", sub: "Up to 80% Off + Extra Discount on Top Brands", cta: "Shop Now", emoji: "🛍️", bg: "linear-gradient(135deg,#4f46e5 0%,#7c3aed 50%,#ec4899 100%)" },
  { title: "Electronics Mega Sale", sub: "Earbuds, Watches, Speakers — Starting ₹499 Only", cta: "Grab Deal", emoji: "🎧", bg: "linear-gradient(135deg,#0ea5e9 0%,#6366f1 50%,#a855f7 100%)" },
  { title: "Fashion Fest is Here", sub: "Flat 70% Off on Kurtis, Shirts & Shoes", cta: "Explore", emoji: "👟", bg: "linear-gradient(135deg,#f97316 0%,#fb7185 50%,#ec4899 100%)" },
];

const PAGES = {
  about: { title: "About Us", body: "BAZARU is India's fastest growing deals discovery platform. We find the best deals, loot offers and discounts from top stores like Amazon, Flipkart, Myntra and more, and bring them to you in one place.\n\nOur mission is simple: Help every Indian save money on every online purchase. We are a team based in Uttar Pradesh, India, working daily to find verified and latest offers for you." },
  contact: { title: "Contact Us", body: "We would love to hear from you!\n\nEmail: support@bazaru.in\nWhatsApp: +91 90000 00000\nAddress: Domariaganj, Uttar Pradesh, India - 272189\n\nWorking Hours: Monday to Saturday, 10 AM to 7 PM\nWe reply within 24 hours." },
  privacy: { title: "Privacy Policy", body: "1. We respect your privacy. We do not sell your personal data.\n2. When you login, we only store your email in your browser (localStorage).\n3. We use cookies to remember your cart and wishlist.\n4. When you click BUY NOW, you go to a third-party partner site (EarnKaro / Amazon / Flipkart). Their privacy policy will apply there.\n5. We may show ads from Google AdSense in future.\n6. If you have any question, contact support@bazaru.in" },
  terms: { title: "Terms & Conditions", body: "1. BAZARU is a deals discovery website, not a seller.\n2. All prices shown are from partner websites and may change anytime.\n3. Product delivery, return and refund are handled by the partner seller, not by BAZARU.\n4. By using this site, you agree to our terms.\n5. We can change deals anytime without notice." },
  disclaimer: { title: "Disclaimer & Affiliate Disclosure", body: "IMPORTANT - PLEASE READ:\n\nBAZARU is an affiliate website. When you click on BUY NOW, you may be redirected to a third-party website like EarnKaro, Amazon or Flipkart.\n\nWe may earn a small commission if you buy from that link, at NO extra cost to you. This helps us keep BAZARU free.\n\nWe do not own the products, we do not deliver them, and we are not responsible for product quality, delivery delay, return or refund. Please check price and details on the seller website before buying.\n\nAll trademarks belong to their respective owners." },
  refund: { title: "Refund & Return Policy", body: "Since BAZARU does not sell products directly, we do not process refunds.\n\nIf you bought a product via our link and want to return / refund it, please contact the seller directly (Amazon / Flipkart / Myntra) from your Orders page.\n\nIf you face any issue with a deal link, email us at support@bazaru.in and we will help you." },
  shipping: { title: "Shipping Policy", body: "BAZARU does not ship products. Shipping is done by the partner store where you buy.\n\nDelivery time, shipping charges and tracking will be shown on the partner website at checkout.\n\nMost partners offer Free Delivery above ₹499." },
};

const getReviews = (id) => {
  let h = 0;
  for (let i = 0; i < String(id).length; i++) h = (h * 31 + String(id).charCodeAt(i)) >>> 0;
  return 500 + (h % 15000);
};

/* ============================================================
   GLOBAL CSS
============================================================ */
const CSS = `
.bz-app{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background:#f1f3f6;color:#0f172a;min-height:100vh;display:flex;flex-direction:column;overflow-x:hidden;-webkit-font-smoothing:antialiased;scroll-behavior:smooth}
.bz-app *,.bz-app *::before,.bz-app *::after{box-sizing:border-box;margin:0;padding:0}
.bz-app button{font-family:inherit;cursor:pointer;background:none;border:none;color:inherit}
.bz-app a{color:inherit;text-decoration:none}
.bz-app input,.bz-app select{font-family:inherit}

@keyframes bzFade{from{opacity:0}to{opacity:1}}
@keyframes bzUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
@keyframes bzPop{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}
@keyframes bzSlideL{from{transform:translateX(-100%)}to{transform:translateX(0)}}
@keyframes bzSlideR{from{transform:translateX(100%)}to{transform:translateX(0)}}
@keyframes bzFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
@keyframes bzGrad{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes bzToast{from{opacity:0;transform:translate(-50%,22px)}to{opacity:1;transform:translate(-50%,0)}}
@keyframes bzShine{0%{background-position:0% 50%}100%{background-position:300% 50%}}
@keyframes bzPulseGlow{0%,100%{filter:drop-shadow(0 2px 8px rgba(251,191,36,.6))}50%{filter:drop-shadow(0 2px 14px rgba(236,72,153,.7))}}
@keyframes bzSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}

.bz-header{position:sticky;top:0;z-index:120;background:linear-gradient(135deg,#4338ca 0%,#7c3aed 45%,#db2777 100%);color:#fff;box-shadow:0 8px 28px rgba(124,58,237,.4)}
.bz-topstrip{background:linear-gradient(90deg,#1e1b4b,#6d28d9,#db2777);color:#f5d0fe;font-size:11.5px;display:flex;justify-content:space-between;gap:10px;padding:6px 18px;flex-wrap:wrap}
.bz-topstrip b{color:#fde047}
.bz-header-inner{max-width:1280px;margin:0 auto;display:flex;align-items:center;gap:12px;padding:12px 18px}
.bz-logo{cursor:pointer;user-select:none;line-height:1;display:flex;flex-direction:column;flex-shrink:0}
.bz-logo b.bz-logo-text{font-size:28px;font-weight:900;font-style:italic;letter-spacing:1.2px;background:linear-gradient(120deg,#fde047 0%,#fbbf24 25%,#fb923c 50%,#f472b6 75%,#fde047 100%);background-size:300% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;animation:bzShine 4s linear infinite,bzPulseGlow 3s ease-in-out infinite;line-height:1}
.bz-logo span{font-size:10px;color:#fde047;font-style:italic;margin-top:3px;font-weight:700;letter-spacing:.5px}

.bz-search{display:flex;align-items:center;background:#fff;border-radius:12px;overflow:hidden;flex:1;max-width:620px;box-shadow:0 4px 16px rgba(0,0,0,.18);transition:.25s}
.bz-search:focus-within{box-shadow:0 0 0 3px rgba(253,224,71,.6)}
.bz-search input{flex:1;border:0;outline:0;padding:11px 14px;font-size:14px;color:#0f172a;background:transparent;min-width:0}
.bz-search-btn{background:linear-gradient(135deg,#fbbf24,#f97316);border:0;color:#fff;padding:0 18px;align-self:stretch;font-size:16px;display:flex;align-items:center;transition:.2s}
.bz-search-btn:hover{filter:brightness(1.1)}
.bz-header-actions{display:flex;gap:8px;margin-left:auto;flex-shrink:0}
.bz-icon-btn{position:relative;display:flex;align-items:center;gap:6px;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.22);color:#fff;padding:9px 12px;border-radius:11px;font-size:13px;font-weight:700;transition:.22s;white-space:nowrap}
.bz-icon-btn:hover{background:rgba(255,255,255,.3);transform:translateY(-2px);box-shadow:0 6px 16px rgba(0,0,0,.22)}
.bz-badge{position:absolute;top:-6px;right:-6px;background:linear-gradient(135deg,#fb923c,#ea580c);color:#fff;font-size:10px;min-width:19px;height:19px;border-radius:10px;display:flex;align-items:center;justify-content:center;padding:0 4px;font-weight:800;box-shadow:0 3px 8px rgba(234,88,12,.55);animation:bzPop .25s ease}
.bz-hamburger{display:none;width:42px;height:42px;border-radius:11px;background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.22);color:#fff;font-size:19px;align-items:center;justify-content:center;transition:.2s;flex-shrink:0}
.bz-hamburger:hover{background:rgba(255,255,255,.34);transform:scale(1.05)}
.bz-mobile-search{display:none;max-width:none;margin:0 16px 12px}

.bz-catbar{background:#fff;border-bottom:1px solid #e2e8f0;box-shadow:0 2px 12px rgba(15,23,42,.05)}
.bz-catbar-inner{max-width:1280px;margin:0 auto;display:flex;gap:8px;padding:10px 18px;overflow-x:auto;scrollbar-width:none}
.bz-catbar-inner::-webkit-scrollbar{display:none}
.bz-chip{display:flex;align-items:center;gap:7px;padding:9px 16px;border-radius:999px;background:#f1f5f9;border:1px solid transparent;font-size:13px;font-weight:700;color:#334155;white-space:nowrap;transition:.22s}
.bz-chip:hover{background:#ede9fe;color:#6d28d9;transform:translateY(-2px)}
.bz-chip.active{background:linear-gradient(135deg,#6366f1,#a855f7);color:#fff;box-shadow:0 6px 18px rgba(168,85,247,.42)}

.bz-main{flex:1;width:100%;max-width:1280px;margin:0 auto;padding:16px 18px 44px}
.bz-hero{position:relative;border-radius:20px;overflow:hidden;color:#fff;min-height:240px;display:flex;align-items:center;box-shadow:0 18px 44px rgba(124,58,237,.38);background-size:200% 200%;animation:bzGrad 9s ease infinite;transition:background-image .5s}
.bz-hero-content{padding:36px;max-width:640px;position:relative;z-index:2;animation:bzUp .5s ease both}
.bz-hero h1{font-size:34px;line-height:1.15;margin-bottom:10px;text-shadow:0 3px 16px rgba(0,0,0,.28);font-weight:800;letter-spacing:-.5px}
.bz-hero p{font-size:15px;opacity:.94;margin-bottom:20px}
.bz-hero-emoji{position:absolute;right:46px;top:50%;transform:translateY(-50%);font-size:126px;opacity:.92;animation:bzFloat 3.2s ease-in-out infinite;pointer-events:none;filter:drop-shadow(0 14px 30px rgba(0,0,0,.35))}
.bz-hero-dots{position:absolute;bottom:16px;left:38px;display:flex;gap:7px;z-index:3}
.bz-dot{width:9px;height:9px;border-radius:50%;background:rgba(255,255,255,.45);cursor:pointer;transition:.28s}
.bz-dot.active{width:28px;border-radius:999px;background:#fff}

.bz-section-head{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin:30px 0 16px}
.bz-section-head h2{font-size:21px;font-weight:800;letter-spacing:-.4px}
.bz-count{font-size:12.5px;color:#64748b;font-weight:600}
.bz-select{padding:9px 12px;border-radius:10px;border:1.5px solid #cbd5e1;background:#fff;font-size:13px;font-weight:700;color:#334155;outline:none;cursor:pointer;transition:.2s}
.bz-select:hover,.bz-select:focus{border-color:#a855f7;box-shadow:0 0 0 3px rgba(168,85,247,.15)}

.bz-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px}
.bz-card{background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e8ecf3;display:flex;flex-direction:column;transition:transform .32s cubic-bezier(.22,1,.36,1),box-shadow .32s,border-color .32s;animation:bzUp .5s ease both;position:relative}
.bz-card:hover{transform:translateY(-8px);box-shadow:0 20px 44px rgba(124,58,237,.18);border-color:#e9d5ff}
.bz-card-img{position:relative;cursor:pointer;background:#f1f5f9;overflow:hidden;line-height:0}
.bz-card-img img{transition:transform .4s cubic-bezier(.22,1,.36,1)}
.bz-card:hover .bz-card-img img{transform:scale(1.08)}
.bz-off{position:absolute;top:10px;left:10px;background:linear-gradient(135deg,#22c55e,#15803d);color:#fff;font-size:11px;font-weight:800;padding:4px 9px;border-radius:8px;box-shadow:0 4px 12px rgba(22,163,74,.42);z-index:3}
.bz-heart{position:absolute;top:10px;right:10px;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.94);border:1px solid #e2e8f0;display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 3px 10px rgba(15,23,42,.12);transition:.22s;z-index:3}
.bz-heart:hover{transform:scale(1.16);background:#fff}
.bz-heart.active{background:#fee2e2;border-color:#fecaca}
.bz-card-body{padding:12px 14px 14px;display:flex;flex-direction:column;gap:8px;flex:1}
.bz-card-title{font-size:13.5px;font-weight:700;line-height:1.35;color:#1e293b;min-height:38px;cursor:pointer;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;transition:.2s}
.bz-card-title:hover{color:#7c3aed}
.bz-rate{display:inline-flex;align-items:center;gap:3px;background:linear-gradient(135deg,#22c55e,#15803d);color:#fff;font-size:11px;font-weight:800;padding:3px 7px;border-radius:6px}
.bz-reviews{font-size:11.5px;color:#94a3b8;font-weight:600}
.bz-price{display:flex;align-items:baseline;gap:7px;flex-wrap:wrap}
.bz-price b{font-size:19px;font-weight:800;color:#0f172a}
.bz-price s{font-size:12.5px;color:#94a3b8;font-weight:500}
.bz-price em{font-size:12.5px;color:#16a34a;font-weight:800;font-style:normal}
.bz-card-actions{display:flex;gap:8px;margin-top:auto;padding-top:6px}
.bz-btn-cart{flex:1;padding:10px 6px;border-radius:10px;border:1.6px solid #f97316;background:#fff;color:#ea580c;font-size:12.5px;font-weight:800;transition:.22s;text-align:center}
.bz-btn-cart:hover{background:#fff7ed;transform:translateY(-2px);box-shadow:0 8px 16px rgba(249,115,22,.25)}
.bz-btn-buy{flex:1;padding:10px 6px;border-radius:10px;background:linear-gradient(135deg,#fb923c,#ea580c);color:#fff;font-size:12.5px;font-weight:800;transition:.22s;text-align:center}
.bz-btn-buy:hover{filter:brightness(1.08);transform:translateY(-2px);box-shadow:0 10px 20px rgba(234,88,12,.42)}

.bz-primary{background:linear-gradient(135deg,#6366f1,#a855f7);color:#fff;border:none;padding:12px 26px;border-radius:12px;font-weight:800;font-size:14px;transition:.22s;box-shadow:0 8px 22px rgba(168,85,247,.42)}
.bz-primary:hover{transform:translateY(-2px);box-shadow:0 14px 30px rgba(168,85,247,.55);filter:brightness(1.06)}
.bz-ghost{background:#f1f5f9;border:1px solid #e2e8f0;color:#475569;padding:11px 22px;border-radius:11px;font-weight:800;font-size:13px;transition:.2s}
.bz-ghost:hover{background:#e2e8f0;color:#0f172a}
.bz-input{width:100%;padding:12px 14px;border-radius:11px;border:1.5px solid #e2e8f0;font-size:14px;outline:none;transition:.2s;background:#f8fafc;color:#0f172a}
.bz-input:focus{border-color:#a855f7;background:#fff;box-shadow:0 0 0 3px rgba(168,85,247,.16)}

.bz-features{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin:32px 0 8px}
.bz-feature{display:flex;align-items:center;gap:13px;background:#fff;border:1px solid #e8ecf3;border-radius:14px;padding:16px 18px;transition:.25s}
.bz-feature:hover{transform:translateY(-4px);box-shadow:0 14px 32px rgba(124,58,237,.12);border-color:#e9d5ff}
.bz-feature-icon{font-size:26px}
.bz-feature b{display:block;font-size:13.5px;color:#0f172a}
.bz-feature small{font-size:11.5px;color:#94a3b8;font-weight:600}

.bz-overlay{position:fixed;inset:0;background:rgba(15,23,42,.55);backdrop-filter:blur(3px);z-index:190;animation:bzFade .25s ease}
.bz-drawer{position:fixed;top:0;bottom:0;left:0;width:305px;max-width:86vw;background:#fff;z-index:200;box-shadow:0 0 50px rgba(0,0,0,.3);animation:bzSlideL .32s cubic-bezier(.22,1,.36,1);display:flex;flex-direction:column;overflow-y:auto}
.bz-drawer.right{left:auto;right:0;width:410px;max-width:93vw;animation:bzSlideR .32s cubic-bezier(.22,1,.36,1)}
.bz-drawer-head{display:flex;align-items:center;justify-content:space-between;padding:18px 20px;background:linear-gradient(135deg,#4338ca,#7c3aed,#db2777);color:#fff;position:sticky;top:0;z-index:2}
.bz-drawer-head h3{font-size:16px;font-weight:800;display:flex;align-items:center;gap:8px}
.bz-close{width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.18);border:none;color:#fff;font-size:15px;display:flex;align-items:center;justify-content:center;transition:.25s}
.bz-close:hover{background:rgba(255,255,255,.38);transform:rotate(90deg)}
.bz-drawer-user{display:flex;align-items:center;gap:12px;padding:16px 20px;background:linear-gradient(135deg,#eef2ff,#f5f3ff);border-bottom:1px solid #e2e8f0}
.bz-avatar{width:46px;height:46px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#ec4899);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:18px;box-shadow:0 6px 18px rgba(236,72,153,.42);flex-shrink:0}
.bz-drawer-title{font-size:11px;font-weight:800;letter-spacing:1px;color:#94a3b8;padding:16px 20px 8px;text-transform:uppercase}
.bz-menu-link{display:flex;align-items:center;gap:12px;padding:13px 20px;font-size:14px;font-weight:700;color:#334155;border-bottom:1px solid #f1f5f9;transition:.22s;width:100%;text-align:left}
.bz-menu-link:hover{background:#f5f3ff;color:#6d28d9;padding-left:27px}

.bz-cart-item{display:flex;gap:12px;padding:14px 20px;border-bottom:1px solid #f1f5f9;animation:bzUp .3s ease both}
.bz-cart-thumb{width:62px;height:62px;border-radius:13px;background:linear-gradient(135deg,#eef2ff,#f5f3ff);overflow:hidden;flex-shrink:0}
.bz-cart-thumb img{width:100%;height:100%;object-fit:cover}
.bz-qty{display:flex;align-items:center;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;width:fit-content;margin-top:6px}
.bz-qty button{width:27px;height:27px;background:#f8fafc;border:none;font-size:14px;font-weight:800;color:#475569;transition:.15s}
.bz-qty button:hover{background:#ede9fe;color:#6d28d9}
.bz-qty span{width:34px;text-align:center;font-size:13px;font-weight:800}
.bz-cart-foot{padding:16px 20px;border-top:1px solid #e2e8f0;background:#fff;box-shadow:0 -8px 26px rgba(15,23,42,.07);position:sticky;bottom:0}
.bz-cart-row{display:flex;justify-content:space-between;font-size:13.5px;color:#475569;padding:4px 0;font-weight:600}
.bz-cart-row.bz-total{font-size:17px;font-weight:800;color:#0f172a;border-top:1px dashed #e2e8f0;margin-top:6px;padding-top:10px}
.bz-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:64px 20px;text-align:center;gap:6px}
.bz-empty div{font-size:56px;animation:bzFloat 3s ease-in-out infinite}
.bz-empty h4{font-size:16px;font-weight:800}
.bz-empty p{font-size:13px;color:#94a3b8;font-weight:600}
.bz-spinner{width:52px;height:52px;border-radius:50%;border:4px solid #e9d5ff;border-top-color:#a855f7;animation:bzSpin .8s linear infinite}

.bz-modal{position:fixed;inset:0;z-index:210;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(15,23,42,.6);backdrop-filter:blur(4px);animation:bzFade .2s ease}
.bz-modal-card{background:#fff;border-radius:18px;width:100%;max-width:560px;max-height:92vh;overflow-y:auto;box-shadow:0 30px 90px rgba(15,23,42,.4);animation:bzPop .3s cubic-bezier(.22,1,.36,1);position:relative}
.bz-modal-img{height:280px;background:#f1f5f9;overflow:hidden}
.bz-modal-img img{width:100%;height:100%;object-fit:cover;transition:transform .5s ease}
.bz-modal-img:hover img{transform:scale(1.06)}
.bz-modal-actions{display:flex;gap:10px}
.bz-modal-actions>*{flex:1}

.bz-toast{position:fixed;left:50%;bottom:26px;transform:translateX(-50%);z-index:300;background:#0f172a;color:#fff;padding:12px 20px;border-radius:12px;font-size:13.5px;font-weight:700;box-shadow:0 16px 44px rgba(15,23,42,.45);display:flex;align-items:center;gap:9px;animation:bzToast .3s cubic-bezier(.22,1,.36,1);max-width:92vw}
.bz-toast.success{background:linear-gradient(135deg,#16a34a,#15803d)}
.bz-toast.error{background:linear-gradient(135deg,#dc2626,#b91c1c)}

.bz-info{max-width:840px;margin:0 auto;background:#fff;border-radius:18px;padding:34px;box-shadow:0 14px 34px rgba(15,23,42,.07);animation:bzUp .35s ease both;border:1px solid #e8ecf3}
.bz-info h1{font-size:26px;margin-bottom:16px;background:linear-gradient(135deg,#4338ca,#a855f7,#db2777);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:800}
.bz-info p{white-space:pre-line;line-height:1.8;color:#334155;font-size:14px}
.bz-back{display:inline-flex;align-items:center;gap:6px;margin-bottom:18px;background:#f1f5f9;border:1px solid #e2e8f0;padding:9px 16px;border-radius:10px;font-weight:800;font-size:13px;color:#475569;transition:.22s}
.bz-back:hover{background:#ede9fe;color:#6d28d9;border-color:#e9d5ff;transform:translateX(-3px)}

.bz-footer{background:#0f172a;color:#cbd5e1;margin-top:auto;position:relative;overflow:hidden}
.bz-footer::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,#6366f1,#a855f7,#db2777,#f97316,#6366f1);background-size:300% 100%;animation:bzGrad 6s linear infinite}
.bz-footer-inner{max-width:1280px;margin:0 auto;padding:44px 18px 24px;display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:28px}
.bz-foot-title{font-size:11.5px;font-weight:800;letter-spacing:1.2px;color:#64748b;margin-bottom:12px}
.bz-flink{display:block;font-size:13px;color:#94a3b8;padding:5px 0;transition:.22s;text-align:left;font-weight:600}
.bz-flink:hover{color:#fff;transform:translateX(5px)}
.bz-social{width:36px;height:36px;border-radius:50%;background:#1e293b;display:flex;align-items:center;justify-content:center;font-size:15px;transition:.22s}
.bz-social:hover{background:linear-gradient(135deg,#6366f1,#ec4899);transform:translateY(-3px);box-shadow:0 8px 18px rgba(236,72,153,.4)}
.bz-news{display:flex;gap:8px;max-width:340px;margin-top:10px}
.bz-news input{flex:1;padding:10px 14px;border-radius:10px;border:1px solid #334155;background:#1e293b;color:#fff;font-size:13px;outline:none;min-width:0}
.bz-news input:focus{border-color:#a855f7;box-shadow:0 0 0 3px rgba(168,85,247,.22)}
.bz-foot-bottom{max-width:1280px;margin:0 auto;border-top:1px solid #1e293b;padding:18px 18px 10px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;font-size:12px;color:#94a3b8;font-weight:600}
.bz-foot-note{max-width:1280px;margin:0 auto;padding:0 18px 26px;font-size:11px;color:#64748b;line-height:1.6}

@media (max-width:900px){
  .bz-hamburger{display:flex}
  .bz-desktop-search{display:none!important}
  .bz-mobile-search{display:flex}
  .bz-header-inner{padding:10px 14px;gap:9px}
  .bz-logo b.bz-logo-text{font-size:24px}
}
@media (max-width:640px){
  .bz-hide-sm{display:none}
  .bz-icon-btn{padding:9px 10px}
  .bz-main{padding:12px 12px 36px}
  .bz-hero{min-height:190px;border-radius:16px}
  .bz-hero h1{font-size:23px}
  .bz-hero p{font-size:13px;margin-bottom:14px}
  .bz-hero-emoji{font-size:74px;right:12px;opacity:.55}
  .bz-hero-content{padding:24px 20px}
  .bz-hero-dots{left:22px;bottom:12px}
  .bz-grid{grid-template-columns:repeat(2,1fr);gap:10px}
  .bz-card-body{padding:10px 10px 12px;gap:6px}
  .bz-card-title{font-size:12.5px;min-height:34px}
  .bz-price b{font-size:16px}
  .bz-btn-cart,.bz-btn-buy{font-size:11px;padding:9px 4px}
  .bz-section-head h2{font-size:18px}
  .bz-info{padding:22px 18px;border-radius:14px}
  .bz-info h1{font-size:21px}
  .bz-modal-img{height:200px}
  .bz-topstrip{font-size:10.5px;padding:5px 12px}
}
`;

/* ============================================================
   COMPONENT
============================================================ */
export default function Home() {
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState("popular");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showWish, setShowWish] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMode, setAuthMode] = useState("login");
  const [newPassword, setNewPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [adminTab, setAdminTab] = useState("products");
  const [userSearch, setUserSearch] = useState("");
  const [page, setPage] = useState(null);
  const [slide, setSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState("00:00:00");
  const [toast, setToast] = useState(null);
  const [newProd, setNewProd] = useState({ title: "", price: "", mrp: "", category: "Electronics", image: "", affiliate_url: "" });
  const [showCoinShop, setShowCoinShop] = useState(false);
  const [newSlide, setNewSlide] = useState({ title: "", sub: "", cta: "Shop Now", emoji: "🛍️", bg: "linear-gradient(135deg,#4f46e5 0%,#7c3aed 50%,#ec4899 100%)" });
  const [slides, setSlides] = useState(SLIDES);
  const [coins, setCoins] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  // === ADMIN CLICKS DASHBOARD STATE ===
  const [clicks, setClicks] = useState([]);
  const [clickFilter, setClickFilter] = useState("daily");

  /* ---------- NOTIFY HELPER ---------- */
  const notify = (msg, type = "success") => setToast({ msg, type, id: Date.now() });

  /* ---------- STRONG AUTH - SUPABASE ---------- */
  const loadProfile = async (authUser) => {
    if (!authUser) return null;
    const { data } = await supabase.from("profiles").select("*").eq("id", authUser.id).single();
    if (!data) {
      await supabase.from("profiles").insert([{ id: authUser.id, email: authUser.email, name: authUser.email.split("@")[0], role: "user" }]);
      return { email: authUser.email, name: authUser.email.split("@")[0], role: "user", id: authUser.id, coins: 0 };
    }
    return data;
  };

  const handleSignup = async () => {
    if (!email.includes("@")) return notify("Enter a valid email", "error");
    if (password.length < 6) return notify("Password must be at least 6 characters", "error");
    setAuthLoading(true);
    const { error } = await supabase.auth.signUp({ email: email.trim(), password });
    setAuthLoading(false);
    if (error) return notify(error.message, "error");
    notify("Account created! Now Login ✅");
    setAuthMode("login");
  };

  const handleAuthLogin = async () => {
    if (!email || !password) return notify("Enter both Email & Password", "error");
    setAuthLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setAuthLoading(false);
    if (error) return notify("Wrong email or password!", "error");
    const prof = await loadProfile(data.user);
    if (prof?.is_blocked) {
      await supabase.auth.signOut();
      return notify("Your account has been blocked by Admin!", "error");
    }
    const u = { id: data.user.id, email: data.user.email, name: prof?.name || email.split("@")[0], role: prof?.role || "user", coins: prof?.coins || 0 };
    setUser(u);
    setCoins(prof?.coins || 0);
    if (prof?.role === "admin" || data.user.email === ADMIN_EMAIL) setIsAdmin(true);
    setShowLogin(false); setPassword("");
    notify(`Welcome, ${u.name}! 👋`);
  };

  const handleForgot = async () => {
    if (!email.includes("@")) return notify("Enter email first, then press Forgot", "error");
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: window.location.origin });
    if (error) return notify(error.message, "error");
    notify("Reset link sent to your email! 📧 Check your inbox");
  };

  const handleChangePassword = async () => {
    if (newPassword.length < 6) return notify("New password must be 6+ characters", "error");
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) return notify(error.message, "error");
    notify("Password changed ✅");
    setNewPassword("");
  };

  const handleResetPassword = async () => {
    if (newPassword.length < 6) return notify("Password must be at least 6 characters", "error");
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) return notify(error.message, "error");
    notify("Password changed! Now Login ✅");
    setShowResetPassword(false);
    setNewPassword("");
    setShowLogin(true);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null); setIsAdmin(false); setCoins(0);
    notify("Logged out", "error");
  };

  /* ---------- ADMIN - POWERFUL ---------- */
  const loadAllUsers = async () => {
    const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
    if (data) setAllUsers(data);
  };
  const toggleBlock = async (u) => {
    await supabase.from("profiles").update({ is_blocked: !u.is_blocked }).eq("id", u.id);
    loadAllUsers();
    notify(u.is_blocked ? "User Unblocked" : "User Blocked", "error");
  };
  const addCoinsToUser = async (u, amt) => {
    const newCoins = (u.coins || 0) + amt;
    await supabase.from("profiles").update({ coins: newCoins }).eq("id", u.id);
    if (user?.id === u.id) setCoins(newCoins);
    loadAllUsers(); notify(`${amt} coins added ✅`);
  };
  const toggleAdminRole = async (u) => {
    if (u.email === ADMIN_EMAIL) return notify("Cannot change Super Admin's role!", "error");
    await supabase.from("profiles").update({ role: u.role === "admin" ? "user" : "admin" }).eq("id", u.id);
    loadAllUsers(); notify("Role changed ✅");
  };
  const deleteUserProfile = async (u) => {
    if (u.email === ADMIN_EMAIL) return notify("Cannot delete Super Admin!", "error");
    if (!confirm(`Are you sure you want to delete ${u.email}?`)) return;
    await supabase.from("profiles").delete().eq("id", u.id);
    loadAllUsers(); notify("User deleted", "error");
  };
  const handleAdminOpen = () => {
    if (!user) return notify("Please Login first!", "error");
    if (user.role !== "admin" && user.email !== ADMIN_EMAIL) return notify("Only Admin can open this!", "error");
    setIsAdmin(true); loadAllUsers(); setShowAdmin(true);
  };

  // === ADMIN CLICKS HELPERS ===
  const loadClicks = async () => {
    const { data } = await supabase.from("clicks").select("*").order("created_at", { ascending: false });
    setClicks(data || []);
  };

  const isInPeriod = (dateStr, period) => {
    if (!dateStr) return false;
    const d = new Date(dateStr);
    const now = new Date();
    if (period === "daily") return d.toDateString() === now.toDateString();
    if (period === "weekly") {
      const diff = (now - d) / (1000 * 60 * 60 * 24);
      return diff < 7;
    }
    if (period === "monthly") return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    if (period === "yearly") return d.getFullYear() === now.getFullYear();
    return true;
  };

  const getUserWiseClicks = (period) => {
    const filtered = clicks.filter(c => isInPeriod(c.created_at, period));
    const map = {};
    filtered.forEach(c => {
      const key = c.email || "Guest";
      if (!map[key]) map[key] = { email: key, count: 0, products: {} };
      map[key].count++;
      const pname = c.product_title || "Unknown";
      map[key].products[pname] = (map[key].products[pname] || 0) + 1;
    });
    return Object.values(map).sort((a, b) => b.count - a.count);
  };

  /* ---------- INIT - SUPABASE LOAD ---------- */
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (data?.session?.user) {
        const prof = await loadProfile(data.session.user);
        if (prof?.is_blocked) { await supabase.auth.signOut(); return; }
        setUser({ id: data.session.user.id, email: data.session.user.email, name: prof?.name || "User", role: prof?.role || "user" });
        setCoins(prof?.coins || 0);
        if (prof?.role === "admin" || data.session.user.email === ADMIN_EMAIL) setIsAdmin(true);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setShowResetPassword(true);
        setShowLogin(false);
      }
    });

    const loadProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        setProducts(data);
      } else {
        setProducts(DEFAULT_PRODUCTS);
        if (error) console.log("Supabase Error:", error.message);
      }
      setLoading(false);
    };
    loadProducts();

    supabase.from("sliders").select("*").eq("is_active", true).order("created_at", { ascending: true }).then(({ data }) => {
      if (data && data.length > 0) setSlides(data);
    });

    try {
      const sc = localStorage.getItem("bazaru_cart_v2");
      if (sc) setCart(JSON.parse(sc).map(c => ({ ...c, qty: c.qty || 1 })));
      const sw = localStorage.getItem("bazaru_wish");
      if (sw) setWishlist(JSON.parse(sw));
    } catch (e) {}

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  /* ---------- COUNTDOWN ---------- */
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date(now); end.setHours(23, 59, 59, 999);
      const d = end - now;
      const h = String(Math.floor(d / 3600000)).padStart(2, "0");
      const m = String(Math.floor((d % 3600000) / 60000)).padStart(2, "0");
      const s = String(Math.floor((d % 60000) / 1000)).padStart(2, "0");
      setTimeLeft(`${h}:${m}:${s}`);
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % slides.length), 4200);
    return () => clearInterval(t);
  }, [slides.length]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2300);
    return () => clearTimeout(t);
  }, [toast]);

  const anyOpen = menuOpen || showCart || showWish || showLogin || showAdmin || showCoinShop || showResetPassword || !!selected;
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = anyOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [anyOpen]);

  /* ---------- HELPERS ---------- */
  const saveCart = (list) => { setCart(list); localStorage.setItem("bazaru_cart_v2", JSON.stringify(list)); };
  const saveWish = (list) => { setWishlist(list); localStorage.setItem("bazaru_wish", JSON.stringify(list)); };

  const goHome = () => { setPage(null); setCat("All"); setSearch(""); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const goTo = (p) => { setPage(p); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const addToCart = (p) => {
    const exists = cart.find(c => c.id === p.id);
    const next = exists
      ? cart.map(c => c.id === p.id ? { ...c, qty: c.qty + 1 } : c)
      : [...cart, { id: p.id, title: p.title, price: p.price, image: p.image, qty: 1 }];
    saveCart(next);
    notify("Added to cart 🛒", "success");
  };
  const changeQty = (id, delta) => {
    const next = cart.map(c => c.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c);
    saveCart(next);
  };
  const removeFromCart = (id) => { saveCart(cart.filter(c => c.id !== id)); notify("Removed from cart", "error"); };

  const toggleWish = (id) => {
    if (wishlist.includes(id)) { saveWish(wishlist.filter(x => x !== id)); notify("Removed from wishlist", "error"); }
    else { saveWish([...wishlist, id]); notify("Added to wishlist ❤️", "success"); }
  };

  /* ---------- BUY NOW CLICK TRACKING (NEW) ---------- */
  const handleBuyClick = async (product, e) => {
    if (e) e.preventDefault();
    console.log("Click:", product.title);

    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      console.log("User:", authUser?.email);

      const { data, error } = await supabase.from('clicks').insert([{
        product_id: product.id,
        product_title: product.title,
        email: authUser?.email || 'guest@gmail.com',
        created_at: new Date().toISOString()
      }]);

      if (error) {
        console.log("CLICK ERROR:", error.message);
      } else {
        console.log("Click saved!", data);
        setClickCount(c => c + 1);
      }
    } catch (err) {
      console.log("Catch Error:", err);
    }

    window.open(product.affiliate_url, '_blank');
  };

  const claimCoins = async () => {
    if (!user) return notify("Please Login first!", "error");
    const today = new Date().toISOString().slice(0, 10);

    // 1. Check if already claimed today - from profiles
    const { data: prof } = await supabase.from("profiles").select("last_claim_date, coins").eq("id", user.id).single();
    if (prof?.last_claim_date === today) return notify("Today's coin already claimed!", "error");

    const newTotal = (prof?.coins || coins || 0) + 10;

    // 2. Save coins + date together
    const { error } = await supabase.from("profiles").update({ coins: newTotal, last_claim_date: today }).eq("id", user.id);
    if (error) return notify("Could not save coin: " + error.message, "error");

    setCoins(newTotal);
    notify("🎉 +10 Coins Claimed!");
  };

  const redeemCoins = async (need, reward) => {
    if (!user) return notify("Please Login first!", "error");
    if (coins < need) return notify(`You have only ${coins} coins, need ${need}!`, "error");
    const total = coins - need;
    setCoins(total);
    if (user?.id) await supabase.from("profiles").update({ coins: total }).eq("id", user.id);
    const code = "BAZARU" + need + Math.floor(Math.random() * 900 + 100);
    notify(`🎉 Code received: ${code} - ${reward}`);
    navigator.clipboard?.writeText(code);
  };

  const addProduct = async () => {
    if (!newProd.title || !newProd.price) return notify("Fill title & price", "error");
    const slug = newProd.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

    const p = {
      title: newProd.title,
      slug,
      price: Number(newProd.price),
      mrp: Number(newProd.mrp) || Number(newProd.price) * 2,
      image: newProd.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
      category: newProd.category,
      rating: "4.5",
      affiliate_url: newProd.affiliate_url || "#",
      is_active: true,
    };

    const { data, error } = await supabase.from("products").insert([p]).select().single();
    if (error) return notify("Supabase Error: " + error.message, "error");

    setProducts([data, ...products]);
    setNewProd({ title: "", price: "", mrp: "", category: "Electronics", image: "", affiliate_url: "" });
    notify("Product added to Supabase ✅");
  };

  const addSlider = async () => {
    if (!newSlide.title) return notify("Enter slider title", "error");
    const { data, error } = await supabase.from("sliders").insert([newSlide]).select().single();
    if (error) return notify("Error: " + error.message, "error");
    setSlides([...slides, data]);
    setNewSlide({ title: "", sub: "", cta: "Shop Now", emoji: "🛍️", bg: "linear-gradient(135deg,#4f46e5 0%,#7c3aed 50%,#ec4899 100%)" });
    notify("Slider added ✅");
  };
  const deleteSlider = async (id) => {
    await supabase.from("sliders").delete().eq("id", id);
    setSlides(slides.filter(s => s.id !== id));
    notify("Slider deleted", "error");
  };

  const deleteProduct = async (id) => {
    await supabase.from("products").update({ is_active: false }).eq("id", id);
    setProducts(products.filter(x => x.id !== id));
    notify("Product hidden", "error");
  };

  const checkout = () => {
    notify("Demo checkout — complete your purchase on partner site 🚀");
    setShowCart(false);
  };

  /* ---------- DERIVED ---------- */
  const cartCount = cart.reduce((a, c) => a + c.qty, 0);
  const cartTotal = cart.reduce((a, c) => a + c.price * c.qty, 0);
  const wishProducts = products.filter(p => wishlist.includes(p.id));

  const filtered = useMemo(() => {
    let list = products.filter(p =>
      p.is_active !== false &&
      (cat === "All" || p.category === cat) &&
      p.title.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => Number(b.rating) - Number(a.rating));
    if (sort === "discount") list = [...list].sort((a, b) => (1 - a.price / a.mrp) - (1 - b.price / b.mrp));
    return list;
  }, [products, cat, search, sort]);

  const off = (p) => Math.round((1 - p.price / p.mrp) * 100);
  const currentSlide = slides[slide % slides.length] || SLIDES[0];

  /* ============================================================
     RENDER
  ============================================================ */
  return (
    <>
      <style>{CSS}</style>
      <div className="bz-app">

        {/* ================= HEADER ================= */}
        <header className="bz-header">
          <div className="bz-topstrip">
            <span>🚚 Free Delivery on orders above ₹499</span>
            <span>🔥 Deal Ends in <b>{timeLeft}</b></span>
          </div>

          <div className="bz-header-inner">
            <button className="bz-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu">☰</button>

            <div className="bz-logo" onClick={goHome}>
              <b className="bz-logo-text">BAZARU</b>
              <span>✦ Explore Plus+ ✦</span>
            </div>

            <div className="bz-search bz-desktop-search">
              <input
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(null); }}
                placeholder="Search for products, brands and more..."
              />
              <button className="bz-search-btn">🔍</button>
            </div>

            <div className="bz-header-actions">
              <button className="bz-icon-btn" onClick={() => setShowCoinShop(true)}>
                <span style={{ fontSize: 15 }}>🪙</span>
                <span>{coins}</span>
              </button>
              <button className="bz-icon-btn" onClick={() => (user ? logout() : setShowLogin(true))}>
                <span style={{ fontSize: 15 }}>👤</span>
                <span className="bz-hide-sm">{user ? user.name : "Login"}</span>
              </button>
              <button className="bz-icon-btn" onClick={() => setShowWish(true)}>
                <span style={{ fontSize: 15 }}>❤️</span>
                <span className="bz-hide-sm">Wishlist</span>
                {wishlist.length > 0 && <span className="bz-badge">{wishlist.length}</span>}
              </button>
              <button className="bz-icon-btn" onClick={() => setShowCart(true)}>
                <span style={{ fontSize: 15 }}>🛒</span>
                <span className="bz-hide-sm">Cart</span>
                {cartCount > 0 && <span className="bz-badge">{cartCount}</span>}
              </button>
            </div>
          </div>

          <div className="bz-search bz-mobile-search">
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(null); }}
              placeholder="Search products..."
            />
            <button className="bz-search-btn">🔍</button>
          </div>
        </header>

        {/* ================= CATEGORY BAR ================= */}
        <div className="bz-catbar">
          <div className="bz-catbar-inner">
            {CATEGORIES.map(c => (
              <button
                key={c.name}
                className={`bz-chip ${cat === c.name ? "active" : ""}`}
                onClick={() => { setCat(c.name); setPage(null); }}
              >
                <span>{c.icon}</span>{c.name}
              </button>
            ))}
          </div>
        </div>

        {/* ================= MAIN ================= */}
        <main className="bz-main">
          {page ? (
            <div className="bz-info">
              <button className="bz-back" onClick={() => setPage(null)}>← Back to Home</button>
              <h1>{PAGES[page].title}</h1>
              <p>{PAGES[page].body}</p>
            </div>
          ) : (
            <>
              <div className="bz-hero" style={{ backgroundImage: currentSlide.bg }}>
                <div className="bz-hero-content" key={slide}>
                  <h1>{currentSlide.title}</h1>
                  <p>{currentSlide.sub}</p>
                  <button className="bz-ghost" style={{ background: "#fff", color: "#4f46e5", border: "none", fontWeight: 800 }} onClick={() => document.querySelector(".bz-grid")?.scrollIntoView({ behavior: "smooth" })}>
                    {currentSlide.cta} →
                  </button>
                </div>
                <div className="bz-hero-emoji">{currentSlide.emoji}</div>
                <div className="bz-hero-dots">
                  {slides.map((_, i) => (
                    <span key={i} className={`bz-dot ${i === slide ? "active" : ""}`} onClick={() => setSlide(i)} />
                  ))}
                </div>
              </div>

              <div className="bz-section-head">
                <div>
                  <h2>🔥 Trending Deals</h2>
                  <span className="bz-count">
                    {loading ? "Loading deals..." : `${filtered.length} products found`}
                  </span>
                </div>
                <select className="bz-select" value={sort} onChange={e => setSort(e.target.value)}>
                  <option value="popular">Popularity</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="discount">Biggest Discount</option>
                </select>
              </div>

              {loading ? (
                <div className="bz-empty">
                  <div className="bz-spinner" />
                  <h4>Products Loading...</h4>
                  <p>Fetching deals from Supabase...</p>
                </div>
              ) : filtered.length === 0 ? (
                <div className="bz-empty">
                  <div>🔍</div>
                  <h4>No products found</h4>
                  <p>Try a different search or category</p>
                </div>
              ) : (
                <div className="bz-grid">
                  {filtered.map((p, i) => (
                    <div
                      className="bz-card"
                      key={`${p.id}-${cat}-${sort}`}
                      style={{ animationDelay: `${Math.min(i, 12) * 45}ms` }}
                    >
                      <div className="bz-card-img" onClick={() => setSelected(p)}>
                        <span className="bz-off">{off(p)}% OFF</span>
                        <button
                          className={`bz-heart ${wishlist.includes(p.id) ? "active" : ""}`}
                          onClick={(e) => { e.stopPropagation(); toggleWish(p.id); }}
                        >
                          {wishlist.includes(p.id) ? "❤️" : "🤍"}
                        </button>
                        <img
                          src={p.image}
                          alt={p.title}
                          style={{ width: "100%", height: "170px", objectFit: "cover", borderRadius: "12px" }}
                          onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"; }}
                        />
                      </div>

                      <div className="bz-card-body">
                        <div className="bz-card-title" onClick={() => setSelected(p)}>{p.title}</div>

                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span className="bz-rate">{p.rating} ★</span>
                          <span className="bz-reviews">({getReviews(p.id).toLocaleString()})</span>
                        </div>

                        <div className="bz-price">
                          <b>₹{p.price}</b>
                          <s>₹{p.mrp}</s>
                          <em>{off(p)}% off</em>
                        </div>

                        <div style={{ fontSize: 11, color: "#7c3aed", fontWeight: 700 }}>
                          🚚 Free Delivery • Bank Offer
                        </div>

                        <div className="bz-card-actions">
                          <button className="bz-btn-cart" onClick={() => addToCart(p)}>ADD TO CART</button>
                          <a className="bz-btn-buy" href={p.affiliate_url} target="_blank" rel="noopener noreferrer" onClick={(e) => handleBuyClick(p, e)}>BUY NOW</a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="bz-features">
                <div className="bz-feature"><span className="bz-feature-icon">🚚</span><div><b>Free Delivery</b><small>On orders above ₹499</small></div></div>
                <div className="bz-feature"><span className="bz-feature-icon">🔄</span><div><b>7-Day Returns</b><small>Easy partner returns</small></div></div>
                <div className="bz-feature"><span className="bz-feature-icon">🔒</span><div><b>100% Secure</b><small>Safe partner checkout</small></div></div>
                <div className="bz-feature"><span className="bz-feature-icon">🎧</span><div><b>24×7 Support</b><small>We reply within 24 hrs</small></div></div>
              </div>
            </>
          )}
        </main>

        {/* ================= FOOTER ================= */}
        <footer className="bz-footer">
          <div className="bz-footer-inner">
            <div>
              <div className="bz-logo" style={{ marginBottom: 12 }} onClick={goHome}>
                <b className="bz-logo-text" style={{ fontSize: 24 }}>BAZARU</b>
                <span>✦ Explore Plus+ ✦</span>
              </div>
              <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7 }}>
                India's fastest growing deals discovery platform. Best deals from Amazon, Flipkart,
                Myntra & more — all in one place.
              </p>
              <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                <a className="bz-social" href="https://instagram.com" target="_blank" rel="noopener noreferrer">📸</a>
                <a className="bz-social" href="https://youtube.com" target="_blank" rel="noopener noreferrer">▶️</a>
                <a className="bz-social" href="https://facebook.com" target="_blank" rel="noopener noreferrer">📘</a>
                <a className="bz-social" href="https://t.me" target="_blank" rel="noopener noreferrer">✈️</a>
              </div>
            </div>

            <div>
              <div className="bz-foot-title">ABOUT</div>
              <button className="bz-flink" onClick={() => goTo("about")}>About Us</button>
              <button className="bz-flink" onClick={() => goTo("contact")}>Contact Us</button>
              <button className="bz-flink" onClick={() => goTo("disclaimer")}>Affiliate Disclosure</button>
              <button className="bz-flink" onClick={() => handleAdminOpen()}>Admin Panel</button>
            </div>

            <div>
              <div className="bz-foot-title">HELP</div>
              <button className="bz-flink" onClick={() => goTo("shipping")}>Shipping</button>
              <button className="bz-flink" onClick={() => goTo("refund")}>Returns & Refunds</button>
              <button className="bz-flink" onClick={() => goTo("contact")}>FAQ / Support</button>
              <button className="bz-flink" onClick={() => goTo("contact")}>Report a Deal</button>
            </div>

            <div>
              <div className="bz-foot-title">POLICY</div>
              <button className="bz-flink" onClick={() => goTo("privacy")}>Privacy Policy</button>
              <button className="bz-flink" onClick={() => goTo("terms")}>Terms of Use</button>
              <button className="bz-flink" onClick={() => goTo("refund")}>Refund Policy</button>
              <button className="bz-flink" onClick={() => goTo("shipping")}>Shipping Policy</button>
            </div>

            <div>
              <div className="bz-foot-title">NEWSLETTER</div>
              <p style={{ fontSize: 12.5, color: "#94a3b8", lineHeight: 1.6 }}>
                Get the best loot deals straight to your inbox.
              </p>
              <div className="bz-news">
                <input placeholder="Your email" />
                <button className="bz-primary" style={{ padding: "10px 16px", fontSize: 13 }} onClick={() => notify("Subscribed! 🎉")}>
                  Join
                </button>
              </div>
              <p style={{ fontSize: 12.5, color: "#94a3b8", marginTop: 14, lineHeight: 1.7 }}>
                📧 support@bazaru.in<br />
                📍 Domariaganj, UP - 272189
              </p>
            </div>
          </div>

          <div className="bz-foot-bottom">
            <span>© 2026 BAZARU — All Rights Reserved</span>
            <span>💳 Visa • Mastercard • UPI • COD</span>
          </div>
          <div className="bz-foot-note">
            Disclaimer: BAZARU is an affiliate deals website. We may earn a commission from partner links
            at no extra cost to you. Product delivery, returns and refunds are handled by the respective seller.
          </div>
        </footer>

        {/* ================= MOBILE DRAWER ================= */}
        {menuOpen && (
          <>
            <div className="bz-overlay" onClick={() => setMenuOpen(false)} />
            <aside className="bz-drawer">
              <div className="bz-drawer-head">
                <h3>☰ Menu</h3>
                <button className="bz-close" onClick={() => setMenuOpen(false)}>✕</button>
              </div>

              <div className="bz-drawer-user">
                <div className="bz-avatar">{user ? user.name[0].toUpperCase() : "👤"}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 800 }}>{user ? user.name : "Guest User"}</div>
                  <div style={{ fontSize: 11.5, color: "#64748b", fontWeight: 600 }}>{user ? user.email : "Login to save your data"}</div>
                </div>
                <button
                  className="bz-primary"
                  style={{ padding: "8px 14px", fontSize: 12 }}
                  onClick={() => { setMenuOpen(false); user ? logout() : setShowLogin(true); }}
                >
                  {user ? "Logout" : "Login"}
                </button>
              </div>

              <div className="bz-drawer-title">Shop by Category</div>
              {CATEGORIES.map(c => (
                <button key={c.name} className="bz-menu-link" onClick={() => { setCat(c.name); setPage(null); setMenuOpen(false); }}>
                  <span>{c.icon}</span>{c.name}
                </button>
              ))}

              <div className="bz-drawer-title">Company</div>
              <button className="bz-menu-link" onClick={() => goTo("about")}><span>ℹ️</span>About Us</button>
              <button className="bz-menu-link" onClick={() => goTo("contact")}><span>📞</span>Contact Us</button>
              <button className="bz-menu-link" onClick={() => goTo("disclaimer")}><span>⚠️</span>Disclaimer</button>
              <button className="bz-menu-link" onClick={() => goTo("privacy")}><span>🔒</span>Privacy Policy</button>
              <button className="bz-menu-link" onClick={() => goTo("terms")}><span>📄</span>Terms & Conditions</button>
              <button className="bz-menu-link" onClick={() => goTo("refund")}><span>🔄</span>Refund Policy</button>
              <button className="bz-menu-link" onClick={() => goTo("shipping")}><span>🚚</span>Shipping Policy</button>

              <div className="bz-drawer-title">Admin</div>
              <button className="bz-menu-link" onClick={() => { setMenuOpen(false); handleAdminOpen(); }}><span>⚙️</span>Admin Panel</button>
            </aside>
          </>
        )}

        {/* ================= CART DRAWER ================= */}
        {showCart && (
          <>
            <div className="bz-overlay" onClick={() => setShowCart(false)} />
            <aside className="bz-drawer right">
              <div className="bz-drawer-head">
                <h3>🛒 My Cart ({cartCount})</h3>
                <button className="bz-close" onClick={() => setShowCart(false)}>✕</button>
              </div>

              <div style={{ flex: 1, overflowY: "auto" }}>
                {cart.length === 0 ? (
                  <div className="bz-empty">
                    <div>🛒</div>
                    <h4>Your cart is empty</h4>
                    <p>Add some amazing deals!</p>
                    <button className="bz-primary" style={{ marginTop: 12 }} onClick={() => setShowCart(false)}>Start Shopping</button>
                  </div>
                ) : (
                  cart.map(item => (
                    <div className="bz-cart-item" key={item.id}>
                      <div className="bz-cart-thumb">
                        <img src={item.image} alt={item.title} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.35 }}>{item.title}</div>
                        <div style={{ fontSize: 15, fontWeight: 800, marginTop: 4 }}>₹{item.price * item.qty}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div className="bz-qty">
                            <button onClick={() => changeQty(item.id, -1)}>−</button>
                            <span>{item.qty}</span>
                            <button onClick={() => changeQty(item.id, 1)}>+</button>
                          </div>
                          <button style={{ fontSize: 11.5, color: "#dc2626", fontWeight: 800 }} onClick={() => removeFromCart(item.id)}>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="bz-cart-foot">
                  <div className="bz-cart-row"><span>Subtotal</span><b>₹{cartTotal}</b></div>
                  <div className="bz-cart-row"><span>Delivery</span><b style={{ color: "#16a34a" }}>FREE</b></div>
                  <div className="bz-cart-row bz-total"><span>Total</span><b>₹{cartTotal}</b></div>
                  <button className="bz-primary" style={{ width: "100%", marginTop: 12 }} onClick={checkout}>
                    PROCEED TO CHECKOUT →
                  </button>
                </div>
              )}
            </aside>
          </>
        )}

        {/* ================= WISHLIST DRAWER ================= */}
        {showWish && (
          <>
            <div className="bz-overlay" onClick={() => setShowWish(false)} />
            <aside className="bz-drawer right">
              <div className="bz-drawer-head">
                <h3>❤️ My Wishlist ({wishProducts.length})</h3>
                <button className="bz-close" onClick={() => setShowWish(false)}>✕</button>
              </div>

              <div style={{ flex: 1, overflowY: "auto" }}>
                {wishProducts.length === 0 ? (
                  <div className="bz-empty">
                    <div>💔</div>
                    <h4>Wishlist is empty</h4>
                    <p>Tap the heart on any product</p>
                    <button className="bz-primary" style={{ marginTop: 12 }} onClick={() => setShowWish(false)}>Browse Deals</button>
                  </div>
                ) : (
                  wishProducts.map(item => (
                    <div className="bz-cart-item" key={item.id}>
                      <div className="bz-cart-thumb">
                        <img src={item.image} alt={item.title} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.35 }}>{item.title}</div>
                        <div style={{ fontSize: 15, fontWeight: 800, marginTop: 4 }}>₹{item.price}</div>
                        <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                          <button className="bz-btn-cart" style={{ flex: 1, padding: "7px" }} onClick={() => addToCart(item)}>ADD TO CART</button>
                          <button
                            style={{ fontSize: 11.5, color: "#dc2626", fontWeight: 800, padding: "0 6px" }}
                            onClick={() => toggleWish(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </aside>
          </>
        )}

        {/* ================= PRODUCT DETAIL MODAL ================= */}
        {selected && (
          <div className="bz-modal" onClick={() => setSelected(null)}>
            <div className="bz-modal-card" onClick={e => e.stopPropagation()}>
              <button
                className="bz-close"
                style={{ position: "absolute", top: 12, right: 12, background: "rgba(15,23,42,.55)", color: "#fff", zIndex: 5 }}
                onClick={() => setSelected(null)}
              >✕</button>

              <div className="bz-modal-img">
                <img
                  src={selected.image}
                  alt={selected.title}
                  onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"; }}
                />
              </div>

              <div style={{ padding: 22 }}>
                <h2 style={{ fontSize: 19, lineHeight: 1.35, fontWeight: 800 }}>{selected.title}</h2>

                <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "10px 0" }}>
                  <span className="bz-rate">{selected.rating} ★</span>
                  <span className="bz-reviews">{getReviews(selected.id).toLocaleString()} ratings</span>
                  <span style={{ fontSize: 11, color: "#16a34a", fontWeight: 800 }}>✔ Verified</span>
                </div>

                <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.65 }}>
                  Premium quality product from our curated collection. Delivered fast via trusted partner stores like Amazon & Flipkart. Checkout safely with bank-grade security and easy returns.
                </p>

                <div className="bz-price" style={{ margin: "14px 0" }}>
                  <b style={{ fontSize: 26 }}>₹{selected.price}</b>
                  <s>₹{selected.mrp}</s>
                  <em>{off(selected)}% off</em>
                </div>

                <div className="bz-modal-actions">
                  <button className="bz-btn-cart" onClick={() => addToCart(selected)}>ADD TO CART</button>
                  <a className="bz-btn-buy" href={selected.affiliate_url} target="_blank" rel="noopener noreferrer" onClick={(e) => handleBuyClick(selected, e)}>BUY NOW →</a>
                </div>

                <p style={{ fontSize: 11.5, color: "#94a3b8", marginTop: 12, textAlign: "center", fontWeight: 600 }}>
                  🔒 Secure checkout on partner site • Free delivery above ₹499
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= LOGIN MODAL ================= */}
        {showLogin && (
          <div className="bz-modal" onClick={() => setShowLogin(false)}>
            <div className="bz-modal-card" style={{ maxWidth: 380 }} onClick={e => e.stopPropagation()}>
              <div style={{ padding: 28 }}>
                <div style={{ textAlign: "center", marginBottom: 18 }}>
                  <div style={{ fontSize: 42, animation: "bzFloat 3s ease-in-out infinite" }}>👋</div>
                  <h2 style={{ fontSize: 20, marginTop: 8, fontWeight: 800 }}>Welcome to BAZARU</h2>
                  <p style={{ fontSize: 13, color: "#64748b", marginTop: 4, fontWeight: 600 }}>
                    Login to save your cart & wishlist
                  </p>
                </div>

                <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                  {["login", "signup", "forgot"].map(m => (
                    <button key={m} onClick={() => setAuthMode(m)} style={{ flex: 1, padding: "9px", borderRadius: 9, background: authMode === m ? "#7c3aed" : "#f1f5f9", color: authMode === m ? "#fff" : "#475569", fontWeight: 800, fontSize: 12, textTransform: "uppercase" }}>{m === "forgot" ? "Forgot?" : m}</button>
                  ))}
                </div>

                <input className="bz-input" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" />
                {authMode !== "forgot" && <input className="bz-input" style={{ marginTop: 10 }} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password (min 6)" />}
                {authMode === "login" && <button className="bz-primary" style={{ width: "100%", marginTop: 12 }} onClick={handleAuthLogin}>{authLoading ? "Checking..." : "LOGIN"}</button>}
                {authMode === "signup" && <button className="bz-primary" style={{ width: "100%", marginTop: 12 }} onClick={handleSignup}>{authLoading ? "Creating..." : "CREATE ACCOUNT"}</button>}
                {authMode === "forgot" && <button className="bz-primary" style={{ width: "100%", marginTop: 12 }} onClick={handleForgot}>SEND RESET LINK 📧</button>}

                {user && <div style={{ marginTop: 14, borderTop: "1px dashed #e2e8f0", paddingTop: 12 }}>
                  <p style={{ fontSize: 12, fontWeight: 800, marginBottom: 6 }}>🔒 Change Password</p>
                  <input className="bz-input" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="New Password" />
                  <button className="bz-ghost" style={{ width: "100%", marginTop: 8 }} onClick={handleChangePassword}>CHANGE PASSWORD</button>
                </div>}

                <button className="bz-ghost" style={{ width: "100%", marginTop: 8 }} onClick={() => setShowLogin(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= RESET PASSWORD MODAL ================= */}
        {showResetPassword && (
          <div className="bz-modal">
            <div className="bz-modal-card" style={{ maxWidth: 380 }}>
              <div style={{ padding: 28 }}>
                <div style={{ textAlign: "center", marginBottom: 18 }}>
                  <div style={{ fontSize: 42, animation: "bzFloat 3s ease-in-out infinite" }}>🔑</div>
                  <h2 style={{ fontSize: 20, marginTop: 8, fontWeight: 800 }}>Reset Password</h2>
                  <p style={{ fontSize: 13, color: "#64748b", marginTop: 4, fontWeight: 600 }}>
                    Set new password (min 6 characters)
                  </p>
                </div>

                <input
                  className="bz-input"
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="New Password (min 6)"
                />

                <button className="bz-primary" style={{ width: "100%", marginTop: 12 }} onClick={handleResetPassword}>
                  SET NEW PASSWORD
                </button>

                <button className="bz-ghost" style={{ width: "100%", marginTop: 8 }} onClick={() => { setShowResetPassword(false); setNewPassword(""); }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= ADMIN MODAL ================= */}
        {showAdmin && (
          <div className="bz-modal" onClick={() => setShowAdmin(false)}>
            <div className="bz-modal-card" style={{ maxWidth: 680 }} onClick={e => e.stopPropagation()}>
              <div className="bz-drawer-head">
                <h3>⚙️ Admin Panel - {user?.email}</h3>
                <button className="bz-close" onClick={() => setShowAdmin(false)}>✕</button>
              </div>

              <div style={{ padding: 22 }}>
                {!isAdmin ? (
                  <div style={{ textAlign: "center", padding: 20 }}>
                    <p style={{ fontSize: 14, fontWeight: 800 }}>Only Admin can open this!</p>
                    <p style={{ fontSize: 12, color: "#64748b", marginTop: 6 }}>Login with run4ravish@gmail.com first, then Admin will open.</p>
                  </div>
                ) : (
                  <>
                    <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
                      {["products", "users", "sliders", "clicks"].map(t => (
                        <button key={t} onClick={() => { setAdminTab(t); if (t === "users") loadAllUsers(); if (t === "clicks") loadClicks(); }} style={{ flex: 1, minWidth: 80, padding: "9px", borderRadius: 9, background: adminTab === t ? "#7c3aed" : "#f1f5f9", color: adminTab === t ? "#fff" : "#333", fontWeight: 800, fontSize: 12, textTransform: "uppercase" }}>{t}</button>
                      ))}
                    </div>

                    {/* === PRODUCTS TAB === */}
                    {adminTab === "products" && (
                      <div>
                        <h4 style={{ fontSize: 15, fontWeight: 800, marginBottom: 12 }}>➕ Add New Product</h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                          <input className="bz-input" value={newProd.title} onChange={e => setNewProd({ ...newProd, title: e.target.value })} placeholder="Product title" />
                          <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
                            <input className="bz-input" style={{ flex: 1, minWidth: 110 }} value={newProd.price} onChange={e => setNewProd({ ...newProd, price: e.target.value })} placeholder="Price ₹" type="number" />
                            <input className="bz-input" style={{ flex: 1, minWidth: 110 }} value={newProd.mrp} onChange={e => setNewProd({ ...newProd, mrp: e.target.value })} placeholder="MRP ₹" type="number" />
                            <select className="bz-select" value={newProd.category} onChange={e => setNewProd({ ...newProd, category: e.target.value })}>
                              <option>Mobiles</option><option>Fashion</option><option>Electronics</option><option>Home</option><option>Beauty</option>
                            </select>
                          </div>
                          <input className="bz-input" value={newProd.image} onChange={e => setNewProd({ ...newProd, image: e.target.value })} placeholder="Image URL (https://...)" />
                          <input className="bz-input" value={newProd.affiliate_url} onChange={e => setNewProd({ ...newProd, affiliate_url: e.target.value })} placeholder="Affiliate / Partner link" />
                          <button className="bz-primary" onClick={addProduct}>+ ADD PRODUCT</button>
                        </div>

                        <h4 style={{ fontSize: 15, fontWeight: 800, margin: "20px 0 10px" }}>📦 Manage Products ({products.length})</h4>
                        <div style={{ maxHeight: 300, overflowY: "auto", border: "1px solid #e2e8f0", borderRadius: 12 }}>
                          {products.map(p => (
                            <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "space-between", padding: "10px 12px", borderBottom: "1px solid #f1f5f9" }}>
                              <img src={p.image} alt={p.title} style={{ width: 38, height: 38, objectFit: "cover", borderRadius: 8, flexShrink: 0 }} />
                              <span style={{ fontSize: 13, fontWeight: 700, flex: 1, minWidth: 0 }}>{p.title} — <b>₹{p.price}</b></span>
                              <button style={{ background: "#fee2e2", color: "#dc2626", padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 800 }} onClick={() => deleteProduct(p.id)}>Delete</button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* === USERS TAB === */}
                    {adminTab === "users" && (
                      <div>
                        <input className="bz-input" value={userSearch} onChange={e => setUserSearch(e.target.value)} placeholder="User search by email..." style={{ marginBottom: 10 }} />
                        {allUsers.filter(u => u.email.toLowerCase().includes(userSearch.toLowerCase())).map(u => (
                          <div key={u.id} style={{ border: "1px solid #e2e8f0", borderRadius: 12, padding: 12, marginBottom: 8 }}>
                            <div style={{ fontSize: 13, fontWeight: 800 }}>{u.email} {u.role === "admin" ? "👑 ADMIN" : ""} {u.is_blocked ? "🚫 BLOCKED" : ""}</div>
                            <div style={{ fontSize: 12, color: "#64748b" }}>Coins: {u.coins || 0} | Joined: {new Date(u.created_at).toLocaleDateString("en-IN")}</div>
                            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
                              <button className="bz-ghost" style={{ padding: "6px 10px", fontSize: 11 }} onClick={() => toggleBlock(u)}>{u.is_blocked ? "UNBLOCK" : "BLOCK"}</button>
                              <button className="bz-ghost" style={{ padding: "6px 10px", fontSize: 11 }} onClick={() => addCoinsToUser(u, 50)}>+50 🪙</button>
                              <button className="bz-ghost" style={{ padding: "6px 10px", fontSize: 11 }} onClick={() => addCoinsToUser(u, -50)}>-50 🪙</button>
                              <button className="bz-ghost" style={{ padding: "6px 10px", fontSize: 11 }} onClick={() => toggleAdminRole(u)}>{u.role === "admin" ? "Remove Admin" : "Make Admin"}</button>
                              <button className="bz-ghost" style={{ padding: "6px 10px", fontSize: 11, color: "#dc2626" }} onClick={() => deleteUserProfile(u)}>DELETE</button>
                            </div>
                          </div>
                        ))}
                        {allUsers.length === 0 && <p style={{ fontSize: 13, color: "#64748b" }}>No users found. Someone needs to signup first.</p>}
                      </div>
                    )}

                    {/* === SLIDERS TAB === */}
                    {adminTab === "sliders" && (
                      <div>
                        <h4 style={{ fontSize: 15, fontWeight: 800, marginBottom: 12 }}>🎠 Add New Slider</h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                          <input className="bz-input" value={newSlide.title} onChange={e => setNewSlide({ ...newSlide, title: e.target.value })} placeholder="Slider Title" />
                          <input className="bz-input" value={newSlide.sub} onChange={e => setNewSlide({ ...newSlide, sub: e.target.value })} placeholder="Subtitle" />
                          <div style={{ display: "flex", gap: 9 }}>
                            <input className="bz-input" value={newSlide.emoji} onChange={e => setNewSlide({ ...newSlide, emoji: e.target.value })} placeholder="Emoji 🛍️" />
                            <input className="bz-input" value={newSlide.cta} onChange={e => setNewSlide({ ...newSlide, cta: e.target.value })} placeholder="Button - Shop Now" />
                          </div>
                          <select className="bz-select" value={newSlide.bg} onChange={e => setNewSlide({ ...newSlide, bg: e.target.value })}>
                            <option value="linear-gradient(135deg,#4f46e5 0%,#7c3aed 50%,#ec4899 100%)">Purple Pink</option>
                            <option value="linear-gradient(135deg,#0ea5e9 0%,#6366f1 50%,#a855f7 100%)">Blue Purple</option>
                            <option value="linear-gradient(135deg,#f97316 0%,#fb7185 50%,#ec4899 100%)">Orange Pink</option>
                            <option value="linear-gradient(135deg,#16a34a 0%,#059669 50%,#0d9488 100%)">Green</option>
                            <option value="linear-gradient(135deg,#dc2626 0%,#ea580c 50%,#f59e0b 100%)">Red Orange</option>
                          </select>
                          <button className="bz-primary" onClick={addSlider}>+ ADD SLIDER</button>
                        </div>
                        <div style={{ maxHeight: 220, overflowY: "auto", border: "1px solid #e2e8f0", borderRadius: 12, marginTop: 10 }}>
                          {slides.map(s => (
                            <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "space-between", padding: "10px 12px", borderBottom: "1px solid #f1f5f9" }}>
                              <span style={{ fontSize: 18 }}>{s.emoji}</span>
                              <span style={{ fontSize: 13, fontWeight: 700, flex: 1 }}>{s.title}</span>
                              <button style={{ background: "#fee2e2", color: "#dc2626", padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 800 }} onClick={() => deleteSlider(s.id)}>Delete</button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* === CLICKS TAB === */}
                    {adminTab === "clicks" && (
                      <div>
                        <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
                          {[
                            { key: "daily", label: "📅 Daily" },
                            { key: "weekly", label: "📆 Weekly" },
                            { key: "monthly", label: "🗓️ Monthly" },
                            { key: "yearly", label: "📊 Yearly" },
                          ].map(f => (
                            <button
                              key={f.key}
                              onClick={() => setClickFilter(f.key)}
                              style={{
                                flex: 1,
                                minWidth: 80,
                                padding: "9px",
                                borderRadius: 9,
                                background: clickFilter === f.key ? "#7c3aed" : "#f1f5f9",
                                color: clickFilter === f.key ? "#fff" : "#333",
                                fontWeight: 800,
                                fontSize: 12,
                                transition: ".2s"
                              }}
                            >
                              {f.label}
                            </button>
                          ))}
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
                          <div style={{ background: "linear-gradient(135deg,#eef2ff,#f5f3ff)", border: "1px solid #c7d2fe", borderRadius: 14, padding: 14 }}>
                            <div style={{ fontSize: 11, color: "#64748b", fontWeight: 800, textTransform: "uppercase", letterSpacing: 1 }}>
                              {clickFilter} Clicks
                            </div>
                            <div style={{ fontSize: 26, fontWeight: 900, color: "#7c3aed", marginTop: 4 }}>
                              {clicks.filter(c => isInPeriod(c.created_at, clickFilter)).length}
                            </div>
                          </div>
                          <div style={{ background: "linear-gradient(135deg,#fef3c7,#ffedd5)", border: "1px solid #fcd34d", borderRadius: 14, padding: 14 }}>
                            <div style={{ fontSize: 11, color: "#92400e", fontWeight: 800, textTransform: "uppercase", letterSpacing: 1 }}>
                              All Time Clicks
                            </div>
                            <div style={{ fontSize: 26, fontWeight: 900, color: "#ea580c", marginTop: 4 }}>
                              {clicks.length}
                            </div>
                          </div>
                        </div>

                        <h4 style={{ fontSize: 14, fontWeight: 800, marginBottom: 10, color: "#334155" }}>
                          👥 User-wise Breakdown ({getUserWiseClicks(clickFilter).length} users)
                        </h4>

                        {getUserWiseClicks(clickFilter).length === 0 ? (
                          <div style={{ textAlign: "center", padding: 40, background: "#f8fafc", borderRadius: 12 }}>
                            <div style={{ fontSize: 40, marginBottom: 8 }}>📭</div>
                            <p style={{ fontSize: 13, color: "#94a3b8", fontWeight: 600 }}>
                              No clicks in this period
                            </p>
                          </div>
                        ) : (
                          <div style={{ maxHeight: 340, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
                            {getUserWiseClicks(clickFilter).map((u, idx) => (
                              <div key={u.email} style={{
                                border: "1px solid #e2e8f0",
                                borderRadius: 12,
                                padding: 12,
                                background: "#fff",
                                boxShadow: "0 2px 6px rgba(15,23,42,.04)"
                              }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <div style={{
                                      width: 26, height: 26, borderRadius: "50%",
                                      background: idx < 3 ? "linear-gradient(135deg,#fbbf24,#ea580c)" : "linear-gradient(135deg,#6366f1,#a855f7)",
                                      color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                                      fontSize: 11, fontWeight: 800
                                    }}>
                                      {idx + 1}
                                    </div>
                                    <b style={{ fontSize: 13, color: "#0f172a" }}>{u.email}</b>
                                  </div>
                                  <span style={{
                                    background: "linear-gradient(135deg,#16a34a,#15803d)",
                                    color: "#fff", padding: "3px 10px", borderRadius: 999,
                                    fontSize: 11, fontWeight: 800
                                  }}>
                                    {u.count} clicks
                                  </span>
                                </div>
                                <div style={{ fontSize: 11.5, color: "#64748b", lineHeight: 1.5 }}>
                                  {Object.entries(u.products).map(([p, c], i, arr) => (
                                    <span key={p}>
                                      <span style={{ color: "#334155", fontWeight: 700 }}>{p}</span>
                                      <span style={{ color: "#7c3aed", fontWeight: 800 }}> ({c}×)</span>
                                      {i < arr.length - 1 ? " • " : ""}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <button
                          className="bz-ghost"
                          style={{ width: "100%", marginTop: 12 }}
                          onClick={loadClicks}
                        >
                          🔄 Refresh
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= COIN SHOP MODAL ================= */}
        {showCoinShop && (
          <div className="bz-modal" onClick={() => setShowCoinShop(false)}>
            <div className="bz-modal-card" style={{ maxWidth: 420 }} onClick={e => e.stopPropagation()}>
              <div style={{ padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 48 }}>🪙</div>
                <h2 style={{ fontSize: 22, fontWeight: 800 }}>Coin Shop</h2>
                <p style={{ fontSize: 13, color: "#64748b", fontWeight: 600 }}>You have <b style={{ color: "#f59e0b", fontSize: 16 }}>{coins} Coins</b></p>
                <button className="bz-primary" style={{ width: "100%", margin: "14px 0 6px" }} onClick={claimCoins}>🎁 Claim Today's +10 Coin</button>
                <p style={{ fontSize: 11, color: "#94a3b8" }}>You can claim once per day</p>
                <div style={{ textAlign: "left", marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fffbeb", border: "1px solid #fde68a", padding: 12, borderRadius: 12 }}>
                    <div><b style={{ fontSize: 14 }}>🪙 50 Coins</b><div style={{ fontSize: 12, color: "#64748b" }}>₹5 OFF Coupon</div></div>
                    <button className="bz-primary" style={{ padding: "8px 14px", fontSize: 12 }} onClick={() => redeemCoins(50, "₹5 OFF")}>Redeem</button>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f0fdf4", border: "1px solid #bbf7d0", padding: 12, borderRadius: 12 }}>
                    <div><b style={{ fontSize: 14 }}>🪙 100 Coins</b><div style={{ fontSize: 12, color: "#64748b" }}>₹10 OFF Coupon + Free Delivery</div></div>
                    <button className="bz-primary" style={{ padding: "8px 14px", fontSize: 12 }} onClick={() => redeemCoins(100, "₹10 OFF")}>Redeem</button>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#eef2ff", border: "1px solid #c7d2fe", padding: 12, borderRadius: 12 }}>
                    <div><b style={{ fontSize: 14 }}>🪙 200 Coins</b><div style={{ fontSize: 12, color: "#64748b" }}>₹25 OFF Mega Coupon</div></div>
                    <button className="bz-primary" style={{ padding: "8px 14px", fontSize: 12 }} onClick={() => redeemCoins(200, "₹25 OFF")}>Redeem</button>
                  </div>
                </div>
                <button className="bz-ghost" style={{ width: "100%", marginTop: 14 }} onClick={() => setShowCoinShop(false)}>Close</button>
              </div>
            </div>
          </div>
        )}

        {/* ================= TOAST ================= */}
        {toast && (
          <div key={toast.id} className={`bz-toast ${toast.type}`}>
            <span>{toast.type === "error" ? "⚠️" : "✅"}</span>
            {toast.msg}
          </div>
        )}
      </div>
    </>
  );
}
