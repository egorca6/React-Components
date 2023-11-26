import {
  getCharacterDetails,
  getRunningQueriesThunk,
} from "@/store/slices/api/api";
import { wrapper } from "@/store/store";

const Details = () => {};
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
