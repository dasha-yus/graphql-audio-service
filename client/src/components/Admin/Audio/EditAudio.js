import React, { useState, useEffect } from "react";
import {
  GET_AUDIO_BY_ID_QUERY,
  GET_ALL_AUDIOS_QUERY,
} from "../../../graphql/queries";
import { UPDATE_AUDIO } from "../../../graphql/mutations";
import { useQuery, useMutation } from "@apollo/client";
import "../Admin.css";

const EditAudio = (props) => {
  const [audio, setAudio] = useState({
    albom: "",
    song: "",
    singer: "",
    image: "",
    description: "",
    mp3: "",
  });

  const { loading, error, data } = useQuery(GET_AUDIO_BY_ID_QUERY, {
    variables: { id: props.match.params.id },
  });

  const [updateAudio] = useMutation(UPDATE_AUDIO);

  useEffect(() => {
    if (data) {
      setAudio({
        albom: data.audio.albom,
        song: data.audio.song,
        singer: data.audio.singer,
        image: data.audio.image,
        description: data.audio.description,
        mp3: data.audio.mp3,
      });
    }
  }, [data]);

  const onChangeSong = (e) => {
    setAudio({ ...audio, song: e.target.value });
  };

  const onChangeSinger = (e) => {
    setAudio({ ...audio, singer: e.target.value });
  };

  const onChangeImage = (e) => {
    setAudio({ ...audio, image: e.target.value });
  };

  const onChangeDescription = (e) => {
    setAudio({ ...audio, description: e.target.value });
  };

  const onChangeMP3 = (e) => {
    setAudio({ ...audio, mp3: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    updateAudio({
      variables: {
        id: props.match.params.id,
        albom: audio.albom,
        song: audio.song,
        singer: audio.singer,
        image: audio.image,
        description: audio.description,
        mp3: audio.mp3,
      },
      refetchQueries: [{ query: GET_ALL_AUDIOS_QUERY }],
    });

    props.history.push("/admin/audio");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{console.log(error)} Error :(</p>;

  return (
    <div className="align">
      <div className="card">
        <form onSubmit={onSubmit}>
          <div className="inputs">
            <div className="input">
              <input type="text" name="albom" value={audio.albom} disabled />
              <i class="fas fa-music"></i>
            </div>
            <div className="input">
              <input
                type="text"
                name="song"
                value={audio.song}
                onChange={onChangeSong}
              />
              <i class="fas fa-music"></i>
            </div>
            <div className="input">
              <input
                type="text"
                name="singer"
                value={audio.singer}
                onChange={onChangeSinger}
              />
              <i class="fas fa-user-alt"></i>
            </div>
            <div className="input">
              <input
                placeholder="Image"
                type="text"
                name="image"
                value={audio.image}
                onChange={onChangeImage}
              />
              <i class="fas fa-image"></i>
            </div>
            <div className="input">
              <input
                placeholder="Description"
                type="text"
                name="description"
                value={audio.description}
                onChange={onChangeDescription}
              />
              <i class="fas fa-align-justify"></i>
            </div>
            <div className="input">
              <input
                placeholder="mp3"
                type="text"
                name="mp3"
                value={audio.mp3}
                onChange={onChangeMP3}
              />
              <i class="fas fa-file-audio"></i>
            </div>
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default EditAudio;
