import LoadingSpinner from "~/app/Components/LoadingSpinner";

const ScoreLoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-64 dark:text-neutral-100">
      <LoadingSpinner />
    </div>
  );
};

export default ScoreLoadingPage;
