import { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

import { MLSPinMainPanelSection } from './main-panel-section';

export interface MainPanelProps {
  className?: string;
  children?: ReactNode;
  title?: string;
}

const MainPanel = ({ title, children, className }: MainPanelProps) => (
  <Box className={`dano-main-panel ${className}`}>
    <MLSPinMainPanelSection className={`${className}-section`}>
      <Typography className="dano-title" variant="h3" component="div">
        {title}
      </Typography>
    </MLSPinMainPanelSection>

    {children}
  </Box>
);

MainPanel.Section = MLSPinMainPanelSection;

export { MainPanel };
