"use client";

import { useEffect } from "react";

export default function FlowbiteInit() {
  useEffect(() => {
    const timer = setTimeout(() => {
      import("flowbite").then(({ initFlowbite }) => {
        initFlowbite();
      });
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return null;
}