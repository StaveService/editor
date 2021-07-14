import React, { ChangeEvent, useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { useToggle } from 'react-use';
import SongInfo from '../ui/SongInfo';
import Stop from '../ui/Stop';
import Pause from '../ui/Pause';
import Volume from '../ui/Volume';
import CountIn from '../ui/CountIn';
import Loop from '../ui/Loop';
import Metronome from '../ui/Metronome';
import Layout from '../ui/Layout';
import Zoom from '../ui/Zoom';
import { AlphaTabApi } from '../alphatab-1.1.0/package/dist/alphaTab';

interface HeaderProps {
  alphaTabApi?: AlphaTabApi;
}
const Header = ({ alphaTabApi }: HeaderProps) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [masterVolume, setMasterVolume] = useState(100);
  const [paused, setPaused] = useState(true);
  const [playerReady, setPlayerReady] = useState(true);
  const [muted, toggleMuted] = useToggle(false);
  const [countIn, toggleCountIn] = useToggle(false);
  const [loop, toggleLoop] = useToggle(false);
  const [metronome, toggleMetronome] = useToggle(false);
  const [layout, setLayout] = useState<0 | 1>(0);
  const [zoom, setZoom] = useState(100);
  // handlers
  const handlePlayerReadySetFalse = () => setPlayerReady(false);
  const handlePause = () => alphaTabApi?.playPause();
  const handleStop = () => alphaTabApi?.stop();
  const handleVolume = (
    _e: ChangeEvent<Record<string, unknown>>,
    newValue: number | number[]
  ) => {
    if (!alphaTabApi) return;
    if (!Array.isArray(newValue)) {
      alphaTabApi.masterVolume = newValue / 100;
      setMasterVolume(newValue);
    }
  };
  const handleMute = () => {
    if (!alphaTabApi) return;
    toggleMuted();
    if (alphaTabApi.masterVolume === 0) {
      alphaTabApi.masterVolume = masterVolume / 100;
    } else {
      alphaTabApi.masterVolume = 0;
    }
  };
  const handlePlayerState = ({ state }: { state: 0 | 1 }) =>
    setPaused(state === 0);
  const handleCountIn = () => {
    if (!alphaTabApi) return;
    toggleCountIn();
    alphaTabApi.countInVolume = !countIn ? 1 : 0;
  };
  const handleLoop = () => {
    if (!alphaTabApi) return;
    toggleLoop();
    alphaTabApi.isLooping = !loop;
  };
  const handleMetronome = () => {
    if (!alphaTabApi) return;
    toggleMetronome();
    alphaTabApi.metronomeVolume = !metronome ? 1 : 0;
  };
  const handleScoreLoaded = (score: { title: string; artist: string }) => {
    setTitle(score.title);
    setArtist(score.artist);
  };
  const handleLayout = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
    if (!alphaTabApi) return;
    switch (e.target.value) {
      case 0:
        setLayout(0);
        alphaTabApi.settings.display.layoutMode = 0;
        break;
      case 1:
        setLayout(1);
        alphaTabApi.settings.display.layoutMode = 1;
        break;
      default:
        break;
    }
    alphaTabApi.updateSettings();
    alphaTabApi.render();
  };
  const handleZoom = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
    if (!alphaTabApi) return;
    setZoom(e.target.value as number);
    const zoomLevel = parseInt(e.target.value as string, 10) / 100;
    alphaTabApi.settings.display.scale = zoomLevel;
    alphaTabApi.updateSettings();
    alphaTabApi.render();
  };
  useEffect(() => {
    alphaTabApi?.scoreLoaded.on(handleScoreLoaded);
    alphaTabApi?.playerReady.on(handlePlayerReadySetFalse);
    alphaTabApi?.playerStateChanged.on(handlePlayerState);
    return () => {
      alphaTabApi?.scoreLoaded.off(handleScoreLoaded);
      alphaTabApi?.playerReady.off(handlePlayerReadySetFalse);
      alphaTabApi?.playerStateChanged.off(handlePlayerState);
    };
  }, [alphaTabApi]);
  return (
    <AppBar className="Header" position="absolute" color="default">
      <Toolbar>
        <Grid container>
          <Grid className="at-controls-left" item xs={4}>
            <SongInfo title={title} artist={artist} />
          </Grid>
          <Grid item xs={5}>
            <Box display="flex" justifyContent="center">
              <ToggleButtonGroup>
                <Stop onStop={handleStop} />
                <Pause
                  paused={paused}
                  disabled={playerReady}
                  onPause={handlePause}
                />
                <Volume
                  volume={masterVolume}
                  muted={muted}
                  onMute={handleMute}
                  onVolume={handleVolume}
                />
                <CountIn selected={countIn} onClick={handleCountIn} />
                <Loop selected={loop} onClick={handleLoop} />
                <Metronome selected={metronome} onClick={handleMetronome} />
              </ToggleButtonGroup>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Grid className="at-controls-right" container>
              <Grid item xs={6} />
              <Grid item xs={3}>
                <Zoom zoom={zoom} onZoom={handleZoom} />
              </Grid>
              <Grid item xs={3}>
                <Layout layout={layout} onLayout={handleLayout} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
Header.defaultProps = {
  alphaTabApi: undefined,
};
export default Header;
