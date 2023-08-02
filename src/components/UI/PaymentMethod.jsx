import React, { useEffect, useState } from "react";

import bca from "../../assets/all-images/bca.png";
import mandiri from "../../assets/all-images/mandiri.png";
import dana from "../../assets/all-images/dana.png";
import "../../styles/payment-method.css";
import useOrder from "../../hooks/useOrder";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { setTransaction, getCarById } from "../../utils/sanity";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import { runFireworks } from "../../utils/confetti";

const PaymentMethod = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { dispatch, state, REDUCER_ACTION } = useOrder();
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [txId, setTxId] = useState();
  const [methodPayment] = useState({
    bankBca: {
      id: "bca",
      name: "Bank BCA",
      no_rekening: "8410809258",
    },
    bankMandiri: {
      id: "mandiri",
      name: "Bank Mandiri",
      no_rekening: "1330015912017",
    },
    dana: {
      id: "dana",
      name: "Dana",
      no_rekening: "081319146063",
    },
  });
  const [modalSuccess, setModalSuccess] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const authCtx = useAuth();
  const onSubmit = async () => {
    if (authCtx.state.isLogin) {
      const dataTransaction = {
        statusBooking: false,
        methodPayment: state.payment,
        idUser: authCtx.state.user._id,
        idCar: slug,
      };
      setPaymentInfo(dataTransaction);
      const { status, id } = await setTransaction(dataTransaction);
      setTxId(id);
      if (status) {
        setModalSuccess(status);
        dispatch({
          type: REDUCER_ACTION.submit,
          payload: {
            data: status,
          },
        });
      } else {
        alert("Network error, try again later!");
      }
    } else {
      authCtx.dispatch({
        type: authCtx.REDUCER_ACTION.toggleModalLogin,
        payload: {
          key: "modalLogin",
          value: true,
        },
      });
    }
  };

  const toggle = () => {
    setModalSuccess(!modalSuccess);
    dispatch({
      type: REDUCER_ACTION.clear,
    });
  };

  useEffect(() => {
    if (
      state?.date &&
      state?.email &&
      state?.lastName &&
      state?.firstName &&
      state?.notes &&
      state?.payment &&
      state?.phoneNumber
    ) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }

    if (state?.succesForm) {
      runFireworks();
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [state]);

  async function redirectWa() {
    const dataCar = await getCarById(slug);
    window.location.href = `https://wa.me/6281319146063?text=

        id transaksi: ${txId} %0a
        nama: ${state.state.firstName} ${state.state.lastName} %0a
        email: ${state.state.email} %0a
        tanggal pemesanan : ${state.state.date} %0a
        metode pembayaran: ${methodPayment[state.state.payment]?.name} %0a
        mobil: ${dataCar[0]._id}-${dataCar[0].brand}-${dataCar[0].carName} %0a
        harga: ${new Intl.NumberFormat("id-ID").format(
          dataCar[0].price
        )} IDR %0a
        deskripsi: ${state.state.notes} %0a %0a %0a %0a

        Lampirkan bukti pembayaran, agar proses cepat.
    `;
  }

  return (
    <>
      <div className="payment d-flex align-items-center justify-content-between">
        <label htmlFor="" className="d-flex align-items-center gap-2">
          <input
            type="radio"
            name="payment"
            value="bankBca"
            onChange={(event) =>
              dispatch({
                type: "change",
                payload: { key: "payment", value: event.target.value },
              })
            }
          />{" "}
          Bank BCA
        </label>
        <img
          src={bca}
          alt=""
          width={65}
          height={65}
          style={{ objectFit: "contain" }}
        />
      </div>

      <div className="payment mt-3 d-flex align-items-center justify-content-between">
        <label htmlFor="" className="d-flex align-items-center gap-2">
          <input
            type="radio"
            name="payment"
            value="bankMandiri"
            onChange={(event) =>
              dispatch({
                type: "change",
                payload: { key: "payment", value: event.target.value },
              })
            }
          />{" "}
          Bank Mandiri
        </label>
        <img
          src={mandiri}
          alt=""
          width={65}
          height={65}
          style={{ objectFit: "contain" }}
        />
      </div>

      <div className="payment mt-3 d-flex align-items-center justify-content-between">
        <label htmlFor="" className="d-flex align-items-center gap-2">
          <input
            type="radio"
            name="payment"
            value="dana"
            onChange={(event) =>
              dispatch({
                type: "change",
                payload: { key: "payment", value: event.target.value },
              })
            }
          />{" "}
          Dana
        </label>

        <img
          src={dana}
          alt=""
          width={65}
          height={65}
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* <div className="payment mt-3 d-flex align-items-center justify-content-between">
        <label htmlFor="" className="d-flex align-items-center gap-2">
          <input
            type="radio"
            name="payment"
            value="paypal"
            onChange={(event) =>
              dispatch({
                type: "change",
                payload: { key: "payment", value: event.target.value },
              })
            }
          />{" "}
          Paypal
        </label>

        <img src={paypal} alt="" />
      </div> */}
      <div className="payment text-end mt-5">
        <button type="button" disabled={isBtnDisabled} onClick={onSubmit}>
          Reserve Now
        </button>
      </div>

      {/* MODAL SUCCESS TRANSACTION */}
      <Modal isOpen={modalSuccess} toggle={toggle} centered>
        <ModalHeader toggle={toggle}>Transaction On Progress</ModalHeader>
        <ModalBody>
          {state && (
            <>
              <div>
                <h3>Hello {state.name}</h3>
              </div>
            </>
          )}
          Berikut Data Payment anda, harap diperhatikan dengan benar:
          <br />
          {paymentInfo && (
            <>
              <span>Bank: {methodPayment[paymentInfo.methodPayment].name}</span>
              <br />
              <span>
                Nomor Rekening:{" "}
                {methodPayment[paymentInfo.methodPayment].no_rekening}
              </span>
              <br />
              <br />
            </>
          )}
          <span>
            Lakukan konfirmasi segera dengan admin kita, klik tombol dibawah
            ini!
          </span>
          <br />
          <Button
            onClick={() => redirectWa()}
            color="primary"
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
            }}>
            WhatsApps
          </Button>
        </ModalBody>
      </Modal>
    </>
  );
};

export default PaymentMethod;
