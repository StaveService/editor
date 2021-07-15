import { createContext } from "react";
import { AlphaTabApi } from "../alphatab-1.1.0/package/dist/alphaTab";

const ActiveTabIndex = createContext({} as AlphaTabApi | undefined);
export default ActiveTabIndex;
