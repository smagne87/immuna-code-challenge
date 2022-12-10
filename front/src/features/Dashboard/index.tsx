import { FaChevronDown, FaCircle, FaEthereum } from "react-icons/fa";
import { MdNotifications, MdContentCopy } from "react-icons/md";
import Logo from "@assets/logo.svg";
import NavBar from "@components/NavBar";
import SearchText from "@components/SearchText";
import ProtocolList from "./components/ProtocolList";

const Dashboard = () => {
  return (
    <div className="w-full flex h-full">
      <div className="w-1/5 flex h-full justify-start items-center shadow-sm p-4 min-h-screen flex-col">
        <img src={Logo} />
        <div className="flex mt-6 w-full p-7">
          <NavBar />
        </div>
      </div>
      <div className="w-4/5 h-full flex flex-col">
        <div className="w-full h-16 flex justify-between px-5 items-center shadow-sm">
          <div className="flex items-center gap-10">
            <h3 className="font-normal">Dashboard</h3>
            <SearchText />
          </div>
          <div className="flex gap-1 items-center">
            <MdNotifications className="text-gray-700" />
            <FaCircle
              size="1.5rem"
              className="bg-gray-500 rounded-full text-gray-300"
            />
            Betty Cooper
            <FaChevronDown size="8px" />
          </div>
        </div>
        <div className="w-full h-full flex">
          <div className="w-full h-full bg-gray-100 p-4">
            <div className="w-full flex justify-between items-center">
              <div>
                <h3 className="font-normal">Immuna Monitor Portal</h3>
              </div>
              <div className="flex gap-2">
                <SearchText />
                <div className="flex rounded-full bg-blue-100 w-52 h-10 items-center justify-between pl-3">
                  <p className="flex items-center text-gray-600">
                    <FaEthereum /> ETH
                  </p>
                  <div className="ml-2 flex items-center justify-center rounded-full bg-blue-300 w-48 h-10">
                    0xBAD7...E116
                  </div>
                </div>
                <div className="flex items-center justify-center rounded-full bg-blue-300 w-10 h-10">
                  <MdContentCopy />
                </div>
              </div>
            </div>
            <ProtocolList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
