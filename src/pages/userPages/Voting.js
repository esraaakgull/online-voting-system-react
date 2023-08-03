import classNames from 'classnames';
import ApplicantCard from '../../components/ApplicantCard';
import Header from '../../layouts/Header';
import { useContext, useEffect, useState } from 'react';
import { showErrorNotification, showSuccessNotification } from '../../helpers/toasts';
import UserContext from '../../contexts/UserContext';
import { gettAllApplicants, submitVoting } from '../../helpers/api';

const Voting = () => {
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const userContext = useContext(UserContext);
  const [allApplicants, setAllApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // userId isVoted checkIfUserVoted votedFor   *** userContextte tutulacak

  const [isVoted, setIsVoted] = useState(false);
  const [votedFor, setVotedFor] = useState('');

  const getApplicants = async () => {
    const res = await gettAllApplicants(userContext.user.userId);
    const resElectionDate =
    setAllApplicants(res.data);
  };

  const handleClick = async () => {
    setIsLoading(true);
    if (!selectedApplicant) {
      showErrorNotification('You should select a candidate.');
      setIsLoading(false);
      return;
    }
    //userContext.setIsVoted(true);
    //userContext.setVotedFor(selectedApplicant);
    const res = await submitVoting(userContext.user.userId, selectedApplicant);
    setIsLoading(false);
    if (res.status === 200) {
      showSuccessNotification('Teşekkürler. Oyunuzu başarıyla kullandınız!');
    } else {
      showErrorNotification('Üzgünüm! Daha önce oy kullandın.');
    }
  };

  useEffect(() => {
    getApplicants();
    if (isVoted) setSelectedApplicant(votedFor);
  }, []);

  return (
    <div
      className={classNames('flex-grow flex flex-col justify-center pb-3', {
        'vh-100': !allApplicants
       })}>
      <Header />
      <div className="flex-grow flex flex-col justify-center">
        <div className="d-flex justify-content-center p-2">
          <p
            className={classNames('h4 font-weight-bold p-2', {
              'text-success': userContext.isVoted,
              'text-danger': !userContext.isVoted
            })}>
            {userContext.isVoted
              ? 'Thank you! You have voted for this election.'
              : 'Please select one candidate for election.'}
          </p>
        </div>
        <div className="d-flex justify-content-center p-2">
          <h1 className="text-3xl font-bold p-2">Applicants</h1>
        </div>
        <form className="flex flex-col">
          <div className="flex flex-wrap -mx-3 mb-4 d-flex justify-content-center">
            {allApplicants?.map((applicant, index) => {
              return (
                <ApplicantCard
                  key={`Applicant${index}`}
                  applicant={applicant}
                  setSelectedApplicant={setSelectedApplicant}
                  selected={votedFor === selectedApplicant}
                  isVoted={isVoted}
                />
              );
            })}
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              className={classNames('bg-red-700 text-white font-bold py-2 px-4 rounded-full', {
                'bg-red-400': isLoading || isVoted,
                'hover:bg-red-600': !isLoading || !isVoted
              })}
              onClick={handleClick}
              disabled={isLoading}>
              Submit Selection
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Voting;
