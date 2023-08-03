import { useEffect, useState } from 'react';
import Header from '../../layouts/Header';
import {
  getAllApplicationDates,
  getAllElectionDates,
  isActiveApplication, isActiveElection,
  setApplicationDates,
  setElectionDates
} from '../../helpers/api';
import { showErrorNotification, showSuccessNotification } from '../../helpers/toasts';
import classNames from "classnames";

const EnterSchedule = () => {

  const [electionStartDate,setElectionStartDate] = useState("");
  const [electionFinishDate,setElectionFinishDate] = useState("");
  const [applicationStartDate,setApplicationStartDate] = useState("");
  const [applicationFinishDate,setApplicationFinishDate] = useState("");
  const [isSetAlreadyDate,setIsSetAlreadyDate] = useState(false);
  const [applicationDate,setApplicationDate]= useState({});
  const [electionDate,setElectionDate] = useState({});

  const checkDates = () => {
    const applicationDatesVerification = new Date(applicationStartDate) < new Date(applicationFinishDate)
    const electionDatesVerification = new Date(electionStartDate)  < new Date(electionFinishDate)

    if (applicationDatesVerification && electionDatesVerification)
      return (new Date(applicationFinishDate) < new Date (electionStartDate))
    return false
  }

  const checkApplicationDate = async () => {
    const applicationResponse = await isActiveApplication();
    const electionResponse = await isActiveElection();
    if(applicationResponse.status === 200 || electionResponse.status === 200) {
      setIsSetAlreadyDate(true)
      const electionDateResp = getAllElectionDates();
      const applicationDateResp = getAllApplicationDates();
      const electionDate = await electionDateResp.then((resp) => {
        return resp;
      }).catch((error) => {
        return error;
      })
      const applicationDate = await applicationDateResp.then( (res) =>{
        return res;
      }).catch( (error) =>{
        return error;
      })
      if(electionDateResp.status === 200 && applicationDateResp.status === 200) {
        setApplicationDate(applicationDate.data[0]);
        setElectionDate(electionDate.data[0]);
      }


    }
  }

  useEffect( () => {
    checkApplicationDate();

  }, [])


  const handleDates = async () => {
    if (!checkDates()) {
      showErrorNotification("Girdiginiz Tarihler birbirleriyle tutarlı değildir!");
      return }
    const applicationResponse = await isActiveApplication();
    const electionResponse = await isActiveElection();
    if(applicationResponse.status === 200 || electionResponse.status === 200) {
      setIsSetAlreadyDate(true)
    }else {
      const electResponse= await setElectionDates(electionStartDate,electionFinishDate);
      const applicResponse = await setApplicationDates(applicationStartDate,applicationFinishDate);
      if(electResponse.status === 200 && applicResponse.status === 200) {
        showSuccessNotification("Tarihler başarılı bir şekilde kuruldu!");
      }else{
        showErrorNotification("Bir hata oluştu!");
      }
    }


  }

  return (
    <div className="flex-grow flex-col justify-center-top">
      <Header />
      <div className="mt-4">
        <div className="text-center ms-4 me-4 border border-dark rounded ">
          <div className="m-2 p-2">
            <h1 className="text-2xl font-extrabold mb-6">Application Start and End Date</h1>
            <label htmlFor="start-date" className="font-bold mr-2">
              Start Date:
            </label>
            <input
              type="datetime-local"
              id="start-date"
              name="start-date"
              className="border border-gray-400 p-2"
              onChange={(e) => {setApplicationStartDate(e.target.value)}}
            />
            <label htmlFor="end-date" className="font-bold mr-2">
              End Date:
            </label>
            <input
              type="datetime-local"
              id="end-date"
              name="end-date"
              className="border border-gray-400 p-2"
              onChange={(e) => {setApplicationFinishDate(e.target.value)}}
            />
          </div>
          <div className="m-2 p-2">
            <h1 className="text-2xl font-extrabold mb-6">Election Start and End Date</h1>

            <label htmlFor="start-date" className="font-bold mr-2">
              Start Date:
            </label>
            <input
              type="datetime-local"
              id="start-date"
              name="start-date"
              className="border border-gray-400 p-2"
              onChange={(e) => {setElectionStartDate(e.target.value)}}
            />
            <label htmlFor="end-date" className="font-bold mr-2">
              End Date:
            </label>
            <input
              type="datetime-local"
              id="end-date"
              name="end-date"
              className="border border-gray-400 p-2"
              onChange={(e) => {setElectionFinishDate(e.target.value)}}
            />
            <br/>
            <br/>
            <br/>

            <button
              id="submit-btn"
              className={classNames('bg-red-500 text-white font-bold py-2 px-4 rounded', {
                'bg-red-400': isSetAlreadyDate,
                'hover:bg-red-600': !isSetAlreadyDate
              })}
              onClick={handleDates}
              disabled={isSetAlreadyDate}
            >
              Set Dates
            </button>
            {isSetAlreadyDate ? <div className="text-red-500">There is an already active date</div> : ""}
          </div>

        </div>
        
      </div>
    </div>
  );
};

export default EnterSchedule;
