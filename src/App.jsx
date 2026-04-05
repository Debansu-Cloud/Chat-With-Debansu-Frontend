import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import ReactMarkdown from "react-markdown";
import './App.css'

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    // Add user message
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    const currentQuestion = input;
    setInput("");
    setLoading(true);

    axios.post('https://chat-with-debansu-backend-xkgz.vercel.app/ask/', { question: currentQuestion })
      .then((res) => {
        if (res.data._status) {
          setMessages([...newMessages, { role: 'bot', content: res.data.finalData }]);
        } else {
          setMessages([...newMessages, { role: 'bot', content: "An error occurred fetching the response." }]);
        }
      })
      .catch(() => {
         setMessages([...newMessages, { role: 'bot', content: "Server connection failed." }]);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="app-container">
      {/* Cool animated background elements */}
      <div className="bg-glow blob-1"></div>
      <div className="bg-glow blob-2"></div>
      <div className="bg-glow blob-3"></div>
      
      <main className="chat-interface">
        <header className="chat-header glass-panel">
          <div className="avatar-orb">
            <div className="inner-orb"></div>
          </div>
          <div className="header-text">
            <h1>Chat with <span>Debansu</span></h1>
            <span className="status-badge">
              <span className="pulse-dot"></span> Online
            </span>
          </div>
        </header>

        <section className="chat-history">
          {messages.length === 0 ? (
            <div className="empty-state">
              <div className="sparkle-icon">✨</div>
              <h2>How can I help you today?</h2>
              <p>Ask anything and I'll generate a thoughtful response.</p>
            </div>
          ) : (
            <div className="messages-container">
              {messages.map((msg, idx) => (
                <div key={idx} className={`message-wrapper ${msg.role}`}>
                  <div className="message-bubble glass-panel">
                    {msg.role === 'user' ? (
                       msg.content
                    ) : (
                      <div className="markdown-body">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="message-wrapper bot">
                   <div className="message-bubble typing-indicator glass-panel">
                     <span></span><span></span><span></span>
                   </div>
                </div>
              )}
              <div ref={bottomRef} className="scroll-anchor" />
            </div>
          )}
        </section>

        <footer className="chat-input-area">
          <form onSubmit={handleSubmit} className="input-form glass-panel">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              disabled={loading}
              autoFocus
            />
            <button type="submit" disabled={!input.trim() || loading} className="send-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </form>
        </footer>
      </main>
    </div>
  )
}

export default App