import React, { Component } from 'react';
import { Input, Formbtn, ErrElement } from '../../components/Form'
import { errorToaster, successToaster } from '../../components/Utils/toaster';
import {EMAIL_NOT_FOUND, INVALID_PASSWORD, WENT_WRONG, EMAIL_EXISTS, EMAIL_REQUIRED, EMAIL_NOT_VALID, PASSWORD_REQUIRED, } from '../../components/constant'
// import Nav from './components/Nav'
// import {toast} from 'react-toastify';
import { Auth } from '../../components/Utils/httpServices'
import { history } from '../../App'
import Loader from '../../components/Loader'
import { Link } from 'react-router-dom'


class Login extends Component {
    constructor(props){
        super(props);
        console.log('login : constructor');
        
    }
    state = {
        email: '',
        password: '',
        erremail: '',
        errpassword: '',
        loading: false,
        date: null
    }

    componentDidCatch(){
        console.log('login: componentDidCatch');
        
    }
    static getDerivedStateFromProps(props, state){
        console.log('login : getDerivedStateFromProps', state);
        return null;
    }
    getSnapshotBeforeUpdate(precprops, prevstate){
        console.log('login : getSnapshotBeforeUpdate', prevstate);
        return null
    }
    componentDidMount = () => {
        console.log('login : componentDidMount');
        // this.timerID = setInterval(
        //     () => this.tick(),
        //     1000
        //   );
     }
     componentWillUnmount() {
        console.log('login : componentWillUnmount');
    }
    shouldComponentUpdate(){
        console.log('login : shouldComponentUpdate');
        return true;
        
    }
    tick() {
        console.log('login : tick', this.state.date);
        
            this.setState({
            date: new Date()
            });
      }
    inputChangeHandler = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    formSubmitHandler = e => {

        const { email, password, cpassword } = this.state;
        e.preventDefault();

        function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        let isvalid = true;

        if (!email) {
            isvalid = false;
            this.setState({ erremail: EMAIL_REQUIRED })
        } else {
            if (!validateEmail(email)) {
                isvalid = false;
                this.setState({ erremail: EMAIL_NOT_VALID })
            } else {
                this.setState({ erremail: '' })
            }
        }
        
        if (!password) {
            isvalid = false;
            this.setState({ errpassword: PASSWORD_REQUIRED })
        } else {
            this.setState({ errpassword: '' })
        }
        isvalid && this.callLoginApi(email, password)
    }

    callLoginApi = (email, password) => {
        this.setState({loading: true})
        Auth.login({
            email: email,
            password: password
        }).then(Response => {
            this.setState({loading: false})
            console.log(Response.data);
            localStorage.setItem('token', Response && Response.data && Response.data.token && Response.data.token);
            localStorage.setItem('email', email);
            localStorage.setItem('name', Response && Response.data && Response.data.Users && Response.data.Users.firstname && Response.data.Users.firstname);
            localStorage.setItem('profile', Response && Response.data && Response.data.Users && Response.data.Users.profileurl && Response.data.Users.profileurl);
            localStorage.setItem('user',JSON.stringify(Response.data))
            // localStorage.setItem('user', Response.data);
            successToaster('logged in successfully...')
            history.push('/dashboard');
        }).catch(err => {
            this.setState({loading: false})
            // console.log(err && err.response && err.response.data && err.response.data.error && err.response.data.error.message);
            console.log(err && err.response && err.response.data && err.response.data);
            errorToaster(err && err.response && err.response.data 
                ? err.response.data
                : WENT_WRONG);
            // errorToaster(err && err.response && err.response.data && err.response.data.error && err.response.data.error.message &&
            //     err.response.data.error.message == 'EMAIL_NOT_FOUND' 
            //     ? EMAIL_NOT_FOUND 
            //     : err.response.data.error.message == 'INVALID_PASSWORD'
            //     ? INVALID_PASSWORD
            //     :WENT_WRONG);
        })
    }

    

    render() {
        console.log('login : render');
        
        const { email, password, erremail, errpassword } = this.state;
        return (
            <React.Fragment>
                {this.state.date && this.state.date.toLocaleString()}
            <div className="row">
                <div className="col">
                    {/* <h1>this is login </h1> */}
                </div>
                <div className="col">
                    <Input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={this.inputChangeHandler}
                    />
                    {erremail && <ErrElement>{erremail}</ErrElement>}
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={this.inputChangeHandler}
                    />
                    {errpassword && <ErrElement>{errpassword}</ErrElement>}
                    <Formbtn onClick={(e) => { this.formSubmitHandler(e) }}>
                        Login
                </Formbtn>
                <Link to={'/forgotpass'}>Foroget Password --></Link><br />
                <Link to={'/register'}>Go to Register --></Link>
                </div>
                <div className="col">
                </div>
                {this.state.loading && <Loader />}
            </div>
            </React.Fragment>
        )
    }
}

export default Login;