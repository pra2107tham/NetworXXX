import type { PlasmoCSConfig, PlasmoGetInlineAnchor, PlasmoGetStyle } from "plasmo";
import React, { useState, useEffect } from "react";
import { sendToBackground } from "@plasmohq/messaging";
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
  const [commentSize, setCommentSize] = useState("Medium");
  const [streamingResponse, setStreamingResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamBuffer, setStreamBuffer] = useState("");
  const [isBackgroundReady, setIsBackgroundReady] = useState(false);
  const [currentContent, setCurrentContent] = useState("")

  const commentCategories = ["Appreciate", "Differ", "Curious", "Analyze", "Suggest", "Inspire"];
  const commentSizes = ["Short", "Medium", "Long"];

  // Check if background is ready
  useEffect(() => {
    const checkBackgroundReady = async () => {
      try {
        const response = await sendToBackground({
          name: "ping",
          body: { message: "Are you ready?" }
        });
        if (response.ready) {
          setIsBackgroundReady(true);
        } else {
          setTimeout(checkBackgroundReady, 100);
        }
      } catch (error) {
        setTimeout(checkBackgroundReady, 100);
      }
    };
    checkBackgroundReady();
  }, []);

  // Batch updates to avoid excessive re-renders
  useEffect(() => {
    const timer = setInterval(() => {
      if (streamBuffer.length > 0) {
        setStreamingResponse(prev => prev + streamBuffer);
        setStreamBuffer("");
      }
    }, 100);
    return () => clearInterval(timer);
  }, [streamBuffer]);

  // Setup message listener for streaming data from background
  useEffect(() => {
    const handleMessage = (message) => {
      if (message.type === "STREAM_CHUNK") {
        // Update the current content
        setCurrentContent(message.data)
        
        // Find the LinkedIn comment editor
        const editor = document.querySelector('.ql-editor[contenteditable="true"]')
        if (editor) {
          // Update the content while preserving any existing formatting
          editor.innerHTML = `<p>${message.data}</p>`
        }
      } else if (message.type === "STREAM_END") {
        setIsLoading(false)
        // Update the editor with the final response
        const editor = document.querySelector('.ql-editor[contenteditable="true"]')
        if (editor) {
          editor.innerHTML = `<p>${message.data}</p>`
        }
        setCurrentContent(" ") // Reset for next generation
      } else if (message.type === "STREAM_ERROR") {
        console.error("Stream error:", message.error)
        setIsLoading(false)
        setCurrentContent("") // Reset on error
      }
    }

    chrome.runtime.onMessage.addListener(handleMessage)
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage)
    }
  }, [])

  const handleGenerateComment = async () => {
    console.log("Generating comment...");
    if (!isBackgroundReady) {
      console.error("Background service worker not ready");
      return;
    }

    setIsLoading(true);
    setStreamingResponse("");
    setShowDialog(false);

    try {
      const requestBody = {
        isCustom: useCustomPrompt,
        scenario: useCustomPrompt ? "Custom" : selectedCategory.toLowerCase(),
        size: commentSize.toLowerCase(),
        context: "LinkedIn Comment",
        customPrompt: useCustomPrompt ? customPrompt : undefined
      };
      
      const response = await sendToBackground({
        name: "streamRequest",
        body: {
          url: "http://localhost:3000/api/ai_generation/comment",
          method: "POST",
          data: requestBody
        }
      });
      console.log(response);
    } catch (error) {
      console.error("Error sending request to background:", error);
      setIsLoading(false);
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

          <div className="plasmo-dialog-header">
            <h3 className="plasmo-dialog-title">Comment Size</h3>
          </div>
          <div className="plasmo-dialog-section">
            <div className="plasmo-dialog-grid">
              {commentSizes.map((size) => (
                <div
                  key={size}
                  className={`plasmo-dialog-option ${commentSize === size ? 'selected' : ''}`}
                  onClick={() => setCommentSize(size)}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={handleGenerateComment}
            disabled={isLoading || !isBackgroundReady}
          >
            {isLoading ? "Generating..." : "Generate Comment"}
          </button>

          {streamingResponse && (
            <div className="plasmo-dialog-section">
              <div className="plasmo-dialog-response">
                {streamingResponse}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentGenerator;
