import * as yup from "yup";
import { Modal } from "antd";
import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "store/configureStore";
import { LoginForm } from "@/models/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormInput } from "components/form/input";
import { signInUser, fetchCurrentUser, setOpenLoginPopup, loginPopupSelector } from "store/slice/accountSlice";

const LoginModal = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const loginSchema = yup.object().shape({
    email: yup.string().email(t("errorMessage.formInvalid.email")!).required(t("errorMessage.required.email")!),
    password: yup.string().min(6).required(t("errorMessage.required.password")!),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: yupResolver(loginSchema) });

  const openLoginPopup = useAppSelector(loginPopupSelector);
  const [formIncorrect, setFormIncorrect] = useState(false);

  const handleClose = () => {
    dispatch(setOpenLoginPopup(false));
  };

  const onSubmit = async (value: LoginForm) => {
    try {
      await dispatch(signInUser(value));
      await dispatch(fetchCurrentUser());
      handleClose();
    } catch (error) {
      setFormIncorrect(true);
    }
  };

  return (
    <Modal open={openLoginPopup} width={600} footer={<></>} onCancel={handleClose}>
      <h1 className="text-xl font-medium">{t("login.login")}</h1>

      <form className="flex justify-center pt-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-[100%] max-w-[580px]">
          <FormInput
            label={t("login.email")}
            placeholder={t("errorMessage.required.email")!}
            {...register("email")}
            error={errors.email?.message}
            required
          />
          <FormInput
            label={t("login.password")}
            type="password"
            placeholder={t("errorMessage.required.password")!}
            {...register("password")}
            error={errors.password?.message}
            required
          />

          {formIncorrect && <p className="text-sm font-medium text-red-500">{t("errorMessage.incorrect")}</p>}

          <button
            className="w-full bg-[#554994] text-white h-[40px] rounded-md my-2"
            type="submit"
            disabled={isSubmitting}
          >
            {t("login.login")}
          </button>

          <div className="flex items-center justify-between flex-wrap">
            <p>
              {t("login.newMember")}?
              <Link to="/register" onClick={handleClose} className="mx-2 text-blue-400">
                {t("login.register")}
              </Link>
              {t("login.here")}
            </p>
            <Link to="/" onClick={handleClose} className="text-[#554994]">
              {t("login.forgotPassword")}
            </Link>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default memo(LoginModal);
