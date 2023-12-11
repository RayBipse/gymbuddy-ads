export class Ad {
    constructor(key, title, image_src, clicks, views, screenshots) {
        this.key = key;
        this.title = title;
        this.image_src = image_src;
        this.clicks = clicks;
        this.views = views;
        this.screenshots = screenshots;
    }

    static fromNewAd(key, title, image_src) {
        return new Ad(key, title, image_src, 0, 0, 0);
    }

    static fromObject({ key, title, image_src, clicks, views, screenshots }) {
        return new Ad(key, title, image_src, clicks, views, screenshots);
    }

    static placeholder = new Ad(-1, "none", "", 0, 0, 0);

    toObject() {
        return { ...this };
    }

    // return object for public
    toPublic(user) {
        return {
            author: user.uid,
            image_src: this.image_src,
        };
    }
}
