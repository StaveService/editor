import { synth, AlphaTabApi } from "./alphatab-1.1.0/package/dist/alphaTab";

export interface INewProjectFormValues {
  title: string;
  artist: string;
  template: "empty" | "band" | "piano";
  bpm: number;
  subtitle: string;
  album: string;
  words: string;
  music: string;
  workDir: string;
}
export interface IAlphaTab {
  AlphaTabApi: typeof AlphaTabApi;
  synth: typeof synth;
}
export interface IUser {
  name: string;
}
