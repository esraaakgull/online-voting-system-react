import Header from '../layouts/Header';

const ElectionCalendar = () => {
  return (
    <div className="flex-grow flex flex-col justify-center-top vh-100">
      <Header />
      <div className="main mt-4">
        <div className="justify-items-center center-table ">
          <div className="row justify-content-center pb-2">
            <p className="h4 text-danger font-weight-bold">Election Calendar</p>
          </div>
          <div className="table-container m-3">
            <table className="table rounded-lg border-collapse border border-black ">
              <tbody>
                <tr>
                  <td width="415">
                    <p className="text-left">
                      November 12th 2023 (09:00) – November 16th 2023 (17:00)
                    </p>
                    <p className="text-left">
                      <strong>Application to be a candidate</strong>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td width="415">
                    <p className="text-left">November 19th 2023</p>
                    <p className="text-left">
                      <strong>Announcement of the candidates</strong>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td width="415">
                    <p className="text-left">
                      November 20th 2023 (09:00) – November 26th 2023 (17:00)
                    </p>
                    <p className="text-left">
                      <strong>Election takes place </strong>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td width="415">
                    <p className="text-left">November 27th 2023</p>
                    <p className="text-left">
                      <strong>Election of Department Representatives</strong>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td width="415">
                    <p className="text-left">November 27th 2023 (16:00)</p>
                    <p className="text-left">
                      <strong>Announcement of Department Representatives</strong>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td width="415">
                    <p className="text-left">November 30th 2023</p>
                    <p className="text-left">
                      <strong>Announcement of Faculty Representatives</strong>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectionCalendar;
