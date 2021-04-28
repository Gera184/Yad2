import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import { storage } from "../firebase";
import "./css/Channel.css";
import { formatRelative } from "date-fns";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Channel = ({ user = null, db = null }) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState("");
  const [city, setCity] = useState("");
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState("");
  const [fileUrl, setFileUrl] = useState(null);
  const { uid } = user;
  const { currentUser } = useAuth();

  useEffect(() => {
    if (db) {
      const unsubscribe = db
        .collection("sells")
        .orderBy("createdAt")
        .limit(100)
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setProducts(data);
        });

      return unsubscribe;
    }
  }, [db]);

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  };

  const handleonSubmit = (e) => {
    e.preventDefault();

    if (db) {
      db.collection("sells").add({
        product: product,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        city: city,
        condition: condition,
        price: price,
        fileUrl: fileUrl,
        uid,
        displayName: currentUser.email,
      });
    }
    alert("Product added successfully");
    setProduct("");
    setCity("");
    setCondition("");
    setPrice("");
    setFileUrl("");
  };

  return (
    <div class="container contact-form">
      <div class="contact-image">
        <img
          src="https://image.ibb.co/kUagtU/rocket_contact.png"
          alt="rocket_contact"
        />
      </div>
      <form method="post" onSubmit={handleonSubmit}>
        <h3>Add product</h3>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <input
                type="text"
                value={product}
                onChange={(e) => {
                  setProduct(e.target.value);
                }}
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </div>
            <div class="form-group">
              <input
                type="number"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>
            <div class="form-group">
              <input type="file" onChange={onFileChange} />
            </div>
            <div class="form-group">
              <select
                type="text"
                value={condition}
                onChange={(e) => {
                  setCondition(e.target.value);
                }}
                placeholder="Product condition"
              >
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="pretty-good">Preety Good</option>
                <option value="bad">Bad</option>
              </select>
            </div>
            <div class="form-group">
              <button
                type="submit"
                disabled={!product || !city || !condition || !price}
              >
                Send
              </button>
            </div>
            <p>
              <Link to="/buy-product">All Products</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Channel;
