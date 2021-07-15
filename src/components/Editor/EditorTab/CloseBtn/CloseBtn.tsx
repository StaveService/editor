/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef, MouseEvent } from "react";
import { IoIosClose, IoIosCloseCircle } from "react-icons/io";
import { GoSync } from "react-icons/go";
import styles from "./CloseBtn.sass";

interface CloseBtnProps {
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
  isChanged: boolean | void;
}
const CloseBtn: React.FC<CloseBtnProps> = ({
  isChanged,
  onClick,
}: CloseBtnProps) => {
  const [onHover, setHover] = useState(false);
  const closeBtnRef = useRef<HTMLDivElement>(null);
  const CloseIcon = () => (onHover ? <IoIosCloseCircle /> : <IoIosClose />);
  const ChangedIcon = () =>
    onHover ? <IoIosClose /> : <GoSync className={styles.goSync} />;
  const Icon = () => (isChanged ? <ChangedIcon /> : <CloseIcon />);
  const handleSetHover = (boolean: boolean) => () => setHover(boolean);

  return (
    <div
      role="button"
      ref={closeBtnRef}
      className={styles.closeBtn}
      onClick={onClick}
      onMouseEnter={handleSetHover(true)}
      onMouseLeave={handleSetHover(false)}
    >
      <Icon />
    </div>
  );
};

export default CloseBtn;
