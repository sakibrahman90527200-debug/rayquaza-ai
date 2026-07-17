const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export async function askAI(message) {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",

          // Optional but recommended by OpenRouter
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "Rayquaza AI",
        },

        body: JSON.stringify({
          model: "deepseek/deepseek-chat-v3-0324",

          messages: [
            {
              role: "user",
              content: message,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log(data); // For debugging

    if (!response.ok) {
      throw new Error(data.error?.message || "OpenRouter API Error");
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error(error);
    throw error;
  }
}