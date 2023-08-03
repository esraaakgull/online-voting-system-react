import esra from '../assets/images/esra.jpeg';
import classNames from 'classnames';

const ApplicationStatus = () => {
  const approved = false;
  return (
    <div className="main-content">
      <h1 className="announcement">Candidate Application</h1>
      <div className="candidate">
        <div className="candidate-info">
          <img src={esra} alt="candidate" className="candidate-img" />
          <div className="candidate-name">Esra Akgül</div>
        </div>
        <div>
          <button
            className={classNames('p-2 rounded', {
              'btn-danger': approved,
              'btn-light': !approved
            })}
            disabled={!approved}>
            {approved ? 'Cancel Candidancy' : 'Under Review'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatus;
