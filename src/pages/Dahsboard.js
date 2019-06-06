import React, { Component } from 'react';
import { Getuserdata } from '../components/Utils/httpServices'
import { Profile } from '../components/Form'
import Loader from '../components/Loader'
class Dashboard extends Component {

    constructor(props){
        super(props);
        console.log('dashboard : constructor');
        
    }

    state = {
        name: '',
        profile: '',
        loading: false
    }

    // static getDerivedStateFromProps() {
    //     console.log('dashboard : getDerivedStateFromProps');
        
    // }

    componentDidUpdate() {
        console.log('dhashboard : componentDidUpdate');
    }

    componentWillUnmount(){
        console.log('dashboard : componentWillUnmount');
        
    }

    changestate = () => {

        this.setState({
            name: 'sagar'
        },() => {
            console.log('dashboard : state changed');
            
        })
    }
    componentDidMount() {
        
    console.log('dhashboard : componentDidMount');
        
        
        // this.setState({
        //     loading: true
        // })
        // Getuserdata()
        //     .then(Response => {
        //         let email = localStorage.getItem('email');
        //         let data = Response.data;
        //         for (let user in data) {
        //             console.log(data[user].email);
        //             if (data[user].email == email) {
        //                 localStorage.setItem('name', data[user].name);
        //                 localStorage.setItem('profile', data[user].profile);
        //                 this.setState({
        //                     loading: false,
        //                 })
        //                 break;
        //             }
        //             // console.log(data[user].email);
        //         }
        //         // console.log(Response.data);
        //     })
        //     .catch(err => {
        //         console.log('err : ', err);
                
        //     })
    }

    render() {
        console.log('render');
        

        const user = this.state.loading ?
            <Loader />
            :
            <div>
                <h1>Dashboard</h1>
                <Profile src={localStorage.getItem('profile')} />
                <h3>hello, {localStorage.getItem('name')}</h3>
                <h3>hello, {this.state.name}</h3>
                <button onClick={this.changestate} >click to change name</button>
            </div>

        return (
            user
        )
    }
}

export default Dashboard;