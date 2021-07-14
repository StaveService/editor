import React, { ChangeEvent, MouseEvent } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Slider from '@material-ui/core/Slider';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import { Box } from '@material-ui/core';

interface VolumeIconProps {
  color: string;
  value?: number;
  muted?: boolean;
}
const VolumeIcon: React.FC<VolumeIconProps> = ({
  color,
  value,
  muted,
}: VolumeIconProps) => {
  if (muted || !value) return <VolumeOffIcon />;
  if (value >= 0.6) return <VolumeUpIcon />;
  if (value >= 0.3) return <VolumeDownIcon />;
  return <VolumeMuteIcon />;
};
VolumeIcon.defaultProps = {
  value: undefined,
  muted: false,
};
interface VolumeProps {
  className?: string;
  volume: number;
  muted?: boolean;
  onMute?: () => void;
  onVolume?: (
    _e: ChangeEvent<Record<string, unknown>>,
    newValue: number | number[]
  ) => void;
}
const Volume: React.FC<VolumeProps> = ({
  className,
  volume,
  muted,
  onMute,
  onVolume,
}: VolumeProps) => {
  // handlers
  const handleClickValue = (e: MouseEvent) => e.stopPropagation();
  const handleMute = () => {
    if (onMute) onMute();
  };
  return (
    <ToggleButton
      className={className}
      value=""
      selected={muted}
      onChange={handleMute}
    >
      <Box width={200} display="flex" alignItems="center">
        <VolumeIcon value={volume} muted={muted} color="twitter" />
        <Slider
          className={className}
          disabled={muted}
          value={volume}
          onClick={handleClickValue}
          onChange={onVolume}
        />
      </Box>
    </ToggleButton>
  );
};
Volume.defaultProps = {
  className: '',
  muted: false,
  onVolume: undefined,
  onMute: undefined,
};

export default Volume;
