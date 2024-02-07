import { createRoot } from 'react-dom/client';

import { MLSPinApp } from './components';
import { RecoilRoot } from 'recoil';

const container = document.getElementById('react-app-placeholder');
const root = createRoot(container!);
root.render(
  <RecoilRoot>
    <MLSPinApp />
  </RecoilRoot>
);
