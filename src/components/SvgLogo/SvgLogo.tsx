import styled from "styled-components";
import "../../styles/logoAnimationStyles.css";
const SvgLogo = () => {
  // useEffect(() => {
  //   const logo = document.querySelectorAll('#letters path') as any;
  //   for (let i = 0; i < logo.length; i++) {
  //     console.log('letter' + i + logo[i].getTotalLength());
  //   }
  // }, []);
  return (
    <Container>
      <svg
        id="logo"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="115.774"
        height="62.018"
        viewBox="0 0 115.774 62.018"
        fill="none"
      >
        <defs>
          <linearGradient
            id="linear-gradient"
            x1="0.5"
            x2="0.5"
            y2="1"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0" stopColor="#f78f21" />
            <stop offset="1" stopColor="#fe0488" />
          </linearGradient>
        </defs>
        <g
          id="Group_1661"
          data-name="Group 1661"
          transform="translate(-328.887 -253.047)"
        >
          <g
            id="Group_48"
            data-name="Group 48"
            transform="translate(367.818 253.047)"
          >
            <g id="Group_47" data-name="Group 47" transform="translate(0 0)">
              <path
                id="Path_14"
                data-name="Path 14"
                d="M535.885,253.047H523.247a12.638,12.638,0,0,0,0,25.275h12.638a12.638,12.638,0,0,0,0-25.275Zm0,22.116a9.478,9.478,0,1,1,9.478-9.478A9.489,9.489,0,0,1,535.885,275.163Z"
                transform="translate(-510.61 -253.047)"
                fill="url(#linear-gradient)"
              />
            </g>
          </g>
          <g
            id="letters"
            data-name="letters"
            transform="translate(329.387 289.417)"
          >
            <path
              id="o1"
              data-name="o1"
              d="M329.387,437.619c0-7.2,5.563-12.515,13.107-12.515s13.107,5.284,13.107,12.515-5.562,12.516-13.107,12.516S329.387,444.816,329.387,437.619Zm21.659,0a8.552,8.552,0,1,0-8.552,8.552A8.293,8.293,0,0,0,351.046,437.619Z"
              transform="translate(-329.387 -424.987)"
              fill="none"
              stroke="#657B8A"
              strokeWidth="1"
            />
            <path
              id="n"
              data-name="n"
              d="M568.965,437.619c0-7.2,5.563-12.515,13.107-12.515s13.107,5.284,13.107,12.515-5.562,12.516-13.107,12.516S568.965,444.816,568.965,437.619Zm21.659,0a8.552,8.552,0,1,0-8.552,8.552A8.293,8.293,0,0,0,590.624,437.619Z"
              transform="translate(-518.159 -424.987)"
              fill="none"
              stroke="#657B8A"
              strokeWidth="1"
            />
            <path
              id="o2"
              data-name="o2"
              d="M739.631,426.743v14.5c0,6.71-3.581,10.186-9.873,10.186-3.546,0-6.223-1.217-7.753-3.059-1.565,1.842-4.172,3.059-7.718,3.059-6.293,0-9.908-3.477-9.908-10.186v-14.5H708.9V441.1c0,4.519,1.982,6.362,5.389,6.362,3.372,0,5.458-1.842,5.458-6.362V426.743h4.519V441.1c0,4.519,2.086,6.362,5.493,6.362,3.337,0,5.388-1.842,5.388-6.362V426.743Z"
              transform="translate(-624.857 -426.279)"
              fill="none"
              stroke="#657B8A"
              strokeWidth="1"
            />
            <path
              id="w"
              data-name="w"
              d="M483.237,434.878c-.035,3.589,0,14.358,0,14.358h-4.52V434.878c0-4.519-2.086-6.362-5.493-6.362-3.337,0-5.389,1.843-5.389,6.362v14.358h-4.485v-14.5c0-6.71,3.581-10.186,9.873-10.186,3.546,0,6.294.954,7.849,2.775C482.424,428.908,483.274,431,483.237,434.878Z"
              transform="translate(-434.942 -424.553)"
              fill="none"
              stroke="#657B8A"
              strokeWidth="1"
            />
          </g>
        </g>
      </svg>
    </Container>
  );
};

export default SvgLogo;
const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
