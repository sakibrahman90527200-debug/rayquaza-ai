const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const MODEL = import.meta.env.VITE_MODEL;

export async function askAI(chatHistory) {
  try {
    const response = await fetch(`${API_URL}/chat/completions`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },

      body: JSON.stringify({
        model: MODEL,

        messages: [
          {
            role: "system",
            content:
              "You are Rayquaza AI, a futuristic AI assistant inspired by the legendary sky guardian Rayquaza. Be intelligent, friendly, concise, and helpful.",
          },

          ...chatHistory,
        ],

        max_tokens: 16384,
      }),
    });

   const data = await response.json();

console.log("API Response:", data);
console.log("Message:", data.choices[0].message);
console.log("Content:", data.choices[0].message.content);

if (!response.ok) {
      throw new Error(
        data?.error?.message ||
          `HTTP ${response.status}: ${response.statusText}`
      );
    }

    return data.choices?.[0]?.message?.content || "No response received.";
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}