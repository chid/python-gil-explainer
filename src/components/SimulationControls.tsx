import type { Scenario } from '../types/content';
import type { SimulationParams } from '../types/simulation';

interface SimulationControlsProps {
  value: SimulationParams;
  onChange: (value: SimulationParams) => void;
}

export function SimulationControls({ value, onChange }: SimulationControlsProps): JSX.Element {
  const update = <K extends keyof SimulationParams>(key: K, next: SimulationParams[K]): void => {
    onChange({ ...value, [key]: next });
  };

  return (
    <div className="control-grid">
      <label>
        Model
        <select value={value.model} onChange={(event) => update('model', event.target.value as SimulationParams['model'])}>
          <option value="gil">CPython GIL</option>
          <option value="py313t">Python 3.13t</option>
        </select>
      </label>

      <label>
        Threads
        <input
          type="range"
          min={2}
          max={12}
          value={value.threadCount}
          onChange={(event) => update('threadCount', Number(event.target.value))}
        />
        <span>{value.threadCount}</span>
      </label>

      <label>
        Workload
        <select value={value.workload} onChange={(event) => update('workload', event.target.value as Scenario['workload'])}>
          <option value="cpu_bound">CPU Bound</option>
          <option value="mixed">Mixed</option>
          <option value="io_bound">I/O Bound</option>
        </select>
      </label>

      <label>
        Contention
        <select value={value.contention} onChange={(event) => update('contention', event.target.value as Scenario['contention'])}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>

      <label>
        Switch Interval
        <input
          type="range"
          min={1}
          max={8}
          value={value.switchInterval}
          onChange={(event) => update('switchInterval', Number(event.target.value))}
        />
        <span>{value.switchInterval} ticks</span>
      </label>

      <label>
        Timeline Ticks
        <input
          type="range"
          min={8}
          max={60}
          step={2}
          value={value.ticks}
          onChange={(event) => update('ticks', Number(event.target.value))}
        />
        <span>{value.ticks}</span>
      </label>
    </div>
  );
}
