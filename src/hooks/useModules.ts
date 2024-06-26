import { useDispatch, useSelector } from "react-redux";
import { IState } from "../store";

export const useModules = () => {
  const dispatch = useDispatch();

  const set_active_window = (param: string) => {
    dispatch({ type: "set_active_window", payload: param });
  };
  const set_modal_show = (param: boolean) => {
    dispatch({ type: "set_modal_show", payload: param });
  };
  const set_modal_text = (param: string) => {
    dispatch({ type: "set_modal_text", payload: param });
  };
  const set_modal_header = (param: string) => {
    dispatch({ type: "set_modal_header", payload: param });
  };
  const set_last_window = (param: string) => {
    dispatch({ type: "set_last_window", payload: param });
  };
  const pop_last_window = () => {
    dispatch({ type: "pop_last_window" });
  };

  const last_windows = useSelector(
    (state: IState) => state.general.last_window,
  );

  const back = () => {
    const last_window = last_windows[last_windows.length - 1];
    pop_last_window();
    set_active_window(last_window);
  };

  const modules = {
    set_modal_show,
    set_active_window,
    set_modal_text,
    set_modal_header,
    set_last_window,
    back,
  };

  return modules;
};
