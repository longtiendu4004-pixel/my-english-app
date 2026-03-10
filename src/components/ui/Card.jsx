export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-[2rem] shadow-sm border border-slate-100 p-6 md:p-8 ${className}`}>
      {children}
    </div>
  );
}