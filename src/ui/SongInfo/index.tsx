import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

interface SongInfoProps {
  title: string;
  artist: string;
}
const SongInfo: React.FC<SongInfoProps> = ({
  title,
  artist,
}: SongInfoProps) => {
  return (
    <Box className="SongInfo" display="flex" alignItems="center" height="100%">
      <Box className="at-song-title" mx={3}>
        <Typography variant="body1">{title}</Typography>
      </Box>
      -
      <Box className="at-song-artist" mx={3}>
        <Typography variant="body2">{artist}</Typography>
      </Box>
    </Box>
  );
};
export default SongInfo;
