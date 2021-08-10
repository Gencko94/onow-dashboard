import { useState } from "react";
import styled from "styled-components";
import { usePrefersReducedMotion } from "../../../hooks/usePrefersReducedMotion";
import { useRandomInterval } from "../../../hooks/useRandomInterval";
import { generateSparkle } from "../../../utils/generateSparkle";
import { range } from "../../../utils/range";
import Sparkle from "./Sparkle";

const Sparkes: React.FC<{ color?: string }> = ({
  children,
  color = "#FFC700",
}) => {
  const [sparkles, setSparkles] = useState(() => {
    return range(3).map(() => generateSparkle(color));
  });
  const prefersReducedMotion = usePrefersReducedMotion();
  useRandomInterval(
    () => {
      const sparkle = generateSparkle(color);
      const now = Date.now();
      const nextSparkles = sparkles.filter((sp) => {
        const delta = now - sp.createdAt;
        return delta < 750;
      });
      nextSparkles.push(sparkle);
      setSparkles(nextSparkles);
    },
    prefersReducedMotion ? null : 50,
    prefersReducedMotion ? null : 850
  );
  return (
    <Wrapper>
      {sparkles.map((sparkle) => (
        <Sparkle
          key={sparkle.id}
          color={sparkle.color}
          size={sparkle.size}
          style={sparkle.style}
        />
      ))}
      <ChildWrapper>{children}</ChildWrapper>
    </Wrapper>
  );
};

export default Sparkes;
const Wrapper = styled.span`
  position: relative;
  display: inline-block;
`;
const ChildWrapper = styled.strong`
  position: relative;
  z-index: 1;
  font-weight: bold;
`;
