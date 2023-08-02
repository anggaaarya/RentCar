import React, { useRef, useState, useEffect } from "react";

import {
  Container,
  Button,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
  Alert,
} from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "../../styles/header.css";
import { login, registerUser } from "../../utils/sanity";
import useAuth from "../../hooks/useAuth";
import useOrder from "../../hooks/useOrder";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/cars",
    display: "Cars",
  },

  // {
  //   path: "/blogs",
  //   display: "Blog",
  // },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const { dispatch, REDUCER_ACTION, state } = useAuth();
  const orderCtx = useOrder();
  const menuRef = useRef(null);
  const [isRegisterDisabled, setIsRegisterDisabled] = useState(true);
  const [formRegister, setFormRegister] = useState({
    email: "",
    password: "",
    confPassword: "",
    numberPhone: "",
    username: "",
    name: "",
  });
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });
  const [regisSuccess, setRegisSuccess] = useState(false);
  const [loginFail, setLoginFail] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const toggle = () =>
    dispatch({
      type: REDUCER_ACTION.toggleModalLogin,
      payload: {
        key: "modalLogin",
        value: false,
      },
    });
  const toggleRegister = () => {
    dispatch({
      type: REDUCER_ACTION.toggleModalRegis,
      payload: {
        key: "modalRegister",
        value: false,
      },
    });
    setShowAlert(false);
  };
  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  useEffect(() => {
    checkingForm();
  }, [formRegister]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setIsLogin(true);
      dispatch({
        type: REDUCER_ACTION.login,
        payload: { user: JSON.parse(localStorage.getItem("user")) },
      });
      orderCtx.dispatch({
        type: "change",
        payload: {
          key: "phoneNumber",
          value: JSON.parse(localStorage.getItem("user")).numberPhone,
        },
      });
      orderCtx.dispatch({
        type: "change",
        payload: {
          key: "email",
          value: JSON.parse(localStorage.getItem("user")).email,
        },
      });
      orderCtx.dispatch({
        type: "change",
        payload: {
          key: "firstName",
          value: JSON.parse(localStorage.getItem("user")).name,
        },
      });
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  function checkingForm() {
    if (
      formRegister.email &&
      formRegister.numberPhone &&
      formRegister.password &&
      formRegister.username &&
      formRegister.confPassword
    ) {
      setIsRegisterDisabled(false);
    } else {
      setIsRegisterDisabled(true);
    }
  }

  async function onRegister(e) {
    e.preventDefault();
    const isRegisterSuccess = await registerUser(formRegister);
    if (isRegisterSuccess) {
      setShowAlert(true);
      setRegisSuccess(true);
    } else {
      setShowAlert(true);
      setRegisSuccess(false);
    }

    // send to sanity
    setFormRegister((formRegister) => ({
      email: "",
      password: "",
      numberPhone: "",
      username: "",
      name: "",
      confPassword: "",
    }));

    window.location.reload();
  }

  async function onLogin(e) {
    e.preventDefault();
    const dataLogin = await login(formLogin);
    setFormLogin((formLogin) => ({
      email: "",
      password: "",
    }));
    if (dataLogin) {
      window.location.href = "/";
    }
  }

  function onLogout() {
    localStorage.removeItem("user");
    dispatch({
      type: REDUCER_ACTION.logout,
    });
    window.location.reload();
  }

  return (
    <>
      <header className="header">
        {/* ============ header top ============ */}
        <div className="header__top">
          <Container>
            <Row>
              <Col lg="6" md="6" sm="6">
                <div className="header__top__left">
                  <span>Need Help?</span>
                  <span className="header__top__help">
                    <i class="ri-phone-fill"></i> +62 81319146063
                  </span>
                </div>
              </Col>

              <Col lg="6" md="6" sm="6">
                {!isLogin ? (
                  <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                    <Link
                      to="#"
                      className=" d-flex align-items-center gap-1"
                      onClick={() =>
                        dispatch({
                          type: REDUCER_ACTION.toggleModalLogin,
                          payload: {
                            key: "modalLogin",
                            value: true,
                          },
                        })
                      }>
                      <i class="ri-login-circle-line"></i> Login
                    </Link>

                    <Link
                      to="#"
                      className=" d-flex align-items-center gap-1"
                      onClick={() =>
                        dispatch({
                          type: REDUCER_ACTION.toggleModalRegis,
                          payload: {
                            key: "modalRegister",
                            value: true,
                          },
                        })
                      }>
                      <i class="ri-user-line"></i> Register
                    </Link>
                  </div>
                ) : (
                  <Row style={{ alignItems: "center" }}>
                    <Col md={10}>
                      <p
                        className="header__top__right d-flex align-items-center justify-content-end"
                        style={{ marginBottom: "0" }}>
                        Hello, {user.email}
                      </p>
                    </Col>
                    <Col md={2}>
                      <Button color="secondary" outline onClick={onLogout}>
                        Logout
                      </Button>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
          </Container>
        </div>

        {/* =============== header middle =========== */}
        <div className="header__middle">
          <Container>
            <Row>
              <Col lg="4" md="3" sm="4">
                <div className="logo">
                  <h1>
                    <Link
                      to="/home"
                      className=" d-flex align-items-center gap-2">
                      <i class="ri-car-line"></i>
                      <span>
                        Go
                        <br /> Rental
                      </span>
                    </Link>
                  </h1>
                </div>
              </Col>

              <Col lg="3" md="3" sm="4">
                <div className="header__location d-flex align-items-center gap-2">
                  <span>
                    <i class="ri-earth-line"></i>
                  </span>
                  <div className="header__location-content">
                    <h4>Indonesia</h4>
                    <h6>Kedung Halang, Bogor</h6>
                  </div>
                </div>
              </Col>

              <Col lg="3" md="3" sm="4">
                <div className="header__location d-flex align-items-center gap-2">
                  <span>
                    <i class="ri-time-line"></i>
                  </span>
                  <div className="header__location-content">
                    <h4>Sunday to Friday</h4>
                    <h6>10am - 7pm</h6>
                  </div>
                </div>
              </Col>

              <Col
                lg="2"
                md="3"
                sm="0"
                className=" d-flex align-items-center justify-content-end ">
                <button className="header__btn btn ">
                  <Link to="/contact">
                    <i class="ri-phone-line"></i> Request a call
                  </Link>
                </button>
              </Col>
            </Row>
          </Container>
        </div>

        {/* ========== main navigation =========== */}

        <div className="main__navbar">
          <Container>
            <div className="navigation__wrapper d-flex align-items-center justify-content-between">
              <span className="mobile__menu">
                <i class="ri-menu-line" onClick={toggleMenu}></i>
              </span>

              <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                <div className="menu">
                  {navLinks.map((item, index) => (
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive
                          ? "nav__active nav__item"
                          : "nav__item"
                      }
                      key={index}>
                      {item.display}
                    </NavLink>
                  ))}
                </div>
              </div>

              <div className="nav__right">
                <div className="search__box">
                  <input type="text" placeholder="Search" />
                  <span>
                    <i class="ri-search-line"></i>
                  </span>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>

      {/* MODAL LOGIN */}
      <Modal isOpen={state.modalLogin} toggle={toggle} centered>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          {showAlert && !loginFail && (
            <Alert color="danger">Login Unsuccessfully, try again.</Alert>
          )}
          <Form>
            <FormGroup floating>
              <Input
                id="exampleEmail"
                name="email"
                placeholder="Email"
                type="email"
                value={formLogin["email"]}
                onChange={(event) =>
                  setFormLogin((formLogin) => ({
                    ...formLogin,
                    [event.target.name]: event.target.value,
                  }))
                }
              />
              <Label for="exampleEmail">Email</Label>
            </FormGroup>{" "}
            <FormGroup floating>
              <Input
                id="examplePassword"
                name="password"
                placeholder="Password"
                type="password"
                value={formLogin["password"]}
                onChange={(event) =>
                  setFormLogin((formLogin) => ({
                    ...formLogin,
                    [event.target.name]: event.target.value,
                  }))
                }
              />
              <Label for="examplePassword">Password</Label>
            </FormGroup>{" "}
            <Button onClick={(e) => onLogin(e)}>Submit</Button>
          </Form>
        </ModalBody>
      </Modal>
      {/* MODAL Register */}
      <Modal isOpen={state.modalRegister} toggle={toggleRegister} centered>
        <ModalHeader toggle={toggleRegister}>Register</ModalHeader>
        <ModalBody>
          {showAlert && regisSuccess && (
            <Alert color="primary">Register Successfully!</Alert>
          )}
          {showAlert && !regisSuccess && (
            <Alert color="danger">Register Unsuccessfully, try again.</Alert>
          )}
          <Form>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="with a placeholder"
                    type="email"
                    value={formRegister["email"]}
                    onChange={(event) =>
                      setFormRegister((formRegister) => ({
                        ...formRegister,
                        [event.target.name]: event.target.value,
                      }))
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="fill Username..."
                    type="text"
                    value={formRegister["username"]}
                    onChange={(event) =>
                      setFormRegister((formRegister) => ({
                        ...formRegister,
                        [event.target.name]: event.target.value,
                      }))
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="fill your name..."
                    type="text"
                    value={formRegister["name"]}
                    onChange={(event) =>
                      setFormRegister((formRegister) => ({
                        ...formRegister,
                        [event.target.name]: event.target.value,
                      }))
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="numberPhone">Number Phone</Label>
                  <Input
                    id="numberPhone"
                    name="numberPhone"
                    placeholder="+628139292992"
                    type="text"
                    value={formRegister["numberPhone"]}
                    onChange={(event) =>
                      setFormRegister((formRegister) => ({
                        ...formRegister,
                        [event.target.name]: event.target.value,
                      }))
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    value={formRegister["password"]}
                    onChange={(event) =>
                      setFormRegister((formRegister) => ({
                        ...formRegister,
                        [event.target.name]: event.target.value,
                      }))
                    }
                    placeholder="password placeholder"
                    type="password"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="confPassword">Confirm Password</Label>
                  <Input
                    id="confPassword"
                    name="confPassword"
                    value={formRegister["confPassword"]}
                    onChange={(event) =>
                      setFormRegister((formRegister) => ({
                        ...formRegister,
                        [event.target.name]: event.target.value,
                      }))
                    }
                    placeholder="password placeholder"
                    type="password"
                  />
                </FormGroup>
              </Col>
            </Row>

            <Button
              color="primary"
              disabled={isRegisterDisabled}
              onClick={(e) => onRegister(e)}>
              Register
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Header;
