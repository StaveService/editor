const vm = require("vm");
const fs = require("fs");
const path = require("path");

const compileJS = (filePath: string) => {
  const fileText = fs.readFileSync(filePath, "utf-8");
  const jsFileDir = path.dirname(filePath);
  const dirname =
    process.env.NODE_ENV === "development"
      ? __dirname
      : path.join(__dirname, "common");
  const staveRequire = (relativePath: string) =>
    compileJS(path.join(jsFileDir, relativePath));
  const contextObj = {
    fs,
    dirname,
    console,
    module,
    staveRequire,
  };
  const options = {
    timeout: 1000,
  };
  let result;
  try {
    result = vm.runInNewContext(fileText, contextObj, options);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
  Object.keys(require.cache).forEach((key) => {
    delete require.cache[key];
  });
  return result;
};

module.exports = compileJS;
