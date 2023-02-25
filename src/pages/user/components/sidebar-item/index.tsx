import { memo, ReactNode } from "react";
import classnames from "classnames";
import { NavLink } from "react-router-dom";

type Props = {
  id: number;
  title: string;
  icon: ReactNode;
  link: string;
};

const SidebarItem = ({ id, title, icon, link }: Props) => {
  return (
    <div className="flex items-center gap-5" key={id}>
      {icon}
      <NavLink
        to={link}
        className={({ isActive }) =>
          classnames("text-base font-medium hover:text-black", {
            ["text-[#554994] hover:text-[#392b84]"]: isActive,
          })
        }
      >
        {title}
      </NavLink>
    </div>
  );
};

export default memo(SidebarItem);
