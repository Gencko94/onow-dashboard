import styled, { css } from "styled-components";
import { Link, useLocation } from "react-router-dom";

import {
  FcAdvertising,
  FcBullish,
  FcConferenceCall,
  FcGenealogy,
  FcHome,
  FcList,
  FcRules,
  FcSelfie,
  FcSupport,
  FcViewDetails,
} from "react-icons/fc";
import canVisitPage from "../../../utils/canVisitPage";
import React, { useCallback, useContext, useMemo, useState } from "react";
import { AuthProvider } from "../../../contexts/AuthContext";

import Spacer from "../../reusable/Spacer";

import Paragraph from "../../StyledComponents/Paragraph";
import { IconType } from "react-icons/lib";

import Ripple from "../../reusable/Ripple";
import Flex from "../../StyledComponents/Flex";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@reach/accordion";
export type SIDENAV_ITEM = {
  Icon: IconType;
  title: string;
  target: string;
  collapsible: boolean;
  children?: {
    Icon: IconType;
    title: string;
    target: string;
  }[];
};
const SideNav = () => {
  const { pathname } = useLocation();
  const { user } = useContext(AuthProvider);
  const [indices, setIndices] = useState<number[]>([]);
  const toggleAccordionItem = useCallback(
    (toggledIndex: number) => {
      if (indices.includes(toggledIndex)) {
        setIndices(
          indices.filter((currentIndex) => currentIndex !== toggledIndex)
        );
      } else {
        setIndices((prev) => {
          return [...prev, toggledIndex];
        });
      }
    },
    [indices]
  );
  const items: SIDENAV_ITEM[] = useMemo(() => {
    return [
      {
        title: "Dashboard",
        Icon: FcHome,
        target: "/dashboard",
        collapsible: false,
      },
      {
        title: "Products",
        Icon: FcViewDetails,
        target: "/products",
        collapsible: false,
      },
      {
        title: "Categories",
        Icon: FcGenealogy,
        target: "/categories",
        collapsible: false,
      },
      {
        title: "Orders",
        Icon: FcRules,
        target: "/orders",
        collapsible: false,
      },
      {
        title: "Customers",
        Icon: FcConferenceCall,
        target: "/customers",
        collapsible: false,
      },
      {
        title: "Settings",
        Icon: FcSupport,
        target: "/settings",
        collapsible: false,
      },
      {
        title: "Website Appearance",
        Icon: FcSelfie,
        target: "/website-appearance",
        collapsible: true,
        children: [
          {
            Icon: FcList,
            target: "/website-appearance/menu-configuration",
            title: "Menu Configuration",
          },
          {
            Icon: FcSelfie,
            target: "/website-appearance/theme-appearance",
            title: "Theme & Appearance",
          },
        ],
      },
      {
        title: "Coupons",
        Icon: FcAdvertising,
        target: "/coupons",
        collapsible: false,
      },
      {
        title: "Reports",
        Icon: FcBullish,
        target: "/reports",
        collapsible: false,
      },
    ];
  }, []);
  return (
    <Container>
      {items.map(({ Icon, collapsible, target, title, children }, i) => {
        // if (111
        //   canVisitPage({
        //     permissions: user?.permissions,
        //     path: "/customers",
        //     role: user?.roles,
        //   })
        // )
        return (
          <React.Fragment key={i}>
            {collapsible ? (
              <Accordion index={indices} onChange={toggleAccordionItem}>
                <AccordionItem>
                  <AccordionToggle>
                    <Content isCurrent={pathname.includes(target)}>
                      <span className="icon">
                        <Icon size={20} />
                      </span>
                      <Paragraph
                        color="textAltContrast"
                        fontSize="0.9rem"
                        margin="0 0.5rem"
                      >
                        {title}
                      </Paragraph>

                      <ExpandIcon isActive={indices.includes(0)} />
                    </Content>
                    <Ripple />
                  </AccordionToggle>

                  <Panel>
                    {children?.map(
                      (
                        {
                          Icon: ChildIcon,
                          target: childTarget,
                          title: childTitle,
                        },
                        childId
                      ) => (
                        <React.Fragment key={childId + 1}>
                          {childId === 0 && <Spacer size={10} />}
                          <SideNavLink to={childTarget}>
                            <Content
                              isCurrent={pathname.includes(childTarget)}
                              items="center"
                            >
                              <span className="icon">
                                <ChildIcon size={20} />
                              </span>
                              <Paragraph
                                color="textAltContrast"
                                fontSize="0.9rem"
                                margin="0 0.5rem"
                              >
                                {childTitle}
                              </Paragraph>
                            </Content>

                            <Ripple />
                          </SideNavLink>
                          {childId !== children?.length - 1 && (
                            <Spacer size={10} />
                          )}
                        </React.Fragment>
                      )
                    )}
                  </Panel>
                </AccordionItem>
              </Accordion>
            ) : (
              <SideNavLink to={target}>
                <Content isCurrent={pathname.includes(target)} items="center">
                  <span className="icon">
                    <Icon size={20} />
                  </span>
                  <Paragraph
                    color="textAltContrast"
                    fontSize="0.9rem"
                    margin="0 0.5rem"
                  >
                    {title}
                  </Paragraph>
                </Content>
                <Ripple />
              </SideNavLink>
            )}

            {i !== items.length - 1 && <Spacer size={10} />}
          </React.Fragment>
        );
      })}
    </Container>
  );
};

export default SideNav;
const Container = styled.div`
  height: calc(100vh - 298px);
  overflow-y: auto;
  @media ${(props) => props.theme.breakpoints.mdAndLarger} {
    height: "calc(100vh - 288px)";
  }
`;

const SideNavLink = styled(Link)`
  position: relative;
  overflow: hidden;
`;
const AccordionToggle = styled(AccordionButton)`
  width: 100%;
  position: relative;
  overflow: hidden;
  &:hover {
    background-color: ${(props) => props.theme.sidebarSubtleBackground};
  }
`;
const Panel = styled(AccordionPanel)`
  padding: 0 1rem;
`;
const Content = styled(Flex)<{ isCurrent: boolean }>`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  transition: background 150ms ease;
  color: #fff;
  border-radius: 6px;
  .icon {
    padding: 0.25rem;
    display: flex;
    align-items: center;
  }
  &:hover {
    background-color: ${(props) => props.theme.sidebarSubtleBackground};
  }
  ${(props) =>
    props.isCurrent &&
    css`
      background-color: ${(props) => props.theme.sidebarSubtleBackground};
      color: ${(props) => props.theme.primary};
    `};
  @media (min-width: 768px) {
    padding: 0.75rem 1rem;
  }
`;
const arrowPath =
  "M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88" +
  ".5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3." +
  "6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-0.7 5." +
  "2-2L869 536.2c14.7-12.8 14.7-35.6 0-48.4z";
function ExpandIcon({ isActive }: { isActive: boolean }) {
  return (
    <i style={{ marginRight: ".5rem" }}>
      <svg
        viewBox="0 0 1024 1024"
        width="1em"
        height="1em"
        fill="currentColor"
        style={{
          verticalAlign: "-.125em",
          transition: "transform .2s",
          transform: `rotate(${isActive ? 90 : 0}deg)`,
        }}
      >
        <path d={arrowPath} p-id="5827" />
      </svg>
    </i>
  );
}
