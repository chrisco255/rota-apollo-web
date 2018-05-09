import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const query = gql`
  {
    hello {
      email
      id
      onboardingComplete
      displayName
    }
  }
`;

class Home extends Component {
  login() {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {
          isAuthenticated() && (
              <Query query={query}>
                {({ loading, error, data }) => {
                  if (loading) return <h4>Spinning...</h4>
                  if (error) return <h4>Error...</h4>

                  return <h4>Logged In: {Object.keys(data.hello).map(key => data.hello[key])}</h4>
                }}
              </Query>
            )
        }
        {
          !isAuthenticated() && (
              <h4>
                You are not logged in! Please{' '}
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={this.login.bind(this)}
                >
                  Log In
                </a>
                {' '}to continue.
              </h4>
            )
        }
      </div>
    );
  }
}

export default Home;
