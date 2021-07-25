import { PERMISSIONS } from "../interfaces/staff/staff";

interface IProps {
  permissions?: PERMISSIONS;
  path: string;
  role?: "ADMIN" | "STAFF" | "SUPER_USER";
}

// List of General Paths
const generalPaths = ["/dashboard"];

// Checks if the path is one of the general pages
const isGeneralPage = (path: string, permissions: PERMISSIONS) => {
  if (path === "/settings") return true;
  if (path.includes("/settings")) {
    const page = path.slice(10);
    if (page === "account-settings") return true;
    return false;
  }
  if (generalPaths.includes(path)) {
    return true;
  }
  return false;
};

const canVisitPage = ({ permissions, path, role }: IProps) => {
  if (!permissions) return false;
  // If SU or ADMIN proceed
  if (role === "ADMIN" || role === "SUPER_USER") return true;
  // if Staff , check general and settings pages
  if (isGeneralPage(path, permissions)) return true;

  if (path === "/customers") {
    if (permissions.includes("visitCustomers")) return true;
    return false;
  } else if (path === "/products") {
    if (permissions.includes("visitProducts")) return true;
    return false;
  }
  return false;
};

export default canVisitPage;
