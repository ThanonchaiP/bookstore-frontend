import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAppSelector } from "store/configureStore";
import SidebarItem from "../sidebar-item";
import styles from "./index.module.scss";

const Sidebar = () => {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.account.user);

  const menu = [
    {
      id: 1,
      title: t("user.myProfile"),
      icon: <i className="fa-solid fa-user text-2xl text-[#554994] w-[27px]" />,
      link: "/user/profile",
    },
    {
      id: 2,
      title: t("navbar.myOrder"),
      icon: <i className="fa-sharp fa-solid fa-cart-shopping text-2xl text-[#554994] w-[27px] mr-[4px] ml-[-4px]" />,
      link: "/user/order",
    },
    {
      id: 3,
      title: t("favorite.myWishlist"),
      icon: <i className="fa-solid fa-heart text-2xl text-[#554994] w-[27px]" />,
      link: "/user/favorite",
    },
  ];

  return (
    <>
      {user && (
        <div className="rounded-md shadow-lg">
          <div className="flex items-center gap-3 py-6 px-4">
            <div className={styles.profile}>{user.firstname[0]}</div>
            <div className="flex-1 w-full">
              <p className={styles["full-name"]}>{`${user.firstname} ${user.lastname}`}</p>
              <Link to="/user/profile" className="text-base text-gray-400 hover:text-[#554994]">
                {t("navbar.editProfile")}
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4 p-4">
            {menu.map((item) => (
              <SidebarItem {...item} key={item.id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default memo(Sidebar);
