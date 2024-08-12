import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sound from "react-sound";
import done_sound from "./../common/ping.mp3";
import err_sound from "./../common/err.mp3";
import funk_sound from "./../common/funk.mp3";
import { get_data } from "./../common/common_modules";

const Screen = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  const done_sound_play = useCallback(() => {
    dispatch({
      type: "storage_reciept_set_done_sound",
      payload: Sound.status.PLAYING,
    });
  }, [dispatch]);

  const err_sound_play = useCallback(() => {
    dispatch({
      type: "storage_reciept_set_err_sound",
      payload: Sound.status.PLAYING,
    });
  }, [dispatch]);

  const funk_sound_play = useCallback(() => {
    dispatch({
      type: "storage_reciept_set_funk_sound",
      payload: Sound.status.PLAYING,
    });
  }, [dispatch]);

  const send_req = useCallback(() => {
    const { barcode, zone_list, selected_zone, storage } =
      store.storage_reciept;

    if (barcode.substring(0, 9) === "0000-0000") {
      let zone = barcode.substring(10);
      let find_zone = zone_list.find((el) => el === zone);

      if (find_zone === undefined) {
        dispatch({ type: "storage_reciept_set_barcode", payload: "" });
        dispatch({ type: "storage_reciept_set_status_type", payload: "err" });
        dispatch({
          type: "storage_reciept_set_status_message",
          payload: "Зона хранения не найдена",
        });
        err_sound_play();
      } else {
        dispatch({ type: "storage_reciept_set_selected_zone", payload: zone });
        dispatch({ type: "storage_reciept_set_barcode", payload: "" });
        dispatch({ type: "storage_reciept_set_status_message", payload: "" });
        dispatch({ type: "storage_reciept_set_status_type", payload: null });
        funk_sound_play();
      }
    } else {
      dispatch({ type: "set_active_window", payload: "wait" });

      const data = {
        userkey: store.login.userkey,
        barcode,
        zone: selected_zone,
        storage: storage.id,
      };

      get_data("storagereciept", data).then(
        (result) => {
          dispatch({ type: "set_active_window", payload: "storage_reciept" });
          dispatch({ type: "storage_reciept_set_result", payload: result });
          dispatch({ type: "storage_reciept_set_barcode", payload: "" });

          if (result.status_type === "ok") {
            done_sound_play();
          } else {
            err_sound_play();
          }
        },
        (err) => {
          dispatch({ type: "set_modal_show", payload: true });
          dispatch({ type: "set_modal_header", payload: "Ошибка" });
          dispatch({ type: "set_modal_text", payload: err });

          dispatch({ type: "set_active_window", payload: "storage_reciept" });
          dispatch({
            type: "storage_reciept_set_result",
            payload: { status_type: "err", status_message: err },
          });
          err_sound_play();
        },
      );
    }
  }, [
    dispatch,
    store.login.userkey,
    store.storage_reciept,
    err_sound_play,
    done_sound_play,
    funk_sound_play,
  ]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      try {
        if (event.keyCode === 13) {
          send_req();
        }
      } catch (error) {
        console.log(error);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [send_req]);

  const { storage, selected_zone, barcode, status_type, status_message } =
    store.storage_reciept;
  const done_sound_status =
    store.storage_reciept.done_sound || Sound.status.STOPPED;
  const funk_sound_status =
    store.storage_reciept.funk_sound || Sound.status.STOPPED;
  const err_sound_status =
    store.storage_reciept.err_sound || Sound.status.STOPPED;

  return (
    <div>
      <div className="disp_map_button">
        <button
          className="ui button mini"
          onClick={() => dispatch({ type: "set_full_screen" })}
        >
          Полноэкранный режим
        </button>
      </div>
      <div>Текущий склад: {storage?.name}</div>
      <div>Зона хранения: {selected_zone}</div>
      <input
        autoFocus
        value={barcode}
        onChange={(e) =>
          dispatch({
            type: "storage_reciept_set_barcode",
            payload: e.target.value,
          })
        }
      />
      {status_type === "ok" && (
        <div>
          <div>Накладная: {store.storage_reciept.num} </div>
          <div>Задача: {store.storage_reciept.task_type} </div>
          <div>Дата: {store.storage_reciept.task_date}</div>
          <div>Курьер: {store.storage_reciept.task_value}</div>
          <div>Заказчик: {store.storage_reciept.customer}</div>
          <div>Город: {store.storage_reciept.rec_city}</div>
          <div>Адрес: {store.storage_reciept.rec_adress}</div>
          <div>Район: {store.storage_reciept.rec_district}</div>
          <div>Получатель: {store.storage_reciept.rec_name}</div>
        </div>
      )}
      {status_type === "err" && <div>{status_message}</div>}
      <Sound url={done_sound} playStatus={done_sound_status} />
      <Sound url={err_sound} playStatus={err_sound_status} />
      <Sound url={funk_sound} playStatus={funk_sound_status} />
    </div>
  );
};

export default Screen;
