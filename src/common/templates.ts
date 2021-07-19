import path from "path";
import fs from "fs";
import { INewProjectFormValues } from "./interface";

const createIndex = (
  { title, subtitle, artist, album, words, music, bpm }: INewProjectFormValues,
  define = "",
  content = ""
) =>
  `${define}

module.export = \`
\\\\title "${title}"
\\\\subtitle "${subtitle}"
\\\\artist "${artist}"
\\\\album "${album}"
\\\\words "${words}"
\\\\music "${music}"
\\\\tempo ${bpm}
.

${content}
\``;
export const addEmpty = (data: INewProjectFormValues) => {
  const projectDir = path.join(data.workDir, data.title);
  fs.mkdirSync(projectDir, { recursive: true });
  fs.writeFileSync(path.join(projectDir, "index.js"), createIndex(data));
};

export const addBand = (data: INewProjectFormValues) => {
  const instruments = ["guitar", "bass", "drum", "vocal"];
  const defines = instruments
    .map(
      (instrument) =>
        `const ${instrument} = staveRequire("${instrument}/${instrument}.js")`
    )
    .join("\n");
  const content = instruments
    .map((instrument) => `\${${instrument}}`)
    .join("\n");

  fs.mkdirSync(data.workDir, { recursive: true });
  fs.writeFileSync(
    path.join(data.workDir, "index.js"),
    createIndex(data, defines, content)
  );

  instruments.forEach((instrument) => {
    const instrumentFolder = path.join(data.workDir, instrument);
    fs.mkdirSync(instrumentFolder, { recursive: true });
    fs.writeFileSync(
      path.join(instrumentFolder, `${instrument}.js`),
      "module.export = ``"
    );
  });
};

export const addTemplate = (data: INewProjectFormValues) => {
  switch (data.template) {
    case "empty":
      addEmpty(data);
      break;

    case "band":
      addBand(data);
      break;

    default:
      break;
  }
};
