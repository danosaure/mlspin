import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import RecoilizeDebugger from 'recoilize';

import { MLSPinApp } from './components';
import { StrictMode } from 'react';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <StrictMode>
    <RecoilRoot>
      <RecoilizeDebugger />
      <MLSPinApp />
    </RecoilRoot>
  </StrictMode>
);
