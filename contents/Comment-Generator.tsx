import type { PlasmoCSConfig, PlasmoGetInlineAnchor, PlasmoGetStyle } from "plasmo"
import React from "react"
import aiImage from "data-base64:~assets/ai-icon-2.png"

export const config: PlasmoCSConfig = {
  matches: ["https://www.linkedin.com/*"]
}

export const getStyle: PlasmoGetStyle = () => {
    const style = document.createElement("style")
    style.textContent = `
      :root{
        place-content: center;
      }
    `
    return style
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => 
    document.querySelector(".comments-comment-texteditor .display-flex.flex-column .display-flex.justify-space-between")
  
const CommentGenerator = () => {
  return (
    <div style={{ marginRight: "12px" }}>
        <button style={{ border: "none", background: "none", cursor: "pointer" }}>
        <img src={aiImage} alt="AI Suggestion" width="24px" height="24px" />
        </button>
    </div>
  )
}

export default CommentGenerator
