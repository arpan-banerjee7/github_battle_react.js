import React from "react";
import { getSingleUser } from "../utils/api";
import { ThemeConsumer } from "../contexts/theme";
import Loading from "./Loading";

import {
  FaStar,
  FaCodeBranch,
  FaCompass,
  FaCode,
  FaUser,
  FaBriefcase,
  FaUserFriends,
  FaUsers,
} from "react-icons/fa";
import Tooltip from "./Tooltip";

const styles = {
  center: {
    margin: "auto",
    width: "70%",
    padding: "10px",
  },
};

function ReposGrid({ repos }) {
  return (
    <ul className="grid space-around">
      {repos.map((repo, index) => {
        const {
          language,
          description,
          stargazers_count,
          forks,
          full_name,
          svn_url,
        } = repo;

        return (
          <ThemeConsumer>
            {({ theme }) => (
              <li key={index}>
                <div className={`card-repo bg-${theme}`}>
                  <h2 className="center-text">
                    <a className="link" href={svn_url}>
                      {full_name}
                    </a>
                  </h2>
                  {description && <p className="center-text">{description}</p>}
                  <ul className="card-list">
                    <li>
                      <Tooltip text="Stars">
                        <FaStar color="rgb(255, 215, 0)" size={22} />
                        {stargazers_count.toLocaleString()} stars
                      </Tooltip>
                    </li>
                    <li>
                      <FaCode color="rgb(255, 215, 0)" size={22} />
                      {language}
                    </li>
                    <li>
                      <FaCodeBranch color="rgb(129, 195, 245)" size={22} />
                      {forks} forks
                    </li>
                  </ul>
                </div>
              </li>
            )}
          </ThemeConsumer>
        );
      })}
    </ul>
  );
}

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
    this.setState({
      username: "",
    });
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
      loading: false,
      error: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleSubmit(user) {
    this.setState({
      loading: true,
    });
    getSingleUser(user)
      .then(([profile, repos]) => {
        this.setState({
          userName: user,
          profile,
          repos,
          loading: false,
        });
        console.log(repos);
      })
      .catch(({ message }) => {
        this.setState({
          error: message,
          loading: false,
        });
      });
    this.setState({
      userName: null,
    });
  }
  handleReset() {
    this.setState({
      userName: null,
      profile: null,
      repos: null,
      loading: false,
      error: null,
    });
  }
  render() {
    const { userName, profile, repos, loading, error } = this.state;

    if (loading === true) {
      return <Loading text="Fetching user data..." />;
    }
    if (error) {
      return (
        <React.Fragment>
          <p className="center-text error">{error}</p>
          <div>
            <button
              className="btn dark-btn btn-space"
              onClick={this.handleReset}
            >
              Reset
            </button>
          </div>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <div style={styles.center}>
          <div>
            <PlayerSearch
              label="User Name"
              onSubmit={(player) => this.handleSubmit(player)}
            />
          </div>
          <div>
            {profile && repos && (
              <ThemeConsumer>
                {({ theme }) => (
                  <React.Fragment>
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
                                <FaCompass
                                  color="rgb(144, 115, 255)"
                                  size={22}
                                />
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
                          {profile.public_repos && (
                            <li>
                              <Tooltip text="Public Repos">
                                <FaCode color="#795548" size={22} />
                                {profile.public_repos} repositories
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

                    {/* <ReposGrid repos={repos} /> */}
                  </React.Fragment>
                )}
              </ThemeConsumer>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
