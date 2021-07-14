import React, {
  useEffect,
  MutableRefObject,
  useState,
  useCallback,
} from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import useComponentSize from '@rehooks/component-size';
import { selectTabs, selectActiveTabIndex } from '../../slices/tab';
import styles from './index.sass';
// import Tracks from './Tracks/Tracks';
import Tracks, { ITrack } from '../../ui/Tracks';
import { getFile } from '../../common/fs';
import { compileJS } from '../../common/vm';
import { usePaperStyles } from '../../common/materialStyles';
import { AlphaTabApi } from '../../alphatab-1.1.0/package/dist/alphaTab';

interface ScoreProps {
  mainRef: MutableRefObject<HTMLDivElement | null>;
  scrollRef: MutableRefObject<HTMLDivElement | null>;
  alphaTabApi: AlphaTabApi | undefined;
}
const Score = ({ mainRef, scrollRef, alphaTabApi }: ScoreProps) => {
  const [tracks, setTracks] = useState<typeof ITrack[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { width } = useComponentSize(scrollRef);
  const tabs = useSelector(selectTabs);
  const activeTabIndex = useSelector(selectActiveTabIndex);
  const classes = usePaperStyles();
  // handlers
  const handleListItemClick = (track: typeof ITrack, i: number) => {
    setSelectedIndex(i);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    alphaTabApi?.renderTracks([track]);
  };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const scoreLoaded = (score: any) => setTracks(score.tracks);
  const renderStarted = useCallback(() => {
    if (alphaTabApi) setSelectedIndex(alphaTabApi?.tracks[0].index);
  }, [alphaTabApi]);
  useEffect(() => {
    alphaTabApi?.renderStarted.on(renderStarted);
    alphaTabApi?.scoreLoaded.on(scoreLoaded);
    return () => {
      alphaTabApi?.renderStarted.off(renderStarted);
      alphaTabApi?.scoreLoaded.off(scoreLoaded);
    };
  }, [alphaTabApi, renderStarted]);
  // alphaTab change tex
  useEffect(() => {
    alphaTabApi?.tex('');
    if (!tabs[activeTabIndex]) return;
    const { filePath, fileExt } = tabs[activeTabIndex];
    switch (fileExt) {
      case '.js':
        (async () => {
          const data = await compileJS(filePath);
          alphaTabApi?.tex(data);
        })();
        break;
      case '.tex': {
        const { fileText } = getFile(filePath);
        alphaTabApi?.tex(fileText);
        break;
      }
      default:
        alphaTabApi?.tex('');
        break;
    }
  }, [tabs, activeTabIndex, alphaTabApi]);

  // alphaTab resize
  useEffect(() => {
    if (!alphaTabApi) return;
    alphaTabApi.renderer.width = width;
    alphaTabApi.renderer.resizeRender();
  }, [alphaTabApi, width]);

  return (
    <Box
      id="alphaTab"
      className="Score"
      height="100%"
      width="100%"
      style={{ background: 'white' }}
    >
      <Box
        className="at-wrap"
        position="relative"
        display="flex"
        flexDirection="column"
        width="100%"
        height="100%"
        mx="auto"
        overflow="hidden"
      >
        <Box
          className="at-content"
          position="relative"
          overflow="hidden"
          flexGrow={1}
        >
          <Box
            className={`${styles.atSidebar} ${classes.paper}`}
            position="absolute"
            top="0"
            left="0"
            bottom="0"
            zIndex={1001}
            display="flex"
            alignContent="stretch"
            width="auto"
            maxWidth="60px"
            overflow="hidden"
            border={1}
            borderLeft={0}
            borderTop={0}
            borderBottom={0}
            borderColor="divider"
          >
            <Tracks
              tracks={tracks}
              selectedIndex={selectedIndex}
              onListItemClick={handleListItemClick}
            />
          </Box>
          <Box
            {...{ ref: scrollRef }}
            className="at-viewport"
            overflow="auto"
            position="absolute"
            top={0}
            left={70}
            right={0}
            bottom={0}
            pr={3}
          >
            <div ref={mainRef} className="at-main" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Score;
