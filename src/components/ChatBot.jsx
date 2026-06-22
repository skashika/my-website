import React, { useState, useRef, useEffect } from 'react';

const STARTERS = [
  'What does Shubham specialise in?',
  'What projects has Shubham worked on?',
  'How can I contact Shubham?',
];

function renderMarkdown(text) {
  const lines = text.split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Blank line
    if (line.trim() === '') { i++; continue; }

    // Bullet list item (-, *, •)
    if (/^[-*•]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*•]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*•]\s+/, ''));
        i++;
      }
      elements.push(
        <ul key={i} className="chat-md-list">
          {items.map((item, j) => (
            <li key={j}>{inlineFormat(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered list
    if (/^\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ''));
        i++;
      }
      elements.push(
        <ol key={i} className="chat-md-list chat-md-ol">
          {items.map((item, j) => (
            <li key={j}>{inlineFormat(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // Heading (## or ###)
    if (/^#{2,3}\s+/.test(line)) {
      elements.push(
        <p key={i} className="chat-md-heading">{inlineFormat(line.replace(/^#+\s+/, ''))}</p>
      );
      i++;
      continue;
    }

    // Normal paragraph
    elements.push(<p key={i} className="chat-md-p">{inlineFormat(line)}</p>);
    i++;
  }

  return elements;
}

function inlineFormat(text) {
  // Bold (**text** or __text__)
  const parts = text.split(/(\*\*[^*]+\*\*|__[^_]+__)/g);
  return parts.map((part, i) => {
    if (/^\*\*[^*]+\*\*$/.test(part) || /^__[^_]+__$/.test(part)) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function generateSessionId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function ChatBot() {
  const [open, setOpen]         = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi! I'm Shubham's assistant. Ask me anything about his skills, projects, or experience." },
  ]);
  const [input, setInput]   = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef             = useRef(null);
  const inputRef              = useRef(null);
  const sessionId             = useRef(generateSessionId());

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [open, messages]);

  async function send(text) {
    const userText = (text ?? input).trim();
    if (!userText || loading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    const history = messages
      .filter(m => m.role !== 'error')
      .map(m => ({ role: m.role, content: m.text }));
    history.push({ role: 'user', content: userText });

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: history, sessionId: sessionId.current }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, {
        role: res.ok ? 'assistant' : 'error',
        text: res.ok ? data.reply : (data.error || 'Sorry, something went wrong. Please try again.'),
      }]);
    } catch {
      setMessages(prev => [...prev, { role: 'error', text: 'Could not reach the server. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  }

  function onKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  }

  return (
    <>
      {/* Floating button */}
      <button
        className={`chat-fab${open ? ' chat-fab-open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Close chat" : "Chat with Shubham's assistant"}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="chat-panel" role="dialog" aria-label="Chat assistant">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-avatar">SK</div>
            <div>
              <div className="chat-header-name">Shubham's Assistant</div>
              <div className="chat-header-status">
                <span className="chat-status-dot" />
                Online
              </div>
            </div>
            <button className="chat-close" onClick={() => setOpen(false)} aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg chat-msg-${m.role}`}>
                {m.role === 'assistant' && <div className="chat-msg-avatar">SK</div>}
                <div className="chat-bubble">
                  {m.role === 'assistant' ? renderMarkdown(m.text) : m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="chat-msg chat-msg-assistant">
                <div className="chat-msg-avatar">SK</div>
                <div className="chat-bubble chat-typing">
                  <span /><span /><span />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Starters */}
          {messages.length === 1 && (
            <div className="chat-starters">
              {STARTERS.map(s => (
                <button key={s} className="chat-starter" onClick={() => send(s)}>{s}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="chat-input-row">
            {input.length > 400 && (
              <div className="chat-char-count" style={{ color: input.length >= 500 ? '#ef4444' : '#f59e0b' }}>
                {input.length}/500
              </div>
            )}
            <input
              ref={inputRef}
              className="chat-input"
              placeholder="Ask me anything…"
              value={input}
              onChange={e => setInput(e.target.value.slice(0, 500))}
              onKeyDown={onKey}
              disabled={loading}
            />
            <button
              className="chat-send"
              onClick={() => send()}
              disabled={!input.trim() || loading}
              aria-label="Send"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
