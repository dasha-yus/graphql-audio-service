import React from "react";
import { Link } from "react-router-dom";
import { limitNumberOfViews } from "../../utils/utils";
import { GET_ALL_AUDIOS_QUERY } from "../../graphql/queries";
import { DELETE_CATEGORY } from "../../graphql/mutations";
import { useQuery, useMutation } from "@apollo/client";

const AudioList = ({ audios, search, link }) => {
  const [removeCategory] = useMutation(DELETE_CATEGORY);

  const getAlboms = (array) => {
    let set = new Set();
    array.forEach((audio) => {
      set.add(audio.albom);
    });
    return Array.from(set);
  };

  const deleteCategory = (albom) => {
    const conf = window.confirm(
      `Are you sure you want to delete the albom ${albom}?`
    );
    if (conf) {
      try {
        removeCategory({
          variables: {
            albom: albom,
          },
          refetchQueries: [{ query: GET_ALL_AUDIOS_QUERY }],
        });
      } catch (err) {
        alert(`${err.response.status} error occurred`);
      }
    }
  };

  return (
    <div className="audios">
      <div>
        <h2>Popular</h2>
        <div className="audio">
          {audios
            .slice()
            .sort((a, b) => b.numberOfViews - a.numberOfViews)
            .slice(0, 4)
            .filter((audio) => audio.song.toLowerCase().includes(search))
            .map((filteredAudio, i) => (
              <Link
                to={link + filteredAudio.id}
                className="child"
                key={i}
                onClick={limitNumberOfViews}
              >
                <img
                  className="img"
                  src={filteredAudio.image}
                  alt="audio-img"
                ></img>
                <h3>{filteredAudio.song}</h3>
                <h5>{filteredAudio.singer}</h5>
              </Link>
            ))}
        </div>
        {getAlboms(audios).map((albom, i) => (
          <div key={i}>
            <div className="category">
              <h2>{albom}</h2>
              {!localStorage.getItem("x-auth-token") ||
              localStorage.getItem("userRole") !== "admin" ? (
                <span />
              ) : (
                <h2
                  className="delete-category"
                  onClick={() => deleteCategory(albom)}
                >
                  Delete albom
                </h2>
              )}
            </div>
            <div className="audio">
              {audios
                .filter((audio) => audio.albom === albom)
                .filter((audio) => audio.song.toLowerCase().includes(search))
                .map((audio, i) => (
                  <Link
                    to={link + audio.id}
                    className="child"
                    key={i}
                    onClick={limitNumberOfViews}
                  >
                    <img
                      className="img"
                      src={audio.image}
                      alt="audio-img"
                    ></img>
                    <h3>{audio.song}</h3>
                    <h5>{audio.singer}</h5>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudioList;
