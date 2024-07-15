import { atomFamily } from 'recoil';

export const countersState = atomFamily<number, string>({
  key: 'counters',
  default: -1,
});
