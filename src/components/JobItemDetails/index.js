import {Component} from 'react'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {ImLocation2} from 'react-icons/im'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'

import Header from '../Header'
import SimilarJobsList from '../SimilarJobsList'
import './index.css'

class JobItemDetails extends Component {
  state = {
    jobsDetails: {},
    similarJobsDetails: [],
    skills: [],
    jobFailure: false,
  }

  componentDidMount() {
    const {history} = this.props
    const path = history.location
    const pathName = path.pathname
    this.fetchJobsComponent(pathName)
  }

  fetchJobsComponent = async pathName => {
    const jwtToken = Cookie.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const url = `https://apis.ccbp.in${pathName}`
    console.log(url)
    const response = await fetch(url, options)
    const jsonData = await response.json()
    if (response.ok === true) {
      const jobDetails = jsonData.job_details
      const getJobs = jsonData.similar_jobs
      const similarJobs = getJobs.map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      const lifeAtCompany = jobDetails.life_at_company
      const {skills} = jobDetails
      const jobSkills = skills.map(each => ({
        name: each.name,
        skillsImageUrl: each.image_url,
      }))
      const jobData = {
        id: jobDetails.id,
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        jobDescription: jobDetails.job_description,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        title: jobDetails.title,
        lifeCompanyDescription: lifeAtCompany.description,
        imageUrl: lifeAtCompany.image_url,
      }
      this.setState({
        jobsDetails: jobData,
        similarJobsDetails: similarJobs,
        skills: jobSkills,
      })
    } else {
      this.setState({jobFailure: true})
    }
  }

  onClickFailureButtonApp = () => {
    this.setState(
      {
        jobsDetails: {},
        similarJobsDetails: [],
        skills: [],
        jobFailure: false,
      },
      async () => {
        try {
          await this.fetchJobsComponent()
        } catch (e) {
          console.log(e)
        }
      },
    )
  }

  jobFailureViewApp = () => (
    <>
      <Header />
      <div className="failure-container-app">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure-img-app"
        />
        <h1 className="failure-heading-app">Oops! Something Went Wrong</h1>
        <p className="failure-para-app">
          We cannot seem to find the page you are looking for.
        </p>
        <button
          className="failure-button-app"
          type="button"
          onClick={this.onClickFailureButtonApp}
        >
          Retry
        </button>
      </div>
    </>
  )

  loaderViewApp = () => (
    <div className="loader-container-app" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  functionViewApp = () => {
    const {jobFailure} = this.state

    if (jobFailure === true) {
      return this.jobFailureViewApp()
    }
    return this.loaderViewApp()
  }

  successJobDetails = () => {
    const {jobsDetails, skills, similarJobsDetails} = this.state
    console.log(similarJobsDetails)
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      lifeCompanyDescription,
      imageUrl,
    } = jobsDetails
    return (
      <>
        <Header />
        <div className="detail-container">
          <div className="job-card-container">
            <div className="job-first-container">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="job-logo"
              />
              <div>
                <h1 className="job-details-head">{title}</h1>
                <div className="rating-details-tag">
                  <AiFillStar
                    color="#fbbf24"
                    size="25px"
                    className="star-details-icon"
                  />
                  <p className="rating-details">{rating}</p>
                </div>
              </div>
            </div>
            <div className="location-details-container">
              <div className="location-details-tag">
                <ImLocation2
                  size="25px"
                  color="#ffffff"
                  className="icon-details-location"
                />
                <p className="list-details-para">{location}</p>
                <BsFillBriefcaseFill
                  size="25px"
                  color="#ffffff"
                  className="icon-details-location"
                />
                <p className="list-details-para">{employmentType}</p>
              </div>
              <p className="list-details-para">{packagePerAnnum}</p>
            </div>
            <hr className="horizontal-details-line " />
            <div className="job-description-tag">
              <h1 className="description-details">Description</h1>
              <a
                target="_blank"
                href={companyWebsiteUrl}
                rel="noreferrer"
                className="anchor-tag"
              >
                <span className="visit">
                  Visit <BiLinkExternal size="19px" className="share" />
                </span>
              </a>
            </div>
            <p className="des-details-para">{jobDescription}</p>
            <div className="skills-container">
              <h1 className="skills-heading">Skills</h1>
              <ul className="skills-unordered-list">
                {skills.map(eachItem => {
                  const {name, skillsImageUrl} = eachItem
                  return (
                    <li className="skill-list" key={name}>
                      <img
                        src={skillsImageUrl}
                        alt={name}
                        className="skill-img"
                      />
                      <p className="skill-tag-para">{name}</p>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="life-company-container">
              <h1 className="life-head">Life at Company</h1>
              <div className="life-lg-tag">
                <p className="life-para">{lifeCompanyDescription}</p>
                <img
                  src={imageUrl}
                  alt="life at company"
                  className="life-image"
                />
              </div>
            </div>
          </div>
          <div className="similar-job-container">
            <h1 className="Similar-job-head">Similar Jobs</h1>
            <ul className="similar-unordered-list">
              {similarJobsDetails.map(each => (
                <SimilarJobsList each={each} key={each.id} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  render() {
    const {jobsDetails} = this.state
    return Object.keys(jobsDetails).length !== 0
      ? this.successJobDetails()
      : this.functionViewApp()
  }
}

export default JobItemDetails
