export interface PingMessage {
  name: "ping"
  body: {
    message: string
  }
}

export interface StreamRequestData {
  isCustom: boolean
  scenario: string
  size: string
  context: string
  customPrompt?: string
}

export interface StreamRequestMessage {
  name: "streamRequest"
  body: {
    url: string
    method: string
    data: StreamRequestData
  }
}

export interface StreamResponse {
  content: string
}

export interface StreamChunkMessage {
  type: "STREAM_CHUNK"
  data: string
}

export interface StreamEndMessage {
  type: "STREAM_END"
  data: string
}

export interface StreamErrorMessage {
  type: "STREAM_ERROR"
  error: string
}

export type StreamMessage = StreamChunkMessage | StreamEndMessage | StreamErrorMessage

export type Message = PingMessage | StreamRequestMessage

// Export a default object that can be used for type checking
export default {
  isPingMessage: (message: any): message is PingMessage => message.name === "ping",
  isStreamRequestMessage: (message: any): message is StreamRequestMessage => message.name === "streamRequest"
} 