import { useEffect, useRef, useState } from 'react'

// ─── COMPONENTE CONTADOR ANIMADO ──────────────────────────────────────────
const Counter = ({ target, duration = 2000, prefix = '', suffix = '', decimals = 0, useThousands = false }) => {
  const [displayValue, setDisplayValue] = useState(prefix + '0' + suffix)
  const elementRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )
    if (elementRef.current) observer.observe(elementRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    let startTime
    const animate = (now) => {
      if (!startTime) startTime = now
      const progress = Math.min((now - startTime) / duration, 1)
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      
      const currentVal = easedProgress * target
      let [intPart, decPart] = currentVal.toFixed(decimals).split('.')
      
      if (useThousands) {
        intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      }
      
      const formatted = decPart ? `${intPart},${decPart}` : intPart
      setDisplayValue(prefix + formatted + suffix)
      
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isVisible, target, duration, prefix, suffix, decimals, useThousands])

  return <span ref={elementRef}>{displayValue}</span>
}

// ─── IMÁGENES DE LOS POSTS ────────────────────────────────────────────────
// Guardá tus fotos en:
//   public/images/pivot/    → para las cards de PIVOT
//   public/images/reymar/   → para las cards de Rey Mar
//
// Luego reemplazá null por la ruta, por ejemplo:
//   p1: '/images/pivot/p1.jpg'
// ─────────────────────────────────────────────────────────────────────────
const IMG = {
  pivot: {
    p1: '/images/pivot/p6.jpg',  // Card: "Más simple de lo que pensás"
    p2: '/images/pivot/p1.jpg',  // Card: "Estás perdiendo clientes"
    p3: '/images/pivot/p5.jpg',  // Card: "4 segundos"
    p4: '/images/pivot/p4.jpg',  // Card: "Tu web vendedor 24/7"
    p5: '/images/pivot/p3.jpg',  // Card: "Mientras dormís"
    p6: '/images/pivot/p2.jpg',  // Card: "Tu web no es solo diseño"
  },
  reymar: {
    r1: '/images/reymar/r1.jpg',
    r2: '/images/reymar/r2.jpg',
    r3: '/images/reymar/r3.jpg',
    r4: '/images/reymar/r4.jpg',
    r5: '/images/reymar/r5.jpg',
    r6: '/images/reymar/r6.jpg',
  },
}

// ─── ICONOS SVG ──────────────────────────────────────────────────────────────
const IcMapPin = ({size=14,style={}}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display:'inline-block',verticalAlign:'middle',flexShrink:0,...style}}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)
const IcTrophy = ({size=15,style={}}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display:'inline-block',verticalAlign:'middle',flexShrink:0,...style}}>
    <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2"/><rect x="6" y="18" width="12" height="4"/><path d="M6 9a6 6 0 0 0 12 0"/>
  </svg>
)
const IcInstagram = ({size=15,style={}}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display:'inline-block',verticalAlign:'middle',flexShrink:0,...style}}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
const IcMail = ({size=14,style={}}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display:'inline-block',verticalAlign:'middle',flexShrink:0,...style}}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
)
const IcWhatsApp = ({size=16,style={}}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{display:'inline-block',verticalAlign:'middle',flexShrink:0,...style}}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
)
const IcPhone = ({size=18,style={}}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display:'inline-block',verticalAlign:'middle',flexShrink:0,...style}}>
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>
)
const IcPalette = ({size=18,style={}}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display:'inline-block',verticalAlign:'middle',flexShrink:0,...style}}>
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
  </svg>
)
const IcPen = ({size=18,style={}}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display:'inline-block',verticalAlign:'middle',flexShrink:0,...style}}>
    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
  </svg>
)
const IcCalendar = ({size=18,style={}}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display:'inline-block',verticalAlign:'middle',flexShrink:0,...style}}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)
const IcTarget = ({size=18,style={}}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display:'inline-block',verticalAlign:'middle',flexShrink:0,...style}}>
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
)
const IcBarChart = ({size=18,style={}}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display:'inline-block',verticalAlign:'middle',flexShrink:0,...style}}>
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
)
// ─────────────────────────────────────────────────────────────────────────────

const REELS = [
  {
    src: '/reels/reel1.mp4',
    client: 'Rey Mar',
    tag: 'Transporte de Carga · Rafaela → Bs.As.',
    accentVar: 'var(--rm)',
    bgColor: '#1A0800',
    borderColor: 'rgba(232,93,32,.35)',
    glowColor: 'rgba(232,93,32,.18)',
  },
  {
    src: '/reels/reel2.mp4',
    client: 'PIVOT',
    tag: 'Agencia de Desarrolladores · Rafaela',
    accentVar: 'var(--pivot-acc)',
    bgColor: '#061510',
    borderColor: 'rgba(108,191,127,.3)',
    glowColor: 'rgba(108,191,127,.15)',
  },
  {
    src: '/reels/reel3.mp4',
    client: 'Decoud Colchones',
    tag: 'Fabricadora de Colchones y Sommiers · Rafaela',
    accentVar: '#7EB8D4',
    bgColor: '#0A1820',
    borderColor: 'rgba(126,184,212,.28)',
    glowColor: 'rgba(126,184,212,.12)',
  },
]

