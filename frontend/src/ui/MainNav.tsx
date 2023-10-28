import { NavLink, type To } from "react-router-dom";

interface Props {
  to: To;
  children: JSX.Element;
}

const StyledNavLink = function ({ to, children }: Props) {
  return (
    <NavLink to={to} className="flex items-center gap-4 px-6 py-4 text-base">
      {children}
    </NavLink>
  );
};

function MainNav() {
  return (
    <nav>
      <ul className="flex flex-col gap-2">
        <li>
          <StyledNavLink to="/users">
            <span>Users</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/settings">
            <span>Settings</span>
          </StyledNavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
