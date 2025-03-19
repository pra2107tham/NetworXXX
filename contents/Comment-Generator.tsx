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
      transition: background 0.3s ease, transform 0.2s ease-in-out;
    }

    .plasmo-inline button:hover {
      background: rgba(0, 0, 0, 0.1);
      transform: scale(1.1);
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
    }

    .plasmo-tooltip {
      position: absolute;
      bottom: 130%;
      left: 50%;
      transform: translateX(-50%) translateY(10px);
      background: rgba(0, 0, 0, 0.85);
      color: white;
      padding: 6px 10px;
      border-radius: 6px;
      font-size: 12px;
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, transform 0.2s ease-out;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    }

    .plasmo-inline:hover .plasmo-tooltip {
      opacity: 1;
      visibility: visible;
      transform: translateX(-50%) translateY(0px);
    }
  `;
  return style;
};

export const getInlineAnchor: PlasmoGetInlineAnchor = async () =>
  document.querySelector(".comments-comment-box__detour-container");

const CommentGenerator = () => {
  return (
    <div className="plasmo-inline">
      <button title="AI Suggestion">
        <img src={aiImage} alt="AI Suggestion" width="20px" height="20px" />
      </button>
      <div className="plasmo-tooltip">Comment with Networx</div>
    </div>
  );
};

export default CommentGenerator;
