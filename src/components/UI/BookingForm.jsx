import React from "react";
import "../../styles/booking-form.css";
import { Form, FormGroup } from "reactstrap";
import useOrder from "../../hooks/useOrder";

const BookingForm = () => {
  React.useEffect(() => {
    document.getElementById("date-rental").min = new Date()
      .toISOString()
      .slice(0, 10);
  }, []);
  const { dispatch, state, REDUCER_ACTION } = useOrder();
  return (
    <Form>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input
          type="text"
          placeholder="First Name"
          value={state?.firstName}
          onChange={(event) =>
            dispatch({
              type: "change",
              payload: { key: "firstName", value: event.target.value },
            })
          }
        />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input
          type="text"
          placeholder="Last Name"
          value={state?.lastName}
          onChange={(event) =>
            dispatch({
              type: "change",
              payload: { key: "lastName", value: event.target.value },
            })
          }
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input
          type="email"
          placeholder="Email"
          value={state?.email}
          onChange={(event) =>
            dispatch({
              type: "change",
              payload: { key: "email", value: event.target.value },
            })
          }
        />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input
          type="number"
          placeholder="Phone Number"
          value={state?.phoneNumber}
          onChange={(event) =>
            dispatch({
              type: "change",
              payload: { key: "phoneNumber", value: event.target.value },
            })
          }
        />
      </FormGroup>

      {/* <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <select name="" id="">
          <option value="1 person">1 Person</option>
          <option value="2 person">2 Person</option>
          <option value="3 person">3 Person</option>
          <option value="4 person">4 Person</option>
          <option value="5+ person">5+ Person</option>
        </select>
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <select name="" id="">
          <option value="1 luggage">1 luggage</option>
          <option value="2 luggage">2 luggage</option>
          <option value="3 luggage">3 luggage</option>
          <option value="4 luggage">4 luggage</option>
          <option value="5+ luggage">5+ luggage</option>
        </select>
      </FormGroup> */}

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input
          type="date"
          id="date-rental"
          placeholder="Journey Date"
          value={state?.date}
          onChange={(event) =>
            dispatch({
              type: "change",
              payload: { key: "date", value: event.target.value },
            })
          }
        />
      </FormGroup>
      {/* <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input
          type="time"
          placeholder="Journey Time"
          className="time__picker"
        />
      </FormGroup> */}

      <FormGroup>
        <textarea
          rows={5}
          type="textarea"
          className="textarea"
          placeholder="Write"
          value={state?.notes}
          onChange={(event) =>
            dispatch({
              type: "change",
              payload: { key: "notes", value: event.target.value },
            })
          }></textarea>
      </FormGroup>
    </Form>
  );
};

export default BookingForm;
