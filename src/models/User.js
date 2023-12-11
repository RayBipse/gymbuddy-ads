export class User {
    constructor(userRef, uid, name, email, ads = []) {
        if ([userRef, uid, name, email, ads].some((x) => x === undefined || x === null)) {
            throw TypeError(`One of the parameters is null. uid: ${uid}, name: ${name}, email: ${email}, ads: ${ads}`);
        }
        this.uid = uid;
        this.name = name;
        this.email = email;
        this.ads = ads;
    }
}

export function userReducer(user, action) {
    switch (action.type) {
        case "set user": {
            return action.user;
        }
        case "add ad": {
            return new User(user.uid, user.name, user.email, [...user.ads, action.ad]);
        }
        case "remove ad": {
            return new User(
                user.uid,
                user.name,
                user.email,
                user.ads.filter((x) => x.key !== action.key)
            );
        }
    }
}
