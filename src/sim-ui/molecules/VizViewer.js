import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import animationData from "../../assets/viz-loading.json";
import { URL_API } from "../../config/const";

const getWebComponentName = (record) =>
  record?.extra?.originalName
    ? record?.extra?.originalName
        .split(".")
        .slice(0, -1)
        .join(".")
        .replace("_", "-")
    : record?.metadata?.firstLevel?.title;

function VizViewer({ record }) {
  const [isLoading, setLoading] = useState(true);
  const [WebComponent, setWebComponent] = useState();

  /* 
    Each web-component .js file lives in a server so it must be
    imported as a script in the app's html to be used as a web-component 
  */

  useEffect(() => {
    const id = record._id || record.idmongo;
    const resourceUrl = URL_API + "/api/records/file/" + id;
    const script = document.createElement("script");
    setWebComponent(React.createElement(getWebComponentName(record), {}, null));

    script.src = resourceUrl;
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => {
      setLoading(false);
      console.log("Script loaded and ready", resourceUrl);
    };

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(WebComponent);
    };
  }, []);

  return (
    <div className="viz-viewer">
      {isLoading ? (
        <div className="loading_viz">
          <Lottie
            height={150}
            width={150}
            options={{
              loop: true,
              autoplay: true,
              animationData: animationData,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
              },
            }}
          />
        </div>
      ) : (
        WebComponent
      )}
    </div>
  );
}

export default VizViewer;
