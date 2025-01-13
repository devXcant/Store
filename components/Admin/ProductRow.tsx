import { IProduct } from "@/app/admin/dashboard/page";
import { useAppDispatch } from "@/lib/hook";
import { setLoading } from "@/redux/features/loadingReducer";
import { setProduct } from "@/redux/features/product";
import { makeToast } from "@/utils/helper";
import axios from "axios";
import { log } from "console";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";

interface PropsType {
  srNo: number;
  setOpenPopup: Dispatch<SetStateAction<boolean>>;
  setUpdateTable: Dispatch<SetStateAction<boolean>>;
  product: IProduct;
}

const ProductRow = ({
  srNo,
  setOpenPopup,
  setUpdateTable,
  product,
}: PropsType) => {
  const dispatch = useAppDispatch();

  const onEdit = () => {
    dispatch(setProduct(product));
    setOpenPopup(true);
  };

  const onDelete = () => {
    dispatch(setLoading(true));
    const payload = {
      fileKey: product.fileKey,
    };

    axios
      .delete("/api/uploadthing", { data: payload })
      .then((res) => {
        console.log("res.data");

        axios
          .delete(`http://localhost:3000/api/delete_product/${product._id}`)
          .then((res) => {
            console.log(res.data);
            makeToast("Product deleted successfully");
            setUpdateTable((prevState) => !prevState);
          })
          .catch((err) => console.log(err))
          .finally(() => dispatch(setLoading(false)));
      })
      .catch((err) => console.log(err));
  };

  return (
    <tr className="border-b border-[#ececec]">
      <td className="py-2 px-4 text-center">{srNo}</td>
      <td className="py-2 px-4">{product.name}</td>
      <td className="py-2 px-4 text-center">$ {product.price}</td>
      <td className="py-2 px-4 text-center">
        <Image
          src={product.imgSrc}
          width={40}
          height={40}
          alt="product_image"
          className="rounded"
        />
      </td>
      <td className="py-2 px-4 text-center">
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <CiEdit
            onClick={onEdit}
            className="cursor-pointer hover:text-black"
          />
          <RiDeleteBin6Line
            onClick={onDelete}
            className="cursor-pointer hover:text-red-600"
          />
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;
