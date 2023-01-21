import { memo, useState } from "react";
import styled from "./index.module.scss";

type Props = {
  id: number;
  name: string;
  onChange?: (value: number) => void;
};

const FilterItem = ({ id, name, onChange }: Props) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
    if (onChange) onChange(id);
  };

  return (
    <div className="flex items-center gap-2 px-4 my-2">
      <label className={styled["checkbox-container"]}>
        <input type="checkbox" checked={checked} onChange={handleChange} />
        <div className={styled.checkmark} />
      </label>
      <p className="text-sm">{name}</p>
    </div>
  );
};

export default memo(FilterItem);
