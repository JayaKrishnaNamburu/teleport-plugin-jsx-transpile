import { FileType } from "@teleporthq/teleport-types";
import { transform } from "sucrase";
const createJSXTranspilePostProcessor = (options = {}) => {
  const {
    fileType = FileType.JS || FileType.TSX || FileType.TS,
    jsxPragma,
    jsxFragmentPragma,
    transforms = ["jsx"]
  } = options;
  const processor = (codeChunks) => {
    const code = codeChunks[fileType];
    if (code) {
      if ([FileType.TS, FileType.TSX].includes(fileType)) {
        transforms.push("typescript");
      }
      codeChunks[fileType] = transform(code, {
        transforms,
        ...jsxPragma && { jsxPragma },
        ...jsxFragmentPragma && { jsxFragmentPragma },
        production: true
      }).code;
    }
    return codeChunks;
  };
  return processor;
};
var src_default = createJSXTranspilePostProcessor();
export {
  createJSXTranspilePostProcessor,
  src_default as default
};
