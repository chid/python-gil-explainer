import { scenarioPack } from '../content';
import type { QuizProvider } from '../types/assessment';
import type { QuizItem } from '../types/content';

class LocalQuizProvider implements QuizProvider {
  getQuizItems(lessonId: string): QuizItem[] {
    return scenarioPack.quizzes[lessonId] ?? [];
  }
}

export const quizProvider: QuizProvider = new LocalQuizProvider();
