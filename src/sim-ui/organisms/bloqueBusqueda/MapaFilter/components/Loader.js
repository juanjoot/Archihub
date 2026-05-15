import styled from "@emotion/styled";

const StyledLoader = styled.div`
  position: absolute;
  z-index: 1000;
  top: 50vh;
  left: 35vw;
  .loader-container {
    opacity: 0.5;
    display: inline-block;
    position: relative;
    width: 160px;
    height: 160px;
    div {
      position: absolute;
      border: 4px solid #19447c;
      opacity: 0.8;
      border-radius: 50%;
      animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }
    div:nth-child(2) {
      animation-delay: -0.5s;
    }
    @keyframes lds-ripple {
      0% {
        top: 72px;
        left: 72px;
        width: 0;
        height: 0;
        opacity: 0;
      }
      4.9% {
        top: 72px;
        left: 72px;
        width: 0;
        height: 0;
        opacity: 0;
      }
      5% {
        top: 72px;
        left: 72px;
        width: 0;
        height: 0;
        opacity: 1;
      }
      100% {
        top: 0px;
        left: 0px;
        width: 144px;
        height: 144px;
        opacity: 0;
      }
    }
  }
`;

function Loader() {
  return (
    <StyledLoader>
      <div className="loader-container">
        <div></div>
        <div></div>
      </div>
    </StyledLoader>
  );
}

export default Loader;
