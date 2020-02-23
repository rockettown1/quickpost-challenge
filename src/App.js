import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    currentTitle: "",
    currentURL: "",
    posts: [],
    showPostForm: true,
    user: null
  };

  async componentDidMount() {
    //fetching some dummy data for user profile
    const response = await fetch("https://randomuser.me/api/");
    //throw the above url into the browser if you want to see what json data you get back.
    const data = await response.json();

    this.setState({ user: data.results[0] });
  }

  titleChangeHandler = event => {
    this.setState({ currentTitle: event.target.value });
  };

  imgChangeHandler = event => {
    this.setState({ currentURL: event.target.value });
  };

  addPostHandler = () => {
    const temp = { title: "", url: "" };
    temp.title = this.state.currentTitle;
    temp.url = this.state.currentURL;
    const newPosts = [...this.state.posts];
    newPosts.push(temp);

    this.setState({ posts: newPosts, currentTitle: "", currentURL: "" });
  };

  showFormHandler = () => {
    this.setState({ showPostForm: !this.state.showPostForm });
  };

  render() {
    return (
      <div className="container">
        <div className={this.state.showPostForm ? "input-container show" : "input-container hide"}>
          <input
            className="title"
            type="text"
            placeholder="enter a title"
            onChange={this.titleChangeHandler}
            value={this.state.currentTitle}
          />
          <input
            className="image-url"
            type="text"
            placeholder="enter your image url"
            onChange={this.imgChangeHandler}
            value={this.state.currentURL}
          />
          <button onClick={this.addPostHandler}>Add Posts</button>
        </div>

        <div className="collection">
          {this.state.user && (
            <div className="profile-info">
              <div className="avatar-container">
                <img src={this.state.user.picture.medium} />
              </div>
              <h3>{this.state.user.name.first}</h3>
            </div>
          )}
          <button className="addPost" onClick={this.showFormHandler}>
            Add a post
          </button>
          <h1>Posts</h1>
          {this.state.posts.map(post => {
            return (
              <div className="post">
                <h1>{post.title}</h1>
                <img src={post.url} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
