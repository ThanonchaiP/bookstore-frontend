import * as yup from "yup";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormInput } from "components/form/input";
import { useAppDispatch, useAppSelector } from "store/configureStore";
import { setUser, userSelector } from "store/slice/accountSlice";
import { updateUser } from "@/services/user.service";

type ProfileForm = {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
};

const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);

  const schema = yup.object().shape({
    firstname: yup.string().required(t("errorMessage.required.name")!),
    lastname: yup.string().required(t("errorMessage.required.surname")!),
    phone: yup.string().min(9).required(t("errorMessage.required.phone")!),
    email: yup.string(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileForm>({ resolver: yupResolver(schema) });

  const onSubmit = async (value: ProfileForm) => {
    try {
      const { firstname, lastname, phone } = value;
      await updateUser(user!.id, { firstname, lastname, phone });
      dispatch(setUser({ ...user, firstname, lastname, phone }));
      toast.success("Your profile has been updated successfully!");
    } catch (error) {}
  };

  useEffect(() => {
    if (user) {
      const { firstname, lastname, phone, email } = user;
      reset({ firstname, lastname, phone, email });
    }
  }, []);

  return (
    <div className="rounded-md md:shadow-lg h-full md:p-4">
      <h1 className="text-lg font-medium mb-8">{t("user.myProfile")}</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 md:gap-6">
          <FormInput
            label={t("input.name")}
            labelClassName="text-base"
            required
            {...register("firstname")}
            error={errors.firstname?.message}
          />
          <FormInput
            label={t("input.surname")}
            labelClassName="text-base"
            required
            {...register("lastname")}
            error={errors.lastname?.message}
          />
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <FormInput
            label={t("input.phoneNumber")}
            labelClassName="text-base"
            required
            {...register("phone")}
            error={errors.phone?.message}
          />
          <FormInput label={t("input.email")} labelClassName="text-base" {...register("email")} disabled />
        </div>

        <div className="flex gap-4 mt-6 mb-10">
          <button type="submit" className="btn-primary hover:bg-[#3d3375]" disabled={isSubmitting}>
            บันทึก
          </button>
          <Link to="/user/profile-password">
            <button type="button" className="btn-secondary hover:bg-[#dfdbf4]">
              เปลี่ยนรหัสผ่าน
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Profile;
