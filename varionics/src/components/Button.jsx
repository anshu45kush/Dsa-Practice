export default function Button({ children, variant = 'primary', onClick, disabled, className = '', type = 'button', fullWidth = false }) {
  const base = `inline-flex items-center justify-center gap-2 rounded-2xl font-semibold text-sm transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed px-5 py-3.5 ${fullWidth ? 'w-full' : ''} ${className}`

  const variants = {
    primary: 'bg-[#6C63FF] text-white shadow-[0_4px_14px_rgba(108,99,255,0.4)] hover:bg-[#5a52d5] active:bg-[#4B44CC]',
    secondary: 'bg-[#EEF0FF] text-[#6C63FF] hover:bg-[#dde0ff]',
    outline: 'border-2 border-[#6C63FF] text-[#6C63FF] bg-white hover:bg-[#EEF0FF]',
    danger: 'bg-red-500 text-white shadow-[0_4px_14px_rgba(239,68,68,0.35)] hover:bg-red-600',
    ghost: 'text-gray-600 hover:bg-gray-100',
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]}`}>
      {children}
    </button>
  )
}
