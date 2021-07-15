import React, { useEffect, useState, useRef } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { Console, Hook, Decode } from "console-feed";
import { usePaperStyles } from "../common/materialStyles";

const FooterLog = () => {
  const [logs, setLogs] = useState([]);
  const logRef = useRef<HTMLInputElement>(null);
  const classes = usePaperStyles();
  const handleClick = () => setLogs([]);
  useEffect(() => {
    logRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);
  useEffect(() => {
    Hook(window.console, (log) => {
      setLogs((prevLogs) => [...prevLogs, Decode(log)]);
    });
  }, []);
  return (
    <>
      <Box
        className={classes.paper}
        display="flex"
        alignItems="center"
        position="sticky"
        zIndex={1}
        top={0}
        height="50px"
        px={3}
      >
        <Typography variant="body2" color="textSecondary">
          Console
        </Typography>
        <Box ml="auto">
          <IconButton onClick={handleClick}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      <Box
        overflow="auto"
        height="100%"
        pt="51px"
        style={{
          background: "#242424",
        }}
      >
        <Console logs={logs} variant="dark" />
        <div ref={logRef} />
      </Box>
    </>
  );
};

export default FooterLog;
