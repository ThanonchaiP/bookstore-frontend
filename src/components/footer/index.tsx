import { memo } from "react";
import { Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import styles from "./index.module.scss";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.footer}>
      <img width={151} className={styles.logo} src={logo} alt="logo" />

      <Row className="mt-10 gap-y-5">
        <Col xs={24} sm={12} md={8} lg={6} className="pr-4">
          <p className="font-bold">{t("footer.bookStore")}</p>
          <p>info@book.store.ac.th</p>
          <p>book.store@support.ac.th</p>
        </Col>

        <Col xs={24} sm={12} md={8} lg={4} className="flex flex-col pr-4">
          <Link to="" className="font-bold">
            {t("footer.aboutUs")}
          </Link>
          <Link to="">{t("footer.history")}</Link>
          <Link to="">{t("footer.boardOfDirectors")}</Link>
          <Link to="">{t("footer.ourBranch")}</Link>
          <Link to="">{t("footer.dealer")}</Link>
        </Col>

        <Col xs={24} sm={12} md={8} lg={4} className="flex flex-col pr-4">
          <Link to="" className="font-bold">
            {t("footer.help")}
          </Link>
          <Link to="">{t("footer.howToOrder")}</Link>
          <Link to="">{t("footer.howToPayment")}</Link>
          <Link to="">{t("footer.transport")}</Link>
          <Link to="">{t("footer.productReturn")}</Link>
          <Link to="">{t("footer.cancelProduct")}</Link>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6} className="flex flex-col pr-4">
          <Link to="" className="font-bold">
            {t("footer.privacyPolicy")}
          </Link>
          <Link to="">{t("footer.condition")}</Link>
          <br />
          <Link className="font-bold" to="">
            {t("footer.contact")}
          </Link>
          <Link to="">{t("footer.recruitment")}</Link>
          <Link to="">{t("footer.contactDealer")}</Link>
        </Col>

        <Col xs={24} md={8} lg={4}>
          <p className="mb-4 font-bold">{t("footer.social")}</p>

          <div className={styles["icon-wrapper"]}>
            <i className="fa-brands fa-facebook-f" />
            <i className="fa-brands fa-instagram" />
            <i className="fa-brands fa-twitter" />
            <i className="fa-brands fa-youtube" />
          </div>

          <button className={styles["btn-subscribe"]}>
            <i className="fa-regular fa-paper-plane" />
            {t("footer.subscribe")}
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default memo(Footer);
