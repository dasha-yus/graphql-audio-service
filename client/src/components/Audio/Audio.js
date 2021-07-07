import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../../context/UserContext";
import {
  LIKE_AUDIO,
  UNLIKE_AUDIO,
  ADD_AUDIO_TO_PLAYLIST,
  GET_AUDIO
} from "../../graphql/mutations";
import SectionsUnderThePost from "../common/SectionsUnderThePost";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "./../../graphql/mutations";

const Audio = () => {
  const { id } = useParams();
  const [post, setPost] = useState();
  const { userData } = useContext(UserContext);

  const [getAudio] = useMutation(GET_AUDIO);
  const [like] = useMutation(LIKE_AUDIO);
  const [unlike] = useMutation(UNLIKE_AUDIO);
  const [addComment] = useMutation(ADD_COMMENT);
  const [addAudioToPlaylist] = useMutation(ADD_AUDIO_TO_PLAYLIST);

  useEffect(() => {
    getAudio({ variables: { id: id } })
      .then((res) => setPost(res.data.getAudio))
      .catch((err) => console.log(`${err.response.status} error occurred`));
  }, [id]);

  const likeAudio = (id, numberOfViews) => {
    try {
      like({
        variables: {
          id: id,
          userId: userData.user.id,
          numberOfViews: Number(numberOfViews),
        },
      }).then((res) => setPost(res.data.likeAudio));
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
      }).then((res) => setPost(res.data.unlikeAudio));
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
      }).then(res => setPost(res.data.addComment));
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
