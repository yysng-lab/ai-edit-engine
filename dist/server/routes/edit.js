import { editContent } from "../../core/edit.js";
export async function handleEdit(request, env) {
    const { section, content } = await request.json();
    // The client will inject this at runtime
    const updateContent = env.UPDATE_CONTENT;
    if (!updateContent) {
        throw new Error("UPDATE_CONTENT not provided to engine");
    }
    const result = await editContent(section, content, env, updateContent);
    return Response.json({ result });
}
