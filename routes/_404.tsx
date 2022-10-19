import Layout from "../components/Layout.tsx";

const NotFoundPage = () => {
  return (
    <Layout>
      <h1 className="text-red-600 dark:text-orange-400 text-3xl">
        404: Page not found
      </h1>
      <p>
        Looks like you've hit a bad route. This website is a work in progress,
        so it's likely you've simply clicked a link to something that hasn't
        been implemented yet. (sorry!)
      </p>
    </Layout>
  );
};
export default NotFoundPage;
