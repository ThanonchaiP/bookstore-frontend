import { memo } from "react";

type Props = {};

const CartSummary = (props: Props) => {
  return (
    <div className="rounded-md shadow-md ml-8 p-4">
      <p className="text-base font-medium pb-2 border-b-2">สรุปข้อมูลคำสั่งซื้อ</p>

      <div className="flex justify-between items-center mt-4">
        <p>ราคาสินค้า</p>
        <p className="font-bold text-[#554994]">
          <i className="fa-solid fa-baht-sign mr-1" />
          500.00
        </p>
      </div>

      <div className="flex justify-between items-center mt-2">
        <p>ค่าจัดส่ง</p>
        <p className="font-bold text-[#554994]">
          <i className="fa-solid fa-baht-sign mr-1" />
          30.00
        </p>
      </div>

      <div className="flex justify-between items-center mt-6">
        <p className="text-lg font-bold">ยอดรวมทั้งสิ้น</p>
        <p className="text-2xl font-bold text-red-600">
          <i className="fa-solid fa-baht-sign mr-1" />
          30.00
        </p>
      </div>

      <button type="button" className="w-full h-[40px] font-medium rounded-md bg-[#554994] text-white mt-4">
        ชำระเงิน
      </button>
    </div>
  );
};

export default memo(CartSummary);
