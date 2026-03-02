
export interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  acceptance: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string
  }>;
  constraints?: string[];
  followUp: string;
  testCases: Array<{
    input: string;
    output: string;
    explanation?: string
  }>;
  companies: Array<string>;
  topic: Array<string>
}

export interface ProblemSets {
  _id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  companies: {
    name: string;
    _id: string;
  };
  topic: {
    name: string;
    _id: string;
  }
  category: string;
}

export interface Contest {
  id: string;
  name: string;
  startTime: string;
  duration: string;
  participants: number;
}
