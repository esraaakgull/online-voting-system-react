import AnnouncementCard from '../components/AnnouncementCard';
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';
import { announcements } from '../constants/announcements';
import NewsCard from '../components/NewsCard';
import { useEffect, useState } from 'react';
import { getAllAnnouncements, handleLogin, setApplicationDates, setElectionDatess } from '../helpers/api';

const Dashboard = () => {
  const [news, setNews] = useState([])

  const getAnnouncements = async () => {
    const res= await getAllAnnouncements();
    setNews(res.data);
  }
  useEffect(()=> {
    getAnnouncements();
    //handleLogin("ahmetcan@std.iyte.edu.tr","33323");
    //setElectionDates("12-02-2022","21-02-2022");
    //setApplicationDates("12-02-2023","10-03-2023");
  },[])

  return (
    <div className="flex-grow flex flex-col">
      <Header />
      <div className="row justify-content-center ">
        <AnnouncementCard data={announcements.electionCalendar} />
        <AnnouncementCard data={announcements.electionResults} />
        {news.map((announce , index) => (
          <NewsCard data={announce} key={index} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
