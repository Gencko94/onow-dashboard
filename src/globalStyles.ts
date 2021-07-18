import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle(
  ({
    theme: { breakpoints, shadow, bodyColor, textPrimary, borderHovered },
  }) => `


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
  width: 9px;
  height: 9px;
	background-color: #F5F5F5;
}
*::-webkit-scrollbar-thumb{
  border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #777;
  transition: background 150ms ease;
}
*::-webkit-scrollbar-thumb:hover{
 
	background-color: #999;
}
html {
  height: 100%;
}
body {
  height: -webkit-fill-available;
  
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
  background-color:${bodyColor};
  color:${textPrimary};
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
}
h1 {
  font-size:2rem;
  line-height:2.5rem; 
}
h2 {
  font-size:1.75rem;
  line-height:2.25rem; 
}
h3 {
  font-size:1.5rem;
  line-height:2rem; 
}

h4 {
  font-size:1.25rem;
  line-height:1.75rem;  
}
h5 {
  font-size:1rem;
  line-height:1.5rem;  
}
h6 {
  font-size:0.85rem;
  line-height:1.25rem; 
}

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
.ReactModal__Overlay {
  opacity: 0;
  transition: opacity 200ms ease-in-out;
  z-index: 2;
}

.ReactModal__Overlay--after-open {
  opacity: 1;
}

.ReactModal__Overlay--before-close {
  opacity: 0;
}
.ReactModal__Content {
  transition: transform 200ms ease-in-out;
  border-radius: 6px !important;
  transform: translateY(100%);
  padding: 0 !important;

}

.ReactModal__Content--after-open {
  transform: translateY(0);
}
.modal {
  position:absolute;
  border:none;
  outline:none;
  background-color:#fff;
  box-shadow:${shadow};

}
.new-option-modal {
  inset:130px 40px;
}
.new-option-value-modal {
  position:absolute;
  inset:110px 40px;
  border:none;
  outline:none;
  background-color:#fff;
  box-shadow:${shadow};
}
.maintenance-modal {
  inset:240px;
}
.customer-modal {
  
  inset:215px 140px;
}
.ReactModal__Content--before-close {
  transform: translateY(100%);
}
@media ${breakpoints.md}{
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
  h6 {
    font-size:1rem;
    line-height:1.25rem; 
  }
  .new-option-modal {
    inset:340px;
    
    background-color:#fff;
  }
  .new-option-value-modal {
    inset:340px;
    background-color:#fff;
  }
  .customer-modal {
  
    inset:200px 240px;
  }
}

`
);

export default GlobalStyle;
