import { loadScenarioPack } from './scenarioPack';
import type { ScenarioPack } from '../types/content';

const pack: ScenarioPack = {
  id: 'core-pack',
  version: '1.0.0',
  title: 'Python Runtime Concurrency Core Pack',
  lessons: [
    {
      id: 'gil-basics',
      title: 'How the GIL Coordinates Threads',
      description: 'One thread executes Python bytecode at a time in a process-wide lock model.',
      scenarios: ['cpu-four-threads', 'mixed-six-threads']
    },
    {
      id: 'py313t-basics',
      title: 'How Python 3.13t Changes the Model',
      description: 'Free-threading allows multiple threads to execute Python code in parallel.',
      scenarios: ['cpu-four-threads', 'io-eight-threads']
    }
  ],
  scenarios: [
    {
      id: 'cpu-four-threads',
      title: 'CPU-Bound Hot Loop',
      summary: 'Four CPU-bound threads contend for execution.',
      threadCount: 4,
      workload: 'cpu_bound',
      contention: 'high',
      defaultTicks: 24
    },
    {
      id: 'mixed-six-threads',
      title: 'Mixed API and Compute Work',
      summary: 'Threads alternate compute bursts and I/O waits.',
      threadCount: 6,
      workload: 'mixed',
      contention: 'medium',
      defaultTicks: 30
    },
    {
      id: 'io-eight-threads',
      title: 'I/O-Heavy Workers',
      summary: 'Mostly waiting on network/file operations.',
      threadCount: 8,
      workload: 'io_bound',
      contention: 'low',
      defaultTicks: 28
    }
  ],
  quizzes: {
    'gil-basics': [
      {
        id: 'gil-q1',
        prompt: 'In the classic GIL model, what is true for Python bytecode execution in one process?',
        options: [
          'Only one thread executes Python bytecode at a time.',
          'All threads execute Python bytecode simultaneously.',
          'No thread switching happens during CPU work.'
        ],
        answerIndex: 0,
        explanation: 'The GIL serializes bytecode execution per process, though switches still occur.'
      }
    ],
    'py313t-basics': [
      {
        id: '313t-q1',
        prompt: 'What is the main concurrency shift in Python 3.13t compared with the GIL baseline?',
        options: [
          'Multiple threads can run Python code in parallel.',
          'Threading is removed in favor of processes only.',
          'The scheduler no longer performs context switches.'
        ],
        answerIndex: 0,
        explanation: '3.13t aims for free-threaded execution without a process-wide GIL.'
      }
    ]
  }
};

export const defaultScenarioPack = loadScenarioPack(pack);
