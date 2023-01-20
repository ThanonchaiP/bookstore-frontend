import { memo, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "./index.module.scss";

type Props = { className?: string };
type IFormInput = { keyword: String };

function SearchBar({ className }: Props) {
  const { search } = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    navigate(`/products-filter?keyword=${data.keyword}`);
  };

  useEffect(() => {
    const keyword = new URLSearchParams(search).get("keyword") || "";
    setValue("keyword", keyword);
  }, [search]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`${styled["search-bar"]} ${className}`}>
      <input type="text" placeholder={t("navbar.searchPlaceholder")!} {...register("keyword")} />
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass" />
      </button>
    </form>
  );
}

export default memo(SearchBar);
