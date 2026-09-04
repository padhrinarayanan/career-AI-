import React, { useState, useRef, useEffect } from 'react';
import { sendCareerChatbotMessage } from '../../services/api';
import { ChatMessage } from '../../types';
import {
  Bot,
  X,
  Send,
  Sparkles,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  User,
  GraduationCap,
  Briefcase,
  Award,
  HelpCircle
} from 'lucide-react';

export const AIFloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_1',
      sender: 'ai',
      text: 'Namaste! I am CareerBot AI, official career guide for Rajasthan Technical Education Dept. Ask me about scholarships, interview tips, higher studies, or job opportunities in Jaipur & Jodhpur!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || inputValue;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputValue('');
    setLoading(true);

    const history = messages.map(m => ({ sender: m.sender, text: m.text }));
    const replyText = await sendCareerChatbotMessage(textToSend, history);

    const aiMsg: ChatMessage = {
      id: `ai_${Date.now()}`,
      sender: 'ai',
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);

    if (speechEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(replyText);
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleMicClick = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (e: any) => {
      const text = e.results[0][0].transcript;
      setInputValue(text);
      handleSend(text);
    };

    recognition.start();
  };

  const quickPrompts = [
    'Rajasthan Govt Scholarships',
    'How to crack Metacube interview?',
    'Top skills for Jaipur IT SEZ',
    'Higher Studies vs Job in India',
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-600 shadow-2xl shadow-cyan-500/40 flex items-center justify-center cursor-pointer hover:scale-110 transition-all border-2 border-white/20 group relative"
          title="Open AI Career Counsellor"
        >
          <Bot className="h-7 w-7 text-slate-950 font-extrabold group-hover:rotate-12 transition-transform" />
          <span className="absolute top-0 right-0 h-3.5 w-3.5 rounded-full bg-green-400 border-2 border-slate-950 animate-ping" />
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] h-[580px] rounded-3xl bg-slate-900/95 backdrop-blur-2xl border border-white/15 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="p-4 bg-slate-950 border-b border-white/10 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-indigo-600 flex items-center justify-center text-slate-950 font-bold">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm flex items-center space-x-1.5 text-white">
                  <span>CareerBot AI</span>
                  <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                    Online
                  </span>
                </h3>
                <p className="text-[10px] text-slate-400">Rajasthan Technical Education Dept</p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => setSpeechEnabled(!speechEnabled)}
                title={speechEnabled ? 'Disable Speech Output' : 'Enable Speech Output'}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                {speechEnabled ? <Volume2 className="h-4 w-4 text-cyan-400" /> : <VolumeX className="h-4 w-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950/40">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex items-start space-x-2 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'ai' && (
                  <div className="h-7 w-7 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-cyan-400 flex items-center justify-center shrink-0 text-xs shadow-sm mt-1">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-cyan-500 text-slate-950 font-medium rounded-tr-xs'
                      : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      msg.sender === 'user' ? 'text-slate-900/70 font-bold' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="h-7 w-7 rounded-xl bg-slate-800 border border-white/10 text-white flex items-center justify-center shrink-0 text-xs shadow-sm mt-1">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center space-x-2 text-xs text-cyan-400 p-2">
                <Sparkles className="h-4 w-4 animate-spin" />
                <span>CareerBot AI is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starter Chips */}
          <div className="p-2 bg-slate-950 border-t border-white/10 flex items-center space-x-1.5 overflow-x-auto text-[11px] whitespace-nowrap scrollbar-none">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(qp)}
                className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 text-slate-300 font-medium transition-colors border border-white/10 shrink-0"
              >
                {qp}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-slate-950 border-t border-white/10 flex items-center space-x-2">
            <button
              onClick={handleMicClick}
              title="Speak message"
              className={`p-2.5 rounded-xl transition-colors border ${
                isListening
                  ? 'bg-red-500 text-white border-red-400 animate-pulse'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
              }`}
            >
              {isListening ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
            </button>

            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask CareerBot AI anything..."
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-white/10 bg-slate-900 text-white focus:outline-none focus:border-cyan-400 font-medium"
            />

            <button
              onClick={() => handleSend()}
              disabled={!inputValue.trim() || loading}
              className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold disabled:opacity-50 transition-colors shadow-sm cursor-pointer"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
