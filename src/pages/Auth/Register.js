import React, { Component } from 'react';
import { Input, Formbtn, ErrElement } from '../../components/Form'
import { Auth } from '../../components/Utils/httpServices'
import { errorToaster, successToaster } from '../../components/Utils/toaster'
import { Link } from 'react-router-dom'
import { history } from '../../App'
import Loader from '../../components/Loader'
import * as firebase from 'firebase';
import { WENT_WRONG, EMAIL_EXISTS, NAME_REQUIRED, FILE_REQUIRED, EMAIL_REQUIRED, EMAIL_NOT_VALID, PASSWORD_REQUIRED, NOT_VALID_PASSWORD, CPASSWORD_REQUIRED, PASSWORD_NOT_MATCH } from '../../components/constant'
import { stat } from 'fs';
class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        cpassword: '',
        selectedfile: '',
        errfile: '',
        erremail: '',
        errpassword: '',
        showpassword: false,
        errcpassword: '',
        showcpassword: false,
        loading: false
    }

    componentDidMount() {

    }

    inputChangeHandler = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    fileChangeHandler = e => {
        this.setState({ selectedfile: e.target.files[0] },
            () => {
                console.log(this.state.selectedfile);


            })
        // console.log(e.target.files[0]);
    }

    uploadHandler = (file) => {
        // console.log(file)

        // imagesRef.put(file).then((snapshot) => {
        //     console.log(snapshot);

        // })
    }

    formSubmitHandler = e => {
        const { name, email, password, cpassword, selectedfile } = this.state;
        e.preventDefault();

        function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        function validatePassword(password) {
            var re = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
            return re.test(String(password));
        }
        let isvalid = true;

        if (!name) {
            isvalid = false;
            this.setState({ errname: NAME_REQUIRED })
        } else {
            this.setState({ errname: '' })

        }

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
        if (!cpassword) {
            isvalid = false;
            this.setState({ errcpassword: CPASSWORD_REQUIRED })
        } else {
            this.setState({ errcpassword: '' })
        }

        if (!password) {
            isvalid = false;
            this.setState({ errpassword: PASSWORD_REQUIRED })
        } else {
            if (!((password.length >= 6) && (validatePassword(password)))) {
                isvalid = false;
                this.setState({ errpassword: NOT_VALID_PASSWORD })
            } else {
                this.setState({ errpassword: '' })
                if (password !== cpassword) {
                    isvalid = false;
                    this.setState({ errcpassword: PASSWORD_NOT_MATCH })
                } else {
                    this.setState({ errcpassword: '' })
                }
            }
        }

        if (!selectedfile) {
            isvalid = false;
            this.setState({ errfile: FILE_REQUIRED })
        } else {
            this.setState({ errfile: '' })
        }

        isvalid && this.callSignupAppi(name, email, password);
    }

    callSignupAppi = (name, email, password) => {
        this.setState({ loading: true })
        let selectedfile = this.state.selectedfile;
        console.log('before change : ', selectedfile);

        // selectedfile.name = email;
        // console.log('after change : ', selectedfile);
        // this.setState({
        //     selectedfile: selectedfile
        // })

        Auth.uploadprofile(email, selectedfile)
        .then((url) => {
            Auth.signup({
                email: email,
                password: password,
                firstname: name,
                profileurl: url
            })
            .then(() => {
                console.log('complete...');
                this.setState({ loading: false })
                successToaster('Registered Successfully...');
                history.push('/login');
            })
            .catch((err) => {
            this.setState({ loading: false })
            errorToaster(err && err.response && err.response.data 
                ? err.response.data
                : WENT_WRONG);
            })
        })


        // Auth.signup({
        //     // name: name,
        //     email: email,
        //     password: password,
        //     firstname: name
        // }).then(Response => {

        //     console.log('upload file called...');

        //     Auth.uploadprofile(email, selectedfile)
        //         .then((url) => {
        //             console.log('result url : ', url);
        //             Auth.register({
        //                 name: name,
        //                 email: email,
        //                 profile: url
        //             }).then(() => {
        //                 console.log('complete...');
        //                 this.setState({ loading: false })
        //                 successToaster('Registered Successfully...');
        //                 history.push('/login');
        //             })
        //         })
        // })
        .catch(err => {
            this.setState({ loading: false })
            // console.log(err && err.response && err.response.data && err.response.data.error && err.response.data.error.message && err.response.data.error.message);
            errorToaster(err && err.response && err.response.data 
                ? err.response.data
                : WENT_WRONG);
            // errorToaster(err && err.response && err.response.data && err.response.data.error && err.response.data.error.message &&
            //     err.response.data.error.message == 'EMAIL_EXISTS'
            //     ? EMAIL_EXISTS
            //     : WENT_WRONG);
        });
    }

    render() {
        const { name, email, password, cpassword, errname, errfile, erremail, errcpassword, errpassword } = this.state;
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col"></div>
                    <div className="col">
                        <form>
                            <Input
                                type="text"
                                placeholder="Name"
                                name="name"
                                value={name}
                                onChange={this.inputChangeHandler}
                            />
                            {errname && <ErrElement>{errname}</ErrElement>}
                            <Input
                                type="text"
                                placeholder="Email"
                                name="email"
                                value={email}
                                onChange={this.inputChangeHandler}
                            />
                            {erremail && <ErrElement>{erremail}</ErrElement>}
                            <Input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={this.inputChangeHandler}
                            />
                            {errpassword && <ErrElement>{errpassword}</ErrElement>}
                            <Input
                                type="password"
                                placeholder="Confirm Password"
                                name="cpassword"
                                value={cpassword}
                                onChange={this.inputChangeHandler}
                            />
                            {errcpassword && <ErrElement>{errcpassword}</ErrElement>}
                            <Input
                                type="file"
                                onChange={this.fileChangeHandler}
                            />
                            {errfile && <ErrElement>{errfile}</ErrElement>}
                            <Formbtn onClick={(e) => { this.formSubmitHandler(e) }}>
                                Sign up
                            </Formbtn>
                            <Link to={'/login'}>Go to Login --></Link>
                        </form>
                    </div>
                    <div className="col"></div>
                </div>
                {this.state.loading && <Loader />}
            </React.Fragment>
        )
    }
}

export default Register;