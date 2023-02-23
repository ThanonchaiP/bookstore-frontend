import classnames from "classnames";
import { memo, useState } from "react";
import { Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import styles from "./index.module.scss";

enum Menu {
  AboutUs = 1,
  Help = 2,
  PrivacyPolicy = 3,
}

const Footer = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<number>();

  const onToggle = (menu: number) => {
    if (selected === menu) setSelected(undefined);
    else setSelected(menu);
  };

  return (
    <div className={styles.footer}>
      <img width={151} className={styles.logo} src={logo} alt="logo" loading="lazy" />

      <Row className="mt-10 gap-y-5">
        <Col xs={24} sm={12} md={8} lg={6} className="pr-4">
          <p className="font-bold">{t("footer.bookStore")}</p>
          <p>info@book.store.ac.th</p>
          <p>book.store@support.ac.th</p>
        </Col>

        <Col xs={24} sm={12} md={8} lg={4} className="flex flex-col sm:pr-4">
          <div className="flex justify-between items-center text-base font-bold cursor-pointer">
            {t("footer.aboutUs")}
            <i
              className={`fa-solid ${
                selected === Menu.AboutUs ? "fa-minus" : "fa-plus"
              } text-lg text-[#554994] sm:hidden`}
              onClick={() => onToggle(Menu.AboutUs)}
            />
          </div>
          <div className={classnames(styles["sub-menu"], { [styles.show]: selected === Menu.AboutUs })}>
            <Link to="">{t("footer.history")}</Link>
            <Link to="">{t("footer.boardOfDirectors")}</Link>
            <Link to="">{t("footer.ourBranch")}</Link>
            <Link to="">{t("footer.dealer")}</Link>
          </div>
        </Col>

        <Col xs={24} sm={12} md={8} lg={4} className="flex flex-col sm:pr-4">
          <div className="flex justify-between items-center text-base font-bold cursor-pointer">
            {t("footer.help")}
            <i
              className={`fa-solid ${selected === Menu.Help ? "fa-minus" : "fa-plus"} text-lg text-[#554994] sm:hidden`}
              onClick={() => onToggle(Menu.Help)}
            />
          </div>
          <div className={classnames(styles["sub-menu"], { [styles.show]: selected === Menu.Help })}>
            <Link to="">{t("footer.howToOrder")}</Link>
            <Link to="">{t("footer.howToPayment")}</Link>
            <Link to="">{t("footer.transport")}</Link>
            <Link to="">{t("footer.productReturn")}</Link>
            <Link to="">{t("footer.cancelProduct")}</Link>
          </div>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6} className="flex flex-col sm:pr-4">
          <div className="flex justify-between items-center text-base font-bold cursor-pointer">
            {t("footer.privacyPolicy")}
            <i
              className={`fa-solid ${
                selected === Menu.PrivacyPolicy ? "fa-minus" : "fa-plus"
              } text-lg text-[#554994] sm:hidden`}
              onClick={() => onToggle(Menu.PrivacyPolicy)}
            />
          </div>
          <div className={classnames(styles["sub-menu"], { [styles.show]: selected === Menu.PrivacyPolicy })}>
            <Link to="">{t("footer.condition")}</Link>
            <br />
            <Link className="font-bold" to="">
              {t("footer.contact")}
            </Link>
            <Link to="">{t("footer.recruitment")}</Link>
            <Link to="">{t("footer.contactDealer")}</Link>
          </div>
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
