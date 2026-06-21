import React, { useState, useEffect } from 'react';

export default function AdminPage() {
  const [password, setPassword]   = useState('');
  const [authed, setAuthed]       = useState(false);
  const [chats, setChats]         = useState([]);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');
  const [expanded, setExpanded]   = useState(null);
  const [search, setSearch]       = useState('');

  async function login(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/chats', {
        headers: { 'x-admin-password': password },
      });
      if (!res.ok) { setError('Wrong password.'); setLoading(false); return; }
      const data = await res.json();
      setChats(data);
      setAuthed(true);
    } catch {
      setError('Could not connect. Try again.');
    }
    setLoading(false);
  }

  async function refresh() {
    setLoading(true);
    try {
      const res = await fetch('/api/chats', {
        headers: { 'x-admin-password': password },
      });
      if (res.ok) setChats(await res.json());
    } catch {}
    setLoading(false);
  }

  const filtered = chats.filter(c =>
    (c.user_message ?? '').toLowerCase().includes(search.toLowerCase()) ||
    (c.bot_reply ?? '').toLowerCase().includes(search.toLowerCase())
  );

  if (!authed) {
    return (
      <div className="admin-login-wrap">
        <div className="admin-login-card">
          <div className="admin-login-logo">SK</div>
          <h1 className="admin-login-title">Admin Access</h1>
          <p className="admin-login-sub">Enter your admin password to view chat logs.</p>
          <form onSubmit={login} className="admin-login-form">
            <input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="admin-input"
              autoFocus
            />
            {error && <p className="admin-error">{error}</p>}
            <button type="submit" className="admin-btn-primary" disabled={loading || !password}>
              {loading ? 'Checking…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-wrap">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">SK</div>
        <nav className="admin-nav">
          <div className="admin-nav-item active">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Chat Logs
          </div>
        </nav>
        <a href="/" className="admin-back-link">← Back to site</a>
      </aside>

      {/* Main */}
      <main className="admin-main">
        {/* Header */}
        <div className="admin-header">
          <div>
            <h1 className="admin-title">Chat Logs</h1>
            <p className="admin-subtitle">{chats.length} conversations recorded</p>
          </div>
          <div className="admin-header-actions">
            <input
              className="admin-search"
              placeholder="Search messages…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button className="admin-btn-refresh" onClick={refresh} disabled={loading}>
              {loading ? '…' : '↻ Refresh'}
            </button>
          </div>
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="admin-empty">
            {search ? 'No results for your search.' : 'No conversations yet. Chats will appear here once visitors start talking.'}
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date & Time</th>
                  <th>User Message</th>
                  <th>Bot Reply</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((chat, i) => (
                  <React.Fragment key={chat.id}>
                    <tr
                      className={`admin-row${expanded === chat.id ? ' admin-row-open' : ''}`}
                      onClick={() => setExpanded(expanded === chat.id ? null : chat.id)}
                    >
                      <td className="admin-cell-num">{chats.length - i}</td>
                      <td className="admin-cell-date">
                        {new Date(chat.created_at).toLocaleString('en-US', {
                          month: 'short', day: 'numeric',
                          hour: '2-digit', minute: '2-digit',
                        })}
                      </td>
                      <td className="admin-cell-msg">{chat.user_message}</td>
                      <td className="admin-cell-reply">{chat.bot_reply?.slice(0, 120)}{chat.bot_reply?.length > 120 ? '…' : ''}</td>
                      <td className="admin-cell-toggle">{expanded === chat.id ? '▲' : '▼'}</td>
                    </tr>
                    {expanded === chat.id && (
                      <tr className="admin-expand-row">
                        <td colSpan={5}>
                          <div className="admin-expand-body">
                            <p className="admin-expand-label">Full Conversation</p>
                            <div className="admin-messages">
                              {(chat.messages ?? []).map((m, j) => (
                                <div key={j} className={`admin-msg admin-msg-${m.role}`}>
                                  <span className="admin-msg-role">{m.role === 'user' ? '👤 You' : '🤖 Bot'}</span>
                                  <p>{m.content}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
