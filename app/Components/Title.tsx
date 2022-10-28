"use client";
import React, { useEffect } from "react";

export default function Title({ children }: { children: string }) {
  useEffect(() => {
    document.title = `${children} | AccSaber`;
  });

  return <div className="hidden" />;
}
