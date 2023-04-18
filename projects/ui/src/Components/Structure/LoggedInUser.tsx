import { Popover } from "@mantine/core";
import { useState } from "react";
import { di } from "react-magnetic-di";
import { NavLink } from "react-router-dom";
import { restpointPrefix, useGetCurrentUser } from "../../Apis/hooks";
import { Icon } from "../../Assets/Icons";

/**
 * MAIN COMPONENT
 **/
export function LoggedInUser() {
  di(useGetCurrentUser);
  const { data: user } = useGetCurrentUser();
  const [opened, setOpened] = useState(false);

  // eslint-disable-next-line no-console
  console.log(user);

  return !user ? (
    <div className="userLoginArea loggedOut">
      <a href={`${restpointPrefix}/login`}>
        <div className="styledButton">LOGIN</div>
      </a>
    </div>
  ) : (
    <Popover position="bottom" opened={opened} onChange={setOpened}>
      <Popover.Target>
        <div
          className="userLoginArea loggedIn"
          onClick={() => setOpened(!opened)}
        >
          <div className="userHolder">
            <Icon.UserProfile className="userCircle" /> {user?.username}
            <Icon.DownArrow
              className={`dropdownArrow canRotate ${opened ? "rotate180" : ""}`}
            />
          </div>
        </div>
      </Popover.Target>
      <Popover.Dropdown>
        <div className="userDropdown">
          <NavLink to={"/usage-plans"} onClick={() => setOpened(!opened)}>
            API Keys
          </NavLink>
          <a
            href={`${restpointPrefix}/logout`}
            onClick={() => setOpened(!opened)}
          >
            Logout
          </a>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
}
