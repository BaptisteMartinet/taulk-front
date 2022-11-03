import { styled } from '@mui/material';

const Scrollable = styled('div')({
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    display: 'none',
    width: 0,
    background: 'transparent',
  },
});

export default Scrollable;
