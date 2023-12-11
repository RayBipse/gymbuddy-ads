import { uploadNewAd } from "../firebase.js";

export class User {
    constructor(ref, uid, name, email, ads = []) {
        if ([ref, uid, name, email, ads].some((x) => x === undefined || x === null)) {
            throw TypeError(`One of the parameters is null. uid: ${uid}, name: ${name}, email: ${email}, ads: ${ads}`);
        }
        this.uid = uid;
        this.name = name;
        this.email = email;
        this.ads = ads;
    }

    static fromUserData(userData) {
        return new User(userData.ref, userData.uid, userData.name, userData.email, userData.ads);
    }
}

export function userReducer(user, action) {
    switch (action.type) {
        case "set user": {
            return action.user;
        }
        case "add ad": {
            uploadNewAd(action.ad, user.ref);
            return new User(user.uid, user.name, user.email, [...user.ads, action.ad]);
        }
        case "remove ad": {
            return new User(
                user.ref,
                user.uid,
                user.name,
                user.email,
                user.ads.filter((x) => x.key !== action.key)
            );
        }
        default: {
            throw Error(`$Unknown action: ${action.type}`);
        }
    }
}
