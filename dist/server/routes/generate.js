import { generateContent } from "../../core/generate.js";
export async function handleGenerate(request, env) {
    const { section, instruction } = await request.json();
    const result = await generateContent(section, instruction, env);
    return Response.json(result);
}
