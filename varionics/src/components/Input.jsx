export default function Input({ label, type = 'text', value, onChange, placeholder, required, className = '', icon, multiline, rows = 3 }) {
  const inputClass = `w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/20 transition-all ${icon ? 'pl-11' : ''} ${className}`

  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-semibold text-gray-700">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
        )}
        {multiline ? (
          <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows} required={required} className={inputClass} />
        ) : (
          <input type={type} value={value} onChange={onChange} placeholder={placeholder} required={required} className={inputClass} />
        )}
      </div>
    </div>
  )
}
