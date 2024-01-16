import Box from '@mui/material/Box';
import { ReactNode } from 'react';

export interface MainPanelSectionProps {
  className?: string;
  children?: ReactNode;
}

export default ({ children, className }: MainPanelSectionProps) => (
  <Box className={`dano-main-panel-section ${className}`} component="section">
    {children}
  </Box>
);
