import React, { ChangeEvent } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

interface ZoomProps {
  zoom?: number;
  onZoom?: (e: ChangeEvent<{ name?: string; value: unknown }>) => void;
}
const Zoom: React.FC<ZoomProps> = ({ zoom, onZoom }: ZoomProps) => {
  const options = [25, 50, 75, 90, 100, 110, 125, 150, 200];
  const optionItems = options.map((option) => (
    <MenuItem key={option} value={option}>
      {option}%
    </MenuItem>
  ));
  return (
    <FormControl className="Zoom">
      <InputLabel id="zoom-select-label">Zoom</InputLabel>
      <Select
        id="zoom-select"
        labelId="zoom-select-label"
        value={zoom}
        onChange={onZoom}
      >
        {optionItems}
      </Select>
    </FormControl>
  );
};
Zoom.defaultProps = {
  zoom: 100,
  onZoom: undefined,
};
export default Zoom;
