import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* ,*::before,*::after{
	vertical-align: baseline;
	font-size: 100%;
	border: 0 none;
  box-sizing:border-box;
	outline: 0;
	padding: 0;
	margin: 0;
}
html {
  height: 100%;
}
body {
  height: -webkit-fill-available;
  
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
  background-color:${props => props.theme.bodyColor};
  color:${props => props.theme.textColor};
  transition:background-color 200ms ease;
  
}
img {
  max-width: 100%;
  display: block;
}
a {
  text-decoration:none;
  color:inherit;
}
hr {
  margin : 0.25rem 0 ;
}
input,
button,
textarea,
select {
  font: inherit;
   background: none;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
}
h1 {
  font-size:2.25rem;
  line-height:2.5rem;
}
h2 {
  font-size:2rem;
  line-height:2.25rem;
}
h3 {
  font-size:1.75rem;
  line-height:2rem;
}

h4 {
  font-size:1.5rem;
  line-height:1.75rem;
}
h5 {
  font-size:1.25rem;
  line-height:1.5rem;
}
p {
  /* line-height:1 */
}
hr{
  border : 0.3px solid rgba(0,0,0,0.1)
}
button {
  cursor: pointer;
}
ul {
  list-style-type:none;
}
`;

export default GlobalStyle;
