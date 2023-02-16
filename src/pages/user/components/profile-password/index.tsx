import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { Col, Row } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FormInput } from "components/form/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { PasswordForm } from "@/models/user";
import { updatePassword } from "@/services/user.service";

const ProfilePassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    password: yup.string().min(6).required(t("errorMessage.required.password")!),
    newPassword: yup.string().min(6).required(t("errorMessage.required.password")!),
    confirmNewPassword: yup
      .string()
      .min(6)
      .required(t("errorMessage.required.confirmPassword")!)
      .oneOf([yup.ref("newPassword"), null], "Please make sure your new password match."),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PasswordForm>({ resolver: yupResolver(schema) });

  const onSubmit = async (value: PasswordForm) => {
    try {
      await updatePassword(value);
      reset();
      toast.success("Your profile has been updated successfully!");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="rounded-md md:shadow-lg h-full md:p-4">
      <h1 className="text-lg font-medium mb-8">เปลี่ยนรหัสผ่าน</h1>

      <Row>
        <Col span={24} md={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              label="รหัสผ่านปัจจุบัน"
              required
              type="password"
              labelClassName="text-base"
              {...register("password")}
              error={errors.password?.message}
            />
            <FormInput
              label="รหัสผ่านใหม่"
              required
              type="password"
              labelClassName="text-base"
              {...register("newPassword")}
              error={errors.newPassword?.message}
            />
            <FormInput
              label="พิมพ์รหัสผ่านใหม่อีกครั้ง"
              required
              type="password"
              labelClassName="text-base"
              {...register("confirmNewPassword")}
              error={errors.confirmNewPassword?.message}
            />

            <div className="flex gap-4 mt-8 mb-12">
              <button type="submit" className="btn-primary" disabled={isSubmitting}>
                ยืนยันการแก้ไข
              </button>
              <button type="button" className="btn-secondary" onClick={() => navigate("/user/profile")}>
                ยกเลิก
              </button>
            </div>
          </form>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePassword;
