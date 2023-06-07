import styles from "./Card.module.css";

const Card = (props) => {
  let species = props.species;

  if (Array.isArray(species)) {
    species = species.join(" "); // join array elements with a space separator
  }
  return (
    <div className={styles.containerm}>
      <div className={styles.imager}>
        <img className={styles.imager2} src={props.image} alt="img" />
        <h2 className={styles.h2}>{props.name}</h2>

        <p className={styles.p}>Specie: {species}</p>
      </div>
    </div>
  );
};

export default Card;
