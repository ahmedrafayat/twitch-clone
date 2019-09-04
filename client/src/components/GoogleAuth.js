import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions'

class GoogleAuth extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         isSignedIn: null
    //     }
    // }
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '1045438476494-g3i4pmff9avtsajdal5ukiufr8rk10g6.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());        //calls sign in action to update issignedin status to true
        }
        else {
            this.props.signOut();       //calls sign in action to update issignedin status to true
        }
    }

    renderAuthStatus() {
        const { isSignedIn } = this.props;

        if (isSignedIn === null) {
            return null
        } else if (isSignedIn) {
            return (
                <div>
                    <button onClick={this.onSignOutClick} className="ui red google button">
                        <i className="icon google"></i>
                        Sign out
                    </button>
                </div>
            )
        } else {
            return (
                <div>
                    <button onClick={this.onSignInClick} className="ui red google button">
                        <i className="icon google"></i>
                        Sign in with Google
                    </button>
                </div>
            )
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    render() {
        return this.renderAuthStatus()

    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps,
    { signIn, signOut }
)(GoogleAuth);