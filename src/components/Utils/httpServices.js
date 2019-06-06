import React, {useState} from 'react'
import axios from 'axios';
import * as firebase from 'firebase'
import { history } from '../../App';
// import * as admin from 'firebase-admin';
// import { getMaxListeners } from 'cluster';

// axios.defaults.baseURL = '';

var config = {
    apiKey: "AIzaSyB92VHBlHAzgkU362DQ96A9dUJBB-dBYdc",
    authDomain: "user-fb791.firebaseapp.com",
    databaseURL: "https://user-fb791.firebaseio.com",
    projectId: "user-fb791",
    storageBucket: "user-fb791.appspot.com",
    messagingSenderId: "177776711302",
    appId: "1:177776711302:web:5478ed50b40f7660"
};
firebase.initializeApp(config);
const Auth = {
    //user login
    login: data => {
        // return axios.post('',data);
        console.log('log in api ...');
        console.log(data);
        let loginurl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB92VHBlHAzgkU362DQ96A9dUJBB-dBYdc';
        return axios.post('http://127.0.0.1:3200/users/login', data);
    },
    //user signup
    signup: data => {
        // return axios.post('',data);
        console.log('sign up api ...');
        console.log(data);
        // let signupurl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB92VHBlHAzgkU362DQ96A9dUJBB-dBYdc';
        return axios.post('http://127.0.0.1:3200/users/register', data);
    },
    forgotpass: data => {
        // return axios.post('',data);
        console.log('Forgot password api ...');
        console.log(data);
        // let signupurl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB92VHBlHAzgkU362DQ96A9dUJBB-dBYdc';
        return axios.post('http://127.0.0.1:3200/users/forgotpasswordrequest', data);
    },
    register: data => {
        console.log('registration data api ...');
        console.log(data);
        // let registrationapi = 'https://user-fb791.firebaseio.com/users.json';
        // return axios.post(registrationapi, data);
    },
    uploadprofile: (email, data) => {
        console.log('upload file ...');

        var storageRef = firebase.storage().ref();

        // Create a child reference
        var imagesRef = storageRef.child('profiles/' + email);
        // imagesRef now points to 'images'

        // Child references can also take paths delimited by '/'
        // var spaceRef = storageRef.child('images/space.jpg');
        // spaceRef now points to "images/space.jpg"
        // imagesRef still points to "images"
        // console.log('upload file 2 ...');
        // console.log(imagesRef);
        // imagesRef.put(data).then((snapshot) => {
        //     console.log(snapshot);
        
        // })

        console.log('uploading ', data);
        return imagesRef.put(data).then(() => {
            return imagesRef.getDownloadURL().then((url) => {
                return url
            })
        });
    }
}


const Getuserdata = () => {
    // let database = firebase.database();
    // let data = null;
    // let udata = '';
    // let email = localStorage.getItem('email');
    // const data = {
        //     name: "sagar",
        //     email: "test@test.com",
        //     profile: 'sdfsdfsdf'
        //   }
        // const token = localStorage.getItem('token');
        // axios.get('https://user-fb791.firebaseio.com/users.json?orderBy="$key"&equalTo="user1"&print=pretty')
        // let getuserdataurl = "https://user-fb791.firebaseio.com/users.json?auth=" + localStorage.getItem('token');
        let getuserdataurl = "https://user-fb791.firebaseio.com/users.json";
        return axios.get(getuserdataurl)
        // .then(Response => {
            //     let data = Response.data;
            //     for (let user in data) {
        //         console.log(data[user].email);
        //         if (data[user].email == email) {
        //             localStorage.setItem('name', data[user].name);
        //             localStorage.setItem('profile', data[user].profile);
        //         }
        //         // console.log(data[user].email);
        //     }
        //     // console.log(Response.data);
        // })
}

export { Auth, Getuserdata }