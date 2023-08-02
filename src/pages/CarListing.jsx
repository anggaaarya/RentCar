import React, { useEffect, useState } from "react";

import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import carData from "../assets/data/carData";
import { getCars, urlImg } from "../utils/sanity";

const CarListing = () => {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    async function getData() {
      getCars().then((data) => {
        const CarsSanity = data.map((item) => {
          return { ...item, imgUrl: urlImg(item.carImage).height(300).url() };
        });
        setCars(CarsSanity);
      });
    }
    getData();
  }, []);

  return (
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />

      <section>
        <Container>
          <Row>
            {/* <Col lg="12">
              <div className=" d-flex align-items-center gap-3 mb-5">
                <span className=" d-flex align-items-center gap-2">
                  <i class="ri-sort-asc"></i> Sort By
                </span>

                <select>
                  <option>Select</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </select>
              </div>
            </Col> */}

            {cars.map((item) => (
              <CarItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
