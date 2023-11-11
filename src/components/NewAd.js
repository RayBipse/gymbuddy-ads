import { getUserData, uploadAdImage, uploadNewAd } from "../firebase.js";
import { useState } from "react";

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
  const [title, setTitle] = useState("untitled");
  const [imageFile, setImageFile] = useState(null);
  const handleChangeImage = !userRef
    ? () => {}
    : (e) => {
        const file = e.target.files[0];
        setImageFile(file);
      };
  const onUploadClick = !userRef
    ? () => {}
    : () => {
        if (!imageFile) alert("no image");
        const key = new Date().getTime();
        getUserData(userRef).then((userDoc) => {
          uploadAdImage(userDoc.uid, key, imageFile).then((url) => {
            const newAd = {
              key,
              title: title,
              image_src: url,
              clicks: 0,
              views: 0,
              screenshots: 0,
            };
            console.log(newAd);
            setAds([...ads, newAd]);
            uploadNewAd(newAd, userRef);
          });
        });
      };

  return (
    <div id="new-ad-popup" className={isNewAdModalOpen ? "" : "no-display"}>
      <main>
        <h2>New Ad</h2>
        <section>
          <label>Title</label>
          <input type="text" onChange={(e) => setTitle(e.target.value)}></input>
          <label>Image</label>
          <input
            type="file"
            alt="ad image"
            onChange={handleChangeImage}
          ></input>
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
