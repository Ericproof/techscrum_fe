import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { updateRole } from '../../api/role/role';
import config from '../../config/config';

export default function ProjectMembersPage() {
  const [roles, setRoles] = useState<any>([]);
  const [permissions, setPermissions] = useState<any>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<any>([]);

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
    </>
  );
}
