import { useState, useCallback } from "react";
import { Settings } from "react-slick";
import { NextArrow, PrevArrow } from "../../components/carousel";

function useCategoryMenuViewModel() {
  const [dragging, setDragging] = useState(false);

  const handleBeforeChange = useCallback(() => {
    setDragging(true);
  }, [setDragging]);

  const handleAfterChange = useCallback(() => {
    setDragging(false);
  }, [setDragging]);

  const onClickCard = useCallback(
    (categoryId: number) => (e: React.SyntheticEvent) => {
      if (dragging) {
        e.stopPropagation();
        return;
      }

      console.log("categoryId : ", categoryId);
    },
    [dragging]
  );

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    lazyLoad: "progressive",
    beforeChange: handleBeforeChange,
    afterChange: handleAfterChange,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return { settings, onClickCard };
}

export { useCategoryMenuViewModel };
