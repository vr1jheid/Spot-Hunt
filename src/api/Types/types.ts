export interface ServerResponse<T> {
  status: string;
  code: number;
  data: T;
}

export interface VoteInfo {
  vote: number;
  parkPointId: number;
}

export interface UserSettings {
  minimumVotes: number;
}

export enum VoteCode {
  Error = -1,
  Positive = 1,
  Negative = 2,
  Neutral = 3,
}
