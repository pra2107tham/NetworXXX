import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { url, method, data } = req.body
  
  try {
    // Send immediate response to avoid timeout
    res.send({ success: true })
    
    const response = await fetch(url, {
      method: method || "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "text/event-stream"
      },
      mode: "cors",
      credentials: "omit",
      body: JSON.stringify(data)
    })

    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    // Setup stream processing
    const reader = response.body.getReader()
    const textDecoder = new TextDecoder()
    let buffer = ""
    let accumulatedContent = ""

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      
      buffer += textDecoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ""

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue
        
        const data = line.slice(6).trim()
        if (data === "[DONE]") {
          // Clean up the final content
          let finalContent = accumulatedContent
            .replace(/^["']/, '') // Remove starting quote
            .replace(/["']$/, '') // Remove ending quote
            .replace(/["']/g, '') // Remove any remaining quotes
            .replace(/\s+/g, ' ') // Normalize spaces
            .trim()

          chrome.tabs.sendMessage(req.sender.tab.id, {
            type: "STREAM_END",
            data: finalContent
          })
          return
        }

        try {
          const parsedData = JSON.parse(data)
          if (parsedData.error) {
            throw new Error(parsedData.error)
          }
          // Add space after each chunk if it's not a newline
          const content = parsedData.content || ""
          accumulatedContent += content + (content.endsWith('\n') ? '' : ' ')
        } catch (e) {
          // If not JSON, treat as raw text and add space
          accumulatedContent += data + ' '
        }

        // Clean up the content before sending
        let cleanContent = accumulatedContent
          .replace(/^["']/, '') // Remove starting quote
          .replace(/["']$/, '') // Remove ending quote
          .replace(/["']/g, '') // Remove any remaining quotes
          .replace(/\s+/g, ' ') // Normalize spaces
          .trim()

        chrome.tabs.sendMessage(req.sender.tab.id, {
          type: "STREAM_CHUNK",
          data: cleanContent
        })
      }
    }

  } catch (error) {
    console.error("Stream error:", error)
    chrome.tabs.sendMessage(req.sender.tab.id, {
      type: "STREAM_ERROR",
      error: error.message
    })
  }
}

export default handler
