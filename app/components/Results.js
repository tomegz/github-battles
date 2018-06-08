import React from "react";
import queryString from "query-string";
import { battle } from "../utils/api";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import PlayerPreview from "./PlayerPreview";

const Player = (props) => (
  <div>
    <h1 className="header">{props.label}</h1>
    <h3 style={{ textAlign: "center" }}>Score: {props.score}</h3>
    <Profile info={props.profile} />
  </div>
)

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
}

const Profile = ({info}) => (
  <PlayerPreview 
    username={info.login}
    avatar={info.avatar_url}
  >
    <ul className="space-list-items">
      {info.name && <li>{info.name}</li>}
      {info.location && <li>{info.location}</li>}
      {info.company && <li>{info.company}</li>}
      <li>Followers: {info.followers}</li>
      <li>Following: {info.following}</li>
      <li>Public repos: {info.public_repos}</li>
      {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
    </ul>
  </PlayerPreview>
)

Profile.propTypes = {
  info: PropTypes.object.isRequired
}

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }
  componentDidMount() {
    const players = queryString.parse(this.props.location.search);
    battle([
      players.playerOneName, 
      players.playerTwoName
    ]).then((results) => {
      if(results === null) {
        this.setState(() => {
          return { 
            error: "Looks like there was an error. Make sure that both users exist on Github.",
            loading: false
          };
        })
      }
      const [winner, loser] = [results[0], results[1]];
      this.setState(() => { 
        return { winner: winner, loser: loser, error: null, loading: false };
      });
    });
  }
  render() {
    const { winner, loser, error, loading } = this.state;
    if(loading) {
      return <p>Loading...</p>
    }
    if(error) {
      return (
        <div>
          <p>{error}</p>
          <Link to="/battle"></Link>
        </div>
      );
    }
    return (
      <div className="row">
        <Player 
          label="Winner"
          score={winner.score}
          profile={winner.profile}
        />
        <Player 
          label="Loser"
          score={loser.score}
          profile={loser.profile}
        />
      </div>
    );
  }
}

export default Results;