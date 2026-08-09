export function SectionHeading({ label, title, subtitle }) {
  return (
    <div className="mb-12 text-center">
      <span className="text-sm font-mono font-medium text-teal-600 dark:text-teal-400 uppercase tracking-widest mb-3 block">
        {label}
      </span>
      <h2 className="font-display text-4xl sm:text-5xl font-bold text-ink-900 dark:text-ink-50 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-ink-500 dark:text-ink-400 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}