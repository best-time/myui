import { reactive } from "vue";

interface Route {
  path: string;
  hash: string;
}

function getRoute(): Route {
  let { hash: locationHash } = window.location;
  if (locationHash.charAt(0) === "#") {
    locationHash = locationHash.slice(1);
  }
  const [path, hash] = locationHash.split("#");
  return {
    path,
    hash,
  };
}

export const AppNavigator = (() => {
  const state = reactive({
    route: getRoute(),
  });

  window.addEventListener("hashchange", () => {
    state.route = getRoute();
  });

  function go(path: string, hash?: string) {
    const locationHash = [path, hash].filter(Boolean).join("#");
    window.location.hash = locationHash;
  }

  return {
    state,
    go,
  };
})();
