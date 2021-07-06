import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GET_ALL_AUDIOS_QUERY } from "../../../graphql/queries";
import { useQuery } from "@apollo/client";
import AudioList from "../../common/AudioList";
import "../Admin.css";

const AdminAudioList = () => {
  const [search, setSearch] = useState("");

  const { loading, error, data } = useQuery(GET_ALL_AUDIOS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="audios">
      <input
        type="text"
        onChange={(event) => setSearch(event.target.value)}
        value={search}
        className="search"
        placeholder="Search"
      />
      <div className="btns">
        <Link to="/admin/audio/new" className="new new-video">
          NEW AUDIO
        </Link>
      </div>
      <AudioList audios={data.audios} search={search} link="/admin/audio/" />
    </div>
  );
};

export default AdminAudioList;
