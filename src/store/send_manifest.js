const initialState = {
  storehouse: "00000001",
  error: "",
  search: "",

  select_customer: "",
};

export default function dispatch(state = initialState, action) {
  switch (action.type) {
    case "set_search_send_manifest_error":
      return { ...state, error: action.payload };
    case "set_send_manifest_storehouse":
      return { ...state, storehouse: action.payload };
    case "set_search_send_manifest":
      return { ...state, search: action.payload };
    case "set_select_customer":
      return { ...state, select_customer: action.payload };
    default:
      return state;
  }
}
