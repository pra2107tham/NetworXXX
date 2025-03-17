import { useState } from "react"
import "./style.css"

function IndexPopup() {
  const [data, setData] = useState("")
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

  function copyToClipboard(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
      navigator.clipboard.writeText(generatedComment)
      .then(() => {
        console.log("Comment copied to clipboard");
        // You could add user feedback here like temporarily changing button text
      })
      .catch(err => {
        console.error("Failed to copy comment:", err);
      });
    }
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
    // Modify your main container div
    <div className="linkelevate-popup" style={{
      // backgroundColor: "#ffffff",
      borderRadius: "0px",
      // boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      // minWidth: "400px"
      // border: "none"
    }}>
      <div className="popup-header">
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
  )
}

export default IndexPopup;
