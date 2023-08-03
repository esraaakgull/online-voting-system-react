import Header from '../../layouts/Header';
import { applicants } from '../../constants/applicants';
import ApplicantViewCard from '../../components/ApplicantViewCard';

const VotingViewOnly = () => {
  return (
    <div className="flex-grow flex flex-col justify-center pb-3 vh-100">
      <Header />
      <div className="flex-grow flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold p-2">Applicants</h1>
        <form className="flex flex-col">
          <div className="flex flex-wrap -mx-3 mb-4">
            {Object.keys(applicants).map((applicant, index) => {
              return <ApplicantViewCard key={`Applicant${index}`} user={applicants[applicant]} />;
            })}
          </div>
        </form>
      </div>
    </div>
  );
};
export default VotingViewOnly;
