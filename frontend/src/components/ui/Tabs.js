import React, { useId, useRef, useState } from "react";
import { cn } from "../../lib/cn";

/**
 * Minimal WAI-ARIA tabs: roving tabindex, arrow-key navigation, a single
 * sliding indicator that moves under the active tab instead of restyling
 * each button (movement reads as "selection changed" more clearly than a
 * colour swap alone).
 *
 * @param {object} props
 * @param {{id: string, label: React.ReactNode, panel: React.ReactNode}[]} props.tabs
 * @param {string} [props.label] accessible name for the tablist
 */
export function Tabs({ tabs, label = "Details" }) {
  const [activeId, setActiveId] = useState(tabs[0]?.id);
  const listRef = useRef(null);
  const baseId = useId();

  const activeIndex = Math.max(tabs.findIndex((tab) => tab.id === activeId), 0);

  const onKeyDown = (event) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();

    let nextIndex = activeIndex;
    if (event.key === "ArrowRight") nextIndex = (activeIndex + 1) % tabs.length;
    if (event.key === "ArrowLeft")
      nextIndex = (activeIndex - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;

    setActiveId(tabs[nextIndex].id);
    listRef.current
      ?.querySelector(`[data-tab-index="${nextIndex}"]`)
      ?.focus();
  };

  return (
    <div className="tabs">
      <div
        ref={listRef}
        role="tablist"
        aria-label={label}
        className="tabs__list"
        style={{ "--active-tab": activeIndex, "--tab-count": tabs.length }}
        onKeyDown={onKeyDown}
      >
        <span className="tabs__indicator" aria-hidden="true" />
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            data-tab-index={index}
            id={`${baseId}-tab-${tab.id}`}
            aria-selected={tab.id === activeId}
            aria-controls={`${baseId}-panel-${tab.id}`}
            tabIndex={tab.id === activeId ? 0 : -1}
            className={cn("tabs__tab", tab.id === activeId && "is-active")}
            onClick={() => setActiveId(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${baseId}-panel-${tab.id}`}
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={tab.id !== activeId}
          className="tabs__panel"
        >
          {tab.id === activeId && tab.panel}
        </div>
      ))}
    </div>
  );
}

export default Tabs;
