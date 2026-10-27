'use client'

import { useRef, useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronDown,
  Download,
  FileImage,
  FolderOpen,
  Gauge,
  Image as ImageIcon,
  Layers3,
  LockKeyhole,
  Menu,
  MousePointer2,
  Play,
  Sparkles,
  UploadCloud,
  X,
  Zap,
} from 'lucide-react'

const sampleImages = [
  { src: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=80', label: 'Product photography', color: 'from-cyan-400/20' },
  { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80', label: 'Portrait photography', color: 'from-purple-400/20' },
  { src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80', label: 'E-commerce ready', color: 'from-blue-400/20' },
]

const features = [
  { icon: MousePointer2, title: 'One-click removal', text: 'Clean, precise cutouts without complicated editing tools.' },
  { icon: Sparkles, title: 'Pixel-perfect results', text: 'Preserve fine edges, hair, and product details with clarity.' },
  { icon: Zap, title: 'Lightning fast', text: 'Go from upload to transparent PNG in a few seconds.' },
  { icon: FileImage, title: 'Every format', text: 'JPG, PNG, and WEBP files supported up to 10 MB.' },
  { icon: LockKeyhole, title: 'Private by default', text: 'Uploads are handled securely and cleared automatically.' },
  { icon: Download, title: 'Ready to use', text: 'Download clean transparent images for any workflow.' },
]

function Logo() {
  return <a href="#top" className="flex items-center gap-2.5" aria-label="SnapCut AI home"><span className="grid size-8 place-items-center rounded-[10px] bg-gradient-to-br from-cyan-300 to-blue-600 shadow-[0_0_24px_rgba(14,165,255,.35)]"><Sparkles className="size-4 text-slate-950" /></span><span className="text-[17px] font-semibold tracking-[-.03em] text-white">SnapCut <span className="text-cyan-300">AI</span></span></a>
}

function UploadCard() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)

  function selectFile(next: File | undefined) {
    if (!next) return
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(next.type)) return setError('Please choose a JPG, PNG, or WEBP image.')
    if (next.size > 10 * 1024 * 1024) return setError('That file is larger than the 10 MB limit.')
    setError(''); setFile(next); setProgress(0)
    const interval = window.setInterval(() => setProgress((current) => { if (current >= 100) { window.clearInterval(interval); return 100 }; return current + 20 }), 150)
  }

  return <div className="relative mx-auto w-full max-w-[540px]">
    <div className="absolute -inset-5 rounded-[30px] bg-cyan-400/10 blur-3xl" />
    <div className="relative overflow-hidden rounded-[18px] border border-white/10 bg-[#0b1427]/90 p-3 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
      <div className="mb-3 flex items-center justify-between px-3 py-1.5"><div className="flex items-center gap-2"><span className="size-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#22d3ee]" /><span className="text-[11px] font-medium uppercase tracking-[.16em] text-slate-400">Image workspace</span></div><span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-slate-500">Demo mode</span></div>
      {file && progress === 100 ? <div className="checkerboard flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-cyan-300/20 p-8 text-center"><div className="mb-4 grid size-14 place-items-center rounded-full bg-cyan-400/15 text-cyan-300"><Check /></div><p className="font-medium text-white">Background removed</p><p className="mt-1 text-sm text-slate-400">Your transparent image is ready.</p><div className="mt-6 flex gap-2"><button className="button-primary"><Download className="size-4" /> Download PNG</button><button onClick={() => { setFile(null); setProgress(0) }} className="button-ghost">Start over</button></div></div> : <div onDragOver={(e) => { e.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)} onDrop={(e) => { e.preventDefault(); setDragging(false); selectFile(e.dataTransfer.files[0]) }} className={`flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center transition ${dragging ? 'border-cyan-300 bg-cyan-300/10' : 'border-white/15 bg-white/[.02]'}`}>
        {file ? <><div className="mb-5 grid size-14 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-300"><Gauge className="size-6 animate-pulse" /></div><p className="font-medium text-white">Removing background…</p><div className="mt-5 h-1.5 w-48 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all" style={{ width: `${progress}%` }} /></div><p className="mt-2 text-xs text-slate-500">AI precision processing · {progress}%</p></> : <><div className="mb-5 grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-purple-400/20 text-cyan-200"><UploadCloud className="size-6" /></div><p className="text-base font-medium text-white">Drop your image here</p><p className="mt-1 text-sm text-slate-500">or choose a file from your device</p><button onClick={() => inputRef.current?.click()} className="button-primary mt-6"><FolderOpen className="size-4" /> Browse image</button><input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(e) => selectFile(e.target.files?.[0])} /><p className="mt-5 text-[11px] text-slate-600">JPG, PNG, WEBP <span className="mx-1 text-slate-700">•</span> Max 10 MB</p></>}
      </div>}
      {error && <p role="alert" className="flex items-center gap-2 px-2 pt-3 text-xs text-rose-300"><X className="size-3" />{error}</p>}
    </div>
  </div>
}

