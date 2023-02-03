import { ComponentProps, forwardRef } from "react";
import styled from "./index.module.scss";

interface InputProps extends ComponentProps<"input"> {}

export const FormCheckbox = forwardRef<HTMLInputElement, InputProps>(function Input({ ...props }, ref) {
  return (
    <label className={styled.container}>
      <input type="checkbox" ref={ref} {...props} />
      <div className={styled.checkmark} />
    </label>
  );
});
