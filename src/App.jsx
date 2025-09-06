import React, { useMemo, useState } from 'react'
import { artworks, categories } from './data/artworks.js'

const EMAIL = 'irenagoftman@gmail.com'

export default function App() {
  const [active, setActive] = useState('All')
  const [query, setQuery]   = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() =>
    artworks.filter(a => {
      const inCat = active === 'All' || a.category.includes(active)
      const q = query.trim().toLowerCase()
      const inSearch = !q || [a.title,a.medium,a.size,a.category.join(' ')].join(' ').toLowerCase().includes(q)
      return inCat && inSearch
    }), [active, query])

  return (
    <div id="top" className="min-h-screen text-neutral-900">
      <Navbar/>
      <Hero/>

      {/* Controls */}
      <section id="gallery" className="max-w-6xl mx-auto px-4 md:px-6 mt-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl md:text-3xl h-serif">Gallery</h2>
          <div className="flex flex-wrap items-center gap-2">
            {categories.map(c => (
              <button key={c} onClick={()=>setActive(c)}
                className={`px-3 py-1.5 rounded-full text-sm border transition
                ${active===c ? 'bg-black text-white border-black' : 'bg-white border-neutral-300 hover:bg-neutral-50'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <input
          value={query} onChange={e=>setQuery(e.target.value)}
          placeholder="Search title, medium, size…"
          className="mt-4 w-full md:w-[420px] rounded-xl border border-neutral-300 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-400"
        />
      </section>

      {/* Masonry-like columns */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-10">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-7">
          {filtered.map(a => (
            <article key={a.id} className="mb-7 break-inside-avoid">
              <button onClick={()=>setSelected(a)} className="w-full text-left group">
                <div className="frame art-shadow overflow-hidden transition-transform duration-200 group-hover:-translate-y-0.5">
                  <img src={a.image} alt={a.title} className="w-full h-auto object-cover"/>
                </div>
                <div className="px-1.5 pt-3">
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-medium h-serif text-lg">{a.title}</h3>
                    <span className="text-xs text-neutral-500">{a.year}</span>
                  </div>
                  <p className="text-sm text-neutral-600">{a.medium} • {a.size}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {a.category.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              </button>
            </article>
          ))}
        </div>
      </section>

      <About/>
      <Contact/>
      <Footer/>

      {selected && <Modal item={selected} onClose={()=>setSelected(null)} />}
    </div>
  )
}

function Navbar(){
  return (
    <div className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
      <div className="max
