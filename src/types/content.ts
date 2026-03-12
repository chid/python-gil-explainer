export type RuntimeModel = 'gil' | 'py313t';

export interface EventFrame {
  tick: number;
  ownerThreadId: string | null;
  runningThreadIds: string[];
  waitingThreadIds: string[];
  note: string;
}

export interface Scenario {
  id: string;
  title: string;
  summary: string;
  threadCount: number;
  workload: 'cpu_bound' | 'io_bound' | 'mixed';
  contention: 'low' | 'medium' | 'high';
  defaultTicks: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  scenarios: string[];
}

export interface QuizItem {
  id: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface ScenarioPack {
  id: string;
  version: string;
  title: string;
  lessons: Lesson[];
  scenarios: Scenario[];
  quizzes: Record<string, QuizItem[]>;
}
