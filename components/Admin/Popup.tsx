"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { setLoading } from "@/redux/features/loadingReducer";
import { makeToast } from "@/utils/helper";
import axios from "axios";
import React, { FormEvent, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center font-urbanist">
      <Card className="w-[350px] bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-2xl text-foreground">
            Edit Product
          </CardTitle>
          <IoIosCloseCircleOutline
            className="absolute top-2 right-2 text-2xl cursor-pointer text-muted-foreground hover:text-foreground"
            onClick={() => setOpenPopup(false)}
          />
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">
                Name
              </Label>
              <Input
                id="name"
                value={inputData.name}
                onChange={(e) =>
                  setInputData({ ...inputData, name: e.target.value })
                }
                required
                className="bg-muted text-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="text-foreground">
                Category
              </Label>
              <Input
                id="category"
                value={inputData.category}
                onChange={(e) =>
                  setInputData({ ...inputData, category: e.target.value })
                }
                required
                className="bg-muted text-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price" className="text-foreground">
                Price
              </Label>
              <Input
                id="price"
                value={inputData.price}
                onChange={(e) =>
                  setInputData({ ...inputData, price: e.target.value })
                }
                required
                className="bg-muted text-foreground"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Save Changes
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Popup;
