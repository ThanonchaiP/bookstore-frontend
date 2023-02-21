import { memo } from "react";
import { useTranslation } from "react-i18next";
import RatingStar from "components/rating-star";
import { BookReview } from "@/models/review";
import { toFixedNoRound } from "utils/util";
import noPicture from "assets/no-picture.png";

type Props = {
  data: BookReview;
};

const Review = ({ data }: Props) => {
  const { t } = useTranslation();

  return (
    <div id="reviews" className="mt-12 rounded-md sm:mt-0 sm:p-8 sm:shadow-md sm:m-8">
      <div className="flex flex-wrap gap-10 sm:gap-20">
        <div>
          <p className="text-base font-medium mb-4">{t("review.header")}</p>

          <div className="flex items-end gap-2 mb-2">
            <h3 className="text-4xl font-bold">{toFixedNoRound(data.ratingAvg) || 0}</h3>
            <h4 className="text-2xl font-bold">{`${t("review.full")} 5 ${t("review.star")}`}</h4>
          </div>
          <RatingStar rating={data.ratingAvg || 0} className="sm:text-[22px]" />
          <p className="text-base font-bold mt-2">
            {data.reviews.length || 0} {t("review.people")}
          </p>
        </div>

        <div className="flex flex-col-reverse flex-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center gap-4">
              <RatingStar rating={index + 1} className="sm:text-[21px]" />
              <div className="w-[25%] h-4 bg-[#F2F2F2] rounded-md overflow-hidden">
                <div className="bg-[#E9C869] h-full" style={{ width: `${data.ratingStar[index]?.percent || 0}%` }} />
              </div>
              <p className="text-base font-bold">{data.ratingStar[index]?.count || 0}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-10 mt-14">
        {data.reviews.map((item) => (
          <div key={item.id}>
            <div className="flex gap-3">
              <img className="w-[48px] h-[48px] rounded-full" src={noPicture} alt="profile" />
              <div>
                <p className="text-base font-bold">{item.user.firstname}</p>
                <RatingStar rating={item.rating} />
              </div>
            </div>
            {item.body && <p className="text-base mt-3">{item.body}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Review);
