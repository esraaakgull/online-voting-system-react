import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import { useContext } from 'react';

const Sidebar = () => {
  const userContext = useContext(UserContext);
  const pagesToDisplay = userContext.getPages();

  return (
    <div className="flex flex-col w-64 bg-red-700 overflow-y-auto flex-shrink-0">
      <div className="flex justify-center text-center mt-10 text-5xl text-white">
        IZTECH ONLINE VOTING SYSTEM
      </div>
      <nav className="flex flex-col mt-10 items-center">
        {Object.keys(pagesToDisplay).map((page, index) => {

            return (
              <Link
                key={`sideBar${index}`}
                to={pagesToDisplay[page].path}
                className="px-4 py-2 text-gray-200 hover:bg-red-900">
                <i className={`fa ${pagesToDisplay[page].icon}`}></i> {pagesToDisplay[page].title}
              </Link>
            )})}
          {userContext.user &&
            <div>
            <Link  to="#">
              <p
                className="px-4 py-2 text-gray-200 hover:bg-red-900"
                onClick={userContext.logout}>
                <i className='fa fa-arrow-right-from-bracket'></i> Logout
              </p>
            </Link>
            </div>}
      </nav>
    </div>
  );
};

export default Sidebar;
