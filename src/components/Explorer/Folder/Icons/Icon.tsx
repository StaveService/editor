import React, { ReactChild } from "react";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";

interface IIcon {
  children: ReactChild;
  handleActiveInput: () => void;
}

const Icon = ({ children, handleActiveInput }: IIcon) => {
  const handleClick = () => handleActiveInput();
  return <IconButton onClick={handleClick}>{children}</IconButton>;
};

interface IIconsProps {
  icons: IIcon[];
}

const Icons = ({ icons }: IIconsProps) => {
  const iconItems = icons.map(({ children, handleActiveInput }, i) => (
    // eslint-disable-next-line react/no-array-index-key
    <Box key={i} ml={1}>
      <Icon handleActiveInput={handleActiveInput}>{children}</Icon>
    </Box>
  ));
  return (
    <Box display="flex" justifyContent="around">
      {iconItems}
    </Box>
  );
};

export default Icons;
