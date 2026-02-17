
export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  acceptance: string;
  category: string;
  description?: string;
  examples?: Array<{ input: string; output: string; explanation?: string }>;
  constraints?: string[];
}

export interface Contest {
  id: string;
  name: string;
  startTime: string;
  duration: string;
  participants: number;
}
