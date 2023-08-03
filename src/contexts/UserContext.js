import { createContext, useEffect, useState } from 'react';
import { getFromLocalStorage, setToLocalStorage } from '../helpers/storage';
import { showErrorNotification } from '../helpers/toasts';
import { useNavigate } from 'react-router-dom';
import { pages } from '../constants/pages';
import { handleLogin } from '../helpers/api';

const UserContext = createContext(null);
export const UserContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const logout = async () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.replace("/");
  };

  const load = (strUser = null) => {
    const usr = strUser || JSON.parse(getFromLocalStorage('user')) ;
    if (usr) {
      setUser(usr);
    }
  };

  const getPages = () => {
    if (user && user.isAdmin) return pages.adminPages;
    return pages.userPages;
  };

  const setAuth = async (email, password) => {
    let res = null;
    try {
      const { data } = await handleLogin(email, password);
      res = data;
    } catch (err) {
      showErrorNotification('Bir hata oluştu!');
    }
    return res;
  };

  const login = async (email, password) => {
    const user = await setAuth(email, password);
    if (!user) return false;
    setUser(user);
    const userJson = JSON.stringify(user);
    setToLocalStorage('user', userJson);
    load(user);
    navigate(pages.commonPages.main.path);
    return true;
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        getPages
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
