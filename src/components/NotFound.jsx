function NotFound() {
  return (
    <div className="mb-6 mt-32 text-center">
      <div className="mb-11 text-6xl sm:text-7xl">😕</div>
      <h2 className="mb-6 font-bold sm:text-xl ">No Definitions Found</h2>
      <p className="text-neutral-500 sm:text-lg">
        Sorry pal, we couldn't find definitions for the word you were looking
        for. You can try the search again at later time or head to the web
        instead.
      </p>
    </div>
  );
}

export default NotFound;
