import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { formatRelative } from "date-fns";
import "./BuyPage.css";

export default function BuyPage() {
  const [queries, setQueries] = useState([]);
  const [search, setSearch] = useState("");

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
          setQueries(data);
        });

      return unsubscribe;
    }
  }, [db]);

  const filteredQuery = queries.filter((query) =>
    query.product.toLowerCase().includes(search.toLocaleLowerCase())
  );

  return (
    <>
      <div className="search-input-div">
        <input
          type="search"
          placeholder="Search by City"
          className="search-input"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div>
        <div class="table-wrapper">
          <table class="table table-striped table-dark">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Product</th>
                <th scope="col">Name</th>
                <th scope="col">City</th>
                <th scope="col">Condition</th>
                <th scope="col">Price</th>
                <th scope="col">Image</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuery.map((product, index) => (
                <tr>
                  <th scope="row">{index} </th>
                  <td>{product.product}</td>
                  <td>{product.displayName}</td>
                  <td>{product.city}</td>
                  <td>{product.condition}</td>
                  <td>{product.price}₪</td>
                  <td className="product-img">
                    <img
                      width="150"
                      height="100"
                      src={product.fileUrl}
                      alt=" format not supported"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
