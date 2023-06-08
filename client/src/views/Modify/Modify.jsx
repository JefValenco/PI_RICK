import { useState } from "react";
import styles from "../../views/Modify/Modify.module.css";
import axios from "axios";
import { getSpecie } from "../../redux/actions";
import { getModifyCharacters } from "../../redux/actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { validate } from "../../middleware/validate";
/* import SearchBar from "../../components/SearchBar/SearchBar"; */

const Modify = () => {
  const dispatch = useDispatch();

  //----------States----------//

  const [formModify, setFormModify] = useState({
    id: "",
    name: "",
    status: "",
    gender: "",
    origin: "",
    location: "",
    image: "",
    species: [],
  });

  //----------Reset States----------//

  const resetFormModify = () => {
    setFormModify({
      id: "",
      name: "",
      status: "",
      gender: "",
      origin: "",
      location: "",
      image: "",
      species: [],
    });
  };

  //----------Change Handlers----------//

  const changeHandlerModify = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    if (property === "name") {
      const selectedCharacter = characters.find(
        (character) => character.name === value
      );
      setFormModify({
        ...formModify,
        [property]: value,
        id: selectedCharacter?.id || "",
      });
    } else {
      setFormModify({ ...formModify, [property]: value });
    }
  };

  const changeHandlerSpecie = (event) => {
    const value = event.target.value;

    if (!formModify.species.includes(value)) {
      setFormModify({ ...formModify, species: [...formModify.species, value] });
    }
  };

  //----------Summit Form Validation ----------//

  const requiredFields = [
    { field: "name", message: "Please enter a name for your Character." },
    { field: "status", message: "Please enter the status of your Character." },
    { field: "gender", message: "Please enter the gender of your Character." },
    { field: "origin", message: "Please enter the origin of your Character." },
    {
      field: "location",
      message: "Please enter the location of your Character.",
    },
    {
      field: "image",
      message: "Please enter the image URL for your Character.",
    },
    {
      field: "species",
      message: "Please enter the species of your Character.",
    },
  ];

  //----------Summit Handlers----------//

  const submitHandlerModify = (event) => {
    event.preventDefault();

    // Check if required fields are missing
    for (const { field, message } of requiredFields) {
      if (!formModify[field]) {
        alert(message);
        return;
      }
    }

    // Check if at least one type is selected

    if (formModify.species.length === 0 || formModify.species.includes("")) {
      alert("Please select at least one specie for your Character.");
      return;
    }

    // Send formModify data to server
    axios
      .put("/rickandmorthy", formModify)
      .then((res) => {
        alert("Character updated!");
        resetFormModify();
        window.location.reload();
      })
      .catch((err) => alert(err));
  };

  //----------Dispatches Handlers----------//

  useEffect(() => {
    dispatch(getSpecie());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getModifyCharacters());
  }, [dispatch]);

  //---------- Selectors ----------//

  const characters = useSelector((state) => state.modifyItem);

  const speciess = useSelector((state) => state.species);

  //----------Complementary fn ----------//

  const removeSpecie = (event, index) => {
    event.preventDefault(); // prevent form submission
    const newSpecie = [...formModify.species];
    newSpecie.splice(index, 1);
    setFormModify({ ...formModify, species: newSpecie });
  };

  const [id, setId] = useState("");

  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");
  const [origin, setOrigin] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [species, setSpecies] = useState("");

  //---------- Render  ----------//

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.box}>
          <h1 className={styles.h4}>Select Character</h1>
          <div className={styles.container}>
            <div className={styles.box}>
              <label className={styles.label}>Name: </label>
              <select
                className={styles.input}
                placeholder="Choose a character to Modify..."
                characters="text"
                value={formModify.name}
                onChange={(event) => {
                  changeHandlerModify(event);
                  const selectedCharacter = characters.find(
                    (character) => character.name === event.target.value
                  );
                  setId(selectedCharacter?.id || "");
                  setName(selectedCharacter?.name || "");
                  setStatus(selectedCharacter?.status || "");
                  setGender(selectedCharacter?.gender || "");
                  setOrigin(selectedCharacter?.origin || "");
                  setLocation(selectedCharacter?.location || "");
                  setImage(selectedCharacter?.image || "");
                  setSpecies(selectedCharacter?.species || []);
                }}
                name="name"
              >
                <option value="characters"></option>
                {characters &&
                  characters
                    .sort((a, b) => {
                      if (a.name < b.name) return -1;
                      if (a.name > b.name) return 1;
                      return 0;
                    })
                    .map((characters) => {
                      return (
                        <option value={characters.name} key={characters.id}>
                          {characters.name}
                        </option>
                      );
                    })}
              </select>
              <div>
                {image && <img className={styles.img} src={image} alt={name} />}
              </div>
            </div>
            <div className={styles.box}>
              <div>
                <div className={styles.forml}>
                  <div>
                    <label className={styles.label}>id: </label>
                    <input
                      className={styles.input3}
                      type="text"
                      value={id}
                      name="id"
                      style={{ width: "310px" }}
                      disabled // added disabled attribute
                    />

                    <div>
                      <label className={styles.label}>Status: </label>
                      <input
                        className={styles.input3}
                        type="text"
                        value={status}
                        name="status"
                        disabled // added disabled attribute
                      />
                    </div>

                    <div>
                      <label className={styles.label}>Gender: </label>
                      <input
                        className={styles.input3}
                        type="text"
                        value={gender}
                        name="gender"
                        disabled // added disabled attribute
                      />
                    </div>

                    <div>
                      <label className={styles.label}>Origin: </label>
                      <input
                        className={styles.input3}
                        type="text"
                        value={origin}
                        name="origin"
                        disabled // added disabled attribute
                      />
                    </div>

                    <div>
                      <label className={styles.label}>Location: </label>
                      <input
                        className={styles.input3}
                        type="text"
                        value={location}
                        name="location"
                        disabled // added disabled attribute
                      />
                    </div>

                    <div>
                      <div>
                        <label className={styles.label}>Species: </label>
                        <input
                          className={styles.input3}
                          type="text"
                          value={species}
                          name="species"
                          disabled // added disabled attribute
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.box}>
          <h1 className={styles.h4}>Modify Character</h1>
          <form onSubmit={submitHandlerModify}>
            <div>
              <label className={styles.label}>Name: </label>
              <input
                className={styles.input}
                type="text"
                value={formModify.name}
                onChange={changeHandlerModify}
                name="name"
              ></input>
            </div>

            <div>
              <label className={styles.label}>Status: </label>
              <select
                className={styles.input}
                value={formModify.status}
                onChange={changeHandlerModify}
                name="status"
              >
                <option value="" disabled selected>
                  Choose status
                </option>
                <option>Dead</option>
                <option>Alive</option>
                <option>Unknown</option>
              </select>
            </div>

            <div>
              <label className={styles.label}>Gender: </label>
              <select
                className={styles.input}
                value={formModify.gender}
                onChange={changeHandlerModify}
                name="gender"
              >
                <option value="" disabled selected>
                  Choose gender
                </option>
                <option>Male</option>
                <option>Female</option>
                <option>Non-Binary</option>
              </select>
            </div>

            <div>
              <label className={styles.label}>Origin: </label>
              <input
                className={styles.input}
                type="text"
                value={formModify.origin}
                onChange={changeHandlerModify}
                name="origin"
              ></input>
            </div>

            <div>
              <label className={styles.label}>Location: </label>
              <input
                className={styles.input}
                type="text"
                value={formModify.location}
                onChange={changeHandlerModify}
                name="location"
              ></input>
            </div>

            <div>
              <label className={styles.label}>Image: </label>
              <select
                className={styles.input}
                value={formModify.image}
                onChange={changeHandlerModify}
                name="image"
              >
                <option value="" disabled>
                  Choose image
                </option>

                <option value="https://rickandmortyapi.com/api/character/avatar/15.jpeg">
                  img 1
                </option>
                <option value="https://rickandmortyapi.com/api/character/avatar/17.jpeg">
                  img 2
                </option>
              </select>
              <div>
                {formModify.image && (
                  <img
                    src={formModify.image}
                    alt="Preview"
                    className={styles.img}
                  />
                )}
              </div>
            </div>

            <div>
              <label className={styles.label}>Specie: </label>
              <select
                className={styles.input}
                placeholder="Choose a Specie"
                type="text"
                onChange={changeHandlerSpecie}
                name="specie"
              >
                <option value="" disabled selected>
                  Choose specie
                </option>
                <option value=""></option>
                {speciess &&
                  speciess
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

              <div>
                {formModify.species.map((species, index) => (
                  <div key={index}>
                    <span>{species}</span>
                    <button onClick={(event) => removeSpecie(event, index)}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button className={styles.Submmit} type="submit">
              Modify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modify;
