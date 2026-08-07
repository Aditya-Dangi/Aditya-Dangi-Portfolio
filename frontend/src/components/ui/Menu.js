import React, {
  cloneElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { FiCheck } from "react-icons/fi";
import { cn } from "../../lib/cn";
import { usePresence } from "../../hooks/usePresence";

/**
 * Dropdown menu with roving keyboard focus.
 *
 * Implements the WAI-ARIA menu button pattern: ArrowUp/ArrowDown move,
 * Home/End jump, Escape closes and returns focus to the trigger, and an
 * outside click dismisses.
 *
 * @param {object} props
 * @param {React.ReactElement} props.trigger element that opens the menu
 * @param {{id: string, label: React.ReactNode, icon?: React.ReactNode, selected?: boolean, onSelect: () => void}[]} props.items
 * @param {"start" | "end"} [props.align]
 * @param {string} [props.label] accessible name for the menu
 */
export function Menu({ trigger, items, align = "end", label = "Menu" }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { mounted, state } = usePresence(open, 150);
  const rootRef = useRef(null);
  const itemRefs = useRef([]);
  const menuId = useId();

  const close = useCallback(() => setOpen(false), []);

  // Outside click / focus-out dismissal.
  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) close();
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, close]);

  // Move DOM focus onto the active item so screen readers follow along.
  // `mounted` is in the deps because the items only exist after the presence
  // hook mounts them, one render after `open` flips.
  useEffect(() => {
    if (open && mounted) itemRefs.current[activeIndex]?.focus({ preventScroll: true });
  }, [open, mounted, activeIndex]);

  const openMenu = (startIndex) => {
    const selected = items.findIndex((item) => item.selected);
    setActiveIndex(startIndex ?? (selected >= 0 ? selected : 0));
    setOpen(true);
  };

  const onTriggerKeyDown = (event) => {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openMenu();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      openMenu(items.length - 1);
    }
  };

  const onMenuKeyDown = (event) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((index) => (index + 1) % items.length);
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((index) => (index - 1 + items.length) % items.length);
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(items.length - 1);
        break;
      case "Escape":
        event.preventDefault();
        close();
        break;
      case "Tab":
        close();
        break;
      default:
        break;
    }
  };

  const triggerElement = cloneElement(trigger, {
    "aria-haspopup": "menu",
    "aria-expanded": open,
    "aria-controls": mounted ? menuId : undefined,
    onClick: (event) => {
      trigger.props.onClick?.(event);
      if (open) close();
      else openMenu();
    },
    onKeyDown: (event) => {
      trigger.props.onKeyDown?.(event);
      onTriggerKeyDown(event);
    },
  });

  return (
    <div className="menu-root" ref={rootRef}>
      {triggerElement}

      {mounted && (
        <div
          id={menuId}
          role="menu"
          aria-label={label}
          data-state={state}
          className={cn("menu", `menu--${align}`)}
          onKeyDown={onMenuKeyDown}
        >
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="menuitemradio"
              aria-checked={Boolean(item.selected)}
              tabIndex={index === activeIndex ? 0 : -1}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              className={cn("menu__item", item.selected && "is-selected")}
              style={{ "--menu-index": index }}
              onClick={() => {
                item.onSelect();
                close();
              }}
              onPointerEnter={() => setActiveIndex(index)}
            >
              {item.icon && <span className="menu__icon">{item.icon}</span>}
              <span className="menu__label">{item.label}</span>
              <span className="menu__check" aria-hidden="true">
                {item.selected && <FiCheck />}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Menu;
