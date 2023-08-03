import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import photo from '../assets/images/profilePhoto.png';

const ApplicantCard = ({ applicant, setSelectedApplicant, selected, isVoted }) => {
  console.log(selected,isVoted)

  return (
    <label className="w-full md:w-1/3 lg:w-1/4 px-3 mb-6 md:mb-0">
      <div className="bg-white border border-dark rounded-lg shadow-md overflow-hidden m-1">
        <img src={photo} alt="Applicant 1" className="w-full object-contain h-48" />
        <div className="p-4">
          <div className="font-bold text-xl mb-2">{`${applicant.name}  ${applicant.surname}`}</div>
          <p className="text-gray-700 text-base">{`${applicant.departmentName} ${applicant.grade}.sınıf`} </p>
        </div>
        <div className="px-4 py-3 bg-red-100">
          <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="applicant"
                value={applicant.candidateId}
                selected={selected}
                disabled={isVoted}
                onChange={(e) => setSelectedApplicant(e.target.value)}
              />
            <span className="ml-2">{`Select ${applicant.name}`}</span>
          </label>
        </div>
      </div>
    </label>
  );
};

export default ApplicantCard;
