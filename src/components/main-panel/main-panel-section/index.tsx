import { ReactNode } from 'react';
import { Box } from '@mui/material';

export interface MainPanelSectionProps {
  className?: string;
  children?: ReactNode;
}

export default ({ children, className }: MainPanelSectionProps) => (
  <Box className={`dano-main-panel-section ${className}`} component="section">
    {children}
  </Box>
);
