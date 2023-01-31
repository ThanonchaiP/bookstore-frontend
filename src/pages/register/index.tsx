import * as yup from "yup";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FormInput } from "components/form/input";
import { RegisterForm } from "@/models/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUp } from "@/services/auth.service";
import Dialog from "components/dialog";
import styled from "./index.module.scss";

const Register = () => {
  const { t } = useTranslation();

  const [dialog, setDialog] = useState({
    open: false,
    variant: "success",
    title: "Success!",
    message: "Congratulations, your account has been successfully created.",
  });

  const schema = yup.object().shape({
    firstname: yup.string().required(t("errorMessage.required.name")!),
    lastname: yup.string().required(t("errorMessage.required.surname")!),
    phone: yup.string().min(9).required(t("errorMessage.required.phone")!),
    email: yup.string().email(t("errorMessage.formInvalid.email")!).required(t("errorMessage.required.email")!),
    password: yup.string().min(6).required(t("errorMessage.required.password")!),
    confirmPassword: yup
      .string()
      .min(6)
      .required(t("errorMessage.required.confirmPassword")!)
      .oneOf([yup.ref("password"), null], "Please make sure your password match."),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({ resolver: yupResolver(schema) });

  const handleClose = useCallback(() => setDialog((state) => ({ ...state, open: false })), []);

  const onSubmit = async (value: RegisterForm) => {
    try {
      await signUp(value);
      setDialog((state) => ({ ...state, open: true }));
      reset();
    } catch (error: any) {
      setDialog((state) => ({
        ...state,
        open: true,
        title: "Error!",
        variant: "error",
        message: error.response.data.message,
      }));
    }
  };

  return (
    <div className={styled.register}>
      <div className={styled["register__container"]}>
        <h1 className="text-center text-2xl font-bold mb-4">{t("register.createAccount")}</h1>

        <form className={styled.content} onSubmit={handleSubmit(onSubmit)}>
          <FormInput label={t("input.name")} required {...register("firstname")} error={errors.firstname?.message} />
          <FormInput label={t("input.surname")} required {...register("lastname")} error={errors.lastname?.message} />
          <FormInput label={t("input.phoneNumber")} required {...register("phone")} error={errors.phone?.message} />
          <FormInput label={t("input.email")} required {...register("email")} error={errors.email?.message} />
          <FormInput
            label={t("input.password")}
            type="password"
            required
            {...register("password")}
            error={errors.password?.message}
          />
          <FormInput
            label={t("input.confirmPassword")}
            type="password"
            required
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />

          <button disabled={isSubmitting} className={styled["btn-submit"]} type="submit">
            {t("register.signUp")}
          </button>
          <p className="text-sm mt-2">
            {t("register.alreadyMember")}?
            <Link to="/login" className="text-blue-400 mx-2">
              {t("register.login")}
            </Link>
            {t("register.here")}
          </p>
        </form>
      </div>

      <Dialog
        open={dialog.open}
        title={dialog.title}
        message={dialog.message}
        onClose={handleClose}
        variant={dialog.variant}
      />
    </div>
  );
};

export default Register;
