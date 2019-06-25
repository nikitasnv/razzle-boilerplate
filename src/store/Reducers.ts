export const defaultState = { count: 0 };

export default () => (
  state: { [key: string]: any } = defaultState,
  action: { [key: string]: any }
) => {
  switch (action.type) {
    case "showChange":
      return { ...state, count: state.count + 1 };
    case "changeColor":
      const q = Math.floor(Math.random() * 900000 + 100000);
      return { ...state, color: "#" + q };
    default:
      return state;
  }
};
