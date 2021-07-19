import { FileType, PostProcessor } from "@teleporthq/teleport-types";
import { Transform } from "sucrase";
export interface PostProcessorFactoryOptions {
    fileType?: FileType;
    jsxPragma?: string;
    jsxFragmentPragma?: string;
    transforms?: Transform[];
}
export declare const createJSXTranspilePostProcessor: (options?: PostProcessorFactoryOptions) => PostProcessor;
declare const _default: PostProcessor;
export default _default;
