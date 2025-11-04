export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
      <h1 className="text-3xl font-bold text-red-500 mb-4">Access Denied</h1>
      <p className="text-gray-500">
        You are not authorized to access this page.
      </p>
    </div>
  );
}
