import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDatabase, ref, onValue, remove, child } from "firebase/database";
import Button from "../../components/atoms/button";
export default function Index() {
  const [data, setData] = useState([]);
  const [resultArray, setResultArray] = useState([]);
  const db = getDatabase();
  const dbRef = ref(db, "/users");

  const [successDelete, setSuccessDelete] = useState(false);

  const handleDelete = (id) => {
    const dbRefr = ref(getDatabase());
    if (window.confirm("are you sure delete data")) {
      remove(child(dbRefr, `users/${id}`));
      setSuccessDelete(true);
    }
  };

  const filterData = () => {
    let _temp = [...data];

    let dataNew = _temp.filter((items) => items.denom >= 10000);

    let resultArray = dataNew.map((a) => a.denom);
    setData(dataNew);
    setResultArray(resultArray);
  };

  useEffect(() => {
    onValue(
      dbRef,
      (snapshot) => {
        let _temp = [];
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          _temp.push({ ...childData, id: childKey });
        });
        setData(_temp);
      },
      {
        onlyOnce: true,
      }
    );
    setSuccessDelete(false);
  }, [successDelete]);

  return (
    <div className="p-10">
      <div className="flex items-start justify-between">
        <Link className="text-indigo-600 hover:text-indigo-900" to={`/addedit`}>
          Add Data
        </Link>
        <div>
          <Button onClick={filterData} type="button" className="btn">
            filter denom &gt;= 10000,
          </Button>
          <div
            className={`p-10 bg-blue-100 mt-4 rounded-lg ${
              resultArray.length ? "" : "hidden"
            }`}
          >
            (
            {resultArray &&
              resultArray.map((items, index) => {
                return (
                  <div>
                    &nbsp;&nbsp;&nbsp;[{index}] &gt;{items}
                    <br />
                  </div>
                );
              })}
            )
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-10">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="th-table">
                      Nama
                    </th>
                    <th scope="col" className="th-table">
                      Mobile
                    </th>
                    <th scope="col" className="th-table">
                      Address
                    </th>
                    <th scope="col" className="th-table">
                      Denom
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {!data.length
                    ? "data kosong"
                    : data.map((items, index) => {
                        return (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {items.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {items.email}
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="td-table text-gray-500">
                              {items.mobile}
                            </td>
                            <td className="td-table text-gray-500">
                              {items.address}
                            </td>
                            <td className="td-table text-gray-500">
                              {items?.denom}
                            </td>
                            <td className="td-table text-right font-medium">
                              <Link
                                className="text-indigo-600 hover:text-indigo-900"
                                to={`/addedit/${items.id}`}
                              >
                                Edit
                              </Link>
                            </td>
                            <td className="td-table text-right font-medium">
                              <button
                                onClick={() => handleDelete(items.id)}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
