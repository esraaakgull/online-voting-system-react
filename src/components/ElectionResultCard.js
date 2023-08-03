import { useEffect, useState } from 'react';
import CandidateResult from './CandidateResult';

const ElectionResultCard = ({ dept }) => {
  const [candidates, setCandidates] = useState({});
  useEffect(() => {
    setCandidates(dept.result);
  }, []);

  return (
    <div className="w-full px-3 mb-6 md:mb-5">
      <div className="bg-white rounded-lg shadow-md overflow-hidden p-2">
        <div>
          <div className="font-bold text-xl mb-2">{dept.deptName}</div>
          {Object.keys(candidates).map((candidate, index) => {
            return (
              <CandidateResult
                won={index === 0}
                key={index}
                candidateName={candidate}
                voteCount={candidates[candidate]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ElectionResultCard;
