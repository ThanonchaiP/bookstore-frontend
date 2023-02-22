import { Modal } from "antd";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import checkIcon from "assets/check.png";
import errorIcon from "assets/error.png";

type Props = {
  open: boolean;
  title?: string;
  message?: string;
  variant?: string;
  onClose: () => void;
};

const Dialog = ({ open, title, message, variant = "success", onClose }: Props) => {
  const { t } = useTranslation();

  return (
    <Modal open={open} width={400} onCancel={onClose} footer={null}>
      <img
        className="mx-auto mt-4"
        src={variant === "success" ? checkIcon : errorIcon}
        alt="dialog icon"
        width={90}
        loading="lazy"
      />

      <h1 className="text-3xl text-center font-medium mt-6">{title}</h1>

      <div className="sm:px-8">
        <p className="text-center mt-3 text-lg font-medium text-gray-400">{message}</p>

        <button className="w-full bg-[#554994] h-10 rounded-md font-bold text-white mt-6" onClick={onClose}>
          {t("ok").toUpperCase()}
        </button>
      </div>
    </Modal>
  );
};

export default memo(Dialog);
