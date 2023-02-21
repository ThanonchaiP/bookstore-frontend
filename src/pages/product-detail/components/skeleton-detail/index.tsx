import { memo } from "react";
import { Skeleton } from "antd";
import styles from "./index.module.scss";

const SkeletonDetail = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-[56px] px-8">
        <div className="flex justify-center">
          <Skeleton.Image className={styles["product-image"]} />
        </div>
        <Skeleton paragraph={{ rows: 10 }} />
      </div>

      <div className="m-8 p-8">
        <Skeleton paragraph={{ rows: 3 }} />
      </div>
    </>
  );
};

export default memo(SkeletonDetail);
