import { createGlobalStyle } from "styled-components";
import { up } from "./utils/themes";

const GlobalStyle = createGlobalStyle(
  ({
    theme: {
      breakpoints,
      text,
      background,
      font,
      borderHovered,
      subtleBackground,
      primary,
    },
  }) => `

  /* CSS RESET */
  html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
    display: block;
  }

  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after, q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

/* GLOBAL STYLES */
*,
*:before,
*:after {
  box-sizing: border-box;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  
}

*::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color:#777;

}
*::-webkit-scrollbar {
  width: 6px;
  height: 6px;
	background-color: ${primary};
}
*::-webkit-scrollbar-thumb{
  border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: ${primary};
  transition: background 150ms ease;
}
*::-webkit-scrollbar-thumb:hover{
 
	background-color: ${primary};
}
html {
  height: 100%;
}
body {
  height: -webkit-fill-available;
  
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
  background-color:${background};
  color:${text};
  transition:background-color 200ms ease;
  
}
img {
  max-width: 100%;
  display: block;
  font-size:0.7rem;
}
a {
  text-decoration:none;
  color:inherit;
}

input,
button,
textarea,
select {
  font: inherit;
  background: none;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
              
  border:none;
}
h1, h2, h3, h4, h5, h6, strong {
  font-weight: ${font.bold};
}
// h1 {
//   font-size:2rem;
//   line-height:2.5rem; 
// }
// h2 {
//   font-size:1.75rem;
//   line-height:2.25rem; 
// }
// h3 {
//   font-size:1.5rem;
//   line-height:2rem; 
// }

// h4 {
//   font-size:1.25rem;
//   line-height:1.75rem;  
// }
// h5 {
//   font-size:1rem;
//   line-height:1.5rem;  
// }
// h6 {
//   font-size:0.85rem;
//   line-height:1.25rem; 
// }

p {
  /* line-height:1 */
}

button {
  cursor: pointer;
  white-space:nowrap;
}
ul {
  list-style-type:none;
}  
input , textarea {
 min-width:0;
 transition:200ms all ease;
 &:hover {

  border-color:${borderHovered} !important;
 }
}
input:focus, textarea:focus {
  border-color:${borderHovered} !important;
}

${up(breakpoints.md)}{
  // h1 {
  //   font-size:2.25rem;
  //   line-height:2.5rem; 
  // }
  // h2 {
  //   font-size:2rem;
  //   line-height:2.25rem; 
  // }
  // h3 {
  //   font-size:1.75rem;
  //   line-height:2rem; 
  // }
  
  // h4 {
  //   font-size:1.5rem;
  //   line-height:1.75rem;  
  // }
  // h5 {
  //   font-size:1.25rem;
  //   line-height:1.5rem;  
  // }
  // h6 {
  //   font-size:1rem;
  //   line-height:1.25rem; 
  // }
 
}

`
);

export default GlobalStyle;
