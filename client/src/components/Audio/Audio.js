import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../../context/UserContext";
import {
  LIKE_AUDIO,
  UNLIKE_AUDIO,
  ADD_AUDIO_TO_PLAYLIST,
} from "../../graphql/mutations";
import SectionsUnderThePost from "../common/SectionsUnderThePost";
import { GET_AUDIO_BY_ID_QUERY } from "../../graphql/queries";
import { useQuery, useMutation } from "@apollo/client";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { ADD_COMMENT } from "./../../graphql/mutations";

const Audio = () => {
  const { id } = useParams();
  const [post, setPost] = useStateWithCallbackLazy();
  const { userData } = useContext(UserContext);

  const { loading, error, data } = useQuery(GET_AUDIO_BY_ID_QUERY, {
    variables: { id },
  });

  // const [getAudio] = useMutation(GET_AUDIO);
  const [like] = useMutation(LIKE_AUDIO);
  const [unlike] = useMutation(UNLIKE_AUDIO);
  const [addComment] = useMutation(ADD_COMMENT);
  const [addAudioToPlaylist] = useMutation(ADD_AUDIO_TO_PLAYLIST);

  // useEffect(() => {
  //   getAudio({ variables: { id: id } })
  //     .then((res) => setPost(res.data.getAudio))
  //     .catch((err) => console.log(`${err.response.status} error occurred`));
  // }, [id]);

  useEffect(() => {
    if (data) {
      setPost(data.audio, (audio) => console.log(audio.numberOfViews));
    }
  }, [data]);

  const likeAudio = (id, numberOfViews) => {
    try {
      like({
        variables: {
          id: id,
          userId: userData.user.id,
          numberOfViews: Number(numberOfViews),
        },
      });
    } catch (err) {
      alert(`${err.response.status} error occurred`);
    }
  };

  const unlikeAudio = (id, numberOfViews) => {
    try {
      unlike({
        variables: {
          id: id,
          userId: userData.user.id,
          numberOfViews: Number(numberOfViews),
        },
      });
    } catch (err) {
      alert(`${err.response.status} error occurred`);
    }
  };

  const makeComment = (text, id, userId) => {
    try {
      addComment({
        variables: {
          id: id,
          text: text,
          user: userData.user.name,
          userId: userId,
        },
      });
      document.getElementById("comment-form").reset();
    } catch (err) {
      alert(`${err.response.status} error occurred`);
    }
  };

  const addToPlaylist = (audioId, song, singer, image, userId) => {
    try {
      addAudioToPlaylist({
        variables: {
          userId: userId,
          audioId: audioId,
          song: song,
          singer: singer,
          image: image,
        },
      });
      alert("The audio was successfully added to playlist");
    } catch (err) {
      alert(`${err.response.status} error occurred`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{console.log(error)} Error :(</p>;

  return (
    <div className="single-post">
      <h1>{post?.song}</h1>
      <div className="audio-main">
        <img src={post?.image} alt="audio-img"></img>
        <div>
          <h6 id="description">{post?.description}</h6>
          <div className="mp3">
            <audio src={post?.mp3} controls />
          </div>
        </div>
      </div>

      <SectionsUnderThePost
        like={likeAudio}
        unlike={unlikeAudio}
        addToPlaylist={addToPlaylist}
        makeComment={makeComment}
        post={post}
        type="audio"
      />
    </div>
  );
};

export default Audio;
