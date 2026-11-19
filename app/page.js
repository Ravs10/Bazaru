"use client";
import { useState, useEffect } from "react";

const DEFAULT_PRODUCTS = [
  { id: 1, title: "Wireless Bluetooth Earbuds - Black", price: 499, old: 1999, rating: 4.3, reviews: 12450, cat: "Mobiles", img: "🎧", link: "https://earn-karo.com/your-link-1", desc: "True wireless earbuds with 32H playtime, Bluetooth 5.3, noise cancellation and mic." },
  { id: 2, title: "Men's Stylish Cotton T-Shirt", price: 299, old: 999, rating: 4.1, reviews: 8930, cat: "Fashion", img: "👕", link: "https://earn-karo.com/your-link-2", desc: "Premium cotton, regular fit, comfortable for daily wear." },
  { id: 3, title: "Smart Watch with Fitness Tracker", price: 999, old: 3999, rating: 4.5, reviews: 23400, cat: "Electronics", img: "⌚", link: "https://earn-karo.com/your-link-3", desc: "1.85 inch HD display, heart rate, SpO2, sleep tracking, 7 days battery." },
  { id: 4, title: "Women's Kurti - Beautiful Design", price: 449, old: 1499, rating: 4.2, reviews: 6700, cat: "Fashion", img: "👗", link: "https://earn-karo.com/your-link-4", desc: "Elegant printed kurti, soft fabric, perfect for festive and daily wear." },
  { id: 5, title: "Air Fryer - Healthy Cooking 4L", price: 2499, old: 5999, rating: 4.4, reviews: 9800, cat: "Home", img: "🍳", link: "https://earn-karo.com/your-link-5", desc: "Oil-free cooking, 8 preset modes, 4L capacity for full family." },
  { id: 6, title: "Face Wash + Serum Combo Pack", price: 349, old: 899, rating: 4.0, reviews: 4500, cat: "Beauty", img: "🧴", link: "https://earn-karo.com/your-link-6", desc: "Vitamin C face wash + Hyaluronic serum for glowing skin." },
  { id: 7, title: "Running Sports Shoes - Lightweight", price: 799, old: 2499, rating: 4.3, reviews: 15200, cat: "Fashion", img: "👟", link: "https://earn-karo.com/your-link-7", desc: "Ultra-light, breathable mesh, anti-skid sole for running & gym." },
  { id: 8, title: "Bluetooth Speaker - Bass Boost", price: 899, old: 2999, rating: 4.6, reviews: 31200, cat: "Electronics", img: "🔊", link: "https://earn-karo.com/your-link-8", desc: "16W speaker, deep bass, 12H battery, waterproof IPX5." },
];

