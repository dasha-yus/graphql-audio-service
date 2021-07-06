import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_AUDIOS_QUERY } from "../../../graphql/queries";
import { ADD_AUDIO } from "../../../graphql/mutations";

import "../Admin.css";

const AddNewAudio = () => {
  const [form, setForm] = useState({
    albom: "",
    song: "",
    singer: "",
    image: "",
    description: "",
    mp3: "",
  });
  const history = useHistory();
  const [topicsList, setTopicsList] = useState([]);

  const [add] = useMutation(ADD_AUDIO);

  const { data } = useQuery(GET_ALL_AUDIOS_QUERY);

  const addAudio = (e) => {
    e.preventDefault();
    add({
      variables: {
        albom: form.albom,
        song: form.song,
        singer: form.singer,
        image: form.image,
        description: form.description,
        mp3: form.mp3,
      },
      refetchQueries: [{ query: GET_ALL_AUDIOS_QUERY }],
    });
    history.push("/admin/audio");
  };

  useEffect(() => {
    try {
      let set = new Set();
      data.audios.forEach((audio) => {
        set.add(audio.albom);
      });
      setTopicsList(Array.from(set));
    } catch (err) {
      alert("error occurred");
    }
  }, [data]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <div className="align">
      <div className="card">
        <form onSubmit={addAudio}>
          <div className="inputs">
            <div className="input">
              <input
                id="topic"
                type="text"
                list="alboms"
                name="albom"
                value={form.albom}
                onChange={changeHandler}
                placeholder="Select an albom"
              ></input>
              <datalist
                id="alboms"
                name="albom"
                value={form.albom}
                onChange={changeHandler}
              >
                {topicsList.map((albom, i) => (
                  <option key={i}>{albom}</option>
                ))}
              </datalist>
              <i className="fas fa-compact-disc"></i>
            </div>
            <div className="input">
              <input
                placeholder="Song"
                type="text"
                name="song"
                value={form.song}
                onChange={changeHandler}
              />
              <i className="fas fa-music"></i>
            </div>
            <div className="input">
              <input
                placeholder="Singer"
                type="text"
                name="singer"
                value={form.singer}
                onChange={changeHandler}
              />
              <i className="fas fa-user-alt"></i>
            </div>
            <div className="input">
              <input
                placeholder="Image"
                type="text"
                name="image"
                value={form.image}
                onChange={changeHandler}
              />
              <i className="fas fa-image"></i>
            </div>
            <div className="input">
              <input
                placeholder="Description"
                type="text"
                name="description"
                value={form.description}
                onChange={changeHandler}
              />
              <i className="fas fa-align-justify"></i>
            </div>
            <div className="input">
              <input
                placeholder="mp3"
                type="text"
                name="mp3"
                value={form.mp3}
                onChange={changeHandler}
              />
              <i className="fas fa-file-audio"></i>
            </div>
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddNewAudio;
