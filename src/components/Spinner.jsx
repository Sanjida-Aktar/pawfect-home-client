export default function Spinner({ full = false }) {
  const wrapper = full ? 'min-h-screen' : 'min-h-[40vh]';
  return (
    <div className={`${wrapper} flex flex-col items-center justify-center gap-3`}>
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <p className="text-sm opacity-70">Loading, please wait...</p>
    </div>
  );
}
