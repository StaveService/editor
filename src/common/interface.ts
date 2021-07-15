import { synth, AlphaTabApi } from "../alphatab-1.1.0/package/dist/alphaTab";

export interface IFilesBase {
  readonly fileName: string;
  readonly filePath: string;
}

export interface IFolder extends IFilesBase {
  readonly fileType?: "file" | "folder";
}

export interface IFile extends IFilesBase {
  readonly fileExt?: string;
  fileText?: string;
  isChanged?: boolean;
}

export interface IFiles extends IFolder, IFile {}

export interface INewProjectFormValues {
  title: string;
  artist: string;
  template: "empty" | "band" | "piano";
  bpm: number;
  subtitle: string;
  album: string;
  words: string;
  music: string;
  projectPath: string;
}
export interface IAlphaTab {
  AlphaTabApi: typeof AlphaTabApi;
  synth: typeof synth;
}
