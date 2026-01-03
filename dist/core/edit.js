export async function editContent(section, content, runtimeEnv, updateContent) {
    return await updateContent(section, content, runtimeEnv);
}
