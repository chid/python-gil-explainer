import { useMemo, useState } from 'react';
import { SectionCard } from '../../components/SectionCard';
import { scenarioPack } from '../../content';
import { quizProvider } from '../../core/quizProvider';

export function QuizPage(): JSX.Element {
  const lessonOptions = scenarioPack.lessons;
  const [lessonId, setLessonId] = useState(lessonOptions[0]?.id ?? '');
  const [selected, setSelected] = useState<Record<string, number>>({});

  const quizItems = useMemo(() => quizProvider.getQuizItems(lessonId), [lessonId]);

  const score = quizItems.reduce((total, item) => {
    if (selected[item.id] === item.answerIndex) {
      return total + 1;
    }
    return total;
  }, 0);

  return (
    <div className="page-grid">
      <SectionCard title="Knowledge Check" subtitle="Answer short questions to validate your runtime model understanding.">
        <label className="scenario-picker">
          Lesson
          <select
            value={lessonId}
            onChange={(event) => {
              setLessonId(event.target.value);
              setSelected({});
            }}
          >
            {lessonOptions.map((lesson) => (
              <option key={lesson.id} value={lesson.id}>
                {lesson.title}
              </option>
            ))}
          </select>
        </label>

        <p>
          Score: {score}/{quizItems.length}
        </p>

        <div className="quiz-grid">
          {quizItems.map((item) => (
            <article key={item.id} className="quiz-item">
              <h3>{item.prompt}</h3>
              <div>
                {item.options.map((option, index) => (
                  <label key={option} className="quiz-option">
                    <input
                      type="radio"
                      name={item.id}
                      checked={selected[item.id] === index}
                      onChange={() => setSelected((previous) => ({ ...previous, [item.id]: index }))}
                    />
                    {option}
                  </label>
                ))}
              </div>
              {selected[item.id] !== undefined ? <p>{item.explanation}</p> : null}
            </article>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
