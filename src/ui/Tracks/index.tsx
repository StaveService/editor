import React, { useState, MouseEvent } from 'react';
import { FaGuitar } from 'react-icons/fa';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import Paper from '@material-ui/core/Paper';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { model } from '@coderline/alphatab';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const ITrack = new model.Track();
const GuitarIcon = ({ color }: SvgIconProps) => (
  <SvgIcon color={color}>
    <FaGuitar />
  </SvgIcon>
);
interface TrackProps extends TracksProps {
  i: number;
  track: typeof ITrack;
}
const Track = ({
  track,
  selectedIndex,
  onListItemClick,
  onMute,
  onSolo,
  i,
}: Omit<TrackProps, 'tracks'>) => {
  const [mute, setMute] = useState(false);
  const [solo, setSolo] = useState(false);
  const selected = selectedIndex === i;
  // handlers
  const handleListItemClick = () => {
    if (onListItemClick) onListItemClick(track, i);
  };
  const handleMute = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onMute) onMute(mute, track);
    setMute(!mute);
  };
  const handleSolo = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onSolo) onSolo(solo, track);
    setSolo(!solo);
  };
  return (
    <ListItem
      key={track.name}
      id="at-track-template"
      button
      selected={selected}
      onClick={handleListItemClick}
    >
      <ListItemIcon>
        <GuitarIcon color={selected ? 'primary' : 'inherit'} />
      </ListItemIcon>
      <ListItemText
        primary={track.name}
        secondary={
          <ToggleButtonGroup>
            <ToggleButton size="small" selected={mute} onClick={handleMute}>
              M
            </ToggleButton>
            <ToggleButton size="small" selected={solo} onClick={handleSolo}>
              S
            </ToggleButton>
          </ToggleButtonGroup>
        }
      />
    </ListItem>
  );
};

interface TracksProps {
  tracks?: typeof ITrack[];
  selectedIndex?: number;
  onListItemClick?: (track: typeof ITrack, index: number) => void;
  onSolo?: (solo: boolean, soloTracks: typeof ITrack) => void;
  onMute?: (mute: boolean, mutedTracks: typeof ITrack) => void;
}
const Tracks: React.FC<TracksProps> = ({
  tracks,
  selectedIndex,
  onListItemClick,
  onSolo,
  onMute,
}: TracksProps) => {
  const trackItems = tracks?.map((track, i) => (
    <Track
      key={track.index}
      track={track}
      i={i}
      selectedIndex={selectedIndex}
      onListItemClick={onListItemClick}
      onSolo={onSolo}
      onMute={onMute}
    />
  ));
  return (
    <List className="at-track-list" component={Paper}>
      {trackItems}
    </List>
  );
};
Track.defaultProps = {
  tracks: [],
  selectedIndex: 0,
  onMute: undefined,
  onSolo: undefined,
  onListItemClick: undefined,
};
Tracks.defaultProps = {
  tracks: [],
  selectedIndex: 0,
  onMute: undefined,
  onSolo: undefined,
  onListItemClick: undefined,
};
export default Tracks;
