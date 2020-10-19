import styled from "styled-components";
import classnames from "classnames";

const Button = styled.button`
  &.hamburger {
    padding: 10px;
    display: inline-block;
    cursor: pointer;
    transition-property: opacity, filter;
    transition-duration: 0.15s;
    transition-timing-function: linear;
    font: inherit;
    color: inherit;
    text-transform: none;
    background-color: transparent;
    border: 0;
    margin: 0;
    margin-top: 4px;
    overflow: hidden;

    &.is-active .hamburger-inner,
    &.is-active .hamburger-inner::before,
    &.is-active .hamburger-inner::after {
      background-color: #ffffff;
    }

    .hamburger-box {
      width: 30px;
      height: 24px;
      display: inline-block;
      position: relative;
    }

    .hamburger-inner {
      display: block;
      top: 50%;
      margin-top: -2px;
      transition: background-color 0.125s 0.175s ease-in;
    }

    .hamburger-inner,
    .hamburger-inner::before,
    .hamburger-inner::after {
      width: 30px;
      height: 4px;
      background-color: #ffffff;
      border-radius: 4px;
      position: absolute;
      transition-property: transform;
      transition-duration: 0.15s;
      transition-timing-function: ease;
    }

    .hamburger-inner::before,
    .hamburger-inner::after {
      content: "";
      display: block;
    }

    .hamburger-inner::before {
      top: -10px;
      left: 0;
      transition: transform 0.125s cubic-bezier(0.6, 0.04, 0.98, 0.335),
        top 0.05s 0.125s linear, left 0.125s 0.175s ease-in;
    }

    .hamburger-inner::after {
      bottom: -10px;
      top: 10px;
      right: 0;
      transition: transform 0.125s cubic-bezier(0.6, 0.04, 0.98, 0.335),
        top 0.05s 0.125s linear, right 0.125s 0.175s ease-in;
    }

    &.is-active .hamburger-inner {
      transition-delay: 0s;
      transition-timing-function: ease-out;
      background-color: transparent !important;
    }

    &.is-active .hamburger-inner::before {
      left: -60px;
      top: -60px;
      transform: translate3d(60px, 60px, 0) rotate(45deg);
      transition: left 0.125s ease-out, top 0.05s 0.125s linear,
        transform 0.125s 0.175s cubic-bezier(0.075, 0.82, 0.165, 1);
    }

    &.is-active .hamburger-inner::after {
      right: -60px;
      top: -60px;
      transform: translate3d(-60px, 60px, 0) rotate(-45deg);
      transition: right 0.125s ease-out, top 0.05s 0.125s linear,
        transform 0.125s 0.175s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
  }
`;

const Hamburger: React.FC<{
  toggle: () => void;
  visible: boolean;
}> = ({ toggle, visible }) => {
  return (
    <Button
      className={classnames(
        "hamburger hamburger--emphatic focus:outline-none appearance-none",
        {
          "is-active": visible,
        }
      )}
      type="button"
      onClick={toggle}
    >
      <span className="hamburger-box">
        <span className="hamburger-inner" />
      </span>
    </Button>
  );
};

export default Hamburger;
