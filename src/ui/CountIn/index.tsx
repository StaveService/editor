import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import TimerIcon from '@material-ui/icons/Timer';

interface CountInProps {
  className?: string;
  selected?: boolean;
  onClick?: () => void;
}
const CountIn: React.FC<CountInProps> = ({
  className,
  selected,
  onClick,
}: CountInProps) => {
  return (
    <ToggleButton
      className={className}
      value="check"
      selected={selected}
      onClick={onClick}
    >
      <TimerIcon />
    </ToggleButton>
  );
};
CountIn.defaultProps = {
  className: '',
  selected: false,
  onClick: undefined,
};
export default CountIn;
