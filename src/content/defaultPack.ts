import { loadScenarioPack } from './scenarioPack';
import type { ScenarioPack } from '../types/content';

const pack: ScenarioPack = {
  id: 'core-pack',
  version: '1.1.0',
  title: 'Python Runtime Concurrency Core Pack',
  lessons: [
    {
      id: 'gil-basics',
      title: 'How the GIL Coordinates Threads',
      description: 'One thread executes Python bytecode at a time in a process-wide lock model.',
      technicalBackground: [
        'The CPython Global Interpreter Lock (GIL) is a process-wide mutex that protects interpreter internals and many reference-counting operations.',
        'In CPU-bound threaded code, threads contend for bytecode execution because only one thread can run Python bytecode at a given moment.',
        'I/O-bound programs can still benefit from threads because blocking operations often release the GIL while waiting on external events.',
        'C extensions may release the GIL around long native work, so real behavior can differ from a pure-Python CPU-bound loop.'
      ],
      references: [
        {
          label: 'Python threading docs',
          url: 'https://docs.python.org/3/library/threading.html',
          note: 'Official threading behavior and GIL notes.'
        },
        {
          label: 'CPython C-API thread state and GIL',
          url: 'https://docs.python.org/3/c-api/init.html#thread-state-and-the-global-interpreter-lock',
          note: 'How C code attaches thread state and interacts with the GIL.'
        },
        {
          label: 'CPython FAQ: What is the GIL?',
          url: 'https://docs.python.org/3/faq/library.html#what-is-the-global-interpreter-lock-gil',
          note: 'Background, tradeoffs, and common questions.'
        },
        {
          label: 'PEP 703',
          url: 'https://peps.python.org/pep-0703/',
          note: 'Rationale and design for optional no-GIL/free-threading.'
        }
      ],
      scenarios: [
        'cpu-four-threads',
        'mixed-six-threads',
        'lock-heavy-object-mutation',
        'extension-heavy-compute'
      ]
    },
    {
      id: 'py313t-basics',
      title: 'How Python 3.13t Changes the Model',
      description: 'Free-threading allows multiple threads to execute Python code in parallel.',
      technicalBackground: [
        'Python 3.13 introduces an experimental free-threaded build variant that can run without the process-wide GIL.',
        'Without a global lock, multiple threads can execute Python code concurrently, but synchronization and atomicity concerns become more explicit.',
        'Free-threaded execution can improve parallel CPU throughput for some workloads, but it can also add overhead depending on object sharing patterns.',
        'Performance outcomes depend on contention, workload mix, and extension ecosystem readiness.'
      ],
      references: [
        {
          label: 'Python free-threading HOWTO',
          url: 'https://docs.python.org/3/howto/free-threading-python.html',
          note: 'Official usage guidance for free-threaded Python builds.'
        },
        {
          label: "What's New in Python 3.13",
          url: 'https://docs.python.org/3.13/whatsnew/3.13.html',
          note: 'Release context and changes in 3.13.'
        },
        {
          label: 'PEP 703',
          url: 'https://peps.python.org/pep-0703/',
          note: 'Technical motivation, constraints, and rollout details.'
        },
        {
          label: 'C-API extension support for free threading',
          url: 'https://docs.python.org/3/howto/free-threading-extensions.html',
          note: 'Extension compatibility and migration implications.'
        }
      ],
      scenarios: [
        'cpu-four-threads',
        'io-eight-threads',
        'mixed-burst-traffic',
        'many-short-lived-tasks',
        'high-contention-shared-state'
      ]
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
    },
    {
      id: 'lock-heavy-object-mutation',
      title: 'Lock-Heavy Object Mutation',
      summary: 'Workers frequently update shared objects and synchronize heavily.',
      threadCount: 6,
      workload: 'cpu_bound',
      contention: 'high',
      defaultTicks: 36
    },
    {
      id: 'extension-heavy-compute',
      title: 'Extension-Heavy Compute',
      summary: 'Compute spends significant time in extension paths with mixed lock behavior.',
      threadCount: 5,
      workload: 'mixed',
      contention: 'medium',
      defaultTicks: 32
    },
    {
      id: 'mixed-burst-traffic',
      title: 'Mixed Burst Traffic',
      summary: 'Short bursts of compute and I/O arrive in waves across workers.',
      threadCount: 9,
      workload: 'mixed',
      contention: 'medium',
      defaultTicks: 34
    },
    {
      id: 'many-short-lived-tasks',
      title: 'Many Short-Lived Tasks',
      summary: 'Frequent task turnover stresses scheduling and handoff behavior.',
      threadCount: 10,
      workload: 'io_bound',
      contention: 'low',
      defaultTicks: 26
    },
    {
      id: 'high-contention-shared-state',
      title: 'High-Contention Shared State',
      summary: 'Threads repeatedly compete to read/write shared in-memory state.',
      threadCount: 7,
      workload: 'cpu_bound',
      contention: 'high',
      defaultTicks: 38
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
      },
      {
        id: 'gil-q2',
        prompt: 'Misconception check: If a program uses multiple threads, does the GIL make threading useless?',
        options: [
          'No. Threading can still help I/O-bound workloads despite serialized bytecode execution.',
          'Yes. Threading can never improve throughput when a GIL exists.',
          'Yes. A GIL disables context switches during waiting operations.'
        ],
        answerIndex: 0,
        explanation:
          'The GIL mainly limits parallel Python bytecode execution; it does not remove value for I/O overlap.'
      },
      {
        id: 'gil-q3',
        prompt: 'Misconception check: Does one thread keep the GIL forever once acquired?',
        options: [
          'No. Threads can yield/switch, and ownership changes over time.',
          'Yes. The first thread permanently owns it.',
          'Only if thread count is greater than CPU count.'
        ],
        answerIndex: 0,
        explanation:
          'GIL ownership rotates; fairness and switching behavior determine which thread runs next.'
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
      },
      {
        id: '313t-q2',
        prompt: 'Misconception check: Does 3.13t guarantee every threaded program becomes faster?',
        options: [
          'No. Parallelism can improve some workloads, but overhead and contention can still limit gains.',
          'Yes. Removing the GIL always gives linear speedup.',
          'Yes. It removes all synchronization costs.'
        ],
        answerIndex: 0,
        explanation:
          'Free-threading enables parallel execution but does not eliminate coordination overhead or shared-state costs.'
      },
      {
        id: '313t-q3',
        prompt: 'Misconception check: In 3.13t, do locks and race-safety concerns disappear?',
        options: [
          'No. Explicit synchronization is still required for shared mutable state.',
          'Yes. Free-threading automatically prevents all data races.',
          'Only for I/O-bound threads.'
        ],
        answerIndex: 0,
        explanation:
          'Removing the process-wide GIL increases the need to reason carefully about thread safety for shared data.'
      }
    ]
  }
};

export const defaultScenarioPack = loadScenarioPack(pack);