function Nav() {
  const [open, setOpen] = useState(false)
  return <header className="sticky top-0 z-50 border-b border-white/[.06] bg-[#020617]/80 backdrop-blur-xl"><div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 lg:px-8"><Logo /><nav className="hidden items-center gap-8 md:flex"><a href="#features" className="nav-link">Features</a><a href="#how" className="nav-link">How it works</a><a href="#pricing" className="nav-link">Pricing</a><a href="#api" className="nav-link">API docs</a></nav><div className="hidden items-center gap-3 md:flex"><a href="#login" className="nav-link">Log in</a><a href="#upload" className="button-primary">Get started <ArrowRight className="size-4" /></a></div><button aria-label="Toggle menu" onClick={() => setOpen(!open)} className="rounded-lg p-2 text-slate-300 md:hidden">{open ? <X /> : <Menu />}</button></div>{open && <nav className="border-t border-white/[.06] px-5 pb-5 pt-3 md:hidden"><div className="flex flex-col gap-4"><a href="#features" className="nav-link">Features</a><a href="#how" className="nav-link">How it works</a><a href="#pricing" className="nav-link">Pricing</a><a href="#api" className="nav-link">API docs</a><a href="#upload" className="button-primary mt-1 justify-center">Get started</a></div></nav>}</header>
}

