import { ButtonHTMLAttributes, memo, ReactNode } from "react";
import classnames from "classnames";
import styles from "./index.module.scss";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode;
  variant?: "contained" | "outlined";
}

const Button = ({ variant = "contained", className, children, ...rest }: Props) => {
  return (
    <button
      className={classnames(variant === "contained" ? styles["btn-contained"] : styles["btn-outlined"], className)}
      {...rest}
    >
      {children}
    </button>
  );
};

export default memo(Button);
