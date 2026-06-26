import React, { useState } from 'react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed]     = useState(false);
  const [chats, setChats]       = useState([]);
  const [qrScans, setQrScans]   = useState([]);
  const [arsClicks, setArsClicks] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [selected, setSelected] = useState(null);
  const [search, setSearch]     = useState('');

  async function login(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/chats', { headers: { 'x-admin-password': password } });
      if (!res.ok) { setError('Wrong password.'); setLoading(false); return; }
      const data = await res.json();
      setChats(data.chats ?? []);
      setQrScans(data.qrScans ?? []);
      setArsClicks(data.arsClicks ?? []);
      setAuthed(true);
    } catch { setError('Could not connect. Try again.'); }
    setLoading(false);
  }

  async function refresh() {
    setLoading(true);
    try {
      const res = await fetch('/api/chats', { headers: { 'x-admin-password': password } });
      if (res.ok) {
        const data = await res.json();
        setChats(data.chats ?? []);
        setQrScans(data.qrScans ?? []);
        setArsClicks(data.arsClicks ?? []);
      }
    } catch {}
    setLoading(false);
  }

  const filtered = chats.filter(c =>
    (c.user_message ?? '').toLowerCase().includes(search.toLowerCase()) ||
    (c.bot_reply ?? '').toLowerCase().includes(search.toLowerCase())
  );

  function fmtTime(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  function fmtBubbleTime(iso) {
    if (!iso) return '';
    return new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  // ── Login ──────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="admin-login-wrap">
        <div className="admin-login-card">
          <div className="admin-login-logo">SK</div>
          <h1 className="admin-login-title">Admin Access</h1>
          <p className="admin-login-sub">Enter your admin password to view chat logs.</p>
          <form onSubmit={login} className="admin-login-form">
            <input type="password" placeholder="Admin password" value={password}
              onChange={e => setPassword(e.target.value)} className="admin-input" autoFocus />
            {error && <p className="admin-error">{error}</p>}
            <button type="submit" className="admin-btn-primary" disabled={loading || !password}>
              {loading ? 'Checking…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Dashboard ──────────────────────────────────────────────────────
  return (
    <div className="admin-wrap">
      {/* Sidebar — conversation list */}
      <aside className="wa-sidebar">
        <div className="wa-sidebar-header">
          <div className="wa-sidebar-logo">SK</div>
          <span className="wa-sidebar-title">Chat Logs</span>
          <button className="wa-refresh-btn" onClick={refresh} disabled={loading} title="Refresh">
            {loading ? '…' : '↻'}
          </button>
        </div>
        {/* Stats */}
        <div className="wa-stats">
          <div className="wa-stat">
            <span className="wa-stat-val">{chats.length}</span>
            <span className="wa-stat-label">💬 Chats</span>
          </div>
          <div className="wa-stat-divider" />
          <div className="wa-stat">
            <span className="wa-stat-val">{qrScans.length}</span>
            <span className="wa-stat-label">📱 QR Scans</span>
          </div>
          <div className="wa-stat-divider" />
          <div className="wa-stat">
            <span className="wa-stat-val">{arsClicks.length}</span>
            <span className="wa-stat-label">🤖 ARS Clicks</span>
          </div>
          {qrScans.length > 0 && (
            <>
              <div className="wa-stat-divider" />
              <div className="wa-stat">
                <span className="wa-stat-val" style={{ fontSize: '.7rem' }}>
                  {fmtTime(qrScans[0].scanned_at)}
                </span>
                <span className="wa-stat-label">Last scan</span>
              </div>
            </>
          )}
        </div>

        <div className="wa-search-wrap">
          <input className="wa-search" placeholder="Search conversations…"
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="wa-list">
          {filtered.length === 0 && (
            <p className="wa-empty-list">{search ? 'No results.' : 'No conversations yet.'}</p>
          )}
          {filtered.map((chat, i) => (
            <div
              key={chat.id}
              className={`wa-list-item${selected?.id === chat.id ? ' active' : ''}`}
              onClick={() => setSelected(chat)}
            >
              <div className="wa-list-avatar">👤</div>
              <div className="wa-list-body">
                <div className="wa-list-top">
                  <span className="wa-list-name">Visitor #{chats.length - i}</span>
                  <span className="wa-list-time">{fmtTime(chat.created_at)}</span>
                </div>
                <p className="wa-list-preview">{chat.user_message}</p>
              </div>
            </div>
          ))}
        </div>
        <a href="/" className="wa-back-link">← Back to site</a>
      </aside>

      {/* Main — WhatsApp chat view */}
      <main className="wa-main">
        {!selected ? (
          <div className="wa-placeholder">
            <div className="wa-placeholder-icon">💬</div>
            <h2>Select a conversation</h2>
            <p>Click any chat on the left to view the full conversation.</p>
          </div>
        ) : (
          <>
            {/* Chat header */}
            <div className="wa-chat-header">
              <div className="wa-chat-avatar">👤</div>
              <div className="wa-chat-info">
                <span className="wa-chat-name">Visitor</span>
                <span className="wa-chat-date">{fmtTime(selected.created_at)}</span>
              </div>
              <button className="wa-close-btn" onClick={() => setSelected(null)}>✕</button>
            </div>

            {/* Messages */}
            <div className="wa-messages">
              {(selected.messages ?? []).map((m, i) => (
                <div key={i} className={`wa-bubble-wrap ${m.role === 'user' ? 'wa-right' : 'wa-left'}`}>
                  {m.role === 'assistant' && <div className="wa-bot-avatar">🤖</div>}
                  <div className={`wa-bubble ${m.role === 'user' ? 'wa-bubble-user' : 'wa-bubble-bot'}`}>
                    <p>{m.content}</p>
                    <span className="wa-bubble-time">
                      {fmtBubbleTime(selected.created_at)}
                      {m.role === 'user' && <span className="wa-tick">✓✓</span>}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
