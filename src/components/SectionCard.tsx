import { type PropsWithChildren } from 'react';

interface SectionCardProps extends PropsWithChildren {
  title: string;
  subtitle?: string;
}

export function SectionCard({ title, subtitle, children }: SectionCardProps): JSX.Element {
  return (
    <section className="section-card">
      <header className="section-head">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
      </header>
      {children}
    </section>
  );
}
