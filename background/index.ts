import type { PlasmoMessaging } from "@plasmohq/messaging"
import type { PingMessage } from "./messages/types"

export {}

// Listen for ping messages using Plasmo's messaging
const handler: PlasmoMessaging.MessageHandler<PingMessage> = async (req, res) => {
  console.log("Received ping message:", req.body)
  res.send({ ready: true })
}

export default handler

console.log("Background service worker initialized") 