'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Bot, X, Send, Loader2, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

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
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.content || 'Sorry, I could not get a response. Please try again.' },
      ]);
    } catch {
      setMessages((prev) => [
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
        className={cn(
          'fixed bottom-24 end-6 z-50 w-80 sm:w-96 bg-brand-steel border border-white/10 rounded-2xl shadow-2xl shadow-black/40 flex flex-col overflow-hidden transition-all duration-300',
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
        )}
        style={{ maxHeight: '500px' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-brand-dark border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center">
              <Bot size={16} className="text-white" />
            </div>
            <div>
              <p className="text-brand-text font-semibold text-sm">{t('title')}</p>
              <p className="text-green-400 text-[10px] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                Online
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-brand-subtext hover:text-brand-text p-1 rounded-lg hover:bg-brand-muted transition-colors"
            aria-label="Close assistant"
          >
            <X size={16} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-0">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                'flex',
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {msg.role === 'assistant' && (
                <div className="w-6 h-6 rounded-full bg-brand-red flex items-center justify-center shrink-0 me-2 mt-0.5">
                  <Bot size={12} className="text-white" />
                </div>
              )}
              <div
                className={cn(
                  'max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed',
                  msg.role === 'user'
                    ? 'bg-brand-red text-white rounded-br-sm'
                    : 'bg-brand-muted text-brand-text rounded-bl-sm'
                )}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="w-6 h-6 rounded-full bg-brand-red flex items-center justify-center me-2">
                <Bot size={12} className="text-white" />
              </div>
              <div className="bg-brand-muted text-brand-text px-3 py-2 rounded-xl rounded-bl-sm text-sm flex items-center gap-1.5">
                <Loader2 size={13} className="animate-spin" />
                <span className="text-brand-subtext text-xs">{t('typing')}</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-3 py-3 border-t border-white/10 shrink-0">
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('placeholder')}
              rows={1}
              className="flex-1 bg-brand-muted text-brand-text placeholder-brand-subtext text-sm px-3 py-2 rounded-xl border border-white/10 focus:border-brand-red/50 focus:outline-none resize-none min-h-[36px] max-h-[90px] overflow-y-auto"
              style={{ fieldSizing: 'content' }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="w-9 h-9 rounded-xl bg-brand-red hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors shrink-0"
              aria-label={t('send')}
            >
              <Send size={15} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Toggle FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle AI assistant"
        className={cn(
          'fixed bottom-24 end-24 z-50 w-14 h-14 rounded-full shadow-lg shadow-black/20',
          'flex items-center justify-center transition-all duration-300 hover:scale-110',
          isOpen
            ? 'bg-brand-muted text-brand-subtext hover:bg-brand-steel'
            : 'bg-brand-dark border border-brand-red/40 text-brand-red hover:bg-brand-red hover:text-white hover:border-brand-red'
        )}
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </>
  );
}
