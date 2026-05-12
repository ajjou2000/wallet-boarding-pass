type ToastProps = {
  message: string
}

export default function Toast({ message }: ToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-24 left-1/2 z-50 max-w-[calc(100%-2rem)] -translate-x-1/2 rounded-full bg-black/85 px-4 py-2 text-sm font-medium text-white shadow-lg"
    >
      {message}
    </div>
  )
}
