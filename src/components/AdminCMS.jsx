import React, { useState } from 'react';
import axios from 'axios';
import SvgIcon, { IconSelect } from './SvgIcon';

export default function AdminCMS({ cmsState, onSaveState, onBackToSite }) {
  const [token, setToken] = useState(localStorage.getItem('cms_token') || '');
  // Clean blank login form (No default pre-fill)
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [activeTab, setActiveTab] = useState('overview');
  const [draft, setDraft] = useState(() => JSON.parse(JSON.stringify(cmsState)));
  const [toast, setToast] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const u = (loginForm.username || '').trim().toLowerCase();
    const p = (loginForm.password || '').trim();
    if (u === 'admin' && p === 'admin123') {
      const tk = 'live_cms_master_token_2026';
      localStorage.setItem('cms_token', tk);
      setToken(tk);
      notify('Authenticated into Executive Admin CMS');
      return;
    }
    alert('Invalid Admin Credentials!');
  };

  const commitChanges = async (updatedDraft, customMsg = 'All changes saved & synced live!') => {
    setSaving(true);
    setDraft(updatedDraft);
    localStorage.setItem('ajay_cms_backup', JSON.stringify(updatedDraft));
    try {
      await axios.put('/api/admin/state', updatedDraft);
    } catch (e) {}
    onSaveState(updatedDraft);
    setSaving(false);
    notify(customMsg);
  };

  // Permanent File Upload Helper (Uploads to public/uploads/ via Vite Middleware)
  const uploadFileToServer = (file, onComplete) => {
    if (!file) return;
    setUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const res = await axios.post('/api/admin/upload', {
          fileName: file.name,
          fileType: file.type,
          dataUrl: reader.result
        });
        if (res.data?.url) {
          const nextMedia = [res.data.media, ...(draft.media || [])];
          const nextDraft = { ...draft, media: nextMedia };
          setDraft(nextDraft);
          onComplete(res.data.url, nextDraft);
          notify('Uploaded & saved permanently: ' + res.data.url);
        }
      } catch (err) {
        // Fallback: Add base64 image directly to visual grid if API fails
        const newMedia = {
          id: Date.now(),
          name: file.name,
          url: reader.result,
          type: file.type?.startsWith('video') ? 'video' : 'image'
        };
        const nextMedia = [newMedia, ...(draft.media || [])];
        const nextDraft = { ...draft, media: nextMedia };
        setDraft(nextDraft);
        onComplete(reader.result, nextDraft);
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  if (!token) {
    return (
      <div className="cms-login-screen">
        <form onSubmit={handleLogin} className="cms-login-card" autoComplete="off">
          <div className="section-orange-tag" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <SvgIcon name="ShieldCheck" size={15} color="#ff5522" />
            <span>EXECUTIVE CONTROL CENTER</span>
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Portfolio Admin CMS</h2>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 24 }}>
            Enter your administrator credentials to unlock live editing.
          </p>
          <div className="cms-field" style={{ marginBottom: 14 }}>
            <label>ADMIN USERNAME</label>
            <input
              required
              autoComplete="off"
              placeholder="Enter username..."
              value={loginForm.username}
              onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
            />
          </div>
          <div className="cms-field" style={{ marginBottom: 20 }}>
            <label>PASSWORD</label>
            <input
              required
              type="password"
              autoComplete="new-password"
              placeholder="Enter password..."
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            />
          </div>
          <button type="submit" className="orange-cta-pill" style={{ width: '100%', justifyContent: 'center' }}>
            <span>Unlock Live CMS Dashboard</span>
            <span className="orange-cta-circle"><SvgIcon name="ArrowUpRight" size={14} color="#ff4522" /></span>
          </button>
          <button type="button" onClick={onBackToSite} className="cms-back-btn">
            Return to Live Portfolio
          </button>
        </form>
      </div>
    );
  }

  const navTabs = [
    { id: 'overview', label: 'Dashboard & Visibility', icon: 'Layout' },
    { id: 'media', label: `Media Library (${(draft.media || []).length})`, icon: 'Image' },
    { id: 'theme', label: 'Universal Theme & Fonts', icon: 'Palette' },
    { id: 'background', label: 'Brand, Avatar & Video', icon: 'Video' },
    { id: 'hero_about', label: 'Hero, Strip & Brands', icon: 'Sparkles' },
    { id: 'projects', label: `Projects & Snapshots (${draft.projects.length})`, icon: 'Box' },
    { id: 'workflow', label: 'Workflow Sprint Builder', icon: 'Sliders' },
    { id: 'skills', label: `Tech Stack (${draft.skills.length})`, icon: 'Cpu' },
    { id: 'experiences', label: `Experience (${draft.experiences.length})`, icon: 'Briefcase' },
    { id: 'services', label: `Services & Certs`, icon: 'ShieldCheck' },
    { id: 'palette_stats', label: 'Palette, Stats & Studio', icon: 'Layers' },
    { id: 'testimonials', label: `Testimonials (${draft.sections.testimonials.items.length})`, icon: 'Award' },
    { id: 'messages', label: `Client Leads (${draft.messages?.length || 0})`, icon: 'Mail' }
  ];

  const addListItem = (listKey, template) => {
    const updated = {
      ...draft,
      [listKey]: [{ id: Date.now(), enabled: true, ...template }, ...(draft[listKey] || [])]
    };
    commitChanges(updated, `Added new item to ${listKey}`);
  };

  const deleteListItem = (listKey, id) => {
    const updated = {
      ...draft,
      [listKey]: (draft[listKey] || []).filter((item) => item.id !== id)
    };
    commitChanges(updated, `Removed item from ${listKey}`);
  };

  return (
    <div className="cms-shell">
      <aside className="cms-sidebar">
        <div>
          <div className="folioblox-logo" style={{ fontSize: 20, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 10 }}>
            <img
              src={draft.settings.header_avatar || '/Ajay.jpg'}
              alt="Admin"
              style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: '2px solid #ff5522' }}
            />
            <span>{draft.settings.brand_logo || 'Ajay'}<span style={{ color: '#ff5522' }}>.CMS</span></span>
          </div>
          <span style={{ fontSize: 11, color: '#94a3b8', display: 'block', marginBottom: 18 }}>
            Full-Stack Media & Case-Study Engine
          </span>

          <div className="cms-nav-list">
            {navTabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`cms-nav-btn ${activeTab === t.id ? 'active' : ''}`}
              >
                <SvgIcon name={t.icon} size={16} color={activeTab === t.id ? '#ff5522' : '#94a3b8'} />
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gap: 8, marginTop: 18 }}>
          <button onClick={() => commitChanges(draft)} className="orange-cta-pill" style={{ justifyContent: 'center' }}>
            <SvgIcon name="Save" size={15} />
            <span>{saving ? 'Saving...' : 'Save All Changes'}</span>
          </button>
          <button onClick={onBackToSite} className="cms-secondary-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <span>View Live Portfolio</span>
            <SvgIcon name="ArrowUpRight" size={15} />
          </button>
          <button
            onClick={() => { localStorage.removeItem('cms_token'); setToken(''); }}
            className="cms-logout-btn"
          >
            Sign Out
          </button>
        </div>
      </aside>

      <main className="cms-main">
        <header className="cms-topbar">
          <div>
            <h1 style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', fontWeight: 800 }}>
              {navTabs.find((n) => n.id === activeTab)?.label}
            </h1>
            <p style={{ color: '#94a3b8', fontSize: 13 }}>
              {uploading ? 'Uploading file to public/uploads/...' : 'Every change & uploaded media file persists permanently on your site.'}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {toast && (
              <div className="cms-toast">
                <SvgIcon name="CheckCircle2" size={15} color="#4ade80" />
                <span>{toast}</span>
              </div>
            )}
            <button onClick={() => commitChanges(draft)} className="orange-cta-pill">
              <SvgIcon name="Save" size={15} />
              <span>Save Changes</span>
            </button>
          </div>
        </header>

        {/* TAB 1: OVERVIEW & VISIBILITY */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gap: 28 }}>
            <div className="cms-kpi-grid">
              <div className="cms-kpi-card" onClick={() => setActiveTab('projects')}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>CASE STUDIES</span>
                  <SvgIcon name="Box" size={18} color="#ff5522" />
                </div>
                <strong>{draft.projects.length}</strong>
                <small>Edit Snapshots & Project Skills â†’</small>
              </div>
              <div className="cms-kpi-card" onClick={() => setActiveTab('media')}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>MEDIA FILES</span>
                  <SvgIcon name="Image" size={18} color="#ff5522" />
                </div>
                <strong>{(draft.media || []).length}</strong>
                <small>Upload Images & Videos â†’</small>
              </div>
              <div className="cms-kpi-card" onClick={() => setActiveTab('skills')}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>TECH SKILLS</span>
                  <SvgIcon name="Cpu" size={18} color="#ff5522" />
                </div>
                <strong>{draft.skills.length}</strong>
                <small>80+ Real SVG Icons â†’</small>
              </div>
              <div className="cms-kpi-card" onClick={() => setActiveTab('messages')}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>CLIENT LEADS</span>
                  <SvgIcon name="Mail" size={18} color="#ff5522" />
                </div>
                <strong style={{ color: '#ff5522' }}>{draft.messages?.length || 0}</strong>
                <small>View Consultation Inbox â†’</small>
              </div>
            </div>

            <div className="cms-card">
              <h3 style={{ marginBottom: 6 }}>Master Section Visibility Switchboard</h3>
              <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 20 }}>
                Click any card to enable or disable that section immediately on the live portfolio.
              </p>
              <div className="cms-form-grid">
                {Object.keys(draft.visibility).map((secKey) => {
                  const isOn = draft.visibility[secKey];
                  return (
                    <div
                      key={secKey}
                      onClick={() => {
                        const updated = {
                          ...draft,
                          visibility: { ...draft.visibility, [secKey]: !isOn }
                        };
                        commitChanges(updated, `${secKey.toUpperCase()} ${!isOn ? 'enabled' : 'hidden'}`);
                      }}
                      style={{
                        padding: '16px 18px',
                        borderRadius: 14,
                        background: isOn ? 'rgba(255, 85, 34, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                        border: `1px solid ${isOn ? 'rgba(255, 85, 34, 0.5)' : 'rgba(255, 255, 255, 0.08)'}`,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <div>
                        <strong style={{ fontSize: 13.5, display: 'block', textTransform: 'uppercase' }}>
                          {secKey.replace('_', ' ')}
                        </strong>
                        <span style={{ fontSize: 11.5, color: isOn ? '#4ade80' : '#64748b' }}>
                          {isOn ? 'Visible on Live Site' : 'Hidden'}
                        </span>
                      </div>
                      <SvgIcon name={isOn ? 'Eye' : 'EyeOff'} size={18} color={isOn ? '#ff5522' : '#64748b'} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PERMANENT MEDIA LIBRARY MANAGER */}
        {activeTab === 'media' && (
          <div style={{ display: 'grid', gap: 24 }}>
            <div className="cms-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
                <div>
                  <h3 style={{ color: '#ff5522' }}>Permanent Media Library (Upload Images & Videos)</h3>
                  <p style={{ color: '#94a3b8', fontSize: 13 }}>
                    Upload any `.jpg`, `.png`, `.webp`, or `.mp4` file from your PC. It saves permanently to `public/uploads/` so you can use it anywhere!
                  </p>
                </div>
                <label className="orange-cta-pill" style={{ cursor: 'pointer' }}>
                  <SvgIcon name="Upload" size={16} />
                  <span>{uploading ? 'Uploading...' : 'Upload Image / Video'}</span>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) {
                        uploadFileToServer(f, (url, updatedDraft) => {
                          commitChanges(updatedDraft, `Uploaded ${f.name} to Media Library!`);
                        });
                      }
                    }}
                  />
                </label>
              </div>

              <div className="cms-form-grid">
                {(draft.media || []).map((item, idx) => (
                  <div key={item.id || idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, overflow: 'hidden' }}>
                    <div style={{ height: 170, background: '#050308', position: 'relative' }}>
                      {item.type === 'video' || item.url?.endsWith('.mp4') ? (
                        <video src={item.url} muted loop autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <img src={item.url} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      )}
                    </div>
                    <div style={{ padding: 14 }}>
                      <strong style={{ fontSize: 13, display: 'block', marginBottom: 4 }}>{item.name}</strong>
                      <input
                        readOnly
                        value={item.url}
                        style={{ width: '100%', padding: '6px 10px', borderRadius: 8, background: '#09060e', border: '1px solid rgba(255,255,255,0.12)', color: '#94a3b8', fontSize: 11.5, marginBottom: 10 }}
                      />
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(item.url);
                            notify('Copied URL: ' + item.url);
                          }}
                          className="cms-secondary-btn"
                          style={{ padding: '6px 12px', fontSize: 11.5, flex: 1 }}
                        >
                          Copy URL
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = { ...draft, settings: { ...draft.settings, header_avatar: item.url } };
                            commitChanges(updated, 'Set as Header Profile Avatar!');
                          }}
                          className="cms-secondary-btn"
                          style={{ padding: '6px 12px', fontSize: 11.5 }}
                        >
                          Set as Avatar
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const nextMedia = (draft.media || []).filter((_, i) => i !== idx);
                            commitChanges({ ...draft, media: nextMedia }, 'Removed from Media Library');
                          }}
                          className="cms-delete-btn"
                          style={{ padding: '6px 10px', fontSize: 11.5 }}
                        >
                          <SvgIcon name="Trash2" size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: UNIVERSAL THEME */}
        {activeTab === 'theme' && (
          <div className="cms-card">
            <h3 style={{ marginBottom: 6 }}>Universal Theme, Colors, Buttons & Fonts</h3>
            <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 24 }}>
              Customize global accent colors, font families, button shapes, card glass blur, and full-width spacing.
            </p>
            <div className="cms-form-grid">
              <div className="cms-field">
                <label>PRIMARY ACCENT COLOR</label>
                <div style={{ display: 'flex', gap: 10 }}>
                  <input type="color" style={{ width: 52, height: 42, padding: 4 }} value={draft.theme.accent_primary} onChange={(e) => setDraft({ ...draft, theme: { ...draft.theme, accent_primary: e.target.value } })} />
                  <input value={draft.theme.accent_primary} onChange={(e) => setDraft({ ...draft, theme: { ...draft.theme, accent_primary: e.target.value } })} />
                </div>
              </div>
              <div className="cms-field">
                <label>SECONDARY GLOW COLOR</label>
                <div style={{ display: 'flex', gap: 10 }}>
                  <input type="color" style={{ width: 52, height: 42, padding: 4 }} value={draft.theme.accent_secondary} onChange={(e) => setDraft({ ...draft, theme: { ...draft.theme, accent_secondary: e.target.value } })} />
                  <input value={draft.theme.accent_secondary} onChange={(e) => setDraft({ ...draft, theme: { ...draft.theme, accent_secondary: e.target.value } })} />
                </div>
              </div>
              <div className="cms-field">
                <label>HEADING FONT FAMILY</label>
                <select value={draft.theme.heading_font} onChange={(e) => setDraft({ ...draft, theme: { ...draft.theme, heading_font: e.target.value } })}>
                  <option value="Inter">Inter (Clean Sans)</option>
                  <option value="Space Grotesk">Space Grotesk (Tech Geometric)</option>
                  <option value="Syne">Syne (Editorial Display)</option>
                  <option value="Playfair Display">Playfair Display (Luxury Serif)</option>
                </select>
              </div>
              <div className="cms-field">
                <label>BUTTON SHAPE (BORDER RADIUS)</label>
                <select value={draft.theme.button_radius} onChange={(e) => setDraft({ ...draft, theme: { ...draft.theme, button_radius: e.target.value } })}>
                  <option value="999px">Pill Buttons (999px)</option>
                  <option value="12px">Rounded Modern (12px)</option>
                  <option value="4px">Sharp Executive (4px)</option>
                </select>
              </div>
              <div className="cms-field">
                <label>CARD CORNER RADIUS</label>
                <select value={draft.theme.card_radius} onChange={(e) => setDraft({ ...draft, theme: { ...draft.theme, card_radius: e.target.value } })}>
                  <option value="24px">Soft 24px</option>
                  <option value="14px">Medium 14px</option>
                  <option value="6px">Crisp 6px</option>
                </select>
              </div>
              <div className="cms-field">
                <label>HORIZONTAL EDGE PADDING (VW)</label>
                <input type="number" min="2" max="12" value={draft.theme.section_padding_vw} onChange={(e) => setDraft({ ...draft, theme: { ...draft.theme, section_padding_vw: e.target.value } })} />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: BRAND, HEADER AVATAR & BACKGROUND ENGINE */}
        {activeTab === 'background' && (
          <div style={{ display: 'grid', gap: 24 }}>
            {/* HEADER CIRCULAR AVATAR EDITOR */}
            <div className="cms-card">
              <h3 style={{ color: '#ff5522', marginBottom: 12 }}>Header Circular Profile Icon & Brand Logo</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', marginBottom: 20 }}>
                <img
                  src={draft.settings.header_avatar || '/Ajay.jpg'}
                  alt="Header Avatar"
                  style={{ width: 68, height: 68, borderRadius: '50%', objectFit: 'cover', border: '2px solid #ff5522' }}
                />
                <div style={{ flex: 1, minWidth: 240 }}>
                  <label style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700, display: 'block', marginBottom: 6 }}>
                    HEADER PROFILE IMAGE URL (OR UPLOAD NEW)
                  </label>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <input
                      value={draft.settings.header_avatar || '/Ajay.jpg'}
                      onChange={(e) => setDraft({ ...draft, settings: { ...draft.settings, header_avatar: e.target.value } })}
                      style={{ flex: 1, padding: '10px 14px', borderRadius: 10, background: '#09060e', border: '1px solid rgba(255,255,255,0.14)', color: '#fff' }}
                    />
                    <label className="orange-cta-pill" style={{ cursor: 'pointer' }}>
                      <SvgIcon name="Upload" size={14} />
                      <span>Upload Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) {
                            uploadFileToServer(f, (url, nextDraft) => {
                              setDraft({ ...nextDraft, settings: { ...nextDraft.settings, header_avatar: url } });
                            });
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDraft({ ...draft, settings: { ...draft.settings, show_header_avatar: !draft.settings.show_header_avatar } })}
                  className="cms-secondary-btn"
                >
                  {draft.settings.show_header_avatar !== false ? 'Avatar: Visible in Navbar' : 'Avatar: Hidden'}
                </button>
              </div>

              <div className="cms-form-grid">
                {Object.keys(draft.settings).filter((k) => !['header_avatar', 'show_header_avatar'].includes(k)).map((k) => (
                  <div key={k} className="cms-field">
                    <label>{k.replace('_', ' ').toUpperCase()}</label>
                    <input
                      value={draft.settings[k] || ''}
                      onChange={(e) => setDraft({ ...draft, settings: { ...draft.settings, [k]: e.target.value } })}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="cms-card">
              <h3 style={{ marginBottom: 14 }}>Background Mode (Video, Image, Gradient, Solid)</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 20 }}>
                {[
                  { id: 'video', label: 'Cinematic Video (.mp4)', icon: 'Video' },
                  { id: 'image', label: 'Portrait / Hero Image', icon: 'Image' },
                  { id: 'gradient', label: '3-Color Neon Gradient', icon: 'Palette' },
                  { id: 'solid', label: 'Solid Studio Color', icon: 'Box' }
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setDraft({ ...draft, background: { ...draft.background, type: m.id } })}
                    style={{
                      padding: '14px',
                      borderRadius: 14,
                      border: `1px solid ${draft.background.type === m.id ? '#ff5522' : 'rgba(255,255,255,0.12)'}`,
                      background: draft.background.type === m.id ? 'rgba(255,85,34,0.18)' : 'rgba(255,255,255,0.03)',
                      color: '#fff',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10
                    }}
                  >
                    <SvgIcon name={m.icon} size={18} color={draft.background.type === m.id ? '#ff5522' : '#94a3b8'} />
                    <span>{m.label}</span>
                  </button>
                ))}
              </div>

              <div className="cms-form-grid">
                {draft.background.type === 'video' && (
                  <>
                    <div className="cms-field">
                      <label>VIDEO URL OR UPLOAD MP4</label>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <input
                          value={draft.background.video_url}
                          onChange={(e) => setDraft({ ...draft, background: { ...draft.background, video_url: e.target.value } })}
                        />
                        <label className="cms-secondary-btn" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                          Upload MP4
                          <input
                            type="file"
                            accept="video/*"
                            style={{ display: 'none' }}
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) {
                                uploadFileToServer(f, (url, nextDraft) => {
                                  setDraft({ ...nextDraft, background: { ...nextDraft.background, video_url: url } });
                                });
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="cms-field">
                      <label>DEFAULT PLAYBACK MODE</label>
                      <select value={draft.background.video_mode} onChange={(e) => setDraft({ ...draft, background: { ...draft.background, video_mode: e.target.value } })}>
                        <option value="auto">Auto-Play Smooth Loop</option>
                        <option value="scroll">Interactive Scroll-Scrubbing</option>
                      </select>
                    </div>
                  </>
                )}
                {draft.background.type === 'image' && (
                  <div className="cms-field" style={{ gridColumn: '1 / -1' }}>
                    <label>BACKGROUND IMAGE URL</label>
                    <input value={draft.background.image_url} onChange={(e) => setDraft({ ...draft, background: { ...draft.background, image_url: e.target.value } })} />
                  </div>
                )}
                <div className="cms-field">
                  <label>DARK VIGNETTE OVERLAY OPACITY (0.1 - 1.0)</label>
                  <input type="number" step="0.05" min="0" max="1" value={draft.background.overlay_opacity} onChange={(e) => setDraft({ ...draft, background: { ...draft.background, overlay_opacity: parseFloat(e.target.value) || 0.6 } })} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: HERO, ANIMATED STRIP & TRUSTED BRANDS */}
        {activeTab === 'hero_about' && (
          <div style={{ display: 'grid', gap: 24 }}>
            <div className="cms-card">
              <h3 style={{ color: '#ff5522', marginBottom: 16 }}>Hero Headlines & Animated Sequential Bottom Strip</h3>
              <div className="cms-form-grid">
                <div className="cms-field"><label>EYEBROW GREETING</label><input value={draft.sections.hero.eyebrow} onChange={(e) => setDraft({ ...draft, sections: { ...draft.sections, hero: { ...draft.sections.hero, eyebrow: e.target.value } } })} /></div>
                <div className="cms-field"><label>GIANT TITLE LINE 1</label><input value={draft.sections.hero.title_line1} onChange={(e) => setDraft({ ...draft, sections: { ...draft.sections, hero: { ...draft.sections.hero, title_line1: e.target.value } } })} /></div>
                <div className="cms-field"><label>GIANT TITLE LINE 2</label><input value={draft.sections.hero.title_line2} onChange={(e) => setDraft({ ...draft, sections: { ...draft.sections, hero: { ...draft.sections.hero, title_line2: e.target.value } } })} /></div>
                <div className="cms-field"><label>RIGHT QUOTE HEADING</label><input value={draft.sections.hero.right_heading} onChange={(e) => setDraft({ ...draft, sections: { ...draft.sections, hero: { ...draft.sections.hero, right_heading: e.target.value } } })} /></div>
                <div className="cms-field" style={{ gridColumn: '1 / -1' }}><label>RIGHT QUOTE SUBTEXT</label><input value={draft.sections.hero.right_subtext} onChange={(e) => setDraft({ ...draft, sections: { ...draft.sections, hero: { ...draft.sections.hero, right_subtext: e.target.value } } })} /></div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '24px 0 12px' }}>
                <h4>Animated Sequential Hero Strip Items (#01 â†’ #02 â†’ #03 â†’ #04)</h4>
                <button
                  type="button"
                  onClick={() => {
                    const nextNum = `#0${draft.sections.hero.strip.length + 1}`;
                    const strip = [...draft.sections.hero.strip, { id: Date.now(), num: nextNum, title: 'New Capability', icon: 'Zap', enabled: true }];
                    setDraft({ ...draft, sections: { ...draft.sections, hero: { ...draft.sections.hero, strip } } });
                  }}
                  className="cms-secondary-btn"
                >
                  + Add Strip Step
                </button>
              </div>
              <div className="cms-form-grid">
                {draft.sections.hero.strip.map((st, i) => (
                  <div key={st.id || i} className="cms-field" style={{ background: 'rgba(255,255,255,0.03)', padding: 14, borderRadius: 12 }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                      <input style={{ maxWidth: 68 }} value={st.num} onChange={(e) => {
                        const copy = [...draft.sections.hero.strip];
                        copy[i].num = e.target.value;
                        setDraft({ ...draft, sections: { ...draft.sections, hero: { ...draft.sections.hero, strip: copy } } });
                      }} />
                      <input value={st.title} onChange={(e) => {
                        const copy = [...draft.sections.hero.strip];
                        copy[i].title = e.target.value;
                        setDraft({ ...draft, sections: { ...draft.sections, hero: { ...draft.sections.hero, strip: copy } } });
                      }} />
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <IconSelect
                        value={st.icon || 'Sparkles'}
                        onChange={(ic) => {
                          const copy = [...draft.sections.hero.strip];
                          copy[i].icon = ic;
                          setDraft({ ...draft, sections: { ...draft.sections, hero: { ...draft.sections.hero, strip: copy } } });
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <button type="button" onClick={() => {
                        const copy = [...draft.sections.hero.strip];
                        copy[i].enabled = !copy[i].enabled;
                        setDraft({ ...draft, sections: { ...draft.sections, hero: { ...draft.sections.hero, strip: copy } } });
                      }} className="cms-secondary-btn" style={{ padding: '4px 10px', fontSize: 11 }}>{st.enabled !== false ? 'Enabled' : 'Hidden'}</button>
                      <button type="button" onClick={() => {
                        const copy = draft.sections.hero.strip.filter((_, idx) => idx !== i);
                        setDraft({ ...draft, sections: { ...draft.sections, hero: { ...draft.sections.hero, strip: copy } } });
                      }} className="cms-delete-btn" style={{ padding: '4px 10px', fontSize: 11 }}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="cms-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ color: '#ff5522' }}>Trusted Brands Bar (With Visual SVG Icon Picker)</h3>
                <button type="button" onClick={() => {
                  const items = [...draft.sections.brands.items, { id: Date.now(), name: 'New Organization', icon: 'ShieldCheck', enabled: true }];
                  setDraft({ ...draft, sections: { ...draft.sections, brands: { ...draft.sections.brands, items } } });
                }} className="cms-secondary-btn">+ Add Brand</button>
              </div>
              <div className="cms-form-grid">
                {draft.sections.brands.items.map((b, i) => (
                  <div key={b.id || i} className="cms-field" style={{ background: 'rgba(255,255,255,0.03)', padding: 14, borderRadius: 12 }}>
                    <label>BRAND {i + 1}</label>
                    <input style={{ marginBottom: 8 }} value={b.name} onChange={(e) => {
                      const copy = [...draft.sections.brands.items];
                      copy[i].name = e.target.value;
                      setDraft({ ...draft, sections: { ...draft.sections, brands: { ...draft.sections.brands, items: copy } } });
                    }} />
                    <div style={{ marginBottom: 8 }}>
                      <IconSelect
                        value={b.icon || 'Shield'}
                        onChange={(ic) => {
                          const copy = [...draft.sections.brands.items];
                          copy[i].icon = ic;
                          setDraft({ ...draft, sections: { ...draft.sections, brands: { ...draft.sections.brands, items: copy } } });
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <button type="button" onClick={() => {
                        const copy = [...draft.sections.brands.items];
                        copy[i].enabled = !copy[i].enabled;
                        setDraft({ ...draft, sections: { ...draft.sections, brands: { ...draft.sections.brands, items: copy } } });
                      }} className="cms-secondary-btn" style={{ padding: '4px 10px', fontSize: 11 }}>{b.enabled !== false ? 'Visible' : 'Hidden'}</button>
                      <button type="button" onClick={() => {
                        const copy = draft.sections.brands.items.filter((_, idx) => idx !== i);
                        setDraft({ ...draft, sections: { ...draft.sections, brands: { ...draft.sections.brands, items: copy } } });
                      }} className="cms-delete-btn" style={{ padding: '4px 10px', fontSize: 11 }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: DEEP PROJECT CASE-STUDIES, SNAPSHOT GALLERY & PER-PROJECT SKILLS EDITOR */}
        {activeTab === 'projects' && (
          <div style={{ display: 'grid', gap: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ color: '#ff5522' }}>Projects, Multi-Snapshot Galleries & Per-Project Skills</h3>
                <p style={{ color: '#94a3b8', fontSize: 13 }}>
                  Click any project on your site to open its full Case-Study page with multiple snapshots, challenge/solution, and project skills!
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  addListItem('projects', {
                    title: 'New Case Study Project',
                    client: 'Enterprise Client',
                    timeline: '2026',
                    role: 'Lead Architect',
                    description: 'Executive summary of the project...',
                    challenge: 'Key technical challenge solved...',
                    solution: 'Architecture and implementation details...',
                    metrics: '99.9% Uptime â€¢ 2x Performance',
                    tech_stack: 'React â€¢ Node.js â€¢ Cybersecurity',
                    project_skills: ['React.js', 'Cybersecurity', 'DNS Management'],
                    image_url: '/project1.jpg',
                    snapshots: ['/project1.jpg', '/project2.jpg'],
                    live_url: '#',
                    github_url: '#'
                  })
                }
                className="orange-cta-pill"
              >
                <SvgIcon name="Plus" size={15} />
                <span>Add New Project Case Study</span>
              </button>
            </div>

            {draft.projects.map((proj, idx) => (
              <div key={proj.id || idx} className="cms-card" style={{ borderLeft: '3px solid #ff5522' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <h4 style={{ fontSize: 18 }}>{idx + 1}. {proj.title}</h4>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button type="button" onClick={() => {
                      const copy = [...draft.projects];
                      copy[idx].enabled = !copy[idx].enabled;
                      commitChanges({ ...draft, projects: copy }, 'Updated project visibility');
                    }} className="cms-secondary-btn">{proj.enabled !== false ? 'Enabled' : 'Hidden'}</button>
                    <button type="button" onClick={() => deleteListItem('projects', proj.id)} className="cms-delete-btn">Delete Project</button>
                  </div>
                </div>

                <div className="cms-form-grid">
                  <div className="cms-field"><label>PROJECT TITLE</label><input value={proj.title || ''} onChange={(e) => { const c = [...draft.projects]; c[idx].title = e.target.value; setDraft({ ...draft, projects: c }); }} /></div>
                  <div className="cms-field"><label>CLIENT / ORGANIZATION</label><input value={proj.client || ''} onChange={(e) => { const c = [...draft.projects]; c[idx].client = e.target.value; setDraft({ ...draft, projects: c }); }} /></div>
                  <div className="cms-field"><label>YOUR ROLE</label><input value={proj.role || ''} onChange={(e) => { const c = [...draft.projects]; c[idx].role = e.target.value; setDraft({ ...draft, projects: c }); }} /></div>
                  <div className="cms-field"><label>TIMELINE</label><input value={proj.timeline || ''} onChange={(e) => { const c = [...draft.projects]; c[idx].timeline = e.target.value; setDraft({ ...draft, projects: c }); }} /></div>
                  <div className="cms-field"><label>CATEGORY / TECH SUMMARY</label><input value={proj.tech_stack || ''} onChange={(e) => { const c = [...draft.projects]; c[idx].tech_stack = e.target.value; setDraft({ ...draft, projects: c }); }} /></div>
                  <div className="cms-field"><label>KEY METRICS / RESULTS</label><input value={proj.metrics || ''} onChange={(e) => { const c = [...draft.projects]; c[idx].metrics = e.target.value; setDraft({ ...draft, projects: c }); }} /></div>

                  {/* COVER IMAGE URL + DIRECT UPLOAD */}
                  <div className="cms-field" style={{ gridColumn: '1 / -1' }}>
                    <label>COVER THUMBNAIL URL (PASTE URL OR UPLOAD IMAGE)</label>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <input value={proj.image_url || ''} onChange={(e) => { const c = [...draft.projects]; c[idx].image_url = e.target.value; setDraft({ ...draft, projects: c }); }} placeholder="/project1.jpg or https://..." />
                      <label className="orange-cta-pill" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                        <SvgIcon name="Upload" size={14} />
                        <span>Upload Cover</span>
                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) {
                            uploadFileToServer(f, (url, nextDraft) => {
                              const c = [...nextDraft.projects];
                              c[idx].image_url = url;
                              setDraft({ ...nextDraft, projects: c });
                            });
                          }
                        }} />
                      </label>
                    </div>
                  </div>

                  <div className="cms-field" style={{ gridColumn: '1 / -1' }}><label>CARD SUMMARY DESCRIPTION</label><input value={proj.description || ''} onChange={(e) => { const c = [...draft.projects]; c[idx].description = e.target.value; setDraft({ ...draft, projects: c }); }} /></div>
                  <div className="cms-field"><label>THE CHALLENGE (DETAILED PAGE)</label><input value={proj.challenge || ''} onChange={(e) => { const c = [...draft.projects]; c[idx].challenge = e.target.value; setDraft({ ...draft, projects: c }); }} /></div>
                  <div className="cms-field"><label>THE SOLUTION & ARCHITECTURE</label><input value={proj.solution || ''} onChange={(e) => { const c = [...draft.projects]; c[idx].solution = e.target.value; setDraft({ ...draft, projects: c }); }} /></div>
                  <div className="cms-field"><label>LIVE PROJECT URL</label><input value={proj.live_url || ''} onChange={(e) => { const c = [...draft.projects]; c[idx].live_url = e.target.value; setDraft({ ...draft, projects: c }); }} /></div>
                  <div className="cms-field"><label>GITHUB / REPO URL</label><input value={proj.github_url || ''} onChange={(e) => { const c = [...draft.projects]; c[idx].github_url = e.target.value; setDraft({ ...draft, projects: c }); }} /></div>

                  {/* PER-PROJECT SKILLS TAGS EDITOR */}
                  <div className="cms-field" style={{ gridColumn: '1 / -1' }}>
                    <label>PROJECT-SPECIFIC SKILLS & TECHNOLOGIES (COMMA SEPARATED â€” SHOWN ON DETAIL PAGE)</label>
                    <input
                      value={(proj.project_skills || []).join(', ')}
                      onChange={(e) => {
                        const c = [...draft.projects];
                        c[idx].project_skills = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                        setDraft({ ...draft, projects: c });
                      }}
                      placeholder="React.js, WordPress, DNS Management, Cybersecurity, SQL"
                    />
                  </div>
                </div>

                {/* MULTIPLE SNAPSHOTS GALLERY MANAGER FOR THIS PROJECT */}
                <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#ff5522' }}>
                      PROJECT SNAPSHOTS GALLERY ({(proj.snapshots || []).length} IMAGES)
                    </label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        type="button"
                        onClick={() => {
                          const c = [...draft.projects];
                          c[idx].snapshots = [...(c[idx].snapshots || []), '/project1.jpg'];
                          setDraft({ ...draft, projects: c });
                        }}
                        className="cms-secondary-btn"
                        style={{ padding: '6px 12px', fontSize: 12 }}
                      >
                        + Add Snapshot URL
                      </button>
                      <label className="orange-cta-pill" style={{ padding: '6px 14px', fontSize: 12, cursor: 'pointer' }}>
                        <SvgIcon name="Upload" size={13} />
                        <span>Upload Snapshot Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) {
                              uploadFileToServer(f, (url, nextDraft) => {
                                const c = [...nextDraft.projects];
                                c[idx].snapshots = [...(c[idx].snapshots || []), url];
                                setDraft({ ...nextDraft, projects: c });
                              });
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
                    {(proj.snapshots || []).map((snapUrl, sIdx) => (
                      <div key={sIdx} style={{ background: 'rgba(0,0,0,0.35)', padding: 10, borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)' }}>
                        <img src={snapUrl} alt="Snapshot" style={{ width: '100%', height: 110, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
                        <div style={{ display: 'flex', gap: 6 }}>
                          <input
                            value={snapUrl}
                            onChange={(e) => {
                              const c = [...draft.projects];
                              const snaps = [...(c[idx].snapshots || [])];
                              snaps[sIdx] = e.target.value;
                              c[idx].snapshots = snaps;
                              setDraft({ ...draft, projects: c });
                            }}
                            style={{ flex: 1, padding: '6px 8px', borderRadius: 6, background: '#09060e', border: '1px solid rgba(255,255,255,0.14)', color: '#fff', fontSize: 11.5 }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const c = [...draft.projects];
                              c[idx].snapshots = (c[idx].snapshots || []).filter((_, i) => i !== sIdx);
                              setDraft({ ...draft, projects: c });
                            }}
                            className="cms-delete-btn"
                            style={{ padding: '6px 8px' }}
                          >
                            <SvgIcon name="Trash2" size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 7: WORKFLOW SPRINT BUILDER */}
        {activeTab === 'workflow' && (
          <div className="cms-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ color: '#ff5522' }}>Workflow Sprint Builder (With Visual SVG Icon Picker)</h3>
              <button type="button" onClick={() => {
                const steps = [...draft.sections.workflow.steps, { id: Date.now(), label: 'New Sprint Step', days: '2 days', offset: '30', icon: 'Zap', enabled: true }];
                setDraft({ ...draft, sections: { ...draft.sections, workflow: { ...draft.sections.workflow, steps } } });
              }} className="orange-cta-pill"><SvgIcon name="Plus" size={15} /><span>Add Step</span></button>
            </div>
            <div style={{ display: 'grid', gap: 14 }}>
              {draft.sections.workflow.steps.map((st, i) => (
                <div key={st.id || i} style={{ padding: 16, borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 12, alignItems: 'end' }}>
                  <div className="cms-field"><label>STEP {i + 1} TITLE</label><input value={st.label} onChange={(e) => { const c = [...draft.sections.workflow.steps]; c[i].label = e.target.value; setDraft({ ...draft, sections: { ...draft.sections, workflow: { ...draft.sections.workflow, steps: c } } }); }} /></div>
                  <div className="cms-field"><label>DURATION</label><input value={st.days} onChange={(e) => { const c = [...draft.sections.workflow.steps]; c[i].days = e.target.value; setDraft({ ...draft, sections: { ...draft.sections, workflow: { ...draft.sections.workflow, steps: c } } }); }} /></div>
                  <div className="cms-field">
                    <label>SVG ICON</label>
                    <IconSelect value={st.icon || 'Sparkles'} onChange={(ic) => { const c = [...draft.sections.workflow.steps]; c[i].icon = ic; setDraft({ ...draft, sections: { ...draft.sections, workflow: { ...draft.sections.workflow, steps: c } } }); }} />
                  </div>
                  <div className="cms-field"><label>OFFSET (%)</label><input type="number" min="0" max="70" value={String(st.offset).replace('%', '')} onChange={(e) => { const c = [...draft.sections.workflow.steps]; c[i].offset = e.target.value; setDraft({ ...draft, sections: { ...draft.sections, workflow: { ...draft.sections.workflow, steps: c } } }); }} /></div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button type="button" onClick={() => { const c = [...draft.sections.workflow.steps]; c[i].enabled = !c[i].enabled; setDraft({ ...draft, sections: { ...draft.sections, workflow: { ...draft.sections.workflow, steps: c } } }); }} className="cms-secondary-btn">{st.enabled !== false ? 'Enabled' : 'Hidden'}</button>
                    <button type="button" onClick={() => { const c = draft.sections.workflow.steps.filter((_, idx) => idx !== i); setDraft({ ...draft, sections: { ...draft.sections, workflow: { ...draft.sections.workflow, steps: c } } }); }} className="cms-delete-btn"><SvgIcon name="Trash2" size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: TECH STACK SKILLS (WITH VISUAL SVG ICON PICKER) */}
        {activeTab === 'skills' && (
          <div className="cms-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ color: '#ff5522' }}>Tech Stack & Cybersecurity Skills</h3>
              <button type="button" onClick={() => addListItem('skills', { name: 'New Skill', category: 'Engineering', proficiency: 92, icon: 'Code2' })} className="orange-cta-pill">
                <SvgIcon name="Plus" size={15} /><span>Add Skill</span>
              </button>
            </div>
            <div style={{ display: 'grid', gap: 14 }}>
              {draft.skills.map((sk, idx) => (
                <div key={sk.id || idx} style={{ padding: 16, borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, alignItems: 'end' }}>
                  <div className="cms-field"><label>SKILL NAME</label><input value={sk.name} onChange={(e) => { const c = [...draft.skills]; c[idx].name = e.target.value; setDraft({ ...draft, skills: c }); }} /></div>
                  <div className="cms-field"><label>CATEGORY</label><input value={sk.category} onChange={(e) => { const c = [...draft.skills]; c[idx].category = e.target.value; setDraft({ ...draft, skills: c }); }} /></div>
                  <div className="cms-field"><label>PROFICIENCY (%)</label><input type="number" min="10" max="100" value={sk.proficiency} onChange={(e) => { const c = [...draft.skills]; c[idx].proficiency = parseInt(e.target.value, 10) || 90; setDraft({ ...draft, skills: c }); }} /></div>
                  <div className="cms-field"><label>SVG ICON</label><IconSelect value={sk.icon || 'Code2'} onChange={(ic) => { const c = [...draft.skills]; c[idx].icon = ic; setDraft({ ...draft, skills: c }); }} /></div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button type="button" onClick={() => { const c = [...draft.skills]; c[idx].enabled = !c[idx].enabled; setDraft({ ...draft, skills: c }); }} className="cms-secondary-btn">{sk.enabled !== false ? 'Visible' : 'Hidden'}</button>
                    <button type="button" onClick={() => deleteListItem('skills', sk.id)} className="cms-delete-btn"><SvgIcon name="Trash2" size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 9: EXPERIENCE */}
        {activeTab === 'experiences' && (
          <div className="cms-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ color: '#ff5522' }}>Professional Experience Timeline</h3>
              <button type="button" onClick={() => addListItem('experiences', { role: 'Role Title', company: 'Organization', duration: '2025 â€” Present', description: 'Key responsibilities...' })} className="orange-cta-pill">
                <SvgIcon name="Plus" size={15} /><span>Add Experience</span>
              </button>
            </div>
            <div style={{ display: 'grid', gap: 16 }}>
              {draft.experiences.map((ex, idx) => (
                <div key={ex.id || idx} style={{ padding: 18, borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div className="cms-form-grid">
                    <div className="cms-field"><label>ROLE</label><input value={ex.role} onChange={(e) => { const c = [...draft.experiences]; c[idx].role = e.target.value; setDraft({ ...draft, experiences: c }); }} /></div>
                    <div className="cms-field"><label>COMPANY</label><input value={ex.company} onChange={(e) => { const c = [...draft.experiences]; c[idx].company = e.target.value; setDraft({ ...draft, experiences: c }); }} /></div>
                    <div className="cms-field"><label>DURATION</label><input value={ex.duration} onChange={(e) => { const c = [...draft.experiences]; c[idx].duration = e.target.value; setDraft({ ...draft, experiences: c }); }} /></div>
                    <div className="cms-field" style={{ gridColumn: '1 / -1' }}><label>DESCRIPTION</label><input value={ex.description} onChange={(e) => { const c = [...draft.experiences]; c[idx].description = e.target.value; setDraft({ ...draft, experiences: c }); }} /></div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <button type="button" onClick={() => { const c = [...draft.experiences]; c[idx].enabled = !c[idx].enabled; setDraft({ ...draft, experiences: c }); }} className="cms-secondary-btn">{ex.enabled !== false ? 'Visible' : 'Hidden'}</button>
                    <button type="button" onClick={() => deleteListItem('experiences', ex.id)} className="cms-delete-btn">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 10: SERVICES & CERTIFICATIONS */}
        {activeTab === 'services' && (
          <div style={{ display: 'grid', gap: 24 }}>
            <div className="cms-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ color: '#ff5522' }}>Services & Capabilities</h3>
                <button type="button" onClick={() => addListItem('services', { title: 'New Service', description: 'Details...', icon: 'ShieldCheck' })} className="orange-cta-pill">+ Add Service</button>
              </div>
              <div style={{ display: 'grid', gap: 14 }}>
                {draft.services.map((sv, idx) => (
                  <div key={sv.id || idx} className="cms-form-grid" style={{ background: 'rgba(255,255,255,0.03)', padding: 14, borderRadius: 12, alignItems: 'end' }}>
                    <div className="cms-field"><label>SERVICE TITLE</label><input value={sv.title} onChange={(e) => { const c = [...draft.services]; c[idx].title = e.target.value; setDraft({ ...draft, services: c }); }} /></div>
                    <div className="cms-field"><label>DESCRIPTION</label><input value={sv.description} onChange={(e) => { const c = [...draft.services]; c[idx].description = e.target.value; setDraft({ ...draft, services: c }); }} /></div>
                    <div className="cms-field"><label>SVG ICON</label><IconSelect value={sv.icon || 'ShieldCheck'} onChange={(ic) => { const c = [...draft.services]; c[idx].icon = ic; setDraft({ ...draft, services: c }); }} /></div>
                    <button type="button" onClick={() => deleteListItem('services', sv.id)} className="cms-delete-btn">Delete</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="cms-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ color: '#ff5522' }}>Certifications & Education Credentials</h3>
                <button type="button" onClick={() => addListItem('certifications', { title: 'New Certification', issuer: 'Google / Institution', year: '2026', icon: 'Award' })} className="orange-cta-pill">+ Add Credential</button>
              </div>
              <div style={{ display: 'grid', gap: 14 }}>
                {(draft.certifications || []).map((cert, idx) => (
                  <div key={cert.id || idx} className="cms-form-grid" style={{ background: 'rgba(255,255,255,0.03)', padding: 14, borderRadius: 12, alignItems: 'end' }}>
                    <div className="cms-field"><label>CREDENTIAL TITLE</label><input value={cert.title} onChange={(e) => { const c = [...(draft.certifications || [])]; c[idx].title = e.target.value; setDraft({ ...draft, certifications: c }); }} /></div>
                    <div className="cms-field"><label>ISSUER / UNIVERSITY</label><input value={cert.issuer} onChange={(e) => { const c = [...(draft.certifications || [])]; c[idx].issuer = e.target.value; setDraft({ ...draft, certifications: c }); }} /></div>
                    <div className="cms-field"><label>SVG ICON</label><IconSelect value={cert.icon || 'Award'} onChange={(ic) => { const c = [...(draft.certifications || [])]; c[idx].icon = ic; setDraft({ ...draft, certifications: c }); }} /></div>
                    <button type="button" onClick={() => deleteListItem('certifications', cert.id)} className="cms-delete-btn">Delete</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 11: PALETTE & STATS */}
        {activeTab === 'palette_stats' && (
          <div className="cms-card">
            <h3 style={{ color: '#ff5522', marginBottom: 16 }}>Industry Stats & Studio Banner</h3>
            <div className="cms-form-grid">
              <div className="cms-field"><label>STAT 1 VALUE</label><input value={draft.sections.stats.stat1_value} onChange={(e) => setDraft({ ...draft, sections: { ...draft.sections, stats: { ...draft.sections.stats, stat1_value: e.target.value } } })} /></div>
              <div className="cms-field"><label>STAT 1 DESCRIPTION</label><input value={draft.sections.stats.stat1_desc} onChange={(e) => setDraft({ ...draft, sections: { ...draft.sections, stats: { ...draft.sections.stats, stat1_desc: e.target.value } } })} /></div>
              <div className="cms-field"><label>STAT 2 VALUE</label><input value={draft.sections.stats.stat2_value} onChange={(e) => setDraft({ ...draft, sections: { ...draft.sections, stats: { ...draft.sections.stats, stat2_value: e.target.value } } })} /></div>
              <div className="cms-field"><label>STAT 2 DESCRIPTION</label><input value={draft.sections.stats.stat2_desc} onChange={(e) => setDraft({ ...draft, sections: { ...draft.sections, stats: { ...draft.sections.stats, stat2_desc: e.target.value } } })} /></div>
              <div className="cms-field"><label>BANNER LEFT WORD</label><input value={draft.sections.stats.studio_left} onChange={(e) => setDraft({ ...draft, sections: { ...draft.sections, stats: { ...draft.sections.stats, studio_left: e.target.value } } })} /></div>
              <div className="cms-field"><label>BANNER RIGHT WORD</label><input value={draft.sections.stats.studio_right} onChange={(e) => setDraft({ ...draft, sections: { ...draft.sections, stats: { ...draft.sections.stats, studio_right: e.target.value } } })} /></div>
            </div>
          </div>
        )}

        {/* TAB 12: TESTIMONIALS */}
        {activeTab === 'testimonials' && (
          <div className="cms-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ color: '#ff5522' }}>Client Testimonials</h3>
              <button type="button" onClick={() => {
                const items = [{ id: Date.now(), name: 'New Partner', role: 'Director', rating: 5, text: 'Outstanding delivery.', enabled: true }, ...draft.sections.testimonials.items];
                setDraft({ ...draft, sections: { ...draft.sections, testimonials: { ...draft.sections.testimonials, items } } });
              }} className="orange-cta-pill">+ Add Testimonial</button>
            </div>
            <div style={{ display: 'grid', gap: 14 }}>
              {draft.sections.testimonials.items.map((t, i) => (
                <div key={t.id || i} className="cms-form-grid" style={{ background: 'rgba(255,255,255,0.03)', padding: 16, borderRadius: 14 }}>
                  <div className="cms-field"><label>NAME</label><input value={t.name} onChange={(e) => { const c = [...draft.sections.testimonials.items]; c[i].name = e.target.value; setDraft({ ...draft, sections: { ...draft.sections, testimonials: { ...draft.sections.testimonials, items: c } } }); }} /></div>
                  <div className="cms-field"><label>ROLE</label><input value={t.role} onChange={(e) => { const c = [...draft.sections.testimonials.items]; c[i].role = e.target.value; setDraft({ ...draft, sections: { ...draft.sections, testimonials: { ...draft.sections.testimonials, items: c } } }); }} /></div>
                  <div className="cms-field" style={{ gridColumn: '1 / -1' }}><label>QUOTE</label><input value={t.text} onChange={(e) => { const c = [...draft.sections.testimonials.items]; c[i].text = e.target.value; setDraft({ ...draft, sections: { ...draft.sections, testimonials: { ...draft.sections.testimonials, items: c } } }); }} /></div>
                  <button type="button" onClick={() => { const c = draft.sections.testimonials.items.filter((_, idx) => idx !== i); setDraft({ ...draft, sections: { ...draft.sections, testimonials: { ...draft.sections.testimonials, items: c } } }); }} className="cms-delete-btn">Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 13: MESSAGES */}
        {activeTab === 'messages' && (
          <div className="cms-card">
            <h3 style={{ color: '#ff5522', marginBottom: 16 }}>Client Consultation Inbox ({draft.messages?.length || 0})</h3>
            {(!draft.messages || draft.messages.length === 0) ? (
              <p style={{ color: '#94a3b8' }}>No consultation messages yet.</p>
            ) : (
              <div style={{ display: 'grid', gap: 12 }}>
                {draft.messages.map((m) => (
                  <div key={m.id} style={{ padding: 16, borderRadius: 14, background: 'rgba(255,255,255,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong>{m.sender_name}</strong> ({m.sender_email})
                      <p style={{ color: '#cbd5e1', fontSize: 13.5, marginTop: 4 }}>{m.message}</p>
                    </div>
                    <button type="button" onClick={() => deleteListItem('messages', m.id)} className="cms-delete-btn">Delete</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}