export interface UserScore {
  scholarshipId: string;
  scores: Score[];
}

export interface Score {
  user_id: string;
  score: number;
}
