import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { stateStore } from "./stores";
import "mapbox-gl/dist/mapbox-gl.css";

import Neom from "./components/0.0_map/Neom";
import ResPage from "./components/0.3_resolution/ResPage";

import InfoBox from "./components/0.6_popup/InfoBox";

import loadImage from "./utils/loadImg";
import _IMG_LIST from "./data/pre_load_img_list.json";

import Protect from "./components/0.7_protect/protect";

const App = () => {
  const { page } = stateStore;

  let siteProtection =
    process.env.REACT_APP_SITE_PROTECTION == "false"
      ? false
      : process.env.REACT_APP_SITE_PROTECTION == "true"
      ? true
      : undefined;

  siteProtection = false;
  let sha512 =
    "d370d262a7e11e19ee8c9cae492d09d8d5b4b70054e75f96527c6e028974af2dbefdae18e59be765dd4e12d1b7d9f8b0167cb2f73250312561bc753f8ea35ef6";

  // disable right click
  useEffect(() => {
    document.oncontextmenu = function (e) {
      // block right-click context menu
      e = e || window.event;
      return false;
    };
  }, []);

  // responsive design
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // preload img
  useEffect(() => {
    _IMG_LIST.forEach((v, i, _) => {
      loadImage(v, (img) => {
        console.log(`Loading... ${i + 1}/${_IMG_LIST.length}`);
      });
    });
  }, []);

  useEffect(() => {
    if (windowSize.width < 1100 || windowSize.height < 400) setIsMobile(true);
    else setIsMobile("ontouchstart" in document.documentElement);
  }, [windowSize.width, windowSize.height]);

  return isMobile ? (
    <ResPage />
  ) : (
    <Protect isEnabled={page > 1 && siteProtection} sha512={sha512}>
      <div>
        {/* <InfoBox /> */}
        <Neom />
      </div>
    </Protect>
  );
};

export default App;

export function renderToDOM(container) {
  render(<App />, container);
}
