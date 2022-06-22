const alertReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_ALERT":
      return [...state, payload];
    case "REMOVE_ALERT":
      return state.filter((alert) => alert.id !== payload); //payload is id from alert actions
    default:
      return state;
  }
};

export default alertReducer;
