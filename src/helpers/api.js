import axios from 'axios';

import { getFromLocalStorage } from './storage';
//Production
const baseAppUrl = 'https://onlinevotingsystem.herokuapp.com';
const externalAppUrl = 'https://ovsexternal.herokuapp.com';

//Local
//const baseAppUrl = 'http://localhost:8082';
//const externalAppUrl = 'http://localhost:8081';

export const api = () => {
  const token = getFromLocalStorage(process.env.jwtStorageName);

  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer${token}`;

  return axios.create({
    baseURL: baseAppUrl,

    headers
  });
};

/* 
sample return object 
[
    {
        "applicationId": 1,
        "transcriptPath": "asdawdaw",
        "applicationRequest": "awdawasdaw",
        "studentCertificate": "asdawdaw",
        "political": "adasdwada",
        "studentName": "Özgürhan",
        "studentSurname": "Polat",
        "studentNumber": "260201035"
    },
    {
        "applicationId": 2,
        "transcriptPath": "asdawdaw",
        "applicationRequest": "addsss",
        "studentCertificate": "asdwa",
        "political": "ladwadasd",
        "studentName": "Bugra Onur",
        "studentSurname": "Genç",
        "studentNumber": "260201064"
    }
]



*/
export const getApplications = async () => {
  let res = null;
  await api()
    .get('/applications')
    .then((response) => {
      res = response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return res;
};

/* 

Return Object 
if a student applies for an application already then this json object is sent by backend
{
    "applicationId": 1,
    "transcriptPath": "asdawdaw",
    "applicationRequest": "awdawasdaw",
    "studentCertificate": "asdawdaw",
    "political": "adasdwada",
    "userId": 1,
    "isSubmittedApplication": true
}

if a student doesn't apply for an application already then this json object is sent by backend

{
    "applicationId": null,
    "transcriptPath": null,
    "applicationRequest": null,
    "studentCertificate": null,
    "political": null,
    "userId": null,
    "isSubmittedApplication": false
}

*/

export const getApplicationById = async (userId) => {
  let res = null;
  try {
    const { data } = await api().get('/applications/user/' + userId);
    res = data;
  } catch (err) {
    console.log(err);
  }
  return res;
};

/* 
Sample Data to send 
{
      transcriptPath : "transcript01",
      applicationRequest : "applicationRequest01",
      studentCertificate : "studentCertificate01",
      political : "political01",
      userId : 1
    }
Here userId must be unique for each application.

if you send above data again then you get this error:
  httpStatus: "INTERNAL_SERVER_ERROR"
  message: "There is already an application with user Id : 1"
  timeStamp: "2023-05-31T23:23:02.021663"
*/

export const createAnApplication = async (userId) => {
  let res = null;
  try {
    console.log(api());
    res = await axios
      .post(baseAppUrl +'/applications', {
        transcriptPath: baseAppUrl + '/applications/download-transcript/user-id/' + userId,
        applicationRequest: baseAppUrl + '/applications/download-application/user-id/' + userId,
        studentCertificate:
          baseAppUrl + '/applications/download-student-certificate/user-id/' + userId,
        political: baseAppUrl + '/applications/download-politicial/user-id/' + userId,
        userId: userId
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
  return res;
};

/* you should send Only changed fields but I don't know how to be made in react  */
export const updateApplication = async (updatedApplication) => {
  let res = null;
  try {
    res = axios.put(baseAppUrl +'/applications', {
      applicationId: updateApplication.applicationId,
      transcriptPath: updateApplication.transcriptPath,
      applicationRequest: updateApplication.applicationRequest,
      studentCertificate: updateApplication.studentCertificate,
      political: updateApplication.studentCertificate
    });
  } catch (err) {
    console.log(err);
  }
  return res;
};

export const approveApplication = (applicationId) => {
  return axios.post(baseAppUrl + '/applications/approve/' + applicationId);
};

export const sendNotification = async (title, description) => {
  let response = null;
  try {
    response = axios
      .post(baseAppUrl + '/notifications', {
        title: title,
        description: description
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  } catch (err) {
    console.log(err);
  }
  return response;
};

export const addAnnouncement = async (title, description) => {
  let response = null;
  try {
    response = axios
      .post(baseAppUrl + '/announcements', {
        title: title,
        description: description
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  } catch (err) {
    console.log(err);
  }
  return response;
};

export const getAllAnnouncements = async () => {
  let response = null;
  try {
    response = axios
      .get(baseAppUrl +'/announcements')
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  } catch (err) {
    console.log(err);
  }
  return response;
};

export const findAnnounce = async (id) => {
  let response = null;
  try {
    response = axios
      .get(baseAppUrl + '/announcements/' + id)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  } catch (err) {
    console.log(err);
  }
  return response;
};

export const getAllResultsFromDatabase = async () => {
  let response = null;
  try {
    response = axios
      .get(baseAppUrl + '/elections/results')
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  } catch (err) {
    console.log(err);
  }
  console.log(response);
  return response;
};

export const gettAllApplicants = async (userId) => {
  let response = null;
  try {
    response = axios
      .get(baseAppUrl + '/voting/applicants/' + userId)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  } catch (err) {
    console.log(err);
  }
  return response;
};

export const submitVoting = async (userId, candidateId) => {
  let response = null;
  try {
    response = axios
      .put(baseAppUrl + '/voting/user/' + userId + '/canidate/' + candidateId)
      .then((res) => {
        console.log(res.status);
        return res;
      })
      .catch((err) => {
        return err;
      });
  } catch (err) {
    console.log(err);
  }
  return response;
};

export const handleLogin = async (email, password) => {
  const isAvailableEmail = await isValidEmailOrNot(email);

  if (isAvailableEmail.status === 200) {
    const isValidToLoginToSystem = await loginToSystem(email, password);
    if (isValidToLoginToSystem.status === 200) {
      const userInfo = await getUserInfo(email);
      return userInfo;
    } else return null;
  } else if (isAvailableEmail.response.status === 404) {
    const isValidUser = await loginToSystem(email, password);
    if (isValidUser.status === 200) {
      const registrationInfo = await getAllInfoFromExternalToSave(email, password);
      const registerResponse = await registerUserIntoVotingSystem(registrationInfo.data);


      if (registerResponse.status === 200) {
        const userInfo = await getUserInfo(email);
        return userInfo;
      }
      else return null;
    } else return null;
  }
};

const isValidEmailOrNot = async (email) => {
  let response = null;
  try {
    response = axios
      .post(baseAppUrl +'/auth/isvalid', {
        email: email
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  } catch (err) {
    console.log(err);
  }

  return response;
};

const loginToSystem = async (email, password) => {
  let response = null;
  try {
    response = axios
      .post(externalAppUrl +'/auth/log-in', {
        email: email,
        password: password
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  } catch (err) {
    console.log(err);
  }

  return response;
};

const getUserInfo = async (email) => {
  let response = null;
  try {
    response = axios
      .post(baseAppUrl + '/auth/log-in', {
        email: email
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  } catch (err) {
    console.log(err);
  }

  return response;
};
const getAllInfoFromExternalToSave = async (email, password) => {
  let response = null;
  try {
    response = axios
      .post(externalAppUrl +'/auth/user/register-info', {
        email: email,
        password: password
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  } catch (err) {
    console.log(err);
  }

  return response;
};
const registerUserIntoVotingSystem = async (registrationInfo) => {
  let response = null;
  try {
    response = axios
      .post(baseAppUrl + '/auth/register', {
        name: registrationInfo.name,
        surname: registrationInfo.surname,
        email: registrationInfo.email,
        grade: registrationInfo.grade,
        isAdmin: registrationInfo.isAdmin,
        studentNumber: registrationInfo.studentNumber,
        departmentName: registrationInfo.departmentName
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  } catch (err) {
    console.log(err);
  }

  return response;
};

export const setElectionDates = async (electionStartDate, electionFinishDate) => {
  let response = null;
  try {
    response = axios
      .post(baseAppUrl +'/dates/election', {
        electionStartDate: electionStartDate,
        electionFinishDate: electionFinishDate
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  } catch (err) {
    console.log(err);
  }

  return response;
};

export const setApplicationDates = async (applicationStartDate, applicationFinishDate) => {
  let response = null;
  try {
    response = axios
      .post(baseAppUrl + '/dates/application', {
        applicationStartDate: applicationStartDate,
        applicationFinishDate: applicationFinishDate
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  } catch (err) {
    console.log(err);
  }
  return response;
};
export const addApplicationFiles = async (userId, formData) => {
  let res = null;
  try {
    res = await api()
      .post(baseAppUrl + '/applications/upload/user-id/' + userId, formData, {
        headers: {
          'Content-Type': 'form/multipart'
        }
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return res;
      });
  } catch (err) {
    console.log(err);
  }
  return res;
};



export const getIsAlreadySubmittedApplication = async (userId) => {
  let res = null;
  try {
    res = await api()
      .get(baseAppUrl + '/applications/user-id/' + userId)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return res;
      });
  } catch (err) {
    console.log(err);
  }
  return res;
};

export const downloantTranscriptFromDatabase = async (userId) => {
  let res = null;
  try {
    res = await api()
      .get(baseAppUrl + '/applications/download-transcript/user-id/' + userId)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  } catch (err) {
    console.log(err);
  }
  return res;
};


export const getAllApplicationDates = async () => {
  let res = null;
  try {
    res = await api()
      .get(baseAppUrl + '/dates/applications')
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  } catch (err) {
    console.log(err);
  }
  return res;
};


export const getAllElectionDates = async () => {
  let res = null;
  try {
    res = await api()
      .get(baseAppUrl + '/dates/elections')
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  } catch (err) {
    console.log(err);
  }
  return res;
};

export const getIsReviewed = async (applicationId) => {
  let res = null;
  try {
    res = await api()
        .get(baseAppUrl + '/applications/' + applicationId)
        .then((res) => {
          return res;
        })
        .catch((error) => {
          return error;
        });
  } catch (err) {
    console.log(err);
  }

  return res;
};


export const rejectApplication = async (applicationId) => {
  let res = null;
  try {
    res = await api()
        .post(baseAppUrl + '/applications/reject/' + applicationId)
        .then((res) => {
          return res;
        })
        .catch((error) => {
          return error;
        });
  } catch (err) {
    console.log(err);
  }

  console.log(res);
  return res;
};


export const isActiveApplication = async () => {
  let res = null;
  try {
    res = await api()
        .get(baseAppUrl + '/dates/application/active-date')
        .then((res) => {
          return res;
        })
        .catch((error) => {
          return error;
        });
  } catch (err) {
    console.log(err);
  }

  return res;
};


export const isActiveElection = async () => {
  let res = null;
  try {
    res = await api()
        .get(baseAppUrl + '/dates/election/active-date')
        .then((res) => {
          return res;
        })
        .catch((error) => {
          return error;
        });
  } catch (err) {
    console.log(err);
  }

  return res;
};

