import fs from 'fs';

let appCode = fs.readFileSync('src/App.jsx', 'utf8');

// Inject the real portrait card right into the hero section next to "Creative Director"
const oldHero = \`        <section id="home" className="fb-hero">
          <div className="fb-hero-grid">
            <div>
              <div className="hey-eyebrow">Hey, I'm {s.name?.split(' ')[0] || 'Ajay'} — a</div>
              <h1 className="hero-giant-title">
                Creative<br />Director
              </h1>
            </div>
            <div className="hero-right-quote">
              <h3>Great design should feel invisible.</h3>
              <p>{s.tagline}</p>
            </div>
          </div>\`;

const newHero = \`        <section id="home" className="fb-hero">
          <div className="fb-hero-grid" style={{ alignItems: 'center' }}>
            <div>
              <div className="hey-eyebrow">Hey, I'm {s.name?.split(' ')[0] || 'Ajay'} — a</div>
              <h1 className="hero-giant-title">
                Creative<br />Director
              </h1>
            </div>
            
            {/* Real 3D Glassmorphic Portrait Card of Ajay.jpg */}
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <div style={{
                width: '280px',
                height: '350px',
                borderRadius: '24px',
                overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 85, 34, 0.45)',
                boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 40px rgba(255, 85, 34, 0.25)',
                transform: 'perspective(1000px) rotateY(-8deg) rotateX(4deg)',
                transition: 'transform 0.3s ease'
              }}>
                <img src={s.avatar_url || '/Ajay.jpg'} alt="Ajay Chithanoor" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12, padding: '8px 14px', borderRadius: 12, background: 'rgba(7,4,10,0.85)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.12)', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e' }} />
                  {s.name} • 3D Full-Stack
                </div>
              </div>
            </div>

            <div className="hero-right-quote">
              <h3>Great design should feel invisible.</h3>
              <p>{s.tagline}</p>
            </div>
          </div>\`;

if (appCode.includes('fb-hero-grid')) {
  // Replace only if template matches
  appCode = appCode.replace(/<div className="fb-hero-grid">[\s\S]*?<\/div>\s*<\/div>/, newHero.replace('        <section id="home" className="fb-hero">\n          ', ''));
  fs.writeFileSync('src/App.jsx', appCode);
  console.log('✅ Real portrait card successfully integrated into Hero section!');
} else {
  console.log('Already updated or customized.');
}
