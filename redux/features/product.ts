// import { IProduct } from "@/app/admin/dashboard/page";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface IProduct {
    _id: any;
    name: string;
    price: number;
    category: string;
    imgSrc: string;
    fileKey: string;
  }

const initialState: IProduct = {
    _id: "",
    imgSrc: "",
    fileKey: "",
    name: "",
    price: 0,
    category: "",

}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProduct: (state, action: PayloadAction<IProduct>) => {
            return action.payload;
        }
    }
})

export const { setProduct } = productSlice.actions;
export default productSlice.reducer

