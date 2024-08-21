import React, { useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_data } from "./../common/common_modules";
import Select from "react-select";
import { customStyles } from "./../common/common_style";

const Screen = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  const handleInputChange = useCallback(
    (type, value) => {
      dispatch({ type, payload: value });
    },
    [dispatch],
  );

  const saveChangesUserData = useCallback(async () => {
    const data = {
      userkey: store.login.userkey,
      phone: store.login.phone,
      email: store.login.email,
      name: store.login.alias,
      default_send: store.login.default_send,
      default_rec: store.login.default_rec,
    };

    try {
      const result = await get_data("edituserdata", data);
      dispatch({ type: "save_changes_user_data", payload: result });
      dispatch({ type: "set_modal_show", payload: true });
      dispatch({ type: "set_modal_text", payload: "Данные успешно сохранены" });
      dispatch({ type: "set_modal_header", payload: "Успешно" });
    } catch (err) {
      console.log(err);
      dispatch({ type: "set_modal_show", payload: true });
      dispatch({ type: "set_modal_header", payload: "Ошибка" });
      dispatch({ type: "set_modal_text", payload: err });
    }
  }, [dispatch, store.login]);

  const handleTemplateChange = useCallback(
    (type, values) => {
      dispatch({ type, payload: values.Key });
    },
    [dispatch],
  );

  const default_send_template = useMemo(() => {
    return store.login.default_send !== "0"
      ? store.upload_manifest.disp_template_list.find(
          (el) => el.Key === store.login.default_send,
        )
      : null;
  }, [store.login.default_send, store.upload_manifest.disp_template_list]);

  const default_rec_template = useMemo(() => {
    return store.login.default_rec !== "0"
      ? store.upload_manifest.disp_template_list.find(
          (el) => el.Key === store.login.default_rec,
        )
      : null;
  }, [store.login.default_rec, store.upload_manifest.disp_template_list]);

  const isUserDataChanged = useMemo(() => {
    const { original_data, ...currentData } = store.login;
    return (
      currentData.email !== original_data.email ||
      currentData.alias !== original_data.username ||
      currentData.default_send !== original_data.default_send ||
      currentData.default_rec !== original_data.default_rec ||
      currentData.phone !== original_data.phone
    );
  }, [store.login]);

  return (
    <div>
      <div className="disp_Number">
        <div>
          Основные настройки{" "}
          <button
            style={{ margin: "0 5px", padding: "8px" }}
            size="mini"
            onClick={saveChangesUserData}
            disabled={!isUserDataChanged}
          >
            Сохранить изменения
          </button>
        </div>
      </div>
      <div className="setting_general_data">
        <div className="disp_data_label">Код пользователя:</div>
        <div className="setting_data_el">{store.login.userkey}</div>
        <div className="disp_data_label">Имя пользователя:</div>
        <div className="setting_data_el">
          <input
            maxLength="100"
            className="create_disp_data_input"
            onChange={(e) => handleInputChange("set_user_name", e.target.value)}
            value={store.login.alias}
            type="text"
            placeholder="введите имя пользователя..."
          />
        </div>
        <div className="disp_data_label">E-mail:</div>
        <div className="setting_data_el">
          <input
            maxLength="100"
            className="create_disp_data_input"
            onChange={(e) =>
              handleInputChange("set_user_email", e.target.value)
            }
            value={store.login.email}
            type="text"
            placeholder="введите e-mail..."
          />
        </div>
        <div className="disp_data_label">Телефон</div>
        <div className="setting_data_el">
          <input
            maxLength="11"
            className="create_disp_data_input"
            onChange={(e) =>
              handleInputChange("set_user_phone", e.target.value)
            }
            value={store.login.phone}
            type="text"
            placeholder="введите номер телефона..."
          />
        </div>
      </div>
      <div className="setting_general_data_template">
        <div className="disp_data_label">Шаблон отправителя по умолчанию</div>
        <div className="setting_data_el">
          <Select
            options={store.upload_manifest.disp_template_list}
            styles={customStyles}
            value={default_send_template}
            onChange={(values) =>
              handleTemplateChange("set_user_default_send", values)
            }
          />
        </div>
        <div className="setting_template_button">
          <button
            onClick={() => handleInputChange("set_user_default_send", "0")}
            size="mini"
          >
            X
          </button>
        </div>
        <div className="disp_data_label">Шаблон получателя по умолчанию</div>
        <div className="setting_data_el">
          <Select
            options={store.upload_manifest.disp_template_list}
            styles={customStyles}
            value={default_rec_template}
            onChange={(values) =>
              handleTemplateChange("set_user_default_rec", values)
            }
          />
        </div>
        <div className="setting_template_button">
          <button
            onClick={() => handleInputChange("set_user_default_rec", "0")}
            size="mini"
          >
            X
          </button>
        </div>
      </div>

      <div className="disp_Number">
        <div>Настройки шаблонов</div>
      </div>
      <div className="setting_template_data">
        <div className="disp_data_label">
          Шаблоны отправителей и получателей:
        </div>
        <div className="setting_data_el">
          {store.upload_manifest.disp_template_list.length}
        </div>
        <div className="setting_template_button">
          <button onClick={click_disp_template_list}>Редактировать</button>
        </div>
      </div>
    </div>
  );
};

export default Screen;
