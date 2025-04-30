export interface Problem {
  id: string;
  title: string;
  difficulty: string;
  topic: string;
  url: string;
  companies?: string[];
  notes?: string;
}

export interface Sheet {
  title: string;
  totalProblems: number;
  problems: Problem[];
}