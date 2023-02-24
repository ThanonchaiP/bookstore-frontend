import { ComponentProps, forwardRef, useState } from "react";
import classnames from "classnames";
import styles from "./index.module.scss";

interface InputProps extends ComponentProps<"input"> {
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  containerClassName?: string;
}

export const FormInput = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, type = "text", className = "", error, required, containerClassName = "", labelClassName, ...props },
  ref
) {
  const [inputType, setInputType] = useState(type);
  const onChangeType = () => setInputType((state) => (state === "text" ? "password" : "text"));

  return (
    <div className={classnames([styles["form-group"], containerClassName])}>
      <label className={classnames("inline-block mb-2", labelClassName)}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        <input
          className={classnames([styles.input, className], { [styles["input-invalid"]]: error })}
          type={inputType}
          ref={ref}
          {...props}
        />

        {type === "password" && (
          <i
            className={`absolute top-[6px] right-3 text-xl cursor-pointer text-[#595959] fa-regular ${
              inputType === "password" ? "fa-eye-slash" : "fa-eye"
            } `}
            onClick={onChangeType}
          />
        )}
      </div>
      {error && <span className="inline-block mt-1 text-red-500">{error}</span>}
    </div>
  );
});
