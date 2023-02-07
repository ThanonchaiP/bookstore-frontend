import { memo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "@/models/user";
import { useAppDispatch } from "store/configureStore";
import { signOut } from "store/slice/accountSlice";
import useOnClickOutside from "utils/hooks/useOnClickOutside";
import { useTranslation } from "react-i18next";
import { clearCart } from "store/slice/cartSlice";
import styled from "./index.module.scss";

type Props = {
  user: User;
};

const ProfileMenu = ({ user }: Props) => {
  const ref = useRef(null);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [openMenu, setOpenMenu] = useState(false);

  const menu = [
    { id: 1, title: t("navbar.manageAccount"), icon: <i className="fa-solid fa-user" />, link: "" },
    { id: 2, title: t("navbar.favoriteList"), icon: <i className="fa-solid fa-heart" />, link: "" },
  ];

  const onClick = () => setOpenMenu((prev) => !prev);

  const onSignOut = () => {
    dispatch(signOut());
    dispatch(clearCart());
  };

  useOnClickOutside(ref, () => {
    if (openMenu) setOpenMenu(false);
  });

  return (
    <div className="relative font-medium cursor-pointer select-none" onClick={onClick} ref={ref}>
      {user.firstname}
      <i className="fa-solid fa-angle-down ml-2" />

      {openMenu && (
        <div className={styled["dropdown-menu"]}>
          {menu.map((item) => (
            <Link className={styled.item} key={item.id} to={item.link}>
              {item.icon}
              {item.title}
            </Link>
          ))}
          <p className={styled.item} onClick={onSignOut}>
            <i className="fa-solid fa-right-from-bracket" />
            {t("navbar.logOut")}
          </p>
        </div>
      )}
    </div>
  );
};

export default memo(ProfileMenu);
