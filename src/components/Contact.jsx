
import React, { useState } from 'react';
import axios from 'axios';

export default function Contact({ apiEndpoint, settings }) {
  const [form, setForm] = useState({ sender_name: '', sender_email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(apiEndpoint || 'http://localhost:5000/api/contact', form);
      setSent(true);
      setForm({ sender_name: '', sender_email: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-container">
      <div className="contact-glass-wrapper">
        <div className="contact-info-side">
          <span className="eyebrow-badge">✦ INITIALIZE CONNECTION</span>
          <h2 className="section-heading" style={{ marginBottom: 16 }}>
            Let’s Build Something <span className="gradient-text">Extraordinary</span>
          </h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: 32, fontSize: 15 }}>
            Whether you need an interactive 3D WebGL experience, a scalable Node.js & MySQL platform, or a custom full-stack product, drop a message below—it goes straight to my live Admin CMS.
          </p>

          <div className="contact-meta-list">
            <div className="contact-meta-item">
              <span className="meta-icon">📧</span>
              <div>
                <small>Direct Email</small>
                <strong>{settings?.email || 'ajay@example.com'}</strong>
              </div>
            </div>
            <div className="contact-meta-item">
              <span className="meta-icon">⚡</span>
              <div>
                <small>Tech Stack</small>
                <strong>React • Vite • Three.js • Node.js • MySQL</strong>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="contact-form-side">
          <div className="input-group">
            <label>YOUR NAME</label>
            <input
              required
              placeholder="e.g. Elon Musk"
              value={form.sender_name}
              onChange={(e) => setForm({ ...form, sender_name: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label>YOUR EMAIL</label>
            <input
              required
              type="email"
              placeholder="name@company.com"
              value={form.sender_email}
              onChange={(e) => setForm({ ...form, sender_email: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label>PROJECT DETAILS</label>
            <textarea
              required
              rows={4}
              placeholder="Tell me about your timeline, goals, and requirements..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>
          <button type="submit" disabled={loading} className="btn-glow-primary" style={{ width: '100%', justifyContent: 'center' }}>
            {loading ? 'Transmitting...' : 'Send Message to Admin CMS →'}
          </button>
          {sent && (
            <div className="success-toast">
              ✅ Message stored in MySQL! Check the MESSAGES tab inside ⚙️ Admin CMS.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
