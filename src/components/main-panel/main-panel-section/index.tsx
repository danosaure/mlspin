import { Box } from '@mui/material';
import classnames from 'classnames';
import { ReactNode } from 'react';

export interface MainPanelSectionProps {
  className?: string;
  children?: ReactNode;
}

const MLSPinMainPanelSection = ({ children, className }: MainPanelSectionProps) => {
  const classNames = classnames('dano-main-panel-section', {
    [className || '']: Boolean(className),
  });

  return (
    <Box className={classNames} component="section">
      {children}
    </Box>
  );
};

MLSPinMainPanelSection.displayName = 'MLSPinMainPanelSection';

export { MLSPinMainPanelSection };
