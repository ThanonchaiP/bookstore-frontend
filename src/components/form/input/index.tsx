import { ComponentProps, forwardRef } from "react";
import classnames from "classnames";
import styles from "./index.module.scss";

interface InputProps extends ComponentProps<"input"> {
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  containerClassName?: string;
}

export const FormInput = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, type = "text", className = "", error, required, containerClassName = "", ...props },
  ref
) {
  return (
    <div className={classnames([styles["form-group"], containerClassName])}>
      <label className="inline-block mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        className={classnames([styles.input, className], { [styles["input-invalid"]]: error })}
        type={type}
        ref={ref}
        {...props}
      />
      {error && <span className="inline-block mt-1 text-red-500">{error}</span>}
    </div>
  );
});
