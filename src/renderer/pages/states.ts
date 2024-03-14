import { atom } from 'recoil';
import { TableRowData } from 'tdesign-react';

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
    roll: 1,
    scene: 1,
    shot: 1,
    times: 1,
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
