import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./send_manifest.css";
import { get_data } from "./../common/common_modules";

const storehouseOptions = [
  { value: "000000001", label: "Новосибирск" },
  { value: "000000006", label: "Красноярск" },
  { value: "000000002", label: "Кемерово" },
  { value: "000000009", label: "Барнаул" },
  { value: "000000008", label: "Омск" },
  { value: "000000007", label: "Томск" },
  { value: "000000012", label: "Ачинск" },
];

const Screen = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  const search = useCallback(() => {
    dispatch({ type: "set_search_send_manifest_error", payload: "" });
    const num = store.send_manifest.search;

    const selected = store.storage.list.filter(
      (el) => el.selected && el.Number === num,
    ).length;
    const notSelected = store.storage.list.filter(
      (el) => !el.selected && el.Number === num,
    ).length;

    if (selected === 1) {
      dispatch({
        type: "set_search_send_manifest_error",
        payload: `Накладная ${num} уже добавлена`,
      });
    } else if (notSelected === 1) {
      dispatch({ type: "select_disp", payload: num });
    } else if (notSelected === 0) {
      dispatch({
        type: "set_search_send_manifest_error",
        payload: `Накладная ${num} не найдена`,
      });
    }
  }, [dispatch, store.send_manifest.search, store.storage.list]);

  const send_manifest = useCallback(() => {
    dispatch({ type: "set_active_window", payload: "wait" });

    const dispatches = store.storage.list
      .filter((el) => el.selected)
      .map((disp) => disp.Number);
    const data = {
      userkey: store.login.userkey,
      dispatches,
      storehouse: store.send_manifest.storehouse,
    };

    get_data("sendmanifest", data).then(
      () => {
        get_data("list", { userkey: store.login.userkey }).then(
          (result) => {
            dispatch({ type: "set_list_storage", payload: result });
            dispatch({ type: "set_active_window", payload: "storage" });
          },
          (err) => {
            dispatch({ type: "set_modal_show", payload: true });
            dispatch({ type: "set_modal_header", payload: "Ошибка" });
            dispatch({ type: "set_modal_text", payload: err });
            dispatch({ type: "set_active_window", payload: "storage" });
            console.log(err);
          },
        );
      },
      (err) => {
        dispatch({ type: "set_modal_show", payload: true });
        dispatch({ type: "set_modal_header", payload: "Ошибка" });
        dispatch({ type: "set_modal_text", payload: err });
        dispatch({ type: "set_active_window", payload: "send_manifest" });
        dispatch({ type: "set_search_error", payload: err });
      },
    );
  }, [
    dispatch,
    store.login.userkey,
    store.send_manifest.storehouse,
    store.storage.list,
  ]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 13) {
        search();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [search]);

  return (
    <div>
      <h3>Формирование исходящего манифеста</h3>
      <select
        value={store.send_manifest.storehouse}
        onChange={(e) =>
          dispatch({
            type: "set_send_manifest_storehouse",
            payload: e.target.value,
          })
        }
      >
        {storehouseOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div className="search">
        <div className="search_label">Введите номер</div>
        <div className="search_data">
          <input
            value={store.send_manifest.search}
            className="search_data_input"
            onChange={(e) =>
              dispatch({
                type: "set_search_send_manifest",
                payload: e.target.value,
              })
            }
          />
        </div>
        <div className="search_button_area">
          <button id="search_button" onClick={search} className="send_pod">
            Добавить
          </button>
        </div>
      </div>
      <div className="search_error">{store.reciept.error}</div>

      {store.storage.list.some((el) => el.selected) && (
        <div>
          <table className="bordered">
            <thead>
              <tr>
                <th>Дата</th>
                <th>Тип</th>
                <th>Заказчик</th>
                <th>Номер накладной</th>
                <th>Адрес</th>
                <th>Телефон</th>
                <th>Контактное лицо</th>
                <th>К оплате</th>
                <th>Количество мест</th>
                <th>Вес</th>
              </tr>
            </thead>
            <tbody>
              {store.storage.list
                .filter((el) => el.selected)
                .map((disp, index) => (
                  <tr key={index}>
                    <td>{disp.Date}</td>
                    <td>{disp.Type}</td>
                    <td>{disp.Customer}</td>
                    <td>{disp.Number}</td>
                    <td>{disp.Adress}</td>
                    <td>{disp.Phone}</td>
                    <td>{disp.Person}</td>
                    <td>{disp.COD}</td>
                    <td>{disp.total}</td>
                    <td>{disp.weight}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="disp_data_el">
        Отправить на склад: накладных:{" "}
        {store.storage.list.filter((el) => el.selected).length} (мест:{" "}
        {store.storage.list
          .filter((el) => el.selected)
          .reduce((sum, el) => {
            return sum + parseInt(el.total);
          }, 0)}
        )
      </div>
      <button onClick={send_manifest} className="send_manifest">
        Отправить и закрыть
      </button>
    </div>
  );
};

export default Screen;
