import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_data, get_file } from "./../../common/common_modules";
import NomenclatureTable from "./nomenclature_table";
import DispatchTable from "./dispatch_table";

const Screen = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  const tr_double_click = useCallback(
    (disp) => {
      dispatch({ type: "set_active_window", payload: "wait" });

      const data = {
        userkey: store.login.userkey,
        status: "Накладная",
        num: disp.Num,
      };

      get_data("dispatch", data).then(
        (result) => {
          dispatch({ type: "set_data_disp", payload: result });
          dispatch({ type: "set_active_window", payload: "disp" });
          dispatch({ type: "set_last_window", payload: "order" });
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

  const back = useCallback(() => {
    const last_window =
      store.general.last_window[store.general.last_window.length - 1];
    dispatch({ type: "pop_last_window" });
    dispatch({ type: "set_active_window", payload: last_window });
  }, [dispatch, store.general.last_window]);

  const get_order = useCallback(() => {
    get_file(
      store.login.userkey,
      "order",
      store.order.data.Key,
      "Счёт " + store.order.data.Number + ".pdf",
    );
  }, [store.login.userkey, store.order.data]);

  const get_act = useCallback(() => {
    get_file(
      store.login.userkey,
      "act",
      store.order.data.Key,
      "Акт " + store.order.data.Number + ".pdf",
    );
  }, [store.login.userkey, store.order.data]);

  const get_cf = useCallback(() => {
    get_file(
      store.login.userkey,
      "cf",
      store.order.data.Key,
      "СФ " + store.order.data.Number + ".pdf",
    );
  }, [store.login.userkey, store.order.data]);

  return (
    <div>
      <div className="disp_Number">
        <div className="disp_actions">
          <button onClick={back}>
            <i className="ek-arrow-left" />
          </button>
          <b className="page_header">
            Реализация № {store.order.data.Number} от {store.order.data.Date}
          </b>
          <button onClick={get_order}>Счёт</button>
          <button onClick={get_act}>Акт</button>
          {store.order.data.VAT !== 0 && (
            <button onClick={get_cf}>Счёт-фактура</button>
          )}
        </div>
      </div>
      <div className="disp_customer_data">
        <div className="disp_data_label">Заказчик:</div>
        <div className="disp_data_el">{store.order.data.Customer}</div>
        <div className="disp_data_label">Исполнитель:</div>
        <div className="disp_data_el">{store.order.data.Executor}</div>
      </div>
      {store.order.data.UseNomenclature ? (
        <NomenclatureTable nomenclature={store.order.nomenclature} />
      ) : (
        <DispatchTable
          dispatches={store.order.dispatches}
          onDoubleClick={tr_double_click}
        />
      )}
      <div className="disp_customer_data">
        <div className="disp_data_label">Итого:</div>
        <div className="disp_data_el">{store.order.data.Summ}</div>
        {store.order.data.SummVAT && (
          <>
            <div className="disp_data_label">В том числе НДС:</div>
            <div className="disp_data_el">{store.order.data.SummVAT}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Screen;
