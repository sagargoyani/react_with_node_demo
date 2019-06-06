function isAuthenticated() {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');

    if(token && user){
        return true;
    }else{
        return false;
    }
}

function getAuthUser() {
    let user = localStorage.getItem('user');

    return user ? user : null;

}

export { isAuthenticated, getAuthUser };