export default function FullPageLoader() {
  return (
    <div className="absolute w-full top-0 inset-x-0 h-full flex flex-col justify-center bg-black/60 z-10">
      <div className="animate-spin w-10 h-10 text-blue-500 rounded-full border-[4px] m-auto border-t-transparent border-current" />
    </div>
  );
}
