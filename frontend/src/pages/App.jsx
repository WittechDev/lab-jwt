function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-9xl font-bold">Welcome to Lab JWT!</h1>
      <div className="flex items-center justify-center p-4">
        <a href="/login">login</a>
        {"/"}
        <a href="/register">register</a>
        {"/"}
        <a href="/protected">protected</a>
      </div>
    </div>
  );
}

export default App;
