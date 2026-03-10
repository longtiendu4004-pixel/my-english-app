export default function Input({ label, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-bold text-slate-500 uppercase tracking-wide">{label}</label>}
      <input
        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-700 font-medium"
        {...props}
      />
    </div>
  );
}