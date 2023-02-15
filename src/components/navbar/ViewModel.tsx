import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/configureStore";
import { setOpenLoginPopup, userSelector } from "store/slice/accountSlice";
import useMediaQuery from "utils/hooks/useMediaQuery";
import useOnClickOutside from "utils/hooks/useOnClickOutside";

export function useNavbarViewModel() {
  const cartPopupRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(userSelector);
  const [sticky, setSticky] = useState(false);
  const { cart, totalPrice } = useAppSelector((state) => state.cart);
  const [openCartPopup, setOpenCartPopup] = useState(false);

  const handleOpenLoginPopup = () => {
    dispatch(setOpenLoginPopup(true));
  };

  const handleCartPopup = useCallback(() => {
    if (isMobile) {
      navigate("/user/cart");
      return;
    }

    setOpenCartPopup((prev) => !prev);
  }, [isMobile]);

  useOnClickOutside(cartPopupRef, () => {
    if (openCartPopup) setOpenCartPopup(false);
  });

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return {
    isMobile,
    user,
    totalPrice,
    sticky,
    cart: {
      cartState: cart,
      cartPopupRef,
      openCartPopup,
      handleCartPopup,
    },
    handleOpenLoginPopup,
  };
}
