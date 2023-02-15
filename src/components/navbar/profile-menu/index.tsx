import classnames from "classnames";
import { memo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "@/models/user";
import { useAppDispatch } from "store/configureStore";
import { signOut } from "store/slice/accountSlice";
import { useTranslation } from "react-i18next";
import { clearCart } from "store/slice/cartSlice";
import { clearFavoriteState } from "store/slice/favoriteSlice";
import useOnClickOutside from "utils/hooks/useOnClickOutside";
import styles from "./index.module.scss";

type Props = {
  user: User;
  className?: string;
};

const ProfileMenu = ({ user, className }: Props) => {
  const ref = useRef(null);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [openMenu, setOpenMenu] = useState(false);

  const menu = [
    { id: 1, title: t("navbar.manageAccount"), icon: <i className="fa-solid fa-user" />, link: "/user/edit-profile" },
    {
      id: 2,
      title: t("navbar.myOrder"),
      icon: <i className="fa-sharp fa-solid fa-cart-shopping ml-[-3px] mr-[3px]" />,
      link: "/user/order",
    },
    { id: 3, title: t("navbar.favoriteList"), icon: <i className="fa-solid fa-heart" />, link: "/user/favorite" },
  ];

  const onClick = () => setOpenMenu((prev) => !prev);

  const onSignOut = () => {
    dispatch(clearFavoriteState());
    dispatch(clearCart());
    dispatch(signOut());
  };

  useOnClickOutside(ref, () => {
    if (openMenu) setOpenMenu(false);
  });

  return (
    <div
      className={classnames("relative font-medium cursor-pointer select-none", [className])}
      onClick={onClick}
      ref={ref}
    >
      {user.firstname}
      <i className="fa-solid fa-angle-down ml-2" />

      {openMenu && (
        <div className={styles["dropdown-menu"]}>
          {menu.map((item) => (
            <Link className={styles.item} key={item.id} to={item.link}>
              {item.icon}
              {item.title}
            </Link>
          ))}
          <p className={styles.item} onClick={onSignOut}>
            <i className="fa-solid fa-right-from-bracket" />
            {t("navbar.logOut")}
          </p>
        </div>
      )}
    </div>
  );
};

export default memo(ProfileMenu);
