import {
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineShoppingCart,
  HiOutlineUsers,
  HiOutlineDocumentText,
  HiOutlineAnnotation,
  HiOutlineQuestionMarkCircle,
  HiOutlineCog,
} from "react-icons/hi";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: <HiOutlineViewGrid />,
  },
  {
    key: "Store",
    label: "Store",
    path: "/store",
    icon: <HiOutlineCube />,
  },
  {
    key: "Settings",
    label: "Settings",
    path: "/store/settings",
    icon: <HiOutlineCube />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "settings",
    label: "Settings",
    path: "/settings",
    icon: <HiOutlineCog />,
  },
  {
    key: "support",
    label: "Help & Support",
    path: "/support",
    icon: <HiOutlineQuestionMarkCircle />,
  },
];
