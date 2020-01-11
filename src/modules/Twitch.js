import React, { Component } from "react";
import qs from "qs";
import { getUser, getUserFollows } from "../api";
import Following from "../components/Following";
import styled from "styled-components";

// const callbackUrl = "http://localhost:3000";
const callbackUrl =
  "http://azd-twitch-unfollow.s3-website-ap-southeast-1.amazonaws.com";

const client_id = "abe73ozfqy326zt1asikhewymrk43f";
const scopes = "user_follows_edit+user_read+viewing_activity_read+openid";

const Button = styled.a`
  background-color: #6441a4;
  color: #fff;
  padding: 0.5rem 1rem;
  position: relative;
  margin: 0;
  transition: background 0.12s ease-in, color 0.12s ease-in,
    box-shadow 0.12s ease-in;
  font-size: 12px;
  font-weight: 400;
  text-decoration: none;
  display: inline-block;
  margin: 1rem;
  cursor: pointer;
`;

class Twitch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      following: [],
      page: 0,
      count: 1000
    };
  }
  componentDidMount() {
    const {
      location: { hash }
    } = this.props;
    const _hash = hash.substr(1, hash.length);
    const { access_token } = qs.parse(_hash);
    if (access_token) {
      localStorage.setItem("TWITCH_APP", access_token);
      getUser().then(res => {
        const { _id } = res.data;
        this.setState({
          id: _id
        });

        this.onGetUserFollows(_id);
      });
    }
  }
  onGetUserFollows = (id, offset) => {
    getUserFollows({ id, offset }).then(res => {
      this.setState({ following: res.data.follows, page: this.state.page + 1 });
    });
  };
  handleRemove = () => {
    let promises = [];
    // const remove = this.state.following
    //   .filter(item => item.channel.followers < this.state.count)
    //   .forEach(item => {
    //     promises.push(
    //       removeUserFollows({ id: this.state.id, channel_id: item.channel._id })
    //     );
    //   });

    Promise.all(promises).then(res => {
      this.onGetUserFollows(this.state.id, this.state.page);
    });
  };
  handleNext = () => {
    this.onGetUserFollows(this.state.id, this.state.page);
  };
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const {
      location: { hash }
    } = this.props;
    const _hash = hash.substr(1, hash.length);
    const { access_token } = qs.parse(_hash);

    return (
      <div className="App">
        {!access_token && (
          <Button
            href={`https://id.twitch.tv/oauth2/authorize?response_type=token+id_token&client_id=${client_id}&redirect_uri=${callbackUrl}&scope=${scopes}`}
          >
            Login
          </Button>
        )}
        <Following items={this.state.following} count={this.state.count} />
        {!!this.state.following.length && (
          <React.Fragment>
            <label>Minimum number of followers</label>
            <input
              type="number"
              name="count"
              value={this.state.count}
              onChange={this.handleInputChange}
            />
            <Button onClick={this.handleRemove}>Remove</Button>
            <Button onClick={this.handleNext}>Next</Button>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Twitch;
