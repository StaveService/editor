import * as yup from "yup";

export const projectSchema = yup.object().shape({
  title: yup.string().required().max(100),
  artist: yup.string().required().max(100),
  bpm: yup.number(),
  subtitle: yup.string(),
  album: yup.string(),
  music: yup.string(),
  words: yup.string(),
});

export default undefined;
