import React from "react";
import { getSingleUser } from "../utils/api";
import { ThemeConsumer } from "../contexts/theme";

import {
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaUserFriends,
  FaCode,
  FaUser,
} from "react-icons/fa";
import Tooltip from "./Tooltip";

const styles = {
  center: {
    margin: "auto",
    width: "70%",
    padding: "10px",
  },
};
class PlayerSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.username);
    console.log(this.state.username);
  }
  handleChange(event) {
    this.setState({
      username: event.target.value,
    });
  }
  render() {
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <form className="column player" onSubmit={this.handleSubmit}>
            <label htmlFor="username" className="player-label">
              {this.props.label}
            </label>
            <div className="row player-inputs">
              <input
                type="text"
                id="username"
                className={`input-${theme}`}
                placeholder="github username"
                autoComplete="off"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <button
                className={`btn ${theme === "dark" ? "light-btn" : "dark-btn"}`}
                type="submit"
                disabled={!this.state.username}
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </ThemeConsumer>
    );
  }
}

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: null,
      profile: null,
      repos: null,
      error: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleSubmit(user) {
    getSingleUser(user)
      .then(([profile, repos]) => {
        this.setState({
          userName: user,
          profile,
          repos,
        });
        console.log(profile);
      })
      .catch(({ message }) => {
        this.setState({
          error: message,
          loading: false,
        });
      });
  }
  handleReset() {
    this.setState({
      playerName: null,
    });
  }
  render() {
    const { userName, profile, repos } = this.state;

    return (
      <React.Fragment>
        <div style={styles.center}>
          <PlayerSearch
            label="User Name"
            onSubmit={(player) => this.handleSubmit(player)}
          />

          <div>
            {profile && repos && (
              <ThemeConsumer>
                {({ theme }) => (
                  <div className={`card-search bg-${theme}`}>
                    <h4 className="header-lg center-text">User Details</h4>
                    <img
                      className="avatar-search"
                      src={profile.avatar_url}
                      alt={`Avatar for ${userName}`}
                    />
                    <h2 className="center-text">
                      <a className="link" href={profile.html_url}>
                        {profile.name}
                      </a>
                    </h2>
                    <div style={styles.center}>
                      <ul className="card-list-search">
                        <li>
                          <FaUser color="rgb(239, 115, 115)" size={22} />
                          {profile.login}
                        </li>
                        {profile.location && (
                          <li>
                            <Tooltip text="User's location">
                              <FaCompass color="rgb(144, 115, 255)" size={22} />
                              {profile.location}
                            </Tooltip>
                          </li>
                        )}
                        {profile.company && (
                          <li>
                            <Tooltip text="User's company">
                              <FaBriefcase color="#795548" size={22} />
                              {profile.company}
                            </Tooltip>
                          </li>
                        )}
                        <li>
                          <FaUsers color="rgb(129, 195, 245)" size={22} />
                          {profile.followers.toLocaleString()} followers
                        </li>
                        <li>
                          <FaUserFriends color="rgb(64, 183, 95)" size={22} />
                          {profile.following.toLocaleString()} following
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </ThemeConsumer>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
