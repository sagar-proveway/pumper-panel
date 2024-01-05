import axios from "axios";
import classNames from "classnames";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import {
  DASHBOARD_SIDEBAR_LINKS,
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
} from "../../lib/constants";

const linkClass =
  "flex items-center gap-2 font-medium px-3 py-2 hover:text-teal-300 hover:no-underline active:text-teal-300 rounded-sm text-base";

export default function Sidebar() {
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await axios.post(
        "/api/user/logout",
        {},
        {
          withCredentials: true,
        }
      );

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-slate-800 w-60 flex flex-col">
      <div className="flex items-center gap-2 px-6 py-6">
        <span className="text-teal-300 text-xl font-extrabold">
          Pumper Dev Panel
        </span>
      </div>
      <div className="py-8 px-3 flex flex-1 flex-col gap-0.5">
        {DASHBOARD_SIDEBAR_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} />
        ))}
      </div>
      <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} />
        ))}
        <div
          className={classNames(linkClass, "cursor-pointer text-red-500")}
          onClick={() => {
            logOut();
          }}
        >
          <span className="text-xl">
            <BiLogOut />
          </span>
          Logout
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ link }) {
  const { pathname } = useLocation();

  const checkActiveLink = function (path, compare) {
    const URL = pathname.split("/");

    if (URL.includes("store") && path === "/store") return true;
    if (pathname === path) return true;

    return false;
  };

  return (
    <Link
      to={link.path}
      className={classNames(
        checkActiveLink(link.path) ? "text-teal-300" : "text-stone-200",
        linkClass
      )}
    >
      <span className="text-xl">{link.icon}</span>
      {link.label}
    </Link>
  );
}
