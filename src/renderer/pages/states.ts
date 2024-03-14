import { atom } from 'recoil';

//场记板部分
export const cbStart = atom({
  key: 'cbStart',
  default: false,
});

export type cbInfo = 'roll' | 'scene' | 'shot' | 'times';
export const cbInfoState = atom<{
  roll: number;
  scene: number;
  shot: number;
  times: number;
}>({
  key: 'cbInfoState',
  default: {
    roll: 0,
    scene: 0,
    shot: 0,
    times: 0,
  },
  dangerouslyAllowMutability: true,
});

export const startTimeState = atom<number>({
  key: 'startTime',
  default: 0,
});

export const cbDataSourceState = atom({
  key: 'cbDataSource',
  default: [],
});
