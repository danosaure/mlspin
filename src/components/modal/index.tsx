import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

export type MLSPinModalProps = {
  open: boolean;
  className?: string;
  onClose?: () => void;
  title?: string;
  children?: ReactNode;
};

export default ({ className, open, title, onClose, children }: MLSPinModalProps) => (
  <Modal className={`dano-modal ${className}`} open={open} onClose={onClose}>
    <Box className={`dano-modal-box ${className}`} sx={{ bgcolor: 'background.paper' }}>
      <Typography className={`dano-modal-box-title ${className}`} variant="h6" component="div">
        {title}
      </Typography>
      <Divider className={`dano-modal-box-divider ${className}`} flexItem />
      {children}
    </Box>
  </Modal>
);
