import { Link } from "react-router-dom";
import notFoundImage from "@/assets/not-found.png";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[100vh] bg-black">
      <Link to="/">
        <img src={notFoundImage} alt="not found" />
      </Link>
    </div>
  );
};

export default NotFound;
