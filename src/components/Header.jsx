
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React, { Component } from "react";
import Tiny from "./Tiny";

export default class Header extends Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired
  };

  render() {
    const { authenticated } = this.props;
    return (
      <div>
        <ul className="menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          {authenticated ? (
            <li onClick={this._handleLogoutClick}>Logout</li>
          ) : (
            <li onClick={this._handleSignInClick}>Login</li>
          )}
        </ul>
        <div>
          <Tiny />
        </div>
      </div>
    );
  }

  _handleSignInClick = () => {
    // Authenticate using via passport api in the backend
    // Open Twitter login page
    window.open("http://localhost:4000/auth/cyberark", "_self");
  };

  _handleLogoutClick = () => {
    // Logout using Twitter passport api
    // Set authenticated state to false in the HomePage component
    // window.open("http://localhost:4000/auth/logout", "_self");
    window.open("https://aah4414.my.idaptive.app/oauth2/endsession?post_logout_redirect_uri=http%3A%2F%2Flocalhost%3A4000%2Fauth%2Flogout", "_self");
    this.props.handleNotAuthenticated();
  };
}