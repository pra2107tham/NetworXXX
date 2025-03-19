import type { PlasmoCSConfig, PlasmoGetInlineAnchor, PlasmoGetStyle } from "plasmo"
import React, {useState} from 'react'
import "../style.css"
import "../popup.css"
import styleText from "data-text:./content-style.css"

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style")
  style.textContent = styleText
  return style
}
export const config: PlasmoCSConfig = {
  matches: ["https://www.linkedin.com/feed/*"]
}

// Target the profile card container
export const getInlineAnchor: PlasmoGetInlineAnchor = async () => 
  document.querySelector(".artdeco-card.profile-card")

const PlasmoPricingExtra = () => {
      const [isOpen, setIsOpen] = useState(true);
      const [commentPrompt, setCommentPrompt] = useState("");
      const [generatedComment, setGeneratedComment] = useState("");
      const [selectedTone, setSelectedTone] = useState("Agree");
      const [commentLength, setCommentLength] = useState("medium");
      
      const handleGenerateComment = () => {
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
      }
    
      function copyToClipboard(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        navigator.clipboard.writeText(generatedComment)
          .then(() => {
            console.log("Comment copied to clipboard");
            // Optionally, add UI feedback here
          })
          .catch(err => {
            console.error("Failed to copy comment:", err);
          });
      }
    return (
    <div className="linkelevate-popup">
      <div className="popup-header" style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>NetworX</h2>
        <span onClick={() => setIsOpen(!isOpen)} style={{ cursor: "pointer" }}>{isOpen ? "▲" : "▼"}</span>
      </div>
      <div className={`dropdown-container ${isOpen ? "open" : ""}`}>
        <div className="popup-section" style={{ paddingTop: '6px', paddingBottom: '6px' }}>
          <h3>Engagement Streak</h3>
          <div className="progress-container">
            <label>Daily: 3/10 comments</label>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '30%' }}></div>
            </div>
          </div>
          <div className="progress-container" style={{ marginBottom: '2px' }}>
            <label>Weekly: 1/3 posts</label>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '33%' }}></div>
            </div>
          </div>
        </div>
        
        <div className="popup-section" style={{ paddingTop: '6px', paddingBottom: '6px' }}>
          <h3>Activity counter</h3>
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
        
        <div className="popup-section impact-section" style={{ paddingTop: '6px', paddingBottom: '6px' }}>
          <h3>This Week's Impact</h3>
          <div className="impact-grid">
            <div className="impact-card">
              <div className="impact-left">
                Profile Views
              </div>
              <div className="impact-right">
                <div className="impact-data">
                  <div className="impact-value">143</div>
                  <div className="impact-trend positive">
                    <span className="trend-arrow">↑</span>
                    <span className="trend-value">28%</span>
                  </div>
                </div>
                <div className="sparkline">
                  <svg width="100%" height="100%" viewBox="0 0 50 12">
                    <polyline 
                      points="5,9 12,7 20,8 28,5 36,6 44,3" 
                      fill="none" 
                      stroke="var(--chartreuse)" 
                      strokeWidth="1"
                    />
                    <circle cx="44" cy="3" r="1.5" fill="var(--chartreuse)" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="impact-card">
              <div className="impact-left">
                Impressions
              </div>
              <div className="impact-right">
                <div className="impact-data">
                  <div className="impact-value">1,208</div>
                  <div className="impact-trend positive">
                    <span className="trend-arrow">↑</span>
                    <span className="trend-value">45%</span>
                  </div>
                </div>
                <div className="sparkline">
                  <svg width="100%" height="100%" viewBox="0 0 50 12">
                    <polyline 
                      points="5,7 12,6 20,5 28,4 36,5 44,2" 
                      fill="none" 
                      stroke="var(--chartreuse)" 
                      strokeWidth="1"
                    />
                    <circle cx="44" cy="2" r="1.5" fill="var(--chartreuse)" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="popup-section coming-soon-section" style={{ paddingTop: '5px', paddingBottom: '10px', borderBottom: 'none' }}>
          <div className="coming-soon-header">
            <h3>Coming soon!</h3>
            <div className="pulse-dot"></div>
          </div>
          <div className="coming-soon-pills">
            <div className="pill">AI Analytics</div>
            <div className="pill">Sentiment Analysis</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlasmoPricingExtra