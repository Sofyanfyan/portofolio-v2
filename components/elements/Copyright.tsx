export default function Copyright({ isHover }: { isHover: boolean }) {
  return (
    <div className="flex items-center gap-1 px-3 py-1 font-sora text-sm text-neutral-600 dark:text-neutral-400 3xl:text-lg">
      {isHover ? (
        <>
          <span>©</span>
          <span>{new Date().getFullYear()}</span>
          <span>with</span>
          <span data-testid="love" className="animate-pulse text-red-500">
            ❤
          </span>
          <span>by</span>
          <span className="cursor-pointer hover:dark:text-neutral-400">codesofyan</span>
        </>
      ) : (
        <span data-testid="love" className="animate-pulse text-red-500">
          ❤
        </span>
      )}
    </div>
  )
}
