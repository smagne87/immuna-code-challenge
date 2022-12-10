import React, { useState } from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { FaEthereum, FaChevronDown, FaCircle } from "react-icons/fa";
import BgImmuna from "@assets/bg-immuna.png";
import Logo from "@assets/logo.svg";
import "./home.css";

const Home: React.FC = () => {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: fieldValue } = e.target;
    const emailRg = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    setEmailInvalid(false);
    if (!email || !emailRg.test(email)) {
      setEmailInvalid(true);
    }
    setEmail(fieldValue);
  };

  const handleOnClick = () => {
    if (!emailInvalid) {
      history("/dashboard");
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-16 flex justify-between px-5 items-center">
        <img src={Logo} />
        <div className="flex gap-1 items-center">
          <FaCircle
            size="1.5rem"
            className="bg-gray-500 rounded-full text-gray-300"
          />
          N/A
          <FaChevronDown size="8px" />
        </div>
      </div>
      <div className="w-full flex">
        <div className="bg-home w-1/2">
          <img src={BgImmuna} className="w-full h-full" />
        </div>
        <div className="w-1/2 bg-form p-12">
          <div className="form-container">
            <h2 className="text-3xl">Welcome to Immuna!</h2>
            <p>Connect your wallet</p>
            <div className="flex flex-col gap-4 pt-8 mt-8 w-full">
              <p className="flex items-center gap-1">
                <FaEthereum /> Ethereum
              </p>
              <input
                type="email"
                placeholder="Enter wallet address"
                className={clsx("text-field mb-6", { error: emailInvalid })}
                onChange={handleEmailChange}
              />
              <button type="button" className="button" onClick={handleOnClick}>
                Connect to Wallet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
