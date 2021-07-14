import React from 'react';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ToggleButton from '@material-ui/lab/ToggleButton';

interface PlayProps {
  className?: string;
  paused?: boolean;
  disabled?: boolean;
  onPause?: () => void;
}
const Play: React.FC<PlayProps> = ({
  className,
  paused,
  disabled,
  onPause,
}: PlayProps) => {
  const handlePlay = () => {
    if (disabled) return;
    if (onPause) onPause();
  };
  return (
    <ToggleButton
      className={className}
      value="check"
      disabled={disabled}
      onClick={handlePlay}
    >
      {paused ? <PlayArrowIcon /> : <PauseIcon />}
    </ToggleButton>
  );
};
Play.defaultProps = {
  className: '',
  paused: true,
  disabled: false,
  onPause: undefined,
};
export default Play;
