import { gql } from "@apollo/client";

export const ADD_AUDIO = gql`
  mutation addAudio(
    $albom: String!
    $song: String!
    $singer: String!
    $image: String!
    $description: String!
    $mp3: String!
  ) {
    addAudio(
      albom: $albom
      song: $song
      singer: $singer
      image: $image
      description: $description
      mp3: $mp3
    ) {
      albom
      song
      singer
      image
      description
      mp3
    }
  }
`;

export const DELETE_AUDIO = gql`
  mutation deleteAudio($id: String!) {
    removeAudio(id: $id) {
      id
    }
  }
`;

export const UPDATE_AUDIO = gql`
  mutation updateAudio(
    $id: String!
    $albom: String!
    $song: String!
    $singer: String!
    $image: String!
    $description: String!
    $mp3: String!
  ) {
    updateAudio(
      id: $id
      albom: $albom
      song: $song
      singer: $singer
      image: $image
      description: $description
      mp3: $mp3
    ) {
      id
      albom
      song
      singer
      image
      description
      mp3
    }
  }
`;

export const LIKE_AUDIO = gql`
  mutation likeAudio($id: String!, $userId: String!, $numberOfViews: Int!) {
    likeAudio(id: $id, userId: $userId, numberOfViews: $numberOfViews) {
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

export const DELETE_CATEGORY = gql`
  mutation deleteCategory($albom: String!) {
    removeCategory(albom: $albom) {
      albom
    }
  }
`;

export const ADD_AUDIO_TO_PLAYLIST = gql`
  mutation addAudioToPlaylist(
    $userId: String!
    $audioId: String!
    $song: String!
    $singer: String!
    $image: String!
  ) {
    addAudioToPlaylist(
      userId: $userId
      audioId: $audioId
      song: $song
      singer: $singer
      image: $image
    ) {
      id
      name
      audioPlaylist {
        audioId
        song
        singer
        image
      }
    }
  }
`;
