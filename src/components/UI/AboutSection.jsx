import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/about-section.css";
import aboutImg from "../../assets/all-images/cars-img/bmw-offer.png";

const AboutSection = ({ aboutClass }) => {
  return (
    <section
      className="about__section"
      style={
        aboutClass === "aboutPage" ? { marginTop: "0px" } : { marginTop: "0" }
      }>
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="about__section-content">
              <h4 className="section__subtitle">About Us</h4>
              <h2 className="section__title">Welcome to Go Rental</h2>
              <p className="section__description">
                Go Rental adalah penyedia layanan sewa mobil, Menggunakan armada
                mobil keluaran baru, dengan kondisi terawat untuk disewakan
                kepada Anda. Pilihan mobil yang kami sediakan sangat variatif
                dan harga yang sangat kompetitif di Bogor Kota. Kami
                mengutamakan kebersihan dari setiap armada untuk kenyamanan para
                customer. Go Rental berkomitmen untuk menjadi mitra sewa
                kendaraan terpercaya bagi Anda.
              </p>

              <div className="about__section-item d-flex align-items-center">
                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Mudah dan Fleksibel
                </p>

                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Harga Termurah
                </p>
              </div>

              <div className="about__section-item d-flex align-items-center">
                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Banyak pilihan Varian
                </p>

                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Sesuai Pilihan
                </p>
              </div>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="about__img">
              <img src={aboutImg} alt="" className="w-100" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
