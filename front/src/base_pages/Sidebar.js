//styledone

import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaInfoCircle,
  FaUserCircle,
  FaKey,
  FaSearch,
  FaList,
  FaPlusCircle,
  FaMap,
  FaDotCircle
} from "react-icons/fa";
import styles from "../styles/theme.module.css";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className={styles.sidebar}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? `${styles.sidebarLink} ${styles.sidebarLinkActive}` : styles.sidebarLink
        }
      >
        <FaHome className={styles.sidebarIcon} />
        <span className={styles.sidebarLabel}>Home</span>
      </NavLink>

      {/* Map Tools removed from template skeleton */}

      {/* Items List removed from template skeleton */}

      {user?.is_admin && (
        <NavLink
          to="/search_users"
          className={({ isActive }) =>
            isActive ? `${styles.sidebarLink} ${styles.sidebarLinkActive}` : styles.sidebarLink
          }
        >
          <FaSearch className={styles.sidebarIcon} />
          <span className={styles.sidebarLabel}>Search Users</span>
        </NavLink>
      )}

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive ? `${styles.sidebarLink} ${styles.sidebarLinkActive}` : styles.sidebarLink
        }
      >
        <FaUserCircle className={styles.sidebarIcon} />
        <span className={styles.sidebarLabel}>Profile</span>
      </NavLink>

      <NavLink
        to="/change_password"
        className={({ isActive }) =>
          isActive ? `${styles.sidebarLink} ${styles.sidebarLinkActive}` : styles.sidebarLink
        }
      >
        <FaKey className={styles.sidebarIcon} />
        <span className={styles.sidebarLabel}>Password</span>
      </NavLink>

      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive ? `${styles.sidebarLink} ${styles.sidebarLinkActive}` : styles.sidebarLink
        }
      >
        <FaInfoCircle className={styles.sidebarIcon} />
        <span className={styles.sidebarLabel}>About</span>
      </NavLink>


        <NavLink
          to="/ecosystem"
        className={({ isActive }) =>
          isActive ? `${styles.sidebarLink} ${styles.sidebarLinkActive}` : styles.sidebarLink
        }
      >
        <FaMap className={styles.sidebarIcon} />
        <span className={styles.sidebarLabel}>Ecosystem</span>
      </NavLink>



    </aside>
  );
}
