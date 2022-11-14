import { useState } from "react";
import ApplicationBuilder from "../application";

const i = 0;

function useApplication() {
  const [application] = useState(ApplicationBuilder());
  application.init();
  console.log("application.init ", i);
  return application;
}

export default useApplication;
