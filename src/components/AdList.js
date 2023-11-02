export default function AdList({ ads, adIndex, handleAdIndex }) {
  function adOnClick(i) {
    console.log(ads, i);
    return () => {
      handleAdIndex(i);
    };
  }
  let adItems = ads.map((ad) => {
    return (
      <li key={ad.key}>
        <button
          onClick={adOnClick(ad.key)}
          className={adIndex === ad.key ? "selected" : ""}
        >
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
