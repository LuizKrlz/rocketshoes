const INITIAL_STATE = {
  show: false,
};

export default function cart(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@loading/SET_SHOW':
      return {
        ...state,
        show: true,
      };
    case '@loading/SET_HIDE':
      return {
        ...state,
        show: false,
      };
    default:
      return state;
  }
}
