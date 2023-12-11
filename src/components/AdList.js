export default function AdList({ user, adIndex, setAdIndex }) {
    let adItems = user.ads.map((ad) => {
        return (
            <li key={ad.key}>
                <button onClick={() => setAdIndex(ad.key)} className={adIndex === ad.key ? "selected" : ""}>
                    {ad.title}
                </button>
            </li>
        );
    });
    return (
        <section id="ad-list">
            <h2 className="title">My ads</h2>
            <div className="divider"></div>
            <ol className="list">{adItems}</ol>
        </section>
    );
}
