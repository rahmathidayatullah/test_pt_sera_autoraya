import React, { useState, useEffect } from "react";
import firebaseDb from "../../firebase";
import { isEmpty } from "lodash";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getDatabase, ref, onValue, set } from "firebase/database";

import InputField from "../../components/molecules/InputField";
export default function AddEditData() {
  const db = getDatabase();
  const navigate = useNavigate();
  const { id } = useParams();
  const [values, setValues] = useState([]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const db = getDatabase();
    set(ref(db, "users/" + new Date().getTime() + 1), values);
    navigate("/home");
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const db = getDatabase();
    set(ref(db, "users/" + id), values)
      .then(() => {
        alert("sukses");
        navigate("/home");
      })
      .catch((error) => {
        alert("gagal");
      });
  };

  const getDataSingle = () => {
    return onValue(
      ref(db, "/users/" + id),
      (snapshot) => {
        setValues(snapshot.val());
      },
      {
        onlyOnce: true,
      }
    );
  };

  useEffect(() => {
    if (id) {
      getDataSingle();
    } else {
      return;
    }
  }, [id]);
  return (
    <div className="mt-5 md:mt-0 md:col-span-2 p-10">
      <h1>Add / Edit</h1>
      <form onSubmit={!id ? handleSubmit : handleUpdate}>
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <InputField
                onChange={handleChangeInput}
                type="text"
                name="name"
                id="name"
                value={values?.name}
                autoComplete="name"
                placeholder="name"
                className="input-field"
                label="Name"
              />
              <InputField
                onChange={handleChangeInput}
                type="number"
                name="mobile"
                id="mobile"
                value={values?.mobile}
                autoComplete="mobile"
                placeholder="mobile"
                className="input-field"
                label="Mobile"
              />
              <InputField
                onChange={handleChangeInput}
                type="email"
                name="email"
                id="email"
                value={values?.email}
                autoComplete="email"
                placeholder="email"
                className="input-field"
                label="Email"
              />
              <InputField
                onChange={handleChangeInput}
                type="text"
                name="address"
                id="address"
                value={values?.address}
                autoComplete="address"
                placeholder="address"
                className="input-field"
                label="Address"
              />

              <InputField
                onChange={handleChangeInput}
                type="number"
                name="denom"
                id="denom"
                value={values?.denom}
                autoComplete="denom"
                placeholder="denom"
                className="input-field"
                label="Denom"
              />
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <Link
              to={`/home`}
              className="btn focus:ring-orange-500 bg-orange-600 hover:bg-orange-700 mr-5"
            >
              Cancel
            </Link>
            <button type="submit" className="btn">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
