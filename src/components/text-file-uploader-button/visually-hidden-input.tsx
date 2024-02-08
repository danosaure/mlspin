import { styled } from '@mui/material';
import { displayName } from '../../utils';
import namespace from './namespace';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

VisuallyHiddenInput.displayName = displayName(namespace('VisuallyHiddenInput'));

export { VisuallyHiddenInput };
