import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'
import {ImLocation2} from 'react-icons/im'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const Jobslist = props => {
  const {each} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = each
  return (
    <Link to={`/jobs/${id}`} className="link-element">
      <li className="container">
        <div className="first-container">
          <img src={companyLogoUrl} alt="company logo" className="logo" />
          <div>
            <h1 className="job-head">{title}</h1>
            <div className="rating-tag">
              <AiFillStar color="#fbbf24" size="25px" className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-container">
          <div className="location-tag">
            <ImLocation2
              size="25px"
              color="#ffffff"
              className="icon-location"
            />
            <p className="list-para">{location}</p>
            <BsFillBriefcaseFill
              size="25px"
              color="#ffffff"
              className="icon-location"
            />
            <p className="list-para">{employmentType}</p>
          </div>
          <p className="list-para">{packagePerAnnum}</p>
        </div>
        <hr className="horizontal-line " />
        <h1 className="description">Description</h1>
        <p className="des-para">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default Jobslist
