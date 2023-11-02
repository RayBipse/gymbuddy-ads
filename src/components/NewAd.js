import { uploadNewAd } from "../firebase.js";

export function NewAdButton({ setAds, toggleNewAdModal }) {
  return <button onClick={toggleNewAdModal}>Upload New ad</button>;
}

export function NewAdPopup({
  toggleNewAdModal,
  isNewAdModalOpen,
  userRef,
  setAds,
  ads,
}) {
  const onUploadClick = !userRef
    ? () => {}
    : () => {
        console.log("hi");
        setAds([
          ...ads,
          {
            key: 1,
            title: "hello",
            image_src:
              "https://as1.ftcdn.net/v2/jpg/02/09/65/14/1000_F_209651427_Moux8Hkey15wtMbtLymbPPrdrLhm58fH.jpg",
            clicks: 0,
            views: 0,
            screenshots: 0,
          },
        ]);
        uploadNewAd(
          {
            key: 1,
            title: "hello",
            image_src:
              "https://as1.ftcdn.net/v2/jpg/02/09/65/14/1000_F_209651427_Moux8Hkey15wtMbtLymbPPrdrLhm58fH.jpg",
            clicks: 0,
            views: 0,
            screenshots: 0,
          },
          userRef
        );
      };

  return (
    <div id="new-ad-popup" className={isNewAdModalOpen ? "" : "no-display"}>
      <main>
        <h2>New Ad</h2>
        <section>
          <label>Title</label>
          <input type="text"></input>
          <label>Image</label>
          <input type="file" alt="ad image"></input>
          <button
            onClick={() => {
              onUploadClick();
              toggleNewAdModal();
            }}
          >
            Submit
          </button>
          <button onClick={toggleNewAdModal}>Cancel</button>
        </section>
      </main>
    </div>
  );
}
