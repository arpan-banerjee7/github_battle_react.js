import React from "react";
import { ThemeConsumer } from "../contexts/theme";

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
      playerName: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleSubmit(player) {
    this.setState({
      playerName: player,
    });
  }
  handleReset() {
    this.setState({
      playerName: null,
    });
  }
  render() {
    const { playerName } = this.state;
    return (
      <PlayerSearch
        label="Player"
        onSubmit={(player) => this.handleSubmit(player)}
      />
    );
  }
}
