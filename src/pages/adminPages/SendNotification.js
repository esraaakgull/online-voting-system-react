import { useState } from 'react';
import Header from '../../layouts/Header';
import { sendNotification } from '../../helpers/api';
import classNames from 'classnames';
import { showSuccessNotification } from '../../helpers/toasts';
import { showErrorNotification } from '../../helpers/toasts';

const SendNotification = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitNotification = async () => {
    setIsLoading(true);
    const res = await sendNotification(title, description);

    setIsLoading(false);
    if (res.status === 200) {
      showSuccessNotification('Bildirim Gönderildi!');
    } else {
      showErrorNotification('Hata Oluştu!');
    }
  };

  return (
    <div className="flex-grow flex-col justify-content-center">
      <Header />
      <div className="row align-content-center p-4 ">
        <div className="col-md-12">
          <h5 className="text-center font-bold text-2xl mb-4">Send Notification</h5>
        </div>
        <div className="col"></div>
        <div className="col-md-6 p-2 ms-4 me-4 border border-dark rounded ">
          <form>
            {/*<div className="col p-2">
              <label htmlFor="file" className="block font-medium">
                File:
              </label>
              <input
                type="file"
                id="file"
                name="file"
                placeholder="Title.."
                className="w-full bg-gray-200 border-2 border-gray-300 rounded py-2 px-4"
              />
  </div> */}
            <div className="col p-2">
              <label htmlFor="title" className="block font-medium">
                Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Title.."
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className="w-full bg-gray-200 border-2 border-gray-300 rounded py-2 px-4"
              />
            </div>
            <div className="col p-2">
              <label htmlFor="message" className="block font-medium">
                Message:
              </label>
              <textarea
                id="message"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                name="message"
                rows="10"
                className="w-full bg-gray-200 border-2 border-gray-300 rounded py-2 px-4"
                placeholder="Type your message here..."></textarea>
            </div>
            <div className="col-md-3 p-2 ">
              <button
                onClick={handleSubmitNotification}
                disabled={isLoading}
                type="button"
                className={classNames('bg-red-500 text-white font-bold py-2 px-4 rounded', {
                  'bg-red-400': isLoading,
                  'hover:bg-red-600': !isLoading
                })}>
                Send
              </button>
            </div>
          </form>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};
export default SendNotification;
