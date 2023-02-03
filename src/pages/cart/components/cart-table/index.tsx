import { memo } from "react";
import { Link } from "react-router-dom";
import { FormCheckbox } from "components/form/checkbox";
import styled from "./index.module.scss";

type Props = {};

const CartTable = (props: Props) => {
  return (
    <table className={styled.table}>
      <tbody>
        <tr>
          <td />
          <td />
          <td>ชื่อสินค้า</td>
          <td className="text-center">ราคา/หน่วย</td>
          <td className="text-center">จำนวน</td>
          <td className="text-right">ราคารวม</td>
          <td />
        </tr>
        <tr>
          <td>
            <FormCheckbox />
          </td>
          <td>
            <div className={styled["product-image"]}>
              <img src="https://api.chulabook.com/images/pid-169079.jpg" alt="product image" />
            </div>
          </td>
          <td>
            <Link to="">
              <p className={styled["product-name"]}>แนวข้อสอบ A-LEVEL วิชาฟิสิกส์ ตามแนวทาง สสวทasdasd.</p>
            </Link>
            <p className={styled["product-author"]}>ณัฐวัชร์ มหายศนันท์</p>
            <div className={styled.tag}>Book</div>
            <p className="text-xs mt-1">Quantity : 840</p>
          </td>
          <td className="text-center">
            <p className="text-sm font-bold text-[#999899]">
              <i className="fa-solid fa-baht-sign mr-1" />
              500.00
            </p>
          </td>
          <td className="text-center">
            <div className="flex items-center gap-1">
              <i className="fa-solid fa-square-minus text-xl text-gray-400" />
              <input type="number" className={styled["quantity-field"]} />
              <i className="fa-solid fa-square-plus text-xl text-gray-400" />
            </div>
          </td>
          <td className="text-right">
            <p className="font-bold text-[#554994]">
              <i className="fa-solid fa-baht-sign mr-1" />
              500.00
            </p>
          </td>
          <td className="text-center">
            <i className="fa-solid fa-trash text-gray-400" />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default memo(CartTable);
