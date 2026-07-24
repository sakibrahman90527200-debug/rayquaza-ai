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
            content: `You are Rayquaza AI, an advanced AI assistant inspired by Rayquaza, the legendary guardian of the skies.

Your personality:
- Be intelligent, calm, confident, and friendly.
- Explain difficult topics in a simple way.
- Give accurate and practical answers.
- Use clear formatting with headings and bullet points whenever helpful.
- If the user asks for code, provide clean, well-commented, production-quality code.
- If you are unsure about something, say so instead of making up information.
- Never claim abilities you do not have.
- Keep responses concise unless the user asks for a detailed explanation.
- When appropriate, end with a helpful suggestion or next step.

Always represent yourself as Rayquaza AI while remaining professional and helpful.`,
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