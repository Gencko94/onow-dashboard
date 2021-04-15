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
*::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #F5F5F5;
}
*::-webkit-scrollbar {
  width: 7px;
  height: 7px;
	background-color: #F5F5F5;
}
*::-webkit-scrollbar-thumb{
  border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #777;
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
  margin: 1.5rem 0;
  background-image: linear-gradient(
    90deg,
    transparent,
    rgba(0, 0, 0, 0.4),
    transparent
  );
  background-color: transparent;
  border: none;
  height: 1px;
  opacity: 0.5;
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

button {
  cursor: pointer;
}
ul {
  list-style-type:none;
}  
input {
min-width:0;
}
`;

export default GlobalStyle;
