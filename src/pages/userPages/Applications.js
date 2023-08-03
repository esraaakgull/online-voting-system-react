import Header from '../../layouts/Header';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import { showErrorNotification, showSuccessNotification } from '../../helpers/toasts';
import classNames from 'classnames';
import Footer from '../../layouts/Footer';
import ApplicationStatus from '../../components/ApplicationStatus';
import { addApplicationFiles, api, createAnApplication, getIsAlreadySubmittedApplication } from '../../helpers/api';

const Applications = () => {
  const userContext = useContext(UserContext);
  const [politicalPartyDoc, setPoliticalPartyDoc] = useState('');
  const [studentCertificate, setStudentCertificate] = useState('');
  const [letter, setLetter] = useState('');
  const [transcript, setTranscript] = useState('');
  const formData = new FormData();
  const [isAlreadySubmittedAppl,setIsAlreadySubmittedAppl] = useState(false);
  
  const handleSubmitButtonForApplication = async  () => {
    const resp = await getIsAlreadySubmittedApplication(userContext.user.userId);
    
    if(!(resp == null) && resp.status === 200) {
      setIsAlreadySubmittedAppl(true);
    }
  }
  
  const handleSubmit = async () => {
    handleSubmitButtonForApplication();
    if (!transcript || !politicalPartyDoc || !studentCertificate || !letter) {
      showErrorNotification(
        'Some documents are missing. Please be sure that you uploaded 4 documents that are listed on the page.'
      );
      return false;
    }
    if (
      !checkFormat(transcript) ||
      !checkFormat(politicalPartyDoc) ||
      !checkFormat(studentCertificate) ||
      !checkFormat(letter)
    ) {
      showErrorNotification('Lütfen belgelerinizi istenilen formatta yükleyin!');
      return false;
    }
    if (
      !checkSize(transcript) ||
      !checkSize(politicalPartyDoc) ||
      !checkSize(studentCertificate) ||
      !checkSize(letter)
    ) {
      showErrorNotification('Lütfen belgelerinizi istenilen boyutta yükleyin!');
      return false;
    }
    formData.append('transcript', transcript);
    formData.append('applicationRequest', letter);
    formData.append('political', politicalPartyDoc);
    formData.append('studentCertificate', studentCertificate);
    const res = await addApplicationFiles(userContext.user.userId, formData);
    const createAnApplicationResponse = await createAnApplication(userContext.user.userId);
    if (res) {
      showSuccessNotification('Tebrikler! Tüm belgeler başarıyla yüklendi!');
    } else {
      showErrorNotification("Bir Hata Oluştu.")
    }
  };

  const checkFormat = (fileToBeChecked) => {
    const res = fileToBeChecked.name.split('.');
    return res[1] === 'pdf';
  };

  const checkSize = (fileToBeChecked) => fileToBeChecked.size <= 2000000;

  return (

    <div className="flex-grow flex flex-col justify-center-top">
      <Header />
      {userContext.applications && <ApplicationStatus />}
      <div className="main p-2">
        <div className="row justify-content-center ">
          <div className="col-md-12 text-center">
            <p
              className={classNames('h4 font-weight-bold', {
                'text-success': userContext.applications,
                'text-danger': !userContext.applications
              })}>
              {userContext.applications
                ? 'Thank you! You uploaded all your necessary documents.'
                : 'Please upload all necessary documents if you want be a candidate.'}
            </p>
          </div>
        </div>
        <form className="max-w-3xl mx-auto bg-light border border-dark shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <div className="p-2">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="transcript">
                Transcript{' '}
                <span className="text-info h6">( Should be in .pdf (max 2MB) format)</span>
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="transcript"
                type="file"
                onChange={(e) => setTranscript(e.target.files[0])}
              />
              {transcript && (
                <p className="text-success">
                  <i className="fa fa-check" /> File uploaded : {transcript.name}
                </p>
              )}
            </div>
            <div className="p-2">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="PartyDocument">
                Political Party Document{' '}
                <span className="text-info h6">( Should be in .pdf (max 2MB) format)</span>
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="PartyDocument"
                name="PartyDocument"
                type="file"
                onChange={(e) => setPoliticalPartyDoc(e.target.files[0])}
              />
              { politicalPartyDoc && (
                <p className="text-success">
                  <i className="fa fa-check" /> File uploaded : {politicalPartyDoc.name}
                </p>
              )}
            </div>
            <div className="p-2">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="transcript">
                Student Certificate{' '}
                <span className="text-info h6">( Should be in .pdf (max 2MB) format)</span>
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="studentCertificate"
                name="studentCertificate"
                type="file"
                onChange={(e) => setStudentCertificate(e.target.files[0])}
              />
              {studentCertificate && (
                <p className="text-success">
                  <i className="fa fa-check" /> File uploaded : {studentCertificate.name}
                </p>
              )}
            </div>
            <div className="p-2">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="PartyDocument">
                Letter of Application{' '}
                <span className="text-info h6">( Should be in .pdf (max 2MB) format)</span>
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="letter"
                name="letter"
                type="file"
                onChange={(e) => setLetter(e.target.files[0])}
              />
              {letter && (
                <p className="text-success">
                  <i className="fa fa-check" /> File uploaded : {letter.name}
                </p>
              )}
            </div>
            {isAlreadySubmittedAppl ? <div className='text-red-500'>Önceden başvuru yaptınız!</div>:""}
          </div>
          <button
            className={classNames('bg-red-500 text-white font-bold py-2 px-4 rounded', {
              'bg-red-400': isAlreadySubmittedAppl,
              'hover:bg-red-600': !isAlreadySubmittedAppl
            })}
            type="button"
            onClick={handleSubmit}
            disabled = {isAlreadySubmittedAppl}
            >
            Submit Documents
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Applications;
