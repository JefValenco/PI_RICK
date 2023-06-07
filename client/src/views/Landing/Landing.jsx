import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { rick } from "../../images/images.js";

function Landing() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

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
    <div>
      <div className={styles.content} style={{ backgroundColor: "#363535" }}>
        <div className={styles.content}>
          <div>
            <div className={styles.containerSection}>
              <img
                src={rick}
                alt="rick"
                className={styles.imageRick}
                style={{ paddingLeft: "7em" }}
              />
            </div>
            {/*    <h1 className={styles.h1}>Rick and Morthy!</h1> */}
          </div>
          <div className={styles.contentButton}>
            <Link to="/rickandmorthies">
              <button className={styles.btnPrimary}>Get in</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
