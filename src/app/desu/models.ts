export interface Demon {
  name: string;
  race: string;
  lvl: number;
  stats: number[];
  resists: string[];
  command: { [skill: string]: number; };
  passive: { [skill: string]: number; };
  fusion: string;
  unique: boolean;
}

export interface Skill {
  name: string;
  element: string;
  cost: number;
  rank: number;
  effect: string;
  requires: string;
  learnedBy: { demon: string, level: number }[];
  newoc?: boolean;
  level: number;
}