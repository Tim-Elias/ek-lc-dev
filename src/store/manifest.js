const initialState = {
  action: null,
  data: {},
};

export default function dispatch(state = initialState, action) {
  switch (action.type) {
    case "set_data_manifest":
      return { ...state, data: action.payload };
    case "set_action_manifest":
      return { ...state, action: action.payload };
    case "check_manifest_disp":
      return {
        ...state,
        data: {
          ...state.data,
          dispatches: state.data.dispatches.map((el) => {
            if (el.num === action.payload) {
              return { ...el, selected: !el.selected };
            } else {
              return el;
            }
          }),
        },
      };

    default:
      return state;
  }
}
