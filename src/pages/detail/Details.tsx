import React, { useEffect, useState } from "react";
import { DetailsProps, EpisodeDetails } from "../../types/interface";
import Image from "next/image";
import router from "next/router";
import { wrapper } from "@/store/store";
import {
  getCharacterDetails,
  getRunningQueriesThunk,
} from "@/store/slices/api/api";

const Details: React.FC<DetailsProps> = ({ characterDetails, onClose }) => {
  const [episodeDetails, setEpisodeDetails] = useState<EpisodeDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClose = () => {
    onClose();
    router.back();
  };

  useEffect(() => {
    const fetchEpisodeDetails = async () => {
      if (characterDetails && characterDetails.episode) {
        setLoading(true);

        try {
          const data = await Promise.all(
            characterDetails.episode.map((episodeUrl: string) =>
              fetch(episodeUrl).then((response) => response.json())
            )
          );

          setEpisodeDetails(data);
        } catch (error) {
          console.error("Error fetching episode details: ", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEpisodeDetails();
  }, [characterDetails]);

  return (
    <div className="right-panel">
      <div className="character-details">
        <div className="close-button" onClick={handleClose}>
          Close
        </div>
        <h2>{characterDetails.name}</h2>
        <Image
          src={characterDetails.image}
          alt={characterDetails.name}
          width={300}
          height={300}
        />
        <p>Status: {characterDetails.status}</p>
        <p>Gender: {characterDetails.gender}</p>
        <p>Species: {characterDetails.species}</p>
        {loading && <p>Loading...</p>}
        {!loading && episodeDetails.length > 0 && (
          <div className="episode-details">
            <h3>Episode:</h3>
            <ul>
              {episodeDetails.map((episode) => (
                <li key={episode.id}>
                  <p>
                    {episode.episode} {episode.name}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
export default Details;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const name = context.params?.name;
    if (typeof name === "number") {
      store.dispatch(getCharacterDetails.initiate(name));
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);
