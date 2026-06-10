import { Loader2 } from 'lucide-react';
import clsx from 'clsx';

export function Button({ children, variant = 'primary', loading, disabled, onClick, className, style }) {
  return (
    <button
      className={clsx('btn', `btn--${variant}`, className)}
      disabled={disabled || loading}
      onClick={onClick}
      style={style}
    >
      {loading && <Loader2 size={14} className="btn-spinner" />}
      {children}
    </button>
  );
}
