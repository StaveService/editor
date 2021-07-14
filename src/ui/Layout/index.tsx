import React, { ChangeEvent } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

interface LayoutProps {
  layout?: 0 | 1;
  onLayout?: (e: ChangeEvent<{ name?: string; value: unknown }>) => void;
}
const Layout: React.FC<LayoutProps> = ({ onLayout, layout }: LayoutProps) => {
  return (
    <FormControl className="Layout">
      <InputLabel id="layout-select-label">Layout</InputLabel>
      <Select
        id="layout-select"
        labelId="layout-select-label"
        value={layout}
        onChange={onLayout}
        autoWidth
      >
        <MenuItem value={0}>Horizontal</MenuItem>
        <MenuItem value={1}>Page</MenuItem>
      </Select>
    </FormControl>
  );
};
Layout.defaultProps = {
  layout: 0,
  onLayout: undefined,
};
export default Layout;
