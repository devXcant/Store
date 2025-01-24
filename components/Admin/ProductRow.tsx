import { IProduct } from "@/app/admin/dashboard/page";
import { useAppDispatch } from "@/lib/hook";
import { setLoading } from "@/redux/features/loadingReducer";
import { setProduct } from "@/redux/features/product";
import { makeToast } from "@/utils/helper";
import axios from "axios";
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
    const payload = { fileKey: product.fileKey };

    axios
      .delete("/api/uploadthing", { data: payload })
      .then(() => {
        axios
          .delete(`/api/delete_product/${product._id}`)
          .then(() => {
            makeToast("Product deleted successfully");
            setUpdateTable((prevState) => !prevState);
          })
          .catch((err) => console.log(err))
          .finally(() => dispatch(setLoading(false)));
      })
      .catch((err) => console.log(err));
  };

  return (
    <tr className="border-b border-[#ececec] font-urbanist bg-opacity-50 backdrop-blur-md hover:bg-[#121212]">
      <td className="py-4 px-6 text-center text-gray-300">{srNo}</td>
      <td className="py-4 px-6 text-gray-300">{product.name}</td>
      <td className="py-4 px-6 text-center text-gray-300">$ {product.price}</td>
      <td className="py-4 px-6 text-center">
        <Image
          src={product.imgSrc}
          width={40}
          height={40}
          alt="product_image"
          className="rounded-md shadow-md"
        />
      </td>
      <td className="py-4 px-6 text-center">
        <div className="flex items-center justify-center gap-4 text-gray-400">
          <CiEdit
            onClick={onEdit}
            className="cursor-pointer hover:text-green-500 transition-all duration-300"
          />
          <RiDeleteBin6Line
            onClick={onDelete}
            className="cursor-pointer hover:text-red-500 transition-all duration-300"
          />
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;
