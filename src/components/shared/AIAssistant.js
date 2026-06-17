'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Bot, X, Send, Loader2, MessageCircle } from 'lucide-react';

export default function AIAssistant() {
  const t = useTranslations('ai');
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: t('welcome') },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  async function handleSend() {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg = { role: 'user', content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
      });
      const data = await res.json();
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: data.content || 'Sorry, I could not get a response. Please try again.' },
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <>
      {/* Chat window */}
      <div
        style={{
          position: 'fixed',
          bottom: 96,
          insetInlineEnd: 24,
          zIndex: 50,
          width: 360,
          maxWidth: 'calc(100vw - 48px)',
          maxHeight: 520,
          background: '#fff',
          border: '1.5px solid #E2E8F0',
          borderRadius: 20,
          boxShadow: '0 20px 60px rgba(10,35,66,0.18)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transition: 'opacity 0.2s, transform 0.2s',
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(8px)',
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#0A2342', borderRadius: '18px 18px 0 0', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#B8893D', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Bot size={16} color="#fff" />
            </div>
            <div>
              <p style={{ color: '#fff', fontWeight: 600, fontSize: 13, lineHeight: 1 }}>{t('title')}</p>
              <p style={{ color: '#4ADE80', fontSize: 10, display: 'flex', alignItems: 'center', gap: 4, marginTop: 3 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ADE80', display: 'inline-block' }} />
                Online
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            style={{ color: 'rgba(255,255,255,0.6)', padding: 6, borderRadius: 8, cursor: 'pointer', background: 'transparent', border: 'none', display: 'flex' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
          >
            <X size={16} />
          </button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '14px 14px', display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: 8 }}>
              {msg.role === 'assistant' && (
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#B8893D', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginBottom: 2 }}>
                  <Bot size={12} color="#fff" />
                </div>
              )}
              <div style={{
                maxWidth: '78%',
                padding: '9px 13px',
                borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                fontSize: 13,
                lineHeight: 1.5,
                background: msg.role === 'user' ? '#0A2342' : '#F1F5F9',
                color: msg.role === 'user' ? '#fff' : '#0F172A',
              }}>
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#B8893D', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Bot size={12} color="#fff" />
              </div>
              <div style={{ background: '#F1F5F9', padding: '9px 13px', borderRadius: '16px 16px 16px 4px', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Loader2 size={13} color="#5A6B82" style={{ animation: 'spin 1s linear infinite' }} />
                <span style={{ fontSize: 12, color: '#5A6B82' }}>{t('typing')}</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{ padding: '10px 12px', borderTop: '1px solid #E2E8F0', flexShrink: 0, display: 'flex', gap: 8, alignItems: 'flex-end' }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('placeholder')}
            rows={1}
            style={{
              flex: 1,
              background: '#F8FAFC',
              border: '1.5px solid #E2E8F0',
              borderRadius: 12,
              padding: '8px 12px',
              fontSize: 13,
              color: '#0F172A',
              outline: 'none',
              resize: 'none',
              minHeight: 36,
              maxHeight: 90,
              overflowY: 'auto',
              fontFamily: 'inherit',
            }}
            onFocus={e => e.target.style.borderColor = '#B8893D'}
            onBlur={e => e.target.style.borderColor = '#E2E8F0'}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: (!input.trim() || isTyping) ? '#E2E8F0' : '#0A2342',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: (!input.trim() || isTyping) ? 'not-allowed' : 'pointer',
              border: 'none',
              flexShrink: 0,
              transition: 'background 0.2s',
            }}
          >
            <Send size={15} color="#fff" />
          </button>
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle AI assistant"
        style={{
          position: 'fixed',
          bottom: 24,
          insetInlineEnd: 96,
          zIndex: 50,
          width: 52,
          height: 52,
          borderRadius: '50%',
          background: isOpen ? '#F1F5F9' : '#0A2342',
          border: isOpen ? '1.5px solid #E2E8F0' : 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(10,35,66,0.2)',
          cursor: 'pointer',
          transition: 'background 0.2s, transform 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {isOpen ? <X size={20} color="#5A6B82" /> : <MessageCircle size={20} color="#fff" />}
      </button>
    </>
  );
}
