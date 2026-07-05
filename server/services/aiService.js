const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

async function analyzeDisaster(report) {
  try {
    const prompt = `
You are an emergency disaster AI.

Analyze the report and return ONLY valid JSON.

Rules:
- No markdown
- No explanations
- Only JSON

Report:
Type: ${report.disasterType}
Location: ${report.location}
Description: ${report.description}
People Affected: ${report.peopleAffected}

Return format:
{
  "riskLevel": "LOW | MEDIUM | HIGH | CRITICAL",
  "riskScore": 0-100,
  "summary": "short summary",
  "actions": ["action1", "action2", "action3"],
  "emergencyMessage": "urgent instruction"
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Clean AI response (important fix)
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    return JSON.parse(text);
  } catch (error) {
    console.log("AI Error:", error.message);

    return {
      riskLevel: "UNKNOWN",
      riskScore: 0,
      summary: "AI analysis failed",
      actions: [],
      emergencyMessage: "Check system logs",
    };
  }
}

module.exports = { analyzeDisaster };