"use client";

import Loader from "@/components/Loader";
import { useEffect, useState } from "react";

const PreloaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return !loading ? children : <Loader />;
};

export default PreloaderProvider;
