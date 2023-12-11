import { uploadAdImage } from "../firebase.js";
import { useState } from "react";
import { Ad } from "../models/Ad.js";

export function NewAdButton({ toggleNewAdModal }) {
    return <button onClick={toggleNewAdModal}>Upload New ad</button>;
}

const allowedFileTypes = [".jpg", ".png"];

export function NewAdPopup({ user, dispatchUser, toggleNewAdModal, isNewAdModalOpen }) {
    const [title, setTitle] = useState("untitled");
    const [imageFile, setImageFile] = useState(null);

    const handleChangeImage = (e) => {
        const file = e.target.files[0];
        if (file && allowedFileTypes.some((x) => file.endsWith(x))) {
            setImageFile(file);
        } else {
            alert(`Invalid file type, only ${allowedFileTypes} allowed`);
        }
    };

    const onUploadClick = () => {
        if (!imageFile) alert("no image");
        const key = new Date().getTime();
        uploadAdImage(user.uid, key, imageFile).then((url) => {
            const newAd = Ad.fromNewAd(key, title, url);
            dispatchUser({
                type: "add ad",
                ad: newAd,
            });
        });
        toggleNewAdModal();
    };

    if (!user.ref) return <></>;
    return (
        <div id="new-ad-popup" className={isNewAdModalOpen ? "" : "no-display"}>
            <main>
                <h2>New Ad</h2>
                <section>
                    <label>Title</label>
                    <input type="text" onChange={(e) => setTitle(e.target.value)}></input>
                    <label>Image</label>
                    <input type="file" alt="ad image" onChange={handleChangeImage}></input>
                    <button onClick={onUploadClick}>Submit</button>
                    <button onClick={toggleNewAdModal}>Cancel</button>
                </section>
            </main>
        </div>
    );
}