export default function Home() {
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState("popular");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [newProd, setNewProd] = useState({ title: "", price: "", old: "", cat: "Mobiles", img: "📦", link: "" });

  useEffect(() => {
    const saved = localStorage.getItem("bazaru_products");
    if (saved) setProducts(JSON.parse(saved));
    const savedUser = localStorage.getItem("bazaru_user");
    if (savedUser) setUser(JSON.parse(savedUser));
    const savedCart = localStorage.getItem("bazaru_cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  const saveProducts = (list) => { setProducts(list); localStorage.setItem("bazaru_products", JSON.stringify(list)); };
  const saveCart = (list) => { setCart(list); localStorage.setItem("bazaru_cart", JSON.stringify(list)); };

  let filtered = products.filter(p => (cat === "All" || p.cat === cat) && p.title.toLowerCase().includes(search.toLowerCase()));
  if (sort === "low") filtered.sort((a,b) => a.price - b.price);
  if (sort === "high") filtered.sort((a,b) => b.price - a.price);
  if (sort === "rating") filtered.sort((a,b) => b.rating - a.rating);

  const addToCart = (p) => { const n = [...cart, p]; saveCart(n); alert("Added to Cart"); };
  const toggleWish = (id) => { setWishlist(wishlist.includes(id) ? wishlist.filter(x => x !== id) : [...wishlist, id]); };
  const handleLogin = () => { if(!email) return alert("Enter Email"); const u = { email, name: email.split("@")[0] }; setUser(u); localStorage.setItem("bazaru_user", JSON.stringify(u)); setShowLogin(false); };
  const handleAdminLogin = () => { if(adminPass === "admin123") setIsAdmin(true); else alert("Wrong Password! Default: admin123"); };
  const addProduct = () => { if(!newProd.title || !newProd.price) return alert("Fill Title & Price"); const p = { id: Date.now(), title: newProd.title, price: Number(newProd.price), old: Number(newProd.old) || Number(newProd.price)*2, rating: 4.5, reviews: 100, cat: newProd.cat, img: newProd.img, link: newProd.link || "#", desc: "New arrival from Bazaru." }; saveProducts([p, ...products]); setNewProd({ title: "", price: "", old: "", cat: "Mobiles", img: "📦", link: "" }); alert("Product Added!"); };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#f1f3f6", minHeight: "100vh" }}>
      {/* HEADER */}
      <div style={{ background: "#2874f0", color: "white", padding: "12px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <div style={{ fontSize: "22px", fontWeight: "bold", cursor: "pointer" }} onClick={() => setCat("All")}>BAZARU <span style={{ fontSize: "11px", color: "#ffe500", display: "block" }}>Explore Plus+</span></div>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search for products, brands and more" style={{ flex: 1, minWidth: "180px", padding: "10px", border: "none", borderRadius: "2px" }} />
          {user ? <button onClick={() => { setUser(null); localStorage.removeItem("bazaru_user"); }} style={{ background: "white", color: "#2874f0", border: "none", padding: "8px 20px", fontWeight: "bold", cursor: "pointer" }}>Hi, {user.name} | Logout</button> : <button onClick={() => setShowLogin(true)} style={{ background: "white", color: "#2874f0", border: "none", padding: "8px 30px", fontWeight: "bold", cursor: "pointer" }}>Login</button>}
          <button onClick={() => setShowCart(!showCart)} style={{ background: "none", color: "white", border: "none", fontWeight: "bold", cursor: "pointer" }}>🛒 Cart ({cart.length})</button>
          <button onClick={() => setShowAdmin(!showAdmin)} style={{ background: "#ff9f00", color: "white", border: "none", padding: "8px 14px", fontWeight: "bold", cursor: "pointer", borderRadius: "2px" }}>Admin</button>
        </div>
      </div>

      {/* CATEGORIES */}
      <div style={{ background: "white", display: "flex", gap: "20px", overflowX: "auto", padding: "12px 16px", justifyContent: "center" }}>
        {["All", "Mobiles", "Fashion", "Electronics", "Home", "Beauty"].map(c => (
          <div key={c} onClick={() => setCat(c)} style={{ cursor: "pointer", textAlign: "center", fontWeight: cat === c ? "bold" : "normal", color: cat === c ? "#2874f0" : "black", whiteSpace: "nowrap" }}>{c}</div>
        ))}
      </div>

      {/* BANNER */}
      <div style={{ maxWidth: "1200px", margin: "12px auto", background: "linear-gradient(90deg,#2874f0,#ff9f00)", color: "white", padding: "24px", borderRadius: "8px", textAlign: "center" }}>
        <h2 style={{ margin: 0 }}>Big Saving Days Are Live!</h2><p style={{ margin: "6px 0" }}>Up to 80% Off + Extra Discount on Top Brands</p>
        <span style={{ background: "white", color: "#2874f0", padding: "8px 20px", borderRadius: "4px", fontWeight: "bold", display: "inline-block" }}>SHOP NOW</span>
      </div>

      {/* FILTERS */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 12px", display: "flex", gap: "10px", alignItems: "center" }}>
        <span style={{ fontWeight: "bold" }}>Sort By:</span>
        <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: "8px", borderRadius: "4px" }}>
          <option value="popular">Popularity</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option><option value="rating">Top Rated</option>
        </select>
        <span style={{ fontSize: "13px", color: "#555" }}>{filtered.length} Products Found</span>
      </div>

      {/* ADMIN PANEL */}
      {showAdmin && (
        <div style={{ maxWidth: "1200px", margin: "12px auto", background: "white", padding: "16px", borderRadius: "8px", border: "2px solid #ff9f00" }}>
          {!isAdmin ? <div><h3>Admin Login</h3><p>Default Password: <b>admin123</b> - You can change it later</p><input type="password" value={adminPass} onChange={e => setAdminPass(e.target.value)} placeholder="Enter Admin Password" style={{ padding: "10px", marginRight: "8px" }} /><button onClick={handleAdminLogin} style={{ padding: "10px 20px", background: "#2874f0", color: "white", border: "none" }}>Login as Admin</button></div> :
          <div><h3>Admin Panel - Add New Product</h3>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <input value={newProd.title} onChange={e => setNewProd({...newProd, title: e.target.value})} placeholder="Product Title" style={{ padding: "10px", flex: 1 }} />
              <input value={newProd.price} onChange={e => setNewProd({...newProd, price: e.target.value})} placeholder="Price ₹" style={{ padding: "10px", width: "100px" }} />
              <input value={newProd.old} onChange={e => setNewProd({...newProd, old: e.target.value})} placeholder="Old Price ₹" style={{ padding: "10px", width: "100px" }} />
              <input value={newProd.link} onChange={e => setNewProd({...newProd, link: e.target.value})} placeholder="EarnKaro Link" style={{ padding: "10px", flex: 1 }} />
              <select value={newProd.cat} onChange={e => setNewProd({...newProd, cat: e.target.value})} style={{ padding: "10px" }}><option>Mobiles</option><option>Fashion</option><option>Electronics</option><option>Home</option><option>Beauty</option></select>
              <button onClick={addProduct} style={{ padding: "10px 20px", background: "#fb641b", color: "white", border: "none", fontWeight: "bold" }}>+ ADD PRODUCT</button>
            </div>
            <p style={{ fontSize: "12px", color: "#666" }}>Tip: Paste your EarnKaro affiliate link in the Link field. That link will open when user clicks Buy Now.</p>
            <h4>Manage Products ({products.length})</h4>
            {products.map(p => <div key={p.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px", borderBottom: "1px solid #eee" }}><span>{p.img} {p.title} - ₹{p.price}</span><button onClick={() => saveProducts(products.filter(x => x.id !== p.id))} style={{ background: "red", color: "white", border: "none", padding: "5px 10px" }}>Delete</button></div>)}
          </div>}
        </div>
      )}

      {/* CART DRAWER */}
      {showCart && <div style={{ maxWidth: "1200px", margin: "12px auto", background: "white", padding: "16px", borderRadius: "8px" }}><h3>Your Cart ({cart.length})</h3>{cart.length === 0 ? <p>Cart is empty</p> : cart.map((c,i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px", borderBottom: "1px solid #eee" }}><span>{c.img} {c.title}</span><b>₹{c.price}</b></div>)}<h3>Total: ₹{cart.reduce((a,b) => a+b.price, 0)}</h3></div>}

      {/* PRODUCTS GRID */}
      <div style={{ maxWidth: "1200px", margin: "12px auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px", padding: "0 12px" }}>
        {filtered.map(p => (
          <div key={p.id} style={{ background: "white", borderRadius: "8px", padding: "14px", cursor: "pointer" }}>
            <div onClick={() => setSelected(p)} style={{ textAlign: "center", fontSize: "70px" }}>{p.img}</div>
            <button onClick={() => toggleWish(p.id)} style={{ background: "none", border: "none", float: "right", fontSize: "20px" }}>{wishlist.includes(p.id) ? "❤️" : "🤍"}</button>
            <div onClick={() => setSelected(p)} style={{ fontSize: "14px", minHeight: "40px", marginTop: "8px" }}>{p.title}</div>
            <div style={{ margin: "6px 0" }}><span style={{ background: "green", color: "white", padding: "2px 6px", borderRadius: "4px", fontSize: "12px" }}>{p.rating} ★</span> <span style={{ fontSize: "12px", color: "#888" }}>({p.reviews.toLocaleString()})</span></div>
            <div><b style={{ fontSize: "18px" }}>₹{p.price}</b> <s style={{ color: "#888", fontSize: "13px" }}>₹{p.old}</s> <span style={{ color: "green", fontSize: "13px", fontWeight: "bold" }}>{Math.round((1 - p.price/p.old)*100)}% off</span></div>
            <div style={{ fontSize: "12px", color: "#2874f0", margin: "4px 0" }}>Free Delivery • Bank Offer</div>
            <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
              <button onClick={() => addToCart(p)} style={{ flex: 1, background: "#ff9f00", color: "white", border: "none", padding: "10px", fontWeight: "bold", borderRadius: "2px" }}>ADD TO CART</button>
              <a href={p.link} target="_blank" style={{ flex: 1, background: "#fb641b", color: "white", textAlign: "center", padding: "10px", fontWeight: "bold", textDecoration: "none", borderRadius: "2px" }}>BUY NOW</a>
            </div>
          </div>
        ))}
      </div>

      {/* PRODUCT DETAIL MODAL */}
      {selected && <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: "12px" }} onClick={() => setSelected(null)}><div style={{ background: "white", padding: "20px", borderRadius: "10px", maxWidth: "500px", width: "100%" }} onClick={e => e.stopPropagation()}><div style={{ fontSize: "80px", textAlign: "center" }}>{selected.img}</div><h2>{selected.title}</h2><p>{selected.desc}</p><h3>₹{selected.price} <s>₹{selected.old}</s></h3><a href={selected.link} target="_blank" style={{ display: "block", background: "#fb641b", color: "white", textAlign: "center", padding: "12px", textDecoration: "none", fontWeight: "bold", borderRadius: "4px" }}>BUY NOW - Via EarnKaro Deal →</a><button onClick={() => setSelected(null)} style={{ width: "100%", marginTop: "10px", padding: "10px" }}>Close</button></div></div>}

      {/* LOGIN MODAL */}
      {showLogin && <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200 }}><div style={{ background: "white", padding: "24px", borderRadius: "8px", width: "320px" }}><h3>Login to Bazaru</h3><input value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter Email" style={{ width: "100%", padding: "10px", marginBottom: "10px" }} /><button onClick={handleLogin} style={{ width: "100%", padding: "12px", background: "#fb641b", color: "white", border: "none", fontWeight: "bold" }}>LOGIN</button><button onClick={() => setShowLogin(false)} style={{ width: "100%", marginTop: "8px", padding: "8px" }}>Cancel</button></div></div>}

      <div style={{ textAlign: "center", padding: "24px", color: "#888", fontSize: "12px" }}>© 2026 BAZARU - Best Deals, Top Offers, Free Delivery<br/>Admin Password: admin123 - Change it in code after first login</div>
    </div>
  );
}
