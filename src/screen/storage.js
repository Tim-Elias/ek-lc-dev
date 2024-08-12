import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_data } from "./../common/common_modules";

const Screen = () => {
  const buttonPressTimer = useRef(null);

  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const [search, setSearch] = useState(store.storage.search);
  const list = store.storage.list;

  useEffect(() => {
    const handleKeyDown = (event) => {
      try {
        const activeElement = document.querySelector(".active");
        if (!activeElement) return;

        let currentId = parseInt(activeElement.getAttribute("id"));
        let nextId;

        if (event.keyCode === 38) {
          event.preventDefault();
          nextId = currentId - 1;
        } else if (event.keyCode === 40) {
          event.preventDefault();
          nextId = currentId + 1;
        } else if (event.keyCode === 13) {
          const num = activeElement.getAttribute("name");
          const status = activeElement.getAttribute("status");
          tr_double_click({ Number: num, Type: status });
          return;
        }

        const nextElement = document.getElementById(nextId?.toString());
        if (nextElement) {
          tr_click(nextElement.getAttribute("name"));
        }
      } catch (error) {
        console.log(error);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleButtonPress = useCallback(() => {
    buttonPressTimer.current = setTimeout(
      () => alert("long press activated"),
      1500,
    );
  }, []);

  const handleButtonRelease = useCallback(() => {
    clearTimeout(buttonPressTimer.current);
  }, []);

  const update = useCallback(() => {
    dispatch({ type: "set_active_window", payload: "wait" });
    const list_data = { userkey: store.login.userkey };

    get_data("list", list_data).then(
      (result) => {
        dispatch({ type: "set_list_storage", payload: result });
        dispatch({ type: "set_active_window", payload: "storage" });
      },
      (err) => {
        console.log(err);
        dispatch({ type: "set_modal_show", payload: true });
        dispatch({ type: "set_modal_header", payload: "Ошибка" });
        dispatch({ type: "set_modal_text", payload: err });
      },
    );
  }, [dispatch, store.login.userkey]);

  const tr_click = useCallback(
    (num) => {
      dispatch({ type: "set_active_storage", payload: num });
    },
    [dispatch],
  );

  const tr_double_click = useCallback(
    async (disp) => {
      dispatch({ type: "set_active_window", payload: "wait" });

      const data = {
        userkey: store.login.userkey,
        status: disp.Type,
        num: disp.Number,
      };

      get_data("dispatch", data).then(
        (result) => {
          dispatch({ type: "set_data_disp", payload: result });
          dispatch({ type: "set_active_window", payload: "disp" });
          dispatch({ type: "set_last_window", payload: "storage" });
          dispatch({ type: "set_action", payload: "deliver" });
        },
        (err) => {
          console.log(err);
          dispatch({ type: "set_modal_show", payload: true });
          dispatch({ type: "set_modal_header", payload: "Ошибка" });
          dispatch({ type: "set_modal_text", payload: err });
        },
      );
    },
    [dispatch, store.login.userkey],
  );

  const filteredList = list.filter(
    (el) => search === "" || el.Number.includes(search),
  );

  return (
    <div>
      <div>
        <h3>Накладные на складе</h3>
      </div>
      <div>
        <div>
          <button onClick={update}>Обновить данные</button>
        </div>
        <div className="search_storage">
          <div className="disp_data_label">Поиск по номеру</div>
          <div className="disp_data_input">
            <input
              className="pod_input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        {filteredList.length !== 0 && (
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
              {filteredList.map((disp, index) => (
                <tbody key={index}>
                  <tr
                    className={
                      disp.Number === store.storage.active ? "active" : ""
                    }
                    id={index.toString()}
                    name={disp.Number}
                    onClick={() => tr_click(disp.Number)}
                    onTouchStart={handleButtonPress}
                    onTouchEnd={handleButtonRelease}
                    onDoubleClick={() => tr_double_click(disp)}
                  >
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
                </tbody>
              ))}
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Screen;
