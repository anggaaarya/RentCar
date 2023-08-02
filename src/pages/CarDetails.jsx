import React, { useEffect, useState } from "react";

import carData from "../assets/data/carData";
import { Container, Row, Col, Button } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams, useNavigate } from "react-router-dom";
import BookingForm from "../components/UI/BookingForm";
import PaymentMethod from "../components/UI/PaymentMethod";
import { getCarById, urlImg, getTransactionByIdCar } from "../utils/sanity";

const CarDetails = () => {
  const { slug } = useParams();
  const [car, setCar] = useState(null);
  const [tx, setTx] = useState(null);
  const [loadingPage, setLoadingPage] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const tx = await getTransactionByIdCar(slug);
      const data = await getCarById(slug);
      const tfData = data.map((each) => {
        return {
          ...each,
          carImage: urlImg(each?.carImage || "").url(),
        };
      });
      setTx(tx[0]);
      setCar(tfData[0]);
      setTimeout(() => {
        setLoadingPage(false);
      }, 2000);
    }
    getData();
    window.scrollTo(0, 0);
  }, []);

  return (
    <Helmet title={car?.carName}>
      <section style={{ position: "relative", paddingTop: "0" }}>
        {(car?.isBooking || tx?.statusBooking) && (
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.4)",
            }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                paddingTop: "20rem",
              }}>
              <h1 style={{ color: "#fff" }}>Car Is Booking</h1>
              <Button
                onClick={() => navigate("/cars")}
                style={{ marginTop: "3rem" }}>
                Get another car here
              </Button>
            </div>
          </div>
        )}
        {loadingPage && (
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.95)",
            }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                paddingTop: "20rem",
              }}>
              <div className="loader"></div>
            </div>
          </div>
        )}
        <Container style={{ paddingTop: "50px" }}>
          <Row>
            <Col lg="6">
              <img src={car?.carImage} alt="" className="w-100" />
            </Col>

            <Col lg="6">
              <div className="car__info">
                <h2 className="section__title">{car?.carName}</h2>

                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(car?.price)}{" "}
                    / Day
                  </h6>

                  {/* <span className=" d-flex align-items-center gap-2">
                    <span style={{ color: "#f9a826" }}>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    ({car?.rating} ratings)
                  </span> */}
                </div>

                <p className="section__description">{car?.description}</p>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "4rem" }}>
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-roadster-line"
                      style={{ color: "#f9a826" }}></i>{" "}
                    {car?.model}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-settings-2-line"
                      style={{ color: "#f9a826" }}></i>{" "}
                    {car?.automatic}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-timer-flash-line"
                      style={{ color: "#f9a826" }}></i>{" "}
                    {car?.speed}kmpl
                  </span>
                </div>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "2.8rem" }}>
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i class="ri-map-pin-line" style={{ color: "#f9a826" }}></i>{" "}
                    {car?.isHaveGps ? "GPS Navigation" : "No Have GPS"}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-wheelchair-line"
                      style={{ color: "#f9a826" }}></i>{" "}
                    {car?.isHaveHeatedSeat
                      ? "Heated seats"
                      : "No Have Heated seats"}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-building-2-line"
                      style={{ color: "#f9a826" }}></i>{" "}
                    {car?.brand}
                  </span>
                </div>
              </div>
            </Col>

            <Col lg="7" className="mt-5">
              <div className="booking-info mt-5">
                <h5 className="mb-4 fw-bold ">Booking Information</h5>
                <BookingForm />
              </div>
            </Col>

            <Col lg="5" className="mt-5">
              <div className="payment__info mt-5">
                <h5 className="mb-4 fw-bold ">Payment Information</h5>
                <PaymentMethod />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarDetails;
