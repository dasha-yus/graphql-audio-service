import React, { useState } from "react";
import AudioList from "../common/AudioList";
// import { getItems } from "../../service/CRUDService";
import { GET_ALL_AUDIOS_QUERY } from "../../graphql/queries";
import { useQuery } from "@apollo/client";

const Audios = () => {
  const [search, setSearch] = useState("");

  const { loading, error, data } = useQuery(GET_ALL_AUDIOS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <input
        type="text"
        onChange={(event) => setSearch(event.target.value)}
        value={search}
        className="search"
        placeholder="Search"
      />
      <AudioList audios={data.audios} search={search} link="/audio/" />
    </div>
  );
};

export default Audios;
