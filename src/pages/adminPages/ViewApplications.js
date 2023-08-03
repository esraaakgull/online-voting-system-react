import Header from '../../layouts/Header';
import ReviewApplication from '../../components/ReviewApplication';
import { useEffect, useState } from 'react';
import { getApplications } from '../../helpers/api';

const ViewApplications = () => {

  const [data, setData] = useState([]);

  const getApps = () => {
    const result = getApplications();
    return result;
  };

  const handleApprove= () => {
    //  user.id
    /* const res = approveApplication(7);
    res.then( (response) => {
     console.log(response)
    }).catch( (err) => {
     console.log(err)
    })
    console.log(res.httpStatus);
    return;
    */
    console.log("Tıklandı button")
    return false
  }
  
  useEffect(() => {
    getApps()
      .then((result) => {
        setData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex-grow flex flex-col justify-center pb-3">
      <Header />
      <div className="flex-grow flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold p-2">Applicants</h1>
        <form className="flex flex-col">
          <div className="flex flex-wrap -mx-3 mb-4">
            {data && data.map((applicant, index) =>
               <ReviewApplication key={`applicant${index}`} user={applicant} />
            )}
          </div>
        </form>
      </div>
    </div>
  );
} ;

export default ViewApplications;
