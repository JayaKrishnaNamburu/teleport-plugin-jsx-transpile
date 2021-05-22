import { FileType, PostProcessor } from "@teleporthq/teleport-types";
import { transform, Transform } from "sucrase";

export interface PostProcessorFactoryOptions {
  fileType?: FileType;
  jsxPragma?: string;
  jsxFragmentPragma?: string;
  transforms?: Transform[];
}

export const createJSXTranspilePostProcessor = (
  options: PostProcessorFactoryOptions = {}
) => {
  const {
    fileType = FileType.JS || FileType.TSX || FileType.TS,
    jsxPragma,
    jsxFragmentPragma,
    transforms = ["jsx"],
  } = options;
  const processor: PostProcessor = (codeChunks) => {
    const code = codeChunks[fileType];
    if (code) {
      if ([FileType.TS, FileType.TSX].includes(fileType)) {
        transforms.push("typescript");
      }

      codeChunks[fileType] = transform(code, {
        transforms,
        ...(jsxPragma && { jsxPragma }),
        ...(jsxFragmentPragma && { jsxFragmentPragma }),
        production: true,
      }).code;
    }
    return codeChunks;
  };

  return processor;
};

export default createJSXTranspilePostProcessor();