export default function Page() {
  return <main id="top" className="min-h-screen overflow-hidden bg-[#020617] text-slate-200"><Nav /><section className="relative px-5 pb-24 pt-20 lg:px-8 lg:pb-32 lg:pt-28"><div className="hero-glow" /><div className="mx-auto max-w-6xl"><div className="mx-auto max-w-3xl text-center"><div className="eyebrow"><span className="size-1.5 rounded-full bg-cyan-300" /> The intelligent cutout studio</div><h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.02] tracking-[-.065em] text-white sm:text-6xl lg:text-7xl">Remove backgrounds.<br /><span className="gradient-text">Keep the magic.</span></h1><p className="mx-auto mt-6 max-w-xl text-pretty text-[17px] leading-8 text-slate-400">Remove image backgrounds in seconds with AI-powered precision. Get clean, transparent images ready for your next project.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><a href="#upload" className="button-primary px-5 py-3">Remove background <ArrowRight className="size-4" /></a><a href="#features" className="button-ghost px-5 py-3">Explore features</a></div></div><div id="upload" className="mt-16"><UploadCard /></div><div className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-x-7 gap-y-3 text-xs text-slate-500"><span className="flex items-center gap-2"><Zap className="size-3.5 text-cyan-300" /> Fast AI processing</span><span className="flex items-center gap-2"><BadgeCheck className="size-3.5 text-cyan-300" /> High-quality PNGs</span><span className="flex items-center gap-2"><LockKeyhole className="size-3.5 text-cyan-300" /> Secure handling</span><span className="flex items-center gap-2"><Check className="size-3.5 text-cyan-300" /> No editing skills needed</span></div></div></section><section id="features" className="border-y border-white/[.06] bg-[#071022]/60 px-5 py-24 lg:px-8"><div className="mx-auto max-w-6xl"><div className="max-w-xl"><p className="section-kicker">Built for momentum</p><h2 className="section-title">The fastest path from<br /><span className="gradient-text">idea to image.</span></h2></div><div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{features.map(({ icon: Icon, title, text }) => <article key={title} className="feature-card"><div className="mb-7 grid size-10 place-items-center rounded-xl border border-cyan-300/15 bg-cyan-300/[.07] text-cyan-300"><Icon className="size-[18px]" /></div><h3 className="font-medium text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{text}</p></article>)}</div></div></section><section id="how" className="px-5 py-24 lg:px-8"><div className="mx-auto max-w-6xl"><div className="text-center"><p className="section-kicker">Simple by design</p><h2 className="section-title">Three steps to a <span className="gradient-text">clean canvas.</span></h2></div><div className="mt-14 grid gap-4 md:grid-cols-3">{['Upload your image', 'Let AI do the work', 'Preview and download'].map((title, index) => <div key={title} className="relative rounded-2xl border border-white/[.08] bg-[#0b1427] p-7"><div className="flex items-center justify-between"><span className="text-4xl font-semibold tracking-[-.06em] text-white/15">0{index + 1}</span><div className="grid size-10 place-items-center rounded-xl bg-white/[.04] text-cyan-300">{index === 0 ? <UploadCloud className="size-5" /> : index === 1 ? <Sparkles className="size-5" /> : <Download className="size-5" />}</div></div><h3 className="mt-10 font-medium text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{index === 0 ? 'Drag, drop, and you are ready to go.' : index === 1 ? 'Our model finds the subject and removes the rest.' : 'Make a final check, then save your transparent PNG.'}</p></div>)}</div></div></section><section className="border-y border-white/[.06] bg-[#071022]/60 px-5 py-24 lg:px-8"><div className="mx-auto max-w-6xl"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="section-kicker">See the difference</p><h2 className="section-title">Studio-grade results,<br /><span className="gradient-text">every time.</span></h2></div><a href="#upload" className="button-ghost w-fit">Try your image <ArrowRight className="size-4" /></a></div><div className="mt-12 grid gap-4 md:grid-cols-3">{sampleImages.map((image) => <div key={image.label} className="group overflow-hidden rounded-2xl border border-white/[.08] bg-[#0b1427]"><div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${image.color} to-transparent`}><img src={image.src} alt={image.label} className="h-full w-full object-cover opacity-80 grayscale-[20%] transition duration-500 group-hover:scale-105 group-hover:opacity-100" /><div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0b1427] to-transparent" /><div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs text-slate-300"><span className="grid size-5 place-items-center rounded-md bg-cyan-300/15 text-cyan-300"><Check className="size-3" /></span>{image.label}</div></div></div>)}</div></div></section><section id="pricing" className="px-5 py-24 lg:px-8"><div className="mx-auto max-w-6xl"><div className="text-center"><p className="section-kicker">Simple pricing</p><h2 className="section-title">Choose your <span className="gradient-text">pace.</span></h2><p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-500">Start free, upgrade when your workflow grows. No hidden surprises.</p></div><div className="mx-auto mt-12 grid max-w-5xl gap-4 lg:grid-cols-3">{[{ name: 'Free', price: '$0', sub: 'For occasional cutouts', items: ['5 images per day', 'Standard removal', 'PNG downloads', 'Basic dashboard'] }, { name: 'Pro monthly', price: '$12', sub: 'For creative momentum', items: ['Unlimited processing', 'Priority processing', 'Full history', 'Premium support'], featured: true }, { name: 'Credit packs', price: '$9', sub: 'For flexible usage', items: ['One-time credits', 'No recurring plan', 'PNG downloads', 'Credits never expire'] }].map((plan) => <div key={plan.name} className={`relative rounded-2xl border p-7 ${plan.featured ? 'border-cyan-300/40 bg-gradient-to-b from-cyan-400/[.1] to-[#0b1427] shadow-[0_0_50px_rgba(14,165,255,.1)]' : 'border-white/[.08] bg-[#0b1427]'}`}>{plan.featured && <span className="absolute right-5 top-5 rounded-full bg-cyan-300 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-950">Most popular</span>}<h3 className="font-medium text-white">{plan.name}</h3><p className="mt-1 text-sm text-slate-500">{plan.sub}</p><p className="mt-7 text-4xl font-semibold tracking-[-.06em] text-white">{plan.price}<span className="text-sm font-normal tracking-normal text-slate-500">{plan.name === 'Pro monthly' ? ' / month' : ''}</span></p><button className={`mt-7 w-full justify-center ${plan.featured ? 'button-primary' : 'button-ghost'}`}>{plan.featured ? 'Start with Pro' : 'Get started'}</button><ul className="mt-7 space-y-3 border-t border-white/[.08] pt-6">{plan.items.map((item) => <li key={item} className="flex items-center gap-2 text-sm text-slate-400"><Check className="size-4 text-cyan-300" />{item}</li>)}</ul></div>)}</div></div></section><section id="api" className="border-t border-white/[.06] bg-[#071022]/60 px-5 py-20 lg:px-8"><div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-center"><div><p className="section-kicker">For developers</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.05em] text-white">Power your workflow with the SnapCut API.</h2><p className="mt-3 max-w-lg text-sm leading-6 text-slate-500">Illustrative API docs for teams building background removal into their products.</p></div><a href="#api" className="button-ghost shrink-0">Read API docs <ArrowRight className="size-4" /></a></div></section><footer className="px-5 py-8 lg:px-8"><div className="mx-auto flex max-w-6xl flex-col gap-5 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between"><Logo /><div className="flex gap-5"><a href="#privacy" className="hover:text-slate-300">Privacy</a><a href="#terms" className="hover:text-slate-300">Terms</a><a href="#contact" className="hover:text-slate-300">Contact</a></div><span>© 2026 SnapCut AI</span></div></footer></main>
}
