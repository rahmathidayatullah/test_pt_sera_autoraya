import React, { useState, useEffect } from "react";
import firebaseDb from "../../firebase";
import { isEmpty } from "lodash";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  get,
  set,
  child,
} from "firebase/database";
export default function AddEditData() {
  const db = getDatabase();
  const navigate = useNavigate();
  const { id } = useParams();
  const [values, setValues] = useState([]);
  // console.log("valuesssss", valuess);
  // const values = {
  //   name: "",
  //   mobile: "",
  //   email: "",
  //   address: "",
  // };
  // const [initialState, setState] = useState(values);
  // const { name, mobile, email, address } = initialState;

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
        // Data saved successfully!
        alert("sukses");
        navigate("/home");
      })
      .catch((error) => {
        alert("gagal");
        // The write failed...
      });
  };

  const getDataSingle = () => {
    console.log("id ss", id);
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
    console.log("id", id);
    if (id) {
      getDataSingle();
    } else {
      return;
    }
  }, [id]);
  return (
    <div className="mt-5 md:mt-0 md:col-span-2 p-10">
      <h1>Add / Edit</h1>
      {/* <form onSubmit={handleSubmit}> */}
      <form onSubmit={!id ? handleSubmit : handleUpdate}>
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  name
                </label>
                <input
                  onChange={handleChangeInput}
                  type="text"
                  name="name"
                  id="name"
                  value={values?.name}
                  autoComplete="name"
                  placeholder="name"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="col-span-6">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  mobile
                </label>
                <input
                  onChange={handleChangeInput}
                  type="text"
                  name="mobile"
                  id="mobile"
                  value={values?.mobile}
                  autoComplete="mobile"
                  placeholder="mobile"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="col-span-6">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  email
                </label>
                <input
                  onChange={handleChangeInput}
                  type="text"
                  name="email"
                  id="email"
                  value={values?.email}
                  autoComplete="email"
                  placeholder="email"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="col-span-6">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  address
                </label>
                <input
                  onChange={handleChangeInput}
                  type="text"
                  name="address"
                  id="address"
                  value={values?.address}
                  autoComplete="address"
                  placeholder="address"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <Link
              to={`/home`}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-6"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
