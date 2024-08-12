import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_data } from "./../../common/common_modules";
import PeriodControl from "./period_control";
import MutualTable from "./mutual_table";
import "./mutual.css";

const Screen = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  const tr_double_click = useCallback(
    (order) => {
      dispatch({ type: "set_active_window", payload: "wait" });

      const data = {
        userkey: store.login.userkey,
        Key: order.Key,
      };

      get_data("order", data).then(
        (result) => {
          dispatch({ type: "set_order_data", payload: result });
          dispatch({ type: "set_active_window", payload: "order" });
          dispatch({ type: "set_last_window", payload: "mutual" });
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

  const tr_click = useCallback(
    (index) => {
      dispatch({ type: "set_mutual_active_row", payload: index });
    },
    [dispatch],
  );

  const get_mutual = useCallback(() => {
    dispatch({ type: "set_active_window", payload: "wait" });
    const data = {
      userkey: store.login.userkey,
      mobile: false,
      date_from: store.mutual.date_from,
      date_to: store.mutual.date_to,
    };
    get_data("mutuallist", data).then(
      (result) => {
        dispatch({ type: "set_data_mutual", payload: result });
        dispatch({ type: "set_active_window", payload: "mutual" });
      },
      (err) => {
        dispatch({ type: "set_modal_show", payload: true });
        dispatch({ type: "set_modal_header", payload: "Ошибка" });
        dispatch({ type: "set_modal_text", payload: err });
        dispatch({ type: "set_active_window", payload: "mutual" });
        console.log(err);
      },
    );
  }, [
    dispatch,
    store.login.userkey,
    store.mutual.date_from,
    store.mutual.date_to,
  ]);

  return (
    <div>
      <PeriodControl
        dateFrom={store.mutual.date_from}
        dateTo={store.mutual.date_to}
        setDateFrom={(date) =>
          dispatch({ type: "set_mutual_date_from", payload: date })
        }
        setDateTo={(date) =>
          dispatch({ type: "set_mutual_date_to", payload: date })
        }
        fetchData={get_mutual}
      />
      {store.mutual.data.length !== 0 && (
        <MutualTable
          data={store.mutual.data}
          activeRow={store.mutual.active_row}
          onRowClick={tr_click}
          onRowDoubleClick={tr_double_click}
        />
      )}
    </div>
  );
};

export default Screen;
