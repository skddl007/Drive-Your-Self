export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Problem {
  id: string;
  Title: string;
  Problem: string;
  'Practice Link': string;
  Difficulty: Difficulty;
  'Company Name': string;
  CompanyNames?: string[];
  Status?: string;
  Note?: string;
  Revision?: string;
}
