import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { GilPage } from '../src/features/gil/GilPage';
import { Py313TPage } from '../src/features/py313t/Py313TPage';

describe('lesson pages', () => {
  it('renders technical background and references on GIL page', () => {
    render(<GilPage />);

    expect(screen.getAllByRole('heading', { name: /technical background/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('heading', { name: /references/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole('link', { name: /python threading docs/i })).toHaveAttribute(
      'href',
      'https://docs.python.org/3/library/threading.html'
    );
  });

  it('renders technical background and references on 3.13t page', () => {
    render(<Py313TPage />);

    expect(screen.getAllByRole('heading', { name: /technical background/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('heading', { name: /references/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole('link', { name: /python free-threading howto/i })).toHaveAttribute(
      'href',
      'https://docs.python.org/3/howto/free-threading-python.html'
    );
  });
});
