import {AiFillStar} from 'react-icons/ai'
import {ImLocation2} from 'react-icons/im'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobsList = props => {
  const {each} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = each
  return (
    <li className="similar-container">
      <div className="first-similar-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-logo"
        />
        <div>
          <h1 className="similar-job-head">{title}</h1>
          <div className="similar-rating-element">
            <AiFillStar
              color="#fbbf24"
              size="20px"
              className="similar-star-icon"
            />
            <p className="similar-rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-description">Description</h1>
      <p className="similar-des-para">{jobDescription}</p>
      <div className="similar-location-element">
        <div className="similar-location-tag">
          <ImLocation2
            size="20px"
            color="#ffffff"
            className="similar-icon-location"
          />
          <p className="similar-list-para">{location}</p>
          <BsFillBriefcaseFill
            size="20px"
            color="#ffffff"
            className="similar-icon-location"
          />
          <p className="similar-list-para">{employmentType}</p>
        </div>
        <p className="similar-list-para">{packagePerAnnum}</p>
      </div>
    </li>
  )
}

export default SimilarJobsList
