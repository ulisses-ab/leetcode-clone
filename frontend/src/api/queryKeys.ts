export const queryKeys = {
  me: ['me'],
  userSubmissions: (userId: string) => ['user-submissions', userId],

  problems: ['problems'],
  problemStatus: (problemId: string) => ['problem-status', problemId],
  problemSubmissions: (problemId: string) => ['problem-submissions', problemId],

  leaderboard: ['leaderboard'],
  userRank: (userId: string) => ['user-rank', userId],
};
