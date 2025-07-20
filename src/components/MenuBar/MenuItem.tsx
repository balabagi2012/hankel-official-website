import './MenuItem.scss';

interface MenuItemProps {
  title?: string;
  icon?: JSX.Element;
  action?: () => void;
  isActive?: () => boolean;
}
const MenuItem = ({
  title,
  action,
  icon,
  isActive = undefined,
}: MenuItemProps) => (
  <button
    className={`menu-item${isActive && isActive() ? ' is-active' : ''}`}
    onClick={action}
    title={title}
  >
    {icon ? icon : title}
  </button>
);

export default MenuItem;
