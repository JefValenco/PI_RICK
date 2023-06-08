import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";

import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import Paged from "../../components/Paged/Paged";
import styles from "./Home.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";

import Form from "../../views/Form/Form";
import Modify from "../../views/Modify/Modify";
import { up } from "../../images/images.js";
import { banner1 } from "../../images/images.js";
import { banner2 } from "../../images/images.js";
import { find } from "../../images/images.js";
import { create } from "../../images/images.js";
import { modify } from "../../images/images.js";
import { suspect } from "../../images/images.js";

import {
  getCharacters,
  FilterBySpecie,
  getSpecie,
  FilterByCreated,
  orderByAZ,
  getItemByName,
} from "../../redux/actions";

const Home = () => {
  const allCharacters = useSelector((state) => state.characters);

  const [isLoading2, setIsLoading2] = useState(false);

  const [order, setOrder] = useState("");

  const [search, setSearch] = useState("");

  const getSpecies = useSelector((state) => state.species);

  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage, setCharactersPerPage] = useState(8);
  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = allCharacters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getCharacters()).then(() => {
        setIsLoading(false);
      });
    }, 800);

    return () => clearTimeout(timer);
  }, [dispatch]);

  function handleSortSpecies(e) {
    setIsLoading2(true); // Show loader

    setTimeout(() => {
      if (currentPage !== 1) {
        setCurrentPage(1);
      }

      dispatch(FilterBySpecie(e.target.value));

      setIsLoading2(false);
    }, 500);
  }

  useEffect(() => {
    dispatch(getSpecie());
  }, [dispatch]);

  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  /* ---------- */

  const [displayButton, setDisplayButton] = useState(false);

  const scrollFunction = () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      setDisplayButton(true);
    } else {
      setDisplayButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollFunction);
    return () => {
      window.removeEventListener("scroll", scrollFunction);
    };
  }, []);

  const backToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  /* ---------- */

  function handleSortCreated(e) {
    setIsLoading2(true); // Show loader

    setTimeout(() => {
      if (currentPage !== 1) {
        setCurrentPage(1);
      }

      dispatch(FilterByCreated(e.target.value));

      setIsLoading2(false); // Hide loader
    }, 500);
  }

  function handleSort(e) {
    e.preventDefault();
    const sortOrder = e.target.value;

    setIsLoading2(true); // Show loader

    setTimeout(() => {
      if (currentPage !== 1) {
        setCurrentPage(1);
      }

      console.log(sortOrder);
      dispatch(orderByAZ(sortOrder));

      setOrder(sortOrder);
      setIsLoading2(false); // Hide loader
    }, 500);
  }

  const handleClearSearch = () => {
    setIsLoading2(true);

    setTimeout(() => {
      dispatch(getItemByName("")).then(() => {
        setIsLoading2(false);
      });
      setSearch("");
    }, 600);
  };

  if (isLoading) {
    return (
      <div>
        <span
          className={styles.loader}
          style={{ backgroundColor: "#363535", width: "100%", height: "100%" }}
        ></span>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      {/* Scroll-up Button*/}
      <button
        type="button"
        className={`btn  btn-floating btn-lg ${styles.backToTop}`}
        id="btn-back-to-top"
        onClick={backToTop}
      >
        <img src={up} alt="up" className={styles.imageSide} />
      </button>
      {/* NavBar section */}
      <div>
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
          <button
            /*  className="navbar-toggler" */

            className={`navbar-toggler ${styles.toggler}`}
            type="button"
            onClick={toggleCollapse}
            aria-expanded={!collapsed}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${collapsed ? "" : "show"}`}
            id="navbarTogglerDemo01"
          >
            <ul
              className={`navbar-nav mr-auto mt-2 mt-lg-0 ${styles.linksNav}`}
            >
              <li className="nav-item active">
                <a
                  className={`nav-link ${styles.btnNav}`}
                  href="#charactersSection"
                >
                  Characters
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${styles.btnNav}`}
                  href="#createSection"
                >
                  Create Character
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${styles.btnNav}`}
                  href="#modifySection"
                >
                  Modify Character
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${styles.btnNav}`} href="/">
                  Landing
                </a>
              </li>
              <li className="nav-item">
                <SearchBar />
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* People Section */}

      <div
        className={styles.containerSection}
        style={{
          paddingTop: "4.6em",
          zIndex: "2",
          position: "absolute",
        }}
      >
        <img src={banner1} alt="banner1" className={styles.imageBanner1} />
        <img src={find} alt="find" className={styles.imageFind} />
      </div>

      {/* Content Section */}

      <div>
        {" "}
        <div>
          <div id="charactersSection" className={styles.containerFilter}>
            <div className={styles.box}>
              <select
                className={styles["style-dropdown"]}
                onChange={(e) => handleSortCreated(e)}
              >
                <option value="All">All Created</option>

                <option value="true">Data base</option>
                <option value="false">Api</option>
              </select>

              <select
                className={styles["style-dropdown"]}
                onChange={(e) => handleSortSpecies(e)}
              >
                <option value="" disabled selected hidden>
                  Select Specie
                </option>

                <option value="All"> Clear</option>

                <option value=""></option>
                {getSpecies &&
                  getSpecies
                    .sort((a, b) => {
                      if (a.name < b.name) return -1;
                      if (a.name > b.name) return 1;
                      return 0;
                    })
                    .map((specie) => {
                      return (
                        <option value={specie.name} key={specie.id}>
                          {specie.name}
                        </option>
                      );
                    })}
              </select>

              <select
                className={styles["style-dropdown"]}
                onChange={(e) => handleSort(e)}
              >
                <option value="" disabled selected hidden>
                  Select an Order
                </option>
                <option value="des">A - Z</option>
                <option value="asc">Z - A</option>
                <option value="clear">Clear</option>
              </select>
            </div>
          </div>
        </div>
        {/* Cards Section */}
        <div
          style={{
            marginTop: "2em",
          }}
        >
          {currentCharacters.length > 0 ? (
            <CardsContainer currentCharacters={currentCharacters} />
          ) : (
            <div>
              {" "}
              <p className={styles.p1} style={{ color: "#212121" }}>
                Character not found...
              </p>
              <button onClick={handleClearSearch} className={styles.btnPrimary}>
                Try again!
              </button>
            </div>
          )}
        </div>
        {/* Paged Section */}
        <Paged
          charactersPerPage={charactersPerPage}
          allCharacters={allCharacters.length}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      {/* Create Section */}
      <div
        className={styles.containerSection}
        style={{
          position: "relative",
        }}
      >
        <img
          id="createSection"
          src={create}
          alt="create"
          className={styles.imageCreate}
        />
        <Form />
        <img src={suspect} alt="suspect" className={styles.imageSuspect} />
      </div>

      {/* Modify Section */}
      <div className={styles.containerSection}>
        <img
          id="modifySection"
          src={modify}
          alt="modify"
          className={styles.imageModify}
        />
        <Modify />
      </div>

      {/* Banner2 Section */}
      <div>
        <img src={banner2} alt="banner2" className={styles.imageBanner2} />
      </div>

      {/* Create Footer */}
      <div
        className={styles.footer}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          paddingTop: "5em",
          paddingTop: "5em",
        }}
      >
        <p className={styles.p5}>
          "©2023 This website was created by Jefry Valenco using the data from
          the Rick & Morthy Api"
        </p>
      </div>

      {isLoading2 && (
        <div>
          <span
            className={styles.loader}
            style={{
              backgroundColor: "rgba(224, 98, 98, 0.85)",
              width: "100%",
              height: "100%",
            }}
          ></span>
        </div>
      )}
    </div>
  );
};

export default Home;
