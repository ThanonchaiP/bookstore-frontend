import { Row, Col } from "antd";
import ProtectedRoute from "routes/ProtectedRoute";
import Sidebar from "./components/sidebar";
import styles from "./index.module.scss";

const UserWrapper = () => {
  return (
    <Row className={styles.container}>
      <Col className="pr-8" span={0} lg={7}>
        <Sidebar />
      </Col>
      <Col span={24} lg={17}>
        <ProtectedRoute />
      </Col>
    </Row>
  );
};

export default UserWrapper;
