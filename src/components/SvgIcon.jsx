import React, { useState, useRef, useEffect } from 'react';
import * as Icons from 'lucide-react';

export const ICON_OPTIONS = [
  'Shield', 'ShieldCheck', 'ShieldAlert', 'Lock', 'Key', 'Fingerprint', 'Scan', 'Eye', 'EyeOff',
  'Code2', 'Terminal', 'Cpu', 'Server', 'Database', 'HardDrive', 'Cloud', 'Network', 'Wifi', 'Globe',
  'Layers', 'Box', 'Package', 'Component', 'Layout', 'Grid', 'Columns', 'Sidebar', 'PanelTop',
  'Sparkles', 'Zap', 'Flame', 'Star', 'Award', 'Trophy', 'Crown', 'Gem', 'Rocket', 'Compass',
  'Search', 'Target', 'Crosshair', 'Activity', 'BarChart2', 'PieChart', 'TrendingUp', 'LineChart',
  'Smartphone', 'Monitor', 'Laptop', 'Tablet', 'Tv', 'Watch', 'Headphones', 'Camera', 'Video', 'Image',
  'PenTool', 'Palette', 'Brush', 'Figma', 'Framer', 'GitBranch', 'GitCommit', 'GitMerge', 'Github',
  'Linkedin', 'Twitter', 'Mail', 'Phone', 'MapPin', 'Calendar', 'Clock', 'CheckCircle2', 'AlertCircle',
  'Briefcase', 'Building', 'Users', 'UserCheck', 'FileText', 'Folder', 'Download', 'Upload', 'ExternalLink',
  'ArrowRight', 'ArrowUpRight', 'ChevronRight', 'Play', 'Sliders', 'Settings', 'Wrench', 'RefreshCw',
  'Plus', 'Trash2', 'Save', 'Copy', 'Check', 'Menu', 'X'
];

export default function SvgIcon({ name = 'Sparkles', size = 18, color = 'currentColor', strokeWidth = 2, className = '' }) {
  const IconComponent = Icons[name] || Icons.Sparkles;
  return <IconComponent size={size} color={color} strokeWidth={strokeWidth} className={className} />;
}

export function IconSelect({ value = 'Sparkles', onChange }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const wrapRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const filtered = ICON_OPTIONS.filter((ic) => ic.toLowerCase().includes(search.toLowerCase()));

  return (
    <div ref={wrapRef} style={{ position: 'relative', width: '100%' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          padding: '10px 14px',
          borderRadius: 10,
          border: '1px solid rgba(255,255,255,0.16)',
          background: '#09060e',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          fontSize: 13.5
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <SvgIcon name={value} size={17} color="#ff5522" />
          <span>{value}</span>
        </span>
        <SvgIcon name="ChevronRight" size={15} color="#94a3b8" />
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            width: 300,
            maxHeight: 320,
            background: '#110c1a',
            border: '1px solid rgba(255, 85, 34, 0.5)',
            borderRadius: 14,
            padding: 12,
            zIndex: 999,
            boxShadow: '0 24px 60px rgba(0,0,0,0.85)',
            display: 'flex',
            flexDirection: 'column',
            gap: 10
          }}
        >
          <input
            placeholder="Search 80+ SVG icons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.15)',
              background: '#07040a',
              color: '#fff',
              fontSize: 12.5
            }}
          />
          <div
            style={{
              overflowY: 'auto',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 6,
              maxHeight: 240
            }}
          >
            {filtered.map((ic) => (
              <button
                key={ic}
                type="button"
                onClick={() => {
                  onChange(ic);
                  setOpen(false);
                }}
                style={{
                  padding: '8px 10px',
                  borderRadius: 8,
                  border: value === ic ? '1px solid #ff5522' : '1px solid transparent',
                  background: value === ic ? 'rgba(255,85,34,0.18)' : 'rgba(255,255,255,0.03)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 12,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <SvgIcon name={ic} size={15} color={value === ic ? '#ff5522' : '#cbd5e1'} />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ic}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}