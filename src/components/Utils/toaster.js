import {toast} from 'react-toastify';
/**
 * Success Toaster message.
 * @param {String} message
 */
export function successToaster(message) {
    toast.success(message);
}

export function errorToaster(message){
    toast.error(message);
    // console.log('sagar');
}