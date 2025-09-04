import type { Request, Response } from "express";
declare const createContent: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getContent: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const deleteContent: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { createContent, getContent, deleteContent };
//# sourceMappingURL=content.d.ts.map