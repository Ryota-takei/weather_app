import styles from "./RadioButton.module.css";
type Props = {
  value: boolean;
  name: string;
  boolean: boolean;
  onClick: () => void;
};

export const RadioButton: React.VFC<Props> = (props) => {
  const { value, name, onClick, boolean } = props;
  return (
    <>
      <input
        className={styles.radio_input}
        type="radio"
        value={name}
        disabled={value === boolean}
        checked={value === boolean}
        onChange={onClick}
      />
      <p
        className={
          value === boolean ? styles.disabled_btn_name : styles.btn_name
        }
      >
        {name}
      </p>
    </>
  );
};
