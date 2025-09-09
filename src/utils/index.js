// createPageUrl.js or index.js
export function createPageUrl(pageName) {
  // simple mapping of page names to paths
  const pages = {
    Home: "/home",
    Welcome: "/welcome",
    Onboarding: "/onboarding",
    Foods: "/foods",
    Planner: "/planner",
    Profile: "/profile",
  };

  return pages[pageName] || "/";
}
