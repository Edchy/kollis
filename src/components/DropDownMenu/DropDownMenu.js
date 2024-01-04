import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";

import Button from "../Button/Button";
import "./dropdownmenu.css";

export default function DropDownMenu({ isOpen, toggleOpen, navLinks }) {
  return (
    <>
      {" "}
      <Button className="toggle-menu-btn" onClick={toggleOpen}>
        {isOpen ? <AiOutlineClose /> : <RxHamburgerMenu />}
      </Button>
      <div className={`drop-down-menu ${isOpen ? "open" : ""}`}>
        <ul>
          <li>{navLinks[0]}</li>
          <li>{navLinks[1]}</li>
          <li>{navLinks[2]}</li>
        </ul>
      </div>
    </>
  );
}
