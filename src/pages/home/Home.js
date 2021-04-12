import React from "react";
import { Carusela } from "./carusela/Carusela";
import "./Home.css";

export const Home = () => {
  return (
    <div className="home-body">
      <div class="container">
        <h1 className="Second-Hand-header">Second Hand</h1>
        <Carusela />
      </div>
      <div id="btn">
        <a href="/sell-product" class="noselect">
          Sell Product
        </a>
        <div id="circle"></div>
      </div>
      <div id="btn">
        <a href="/buy-product" class="noselect">
          Buy Product
        </a>
        <div id="circle"></div>
      </div>
    </div>
  );
};
