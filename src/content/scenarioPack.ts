import type { ScenarioPack } from '../types/content';

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export function validateScenarioPack(pack: ScenarioPack): void {
  if (!isNonEmptyString(pack.id)) {
    throw new Error('Scenario pack id is required.');
  }

  if (!Array.isArray(pack.scenarios) || pack.scenarios.length === 0) {
    throw new Error('Scenario pack must contain at least one scenario.');
  }

  const scenarioIds = new Set<string>();
  for (const scenario of pack.scenarios) {
    if (!isNonEmptyString(scenario.id)) {
      throw new Error('Scenario id is required.');
    }
    if (scenarioIds.has(scenario.id)) {
      throw new Error(`Duplicate scenario id: ${scenario.id}`);
    }
    scenarioIds.add(scenario.id);
  }

  for (const lesson of pack.lessons) {
    for (const scenarioId of lesson.scenarios) {
      if (!scenarioIds.has(scenarioId)) {
        throw new Error(`Lesson ${lesson.id} references unknown scenario ${scenarioId}`);
      }
    }

    if (lesson.references) {
      for (const reference of lesson.references) {
        if (!isNonEmptyString(reference.label) || !isNonEmptyString(reference.url)) {
          throw new Error(`Lesson ${lesson.id} has an invalid reference entry`);
        }
      }
    }
  }
}

export function loadScenarioPack(pack: ScenarioPack): ScenarioPack {
  validateScenarioPack(pack);
  return pack;
}
