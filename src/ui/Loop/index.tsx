import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import RepeatIcon from '@material-ui/icons/Repeat';

interface LoopProps {
  className?: string;
  selected?: boolean;
  onClick?: () => void;
}
const Loop: React.FC<LoopProps> = ({
  className,
  selected,
  onClick,
}: LoopProps) => {
  return (
    <ToggleButton
      className={className}
      value="check"
      selected={selected}
      onClick={onClick}
    >
      <RepeatIcon />
    </ToggleButton>
  );
};
Loop.defaultProps = {
  className: '',
  selected: false,
  onClick: undefined,
};
export default Loop;
