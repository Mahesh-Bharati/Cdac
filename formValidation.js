import { useState, useReducer } from 'react';

function InsertDataForm() {
  const validateData = (key, val) => {
    let valid = true;
    let error = "";
    switch (key) {
      case 'org_name':
        var pattern = /^[A-Za-z]+$/;
        if (!pattern.test(val)) {
          valid = false;
          error = "Only letters are allowed";
        }
        break;

      case 'contact_no':
        var pattern = /^[0-9]{10}$/;
        if (!pattern.test(val)) {
          valid = false;
          error = "Only 10-digit numbers are allowed";
        }
        break;

      case 'email':
        var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!pattern.test(val)) {
          valid = false;
          error = "Invalid email format";
        }
        break;
    }

    return { valid: valid, error: error };
  };

  const submitData = (e) => {
    e.preventDefault();

    // Validate all fields before submitting
    for (let key in data) {
      const { valid, error } = validateData(key, data[key].value);
      if (!valid) {
        // If any field is invalid, set the error and return
        dispatch({
          type: 'update',
          data: { key, value: data[key].value, touched: true, valid, error },
        });
        return;
      }
    }

    // If all fields are valid, proceed with the API call
    const reqOptions = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        org_name: data.org_name.value,
        contact_no: data.contact_no.value,
        email: data.email.value,
      }),
    };

    fetch('http://localhost:9000/insertData', reqOptions)
      .then((response) => response.text())
      .then((str) => setMsg(str));
  };

  const init = {
    org_name: { value: "", valid: false, touched: false, error: "" },
    contact_no: { value: "", valid: false, touched: false, error: "" },
    email: { value: "", valid: false, touched: false, error: "" },
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'update':
        const { key, value, touched, valid, error } = action.data;
        return { ...state, [key]: { value, touched, valid, error } };

      case 'reset':
        return init;
    }
  };

  const [data, dispatch] = useReducer(reducer, init);
  const [msg, setMsg] = useState("");

  return (
    <div>
      <table>
        <tr>
          <td> Organization Name:</td>
          <td>
            <input
              type="text"
              name="org_name"
              id="org_name"
              value={data.org_name.value}
              onChange={(e) => {
                const { valid, error } = validateData("org_name", e.target.value);
                dispatch({
                  type: 'update',
                  data: {
                    key: "org_name",
                    value: e.target.value,
                    touched: true,
                    valid,
                    error,
                  },
                });
              }}
            />
            <div style={{ display: data.org_name.touched && !data.org_name.valid ? "block" : "none" }}>
              {data.org_name.error}
            </div>
          </td>
        </tr>
        <tr>
          <td>Contact Number:</td>
          <td>
            <input
              type="text"
              name="contact_no"
              id="contact_no"
              value={data.contact_no.value}
              onChange={(e) => {
                const { valid, error } = validateData("contact_no", e.target.value);
                dispatch({
                  type: 'update',
                  data: {
                    key: "contact_no",
                    value: e.target.value,
                    touched: true,
                    valid,
                    error,
                  },
                });
              }}
            />
            <div style={{ display: data.contact_no.touched && !data.contact_no.valid ? "block" : "none" }}>
              {data.contact_no.error}
            </div>
          </td>
        </tr>
        <tr>
          <td>Email:</td>
          <td>
            <input
              type="text"
              name="email"
              id="email"
              value={data.email.value}
              onChange={(e) => {
                const { valid, error } = validateData("email", e.target.value);
                dispatch({
                  type: 'update',
                  data: { key: "email", value: e.target.value, touched: true, valid, error },
                });
              }}
            />
            <div style={{ display: data.email.touched && !data.email.valid ? "block" : "none" }}>
              {data.email.error}
            </div>
          </td>
        </tr>
        <input type="button" value="insert" onClick={(e) => submitData(e)} />
      </table>
      <p>{msg}</p>
    </div>
  );
}

export default InsertDataForm;
