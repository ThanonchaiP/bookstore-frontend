import { Fragment, memo, useState } from "react";
import classnames from "classnames";
import useMediaQuery from "utils/hooks/useMediaQuery";
import styled from "./index.module.scss";

type Props = {
  id: number;
  name: string;
  onChange?: (value: number) => void;
};

const FilterItem = ({ id, name, onChange }: Props) => {
  const isDesktop = useMediaQuery("(min-width: 992px)");
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
    if (onChange) onChange(id);
  };

  return (
    <Fragment>
      {isDesktop ? (
        <div className="flex items-center gap-2 px-4 my-2">
          <label className={styled["checkbox-container"]}>
            <input type="checkbox" checked={checked} onChange={handleChange} />
            <div className={styled.checkmark} />
          </label>
          <p className="text-sm">{name}</p>
        </div>
      ) : (
        <div className={classnames(styled["filter-item"], { [styled.selected]: checked })} onClick={handleChange}>
          <p className="text-xs text-center">{name}</p>
        </div>
      )}
    </Fragment>
  );
};

export default memo(FilterItem);
