import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { updateRole } from '../../api/role/role';
import ProjectHeader from '../../components/ProjectHeader/ProjectHeader';
import config from '../../config/config';
import useOutsideAlerter from '../../hooks/OutsideAlerter';
import styles from './RolePage.module.scss';

export default function ProjectMembersPage() {
  const [roles, setRoles] = useState<any>([]);
  const [permissions, setPermissions] = useState<any>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<any>([]);
  const { visible, setVisible, myRef } = useOutsideAlerter(false);
  const handleClickOutside = () => setVisible(true);
  const { id: roleId } = roles;
  const { permission } = roles;

  useEffect(() => {
    const getRoles = async () => {
      const path = `${config.apiAddress}/roles`;
      const res = await axios.get(path);
      setRoles(res.data);
    };

    const getPermissions = async () => {
      const path = `${config.apiAddress}/permissions`;
      const res = await axios.get(path);
      setPermissions(res.data);
    };

    getRoles();
    getPermissions();
  }, []);

  const onClickAddPermission = (id: string, data: string) => {
    updateRole(id, selectedPermissions);
  };

  const onChangeSelectedPermissions = (e: any) => {
    setSelectedPermissions(e.target.value);
  };

  return (
    <>
      <ProjectHeader />
      <div className={styles.projectPage}>
        <div className={styles.projectContainer}>
          <div className={styles.projectContent}>
            <div className={styles.header}>
              <div className={styles.title}>
                <h1>Manage Roles</h1>
              </div>
              <div className={styles.mainContent}>
                <table aria-label="Projects details">
                  <thead>
                    <tr>
                      <th className={styles.roles}>
                        <span>Roles</span>
                      </th>
                      {roles.map((role: any) => (
                        <th className={styles.types}>
                          <span>{role.name}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className={styles.key}>
                        <span>Permission</span>
                      </td>
                      <td>
                        <div ref={myRef} className={styles.permissionOptionSection}>
                          {visible ? (
                            <>
                              <IoIosAddCircle />
                              <div className={styles.permissionList}>
                                <ul>
                                  {permissions.map((item: any) => (
                                    <li id={item.id}>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          // onClickAddPermission(roleId, selectedPermissions)
                                          setVisible(false)
                                        }
                                      >
                                        {item.description}
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className={styles.selectedPermissions}>
                                {permission.map((item: any) => (
                                  <span>{item.slug}</span>
                                ))}
                              </div>
                            </>
                          ) : (
                            <IoIosAddCircle onClick={handleClickOutside} />
                          )}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {roles.map((role: any) => {
                return (
                  <>
                    <div>
                      <b>{role.name} Role</b>
                    </div>
                    {role.permission.map((item: any) => {
                      return (
                        <>
                          <span>{item.slug}</span>
                          <br />
                        </>
                      );
                    })}
                    <select value={selectedPermissions} onChange={onChangeSelectedPermissions}>
                      {permissions.map((item: any) => {
                        return <option value={item.id}>{item.description}</option>;
                      })}
                    </select>
                    <button
                      type="button"
                      onClick={() => {
                        onClickAddPermission(role.id, selectedPermissions);
                      }}
                    >
                      Add Permission
                    </button>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
