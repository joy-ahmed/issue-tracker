import dynamic from "next/dynamic";
import FormLoadingSkeliton from "./loading";
const IssueForm = dynamic(() => import("../_components/IssueForm"), { ssr: false,
  loading: () => <FormLoadingSkeliton />
 });

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
