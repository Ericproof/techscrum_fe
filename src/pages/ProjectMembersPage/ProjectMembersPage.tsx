import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import config from '../../config/config';

export default function ProjectMembersPage() {
  const { projectId = '' } = useParams();
  const [members, setMembers] = useState<any>([]);
  const [roles, setRoles] = useState<any>([]);

  const getMembers = async () => {
    const path = `${config.apiAddress}/projects/${projectId}/members`;
    const res = await axios.get(path);
    setMembers(res.data);
  };

  useEffect(() => {
    const getRoles = async () => {
      const path = `${config.apiAddress}/roles`;
      const res = await axios.get(path);
      setRoles(res.data);
    };
    getRoles();
    getMembers();
  }, []);

  const onChangeProjectRole = async (e: any, userId: string) => {
    const path = `${config.apiAddress}/projects/${projectId}/members/${userId}`;
    const res = await axios.put(path, { roleId: e.target.value });
    if (res.data) {
      getMembers();
    }
  };

  const onClickRemove = async (userId: string) => {
    const path = `${config.apiAddress}/projects/${projectId}/members/${userId}`;
    const res = await axios.delete(path);
    if (res.data) {
      getMembers();
    }
  };

  const onClickAddMember = async () => {
    const userId = '62d3b849741c5a203c16bdc4';
    const path = `${config.apiAddress}/projects/${projectId}/members/invite`;
    const res = await axios.post(path, { roleId: '62d7f009e4713aab33380392', userId });
    if (res.data) {
      getMembers();
    }
  };

  return (
    <h1>
      {members.map((user: any) => {
        const selectProjectRole = user.projectsRoles.filter((projectRole: any) => {
          return projectRole.projectId === projectId;
        });
        return (
          <>
            <select
              value={selectProjectRole[0].roleId}
              onChange={(e) => {
                onChangeProjectRole(e, user.id);
              }}
            >
              {roles.map((role: any) => {
                return <option value={role.id}>{role.name}</option>;
              })}
            </select>
            <button
              type="button"
              onClick={() => {
                onClickRemove(user.id);
              }}
            >
              Remove member
            </button>
            <br />
          </>
        );
      })}
      <button type="button" onClick={onClickAddMember}>
        Add Member
      </button>
    </h1>
  );
}
