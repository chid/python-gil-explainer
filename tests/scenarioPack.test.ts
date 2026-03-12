import { describe, expect, it } from 'vitest';
import { loadScenarioPack } from '../src/content/scenarioPack';
import { defaultScenarioPack } from '../src/content/defaultPack';

describe('scenario pack loader', () => {
  it('loads default scenario pack', () => {
    expect(defaultScenarioPack.scenarios.length).toBeGreaterThan(0);
    const gilLesson = defaultScenarioPack.lessons.find((item) => item.id === 'gil-basics');
    const py313tLesson = defaultScenarioPack.lessons.find((item) => item.id === 'py313t-basics');
    expect(gilLesson?.references?.length ?? 0).toBeGreaterThanOrEqual(3);
    expect(py313tLesson?.references?.length ?? 0).toBeGreaterThanOrEqual(3);
  });

  it('rejects lesson references to unknown scenarios', () => {
    expect(() =>
      loadScenarioPack({
        id: 'broken',
        version: '1.0.0',
        title: 'Broken',
        scenarios: [
          {
            id: 'known',
            title: 'Known',
            summary: 'Known',
            threadCount: 2,
            workload: 'cpu_bound',
            contention: 'low',
            defaultTicks: 10
          }
        ],
        lessons: [
          {
            id: 'lesson',
            title: 'Lesson',
            description: 'desc',
            scenarios: ['missing']
          }
        ],
        quizzes: {}
      })
    ).toThrowError(/unknown scenario/i);
  });
});
