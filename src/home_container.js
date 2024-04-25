import "./App.css";
import React from "react";
import { useSelector } from "react-redux";
import Header from "./screen/components/header";
import Footer from "./screen/components/footer";
import LeftMenu from "./screen/components/leftmenu";
import Content from "./screen/content";
import MContent from "./m_screen/m_content";
import MLogin from "./m_screen/m_login";

export const HomeContainer = () => {
  const logged = useSelector((state) => state.login.logged);

  const width = window.screen.width;

  const use_width = useSelector((state) => state.general.use_width);
  const mobile = useSelector((state) => state.general.mobile);
  const full_screen = useSelector((state) => state.general.full_screen);
  const hidemenu = useSelector((state) => state.general.hidemenu);

  return (
    <div>
      {(use_width && width < 1000) || mobile ? (
        <div>{!logged ? <MLogin /> : <MContent />}</div>
      ) : (
        <div>
          {full_screen ? (
            <Content />
          ) : (
            <div
              className={logged ? "grid-container" : "grid-container--login"}
            >
              {logged ? <Header /> : null}

              {logged ? (
                <div>
                  {hidemenu ? (
                    <div className="logged_main_compact">
                      <LeftMenu />
                      <Content />
                    </div>
                  ) : (
                    <div className="logged_main">
                      <LeftMenu />
                      <Content />
                    </div>
                  )}
                </div>
              ) : (
                <div className="not_logged_main">
                  <Content />
                </div>
              )}
              <Footer />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
