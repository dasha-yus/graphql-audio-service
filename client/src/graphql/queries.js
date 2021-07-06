import { gql } from "@apollo/client";

export const GET_ALL_AUDIOS_QUERY = gql`
  query audios {
    audios {
      id
      albom
      song
      singer
      image
      mp3
      description
      numberOfViews
    }
  }
`;

export const GET_AUDIO_BY_ID_QUERY = gql`
  query audio($id: String!) {
    audio(id: $id) {
      id
      albom
      song
      singer
      image
      description
      mp3
      numberOfViews
      likes {
        id
      }
      comments {
        text
        user {
          id
          name
        }
      }
    }
  }
`;