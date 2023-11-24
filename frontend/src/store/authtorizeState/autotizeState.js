import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';


const getIsAuthorize = () => {
    const authData = localStorage.getItem('isAuthorize');

    if (authData !== null) {
        const parsedAuthData = JSON.parse(authData);
        return parsedAuthData.isAuthorize;
    }
    return false;
};

class AutorizeState {
    demoUser =
        {
        email: 'testLogIn@testLogIn.com',
        password: 'testPassword',
    };

    user = {
        id: 0,

        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        image: '',
    };

    isAuthorize = false;
    token = '';

    constructor() {
        makeAutoObservable(this);

        makePersistable(this, {
            name: 'AuthStore',
            properties: ['isAuthorize', 'token'],
            storage: window.localStorage,
        });

        this.isAuthorize = getIsAuthorize();
    }

    setIsAutorize = (isAuthorize = false) => {
        this.isAuthorize = isAuthorize;
    };


    checkAuth = (errorText) => {
        const isAuthError = errorText === 401;
        this.isAuthorize = !isAuthError;
    };
}

const autorizeState = new AutorizeState();
export default autorizeState;
