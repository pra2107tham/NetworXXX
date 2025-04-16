// app/api/ai_generation/comment/route.js
// Add at the TOP of the file
const CORS_HEADERS = {
    'Access-Control-Allow-Origin': 'chrome-extension://pboneodihmckpbaeokjhfdnfpoinfpaf', // Replace with your actual ID
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
  
// Add OPTIONS handler BEFORE POST
export async function OPTIONS() {
return new Response(null, {
    headers: CORS_HEADERS,
    status: 204
})
}
  
import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

// Initialize Groq with your API key.
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Preset scenario configurations (6 scenarios)
const COMMENT_STYLES = {
  appreciate: {
    prompt: "Generate an appreciative comment about the post.",
    context: "Highlight overwhelmingly positive aspects and show genuine gratitude, while also briefly noting any minor shortcomings to provide a balanced review."
  },
  differ: {
    prompt: "Generate a comment that respectfully differs with the post.",
    context: "Present a contrasting perspective that mentions both strengths and weaknesses, expressing a polite disagreement with constructive feedback."
  },
  curious: {
    prompt: "Generate a thoughtful, curious comment about the post.",
    context: "Encourage exploration by asking insightful questions that touch on what works well and what could be better, considering both positive and negative aspects."
  },
  analyze: {
    prompt: "Generate an analytical comment about the post.",
    context: "Provide an in-depth evaluation highlighting the merits and demerits of the topic with clear insights, discussing both the good and the bad."
  },
  suggest: {
    prompt: "Generate a comment providing suggestions regarding the post.",
    context: "Offer constructive recommendations by acknowledging what works well and suggesting improvements where needed, balancing positive feedback with critical insight."
  },
  inspire: {
    prompt: "Generate an inspiring comment about the post.",
    context: "Motivate the reader by emphasizing both the impressive qualities and the challenges of the topic, urging continued growth with optimism."
  }
};

// Comment size configurations
const COMMENT_SIZES = {
  short: {
    maxLength: 100,
    promptAddition: "Keep the response concise and to the point."
  },
  medium: {
    maxLength: 250,
    promptAddition: "Provide a balanced response with key insights."
  },
  long: {
    maxLength: 500,
    promptAddition: "Offer a detailed and comprehensive explanation."
  }
};

export async function POST(req) {
  try {
    const body = await req.json();
    // Destructure based on our new payload structure:
    // isCustom is a boolean that determines if using a custom prompt.
    // When true: use customPrompt, size, and context.
    // When false: use scenario, topic, size, and context.
    const {
      isCustom,
      customPrompt,
      scenario,
      size = 'medium',
      context
    } = body;
    
    console.log('Comment generation request received:', {
      isCustom,
      customPrompt,
      scenario,
      size,
      context
    });
    
    // Validate the comment size.
    const sizeConfig = COMMENT_SIZES[size];
    if (!sizeConfig) {
      return NextResponse.json({ error: 'Invalid comment size requested' }, { status: 400 });
    }
    
    let finalPrompt = "";
    
    if (isCustom) {
      // Custom prompt mode: the frontend sends a custom prompt.
      if (!customPrompt || customPrompt.trim() === "") {
        return NextResponse.json({ error: 'Missing custom prompt for comment generation' }, { status: 400 });
      }
      finalPrompt = `
${customPrompt.trim()}
${sizeConfig.promptAddition}
Additional context about the POST: ${context || "None provided"}
Please generate a response within ${sizeConfig.maxLength} characters.
      `.trim();
    } else {
      // Scenario-based mode: use preset scenarios.
      if (!scenario || !COMMENT_STYLES[scenario]) {
        return NextResponse.json({ error: 'Invalid or missing scenario' }, { status: 400 });
      }
      const styleConfig = COMMENT_STYLES[scenario];
      
      finalPrompt = `
${styleConfig.prompt}
${styleConfig.context}
${sizeConfig.promptAddition}
Additional context about the POST: ${context || "None provided"}
Please generate a response within ${sizeConfig.maxLength} characters.
      `.trim();
    }
    
    console.log('Generated final prompt:', finalPrompt);
    
    // Create a new TransformStream for streaming the response
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    // Start the streaming process
    (async () => {
      try {
        const completion = await groq.chat.completions.create({
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant that generates engaging and context-sensitive LinkedIn comments keeping in mind that the response should be human-like and not too verbose."
            },
            {
              role: "user",
              content: finalPrompt
            }
          ],
          model: "llama-3.1-8b-instant",
          temperature: 0.7,
          max_tokens: sizeConfig.maxLength,
          top_p: 0.9,
          stream: true // Enable streaming
        });

        // Modify the streaming section in route.js
        for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
            // Send raw text chunks without JSON wrapping
            await writer.write(new TextEncoder().encode(`data: ${content}\n\n`));
            }
        }
        
        // Send final [DONE] marker
        await writer.write(new TextEncoder().encode('data: [DONE]\n\n'));  
        await writer.close();
      } catch (error) {
        console.error('Error during streaming:', error);
        await writer.write(new TextEncoder().encode(`data: ${JSON.stringify({ error: error.message })}\n\n`));
        await writer.close();
      }
    })();

    // Return the response with streaming headers
    // Modify the final return in POST
    return new Response(stream.readable, {
        headers: {
        ...CORS_HEADERS, // Add CORS headers here
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        },
    })
  } catch (err) {
    console.error('Error processing request:', { error: err.message, stack: err.stack });
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
