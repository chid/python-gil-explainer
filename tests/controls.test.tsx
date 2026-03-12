import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { SimulationControls } from '../src/components/SimulationControls';
import type { SimulationParams } from '../src/types/simulation';

describe('SimulationControls', () => {
  it('emits updated params when model changes', async () => {
    const user = userEvent.setup();
    const initial: SimulationParams = {
      model: 'gil',
      threadCount: 4,
      ticks: 20,
      workload: 'cpu_bound',
      contention: 'medium',
      switchInterval: 3
    };

    const onChange = vi.fn();

    render(<SimulationControls value={initial} onChange={onChange} />);

    await user.selectOptions(screen.getByLabelText(/model/i), 'py313t');

    expect(onChange).toHaveBeenCalled();
    const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1]?.[0] as SimulationParams;
    expect(lastCall.model).toBe('py313t');
  });
});
