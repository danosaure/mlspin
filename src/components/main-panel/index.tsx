import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';

import MainPanelSection from './main-panel-section';

export interface MainPanelProps {
  className?: string;
  children?: ReactNode;
  title?: string;
}

const MainPanel = ({ title, children, className }: MainPanelProps) => (
  <Box className={`dano-main-panel ${className}`}>
    <MainPanelSection className={`${className}-section`}>
      <Typography className="dano-title" variant="h3" component="div">
        {title}
      </Typography>
    </MainPanelSection>

    {children}
  </Box>
);

MainPanel.Section = MainPanelSection;

export default MainPanel;
