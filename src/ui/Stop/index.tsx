import React from 'react';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import ToggleButton from '@material-ui/lab/ToggleButton';

interface StopProps {
  className?: string;
  disabled?: boolean;
  onStop?: () => void;
}
const Stop: React.FC<StopProps> = ({
  className,
  disabled,
  onStop,
}: StopProps) => {
  const handleStop = () => {
    if (disabled) return;
    if (onStop) onStop();
  };
  return (
    <ToggleButton
      className={className}
      value="check"
      disabled={disabled}
      onClick={handleStop}
    >
      <SkipPreviousIcon />
    </ToggleButton>
  );
};
Stop.defaultProps = {
  className: '',
  disabled: false,
  onStop: undefined,
};
export default Stop;
