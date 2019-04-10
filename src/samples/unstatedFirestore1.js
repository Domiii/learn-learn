import React, { Component } from 'react';
import { Container, Subscribe } from 'unstated';
import connect from 'connect';
import { fs } from 'api/firebase';

class Users extends Container {
  state = {};
  unsubs = {};

  contributors() {
    if (!this.unsubs.all) {
      //console.log(auth.currentUser);
      //this.setState({ value: auth.currentUser });
      this.unsubs.all = fs.collection('users').where('title', '==', 'contributor').onSnapshot(contributors => {
        //console.log('onAuthStateChanged', user);
        this.setState({ contributors });
      });
    }
    return this.state.contributors;
  }

}

class Posts extends Container {
  state = {};
  unsubs = { ofUser: {} };

  allContributorPosts(users) {
    const contributors = users.contributors();
    let contributorPosts;
    if (contributors) {
      contributorPosts = contributors.docs.map(doc => this.ofUser(doc.id).map(post => post.data()));
    }
    return contributorPosts;
  }

  ofUser(uid) {
    if (!this.unsubs.ofUser[uid]) {
      this.unsubs.ofUser[uid] = fs.collection('posts').where('uid', '==', uid).onSnapshot(posts => {
        const ofUser = this.state.ofUser || {};
        ofUser[uid] = posts;
        this.setState({
          ofUser
        });
      });
      return undefined;
    }
    return this.state.ofUser[uid];
  }
}

const getUserPosts = connect(Users, Posts)(
  function UserPosts() {
    return Comp => {
      const {
        users,
        posts
      } = this.props;

      return <Comp contributorPosts={posts.allContributorPosts(users)} {...this.props} />;
    };
  }
);

@getUserPosts()
class MyComponent extends Component {
  render() {
    const { contributorPosts } = this.props;

    return (<pre>{
      `contributorPosts:
${JSON.stringify(contributorPosts)}`
    }</pre>);
  }
}