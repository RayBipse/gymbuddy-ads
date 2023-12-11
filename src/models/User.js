import { uploadNewAd } from "../firebase.js";
import { Ad } from "./Ad.js";

export class User {
    constructor(ref, uid, name, email, ads = []) {
        if ([uid, name, email, ads].some((x) => x === undefined || x === null)) {
            throw TypeError(`One of the parameters is null. uid: ${uid}, name: ${name}, email: ${email}, ads: ${ads}`);
        }
        this.ref = ref;
        this.uid = uid;
        this.name = name;
        this.email = email;
        this.ads = ads;
    }

    static fromUserData(userData) {
        return new User(
            userData.ref,
            userData.uid,
            userData.name,
            userData.email,
            userData.ads.map((x) => Ad.fromObject(x))
        );
    }

    static placeholder = new User(null, -1, "", "");

    adsMex() {
        const keys = new Set(this.ads.map((x) => x.key));
        let mex = 0;
        while (keys.has(mex)) {
            ++mex;
        }
        return mex;
    }

    toObject() {
        return {
            ...this,
            ads: this.ads.map((x) => x.toObject()),
        };
    }
}

export function userReducer(user, action) {
    switch (action.type) {
        case "set user": {
            return action.user;
        }
        case "add ad": {
            uploadNewAd(action.ad, user.ref);
            return new User(user.ref, user.uid, user.name, user.email, [...user.ads, action.ad]);
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
