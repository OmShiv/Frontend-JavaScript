/**
 * Given a list of tabs, build a tab switch layout
 * #ui #react #state-management #frontend
 */

const tabs = {
  entrees: { title: "Entrees", content: "Starter courses" },
  mains: { title: "Mains", content: "The most substantial course" },
  desserts: { title: "Desserts", content: "A sweet treat at the end" },
};
Then you need to:

Use Object.keys(tabs) to get tab ids.

Access each tab’s title and content from the object.

Here’s a complete, clean solution using the object input, with deep linking, URL sync, and support for browser navigation:

jsx
Copy
Edit
import React, { useState, useEffect } from "react";

const tabs = {
  entrees: { title: "Entrees", content: "Starter courses" },
  mains: { title: "Mains", content: "The most substantial course" },
  desserts: { title: "Desserts", content: "A sweet treat at the end" },
};

const tabIds = Object.keys(tabs);

// Utility: Get tab from URL (?tab=entrees)
function getTabFromURL() {
  const params = new URLSearchParams(window.location.search);
  const tab = params.get("tab");
  return tabIds.includes(tab) ? tab : tabIds[0]; // fallback to first tab
}

// Utility: Set tab in URL
function setTabInURL(tabId) {
  const params = new URLSearchParams(window.location.search);
  params.set("tab", tabId);
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.pushState({}, "", newUrl);
}

export default function TabComponent() {
  const [activeTab, setActiveTab] = useState(getTabFromURL());

  // Sync tab state with URL when activeTab changes
  useEffect(() => {
    setTabInURL(activeTab);
  }, [activeTab]);

  // Listen for browser back/forward navigation
  useEffect(() => {
    const onPopState = () => setActiveTab(getTabFromURL());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return (
    <div>
      <div role="tablist" style={{ display: "flex", gap: 8 }}>
        {tabIds.map(tabId => (
          <button
            key={tabId}
            role="tab"
            aria-selected={activeTab === tabId}
            onClick={() => setActiveTab(tabId)}
            style={{
              borderBottom: activeTab === tabId ? "2px solid blue" : "none",
              fontWeight: activeTab === tabId ? "bold" : "normal"
            }}
          >
            {tabs[tabId].title}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 16 }}>
        <TabPanel tabId={activeTab} />
      </div>
    </div>
  );
}

function TabPanel({ tabId }) {
  return <div>{tabs[tabId]?.content}</div>;
}
