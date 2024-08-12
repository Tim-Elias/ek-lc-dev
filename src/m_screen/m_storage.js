import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./mobile.css";
import "./mobile_storage.css";
import { get_data } from "../common/common_modules";
import Wait from "../screen/wait";
import Scanner from "./scanner";

export const MStorage = () => {
  const login = useSelector((state) => state.login);
  const active_loader = useSelector((state) => state.general.active_loader);
  const storage = useSelector((state) => state.storage);
  const dispatch = useDispatch();

  const set_scann_active = (param) => {
    dispatch({ type: "set_scann_active", payload: param });
  };
  const set_key = (param) => {
    dispatch({ type: "set_key", payload: param });
  };
  const set_last_window = (param) => {
    dispatch({ type: "set_last_window", payload: param });
  };
  const set_active_window = (param) => {
    dispatch({ type: "set_active_window", payload: param });
  };
  const set_search_storagre = (param) => {
    dispatch({ type: "set_search_storagre", payload: param });
  };
  const set_list_storage = (param) => {
    dispatch({ type: "set_list_storage", payload: param });
  };
  const set_active_loader = (param) => {
    dispatch({ type: "set_active_loader", payload: param });
  };
  const set_search_reciept = (param) => {
    dispatch({ type: "set_search_reciept", payload: param });
  };

  const settings_window = (window) => {
    set_active_window(window);
  };

  const tr_click = async (disp) => {
    const data = {
      userkey: login.userkey,
      status: disp.Type,
      num: disp.Number,
    };

    set_key(data);
    set_active_window("m_disp");
  };

  const update = () => {
    set_active_window("wait");
    const list_data = { userkey: login.userkey };

    get_data("list", list_data).then(
      (result) => {
        set_list_storage(result);
        set_active_window("m_storage");
        set_search_storagre("");
      },
      (err) => {
        console.log(err);
      },
    );
  };

  React.useEffect(() => {
    set_active_loader(true);

    const list_data = { userkey: login.userkey };

    get_data("list", list_data).then(
      (result) => {
        console.log(result);
        set_list_storage(result);
        set_active_loader(false);
        set_search_storagre("");
      },
      (err) => {
        console.log(err);
      },
    );
    return unmount();
  }, []);

  const unmount = () => {
    set_scann_active(false);
    set_search_reciept("");
    set_last_window("m_storage");
  };

  window.history.pushState(null, "", window.location.href);
  window.onpopstate = function () {
    settings_window("Mmenu");
    window.history.pushState(null, "", window.location.href);
  };

  return (
    <div>
      <div className="mobile_heading">Доставки и Заявки</div>
      {active_loader ? (
        <Wait />
      ) : (
        <div className="mobile_storage">
          <div className="mobile_container">
            <div className="mobile_search">
              <div className="mobile_search_label">Поиск:</div>
              <input
                className="mobile_search_input"
                value={storage.search}
                onChange={(e) => {
                  set_search_storagre(e.target.value);
                }}
              />
              <i className="ek-spinner11 action_icon" onClick={update} />
              <i
                className="ek-qrcode action_icon"
                onClick={() => set_scann_active(!storage.scann_active)}
              />
            </div>

            {storage.scann_active ? <Scanner /> : null}

            {storage.list
              .filter((el) => {
                const filter_num = el.Number.toUpperCase();
                const filter_adress = el.Adress.toUpperCase();
                const text = storage.search.toUpperCase();
                return (
                  text === "" ||
                  filter_num.indexOf(text) > -1 ||
                  filter_adress.indexOf(text) > -1
                );
              })
              .map((disp, index) => (
                <div
                  key={index}
                  onClick={() => tr_click(disp)}
                  className={
                    disp.Status === "Отмена"
                      ? "mobile_storage_item mobile_storage_item--canceling"
                      : disp.Type === "Заявка"
                        ? disp.Status === "Новая"
                          ? "mobile_storage_item mobile_storage_item--new"
                          : "mobile_storage_item mobile_storage_item--applications"
                        : "mobile_storage_item"
                  }
                >
                  <div className="mobile_storage_data">
                    <div className="mobile_storage_field">
                      {disp.fragile && (
                        <i
                          className="menu-icon ek-fragile"
                          style={{ color: "red" }}
                        />
                      )}
                      {disp.thermo && (
                        <i
                          className="menu-icon ek-thermometer-icon"
                          style={{ color: "blue" }}
                        />
                      )}
                      {disp.personality && (
                        <i
                          className="menu-icon ek-user-tie"
                          style={{ color: "green" }}
                        />
                      )}
                      {disp.Customer}
                      {
                        <i
                          className="menu-icon ek-notification"
                          style={{ color: "red" }}
                        />
                      }
                    </div>
                    <div className="mobile_storage_field">{disp.Date}</div>
                    <div className="mobile_storage_field">
                      {disp.Type} {disp.Number}
                    </div>
                    <div className="mobile_storage_field">
                      {disp.reccity} {disp.Adress}
                    </div>
                    <div className="mobile_storage_field">
                      {disp.Phone} {disp.Person}
                    </div>
                    <div className="mobile_storage_field">{disp.AddInfo}</div>
                  </div>
                  <div className="mobile_storage_item_row">
                    <div className="mobile_storage_field">
                      {disp.Status}
                      <br />
                      {disp.Time}
                    </div>

                    <div className="mobile_storage_field">
                      <b>{disp.COD} руб.</b>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
