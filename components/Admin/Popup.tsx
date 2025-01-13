import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { setLoading } from "@/redux/features/loadingReducer";
import { makeToast } from "@/utils/helper";
import axios from "axios";
import React, { FormEvent, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface PropTypes {
  setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateTable: React.Dispatch<React.SetStateAction<boolean>>;
}

const Popup = ({ setOpenPopup, setUpdateTable }: PropTypes) => {
  const productData = useAppSelector((state) => state.productSlice);
  const dispatch = useAppDispatch();

  const [inputData, setInputData] = useState({
    name: productData.name,
    price: productData.price,
    category: productData.category,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));

    axios
      .put(`/api/edit_product/${productData._id}`, inputData)
      .then((res) => {
        makeToast("Products Updated Successfully");
        setUpdateTable((prevState) => !prevState);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch(setLoading(false));
        setOpenPopup(false);
      });
  };

  return (
    <div className="fixed top-0 left-0 wofull h-screen bg-[#00000070 grid place-items-center">
      <div className="bg-white w-[700px] py-8 rounded-lg text-center relative">
        <IoIosCloseCircleOutline
          className="absolute text-2xl top-0 right-0 m-4 cursor-pointre hover:text-red-600 cursor-pointer"
          onClick={() => setOpenPopup(false)}
        />

        <h2 className="text-2xl -mt-3">Edit Products</h2>
        <form className="mt-6 w-fit space-y-4 mx-auto" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="border block border-gray-500 outline-none px-4 py-2 rounded-lg w-fit"
            value={inputData.name}
            onChange={(e) =>
              setInputData({ ...inputData, name: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Category"
            className="border block border-gray-500 outline-none px-4 py-2 rounded-lg w-fit"
            value={inputData.category}
            onChange={(e) =>
              setInputData({ ...inputData, category: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Price"
            className="border block border-gray-500 outline-none px-4 py-2 rounded-lg w-fit"
            value={inputData.price}
            onChange={(e) =>
              setInputData({ ...inputData, price: e.target.value })
            }
            required
                  />

                  <div className="flex justify-end">
                      <button className="bg-accent block text-white px-8 py-2 rounded-lg self-center">
                          Save
                      </button>
                  </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
