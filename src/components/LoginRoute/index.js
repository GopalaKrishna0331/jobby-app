import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showSubmitMsg: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitMsg: true, errorMsg})
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  submitButton = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitMsg, errorMsg} = this.state
    return (
      <div className="login-container">
        <form className="login-tab" onSubmit={this.submitButton}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-logo"
          />
          <label htmlFor="logo-username">USERNAME</label>
          <input
            type="text"
            placeholder="Username"
            className="login-input"
            value={username}
            onChange={this.onChangeUserName}
            id="logo-username"
          />
          <label htmlFor="logo-password">PASSWORD</label>
          <input
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={this.onChangePassword}
            type="password"
            id="logo-password"
          />
          <button className="button" type="submit">
            Login
          </button>
          {showSubmitMsg && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
