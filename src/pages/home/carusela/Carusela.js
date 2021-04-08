import React from "react";
import { Container } from "react-bootstrap";
import "./Carusela.css";

export const Carusela = () => {
  return (
    <Container>
      <div className="carusela-body">
        <div class="carusela-container">
          <div class="carousel">
            <div class="carousel__face">
              <span className="carusela-span">Real state</span>
            </div>
            <div class="carousel__face">
              <span className="carusela-span">Electronics</span>
            </div>
            <div class="carousel__face">
              <span className="carusela-span">Vehicles</span>
            </div>
            <div class="carousel__face">
              <span className="carusela-span">Clothes</span>
            </div>
            <div class="carousel__face">
              <span className="carusela-span">For office</span>
            </div>
            <div class="carousel__face">
              <span className="carusela-span">Motorbiks</span>
            </div>
            <div class="carousel__face">
              <span className="carusela-span">Furniture</span>
            </div>
            <div class="carousel__face">
              <span className="carusela-span">Phone</span>
            </div>
            <div class="carousel__face">
              <span className="carusela-span">Gym and Fitness</span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
