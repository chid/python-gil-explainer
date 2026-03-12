import type { QuizItem } from './content';

export interface QuizProvider {
  getQuizItems(lessonId: string): QuizItem[];
}
