import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

const fileCache = localForage.createInstance({
  name: "filecache",
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        // console.log("onLoad", args);

        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: inputCode,
          };
        }

        // check if already fetched this file
        // const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
        //   args.path
        // );
        // if (cachedResult) {
        //   return cachedResult;
        // }

        // if its in cache already return
        // else request file
        const { data, request } = await axios.get(args.path);

        // if path contains .css use css loader else use jsx
        const loader = args.path.match(/.css$/) ? "css" : "jsx";

        const result: esbuild.OnLoadResult = {
          loader: loader,
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        // store response in cache
        await fileCache.setItem(args.path, result);
        return result;
      });
    },
  };
};
