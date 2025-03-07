const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-black">
      <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
