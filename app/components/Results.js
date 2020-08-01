import React from "react";
import { battle } from "../utils/api";

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
      looser: null,
      error: null,
    };
  }
  componentDidMount() {
    const { playerOne, playerTwo } = this.props;

    battle([playerOne, playerTwo])
      .then((players) =>
        this.setState({
          winner: players[0],
          looser: players[1],
          loading: false,
        })
      )
      .catch(({ message }) => {
        console.log(error);
        this.setState({
          error: message,
          loading: false,
        });
      });
  }
  render() {
    return (
      <div>
        Results
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }
}
