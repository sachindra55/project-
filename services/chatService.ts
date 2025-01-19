import axios from 'axios';

const PROXY_URL = 'http://localhost:3001/api/chat';

const SYSTEM_PROMPT = `You are a helpful customer support agent for SONIVALE, a virtual reality sound experience platform. 
Your name is Soni. Be professional, friendly, and concise in your responses. 
If you don't know something, be honest about it and offer to connect the user with a human agent.
Focus on helping users with:
- Technical issues with the platform
- Account-related questions
- Subscription inquiries
- Feature explanations
- General platform usage`;

export async function getChatbotResponse(userMessage: string, chatHistory: Array<{ role: string, content: string }>) {
  try {
    console.log('Sending request to chat service with message:', userMessage);

    // Format the chat history for Claude API v2
    const messages = [
      { role: 'assistant', content: SYSTEM_PROMPT },
      ...chatHistory.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      { role: 'user', content: userMessage }
    ];

    // Create the message request
    const response = await axios.post(PROXY_URL, {
      messages,
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1024
    });

    console.log('Received response:', response.data);

    if (!response.data.content || !response.data.content[0] || !response.data.content[0].text) {
      throw new Error('Invalid response format from chat service');
    }

    return response.data.content[0].text;
  } catch (error) {
    console.error('Error in chat interaction:', error);
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status;
      const errorMessage = error.response?.data?.error?.message || error.message;
      
      if (statusCode === 401) {
        throw new Error('Authentication failed. Please check the API configuration.');
      } else if (statusCode === 429) {
        throw new Error('Too many requests. Please try again in a moment.');
      } else if (!error.response) {
        throw new Error('Unable to connect to the chat service. Please make sure the proxy server is running.');
      }
      
      throw new Error(`Chat service error: ${errorMessage}`);
    }
    throw new Error('An unexpected error occurred while processing your message.');
  }
}
