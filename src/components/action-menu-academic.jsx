import { useState, useRef, useEffect } from "react"
import { Eye, Edit, Trash, XCircle, MoreHorizontal } from "lucide-react"

export default function ActionMenuAcademic({ onView, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const toggleMenu = (e) => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      const rect = e.currentTarget.getBoundingClientRect();

      // Calculate if menu would go off-screen to the right
      const menuWidth = 150; // Approximate width of the menu
      const rightEdge = rect.right + menuWidth;
      const windowWidth = window.innerWidth;

      // Calculate if menu would go off-screen at the bottom
      const menuHeight = 100; // Approximate height of the menu
      const bottomEdge = rect.bottom + menuHeight;
      const windowHeight = window.innerHeight;

      // Position menu above if it would go off bottom of screen
      const top =
        bottomEdge > windowHeight ? rect.top - menuHeight : rect.bottom;

      // Position menu to the left if it would go off right of screen
      const left =
        rightEdge > windowWidth
          ? rect.left - menuWidth + rect.width
          : rect.left;

      setMenuPosition({ top, left });
      setIsOpen(true);
    }

    e.stopPropagation();
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="action-menu" ref={menuRef}>
      <button
        className="action-menu-trigger"
        onClick={toggleMenu}
        aria-label="More options"
      >
        <MoreHorizontal size={16} />
      </button>

      {isOpen && (
        <div
          className="action-menu-dropdown"
          style={{
            position: "fixed",
            top: `${menuPosition.top}px`,
            left: `${menuPosition.left}px`,
          }}
        >
          <button
            className="action-menu-item"
            onClick={() => {
              onView();
              setIsOpen(false);
            }}
          >
            <Eye size={14} />
            <span>View</span>
          </button>
          <button
            className="action-menu-item delete"
            onClick={() => {
              onDelete();
              setIsOpen(false);
            }}
          >
            <Trash size={14} />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
}