import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { LIKE_AUDIO, ADD_AUDIO_TO_PLAYLIST } from "../../graphql/mutations";
import SectionsUnderThePost from "../common/SectionsUnderThePost";
import { GET_AUDIO_BY_ID_QUERY } from "../../graphql/queries";
import { useQuery, useMutation } from "@apollo/client";

const Audio = () => {
  const { id } = useParams();
  const [post, setPost] = useState();
  const { userData } = useContext(UserContext);

  const { loading, error, data } = useQuery(GET_AUDIO_BY_ID_QUERY, {
    variables: { id },
  });

  const [like] = useMutation(LIKE_AUDIO);
  const [addAudioToPlaylist] = useMutation(ADD_AUDIO_TO_PLAYLIST);

  useEffect(() => {
    if (data) {
      setPost(data.audio);
    }
  }, [data]);

  const likeAudio = (id, numberOfViews) => {
    // like({
    //   variables: {
    //     id: id,
    //     userId: userData.user.id,
    //     numberOfViews: Number(numberOfViews),
    //   },
    //   refetchQueries: [{ query: GET_AUDIO_BY_ID_QUERY, variables: { id } }],
    // });
    // putItems(`audio/${id}/like`, {
    //   userId: userData.user.id,
    //   numberOfViews: numberOfViews,
    // })
    //   .then((res) => setPost(res.data))
    //   .catch((err) => alert(`${err.response.status} error occurred`));
  };

  const unlikeAudio = (id, numberOfViews) => {
    // putItems(`audio/${id}/unlike`, {
    //   userId: userData.user.id,
    //   numberOfViews: numberOfViews,
    // })
    //   .then((res) => setPost(res.data))
    //   .catch((err) => alert(`${err.response.status} error occurred`));
  };

  const makeComment = (text, id, userId) => {
    // putItems(`audio/${id}/comment`, {
    //   text: text,
    //   user: userData.user.name,
    //   userId: userId,
    // })
    //   .then((res) => setPost(res.data))
    //   .catch((err) => alert(`${err.response.status} error occurred`));
    // document.getElementById("comment-form").reset();
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
      alert("The audio was successfully added to playlist")
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
