import { createPortal } from "react-dom";

const Portal: React.FC = ({ children }) => {
  const mount = document.getElementById("portal-root");
  return createPortal(children, mount!);
};

export default Portal;
