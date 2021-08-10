import { IconType } from "react-icons/lib";
import useResponsive from "../../hooks/useResponsive";

interface IconProps {
  Icon: IconType;
  /**
   * Icon Size ; Defaults to 22
   */
  iconSize?: number;
}

const IconWrapper = ({ Icon, iconSize = 22 }: IconProps) => {
  const { isDesktop } = useResponsive();

  return <Icon size={isDesktop ? iconSize : iconSize - 5} />;
};

export default IconWrapper;
