"use client";
import { useState, useEffect, useMemo } from "react";

/* ============================================================
   DATA
============================================================ */
const DEFAULT_PRODUCTS = [
  { id: 1, title: "Wireless Bluetooth Earbuds - Black", price: 499, old: 1999, rating: 4.3, reviews: 12450, cat: "Mobiles", img: "🎧", link: "https://earn-karo.com/your-link-1", desc: "True wireless earbuds with 32H playtime, Bluetooth 5.3, noise cancellation and built-in mic." },
  { id: 2, title: "Men's Stylish Cotton T-Shirt", price: 299, old: 999, rating: 4.1, reviews: 8930, cat: "Fashion", img: "👕", link: "https://earn-karo.com/your-link-2", desc: "Premium cotton, regular fit, comfortable for daily wear." },
  { id: 3, title: "Smart Watch with Fitness Tracker", price: 999, old: 3999, rating: 4.5, reviews: 23400, cat: "Electronics", img: "⌚", link: "https://earn-karo.com/your-link-3", desc: "1.85 inch HD display, heart rate, SpO2, sleep tracking, 7 days battery backup." },
  { id: 4, title: "Women's Kurti - Beautiful Design", price: 449, old: 1499, rating: 4.2, reviews: 6700, cat: "Fashion", img: "👗", link: "https://earn-karo.com/your-link-4", desc: "Elegant printed kurti, soft fabric, perfect for festive and daily wear." },
  { id: 5, title: "Air Fryer - Healthy Cooking 4L", price: 2499, old: 5999, rating: 4.4, reviews: 9800, cat: "Home", img: "🍳", link: "https://earn-karo.com/your-link-5", desc: "Oil-free cooking, 8 preset modes, 4L capacity for the full family." },
  { id: 6, title: "Face Wash + Serum Combo Pack", price: 349, old: 899, rating: 4.0, reviews: 4500, cat: "Beauty", img: "🧴", link: "https://earn-karo.com/your-link-6", desc: "Vitamin C face wash + Hyaluronic serum for glowing skin." },
  { id: 7, title: "Running Sports Shoes - Lightweight", price: 799, old: 2499, rating: 4.3, reviews: 15200, cat: "Fashion", img: "👟", link: "https://earn-karo.com/your-link-7", desc: "Ultra-light, breathable mesh, anti-skid sole for running & gym." },
  { id: 8, title: "Bluetooth Speaker - Bass Boost", price: 899, old: 2999, rating: 4.6, reviews: 31200, cat: "Electronics", img: "🔊", link: "https://earn-karo.com/your-link-8", desc: "16W speaker, deep bass, 12H battery, waterproof IPX5." },
  { id: 9, title: "RGB Gaming Mouse - 6 DPI Modes", price: 599, old: 1799, rating: 4.2, reviews: 5400, cat: "Electronics", img: "🖱️", link: "https://earn-karo.com/your-link-9", desc: "Ergonomic RGB gaming mouse with adjustable DPI and braided cable." },
  { id: 10, title: "Stainless Steel Water Bottle 1L", price: 399, old: 999, rating: 4.1, reviews: 7200, cat: "Home", img: "🍶", link: "https://earn-karo.com/your-link-10", desc: "Leak-proof, BPA free, keeps water cold for 24 hours." },
  { id: 11, title: "Women's Leather Handbag", price: 899, old: 2999, rating: 4.4, reviews: 3100, cat: "Fashion", img: "👜", link: "https://earn-karo.com/your-link-11", desc: "Premium PU leather handbag with spacious compartments." },
  { id: 12, title: "Anti-Slip Yoga Mat 6mm", price: 549, old: 1499, rating: 4.3, reviews: 2600, cat: "Home", img: "🧘", link: "https://earn-karo.com/your-link-12", desc: "Extra thick anti-slip yoga mat with carry strap." },
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
  { title: "Big Saving Days Are Live!", sub: "Up to 80% Off + Extra Discount on Top Brands", cta: "Shop Now", emoji: "🛍️", bg: "linear-gradient(135deg,#4f46e5 0%,#7c3aed 50%,#a855f7 100%)" },
  { title: "Electronics Mega Sale", sub: "Earbuds, Watches, Speakers — Starting ₹499 Only", cta: "Grab Deal", emoji: "🎧", bg: "linear-gradient(135deg,#0ea5e9 0%,#6366f1 50%,#8b5cf6 100%)" },
  { title: "Fashion Fest is Here", sub: "Flat 70% Off on Kurtis, T-Shirts & Shoes", cta: "Explore", emoji: "👟", bg: "linear-gradient(135deg,#f97316 0%,#fb7185 50%,#ec4899 100%)" },
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

/* ============================================================
   GLOBAL CSS (animations, hover, responsive)
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

/* ---------- HEADER ---------- */
.bz-header{position:sticky;top:0;z-index:120;background:linear-gradient(135deg,#4f46e5 0%,#6d28d9 55%,#7c3aed 100%);color:#fff;box-shadow:0 6px 24px rgba(79,70,229,.35)}
.bz-topstrip{background:linear-gradient(90deg,#312e81,#5b21b6,#7c3aed);color:#e9d5ff;font-size:11.5px;display:flex;justify-content:space-between;gap:10px;padding:6px 18px;flex-wrap:wrap}
.bz-topstrip b{color:#fde047}
.bz-header-inner{max-width:1280px;margin:0 auto;display:flex;align-items:center;gap:12px;padding:12px 18px}
.bz-logo{cursor:pointer;user-select:none;line-height:1;display:flex;flex-direction:column;flex-shrink:0}
.bz-logo b{font-size:24px;font-style:italic;letter-spacing:.5px;text-shadow:0 2px 10px rgba(0,0,0,.28)}
.bz-logo span{font-size:10px;color:#fde047;font-style:italic;margin-top:2px}

.bz-search{display:flex;align-items:center;background:#fff;border-radius:12px;overflow:hidden;flex:1;max-width:620px;box-shadow:0 4px 16px rgba(0,0,0,.14);transition:.25s}
.bz-search:focus-within{box-shadow:0 0 0 3px rgba(253,224,71,.6)}
.bz-search input{flex:1;border:0;outline:0;padding:11px 14px;font-size:14px;color:#0f172a;background:transparent;min-width:0}
.bz-search-btn{background:linear-gradient(135deg,#fbbf24,#f97316);border:0;color:#fff;padding:0 18px;align-self:stretch;font-size:16px;display:flex;align-items:center;transition:.2s}
.bz-search-btn:hover{filter:brightness(1.1)}
.bz-header-actions{display:flex;gap:8px;margin-left:auto;flex-shrink:0}
.bz-icon-btn{position:relative;display:flex;align-items:center;gap:6px;background:rgba(255,255,255,.13);border:1px solid rgba(255,255,255,.18);color:#fff;padding:9px 12px;border-radius:11px;font-size:13px;font-weight:700;transition:.22s;white-space:nowrap}
.bz-icon-btn:hover{background:rgba(255,255,255,.28);transform:translateY(-2px);box-shadow:0 6px 16px rgba(0,0,0,.22)}
.bz-badge{position:absolute;top:-6px;right:-6px;background:linear-gradient(135deg,#fb923c,#ea580c);color:#fff;font-size:10px;min-width:19px;height:19px;border-radius:10px;display:flex;align-items:center;justify-content:center;padding:0 4px;font-weight:800;box-shadow:0 3px 8px rgba(234,88,12,.55);animation:bzPop .25s ease}
.bz-hamburger{display:none;width:42px;height:42px;border-radius:11px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.2);color:#fff;font-size:19px;align-items:center;justify-content:center;transition:.2s;flex-shrink:0}
.bz-hamburger:hover{background:rgba(255,255,255,.32);transform:scale(1.05)}
.bz-mobile-search{display:none;max-width:none;margin:0 16px 12px}

/* ---------- CATEGORY BAR ---------- */
.bz-catbar{background:#fff;border-bottom:1px solid #e2e8f0;box-shadow:0 2px 12px rgba(15,23,42,.05)}
.bz-catbar-inner{max-width:1280px;margin:0 auto;display:flex;gap:8px;padding:10px 18px;overflow-x:auto;scrollbar-width:none}
.bz-catbar-inner::-webkit-scrollbar{display:none}
.bz-chip{display:flex;align-items:center;gap:7px;padding:9px 16px;border-radius:999px;background:#f1f5f9;border:1px solid transparent;font-size:13px;font-weight:700;color:#334155;white-space:nowrap;transition:.22s}
.bz-chip:hover{background:#ede9fe;color:#6d28d9;transform:translateY(-2px)}
.bz-chip.active{background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;box-shadow:0 6px 16px rgba(124,58,237,.38)}

/* ---------- MAIN / HERO ---------- */
.bz-main{flex:1;width:100%;max-width:1280px;margin:0 auto;padding:16px 18px 44px}
.bz-hero{position:relative;border-radius:20px;overflow:hidden;color:#fff;min-height:240px;display:flex;align-items:center;box-shadow:0 18px 44px rgba(79,70,229,.32);background-size:200% 200%;animation:bzGrad 9s ease infinite;transition:background-image .5s}
.bz-hero-content{padding:36px;max-width:640px;position:relative;z-index:2;animation:bzUp .5s ease both}
.bz-hero h1{font-size:34px;line-height:1.15;margin-bottom:10px;text-shadow:0 3px 16px rgba(0,0,0,.25);font-weight:800;letter-spacing:-.5px}
.bz-hero p{font-size:15px;opacity:.94;margin-bottom:20px}
.bz-hero-emoji{position:absolute;right:46px;top:50%;transform:translateY(-50%);font-size:126px;opacity:.92;animation:bzFloat 3.2s ease-in-out infinite;pointer-events:none;filter:drop-shadow(0 14px 30px rgba(0,0,0,.35))}
.bz-hero-dots{position:absolute;bottom:16px;left:38px;display:flex;gap:7px;z-index:3}
.bz-dot{width:9px;height:9px;border-radius:50%;background:rgba(255,255,255,.45);cursor:pointer;transition:.28s}
.bz-dot.active{width:28px;border-radius:999px;background:#fff}

/* ---------- SECTION ---------- */
.bz-section-head{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin:30px 0 16px}
.bz-section-head h2{font-size:21px;font-weight:800;letter-spacing:-.4px}
.bz-count{font-size:12.5px;color:#64748b;font-weight:600}
.bz-select{padding:9px 12px;border-radius:10px;border:1.5px solid #cbd5e1;background:#fff;font-size:13px;font-weight:700;color:#334155;outline:none;cursor:pointer;transition:.2s}
.bz-select:hover,.bz-select:focus{border-color:#8b5cf6;box-shadow:0 0 0 3px rgba(139,92,246,.15)}

/* ---------- GRID / CARD ---------- */
.bz-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px}
.bz-card{background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e8ecf3;display:flex;flex-direction:column;transition:transform .32s cubic-bezier(.22,1,.36,1),box-shadow .32s,border-color .32s;animation:bzUp .5s ease both;position:relative}
.bz-card:hover{transform:translateY(-8px);box-shadow:0 20px 44px rgba(15,23,42,.15);border-color:#ddd6fe}
.bz-card-img{height:172px;display:flex;align-items:center;justify-content:center;font-size:72px;position:relative;cursor:pointer;background:linear-gradient(135deg,#eef2ff,#f5f3ff 50%,#fdf2f8);overflow:hidden}
.bz-card-img span{transition:transform .38s cubic-bezier(.22,1,.36,1);display:block}
.bz-card:hover .bz-card-img span{transform:scale(1.14) rotate(-5deg)}
.bz-off{position:absolute;top:10px;left:10px;background:linear-gradient(135deg,#22c55e,#15803d);color:#fff;font-size:11px;font-weight:800;padding:4px 9px;border-radius:8px;box-shadow:0 4px 12px rgba(22,163,74,.38);z-index:3}
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

/* ---------- BUTTONS ---------- */
.bz-primary{background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;border:none;padding:12px 26px;border-radius:12px;font-weight:800;font-size:14px;transition:.22s;box-shadow:0 8px 22px rgba(124,58,237,.38)}
.bz-primary:hover{transform:translateY(-2px);box-shadow:0 14px 30px rgba(124,58,237,.5);filter:brightness(1.06)}
.bz-ghost{background:#f1f5f9;border:1px solid #e2e8f0;color:#475569;padding:11px 22px;border-radius:11px;font-weight:800;font-size:13px;transition:.2s}
.bz-ghost:hover{background:#e2e8f0;color:#0f172a}
.bz-input{width:100%;padding:12px 14px;border-radius:11px;border:1.5px solid #e2e8f0;font-size:14px;outline:none;transition:.2s;background:#f8fafc;color:#0f172a}
.bz-input:focus{border-color:#8b5cf6;background:#fff;box-shadow:0 0 0 3px rgba(139,92,246,.16)}

/* ---------- FEATURES ---------- */
.bz-features{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin:32px 0 8px}
.bz-feature{display:flex;align-items:center;gap:13px;background:#fff;border:1px solid #e8ecf3;border-radius:14px;padding:16px 18px;transition:.25s}
.bz-feature:hover{transform:translateY(-4px);box-shadow:0 14px 32px rgba(15,23,42,.1);border-color:#ddd6fe}
.bz-feature-icon{font-size:26px}
.bz-feature b{display:block;font-size:13.5px;color:#0f172a}
.bz-feature small{font-size:11.5px;color:#94a3b8;font-weight:600}

/* ---------- DRAWER ---------- */
.bz-overlay{position:fixed;inset:0;background:rgba(15,23,42,.55);backdrop-filter:blur(3px);z-index:190;animation:bzFade .25s ease}
.bz-drawer{position:fixed;top:0;bottom:0;left:0;width:305px;max-width:86vw;background:#fff;z-index:200;box-shadow:0 0 50px rgba(0,0,0,.3);animation:bzSlideL .32s cubic-bezier(.22,1,.36,1);display:flex;flex-direction:column;overflow-y:auto}
.bz-drawer.right{left:auto;right:0;width:410px;max-width:93vw;animation:bzSlideR .32s cubic-bezier(.22,1,.36,1)}
.bz-drawer-head{display:flex;align-items:center;justify-content:space-between;padding:18px 20px;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;position:sticky;top:0;z-index:2}
.bz-drawer-head h3{font-size:16px;font-weight:800;display:flex;align-items:center;gap:8px}
.bz-close{width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.18);border:none;color:#fff;font-size:15px;display:flex;align-items:center;justify-content:center;transition:.25s}
.bz-close:hover{background:rgba(255,255,255,.38);transform:rotate(90deg)}
.bz-drawer-user{display:flex;align-items:center;gap:12px;padding:16px 20px;background:linear-gradient(135deg,#eef2ff,#f5f3ff);border-bottom:1px solid #e2e8f0}
.bz-avatar{width:46px;height:46px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#a855f7);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:18px;box-shadow:0 6px 18px rgba(124,58,237,.38);flex-shrink:0}
.bz-drawer-title{font-size:11px;font-weight:800;letter-spacing:1px;color:#94a3b8;padding:16px 20px 8px;text-transform:uppercase}
.bz-menu-link{display:flex;align-items:center;gap:12px;padding:13px 20px;font-size:14px;font-weight:700;color:#334155;border-bottom:1px solid #f1f5f9;transition:.22s;width:100%;text-align:left}
.bz-menu-link:hover{background:#f5f3ff;color:#6d28d9;padding-left:27px}

/* ---------- CART ITEMS ---------- */
.bz-cart-item{display:flex;gap:12px;padding:14px 20px;border-bottom:1px solid #f1f5f9;animation:bzUp .3s ease both}
.bz-cart-thumb{width:58px;height:58px;border-radius:13px;background:linear-gradient(135deg,#eef2ff,#f5f3ff);display:flex;align-items:center;justify-content:center;font-size:28px;flex-shrink:0}
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

/* ---------- MODAL ---------- */
.bz-modal{position:fixed;inset:0;z-index:210;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(15,23,42,.6);backdrop-filter:blur(4px);animation:bzFade .2s ease}
.bz-modal-card{background:#fff;border-radius:18px;width:100%;max-width:560px;max-height:92vh;overflow-y:auto;box-shadow:0 30px 90px rgba(15,23,42,.4);animation:bzPop .3s cubic-bezier(.22,1,.36,1);position:relative}
.bz-modal-img{height:230px;display:flex;align-items:center;justify-content:center;font-size:110px;background:linear-gradient(135deg,#eef2ff,#f5f3ff 50%,#fdf2f8);animation:bzFloat 4s ease-in-out infinite}
.bz-modal-actions{display:flex;gap:10px}
.bz-modal-actions>*{flex:1}

/* ---------- TOAST ---------- */
.bz-toast{position:fixed;left:50%;bottom:26px;transform:translateX(-50%);z-index:300;background:#0f172a;color:#fff;padding:12px 20px;border-radius:12px;font-size:13.5px;font-weight:700;box-shadow:0 16px 44px rgba(15,23,42,.45);display:flex;align-items:center;gap:9px;animation:bzToast .3s cubic-bezier(.22,1,.36,1);max-width:92vw}
.bz-toast.success{background:linear-gradient(135deg,#16a34a,#15803d)}
.bz-toast.error{background:linear-gradient(135deg,#dc2626,#b91c1c)}

/* ---------- INFO PAGE ---------- */
.bz-info{max-width:840px;margin:0 auto;background:#fff;border-radius:18px;padding:34px;box-shadow:0 14px 34px rgba(15,23,42,.07);animation:bzUp .35s ease both;border:1px solid #e8ecf3}
.bz-info h1{font-size:26px;margin-bottom:16px;background:linear-gradient(135deg,#4f46e5,#a855f7);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:800}
.bz-info p{white-space:pre-line;line-height:1.8;color:#334155;font-size:14px}
.bz-back{display:inline-flex;align-items:center;gap:6px;margin-bottom:18px;background:#f1f5f9;border:1px solid #e2e8f0;padding:9px 16px;border-radius:10px;font-weight:800;font-size:13px;color:#475569;transition:.22s}
.bz-back:hover{background:#ede9fe;color:#6d28d9;border-color:#ddd6fe;transform:translateX(-3px)}

/* ---------- FOOTER ---------- */
.bz-footer{background:#0f172a;color:#cbd5e1;margin-top:auto;position:relative;overflow:hidden}
.bz-footer::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,#6366f1,#a855f7,#f97316,#6366f1);background-size:300% 100%;animation:bzGrad 6s linear infinite}
.bz-footer-inner{max-width:1280px;margin:0 auto;padding:44px 18px 24px;display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:28px}
.bz-foot-title{font-size:11.5px;font-weight:800;letter-spacing:1.2px;color:#64748b;margin-bottom:12px}
.bz-flink{display:block;font-size:13px;color:#94a3b8;padding:5px 0;transition:.22s;text-align:left;font-weight:600}
.bz-flink:hover{color:#fff;transform:translateX(5px)}
.bz-social{width:36px;height:36px;border-radius:50%;background:#1e293b;display:flex;align-items:center;justify-content:center;font-size:15px;transition:.22s}
.bz-social:hover{background:linear-gradient(135deg,#6366f1,#a855f7);transform:translateY(-3px);box-shadow:0 8px 18px rgba(124,58,237,.4)}
.bz-news{display:flex;gap:8px;max-width:340px;margin-top:10px}
.bz-news input{flex:1;padding:10px 14px;border-radius:10px;border:1px solid #334155;background:#1e293b;color:#fff;font-size:13px;outline:none;min-width:0}
.bz-news input:focus{border-color:#8b5cf6;box-shadow:0 0 0 3px rgba(139,92,246,.22)}
.bz-foot-bottom{max-width:1280px;margin:0 auto;border-top:1px solid #1e293b;padding:18px 18px 10px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;font-size:12px;color:#94a3b8;font-weight:600}
.bz-foot-note{max-width:1280px;margin:0 auto;padding:0 18px 26px;font-size:11px;color:#64748b;line-height:1.6}

/* ---------- RESPONSIVE ---------- */
@media (max-width:900px){
  .bz-hamburger{display:flex}
  .bz-desktop-search{display:none!important}
  .bz-mobile-search{display:flex}
  .bz-header-inner{padding:10px 14px;gap:9px}
  .bz-logo b{font-size:21px}
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
  .bz-card-img{height:130px;font-size:54px}
  .bz-card-body{padding:10px 10px 12px;gap:6px}
  .bz-card-title{font-size:12.5px;min-height:34px}
  .bz-price b{font-size:16px}
  .bz-btn-cart,.bz-btn-buy{font-size:11px;padding:9px 4px}
  .bz-section-head h2{font-size:18px}
  .bz-info{padding:22px 18px;border-radius:14px}
  .bz-info h1{font-size:21px}
  .bz-modal-img{height:180px;font-size:80px}
  .bz-topstrip{font-size:10.5px;padding:5px 12px}
}
`;

/* ============================================================
   COMPONENT
============================================================ */
export default function Home() {
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [page, setPage] = useState(null);
  const [slide, setSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState("00:00:00");
  const [toast, setToast] = useState(null);
  const [newProd, setNewProd] = useState({ title: "", price: "", old: "", cat: "Mobiles", img: "📦", link: "" });

  /* ---------- INIT ---------- */
  useEffect(() => {
    try {
      const sp = localStorage.getItem("bazaru_products");
      if (sp) setProducts(JSON.parse(sp));
      const su = localStorage.getItem("bazaru_user");
      if (su) setUser(JSON.parse(su));
      const sc = localStorage.getItem("bazaru_cart");
      if (sc) setCart(JSON.parse(sc).map(c => ({ ...c, qty: c.qty || 1 })));
      const sw = localStorage.getItem("bazaru_wish");
      if (sw) setWishlist(JSON.parse(sw));
    } catch (e) {}
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

  /* ---------- HERO AUTO SLIDE ---------- */
  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 4200);
    return () => clearInterval(t);
  }, []);

  /* ---------- TOAST AUTO HIDE ---------- */
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2300);
    return () => clearTimeout(t);
  }, [toast]);

  /* ---------- SCROLL LOCK ---------- */
  const anyOpen = menuOpen || showCart || showWish || showLogin || showAdmin || !!selected;
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = anyOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [anyOpen]);

  /* ---------- HELPERS ---------- */
  const notify = (msg, type = "success") => setToast({ msg, type, id: Date.now() });

  const saveProducts = (list) => { setProducts(list); localStorage.setItem("bazaru_products", JSON.stringify(list)); };
  const saveCart = (list) => { setCart(list); localStorage.setItem("bazaru_cart", JSON.stringify(list)); };
  const saveWish = (list) => { setWishlist(list); localStorage.setItem("bazaru_wish", JSON.stringify(list)); };

  const goHome = () => { setPage(null); setCat("All"); setSearch(""); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const goTo = (p) => { setPage(p); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const addToCart = (p) => {
    const exists = cart.find(c => c.id === p.id);
    const next = exists
      ? cart.map(c => c.id === p.id ? { ...c, qty: c.qty + 1 } : c)
      : [...cart, { id: p.id, title: p.title, price: p.price, img: p.img, qty: 1 }];
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

  const handleLogin = () => {
    if (!email.trim()) return notify("Enter your email", "error");
    const u = { email: email.trim(), name: email.split("@")[0] };
    setUser(u);
    localStorage.setItem("bazaru_user", JSON.stringify(u));
    setShowLogin(false); setEmail("");
    notify(`Welcome, ${u.name}! 👋`);
  };
  const logout = () => { setUser(null); localStorage.removeItem("bazaru_user"); notify("Logged out", "error"); };

  const handleAdminLogin = () => {
    if (adminPass === "admin123") { setIsAdmin(true); notify("Admin logged in ⚙️"); }
    else notify("Wrong password! Default: admin123", "error");
  };
  const addProduct = () => {
    if (!newProd.title || !newProd.price) return notify("Fill title & price", "error");
    const p = {
      id: Date.now(),
      title: newProd.title,
      price: Number(newProd.price),
      old: Number(newProd.old) || Number(newProd.price) * 2,
      rating: 4.5, reviews: 100,
      cat: newProd.cat,
      img: newProd.img || "📦",
      link: newProd.link || "#",
      desc: "New arrival from Bazaru.",
    };
    saveProducts([p, ...products]);
    setNewProd({ title: "", price: "", old: "", cat: "Mobiles", img: "📦", link: "" });
    notify("Product added ✅");
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
      (cat === "All" || p.cat === cat) &&
      p.title.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "discount") list = [...list].sort((a, b) => (1 - a.price / a.old) - (1 - b.price / b.old));
    return list;
  }, [products, cat, search, sort]);

  const off = (p) => Math.round((1 - p.price / p.old) * 100);

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
              <b>BAZARU</b>
              <span>Explore Plus+</span>
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
              {/* HERO SLIDER */}
              <div className="bz-hero" style={{ backgroundImage: SLIDES[slide].bg }}>
                <div className="bz-hero-content" key={slide}>
                  <h1>{SLIDES[slide].title}</h1>
                  <p>{SLIDES[slide].sub}</p>
                  <button className="bz-ghost" style={{ background: "#fff", color: "#4f46e5", border: "none", fontWeight: 800 }} onClick={() => document.querySelector(".bz-grid")?.scrollIntoView({ behavior: "smooth" })}>
                    {SLIDES[slide].cta} →
                  </button>
                </div>
                <div className="bz-hero-emoji">{SLIDES[slide].emoji}</div>
                <div className="bz-hero-dots">
                  {SLIDES.map((_, i) => (
                    <span key={i} className={`bz-dot ${i === slide ? "active" : ""}`} onClick={() => setSlide(i)} />
                  ))}
                </div>
              </div>

              {/* SECTION HEAD */}
              <div className="bz-section-head">
                <div>
                  <h2>🔥 Trending Deals</h2>
                  <span className="bz-count">{filtered.length} products found</span>
                </div>
                <select className="bz-select" value={sort} onChange={e => setSort(e.target.value)}>
                  <option value="popular">Popularity</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="discount">Biggest Discount</option>
                </select>
              </div>

              {/* PRODUCT GRID */}
              {filtered.length === 0 ? (
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
                        <span>{p.img}</span>
                      </div>

                      <div className="bz-card-body">
                        <div className="bz-card-title" onClick={() => setSelected(p)}>{p.title}</div>

                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span className="bz-rate">{p.rating} ★</span>
                          <span className="bz-reviews">({p.reviews.toLocaleString()})</span>
                        </div>

                        <div className="bz-price">
                          <b>₹{p.price}</b>
                          <s>₹{p.old}</s>
                          <em>{off(p)}% off</em>
                        </div>

                        <div style={{ fontSize: 11, color: "#7c3aed", fontWeight: 700 }}>
                          🚚 Free Delivery • Bank Offer
                        </div>

                        <div className="bz-card-actions">
                          <button className="bz-btn-cart" onClick={() => addToCart(p)}>ADD TO CART</button>
                          <a className="bz-btn-buy" href={p.link} target="_blank" rel="noopener noreferrer">BUY NOW</a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TRUST FEATURES */}
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
                <b>BAZARU</b>
                <span>Explore Plus+</span>
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
              <button className="bz-flink" onClick={() => setShowAdmin(true)}>Admin Panel</button>
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
              <button className="bz-menu-link" onClick={() => { setMenuOpen(false); setShowAdmin(true); }}><span>⚙️</span>Admin Panel</button>
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
                      <div className="bz-cart-thumb">{item.img}</div>
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
                      <div className="bz-cart-thumb">{item.img}</div>
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
                style={{ position: "absolute", top: 12, right: 12, background: "rgba(15,23,42,.08)", color: "#0f172a", zIndex: 5 }}
                onClick={() => setSelected(null)}
              >✕</button>

              <div className="bz-modal-img">{selected.img}</div>

              <div style={{ padding: 22 }}>
                <h2 style={{ fontSize: 19, lineHeight: 1.35, fontWeight: 800 }}>{selected.title}</h2>

                <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "10px 0" }}>
                  <span className="bz-rate">{selected.rating} ★</span>
                  <span className="bz-reviews">{selected.reviews.toLocaleString()} ratings</span>
                  <span style={{ fontSize: 11, color: "#16a34a", fontWeight: 800 }}>✔ Verified</span>
                </div>

                <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.65 }}>{selected.desc}</p>

                <div className="bz-price" style={{ margin: "14px 0" }}>
                  <b style={{ fontSize: 26 }}>₹{selected.price}</b>
                  <s>₹{selected.old}</s>
                  <em>{off(selected)}% off</em>
                </div>

                <div className="bz-modal-actions">
                  <button className="bz-btn-cart" onClick={() => addToCart(selected)}>ADD TO CART</button>
                  <a className="bz-btn-buy" href={selected.link} target="_blank" rel="noopener noreferrer">BUY NOW →</a>
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

                <input
                  className="bz-input"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  type="email"
                />

                <button className="bz-primary" style={{ width: "100%", marginTop: 12 }} onClick={handleLogin}>
                  LOGIN
                </button>
                <button className="bz-ghost" style={{ width: "100%", marginTop: 8 }} onClick={() => setShowLogin(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= ADMIN MODAL ================= */}
        {showAdmin && (
          <div className="bz-modal" onClick={() => setShowAdmin(false)}>
            <div className="bz-modal-card" style={{ maxWidth: 660 }} onClick={e => e.stopPropagation()}>
              <div className="bz-drawer-head">
                <h3>⚙️ Admin Panel</h3>
                <button className="bz-close" onClick={() => setShowAdmin(false)}>✕</button>
              </div>

              <div style={{ padding: 22 }}>
                {!isAdmin ? (
                  <div>
                    <p style={{ fontSize: 13, color: "#475569", marginBottom: 12, fontWeight: 600 }}>
                      Default Password: <b style={{ color: "#7c3aed" }}>admin123</b>
                    </p>
                    <input
                      className="bz-input"
                      type="password"
                      value={adminPass}
                      onChange={e => setAdminPass(e.target.value)}
                      placeholder="Enter admin password"
                    />
                    <button className="bz-primary" style={{ width: "100%", marginTop: 12 }} onClick={handleAdminLogin}>
                      LOGIN AS ADMIN
                    </button>
                  </div>
                ) : (
                  <div>
                    <h4 style={{ fontSize: 15, fontWeight: 800, marginBottom: 12 }}>➕ Add New Product</h4>

                    <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                      <input className="bz-input" value={newProd.title} onChange={e => setNewProd({ ...newProd, title: e.target.value })} placeholder="Product title" />
                      <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
                        <input className="bz-input" style={{ flex: 1, minWidth: 110 }} value={newProd.price} onChange={e => setNewProd({ ...newProd, price: e.target.value })} placeholder="Price ₹" type="number" />
                        <input className="bz-input" style={{ flex: 1, minWidth: 110 }} value={newProd.old} onChange={e => setNewProd({ ...newProd, old: e.target.value })} placeholder="Old Price ₹" type="number" />
                        <select className="bz-select" value={newProd.cat} onChange={e => setNewProd({ ...newProd, cat: e.target.value })}>
                          <option>Mobiles</option><option>Fashion</option><option>Electronics</option><option>Home</option><option>Beauty</option>
                        </select>
                      </div>
                      <input className="bz-input" value={newProd.link} onChange={e => setNewProd({ ...newProd, link: e.target.value })} placeholder="Partner / EarnKaro link" />
                      <button className="bz-primary" onClick={addProduct}>+ ADD PRODUCT</button>
                    </div>

                    <h4 style={{ fontSize: 15, fontWeight: 800, margin: "20px 0 10px" }}>
                      📦 Manage Products ({products.length})
                    </h4>
                    <div style={{ maxHeight: 260, overflowY: "auto", border: "1px solid #e2e8f0", borderRadius: 12 }}>
                      {products.map(p => (
                        <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "space-between", padding: "10px 12px", borderBottom: "1px solid #f1f5f9" }}>
                          <span style={{ fontSize: 13, fontWeight: 700, flex: 1, minWidth: 0 }}>
                            {p.img} {p.title} — <b>₹{p.price}</b>
                          </span>
                          <button
                            style={{ background: "#fee2e2", color: "#dc2626", padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 800 }}
                            onClick={() => { saveProducts(products.filter(x => x.id !== p.id)); notify("Product deleted", "error"); }}
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
