export default function Loading() {
  return (
    <div className="container mx-auto py-20 text-center">
      <div className="animate-pulse space-y-8">
        <div className="h-10 w-48 bg-gray-200 rounded mx-auto" />
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-gray-100 rounded" />
          ))}
        </div>
        <div className="h-64 bg-gray-50 rounded" />
      </div>
    </div>
  );
}
