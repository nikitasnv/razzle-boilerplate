import { useDispatch, useSelector } from "react-redux";
import { createStore } from "redux";
import appReducer from "./Reducers";

export const useStore = () => ({
  state: useSelector((state: any) => state),
  dispatch: useDispatch()
});

export default (p: any) => {
  return createStore(appReducer(), p);
};
