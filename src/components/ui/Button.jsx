export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseStyle = "font-bold rounded-xl px-5 py-3 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 ";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200",
    secondary: "bg-slate-800 text-slate-700 border border-slate-200 hover:border-indigo-300 shadow-md shadow-emerald-200",
    danger: "bg-red-900/80 text-white hover:bg-rose-100",
    success: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-md shadow-emerald-200"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className} cursor-pointer` } {...props}>
      {children}
    </button>
  );
}