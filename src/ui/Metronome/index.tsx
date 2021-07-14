import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { GiMetronome } from 'react-icons/gi';

interface MetronomeProps {
  className?: string;
  selected?: boolean;
  onClick?: () => void;
}
const Metronome: React.FC<MetronomeProps> = ({
  className,
  selected,
  onClick,
}: MetronomeProps) => {
  return (
    <ToggleButton
      value="check"
      className={className}
      selected={selected}
      onClick={onClick}
    >
      <GiMetronome size={24} />
    </ToggleButton>
  );
};
Metronome.defaultProps = {
  className: '',
  selected: false,
  onClick: undefined,
};
export default Metronome;
