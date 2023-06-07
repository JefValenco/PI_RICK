import { Link } from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={style.container}>
      <div className={style.links}>
        <Link to="/rickandmorthies" className={style.btnPrimary}>
          Characters
        </Link>
        <Link to="/createrickandmorthies" className={style.btnPrimary}>
          Create Character
        </Link>
        <Link to="/modify" className={style.btnPrimary}>
          Modify Character
        </Link>
        <Link to="/" className={style.btnPrimary}>
          Landing
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
