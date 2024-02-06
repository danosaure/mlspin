import { createRoot } from 'react-dom/client';

import { MLSPinApp } from './components';

const container = document.getElementById('react-app-placeholder');
const root = createRoot(container!);
root.render(<MLSPinApp />);
