import React, { useEffect, useRef, useState } from "react";
import { monaco } from "react-monaco-editor";
import { useSelector } from "react-redux";
import SplitPane from "react-split-pane";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import useScript from "react-script-hook";
import { AlphaTabApi } from "../alphatab-1.1.0/package/dist/alphaTab";
import Editor from "./Editor";
import Explorer from "./Explorer";
import Score from "./Score";
import Header from "./Header";
import Footer from "./Footer";
import SettingModal from "./Modal/Setting";
import NewProjectModal from "./Modal/NewProject";
import MonacoModelsContext from "../contexts/MonacoModels";
import { selectTheme } from "../slices/theme";
import { IAlphaTab } from "../interfaces";

const Main: React.FC = () => {
  const [monacoModels, setMonacoModels] = useState<monaco.editor.ITextModel[]>(
    []
  );
  const [alphaTabApi, setAlphaTabApi] = useState<AlphaTabApi>();
  const mainRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [loading] = useScript({
    src:
      process.env.NODE_ENV === "development"
        ? "./alphatab-1.1.0/package/dist/alphaTab.js"
        : "../src/alphatab-1.1.0/package/dist/alphaTab.js",
  });
  const theme = useSelector(selectTheme);
  const materialTheme = createMuiTheme({
    palette: {
      type: theme,
    },
  });
  useEffect(() => {
    if (!loading && mainRef.current && scrollRef.current)
      setAlphaTabApi(
        new window.alphaTab.AlphaTabApi(mainRef.current, {
          tex: true,
          player: {
            soundFont:
              process.env.NODE_ENV === "development"
                ? "alphatab-1.1.0/package/dist/soundfont/sonivox.sf2"
                : "../src/alphatab-1.1.0/package/dist/soundfont/sonivox.sf2",
            enablePlayer: true,
          },
        })
      );
  }, [loading]);
  return (
    <ThemeProvider theme={materialTheme}>
      <MonacoModelsContext.Provider value={{ monacoModels, setMonacoModels }}>
        <SettingModal />
        <NewProjectModal />
        <Box height="100%">
          <CssBaseline />
          <Header alphaTabApi={alphaTabApi} />
          <Box height="100%" pt={8}>
            <SplitPane
              split="vertical"
              defaultSize="280px"
              minSize={80}
              style={{ position: "relative" }}
            >
              <Explorer />
              <SplitPane
                split="horizontal"
                defaultSize="90%"
                pane2Style={{
                  height: "100%",
                  minHeight: "50px",
                  overflow: "hidden",
                }}
              >
                <SplitPane minSize={50} defaultSize="50%" split="vertical">
                  <Editor />
                  <Score
                    mainRef={mainRef}
                    scrollRef={scrollRef}
                    alphaTabApi={alphaTabApi}
                  />
                </SplitPane>
                <Footer />
              </SplitPane>
            </SplitPane>
          </Box>
        </Box>
      </MonacoModelsContext.Provider>
    </ThemeProvider>
  );
};
declare global {
  interface Window {
    alphaTab: IAlphaTab;
  }
}

export default Main;
