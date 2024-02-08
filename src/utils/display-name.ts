import { SEP } from '../namespace';

export const displayName = (namespace: string): string => {
  const fragments = namespace.split(SEP);
  const componentsIndex = fragments.indexOf('components');
  if (componentsIndex === -1) {
    return namespace;
  }

  return fragments.slice(componentsIndex + 1).join('.');
};
