"use client";

import Hotjar from "@hotjar/browser";
// import Script from "next/script";
import { useEffect } from "react";

const siteId = 5053419;
const hotjarVersion = 6;

const HotJar = () => {
  useEffect(() => {
    // Initialise Hotjar only client side
    Hotjar.init(siteId, hotjarVersion);
  }, []);
  if (siteId) return null;
  return (
    <>
      {/* <Script id="hotjar-snippet">
        {`
          (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:${siteId},hjsv:${hotjarVersion}};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `}
      </Script> */}
    </>
  );
};

export default HotJar;
