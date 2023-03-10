import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config/config';

const LabelContext = createContext<any>({});

interface IRolesProvider {
  children?: React.ReactNode;
}

function LabelsProvider({ children }: IRolesProvider) {
  const [labels, setLabels] = useState<any>([]);

  const getCompanyLabels = async () => {
    const path = `${config.apiAddress}/labels`;
    const res = await axios.get(path);
    setLabels(res.data);
  };

  useEffect(() => {
    getCompanyLabels();
  }, []);

  return <LabelContext.Provider value={labels}>{children}</LabelContext.Provider>;
}

LabelsProvider.defaultProps = {
  children: null
};

export { LabelContext, LabelsProvider };
