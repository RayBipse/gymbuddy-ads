export default function Dashboard({ ads, adIndex }) {
  let cur_ad = {
    key: -1,
    title: "none",
    image_src: "",
    clicks: 0,
    views: 0,
    screenshots: 0,
  };
  ads.forEach((ad) => {
    if (ad.key == adIndex) cur_ad = ad;
  });
  return (
    <section id="dashboard">
      <div className="top">
        <h2 className="title">{cur_ad.title}</h2>
        <button id="pause-button">pause</button>
      </div>
      <div className="metric-box-container">
        <div className="metric-box">
          <div className="metric-label">clicks</div>
          <div className="metric-value">{cur_ad.clicks}</div>
        </div>
        <div className="metric-box">
          <div className="metric-label">views</div>
          <div className="metric-value">{cur_ad.views}</div>
        </div>
        <div className="metric-box">
          <div className="metric-label">screenshots</div>
          <div className="metric-value">{cur_ad.screenshots}</div>
        </div>
      </div>
    </section>
  );
}
