import { useState } from 'react';
import { addAnnouncement, api } from '../../helpers/api';
import Header from '../../layouts/Header';
import { showErrorNotification, showSuccessNotification } from '../../helpers/toasts';
import classNames from 'classnames';

const AddNewsAnnouncements = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmitAddAnnouncement = async () => {
    setIsLoading(true);
    const res = await addAnnouncement(title, description);

    setIsLoading(false);
    if (res.status === 200) {
      showSuccessNotification('Duyuru Gönderildi!');
    } else {
      showErrorNotification('Hata Oluştu!');
    }
  };

  return (
    <div className="flex-grow flex-col justify-content-center vh-100">
      <Header />
      <div className="row align-content-center p-4 ">
        <div className="col-md-12">
          <h5 className="text-center font-bold text-2xl mb-4">Add News / Announcement</h5>
        </div>
        <div className="col"></div>
        <div className="col-md-6 p-2 ms-4 me-4 border border-dark rounded ">
          <form>
            <div className="col p-2">
              <label htmlFor="title" className="block font-medium">
                Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                placeholder="Title.."
                className="w-full bg-gray-200 border-2 border-gray-300 rounded py-2 px-4"
              />
            </div>
            <div className="col p-2">
              <label htmlFor="message" className="block font-medium">
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                rows="10"
                className="w-full bg-gray-200 border-2 border-gray-300 rounded py-2 px-4"
                placeholder="Type your message here..."></textarea>
            </div>
            <div className="col-md-3 p-2 ">
              <button
                onClick={handleSubmitAddAnnouncement}
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

export default AddNewsAnnouncements;
