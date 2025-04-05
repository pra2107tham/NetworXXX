import type { PlasmoCSConfig, PlasmoGetInlineAnchor, PlasmoGetStyle } from "plasmo";
import React, { useState } from "react";
import aiImage from "data-base64:~assets/ai-icon-2.png";
import styleText from "data-text:./comment-generator.css"

export const config: PlasmoCSConfig = {
  matches: ["https://www.linkedin.com/*"]
};

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style")
  style.textContent = styleText
  return style
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () =>
  document.querySelector(".comments-comment-box__detour-container");

const CommentGenerator = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const [useCustomPrompt, setUseCustomPrompt] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Appreciate");

  const commentCategories = ["Appreciate", "Differentiate", "Curious", "Encourage", "Challenge"];

  const handleGenerateComment = () => {
    if (useCustomPrompt) {
      console.log("Generating comment with custom prompt:", customPrompt);
    } else {
      console.log("Generating comment from category:", selectedCategory);
    }
  };

  return (
    <div className="plasmo-inline">
      <button title="AI Suggestion" onClick={() => setShowDialog(!showDialog)}>
        <img src={aiImage} alt="AI Suggestion" width="20px" height="20px" />
      </button>
      <div className="plasmo-tooltip">Comment with Networx</div>
      {showDialog && (
        <div className="plasmo-dialog">
          <div className="plasmo-dialog-toggle">
            <span className="plasmo-dialog-toggle-label">
              {useCustomPrompt ? "Write your own" : "Choose style"}
            </span>
            <div 
              className={`plasmo-dialog-toggle-switch ${useCustomPrompt ? 'active' : ''}`}
              onClick={() => setUseCustomPrompt(!useCustomPrompt)}
            />
          </div>
          
          <div className="plasmo-dialog-header">
            <h3 className="plasmo-dialog-title">NetworX Generator</h3>
            <button className="plasmo-dialog-close" onClick={() => setShowDialog(false)}>×</button>
          </div>

          {!useCustomPrompt ? (
            <div className="plasmo-dialog-section">
              <div className="plasmo-dialog-grid">
                {commentCategories.map((category) => (
                  <div
                    key={category}
                    className={`plasmo-dialog-option ${selectedCategory === category ? 'selected' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="plasmo-dialog-section">
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Write your own prompt..."
              />
            </div>
          )}

          <button onClick={handleGenerateComment}>
            Generate Comment
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentGenerator;
