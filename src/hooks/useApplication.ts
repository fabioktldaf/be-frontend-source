import { useState, useEffect } from "react";
import ApplicationBuilder, { IApplication } from "../application";

const i = 0;
const app = ApplicationBuilder();
app.init();

function useApplication() {
  // const [app, setApp] = useState<IApplication>();

  // useEffect(() => {
  //   const _app = ApplicationBuilder();
  //   _app.init();
  //   console.log("application.init ", i);
  //   setApp(_app);
  // }, []);

  return app;
}

export default useApplication;
