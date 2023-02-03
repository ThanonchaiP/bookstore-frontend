import { useState } from "react";
import { Row, Col } from "antd";
import { FormCheckbox } from "components/form/checkbox";
import CartTable from "./components/cart-table";
import CartSummary from "./components/cart-summary";
import styled from "./index.module.scss";

const Cart = () => {
  const [selectAll, setSelectAll] = useState(false);

  const onSelectAll = () => {
    setSelectAll((state) => !state);
  };

  return (
    <div className={styled.container}>
      <Row className="mt-3">
        <Col span={24} xl={16}>
          <div className="flex items-center gap-3 rounded-md shadow-md p-4">
            <FormCheckbox onChange={onSelectAll} />
            <p>เลือกทั้งหมด ( 5 ชิ้น )</p>
          </div>

          <div className="mt-4 py-4 pl-4 shadow-md">
            <CartTable />
          </div>
        </Col>
        <Col span={24} xl={8}>
          <CartSummary />
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
