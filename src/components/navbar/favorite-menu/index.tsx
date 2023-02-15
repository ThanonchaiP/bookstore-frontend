import { memo } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "store/configureStore";

const FavoriteMenu = () => {
  const { favorites } = useAppSelector((state) => state.favorite);
  return (
    <Link to="/user/favorite" className="relative">
      <i className="fa-solid fa-heart mb-1 text-2xl text-[#555559] hover:text-[#554994]" />

      {favorites.length > 0 && (
        <span className="absolute right-[-9px] top-[-2px] flex items-center justify-center w-[20px] h-[20px] rounded-full text-xs bg-[#554994] text-white">
          {favorites.length}
        </span>
      )}
    </Link>
  );
};

export default memo(FavoriteMenu);
