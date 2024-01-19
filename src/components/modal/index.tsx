import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import classnames from 'classnames';

export type MLSPinModalProps = {
  open: boolean;
  className?: string;
  onClose?: () => void;
  title?: string;
  children?: ReactNode;
  wide?: boolean;
  tall?: boolean;
  big?: boolean;
};

export default ({ className, open, title, onClose, wide, tall, big, children }: MLSPinModalProps) => {
  const classNames = classnames('dano-modal-root', {
    'dano-modal-wide': big || wide,
    'dano-modal-tall': big || tall,
    [className || '']: className,
  });
  return (
    <Modal className={classNames} open={open} onClose={onClose}>
      <Box className={`dano-modal-container ${className}`} sx={{ bgcolor: 'background.paper' }}>
        <Typography className={`dano-modal-container-header ${className}`} variant="h6" component="div">
          {title}
        </Typography>
        <Box className={`dano-modal-container-body ${className}`}>{children}</Box>
      </Box>
    </Modal>
  );
};
