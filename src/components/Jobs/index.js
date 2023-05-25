import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import CheckBoxQuery from '../CheckBoxQuery'
import Header from '../Header'
import Joblist from '../Joblist'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    searchValue: '',
    profile: '',
    retryStatus: false,
    listType: [],
    salary: '1000000',
    jobArray: [],
    jobFailure: false,
    loader: false,
    noData: false,
  }

  componentDidMount() {
    this.fetchProfile()
    this.onFilterComponent()
  }

  onFilterComponent = async () => {
    const {listType, salary, searchValue} = this.state
    const Element = listType.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${Element}&minimum_package=${salary}&search=${searchValue}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    this.setState({loader: true})
    const data = await response.json()
    const {jobs} = data
    if (jobs.length === 0) {
      this.setState({noData: true})
    }
    if (response.ok === true) {
      const jobsData = jobs.map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({jobArray: jobsData, loader: false})
    } else {
      this.setState({jobFailure: true, loader: false})
    }
  }

  fetchProfile = async () => {
    this.setState({retryStatus: true})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const profileDetails = data.profile_details
      const profileData = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({profile: profileData, retryStatus: false})
    } else {
      this.setState({retryStatus: false})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchValue: event.target.value})
  }

  onClickSearchBar = () => {
    this.onFilterComponent()
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.onFilterComponent()
    }
  }

  retryContainer = () => {
    const {retryStatus} = this.state
    return (
      <div className="profile-retry">
        {retryStatus === true ? (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        ) : (
          <>
            <button
              className="retry-button"
              type="button"
              onClick={this.fetchProfile}
            >
              Retry
            </button>
          </>
        )}
      </div>
    )
  }

  onChangeCheckBox = (value, checked) => {
    if (checked) {
      this.setState(
        prevState => ({listType: [...prevState.listType, value]}),
        async () => {
          try {
            await this.onFilterComponent()
          } catch (e) {
            console.log(e)
          }
        },
      )
    } else {
      const {listType} = this.state
      const newList = listType.filter(each => each !== value)
      this.setState({listType: [...newList]}, async () => {
        try {
          await this.onFilterComponent()
        } catch (e) {
          console.log(e)
        }
      })
    }
  }

  onChangeRadioButton = event => {
    this.setState({salary: event.target.id}, async () => {
      try {
        await this.onFilterComponent()
      } catch (e) {
        console.log(e)
      }
    })
  }

  onClickFailureButton = () => {
    this.setState(
      {
        searchValue: '',
        profile: '',
        retryStatus: false,
        listType: [],
        salary: '1000000',
        jobArray: [],
        jobFailure: false,
      },
      async () => {
        try {
          await this.fetchProfile()
          await this.onFilterComponent()
        } catch (error) {
          console.log(error)
        }
      },
    )
  }

  successProfileRender = () => {
    const {profile} = this.state

    return (
      <>
        <div className="success-profile-container">
          <img
            src={profile.profileImageUrl}
            alt="profile"
            className="profile-logo"
          />
          <h1 className="profile-name">{profile.name}</h1>
          <p className="profile-bio">{profile.shortBio}</p>
        </div>
        <hr className="line" />
      </>
    )
  }

  noJobsView = () => (
    <div className="no-job-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jon-img"
      />
      <h1 className="no-job-head">No Jobs Found</h1>
      <p className="no-job-para">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  jobFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="failure-button"
        type="button"
        onClick={this.onClickFailureButton}
      >
        Retry
      </button>
    </div>
  )

  loaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  functionView = () => {
    const {loader, jobFailure, noData} = this.state
    if (loader === true) {
      return this.loaderView()
    }
    if (jobFailure === true) {
      return this.jobFailureView()
    }
    if (noData === true) {
      return this.noJobsView()
    }
    return null
  }

  queryFunctionCheck = () => (
    <div>
      <div>
        <h1 className="head">Type of Employment</h1>
        <ul className="checkbox-container">
          {employmentTypesList.map(each => (
            <CheckBoxQuery
              each={each}
              key={each.label}
              onChangeCheckBox={this.onChangeCheckBox}
            />
          ))}
        </ul>
      </div>
      <hr className="line" />
      <div>
        <h1 className="head">Salary Range</h1>
        <ul className="checkbox-container">
          {salaryRangesList.map(eachValue => {
            const {label, salaryRangeId} = eachValue
            return (
              <li className="input-selection" key={label}>
                <input
                  type="radio"
                  id={salaryRangeId}
                  name="option"
                  className="checkbox-input"
                  onChange={this.onChangeRadioButton}
                />
                <label htmlFor={salaryRangeId} className="checkbox-label">
                  {label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )

  render() {
    const {searchValue, profile, jobArray} = this.state
    return (
      <>
        <Header />
        <div className="job-container">
          <div className="search-sm-container">
            <input
              type="search"
              placeholder="Search"
              className="search-element"
              value={searchValue}
              onChange={this.onChangeSearchInput}
              onKeyDown={this.onEnterSearchInput}
            />
            <button
              type="button"
              data-testid="searchButton"
              className="searchButton"
              onClick={this.onClickSearchBar}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <div className="sm-side-container">
            {profile === ''
              ? this.retryContainer()
              : this.successProfileRender()}
            {this.queryFunctionCheck()}
          </div>
          <div className="search-lg">
            <div className="search-lg-container">
              <input
                type="search"
                placeholder="Search"
                className="search-element"
                value={searchValue}
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onEnterSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="searchButton"
                onClick={this.onClickSearchBar}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="job-fetch-container">
              {jobArray.length !== 0 ? (
                <ul className="jobs-details-container">
                  {jobArray.map(each => (
                    <Joblist each={each} key={each.id} />
                  ))}
                </ul>
              ) : (
                this.functionView()
              )}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
