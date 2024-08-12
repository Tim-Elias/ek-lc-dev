import React from "react";
import { useSelector } from "react-redux";
import MyDisp from "./my_disp";
import { CreateDisp } from "./create_disp";
import Mutual from "./mutual";
import Storage from "./storage";
import Reciept from "./reciept";
import SendManifest from "./send_manifest";
import GetManifest from "./get_manifest";
import Disp from "./disp";
import Manifest from "./manifest";
import Wait from "./wait";
import { UploadManifest } from "./upload_manifest";
import Setting from "./setting";
import Order from "./order";
import ImportTemplateList from "./import_template_list";
import DefaultTemplateList from "./default_template_list";
import DispTemplateList from "./disp_template_list";
import ImportTemplate from "./import_template";
import DefaultTemplate from "./default_template";
import DispTemplate from "./disp_template";
import DispMap from "./disp_map";
import StorageReciept from "./storage_reciept";
import CalcPrice from "./calc_price";
import DispNumber from "./disp_number";
import HomeEk from "./home_ek";
import { useModules } from "../hooks/useModules";
import { ContentModal } from "../components/contentModal";

export const Content = () => {
  const active_window = useSelector((state) => state.general.active_window);
  const logged = useSelector((state) => state.login.logged);

  const modules = useModules();
  let className = "content_window";
  if (active_window === "home") {
    className = "content_window_home";
  }

  return (
    <div className={className}>
      <ContentModal />

      {active_window === "home" && !logged ? (
        <HomeEk modules={modules} />
      ) : null}
      {active_window === "my_disp" ? <MyDisp modules={modules} /> : null}
      {active_window === "create_disp" ? (
        <CreateDisp modules={modules} />
      ) : null}
      {active_window === "mutual" ? <Mutual modules={modules} /> : null}
      {active_window === "storage" ? <Storage modules={modules} /> : null}
      {active_window === "reciept" ? <Reciept modules={modules} /> : null}
      {active_window === "send_manifest" ? (
        <SendManifest modules={modules} />
      ) : null}
      {active_window === "get_manifest" ? (
        <GetManifest modules={modules} />
      ) : null}
      {active_window === "disp" ? <Disp modules={modules} /> : null}
      {active_window === "manifest" ? <Manifest modules={modules} /> : null}
      {active_window === "wait" ? <Wait modules={modules} /> : null}
      {active_window === "upload_manifest" ? (
        <UploadManifest modules={modules} />
      ) : null}
      {active_window === "setting" ? <Setting modules={modules} /> : null}
      {active_window === "order" ? <Order modules={modules} /> : null}
      {active_window === "import_template_list" ? (
        <ImportTemplateList modules={modules} />
      ) : null}
      {active_window === "default_template_list" ? (
        <DefaultTemplateList modules={modules} />
      ) : null}
      {active_window === "disp_template_list" ? (
        <DispTemplateList modules={modules} />
      ) : null}
      {active_window === "import_template" ? (
        <ImportTemplate modules={modules} />
      ) : null}
      {active_window === "default_template" ? (
        <DefaultTemplate modules={modules} />
      ) : null}
      {active_window === "disp_template" ? (
        <DispTemplate modules={modules} />
      ) : null}
      {active_window === "disp_map" ? <DispMap modules={modules} /> : null}
      {active_window === "storage_reciept" ? (
        <StorageReciept modules={modules} />
      ) : null}
      {active_window === "calc_price" ? <CalcPrice modules={modules} /> : null}
      {active_window === "disp_number" ? (
        <DispNumber modules={modules} />
      ) : null}
    </div>
  );
};
