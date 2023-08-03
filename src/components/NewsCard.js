import logo from '../assets/images/iyte.png';
import { Link } from 'react-router-dom';

const NewsCard = ({ data }) => {
    return (
    <div className="col-md-3 border border-dark rounded m-3">
      <div className="col m-1">
        <div className="row p-1">
          <img src={logo} className="card-img-top" alt="..." />
        </div>
        <div className="row p-1">
          <h5>
            <b>{data.title}</b>
          </h5>
        </div>
        <div className="row p-1">
          <p className="card-text">{data.description}</p>
        </div>
        <div className="row p-1">
          <Link to={`/announcements/${data.announcementId}`}>
            <button className="btn btn-danger">GO TO ANNOUNCEMENT</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
