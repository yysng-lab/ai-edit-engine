import OpenAI from "openai";
export async function generateContent(section, instruction, runtimeEnv) {
    const client = new OpenAI({
        apiKey: runtimeEnv.OPENAI_API_KEY
    });
    if (!client.apiKey) {
        throw new Error("Missing OPENAI_API_KEY");
    }
    if (section === "cta") {
        const prompt = `
Return JSON ONLY:
{
  "heading": string,
  "description": string,
  "button": { "label": string, "href": string }
}

User instruction:
${instruction}
`;
        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7
        });
        const raw = completion.choices[0].message.content;
        if (!raw)
            throw new Error("OpenAI returned empty content");
        return JSON.parse(raw);
    }
    const heroPrompt = `
Return JSON ONLY:
{
  "title": string,
  "subtitle": string,
  "cta": { "label": string, "href": string }
}

User instruction:
${instruction}
`;
    const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: heroPrompt }],
        temperature: 0.7
    });
    const raw = completion.choices[0].message.content;
    if (!raw)
        throw new Error("OpenAI returned empty content");
    return JSON.parse(raw);
}
