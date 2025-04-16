import type { PlasmoMessaging } from "@plasmohq/messaging"
import type { PingMessage } from "./types"

const handler: PlasmoMessaging.MessageHandler<PingMessage> = async (req, res) => {
  res.send({ ready: true })
}

export default handler 