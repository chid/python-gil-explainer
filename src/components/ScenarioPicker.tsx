import type { Scenario } from '../types/content';

interface ScenarioPickerProps {
  scenarios: Scenario[];
  selectedId: string;
  onSelect: (scenarioId: string) => void;
}

export function ScenarioPicker({ scenarios, selectedId, onSelect }: ScenarioPickerProps): JSX.Element {
  return (
    <label className="scenario-picker">
      Scenario
      <select value={selectedId} onChange={(event) => onSelect(event.target.value)}>
        {scenarios.map((scenario) => (
          <option key={scenario.id} value={scenario.id}>
            {scenario.title}
          </option>
        ))}
      </select>
    </label>
  );
}
