const initialState = {
  data: {},
  dispatches: [],
  nomenclature: [],
};

export default function dispatch(state = initialState, action) {
  switch (action.type) {
    case "set_order_data":
      return {
        ...state,
        data: action.payload.data,
        dispatches: action.payload.dispatches,
        nomenclature: action.payload.nomenclature,
      };

    default:
      return state;
  }
}
