import React, { useMemo, useState } from 'react'
import { artworks, categories } from './data/artworks.js'

const EMAIL = 'your.email@example.com' // החליפי למייל שלך

export default function App() {
  const [active, setActive] = useState('All')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() => {
    return artworks.filter((a) => {
      const inCat = active === 'All' || a.category.includes(active)
      const q = query.trim().toLowerCase()
      const inSearch = !q || [a.title, a.medium, a.size, a.category.join(' ')].join(' ').toLowerCase().includes(q)
      return inCat && inSearch
    })
  }, [active, query])

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900">
      {/* Navbar */}
      <div className="sticky top-0 bg-white/80 backdrop-blur z-10 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#top" className="font-semibold">Irena Goftman</a>
          <nav className="hidden sm:flex gap-6 text-sm">
            <a href="#gallery" className="hover:opacity-70">Gallery</a>
            <a href="#about" className="hover:opacity-70">About</a>
            <a href="#contact" className="hover:opacity-70">Contact</a>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">Expressive Portraits & Cubist Dreams</h1>
          <p className="mt-4 text-neutral-600">Color-forward paintings blending emotion, structure and playful geometry.</p>
          <div className="mt-6 flex gap-3">
            <a href="#gallery" className="px-5 py-2.5 rounded-xl bg-black text-white text-sm">View Gallery</a>
            <a href={`mailto:${EMAIL}`} className="px-5 py-2.5 rounded-xl border text-sm">Commission / Purchase</a>
          </div>
        </div>
        <img src="/artworks/1.jpg" alt="Featured" className="rounded-2xl shadow w-full object-cover" />
      </section>

      {/* Gallery */}
      <section id="gallery" className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl md:text-3xl font-semibold">Gallery</h2>
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((c)=>(
              <button key={c} onClick={()=>setActive(c)}
                className={`px-3 py-1.5 rounded-full text-sm border ${active===c ? 'bg-black text-white border-black' : 'bg-white border-neutral-300'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search title, medium, size…"
               className="mt-4 w-full md:w-1/2 rounded-xl border px-4 py-2" />

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(a=>(
            <button key={a.id} onClick={()=>setSelected(a)} className="text-left">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <img src={a.image} alt={a.title} className="w-full h-56 object-cover" />
                <div className="p-4">
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-semibold">{a.title}</h3>
                    <span className="text-xs text-neutral-500">{a.year}</span>
                  </div>
                  <p className="text-sm text-neutral-600">{a.medium} • {a.size}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <div onClick={()=>setSelected(null)} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-20 flex items-center justify-center p-4">
          <div onClick={(e)=>e.stopPropagation()} className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden grid md:grid-cols-2">
            <img src={selected.image} alt={selected.title} className="w-full h-full object-contain bg-neutral-50" />
            <div className="p-6">
              <h3 className="text-xl font-semibold">{selected.title}</h3>
              <p className="text-neutral-600 mt-1">{selected.year} • {selected.medium} • {selected.size}</p>
              <div className="mt-6 flex gap-3">
                <a className="px-4 py-2 rounded-xl bg-black text-white text-sm" href={`mailto:${EMAIL}?subject=${encodeURIComponent('Art inquiry: '+selected.title)}`}>Purchase / Inquiry</a>
                <button onClick={()=>setSelected(null)} className="px-4 py-2 rounded-xl border text-sm">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* About */}
      <section id="about" className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold">About the Artist</h2>
        <p className="mt-4 text-neutral-700">Irena Goftman is a painter working across portraiture and cubist-inspired abstraction…</p>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-6xl mx-auto px-4 pb-12">
        <div className="rounded-2xl bg-white border p-6">
          <h2 className="text-2xl font-semibold">Inquiries & Commissions</h2>
          <p className="mt-2 text-neutral-600">Write me: <a className="underline" href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
        </div>
      </section>

      <footer className="py-10 text-center text-sm text-neutral-500 border-t">© {new Date().getFullYear()} Irena Goftman</footer>
    </div>
  )
}
