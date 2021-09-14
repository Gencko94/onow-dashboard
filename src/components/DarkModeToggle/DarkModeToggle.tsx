import { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useSpring, useTrail, animated } from "@react-spring/web";
import { up } from "../../utils/themes";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
const DarkModeToggleContainer = () => {
  const { colorMode, toggleTheme } = useContext(ThemeContext);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isDark = colorMode === "dark";
  const svgSpring = useSpring({
    transform: isDark ? "rotate(40deg)" : "rotate(90deg)",
    immediate: prefersReducedMotion,
  });
  const maskSpring = useSpring({
    cx: isDark ? 10 : 25,
    cy: isDark ? 2 : 0,
    config: {
      mass: 3.1,
      friction: 21,
    },
    immediate: prefersReducedMotion,
  });
  const sunMoonSpring = useSpring({
    r: isDark ? 8 : 5,
    immediate: prefersReducedMotion,
  });
  const sunDotAngles = [0, 60, 120, 180, 240, 300];
  const sunDotTrail = useTrail(sunDotAngles.length, {
    transform: isDark ? 0 : 1,
    transformOrigin: "center center",
    immediate: isDark || prefersReducedMotion,
    config: {
      tension: 210,
      friction: 20,
    },
  });
  return (
    <IconWrapper
      onClick={() => toggleTheme?.()}
      aria-label={isDark ? "Activate light mode" : "Activate dark mode"}
      title={isDark ? "Activate light mode" : "Activate dark mode"}
    >
      <MoonOrSun width="18" height="18" viewBox="0 0 18 18" style={svgSpring}>
        <mask id={`moon-mask-main-nav`}>
          <rect x="0" y="0" width="18" height="18" fill="#FFF" />
          <animated.circle {...maskSpring} r="8" fill="black" />
        </mask>

        <animated.circle
          cx="9"
          cy="9"
          mask={`url(#moon-mask-main-nav)`}
          {...sunMoonSpring}
        />

        {/* Sun dots */}
        <g>
          {sunDotTrail.map(({ transform, ...props }, index) => {
            const angle = sunDotAngles[index];
            const centerX = 9;
            const centerY = 9;

            const angleInRads = (angle / 180) * Math.PI;

            const c = 8; // hypothenuse
            const a = centerX + c * Math.cos(angleInRads);
            const b = centerY + c * Math.sin(angleInRads);

            return (
              <animated.circle
                key={angle}
                cx={a}
                cy={b}
                r={1.5}
                style={{
                  ...props,
                  transform: transform.to((t) => `scale(${t})`),
                }}
              />
            );
          })}
        </g>
      </MoonOrSun>
    </IconWrapper>
  );
};

export default DarkModeToggleContainer;
const IconWrapper = styled.button(
  ({ theme: { breakpoints, text } }) => `
  opacity: 0.7;
  position: relative;
  border-radius: 5px;
  width: 40px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 250ms;
  
 ${up(breakpoints.md)}{
    &:hover {
        opacity: 1;
      }
 }

  `
);
const MoonOrSun = styled(animated.svg)`
  position: relative;
  overflow: visible;
  fill: ${(props) => props.theme.text};
`;
