export function NewAdButton({ setAds, toggleNewAdModal }) {
  return <button onClick={toggleNewAdModal}>Upload New ad</button>;
}

export function NewAdPopup({ isNewAdModalOpen }) {
  return (
    <section className={isNewAdModalOpen ? "" : "no-display"}>
      <h2>New Ad</h2>
      <form method="post">
        <label>Title</label>
        <input type="text"></input>
        <label>Image</label>
        <input type="file" alt="ad image"></input>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}