export default function App() {
  const [lightbox, setLightbox] = useState(null)
  const videoRefs = useRef([])
  const [reelsPlaying, setReelsPlaying] = useState(() => REELS.map(() => false))

  const toggleReel = (i) => {
    const video = videoRefs.current[i]
    if (!video) return
    if (video.paused) {
      videoRefs.current.forEach((v, j) => { if (v && j !== i) v.pause() })
      setReelsPlaying(REELS.map((_, j) => j === i))
      video.play()
    } else {
      video.pause()
      setReelsPlaying(prev => prev.map((v, j) => j === i ? false : v))
    }
  }

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 90)
          obs.unobserve(e.target)
        }
      })
    }, { threshold: 0.1 })
    document.querySelectorAll('.fade-in').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const secs = document.querySelectorAll('section[id]')
      const links = document.querySelectorAll('.nav-links a')
      let cur = ''
      secs.forEach(s => { if (window.scrollY >= s.offsetTop - 110) cur = s.id })
      links.forEach(l => { l.style.color = l.getAttribute('href') === '#' + cur ? 'var(--vino)' : '' })
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKey = e => { if (e.key === 'Escape') setLightbox(null) }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const open = src => src && setLightbox(src)

  const imgRef = useRef(null)

  const handleTiltMove = e => {
    const el = imgRef.current
    if (!el) return
    // Cancela el fill de la animación CSS para que el transform de JS tome el control
    el.style.animation = 'none'
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width   // 0→1 left→right
    const y = (e.clientY - rect.top)  / rect.height  // 0→1 top→bottom
    const rotY =  (x - 0.5) * 30   // -15° … +15°
    const rotX = -(y - 0.5) * 20   // +10° … -10°
    el.style.transition = 'transform 0.08s ease'
    el.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.06)`
  }

  const handleTiltLeave = () => {
    const el = imgRef.current
    if (!el) return
    el.style.transition = 'transform 0.4s ease'
    el.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)'
  }

  return (
    <>
      {/* NAV */}
      <nav>
        <div className="nav-logo">
          <img src="/logo.png" alt="VC" className="nav-logo-img" />
          <span>Portfolio</span>
        </div>
        <ul className="nav-links">
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#pivot">PIVOT</a></li>
          <li><a href="#reymar">Rey Mar</a></li>
          <li><a href="#reels">Reels</a></li>
          <li><a href="#certificaciones">Certificaciones</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero" id="inicio">
        <div className="hero-left">
          <p className="hero-eyebrow">Community Manager · Rafaela, Santa Fe</p>
          <div className="hero-name-row">
            <h1 className="hero-name">Valeria<em>Cervetti</em></h1>
            <img src="/logo.png" alt="VC" className="hero-logo" />
          </div>
          <p className="hero-role">Gestión de redes · Contenido estratégico · Crecimiento de marcas</p>
          <div className="hero-div"></div>
          <p className="hero-tagline">Creo contenido que conecta marcas con personas reales. Estrategia, estética y resultados medibles.</p>
          <div className="hero-stats">
            <div><div className="stat-num"><Counter target={2} /></div><div className="stat-lbl">Clientes activos</div></div>
            <div><div className="stat-num"><Counter target={70} prefix="+" suffix="k" /></div><div className="stat-lbl">Views virales</div></div>
            <div><div className="stat-num"><Counter target={2} prefix="+" suffix="k" /></div><div className="stat-lbl">Seguidores logrados</div></div>
          </div>
        </div>
        <div className="hero-right">
          <a href="https://wa.me/5493492673389" target="_blank" rel="noreferrer" className="hero-badge">
            <span>AGENDA<br/>ABIERTA<br/>2026</span>
          </a>
          <div className="svc-accordion">
            {[
              {
                icon: <IcPhone />,
                title: "Gestión de Redes Sociales",
                desc: "Administro tu cuenta de Instagram para que tu marca tenga una presencia activa, profesional y alineada con tus objetivos.",
                adv: "Constancia, organización y comunicación estratégica con tu audiencia."
              },
              {
                icon: <IcPalette />,
                title: "Creación de Contenido",
                desc: "Diseño posts, carruseles, historias, reels y piezas visuales adaptadas a la identidad de tu marca.",
                adv: "Contenido atractivo que genera atención, interacción y reconocimiento."
              },
              {
                icon: <IcPen />,
                title: "Guiones & Storytelling",
                desc: "Desarrollo guiones para historias y reels con mensajes claros, creativos y orientados a conectar con tu comunidad.",
                adv: "Contenido con propósito, capaz de captar la atención y generar acción."
              },
              {
                icon: <IcCalendar />,
                title: "Planificación de Contenido",
                desc: "Organizo el contenido de forma estratégica para mantener una comunicación constante y ordenada.",
                adv: "Mayor coherencia en la comunicación y mejor aprovechamiento de fechas y oportunidades."
              },
              {
                icon: <IcTarget />,
                title: "Publicidad Digital (Meta Ads & Google Ads)",
                desc: "Creo y optimizo campañas publicitarias para aumentar el alcance, las consultas y las oportunidades de venta.",
                adv: "Llegar al público adecuado y aprovechar mejor la inversión publicitaria."
              },
              {
                icon: <IcBarChart />,
                title: "Análisis y Optimización",
                desc: "Analizo métricas y resultados para detectar oportunidades de mejora y potenciar el rendimiento de cada estrategia.",
                adv: "Decisiones basadas en datos reales y optimización constante del contenido y la publicidad."
              }
            ].map((s, i) => (
              <details key={i} className="svc-item">
                <summary className="svc-header">
                  <span className="svc-title-wrap"><span className="svc-icon-lead">{s.icon}</span><span className="svc-title">{s.title}</span></span>
                  <span className="svc-icon"></span>
                </summary>
                <div className="svc-content">
                  <p className="svc-desc">{s.desc}</p>
                  <p className="svc-adv"><b>Beneficio:</b> {s.adv}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* STRIP */}
      <div className="strip">
        <div className="strip-inner">
          <p className="strip-quote">"El contenido que creo no solo <b>se ve bien</b> —<br/>también genera <b>resultados medibles</b>."</p>
        </div>
      </div>

      {/* ══ PIVOT ══ */}
      <section className="cs" id="pivot">
        <div className="container">
          <div className="ch fade-in">
            <div>
              <p className="c-sector">Agencia de Desarrolladores · Rafaela, Santa Fe</p>
              <a href="https://www.instagram.com/pivot.web/" target="_blank" rel="noreferrer" className="c-name-link">
                <h2 className="c-name p">PIVOT</h2>
              </a>
              <p className="c-desc">Agencia especializada en webs, e-commerce y sistemas a medida. Construimos su presencia en Instagram desde cero con contenido educativo y de conversión que los posiciona como referentes en transformación digital.</p>
              <div className="tags">
                <span className="tag p">Webs</span>
                <span className="tag p">E-commerce</span>
                <span className="tag p">Sistemas</span>
                <span className="tag p">Transformación digital</span>
              </div>
              <p className="c-link"><IcMapPin /> pivotweb.com.ar · @pivot.web</p>
            </div>
            <div className="mbox">
              <div className="mc"><div className="mn p"><Counter target={87.8} suffix="k" decimals={1} /></div><div className="ml">Visualizaciones<br/>últimos 30 días</div></div>
              <div className="mc"><div className="mn p"><Counter target={354} /></div><div className="ml">Seguidores<br/>orgánicos</div></div>
              <div className="mc alt"><div className="mn p"><Counter target={10} /></div><div className="ml">Publicaciones<br/>realizadas</div></div>
              <div className="mc alt"><div className="mn v"><Counter target={70.5} suffix="k" decimals={1} /></div><div className="ml">Views en<br/>publicación viral</div></div>
            </div>
          </div>

          <div className="pgrid fade-in">

            {/* P1 */}
            <div className="pc p3" onClick={() => open(IMG.pivot.p1)}>
              {IMG.pivot.p1
                ? <img src={IMG.pivot.p1} alt="Post PIVOT 1" className="post-img-full" />
                : <>
                    <div style={{background:'#0D2418',flex:'1.2',display:'flex',flexDirection:'column',padding:'1rem',justifyContent:'center'}}>
                      <div className="plogo">▶ PIVOT</div>
                      <div style={{fontSize:'1.1rem',fontWeight:'900',color:'white',lineHeight:'1'}}>
                        MÁS<br/><span style={{color:'var(--pivot-acc)',fontStyle:'italic'}}>SIMPLE</span><br/>DE LO QUE<br/><em style={{color:'var(--pivot-acc)'}}>pensás</em>
                      </div>
                    </div>
                    <div style={{padding:'.7rem',display:'flex',flexDirection:'column',gap:'.25rem',background:'white'}}>
                      <div style={{background:'#0D2418',borderRadius:'4px',padding:'.3rem .5rem',fontSize:'.58rem',color:'white',display:'flex',gap:'.35rem',alignItems:'center'}}><span>💻</span><span><b>NOSOTROS</b> nos ocupamos de todo</span></div>
                      <div style={{background:'#0D2418',borderRadius:'4px',padding:'.3rem .5rem',fontSize:'.58rem',color:'white',display:'flex',gap:'.35rem',alignItems:'center'}}><span>💬</span><span><b>VOS SOLO</b> contanos tu idea</span></div>
                      <div style={{background:'#0D2418',borderRadius:'4px',padding:'.3rem .5rem',fontSize:'.58rem',color:'white',display:'flex',gap:'.35rem',alignItems:'center'}}><span>🚀</span><span><b>LO HACEMOS</b> rápido y profesional</span></div>
                    </div>
                  </>
              }
            </div>

            {/* P2 */}
            <div className="pc p2" onClick={() => open(IMG.pivot.p2)}>
              {IMG.pivot.p2
                ? <img src={IMG.pivot.p2} alt="Post PIVOT 2" className="post-img-full" />
                : <>
                    <div style={{position:'absolute',top:'.8rem',left:'.8rem',fontSize:'1.1rem'}}>⚠️</div>
                    <div style={{fontSize:'.95rem',fontWeight:'900',lineHeight:'1.05',color:'white',marginBottom:'.35rem'}}>
                      ESTÁS<br/><span className="pacc">PERDIENDO</span><br/>CLIENTES
                    </div>
                    <div style={{fontSize:'.62rem',color:'var(--pivot-acc)',fontStyle:'italic',marginBottom:'.4rem'}}>(sin saberlo)</div>
                    <ul className="nl">
                      <li><span className="nb">1</span>Alguien buscó tu servicio hoy</li>
                      <li><span className="nb">2</span>No encontró tu web</li>
                      <li><span className="nb">3</span>Encontró a tu competencia</li>
                      <li><span className="nb">4</span>Y terminó comprando con ellos</li>
                    </ul>
                    <div style={{marginTop:'.5rem',background:'rgba(108,191,127,.12)',border:'1px solid rgba(108,191,127,.3)',borderRadius:'4px',padding:'.3rem .5rem',fontSize:'.6rem',color:'var(--pivot-acc)',fontWeight:'700'}}>No es suerte. Es visibilidad.</div>
                  </>
              }
            </div>

            {/* P3 */}
            <div className="pc p2" style={{position:'relative'}} onClick={() => open(IMG.pivot.p3)}>
              {IMG.pivot.p3
                ? <img src={IMG.pivot.p3} alt="Post PIVOT 3" className="post-img-full" />
                : <>
                    <div style={{position:'absolute',top:'.8rem',left:'.8rem',fontSize:'.9rem'}}>⏱️</div>
                    <div className="plogo">▶ PIVOT</div>
                    <div style={{fontSize:'.82rem',fontWeight:'700',color:'rgba(255,255,255,.6)',marginBottom:'.2rem'}}>TENÉS</div>
                    <div style={{fontSize:'1.8rem',fontWeight:'900',color:'var(--pivot-acc)',lineHeight:'1'}}>4 SEG.</div>
                    <div style={{fontSize:'.62rem',color:'rgba(255,255,255,.65)',margin:'.4rem 0',lineHeight:'1.4'}}>
                      Si tu web no es clara,<br/>no transmite <span style={{color:'var(--pivot-acc)'}}>confianza</span><br/>o no <span style={{color:'var(--pivot-acc)'}}>guía</span> al usuario...
                    </div>
                    <div style={{background:'rgba(0,0,0,.35)',borderRadius:'4px',padding:'.3rem .5rem'}}>
                      <span style={{fontSize:'.65rem',fontWeight:'800',color:'white'}}>✕ LO PERDÉS. Así de simple.</span>
                    </div>
                  </>
              }
              <div className="pv"><Counter target={1843} useThousands={true} /></div>
            </div>

            {/* P4 */}
            <div className="pc p1" onClick={() => open(IMG.pivot.p4)}>
              {IMG.pivot.p4
                ? <img src={IMG.pivot.p4} alt="Post PIVOT 4" className="post-img-full" />
                : <>
                    <div style={{display:'flex',alignItems:'center',gap:'.4rem',marginBottom:'.7rem'}}>
                      <div style={{width:'13px',height:'13px',background:'var(--pivot-acc)',clipPath:'polygon(20% 0,80% 0,100% 50%,80% 100%,20% 100%,0 50%)'}}></div>
                      <span style={{fontSize:'.6rem',fontWeight:'600',color:'rgba(255,255,255,.5)'}}>PIVOT</span>
                    </div>
                    <div style={{fontSize:'.9rem',fontWeight:'700',color:'white',lineHeight:'1.2'}}>Tu web es<br/>tu vendedor</div>
                    <div style={{fontSize:'2rem',fontWeight:'900',color:'var(--pivot-acc)',lineHeight:'1'}}>24/7.</div>
                    <div style={{fontSize:'.68rem',color:'rgba(255,255,255,.55)',marginTop:'.4rem'}}>¿Está haciendo bien su trabajo?</div>
                  </>
              }
              <div className="pv"><Counter target={831} /></div>
            </div>

            {/* P5 */}
            <div className="pc p1" onClick={() => open(IMG.pivot.p5)}>
              {IMG.pivot.p5
                ? <img src={IMG.pivot.p5} alt="Post PIVOT 5" className="post-img-full" />
                : <div style={{flex:'1',display:'flex',flexDirection:'column',justifyContent:'center',gap:'.65rem'}}>
                    <div style={{display:'flex',alignItems:'center',gap:'.6rem'}}>
                      <div style={{width:'30px',height:'30px',background:'#C8E6C9',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.9rem',flexShrink:'0'}}>🌙</div>
                      <div style={{fontSize:'.65rem',color:'white',lineHeight:'1.35'}}>Mientras dormís,<br/><span style={{color:'var(--pivot-acc)',fontWeight:'600'}}>tu web sigue activa.</span></div>
                    </div>
                    <div style={{height:'1px',background:'rgba(255,255,255,.08)'}}></div>
                    <div style={{display:'flex',alignItems:'center',gap:'.6rem'}}>
                      <div style={{width:'30px',height:'30px',background:'#C8E6C9',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.9rem',flexShrink:'0'}}>💼</div>
                      <div style={{fontSize:'.65rem',color:'white',lineHeight:'1.35'}}>En reunión,<br/><span style={{color:'var(--pivot-acc)',fontWeight:'600'}}>tu web sigue activa.</span></div>
                    </div>
                    <div style={{height:'1px',background:'rgba(255,255,255,.08)'}}></div>
                    <div style={{display:'flex',alignItems:'center',gap:'.6rem'}}>
                      <div style={{width:'30px',height:'30px',background:'#C8E6C9',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.9rem',flexShrink:'0'}}>👥</div>
                      <div style={{fontSize:'.62rem',color:'rgba(255,255,255,.65)',lineHeight:'1.35'}}>¿Convierte visitas en clientes<br/>o los <span style={{color:'var(--pivot-acc)'}}>espanta?</span></div>
                    </div>
                  </div>
              }
            </div>

            {/* P6 */}
            <div className="pc p2" onClick={() => open(IMG.pivot.p6)}>
              {IMG.pivot.p6
                ? <img src={IMG.pivot.p6} alt="Post PIVOT 6" className="post-img-full" />
                : <>
                    <div className="plogo">▶ PIVOT</div>
                    <div style={{fontSize:'.88rem',fontWeight:'900',color:'white',lineHeight:'1.1',marginBottom:'.45rem'}}>
                      Tu web no es<br/>solo diseño.<br/><span style={{color:'var(--pivot-acc)'}}>Es una herramienta<br/>que <b>convierte.</b></span>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',gap:'.28rem'}}>
                      <div style={{fontSize:'.6rem',color:'rgba(255,255,255,.7)',display:'flex',gap:'.4rem',alignItems:'center'}}><span style={{color:'var(--pivot-acc)'}}>🛡</span>Genera confianza desde el primer clic.</div>
                      <div style={{fontSize:'.6rem',color:'rgba(255,255,255,.7)',display:'flex',gap:'.4rem',alignItems:'center'}}><span style={{color:'var(--pivot-acc)'}}>⚡</span>Responde rápido, cada segundo cuenta.</div>
                      <div style={{fontSize:'.6rem',color:'rgba(255,255,255,.7)',display:'flex',gap:'.4rem',alignItems:'center'}}><span style={{color:'var(--pivot-acc)'}}>🎯</span>Guía al usuario exactamente donde necesitás.</div>
                    </div>
                    <div style={{marginTop:'.6rem',fontSize:'.62rem',fontWeight:'700',color:'var(--pivot-acc)'}}>ESO ES LO QUE CONSTRUIMOS EN PIVOT.</div>
                  </>
              }
            </div>

            {/* VIRAL PIVOT */}
            <a href="https://www.instagram.com/reel/DXo_5FxAJ80/" target="_blank" rel="noreferrer" className="vbanner" style={{background:'var(--vino-dark)', textDecoration:'none'}}>
              <div>
                <div className="vlabel"><IcTrophy /> Publicación más exitosa</div>
                <div className="vtitle">"3 tipos de webs que transforman tu negocio"</div>
                <div style={{fontSize:'.78rem',color:'rgba(255,255,255,.4)',marginTop:'.3rem'}}>Reel · @pivot.web · Rafaela, Santa Fe</div>
              </div>
              <div style={{textAlign:'right'}}>
                <div className="vnum" style={{color:'var(--dorado)'}}><Counter target={70.5} suffix="k" decimals={1} /><span className="vunit">views</span></div>
                <div style={{fontSize:'.78rem',color:'rgba(255,255,255,.4)',marginTop:'.2rem'}}>Alcance orgánico</div>
              </div>
            </a>

          </div>
        </div>
      </section>

      {/* ══ REY MAR ══ */}
      <section className="cs alt" id="reymar">
        <div className="container">
          <div className="ch rev fade-in">
            <div>
              <p className="c-sector">Transporte de Carga · Rafaela → Buenos Aires</p>
              <a href="https://www.instagram.com/reymartransporte/" target="_blank" rel="noreferrer" className="c-name-link">
                <h2 className="c-name r">Rey Mar</h2>
              </a>
              <p className="c-desc">Empresa de transporte de carga con camiones y acoplados de 28 pallet. Desarrollamos su identidad digital en Instagram comunicando servicios, horarios y cobertura geográfica con claridad y profesionalismo.</p>
              <div className="tags">
                <span className="tag r">Cargas</span>
                <span className="tag r">Rafaela · Bs.As.</span>
                <span className="tag r">+30 localidades</span>
                <span className="tag r">CABA y AMBA</span>
              </div>
              <p className="c-link"><IcMapPin /> Rafaela, Santa Fe · @reymartransporte</p>
            </div>
            <div className="mbox">
              <div className="mc"><div className="mn r"><Counter target={31.5} suffix="k" decimals={1} /></div><div className="ml">Visualizaciones<br/>últimos 30 días</div></div>
              <div className="mc"><div className="mn r"><Counter target={2118} useThousands={true} /></div><div className="ml">Seguidores<br/>orgánicos</div></div>
              <div className="mc alt"><div className="mn r"><Counter target={16} /></div><div className="ml">Publicaciones<br/>realizadas</div></div>
              <div className="mc alt"><div className="mn v"><Counter target={13.8} suffix="k" decimals={1} /></div><div className="ml">Views en<br/>reel destacado</div></div>
            </div>
          </div>

          <div className="pgrid fade-in">

            {/* R1 */}
            <div className="pc r1" onClick={() => open(IMG.reymar.r1)}>
              {IMG.reymar.r1
                ? <img src={IMG.reymar.r1} alt="Post Rey Mar 1" className="post-img-full" />
                : <>
                    <div style={{position:'absolute',top:'.8rem',left:'.8rem'}}>
                      <div style={{fontSize:'.62rem',fontWeight:'700',color:'rgba(255,255,255,.85)',letterSpacing:'.05em'}}>REY MAR</div>
                      <div style={{fontSize:'.5rem',color:'rgba(255,255,255,.5)'}}>Transporte de carga</div>
                    </div>
                    <div className="rtitle">NUESTROS<br/>DEPÓSITOS</div>
                    <div className="rsub">Rafaela (y zona) – Buenos Aires</div>
                  </>
              }
              <div className="pv"><Counter target={303} /></div>
            </div>

            {/* R2 */}
            <div className="pc r2" style={{position:'relative'}} onClick={() => open(IMG.reymar.r2)}>
              {IMG.reymar.r2
                ? <img src={IMG.reymar.r2} alt="Post Rey Mar 2" className="post-img-full" />
                : <>
                    <div style={{position:'absolute',top:'0',right:'0',width:'42%',height:'100%',background:'linear-gradient(135deg,#E85D20,#B84010)',clipPath:'polygon(25% 0,100% 0,100% 100%,0% 100%)',zIndex:'0'}}></div>
                    <div style={{position:'relative',zIndex:'1',padding:'1rem',flex:'1',display:'flex',flexDirection:'column',justifyContent:'center'}}>
                      <div style={{fontSize:'.62rem',fontWeight:'700',color:'var(--rm)',marginBottom:'.5rem'}}>▶▶ REY MAR</div>
                      <div style={{fontSize:'.9rem',fontWeight:'900',color:'#1A1A1A',lineHeight:'1.0'}}>CAMIONES<br/>Y<br/>ACOPLADOS</div>
                      <div style={{marginTop:'.5rem',display:'inline-block',background:'var(--rm)',color:'white',fontSize:'.6rem',fontWeight:'900',padding:'.2rem .5rem',borderRadius:'3px'}}>28 PALLET</div>
                    </div>
                  </>
              }
              <div className="pv" style={{color: IMG.reymar.r2 ? 'rgba(255,255,255,.8)' : 'rgba(0,0,0,.35)'}}><Counter target={31} /></div>
            </div>

            {/* R3 */}
            <div className="pc r2" style={{position:'relative'}} onClick={() => open(IMG.reymar.r3)}>
              {IMG.reymar.r3
                ? <img src={IMG.reymar.r3} alt="Post Rey Mar 3" className="post-img-full" />
                : <>
                    <div style={{background:'var(--rm)',padding:'.5rem .8rem'}}>
                      <div style={{fontSize:'.6rem',fontWeight:'700',color:'white'}}>REY MAR · Transporte de carga</div>
                    </div>
                    <div style={{padding:'.7rem',flex:'1',display:'flex',flexDirection:'column',justifyContent:'center'}}>
                      <div style={{fontSize:'1.1rem',fontWeight:'900',color:'#1A1A1A',lineHeight:'1.0'}}>CABA <span style={{color:'var(--rm)'}}>Y</span> AMBA</div>
                      <div style={{fontSize:'.58rem',color:'#777',margin:'.25rem 0'}}>Llegamos a cada punto, conectamos negocios.</div>
                      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.2rem',marginTop:'.4rem'}}>
                        <div style={{fontSize:'.55rem',color:'#333',padding:'.2rem .3rem',background:'#f5f5f5',borderRadius:'3px',textAlign:'center'}}>📍 San Vicente</div>
                        <div style={{fontSize:'.55rem',color:'#333',padding:'.2rem .3rem',background:'#f5f5f5',borderRadius:'3px',textAlign:'center'}}>📍 San Martín</div>
                        <div style={{fontSize:'.55rem',color:'#333',padding:'.2rem .3rem',background:'#f5f5f5',borderRadius:'3px',textAlign:'center'}}>📍 Cañada Rosquín</div>
                        <div style={{fontSize:'.55rem',color:'#333',padding:'.2rem .3rem',background:'#f5f5f5',borderRadius:'3px',textAlign:'center'}}>📍 San Genaro</div>
                      </div>
                      <div style={{marginTop:'.5rem',display:'flex',justifyContent:'space-around',padding:'.3rem 0',borderTop:'1px solid #eee'}}>
                        <div style={{fontSize:'.5rem',color:'#777',textAlign:'center'}}>🚛<br/>Cargas seguras</div>
                        <div style={{fontSize:'.5rem',color:'#777',textAlign:'center'}}>📦<br/>Sin intermediarios</div>
                        <div style={{fontSize:'.5rem',color:'#777',textAlign:'center'}}>📍<br/>Seguimiento</div>
                      </div>
                    </div>
                  </>
              }
            </div>

            {/* R4 */}
            <div className="pc r3" style={{position:'relative',overflow:'hidden'}} onClick={() => open(IMG.reymar.r4)}>
              {IMG.reymar.r4
                ? <img src={IMG.reymar.r4} alt="Post Rey Mar 4" className="post-img-full" />
                : <>
                    <div style={{position:'absolute',top:'0',right:'0',width:'40%',height:'100%',background:'rgba(232,93,32,.12)'}}></div>
                    <div style={{position:'relative',zIndex:'1'}}>
                      <div style={{fontSize:'.58rem',fontWeight:'700',color:'var(--rm)',marginBottom:'.45rem',letterSpacing:'.05em'}}>REY MAR · TRANSPORTE DE CARGA</div>
                      <div style={{display:'flex',alignItems:'center',gap:'.4rem',marginBottom:'.3rem'}}>
                        <span style={{fontSize:'.85rem'}}>📍</span>
                        <div style={{fontSize:'.85rem',fontWeight:'900',color:'var(--rm)'}}>RAFAELA</div>
                      </div>
                      <div style={{fontSize:'.6rem',color:'rgba(255,255,255,.75)',paddingBottom:'.3rem',borderBottom:'1px solid rgba(255,255,255,.1)',marginBottom:'.3rem'}}>🚛 <b style={{color:'white'}}>CARGAS</b> Lu · Ma · Mi · Ju</div>
                      <div style={{fontSize:'.6rem',color:'rgba(255,255,255,.75)',marginBottom:'.5rem'}}>📦 <b style={{color:'white'}}>ENTREGAS</b> Mi · Ju · Vi · Lu</div>
                      <div style={{display:'flex',alignItems:'center',gap:'.4rem',marginBottom:'.3rem'}}>
                        <span style={{fontSize:'.85rem'}}>📍</span>
                        <div style={{fontSize:'.85rem',fontWeight:'900',color:'var(--rm)'}}>BS AS</div>
                      </div>
                      <div style={{fontSize:'.6rem',color:'rgba(255,255,255,.75)'}}>🚛 <b style={{color:'white'}}>ENTREGAS Y CARGAS</b> Ma · Mi · Ju · Vi</div>
                      <div style={{marginTop:'.6rem',background:'var(--rm)',borderRadius:'4px',padding:'.3rem .5rem',fontSize:'.6rem',color:'white',fontWeight:'700',textAlign:'center'}}>ASEGURÁ TU ENTREGA · 3492 417861</div>
                    </div>
                  </>
              }
              <div className="pv" style={{bottom:'.4rem'}}><Counter target={599} /></div>
            </div>

            {/* R5 */}
            <div className="pc r2" style={{padding:'.8rem',position:'relative'}} onClick={() => open(IMG.reymar.r5)}>
              {IMG.reymar.r5
                ? <img src={IMG.reymar.r5} alt="Post Rey Mar 5" className="post-img-full" />
                : <>
                    <div style={{background:'var(--rm)',borderRadius:'4px',padding:'.3rem .5rem',marginBottom:'.5rem',display:'flex',alignItems:'center',gap:'.3rem'}}>
                      <span style={{fontSize:'.7rem'}}>📍</span>
                      <span style={{fontSize:'.6rem',fontWeight:'700',color:'white'}}>NUESTROS DEPÓSITOS</span>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',gap:'.3rem',fontSize:'.58rem',color:'#444',flex:'1',justifyContent:'center'}}>
                      <div style={{borderBottom:'1px dashed #eee',paddingBottom:'.22rem'}}><b>Casa Central Rafaela</b><br/><span style={{color:'#888'}}>Hna. Fortunata 535 · L a V 8-17hs</span></div>
                      <div style={{borderBottom:'1px dashed #eee',paddingBottom:'.22rem'}}><b>Villa Soldati</b><br/><span style={{color:'#888'}}>San Pedrito 3434 · L a V 8-16hs</span></div>
                      <div style={{borderBottom:'1px dashed #eee',paddingBottom:'.22rem'}}><b>Flores</b><br/><span style={{color:'#888'}}>Morón 3699 y más sedes</span></div>
                      <div><b style={{color:'var(--rm)'}}>Puntos de Paso:</b><br/><span style={{color:'#888'}}>San Vicente · San Genaro · Cañada Rosquín</span></div>
                    </div>
                    <div style={{marginTop:'.4rem',background:'#FFF3E0',borderRadius:'4px',padding:'.25rem',fontSize:'.58rem',color:'var(--rm)',fontWeight:'700',textAlign:'center'}}>¿QUÉ PODÉS DESPACHAR? →</div>
                  </>
              }
              <div className="pv" style={{color: IMG.reymar.r5 ? 'rgba(255,255,255,.8)' : 'rgba(0,0,0,.3)'}}><Counter target={252} /></div>
            </div>

            {/* R6 */}
            <div className="pc r3" style={{position:'relative'}} onClick={() => open(IMG.reymar.r6)}>
              {IMG.reymar.r6
                ? <img src={IMG.reymar.r6} alt="Post Rey Mar 6" className="post-img-full" />
                : <>
                    <div style={{flex:'1',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:'.5rem',padding:'1rem'}}>
                      <div style={{fontSize:'2.2rem'}}>🏭</div>
                      <div style={{fontSize:'.68rem',color:'rgba(255,255,255,.45)',textAlign:'center',lineHeight:'1.4'}}>El equipo de<br/>Rey Mar en acción</div>
                    </div>
                    <div style={{background:'rgba(232,93,32,.18)',padding:'.6rem .8rem',borderTop:'1px solid rgba(255,255,255,.05)'}}>
                      <div style={{fontSize:'.72rem',fontWeight:'700',color:'var(--rm)'}}><Counter target={7735} useThousands={true} /> visualizaciones</div>
                      <div style={{fontSize:'.58rem',color:'rgba(255,255,255,.35)'}}>Reel · Equipo y operaciones</div>
                    </div>
                  </>
              }
              <div className="pp"><svg width="8" height="8" viewBox="0 0 10 10" fill="white"><polygon points="2,1 9,5 2,9"/></svg></div>
            </div>

            {/* VIRAL REY MAR */}
            <a href="https://www.instagram.com/reel/DXuHY_dgBTu/" target="_blank" rel="noreferrer" className="vbanner" style={{background:'linear-gradient(135deg,#1A0800,#3A1200)', textDecoration:'none'}}>
              <div>
                <div className="vlabel" style={{color:'#FFB74D'}}><IcTrophy style={{color:'#FFB74D'}} /> Reel más visto</div>
                <div className="vtitle">¿Tenes una distribuidora y tus pedidos no llegan al interior?</div>
                <div style={{fontSize:'.78rem',color:'rgba(255,255,255,.4)',marginTop:'.3rem'}}>Reel · @reymartransporte · Rafaela, Santa Fe</div>
              </div>
              <div style={{textAlign:'right'}}>
                <div className="vnum" style={{color:'#FFB74D'}}><Counter target={13.8} suffix="k" decimals={1} /><span className="vunit">views</span></div>
                <div style={{fontSize:'.78rem',color:'rgba(255,255,255,.4)',marginTop:'.2rem'}}>Alcance orgánico</div>
              </div>
            </a>

          </div>
        </div>
      </section>

      {/* ══ REELS ══ */}
      <section className="reels-sec" id="reels">
        <div className="container">
          <div className="reels-head fade-in">
            <span className="sec-tag" style={{color:'var(--dorado)'}}>Contenido en Video</span>
            <h2 className="sec-title" style={{color:'white'}}>Mis <em style={{color:'var(--dorado)'}}>Reels</em></h2>
          </div>
          <div className="reels-grid fade-in">
            {REELS.map((r, i) => (
              <div
                key={i}
                className="reel-card"
                style={{'--rc-accent': r.accentVar, '--rc-bg': r.bgColor, '--rc-border': r.borderColor, '--rc-glow': r.glowColor}}
              >
                <div className="reel-card-header">
                  <div className="reel-card-bar" />
                  <div className="reel-card-meta">
                    <span className="reel-card-client">{r.client}</span>
                    <span className="reel-card-tag">{r.tag}</span>
                  </div>
                </div>
                <div
                  className="reel-video-wrapper"
                  onClick={() => toggleReel(i)}
                >
                  <video
                    ref={el => { videoRefs.current[i] = el }}
                    src={r.src}
                    playsInline
                    loop
                    className="reel-video"
                    onEnded={() => setReelsPlaying(prev => prev.map((v, j) => j === i ? false : v))}
                  />
                  <div className={`reel-play-overlay${reelsPlaying[i] ? ' is-playing' : ''}`}>
                    <div className="reel-play-btn">
                      {reelsPlaying[i]
                        ? <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16" rx="1.5"/><rect x="14" y="4" width="4" height="16" rx="1.5"/></svg>
                        : <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><polygon points="6,3 20,12 6,21"/></svg>
                      }
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CERTIFICACIONES ══ */}
      <section className="cert-sec" id="certificaciones">
        <div className="container">
          <div className="cert-head fade-in">
            <span className="sec-tag">Mi Formación</span>
            <h2 className="sec-title">Certificaciones <em>Profesionales</em></h2>
          </div>
          <div className="cert-grid fade-in">
            {[
              { img: '/cert1.png', title: 'Google Ads' },
              { img: '/cert2.png', title: 'Edición de Video en CapCut' },
              { img: '/cert3.png', title: 'Marketing Digital & Publicidad Flex' }
            ].map((c, i) => (
              <div key={i} className="cert-card" onClick={() => open(c.img)}>
                <div className="cert-img-container">
                  <img src={c.img} alt={c.title} className="cert-img" />
                  <div className="cert-overlay">
                    <span>Ver Certificado</span>
                  </div>
                </div>
                <div className="cert-info">
                  <p className="cert-name">{c.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SKILLS ══ */}
      <section className="skills-sec" id="skills">
        <div className="container">
          <div className="skills-head fade-in">
            <span className="sec-tag" style={{color:'var(--dorado)'}}>Lo que ofrezco</span>
            <h2 className="sec-title" style={{color:'white'}}>Mis <em style={{color:'var(--dorado)'}}>habilidades</em></h2>
          </div>
          <div className="sgrid">
            <div className="scard fade-in">
              <div className="sicon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--crema)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              </div>
              <div className="sname">Gestión de Redes</div>
              <div className="sdesc">Administro perfiles en Instagram con consistencia, planificación y enfoque en crecimiento orgánico sostenido.</div>
            </div>
            <div className="scard fade-in">
              <div className="sicon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--crema)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              </div>
              <div className="sname">Copywriting</div>
              <div className="sdesc">Redacción estratégica de captions, CTAs y mensajes que convierten seguidores en clientes reales.</div>
            </div>
            <div className="scard fade-in">
              <div className="sicon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--crema)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
              </div>
              <div className="sname">Diseño de Contenido</div>
              <div className="sdesc">Creación de piezas visuales alineadas a la identidad de cada marca y sus objetivos de negocio.</div>
            </div>
            <div className="scard fade-in">
              <div className="sicon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--crema)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
              </div>
              <div className="sname">Análisis de Métricas</div>
              <div className="sdesc">Lectura e interpretación de datos para optimizar la estrategia y maximizar el alcance orgánico.</div>
            </div>
            <div className="scard fade-in">
              <div className="sicon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--crema)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
              </div>
              <div className="sname">Reels & Video</div>
              <div className="sdesc">Producción de contenido en video que genera engagement, viralidad y nuevos seguidores.</div>
            </div>
            <div className="scard fade-in">
              <div className="sicon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--crema)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </div>
              <div className="sname">Planificación Editorial</div>
              <div className="sdesc">Calendarios de contenido estratégicos, coherentes con cada etapa del negocio del cliente.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section className="contact-sec" id="contacto">
        <div className="contact-inner fade-in">
          <span className="sec-tag" style={{color:'var(--vino-light)'}}>Nuevos proyectos · 2026</span>
          <h2 className="ctitle">¿Tu marca merece más <em>atención?</em></h2>
          <div className="contact-divider" />
          <p className="csub">Creo contenido que conecta — estrategia clara, estética cuidada y resultados que se miden. Si tu marca necesita una presencia que convierta, hablemos antes de que se llene la agenda.</p>
          <div className="cavail">
            <span className="cavail-dot" />
            Tomando nuevos clientes este mes
          </div>
          <div className="cbtns">
            <a href="https://wa.me/5493492673389" target="_blank" rel="noreferrer" className="btn">
              <IcWhatsApp /> Escribime por WhatsApp
            </a>
            <a href="https://instagram.com/vale.cervetti" target="_blank" rel="noreferrer" className="btn-secondary">
              <IcInstagram /> @vale.cervetti
            </a>
          </div>
          <div className="cinfo">
            <span><IcMapPin size={13} /> Rafaela, Santa Fe</span>
            <a href="mailto:vcervetti@outlook.es"><IcMail size={13} /> vcervetti@outlook.es</a>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <p>© 2025 <span>Valeria Cervetti</span> · Community Manager · Rafaela, Santa Fe</p>
          <a href="https://pivotweb.com.ar/" target="_blank" rel="noreferrer" className="footer-credit">
            Creado por <span>PIVOT</span>
          </a>
        </div>
      </footer>

      {/* WHATSAPP FLOTANTE */}
      <a href="https://wa.me/5493492673389" target="_blank" rel="noreferrer" className="wa-float" aria-label="WhatsApp">
        <IcWhatsApp size={28} />
      </a>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={e => { e.stopPropagation(); setLightbox(null) }}>✕</button>
          <img
            ref={imgRef}
            src={lightbox}
            alt="Post ampliado"
            className="lightbox-img"
            onClick={e => e.stopPropagation()}
            onMouseMove={handleTiltMove}
            onMouseLeave={handleTiltLeave}
          />
        </div>
      )}
    </>
  )
}
