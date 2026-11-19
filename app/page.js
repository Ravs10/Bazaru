import { supabase } from '../lib/supabase'

export default async function Home() {
  const { data: products } = await supabase.from('products').select('*').limit(20)

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: 16 }}>
      <div style={{ background: '#ff6b00', color: 'white', padding: '20px', borderRadius: 12, textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontSize: 32 }}>🛒 BAZARU</h1>
        <p style={{ margin: '8px 0 0' }}>India ka apna Best Deals Wala Website</p>
      </div>

      <h2 style={{ marginTop: 24 }}>🔥 Aaj ke Best Deals</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
        {products?.map((p) => (
          <div key={p.id} style={{ background: 'white', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <img src={p.image_url} alt={p.name} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
            <div style={{ padding: 12 }}>
              <h3 style={{ margin: '0 0 6px', fontSize: 16 }}>{p.name}</h3>
              <p style={{ margin: '0 0 8px', fontSize: 13, color: '#666' }}>{p.description?.slice(0, 60)}...</p>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <b style={{ color: '#ff6b00', fontSize: 18 }}>₹{p.price}</b>
                <s style={{ color: '#999', fontSize: 13 }}>₹{p.original_price}</s>
              </div>
              <a href={p.affiliate_link || '#'} target="_blank" style={{ display: 'block', textAlign: 'center', background: '#ff6b00', color: 'white', padding: '10px', borderRadius: 8, marginTop: 10, textDecoration: 'none', fontWeight: 'bold' }}>
                Buy Now →
              </a>
            </div>
          </div>
        ))}
      </div>

      {!products?.length && <p>Abhi product load nahi hue. Supabase me check karo.</p>}
    </div>
  )
}
