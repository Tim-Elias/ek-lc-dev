import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./reciept.css";
import { get_data } from "../common/common_modules";

const Screen = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  const search_reciept = useCallback(() => {
    dispatch({ type: "set_active_window", payload: "wait" });

    const search_reciept_data = {
      userkey: store.login.userkey,
      order: "",
      num: store.reciept.search,
    };

    get_data("getdispatchdata", search_reciept_data).then(
      (result) => {
        dispatch({ type: "set_data_disp", payload: result });
        dispatch({ type: "set_active_window", payload: "disp" });
        dispatch({ type: "set_last_window", payload: "reciept" });
        dispatch({ type: "set_action", payload: "reciept" });
      },
      (err) => {
        dispatch({ type: "set_modal_show", payload: true });
        dispatch({ type: "set_modal_header", payload: "Ошибка" });
        dispatch({ type: "set_modal_text", payload: err });

        dispatch({ type: "set_active_window", payload: "reciept" });
        dispatch({ type: "set_search_error", payload: err });
      },
    );
  }, [dispatch, store.login.userkey, store.reciept.search]);

  return (
    <div>
      <div className="search_reciept">
        <div className="search_reciept_label">Поиск по номеру</div>
        <div className="search_reciept_data">
          <input
            value={store.reciept.search}
            className="search_reciept_data_input"
            onChange={(e) =>
              dispatch({ type: "set_search_reciept", payload: e.target.value })
            }
          />
        </div>
        <div className="search_reciept_button_area">
          <button
            id="search_reciept_button"
            onClick={search_reciept}
            className="send_pod"
          >
            Найти
          </button>
        </div>
      </div>
      <div className="search_reciept_error">{store.reciept.error}</div>
    </div>
  );
};

export default Screen;
