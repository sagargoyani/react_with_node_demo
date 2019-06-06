import React, { Component } from 'react';
import { Input, Formbtn, ErrElement } from '../../components/Form'
import { errorToaster, successToaster } from '../../components/Utils/toaster';
import { WENT_WRONG, EMAIL_REQUIRED, EMAIL_NOT_VALID } from '../../components/constant'
import { Auth } from '../../components/Utils/httpServices'
import { history } from '../../App'
import Loader from '../../components/Loader'
import { Link } from 'react-router-dom'


class Forgotpass extends Component {
    state = {
        email: '',
        erremail: '',
        loading: false
    }
    componentDidMount = () => { }
    inputChangeHandler = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    formSubmitHandler = e => {

        const { email } = this.state;
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
        isvalid && this.callforgotpassapi(email)
    }

    callforgotpassapi = (email) => {
        this.setState({loading: true})
        Auth.forgotpass({
            email: email
        }).then(Response => {
            this.setState({loading: false})
            console.log(Response.data);
            successToaster('Password reset mail sent successfully...')
            history.push('/login');
        }).catch(err => {
            this.setState({loading: false})
            console.log(err && err.response && err.response.data && err.response.data.error && err.response.data.error.message);
            errorToaster(WENT_WRONG);
        })
    }

    componentWillUnmount() {
        console.log('login : componentWillUnmount');
    }

    render() {
        const { email, erremail } = this.state;
        return (
            <React.Fragment>
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
                    <Formbtn onClick={(e) => { this.formSubmitHandler(e) }}>
                        Send Reset Mail
                </Formbtn>
                <Link to={'/login'}>Go to Login --></Link>
                </div>
                <div className="col">
                </div>
                {this.state.loading && <Loader />}
            </div>
            </React.Fragment>
        )
    }
}

export default Forgotpass;