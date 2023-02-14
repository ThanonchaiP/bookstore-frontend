import { ComponentProps, forwardRef } from "react";
import styles from "./index.module.scss";

interface InputProps extends ComponentProps<"input"> {}

export const FormCheckbox = forwardRef<HTMLInputElement, InputProps>(function Input({ ...props }, ref) {
  return (
    <label className={styles.container}>
      <input type="checkbox" ref={ref} {...props} />
      <div className={styles.checkmark} />
    </label>
  );
});
