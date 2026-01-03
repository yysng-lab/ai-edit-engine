export type UpdateContentFn = (section: string, content: any, runtimeEnv: any) => Promise<any>;
export declare function editContent(section: string, content: any, runtimeEnv: any, updateContent: UpdateContentFn): Promise<any>;
