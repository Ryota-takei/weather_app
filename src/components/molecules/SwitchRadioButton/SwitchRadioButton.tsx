import React from "react";
import { RadioButton } from "../../atoms/RadioButton/RadioButton";
import styles from "./SwitchRadioButton.module.css"

type Props = {
  val: boolean;
  onClick: () => void;
};

export const SwitchRadioButton: React.VFC<Props> = (props) => {
  const { val, onClick } = props;
  return (
  <>
      <p className={styles.hourly_header}>１時間ごとの予測</p>
      <div className={styles.button_wrapper}>
      <RadioButton value={val} onClick={onClick} name={"気温"} boolean={true} />
      <RadioButton
        value={val}
        onClick={onClick}
        name={"湿度"}
        boolean={false}
      />
      </div>
      </>
  );
};
