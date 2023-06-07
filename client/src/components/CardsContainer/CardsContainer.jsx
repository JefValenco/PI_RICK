import Card from "../Card/Card";
import styles from "./CardsContainer.module.css";
import { Link } from "react-router-dom";

const CardsContainer = ({ currentCharacters }) => {
  return (
    <div className={styles.container}>
      {currentCharacters.map((character) => {
        return (
          <div key={character.id}>
            <Link to={`/characters/${character.id}`} key={character.id}>
              <Card
                name={character.name}
                image={character.image}
                species={character.species}
                key={character.id}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default CardsContainer;
