import { useState } from "react";
import styles from "../../views/Form/Form.module.css";
import axios from "axios";
import { getSpecie } from "../../redux/actions";
import { getDeleteCharacters } from "../../redux/actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { validate } from "../../middleware/validate";

const Form = () => {
  const dispatch = useDispatch();

  //----------States----------//
  const [form, setForm] = useState({
    name: "",
    status: "",
    gender: "",
    origin: "",
    location: "",
    image: "",
    species: [],
  });

  const [formDelete, setFormDelete] = useState({
    name: "",
  });

  //----------Reset States----------//

  const resetForm = () => {
    setForm({
      name: "",
      status: "",
      gender: "",
      origin: "",
      location: "",
      image: "",
      species: [],
    });
  };

  const resetFormDelete = () => {
    setFormDelete({
      name: "",
    });
  };

  const [errors, setErrors] = useState({
    name: "",
    status: "",
    gender: "",
    origin: "",
    location: "",
    image: "",
    species: [],
  });

  //----------Change Handlers----------//

  const changeHandler = (event, index) => {
    const property = event.target.name;
    const value = event.target.value;

    validate({ ...form, [property]: value }, errors, setErrors);
    setForm({ ...form, [property]: value });
  };

  const changeHandlerDelete = (event, index) => {
    const property = event.target.name;
    const value = event.target.value;

    setFormDelete({ ...formDelete, [property]: value });
  };

  const changeHandlerSpecie = (event) => {
    const value = event.target.value;

    if (!form.species.includes(value)) {
      setForm({ ...form, species: [...form.species, value] });
    }
  };

  //----------Summit Form Validation ----------//

  const requiredFields = [
    { field: "name", message: "Please enter a name for your character." },
    {
      field: "status",
      message: "Please enter the status points for your character.",
    },
    {
      field: "gender",
      message: "Please enter the gender points for your character.",
    },
    {
      field: "origin",
      message: "Please enter the origin points for your character.",
    },
    {
      field: "location",
      message: "Please enter the location points for your character.",
    },
    { field: "image", message: "Please enter the image of your character." },
    {
      field: "species",
      message: "Please enter the species of your character.",
    },
  ];

  //----------Summit Handlers----------//

  const submitHandler = (event) => {
    event.preventDefault();

    // Check if required fields are missing
    for (const { field, message } of requiredFields) {
      if (!form[field]) {
        alert(message);
        return;
      }
    }

    // Check if at least one species is selected
    if (form.species.length === 0 || form.species.includes("")) {
      alert("Please select at least one specie for your Character.");
      return;
    }

    // Send form data to server
    axios
      .post("http://localhost:3006/rickandmorthy", form)
      .then((res) => {
        alert("Character created!");
        resetForm();
        window.location.reload();
      })
      .catch((err) => alert(err));
  };

  const submitHandlerDelete = (event) => {
    event.preventDefault();
    axios
      .delete(`http://localhost:3006/rickandmorthy?name=${formDelete.name}`)
      .then((res) => {
        alert("Character deleted!");
        resetFormDelete();
        window.location.reload();
      })
      .catch((err) => alert(err));
  };

  //----------Dispatches Handlers----------//

  useEffect(() => {
    dispatch(getSpecie());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDeleteCharacters());
  }, [dispatch]);

  //---------- Selectors ----------//

  const characters = useSelector((state) => state.deleteItem);

  const species = useSelector((state) => state.species);

  //----------Complementary  fn ----------//

  const removeSpecie = (event, index) => {
    event.preventDefault(); // prevent form submission
    const newSpecie = [...form.species];
    newSpecie.splice(index, 1);
    setForm({ ...form, species: newSpecie });
  };

  //---------- Render  ----------//

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.container}>
          <div className={styles.box}>
            {" "}
            <h1 className={styles.h4}>Create Character</h1>
            {/*   <form action="POST" onSubmit={submitHandler}>
  <div>
    <label>Name: </label>
    <input
      type="text"
      value={form.name}
      onChange={changeHandler}
      name="name"
    ></input>
    {errors.name && <span>{errors.name}</span>}
  </div>

  <div>
    <label>Status: </label>
    <select value={form.status} onChange={changeHandler} name="status">
      <option value="" disabled selected>
        Choose status
      </option>
      <option>Dead</option>
      <option>Alive</option>
      <option>Unknown</option>
    </select>
  </div>

  <div>
    <label>Gender: </label>
    <select value={form.gender} onChange={changeHandler} name="gender">
      <option value="" disabled selected>
        Choose gender
      </option>
      <option>Male</option>
      <option>Female</option>
      <option>Non-Binary</option>
    </select>
  </div>

  <div>
    <label>Origin: </label>
    <input
      type="text"
      value={form.origin}
      onChange={changeHandler}
      name="origin"
    ></input>
  </div>

  <div>
    <label>Location: </label>
    <input
      type="text"
      value={form.location}
      onChange={changeHandler}
      name="location"
    ></input>
  </div>

  <div>
    <label>Image: </label>
    <select value={form.image} onChange={changeHandler} name="image">
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
  </div>

  <div>
    <label className={styles.label}>Species: </label>
    <select
      className={styles.input}
      placeholder="Choose a specie"
      recipe="text"
      onChange={changeHandlerSpecie}
      name="specie"
    >
      <option value="" disabled selected>
        Choose specie
      </option>
      <option value=""></option>
      {species &&
        species
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
      {form.species.map((species, index) => (
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
    Create
  </button>
</form> */}
            <form onSubmit={submitHandler}>
              <div>
                <label className={styles.label}>Name: </label>
                <input
                  className={styles.input}
                  type="text"
                  value={form.name}
                  onChange={changeHandler}
                  name="name"
                ></input>
              </div>

              <div>
                <label className={styles.label}>Status: </label>
                <select
                  className={styles.input}
                  value={form.status}
                  onChange={changeHandler}
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
                  value={form.gender}
                  onChange={changeHandler}
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
                  value={form.origin}
                  onChange={changeHandler}
                  name="origin"
                ></input>
              </div>

              <div>
                <label className={styles.label}>Location: </label>
                <input
                  className={styles.input}
                  type="text"
                  value={form.location}
                  onChange={changeHandler}
                  name="location"
                ></input>
              </div>

              <div>
                <label className={styles.label}>Image: </label>
                <select
                  className={styles.input}
                  value={form.image}
                  onChange={changeHandler}
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
                  {form.image && (
                    <img
                      src={form.image}
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
                  {species &&
                    species
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
                  {form.species.map((species, index) => (
                    <div key={index}>
                      <span className={styles.type}>{species}</span>
                      <button
                        className={styles.Submmit2}
                        onClick={(event) => removeSpecie(event, index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button className={styles.Submmit} type="submit">
                Create
              </button>
            </form>
          </div>
          <div className={styles.box}>
            {" "}
            <h1 className={styles.h4}>Delete Character</h1>
            <form onSubmit={submitHandlerDelete}>
              <div>
                <label className={styles.label}>Name: </label>
                <select
                  className={styles.input}
                  placeholder="Choose a character to delete..."
                  character="text"
                  value={formDelete.name}
                  onChange={changeHandlerDelete}
                  name="name"
                >
                  <option value="character"></option>
                  {characters &&
                    characters
                      .sort((a, b) => {
                        if (a.name < b.name) return -1;
                        if (a.name > b.name) return 1;
                        return 0;
                      })
                      .map((character) => {
                        return (
                          <option value={character.name} key={character.id}>
                            {character.name}
                          </option>
                        );
                      })}
                </select>
              </div>

              <button
                className={`${styles.Submmit} ${
                  form.name ? "" : styles.disabled
                }`}
                disabled={!formDelete.name}
                type="submit"
              >
                Confirm Delete
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
