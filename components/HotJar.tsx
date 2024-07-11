"use client";

import Hotjar from "@hotjar/browser";
import { useEffect } from "react";

const siteId = 5053419;
const hotjarVersion = 6;

const HotJar = () => {
  useEffect(() => {
    // Initialize Hotjar only client side
    Hotjar.init(siteId, hotjarVersion);
  }, []);
  if (siteId) return null;
};

export default HotJar;
