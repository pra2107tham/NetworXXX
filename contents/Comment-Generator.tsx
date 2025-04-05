import type { PlasmoCSConfig, PlasmoGetInlineAnchor, PlasmoGetStyle } from "plasmo";
import React, { useState } from "react";
import aiImage from "data-base64:~assets/ai-icon-2.png";

export const config: PlasmoCSConfig = {
  matches: ["https://www.linkedin.com/*"]
};

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style");
  style.textContent = `
    .plasmo-inline {
      position: relative;
      display: flex;
      align-items: center;
      margin-left: 8px;
    }

    .plasmo-inline button {
      border: none;
      background: transparent;
      cursor: pointer;
      padding: 6px;
      border-radius: 50%;
      transition: all 0.3s ease;
      position: relative;
    }

    .plasmo-inline button:hover {
      background: rgba(224, 255, 79, 0.1);
      transform: scale(1.1);
      box-shadow: 0 0 15px rgba(224, 255, 79, 0.3);
    }

    .plasmo-inline button img {
      transition: transform 0.3s ease;
    }

    .plasmo-inline button:hover img {
      transform: scale(1.1);
    }

    .plasmo-tooltip {
      position: absolute;
      bottom: 130%;
      left: 50%;
      transform: translateX(-50%) translateY(10px);
      background: #00272B;
      color: #F4F4F4;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(224, 255, 79, 0.1);
      z-index: 1000;
    }

    .plasmo-inline:hover .plasmo-tooltip {
      opacity: 1;
      visibility: visible;
      transform: translateX(-50%) translateY(0px);
    }

    .plasmo-dialog {
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      background: #00272B;
      border-radius: 8px;
      padding: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
      width: 260px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      border: 1px solid rgba(224, 255, 79, 0.1);
      animation: slideIn 0.3s ease;
      z-index: 1000;
      margin-bottom: 8px;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translate(-50%, 10px);
      }
      to {
        opacity: 1;
        transform: translate(-50%, 0);
      }
    }

    .plasmo-dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(224, 255, 79, 0.1);
    }

    .plasmo-dialog-title {
      color: #F4F4F4;
      font-size: 14px;
      font-weight: 600;
      margin: 0;
    }

    .plasmo-dialog-close {
      background: none;
      border: none;
      color: #F4F4F4;
      cursor: pointer;
      padding: 4px;
      font-size: 18px;
      opacity: 0.7;
      transition: opacity 0.3s ease;
      line-height: 1;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }

    .plasmo-dialog-close:hover {
      opacity: 1;
      background: rgba(224, 255, 79, 0.1);
    }

    .plasmo-dialog-toggle {
      position: absolute;
      top: -8px;
      left: 12px;
      display: flex;
      align-items: center;
      gap: 6px;
      background: #00272B;
      padding: 4px 8px;
      border-radius: 12px;
      border: 1px solid rgba(224, 255, 79, 0.2);
      z-index: 1;
    }

    .plasmo-dialog-toggle-label {
      color: #F4F4F4;
      font-size: 11px;
      opacity: 0.8;
    }

    .plasmo-dialog-toggle-switch {
      position: relative;
      width: 32px;
      height: 16px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .plasmo-dialog-toggle-switch::before {
      content: '';
      position: absolute;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #E0FF4F;
      top: 2px;
      left: 2px;
      transition: all 0.3s ease;
    }

    .plasmo-dialog-toggle-switch.active {
      background: rgba(224, 255, 79, 0.2);
    }

    .plasmo-dialog-toggle-switch.active::before {
      transform: translateX(16px);
    }

    .plasmo-dialog-section {
      margin-bottom: 8px;
    }

    .plasmo-dialog-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 6px;
      margin-top: 4px;
    }

    .plasmo-dialog-option {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(224, 255, 79, 0.2);
      border-radius: 4px;
      padding: 8px;
      color: #F4F4F4;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      text-align: center;
    }

    .plasmo-dialog-option:hover {
      background: rgba(224, 255, 79, 0.1);
      border-color: #E0FF4F;
      transform: translateY(-1px);
    }

    .plasmo-dialog-option.selected {
      background: rgba(224, 255, 79, 0.15);
      border-color: #E0FF4F;
      box-shadow: 0 0 10px rgba(224, 255, 79, 0.2);
    }

    .plasmo-dialog textarea {
      width: 93%;
      height: 60px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(224, 255, 79, 0.2);
      border-radius: 4px;
      padding: 8px;
      color: #F4F4F4;
      font-size: 12px;
      resize: none;
      transition: all 0.3s ease;
      margin-top: 4px;
    }

    .plasmo-dialog textarea:focus {
      outline: none;
      border-color: #E0FF4F;
      box-shadow: 0 0 10px rgba(224, 255, 79, 0.2);
    }

    .plasmo-dialog button {
      background: #E0FF4F;
      color: #00272B;
      border: none;
      border-radius: 4px;
      padding: 8px 16px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      text-align: center;
      margin-top: 4px;
    }

    .plasmo-dialog button:hover {
      background: #f0ff6f;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(224, 255, 79, 0.3);
    }

    .plasmo-dialog button:active {
      transform: translateY(0);
    }
  `;
  return style;
};

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
