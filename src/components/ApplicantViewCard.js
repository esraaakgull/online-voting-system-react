const ApplicantViewCard = ({ user }) => {
  return (
    <label className="w-full md:w-1/3 lg:w-1/4 px-3 mb-6 md:mb-0">
      <div className="bg-white border border-dark rounded-lg shadow-md overflow-hidden m-1">
        <img src={user.image} alt="Applicant 1" className="w-full object-contain h-48" />
        <div className="p-4">
          <div className="font-bold text-xl mb-2">{`${user.name}  ${user.surname}`}</div>
          <p className="text-gray-700 text-base">{`${user.department} ${user.degree}.sınıf`} </p>
        </div>
      </div>
    </label>
  );
};

export default ApplicantViewCard;
