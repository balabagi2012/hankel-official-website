import "./MenuItem.scss";

interface MenuItemProps {
  title?: string;
  action?: () => void;
  isActive?: () => boolean;
}
const MenuItem = ({ title, action, isActive = undefined }: MenuItemProps) => (
  <button
    className={`menu-item${isActive && isActive() ? " is-active" : ""}`}
    onClick={action}
    title={title}
  >
    {title}
  </button>
);

export default MenuItem;
