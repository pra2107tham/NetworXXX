"use client"

import { useState } from "react"
import { MessageSquare, X, Copy, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CommentGeneratorProps {
  onClose: () => void
}

export function CommentGenerator({ onClose }: CommentGeneratorProps) {
  const [prompt, setPrompt] = useState("")
  const [generatedComment, setGeneratedComment] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedTone, setSelectedTone] = useState("professional")
  const [selectedLength, setSelectedLength] = useState("medium")
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)

    // Simulate AI generation
    setTimeout(() => {
      const comments = {
        professional: {
          short: "I appreciate your insights on this topic. Very valuable perspective.",
          medium:
            "Thank you for sharing these insights. Your perspective adds significant value to the conversation around LinkedIn growth strategies.",
          long: "I really appreciate you sharing these insights. Your perspective adds significant value to the conversation around LinkedIn growth strategies. I've been implementing similar approaches and have seen notable improvements in engagement. Would love to connect and discuss further.",
        },
        supportive: {
          short: "Love this! Keep sharing your amazing insights!",
          medium:
            "I absolutely love this content! Your insights are incredibly valuable and I'm grateful you're sharing them with the community. Keep it up!",
          long: "I absolutely love this content! Your insights are incredibly valuable and I'm grateful you're sharing them with the community. This resonates deeply with my own experience, and I've bookmarked this to reference later. Looking forward to more of your wisdom!",
        },
        curious: {
          short: "Interesting perspective. Have you considered the impact on engagement rates?",
          medium:
            "This is a fascinating perspective. I'm curious - have you noticed how this approach affects long-term engagement rates? Would love to hear more about your experience.",
          long: "This is a fascinating perspective that I hadn't considered before. I'm curious - have you noticed how this approach affects long-term engagement rates? Also, I wonder if different industries see varying results with this strategy. Would love to hear more about your experience and insights on this topic.",
        },
        analytical: {
          short: "The data supports your conclusion. Excellent analysis.",
          medium:
            "The data you've presented strongly supports your conclusion. Your analytical approach to LinkedIn growth is refreshing in a space often dominated by anecdotal advice.",
          long: "The data you've presented strongly supports your conclusion. Your analytical approach to LinkedIn growth is refreshing in a space often dominated by anecdotal advice. I've been tracking similar metrics and found a 32% increase in engagement when implementing structured content strategies. Would be interested to compare methodologies sometime.",
        },
      }

      setGeneratedComment(comments[selectedTone][selectedLength])
      setIsGenerating(false)
    }, 1500)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedComment)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-[#001A1D]/95 border-[#E0FF4F]/20 shadow-xl overflow-hidden relative">
        <div className="absolute inset-0 bg-noise-pattern opacity-10 pointer-events-none mix-blend-soft-light"></div>
        <div className="p-4 flex items-center justify-between border-b border-[#E0FF4F]/10 relative">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-[#E0FF4F]/20 blur-sm rounded-full"></div>
              <MessageSquare className="h-5 w-5 text-[#E0FF4F] relative z-10" />
            </div>
            <h2 className="font-bold tracking-tight">AI Comment Generator</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-full hover:bg-[#E0FF4F]/10 transition-colors duration-300"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-5 relative z-10">
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2 tracking-wide">What are you responding to?</label>
            <Textarea
              placeholder="Paste the LinkedIn post you want to comment on..."
              className="bg-[#002428]/80 border-[#E0FF4F]/10 focus-visible:ring-[#E0FF4F]/30 resize-none font-normal"
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm font-medium mb-2 tracking-wide">Tone</label>
              <Tabs defaultValue="professional" onValueChange={setSelectedTone}>
                <TabsList className="grid grid-cols-2 bg-[#002428]/80 p-1 border border-[#E0FF4F]/10">
                  <TabsTrigger
                    value="professional"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#E0FF4F]/20 data-[state=active]:to-[#E0FF4F]/10 data-[state=active]:text-[#E0FF4F] data-[state=active]:font-medium transition-all duration-300"
                  >
                    Professional
                  </TabsTrigger>
                  <TabsTrigger
                    value="supportive"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#E0FF4F]/20 data-[state=active]:to-[#E0FF4F]/10 data-[state=active]:text-[#E0FF4F] data-[state=active]:font-medium transition-all duration-300"
                  >
                    Supportive
                  </TabsTrigger>
                  <TabsTrigger
                    value="curious"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#E0FF4F]/20 data-[state=active]:to-[#E0FF4F]/10 data-[state=active]:text-[#E0FF4F] data-[state=active]:font-medium transition-all duration-300"
                  >
                    Curious
                  </TabsTrigger>
                  <TabsTrigger
                    value="analytical"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#E0FF4F]/20 data-[state=active]:to-[#E0FF4F]/10 data-[state=active]:text-[#E0FF4F] data-[state=active]:font-medium transition-all duration-300"
                  >
                    Analytical
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 tracking-wide">Length</label>
              <Tabs defaultValue="medium" onValueChange={setSelectedLength}>
                <TabsList className="grid grid-cols-3 bg-[#002428]/80 p-1 border border-[#E0FF4F]/10">
                  <TabsTrigger
                    value="short"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#E0FF4F]/20 data-[state=active]:to-[#E0FF4F]/10 data-[state=active]:text-[#E0FF4F] data-[state=active]:font-medium transition-all duration-300"
                  >
                    Short
                  </TabsTrigger>
                  <TabsTrigger
                    value="medium"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#E0FF4F]/20 data-[state=active]:to-[#E0FF4F]/10 data-[state=active]:text-[#E0FF4F] data-[state=active]:font-medium transition-all duration-300"
                  >
                    Medium
                  </TabsTrigger>
                  <TabsTrigger
                    value="long"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#E0FF4F]/20 data-[state=active]:to-[#E0FF4F]/10 data-[state=active]:text-[#E0FF4F] data-[state=active]:font-medium transition-all duration-300"
                  >
                    Long
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={!prompt || isGenerating}
            className="w-full bg-[#E0FF4F] text-[#00272B] hover:bg-[#E0FF4F]/90 mb-5 font-medium shadow-[0_0_15px_rgba(224,255,79,0.2)] hover:shadow-[0_0_20px_rgba(224,255,79,0.3)] transition-all duration-300"
          >
            {isGenerating ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#00272B]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating...
              </div>
            ) : (
              "Generate Comment"
            )}
          </Button>

          {generatedComment && (
            <div className="mt-5">
              <label className="block text-sm font-medium mb-2 tracking-wide">Generated Comment</label>
              <div className="bg-[#002428]/80 border border-[#E0FF4F]/10 rounded-md p-4 text-gray-200 font-normal relative group">
                {generatedComment}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-full bg-[#E0FF4F]/10 hover:bg-[#E0FF4F]/20 transition-colors duration-300"
                    onClick={copyToClipboard}
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5 text-[#E0FF4F]" />
                    ) : (
                      <Copy className="h-3.5 w-3.5 text-[#E0FF4F]" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="flex justify-end mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs border-[#E0FF4F]/20 text-[#E0FF4F] hover:bg-[#E0FF4F]/10 hover:border-[#E0FF4F]/30 transition-all duration-300 flex items-center gap-1.5"
                  onClick={copyToClipboard}
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied!" : "Copy to Clipboard"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

