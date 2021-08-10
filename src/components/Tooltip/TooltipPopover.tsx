import React, { useState } from "react";

interface TooltipProps {
  coords: {
    top?: number;
    left?: number;
  };
}

const TooltipPopover: React.FC<TooltipProps> = ({
  coords: { left, top },
  children,
}) => {
  return (
    <div style={{ top, left, position: "fixed", zIndex: 9999 }}>{children}</div>
  );
};

export default TooltipPopover;
