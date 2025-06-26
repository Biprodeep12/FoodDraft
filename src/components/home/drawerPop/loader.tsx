export const Loader = () => {
    return(
    <div className="flex-1 overflow-y-auto p-6 animate-pulse">
      <div className="grid gap-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
          <div className="flex-shrink-0 overflow-hidden rounded-xl bg-gray-200 p-4 shadow-md">
            <div className="aspect-square h-[300px] w-[300px] bg-gray-300 rounded-lg" />
          </div>
          <div className="flex flex-col items-center text-center md:items-start md:text-left w-full">
            <div className="h-10 bg-gray-300 rounded w-3/4 max-w-md mb-2" />
            <div className="h-6 bg-gray-200 rounded w-1/2 max-w-xs" />

            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 md:justify-start w-full">
              <div className="flex flex-col items-center gap-2">
                <div className="h-6 bg-gray-200 rounded w-24" />
                <div className="h-12 bg-gray-300 rounded-lg w-24" />
                <div className="h-4 w-4 bg-gray-200 rounded-full" />
              </div>
              <div className="hidden h-20 w-px bg-gray-200 md:block" />
              <div className="flex flex-col items-center gap-2">
                <div className="h-6 bg-gray-200 rounded w-24" />
                <div className="h-12 bg-gray-300 rounded-lg w-24" />
                <div className="h-4 w-4 bg-gray-200 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-5" />
          <div className="grid gap-4 md:grid-cols-2 mt-5">
            <div className="bg-gray-50 rounded-md shadow-sm p-3">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-3" />
              <div className="grid gap-2 mt-3">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-full" />
              </div>
            </div>
            <div className="bg-gray-50 rounded-md shadow-sm p-3">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-3" />
              <div className="grid gap-2 mt-3">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="h-8 bg-gray-200 rounded w-2/3 mb-4" />
          <div className="grid gap-4 md:grid-cols-2 bg-gray-50 rounded-md shadow-sm p-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex flex-row justify-between">
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-4 bg-gray-200 rounded w-1/4" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="h-24 bg-gray-200 rounded w-full" />
        </div>
      </div>
    </div>
    )
}