import { Rate } from "antd";
import { toast } from "react-toastify";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "antd/es/modal/Modal";
import { createReview, getReview, updateReview } from "@/services/review.sevice";
import { OrderItem } from "@/models/order";

type Props = {
  open: boolean;
  item: OrderItem;
  handleClose: (created?: boolean) => void;
};

const ReviewPopup = ({ open, item, handleClose }: Props) => {
  const { t } = useTranslation();
  const [value, setValue] = useState({ rating: 0, body: "" });
  const [error, setError] = useState(false);

  const onChangeRating = (rating: number) => {
    if (error) setError(false);
    setValue((state) => ({ ...state, rating }));
  };

  const onChangeBody = (body: string) => setValue((state) => ({ ...state, body }));

  const onSubmit = async () => {
    try {
      if (value.rating === 0) {
        setError(true);
        return;
      }

      if (item.review) {
        const { id } = item.review;
        await updateReview(id, { ...value });
      } else {
        await createReview({ ...value, bookId: item.book.id, orderItemId: item.id });
      }

      toast.success("Review Submitted Successfully.", { autoClose: 2000 });
      handleClose(item.review ? false : true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadReview = async (reviewId: number) => {
      const result = await getReview(reviewId);
      const { body, rating } = result.data;
      setValue({ body, rating });
    };

    if (item.review) loadReview(item.review.id);
  }, [item.review]);

  return (
    <Modal open={open} width={500} footer={null} onCancel={() => handleClose()} closable={false}>
      <h1 className="text-xl font-medium">{t("user.rateProduct")}</h1>

      {item && (
        <div className="mt-4">
          <img
            className="shadow-md mx-auto mb-4"
            width={80}
            src={item.book.image}
            alt={item.book.name}
            crossOrigin="anonymous"
          />
          <p className="text-base font-bold">{item.book.name}</p>
          <p className="text-gray-400">฿{item.book.price}</p>

          <h3 className="text-base font-semibold mt-4">{t("user.productQuality")}</h3>
          <Rate className="" value={value.rating} onChange={onChangeRating} />
          {error && <p className="text-red-500 font-medium">กรุณาเลือกคะแนนสินค้า</p>}

          <h3 className="text-base font-semibold mt-4">{t("user.reviewMessage")}</h3>
          <textarea
            className="w-full outline-none p-2 border-[2px] border-gray-300 rounded-sm focus:border-[#554994]"
            rows={3}
            cols={33}
            value={value.body}
            onChange={(e) => onChangeBody(e.target.value)}
          />

          <div className="flex justify-end gap-4 mt-4">
            <button
              className="w-[140px] py-2 font-semibold duration-300 rounded-md bg-gray-100 hover:bg-gray-300"
              onClick={() => handleClose()}
            >
              {t("user.cancel")}
            </button>
            <button
              className="w-[140px] py-2 font-semibold duration-300 bg-[#554994] text-white rounded-md hover:bg-[#453a83]"
              onClick={onSubmit}
            >
              {t("user.submit")}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default memo(ReviewPopup);
