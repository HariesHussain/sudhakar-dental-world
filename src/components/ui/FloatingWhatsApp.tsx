import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCheck, MessageCircle } from 'lucide-react';

const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Array<{ id: number; text: string; sender: 'bot' | 'user'; time: string }>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const phoneNumber = '919550022877';
  const defaultMessage = "Hi! I'd like to book an appointment or ask a question.";

  // Show welcome tooltip after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowTooltip(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Simulate typing and loading messages when widget is opened
  useEffect(() => {
    if (isOpen) {
      setShowTooltip(false);
      // Reset conversation
      setMessages([]);
      setIsTyping(true);

      // Bubble 1
      const timer1 = setTimeout(() => {
        setIsTyping(false);
        setMessages([
          {
            id: 1,
            text: "Hi there! 👋 Welcome to Dr. Sudhakar's Dental World.",
            sender: 'bot',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        
        // Start typing Bubble 2
        const timer2_type = setTimeout(() => {
          setIsTyping(true);
          
          const timer2 = setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [
              ...prev,
              {
                id: 2,
                text: "We typically reply within minutes. How can we help you today? You can choose a quick option below or type a message.",
                sender: 'bot',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ]);
          }, 1200);
          
          return () => clearTimeout(timer2);
        }, 600);

        return () => clearTimeout(timer2_type);
      }, 1000);

      return () => clearTimeout(timer1);
    }
  }, [isOpen]);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleOpenWidget = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const handleQuickReply = (text: string, directSend = false) => {
    if (directSend) {
      // Send immediately to WhatsApp
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    
    // Add user message to UI
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { id: Date.now(), text, sender: 'user' as const, time };
    setMessages(prev => [...prev, userMsg]);
    
    // Auto scroll and then redirect to WhatsApp
    setTimeout(() => {
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, 600);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const textToSend = messageText.trim() || defaultMessage;
    
    // Add user message to UI
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { id: Date.now(), text: textToSend, sender: 'user' as const, time };
    setMessages(prev => [...prev, userMsg]);
    setMessageText('');

    setTimeout(() => {
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(textToSend)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, 600);
  };

  const quickReplies = [
    { label: '📅 Book Appointment', text: "Hi, I'd like to book an appointment with Dr. Sudhakar." },
    { label: '🦷 Dental Services', text: 'Hi, I want to know more about the dental treatments and procedures offered.' },
    { label: '📍 Clinic Location', text: 'Hi, where is Dr. Sudhakar\'s Dental World located in Nandyal?' },
    { label: '💬 General Inquiry', text: 'Hi, I have a general question about the clinic timings and consultation fee.' }
  ];

  return (
    <>
      {/* Floating Button & Tooltip Wrapper */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Onboarding Tooltip */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative mb-3 mr-2 bg-white text-gray-800 py-3 px-4 rounded-2xl shadow-2xl border border-gray-100 max-w-[240px] text-xs sm:text-sm font-medium flex items-center justify-between gap-3"
            >
              <div 
                className="cursor-pointer flex items-center gap-2 text-gray-700 hover:text-emerald-600 transition-colors"
                onClick={() => setIsOpen(true)}
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                <span>Chat with Dr. Sudhakar! 💬</span>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
                className="text-gray-400 hover:text-gray-600 p-0.5 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={14} />
              </button>
              {/* Tooltip Arrow */}
              <div className="absolute bottom-[-6px] right-[24px] w-3 h-3 bg-white border-r border-b border-gray-100 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Button */}
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              onClick={handleOpenWidget}
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-14 h-14 bg-[#25d366] text-white rounded-full shadow-2xl hover:bg-[#20ba5a] transition-all duration-300 relative group"
              aria-label="Open WhatsApp Chat"
            >
              {/* Pulse Rings */}
              <span className="absolute -inset-1.5 rounded-full bg-[#25d366] opacity-35 animate-ping pointer-events-none" />
              
              {/* Notification Badge */}
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-md">
                1
              </span>
              
              {/* WhatsApp SVG Icon */}
              <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.37 5.378 0 12.003 0a11.948 11.948 0 0 1 8.484 3.515c2.27 2.27 3.52 5.285 3.518 8.493-.003 6.63-5.378 12-12.003 12h-.002c-2.012-.002-3.993-.507-5.779-1.464L0 24zm6.59-11.666c.14-.077.825-.407.954-.452.129-.046.222-.069.316.071.093.14.361.452.443.543.082.09.164.102.304.025.14-.077.59-.217 1.123-.692.415-.37.695-.826.777-.967.082-.14.009-.216-.062-.286-.064-.063-.14-.163-.21-.244-.069-.081-.093-.139-.035-.255.058-.116.029-.217-.014-.302-.043-.085-.316-.765-.433-.948-.114-.179-.23-.154-.316-.159l-.27-.005c-.094 0-.246.035-.375.176-.129.14-.49.48-.49 1.17 0 .69.502 1.357.572 1.45.07.093.988 1.508 2.394 2.115.335.144.596.23.8.295.337.107.643.092.885.056.27-.04.825-.337.94-.662.116-.325.116-.604.081-.662-.035-.058-.129-.093-.27-.169z"/>
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Expanded Chat Widget */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 60 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 60 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="w-[330px] sm:w-[380px] bg-[#f0f2f5] rounded-3xl shadow-2xl border border-gray-150 overflow-hidden flex flex-col max-h-[520px]"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-teal-700 text-white p-4 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img 
                      src="/images/logo.jpg" 
                      alt="Dr. Sudhakar's Logo" 
                      className="w-10 h-10 rounded-full border-2 border-white/80 object-cover bg-white"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25d366] rounded-full border-2 border-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base leading-tight">Dr. Sudhakar's Dental World</h4>
                    <p className="text-[11px] text-white/90 flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 bg-[#25d366] rounded-full animate-ping flex-shrink-0" />
                      <span>Online • Replies in minutes</span>
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-200"
                  aria-label="Close chat widget"
                >
                  <X size={18} className="text-white" />
                </button>
              </div>

              {/* Chat Body */}
              <div className="p-4 flex-1 overflow-y-auto min-h-[220px] max-h-[300px] flex flex-col gap-3 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat bg-opacity-40">
                
                {/* Messages list */}
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`max-w-[85%] rounded-2xl p-3 shadow-sm relative flex flex-col ${
                      msg.sender === 'bot' 
                        ? 'bg-white rounded-tl-none self-start text-gray-800' 
                        : 'bg-[#d9fdd3] rounded-tr-none self-end text-gray-850'
                    }`}
                  >
                    <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                    <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-gray-400">
                      <span>{msg.time}</span>
                      {msg.sender === 'user' && <CheckCheck size={12} className="text-emerald-500" />}
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-2xl rounded-tl-none p-3 shadow-sm max-w-[70px] self-start flex items-center justify-center gap-1"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </motion.div>
                )}
                
                <div ref={chatEndRef} />
              </div>

              {/* Quick Replies Chips */}
              <div className="bg-[#f0f2f5] px-4 py-2 border-t border-gray-200">
                <p className="text-[10px] text-gray-500 font-semibold mb-1.5 uppercase tracking-wider">Quick Actions</p>
                <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto pb-1 scrollbar-thin">
                  {quickReplies.map((reply, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickReply(reply.text)}
                      className="text-[11px] font-medium bg-white text-gray-700 border border-gray-300 hover:border-emerald-500 hover:text-emerald-600 py-1 px-2.5 rounded-full transition-all duration-200 shadow-sm active:scale-[0.97]"
                    >
                      {reply.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Input / Send Form */}
              <form onSubmit={handleSendMessage} className="p-3 bg-white flex items-center gap-2 border-t border-gray-200">
                <input
                  ref={inputRef}
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-100 hover:bg-gray-50 focus:bg-white text-xs sm:text-sm px-4 py-2.5 rounded-full border border-transparent focus:border-emerald-500 focus:outline-none transition-all text-gray-800"
                />
                <button
                  type="submit"
                  className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all flex-shrink-0"
                  aria-label="Send message to WhatsApp"
                >
                  <Send size={16} className="ml-0.5 text-white fill-current" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
    </>
  );
};

export default FloatingWhatsApp;
