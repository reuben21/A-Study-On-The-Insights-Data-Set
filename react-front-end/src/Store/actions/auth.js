import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = (token, admin_priority, subscriber_priority, journalist_priority) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        admin_priority: admin_priority,
        subscriber_priority: subscriber_priority,
        journalist_priority: journalist_priority

    };
}


export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error

    };
}

export const logout = () => {
    // console.log("ENTERED ACTIONS?AUTH JS LOGOUT")
    localStorage.removeItem('token');
    localStorage.removeItem('admin_priority');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('subscriber_priority');
    localStorage.removeItem('journalist_priority');
    localStorage.removeItem('profile_picture');
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())

        }, expirationTime * 1000)
    }
}

export const authLogin = (email_id, password) => {
    return dispatch => {
        dispatch(authStart());
        fetch('http://127.0.0.1:8000/users/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                email_id: email_id,
                password: password
            })
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                const token = data.jwt_token;
                const admin_priority = data.admin_access;
                const subscriber_priority = data.suscriber_access;
                const journalist_priority = data.journal_access;
                const profile_picture = data.profile_picture;
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                console.log("AUTH LOGIN DATA PRINTING", token,"\n",
                admin_priority,"\n",
                subscriber_priority,"\n",
                journalist_priority,"\n",
                profile_picture,"\n",
                expirationDate)
                localStorage.setItem('token', token);
                localStorage.setItem('email_id', email_id);
                localStorage.setItem('admin_priority', admin_priority);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('subscriber_priority', subscriber_priority);
                localStorage.setItem('journalist_priority', journalist_priority);
                localStorage.setItem('profile_picture', profile_picture);
                dispatch(authSuccess(token, admin_priority, subscriber_priority, journalist_priority))
                dispatch(checkAuthTimeout(3600));

            })
            .catch((error) => {
                dispatch(authFail(error))
                console.log(error);
            });


    };
}

export const authSignup = (first_name, last_name, email_id, password, date, phone_no, gender) => {
    return dispatch => {
        dispatch(authStart());
        const dataReceivedAfterSubmitting = fetch('http://127.0.0.1:8000/users/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                firstname: first_name,
                lastname: last_name,
                email_id: email_id,
                password: password,
                date: date,
                phone_no: phone_no,
                gender: gender,
            })
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)

                return data


            })
            .catch((error) => {
                dispatch(authFail(error))
               return error;
            });
        return dataReceivedAfterSubmitting;


    };
}



export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const admin_priority = localStorage.getItem('admin_priority');
        // console.log("AUTH CHECK STATE ", token);
        if (token === null || token === 'undefined') {

            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= Date()) {
                dispatch(logout())
            } else {
                dispatch(authSuccess(token, admin_priority))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}


export const fetchWorldNews = () => {
    return dispatch => {
        return fetch('http://127.0.0.1:8000/world-grid/world/', {
            method: 'GET',
            // headers: {
            //     'Content-Type': 'application/json'
            //     // 'Content-Type': 'application/x-www-form-urlencoded',
            // },
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                return data;
            }).catch((error) => {
                return error;
            })



    };
}
