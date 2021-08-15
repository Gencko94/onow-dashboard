import { useEffect } from "react";
import { createPortal } from "react-dom";

const Portal: React.FC = ({ children }) => {
  const mount = document.getElementById("portal-root");
  // const el = document.createElement("div");

  // useEffect(() => {
  //   mount?.appendChild(el);
  //   return () => {
  //     mount?.removeChild(el);
  //   };
  // }, [el, mount]);

  return createPortal(children, mount!);
};

export default Portal;
