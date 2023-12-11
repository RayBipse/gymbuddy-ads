import { Ad } from "../models/Ad";

export default function Dashboard({ user, adIndex }) {
    const ad = user.ads.find((x) => x.key === adIndex) || Ad.placeholder;

    return (
        <section id="dashboard">
            <div className="top">
                <h2 className="title">{ad.title}</h2>
                <button id="pause-button">pause</button>
            </div>
            <div className="metric-box-container">
                <div className="metric-box">
                    <div className="metric-label">clicks</div>
                    <div className="metric-value">{ad.clicks}</div>
                </div>
                <div className="metric-box">
                    <div className="metric-label">views</div>
                    <div className="metric-value">{ad.views}</div>
                </div>
                <div className="metric-box">
                    <div className="metric-label">screenshots</div>
                    <div className="metric-value">{ad.screenshots}</div>
                </div>
            </div>
            <div className="image-container">
                <img src={ad.image_src} alt="ad"></img>
            </div>
        </section>
    );
}
