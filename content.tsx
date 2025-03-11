import React, { useState, useRef, useEffect } from "react"
import { createRoot } from "react-dom/client"
import "./style.css"

const FloatingWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ x: 20, y: 20 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const popupRef = useRef<HTMLDivElement>(null)

  // Similar to popup.tsx but simplified for the content script
  const [commentPrompt, setCommentPrompt] = useState("")
  const [generatedComment, setGeneratedComment] = useState("")
  const [selectedTone, setSelectedTone] = useState("Agree")
  const [commentLength, setCommentLength] = useState("medium")
  
  const handleGenerateComment = () => {
    // Mock AI generation (replace with actual API call later)
    const comments = {
      agree: {
        short: "Completely agree with this insight!",
        medium: "I strongly agree with this perspective. It resonates with my experience in the industry.",
        long: "I couldn't agree more with this insightful post. This aligns perfectly with what I've observed throughout my professional journey and provides valuable perspective."
      },
      disagree: {
        short: "I see it differently actually.",
        medium: "I respectfully disagree. In my experience, I've found that alternative approaches work better.",
        long: "While I appreciate your perspective, I must respectfully disagree based on my experience. I've found that different strategies tend to yield more consistent results in similar situations."
      },
      curious: {
        short: "Interesting! Have you considered...?",
        medium: "This is fascinating! I'm curious to know how you've approached the challenges related to this?",
        long: "What an interesting perspective! I'm curious to learn more about how you developed this approach and how it might apply in different contexts or industries. Have you explored related concepts?"
      },
      tips: {
        short: "Pro tip: try implementing this!",
        medium: "Here's a helpful tip from my experience: consider integrating this approach with your existing workflow.",
        long: "Based on my experience, here's a tip that might enhance your strategy: consider implementing a systematic approach that combines these principles with regular assessment of outcomes."
      }
    };
    
    const tone = selectedTone.toLowerCase();
    setGeneratedComment(comments[tone][commentLength]);
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedComment);
    // Add notification logic here
  };

  // Dragging functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (popupRef.current) {
      setIsDragging(true)
      const rect = popupRef.current.getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragOffset])

  return (
    <>
      {/* Toggle Button */}
      <button 
        className="toggle-button"
        onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '✨'}
      </button>

      {/* Popup */}
      {isOpen && (
        <div 
          className="floating-container popup-animation"
          style={{ 
            position: 'fixed', 
            left: `${position.x}px`, 
            top: `${position.y}px` 
          }}
          ref={popupRef}>
          <div className="linkelevate-popup">
            <div 
              className="popup-header draggable-header"
              onMouseDown={handleMouseDown}>
              <h2>Linkelevate: LinkedIn Growth Assistant</h2>
              <button className="close-button" onClick={() => setIsOpen(false)}>×</button>
            </div>
            
            <div className="popup-section">
              <h3>Engagement Streak</h3>
              <div className="progress-container">
                <label>Daily: 3/10 comments</label>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '30%' }}></div>
                </div>
              </div>
              <div className="progress-container">
                <label>Weekly: 1/3 posts</label>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '33%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="popup-section">
              <h3>Activity Counter</h3>
              <div className="counter-grid">
                <div className="counter-item">
                  <span className="counter-value">24</span>
                  <span className="counter-label">Comments</span>
                </div>
                <div className="counter-item">
                  <span className="counter-value">7</span>
                  <span className="counter-label">Posts</span>
                </div>
              </div>
            </div>
            
            <div className="popup-section">
              <h3>AI Comment Generator</h3>
              <textarea 
                placeholder="What would you like to comment about?" 
                value={commentPrompt}
                onChange={(e) => setCommentPrompt(e.target.value)}
              />
              
              <div className="tone-selector">
                <span>Tone:</span>
                {["Agree", "Disagree", "Curious", "Tips"].map((tone) => (
                  <button 
                    key={tone}
                    className={selectedTone === tone ? "tone-button active" : "tone-button"}
                    onClick={() => setSelectedTone(tone)}
                  >
                    {tone}
                  </button>
                ))}
              </div>
              
              <div className="length-selector">
                <span>Length:</span>
                <div className="length-options">
                  <button 
                    className={commentLength === "short" ? "length-button active" : "length-button"}
                    onClick={() => setCommentLength("short")}
                  >
                    🔹 Short
                  </button>
                  <button 
                    className={commentLength === "medium" ? "length-button active" : "length-button"}
                    onClick={() => setCommentLength("medium")}
                  >
                    🔸 Medium
                  </button>
                  <button 
                    className={commentLength === "long" ? "length-button active" : "length-button"}
                    onClick={() => setCommentLength("long")}
                  >
                    🔺 Long
                  </button>
                </div>
              </div>
              
              <button className="generate-button" onClick={handleGenerateComment}>Generate Comment</button>
              
              {generatedComment && (
                <div className="generated-comment">
                  <p>{generatedComment}</p>
                  <button className="copy-button" onClick={copyToClipboard}>
                    Copy to Clipboard
                  </button>
                </div>
              )}
            </div>
            
            <div className="popup-section coming-soon">
              <h3>Coming Soon</h3>
              <div className="coming-soon-features">
                <div className="feature-item">AI-powered Analytics</div>
                <div className="feature-item">Sentiment Analysis</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Mount component to LinkedIn when loaded
const mount = () => {
  const root = document.createElement('div')
  root.id = 'linkelevate-root'
  document.body.appendChild(root)
  createRoot(root).render(<FloatingWidget />)
}

// Only inject on LinkedIn pages
if (window.location.hostname.includes('linkedin.com')) {
  mount()
}
