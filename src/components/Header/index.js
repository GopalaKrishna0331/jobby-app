import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogOut = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  const smallContainer = () => (
    <ul className="navbar">
      <Link to="/">
        <li>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-logo"
          />
        </li>
      </Link>
      <div className="icon-container">
        <Link to="/">
          <AiFillHome size="30" color="#ffffff" className="icon" />
        </Link>
        <Link to="/jobs">
          <BsFillBriefcaseFill size="30" color="#ffffff" className="icon" />
        </Link>
        <button className="logOut-button" type="button" onClick={onClickLogOut}>
          <FiLogOut size="30" color="#ffffff" />
        </button>
      </div>
    </ul>
  )

  const largeContainer = () => (
    <ul className="navbar">
      <Link to="/">
        <li>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-lg-logo"
          />
        </li>
      </Link>
      <ul className="tags">
        <Link to="/" className="link">
          <li>
            <p className="para">Home</p>
          </li>
        </Link>
        <Link to="/jobs" className="link">
          <li>
            <p className="para">Jobs</p>
          </li>
        </Link>
      </ul>
      <button className="button-element" type="button" onClick={onClickLogOut}>
        Logout
      </button>
    </ul>
  )

  return (
    <>
      <div className="d-none">{smallContainer()}</div>
      <div className="d-lg-none">{largeContainer()}</div>
    </>
  )
}

export default withRouter(Header)
