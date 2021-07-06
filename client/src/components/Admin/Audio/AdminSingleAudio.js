import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { GET_AUDIO_BY_ID_QUERY, GET_ALL_AUDIOS_QUERY } from "../../../graphql/queries";
import { DELETE_AUDIO } from "../../../graphql/mutations";
import { useQuery, useMutation } from "@apollo/client";

const AdminSingleAudio = () => {
  const { id } = useParams();
  const [post, setPost] = useState();
  const history = useHistory();

  const { loading, error, data } = useQuery(GET_AUDIO_BY_ID_QUERY, {
    variables: { id },
  });

  const [removeAudio] = useMutation(DELETE_AUDIO);

  useEffect(() => {
    if (data) {
      setPost(data.audio);
    }
  }, [data]);

  const deleteAudio = (id) => {
    const conf = window.confirm(`Are you sure you want to delete this audio?`);
    if (conf) {
      try {
        removeAudio({
          variables: {
            id: id
          },
          refetchQueries: [{ query: GET_ALL_AUDIOS_QUERY }],
        });
      } catch (err) {
        alert("error occured");
      }
      history.push("/admin/audio");
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
      <Link to={`/admin/audio/edit/${post?.id}`} class="button edit">
        Edit
      </Link>
      <Link onClick={() => deleteAudio(post?.id)} class="button delete">
        Delete
      </Link>
    </div>
  );
};

export default AdminSingleAudio;
