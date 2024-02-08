import classnames from 'classnames';
import { ReactNode } from 'react';
import { Box, Modal, Typography } from '@mui/material';
import { displayName } from '../../utils';
import namespace from './namespace';

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

const MLSPinModal = ({ className, open, title, onClose, wide, tall, big, children }: MLSPinModalProps) => {
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

MLSPinModal.displayName = displayName(namespace('MLSPinModal'));

export { MLSPinModal };
