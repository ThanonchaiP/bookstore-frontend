import * as yup from "yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Input } from "components/form/input";
import { LoginForm } from "@/models/auth";
import { login } from "@/services/auth.service";
import { setItem } from "utils/localstorage";
import styled from "./index.module.scss";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const loginSchema = yup.object().shape({
    email: yup.string().email(t("errorMessage.formInvalid.email")!).required(t("errorMessage.required.email")!),
    password: yup.string().min(6).required(t("errorMessage.required.password")!),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: yupResolver(loginSchema) });

  const [formIncorrect, setFormIncorrect] = useState(false);

  const onSubmit = async (value: LoginForm) => {
    try {
      const { data } = await login(value);
      setItem("token", JSON.stringify(data.token));
      setItem("user", data.user);

      navigate("/", { replace: true });
    } catch (error) {
      setFormIncorrect(true);
    }
  };

  return (
    <div className={styled.login}>
      <div className={styled["login__container"]}>
        <h1 className="text-center text-2xl font-bold mb-4">{t("login.login")}</h1>

        <form className={styled.content} onSubmit={handleSubmit(onSubmit)}>
          <div className="w-[100%] max-w-[580px]">
            <Input
              label={t("login.email")}
              placeholder={t("errorMessage.required.email")!}
              {...register("email")}
              error={errors.email?.message}
              required
            />
            <Input
              label={t("login.password")}
              type="password"
              placeholder={t("errorMessage.required.password")!}
              {...register("password")}
              error={errors.password?.message}
              required
            />

            {formIncorrect && <p className="text-sm font-medium text-red-500">{t("errorMessage.incorrect")}</p>}

            <button className={styled["btn-submit"]} type="submit" disabled={isSubmitting}>
              {t("login.login")}
            </button>

            <div className="flex items-center justify-between flex-wrap">
              <p>
                {t("login.newMember")}?
                <Link to="" className="mx-2 text-blue-400">
                  {t("login.register")}
                </Link>
                {t("login.here")}
              </p>
              <Link to="/" className="text-[#554994]">
                {t("login.forgotPassword")}
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
