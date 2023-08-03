import esra from '../assets/images/esra.jpeg';
import classNames from 'classnames';

const CandidateResult = ({ candidateName, voteCount, won }) => {
  return (
    <div className={classNames('candidateRes p-2', { 'bg-success': won })}>
      <div className="candidateRes-info">
        <img src={esra} alt="candidate2" className="candidateRes-img" />
        <div className="candidateRes-name">{candidateName}</div>
      </div>
      <div className="candidateRes-votes">{voteCount}</div>
    </div>
  );
};

export default CandidateResult;
