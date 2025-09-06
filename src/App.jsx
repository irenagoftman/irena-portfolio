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
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        <a href="#top" className="h-serif text-lg">Irena Goftman</a>
        <nav className="hidden md:flex gap-6 text-sm">
          <a href="#gallery" className="hover:opacity-70">Gallery</a>
          <a href="#about" className="hover:opacity-70">About</a>
          <a href="#contact" className="hover:opacity-70">Contact</a>
        </nav>
      </div>
    </div>
  )
}

function Hero(){
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-14 md:py-20 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="h-serif text-4xl md:text-6xl leading-tight">Gallery of Color & Form</h1>
          <p className="mt-4 text-neutral-600 md:text-lg">
            Expressive portraits and cubist abstractions. Curated like a museum wall, with soft matting and classic frames.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#gallery" className="rounded-xl bg-black text-white px-5 py-2.5 text-sm shadow hover:opacity-90">View Gallery</a>
            <a href="#contact" className="rounded-xl border border-neutral-300 bg-white px-5 py-2.5 text-sm hover:bg-neutral-50">Inquiries</a>
          </div>
        </div>
        <div className="frame art-shadow">
          <img src="/artworks/1.jpg" alt="Featured" className="w-full h-auto object-cover"/>
        </div>
      </div>
    </section>
  )
}

function Modal({item, onClose}){
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} className="bg-white rounded-3xl max-w-5xl w-full overflow-hidden grid md:grid-cols-2">
        <div className="frame">
          <img src={item.image} alt={item.title} className="w-full h-full object-contain"/>
        </div>
        <div className="p-6 md:p-8">
          <h3 className="h-serif text-2xl">{item.title}</h3>
          <p className="text-neutral-600 mt-1">{item.year} • {item.medium} • {item.size}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {item.category.map(t => <span key={t} className="tag">{t}</span>)}
          </div>
          <a href={`mailto:${EMAIL}?subject=${encodeURIComponent('Art inquiry: '+item.title)}`}
             className="mt-6 inline-block rounded-xl bg-black text-white px-5 py-2.5 text-sm">Purchase / Inquiry</a>
          <button onClick={onClose} className="mt-3 ml-3 inline-block rounded-xl border px-5 py-2.5 text-sm">Close</button>
        </div>
      </div>
    </div>
  )
}

function About(){
  return (
    <section id="about" className="max-w-5xl mx-auto px-4 md:px-6 py-14">
      <h2 className="h-serif text-3xl">About the Artist</h2>
      <p className="mt-4 text-neutral-700 leading-relaxed">
        Irena Goftman explores emotion and geometry through color-forward portraits and cubist abstractions.
      </p>
      <p className="mt-4 text-neutral-700 leading-relaxed">
        <i>
          To create on my own is not just an opportunity for me to convey feelings and emotions hidden deep in my soul,
          but also to add bright colors to the lives of people who will hang my paintings in their homes, look at them
          and find something personal for themselves.
        </i>
      </p>
    </section>
  )
}

function Contact(){
  return (
    <section id="contact" className="max-w-5xl mx-auto px-4 md:px-6 pb-14">
      <div className="rounded-3xl bg-white/80 border p-6 md:p-10">
        <h2 className="h-serif text-3xl">Inquiries & Commissions</h2>
        <p className="mt-2 text-neutral-600">
          Write me: <a className="underline" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </p>
      </div>
    </section>
  )
}

function Footer(){
  return (
    <footer className="py-10 text-center text-sm text-neutral-500 border-t">
      © {new Date().getFullYear()} Irena Goftman — All rights reserved.
    </footer>
  )
}
