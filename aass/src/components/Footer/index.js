import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { CiHome } from "react-icons/ci";
import { IoIosMailOpen } from "react-icons/io";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Navbar from 'react-bootstrap/Navbar';


export default function App() {
  return (

    <MDBFooter bgColor="dark" className="text-center text-lg-start text-light">
      {/* Main Footer Section */}
      <MDBIcon icon='camera-retro' />
      <section className="p-4">
        <MDBContainer>
          <MDBRow>
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4 text-primary">
                <MDBIcon icon="gem" className="me-3" />
                <Navbar.Brand href="#home" className="fs-3 fw-bold text-primary">
          Title<span className="text-warning">Verification</span>
        </Navbar.Brand>
              </h6>
              <p>
                Intilligent system for secure and Accurate Title Verification
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4 text-primary">Sections</h6>
              <p>
                <a href="#!" className="text-reset">
                  About
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Instructions
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Statistics
                </a>
              </p>
              
            </MDBCol>

            

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4 text-primary">Contact</h6>
              <p>
              <CiHome />

                New York, NY 10012, US
              </p>
              <p>
              <IoIosMailOpen />
                info@example.com
              </p>
              
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      {/* Social Media Icons Section */}
      <div className="bg-dark py-3">
        <MDBContainer className="d-flex justify-content-center">
          <a href="#!" className="text-reset me-4">
            <FaFacebookF/>
          </a>
          <a href="#!" className="text-reset me-4">
            <FaGithub/>
          </a>
          <a href="#!" className="text-reset me-4">
            <FaGoogle/>
          </a>
          <a href="#!" className="text-reset me-4">
            <FaInstagramSquare/>
          </a>
          <a href="#!" className="text-reset me-4">
            <FaLinkedin />
          </a>
          <a href="#!" className="text-reset me-4">
            <FaTwitter />
          </a>
        </MDBContainer>
      </div>

      {/* Copyright Section */}
      <div className="text-center p-3 bg-dark text-light">
        © 2021 Copyright:
        <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
          MDBootstrap.com
        </a>
      </div>
    </MDBFooter>
  );
}
