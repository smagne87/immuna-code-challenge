import {
  MdVerifiedUser,
  MdSecurity,
  MdWarning,
  MdDashboard,
} from "react-icons/md";

const NavBar = (): JSX.Element => {
  return (
    <ul className="w-full">
      <li className="flex items-center gap-1 p-3 pl-6 rounded-md text-white bg-blue-600">
        <MdDashboard />
        Dashboard
      </li>
      <li className="flex items-center gap-1 p-3 pl-6 rounded-sm">
        <MdWarning /> Alerts
      </li>
      <li className="flex items-center gap-1 p-3 pl-6 rounded-sm">
        <MdSecurity />
        Defend
      </li>
      <li className="flex items-center gap-1 p-3 pl-6 rounded-sm">
        <MdVerifiedUser /> Protect
      </li>
    </ul>
  );
};

export default NavBar;
