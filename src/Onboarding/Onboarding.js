import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const query = gql`
  {
    userInfo {
      email
      id
      onboardingComplete
      displayName
    }
  }
`;

const mutation = gql`
  mutation onboardUser($name: String!) {
    onboardUser(name: $name) {
      id
      displayName
      onboardingComplete
    }
  }
`

class Onboarding extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ name: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();

        this.onboardUser({ variables: { name: this.state.name }});
    }
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

                    const { onboardingComplete } = data.userInfo;

                    return (
                        <div>
                            {
                                !onboardingComplete && (
                                    <div>
                                        <h4>Enter your name: </h4>
                                        <Mutation mutation={mutation}>
                                            {onboardUser => {
                                                this.onboardUser = onboardUser;

                                                return(
                                                    <form onSubmit={this.handleSubmit}>
                                                        <label>
                                                            Name:
                                                            <input type="text" value={this.state.name} onChange={this.handleChange} />
                                                        </label>
                                                        <input type="submit" value="Submit" />
                                                    </form>
                                                );
                                            }}
                                        </Mutation>
                                    </div>
                                )
                            }
                            {
                                onboardingComplete && (
                                    <div>You've already completed onboarding</div>
                                )
                            }
                        </div>
                        
                    );
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

export default Onboarding;
