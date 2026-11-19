"use client";
import { useState } from "react";

const PRODUCTS = [
  { id: 1, title: "Wireless Bluetooth Earbuds - Black", price: 499, old: 1999, off: "75%", rating: "4.3", cat: "Mobile", img: "🎧", link: "https://earn-karo.com/apna-link-yaha-dalo-1" },
  { id: 2, title: "Men's Stylish T-Shirt - Cotton", price: 299, old: 999, off: "70%", rating: "4.1", cat: "Fashion", img: "👕", link: "https://earn-karo.com/apna-link-yaha-dalo-2" },
  { id: 3, title: "Smart Watch with Fitness Tracker", price: 999, old: 3999, off: "75%", rating: "4.5", cat: "Mobile", img: "⌚", link: "https://earn-karo.com/apna-link-yaha-dalo-3" },
  { id: 4, title: "Women's Kurti - Beautiful Design", price: 449, old: 1499, off: "70%", rating: "4.2", cat: "Fashion", img: "👗", link: "https://earn-karo.com/apna-link-yaha-dalo-4" },
  { id: 5, title: "Air Fryer - Healthy Cooking", price: 2499, old: 5999, off: "58%", rating: "4.4", cat: "Home", img: "🍳", link: "https://earn-karo.com/apna-link-yaha-dalo-5" },
  { id: 6, title: "Face Wash + Serum Combo", price: 349, old: 899, off: "61%", rating: "4.0", cat: "Beauty", img: "🧴", link: "https://earn-karo.com/apna-link-yaha-dalo-6" },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const filtered = PRODUCTS.filter(p => (cat === "All" || p.cat === cat) && p.title.toLowerCase().includes(search.toLowerCase()));
  return (
    <div style={{fontFamily: 'sans-serif', background: '#f2f2f2', minHeight: '100vh'}}>
      <div style={{background: '#FF6B00', padding: '20px', textAlign: 'center', color: 'white'}}>
        <h1 style={{margin: 0, fontSize: '32px'}}>🛒 BAZARU</h1>
        <p style={{margin: '5px 0'}}>India ka apna Best Deals Wala Website</p>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search - Earbuds, T-Shirt, Watch..." style={{width: '90%', maxWidth: '500px', padding: '12px', borderRadius: '8px', border: 'none', marginTop: '10px'}} />
      </div>
      <div style={{display: 'flex', gap: '8px', overflowX: 'auto', padding: '12px', background: 'white'}}>
        {["All","Mobile","Fashion","Beauty","Home"].map(c=>(
          <button key={c} onClick={()=>setCat(c)} style={{padding: '8px 16px', borderRadius: '20px', border: 'none', background: cat===c ? '#FF6B00' : '#eee', color: cat===c ? 'white' : 'black', whiteSpace: 'nowrap'}}>{c}</button>
        ))}
      </div>
      <div style={{background: '#FFE500', margin: '12px', padding: '15px', borderRadius: '10px', textAlign: 'center'}}>
        <b>🔥 LOOT LO OFFER - 70% Tak Off 🔥</b><br/><small>Roz naye deals - EarnKaro se best price</small>
      </div>
      <h2 style={{padding: '0 12px'}}>🔥 Aaj ke Best Deals</h2>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', padding: '12px'}}>
        {filtered.map(p=>(
          <div key={p.id} style={{background: 'white', borderRadius: '12px', padding: '12px', textAlign: 'center'}}>
            <div style={{fontSize: '50px'}}>{p.img}</div>
            <div style={{fontSize: '13px', minHeight: '36px', textAlign: 'left'}}>{p.title}</div>
            <div style={{textAlign: 'left', margin: '6px 0'}}><b style={{fontSize: '18px'}}>₹{p.price}</b> <s style={{color: '#888', fontSize: '12px'}}>₹{p.old}</s> <span style={{color: 'green', fontSize: '12px', fontWeight: 'bold'}}>{p.off} OFF</span></div>
            <div style={{textAlign: 'left', fontSize: '12px'}}>⭐ {p.rating} | {p.cat}</div>
            <a href={p.link} target="_blank" style={{display: 'block', background: '#FF6B00', color: 'white', padding: '10px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', marginTop: '8px'}}>Deal Dekho →</a>
          </div>
        ))}
      </div>
      <div style={{textAlign: 'center', padding: '20px', color: '#888', fontSize: '12px'}}>© 2026 BAZARU - Best Deals Everyday</div>
    </div>
  );
}
