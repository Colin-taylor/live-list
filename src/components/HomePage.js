import React, { Component } from 'react'
import { IconButton } from 'material-ui';
import firebase from 'firebase/app';
import autoBind from 'react-autobind';
import base from '../Rebase.config';
import ErrorMessage from './ErrorMessage';
import TopBanner from './TopBanner';
const styles = {
    largeIcon: {
        fontSize: '3rem',
    },
};


class HomePage extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            open: false,
            error: ''
        };
        this.providers = ['google', 'github', 'twitter'];
    }
    componentWillMount() {
        this.initApp().then(user => this.addUserObj(user));
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
             if(user) this.props.router.push('/dashboard');
        });

        this.getHilariousJoke();
    }

    initApp() {
        return new Promise((resolve, reject) => {
        firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.

          resolve(result.user)
        } else {
            reject('not logged in')
          // [END_EXCLUDE]
        }
        // The signed-in user info.
        // var user = result.user;
      }).catch(error => {
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // The email of the user's account used.

        this.openDialog(error.message)


        reject(error)

        });
      })
    }
    addUserObj(user) {
        let context = this;
        let {uid} = user;
        base.post(`users/${uid}`, {
            data: {email: user.email},
            then(err){
             if(!err){
                context.props.router.push('/dashboard')
            }
        }
        });
    }
    onSignUpClick(type) {
        let provider;
        switch (type) {
            case 'google':
                provider = new firebase.auth.GoogleAuthProvider();
                provider.addScope('email');
                provider.addScope('https://www.googleapis.com/auth/plus.login');
                break;
            case 'github':
                provider = new firebase.auth.GithubAuthProvider();
                provider.addScope('repo');
                break;
            case 'twitter':
                provider =  new firebase.auth.TwitterAuthProvider();
                break;
            default:
                console.error('no type provided!')
                break;
        }

        firebase.auth().signInWithRedirect(provider);
    }

    openDialog(error) {
        this.setState({
            open: true,
            error,
         });
    }
    handleClose() {
        this.setState({
            open: false,
            error: '',
         });
    }

    getHilariousJoke() {
      fetch('http://api.icndb.com/jokes/random')
        .then(response => response.json())
        .then(data => {
          this.setState({ hilariousJoke: data.value.joke });
        })
        .catch(error => console.error(error));
    }

    render() {
        const { hilariousJoke } = this.state;

        return (

            <div className="content center-xs">
                <h1>{hilariousJoke}</h1>
                <button onClick={this.getHilariousJoke}>
                  Get Another Hilarious Joke!!!
                </button>
                <h1>🦄🦄🦄🦄</h1>
                <div className="row center-xs">
                {this.providers.map( (p, i) => (
                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12" key={i}>
                            <IconButton iconClassName={`fa fa-${p}`}
                            iconStyle={styles.largeIcon}
                            onClick={() => this.onSignUpClick(p)}
                            />
                        <h3>Sign in with {p}</h3>
                    </div>
                ))}
                </div>
                <ErrorMessage
                handleClose={this.handleClose}
                open={this.state.open}
                text={this.state.error}/>

            </div>

        )
    }
}

export default HomePage;
