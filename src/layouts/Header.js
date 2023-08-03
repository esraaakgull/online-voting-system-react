import { useContext } from 'react';
import UserContext from '../contexts/UserContext';

const Header = () => {
  const userContext = useContext(UserContext);
  const user = userContext.user;
  return (
    <div className="flex justify-between items-center bg-gray-200 py-4 px-6">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-200 border-2 border-gray-300 rounded-full py-2 px-4"
        />
      </div>
      <div className="flex items-center">
        <button className="py-2 px-4 ml-4">
          <i className="fa-regular fa-bell"></i>
        </button>
        <img src={user.image} alt="" className="h-8 w-8 object-cover rounded-full mr-2" />
        <span className="text-gray-700 font-medium">{`${user.name}  ${user.surname}`}</span>
      </div>
    </div>
  );
};

export default Header;
