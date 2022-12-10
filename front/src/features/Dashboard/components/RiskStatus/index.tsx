import clsx from "clsx";
import "./risk-status.css";

const RISK_STATUS = ["Green", "Red", "Yellow"];

const RiskStatus = () => {
  const randomStatus = Math.floor(Math.random() * 3) + 1;

  return (
    <span
      className={clsx("risk-budget", {
        "risk-green": randomStatus === 1,
        "risk-red": randomStatus === 2,
        "risk-yellow": randomStatus === 3,
      })}
    >
      {RISK_STATUS[randomStatus - 1]}
    </span>
  );
};

export default RiskStatus;
