export class Ad {
    constructor(key, title, image_src, clicks, views, screenshots) {
        this.key = key;
        this.title = title;
        this.image_src = image_src;
        this.clicks = clicks;
        this.views = views;
        this.screenshots = screenshots;
    }

    fromNewAd(key, title, image_src) {
        return new Ad(key, title, image_src, 0, 0, 0);
    }

    static placeholder = new Ad(-1, "none", "", 0, 0, 0);
}
