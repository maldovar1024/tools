import React, { FC, useEffect } from 'react';

const NotFound: FC = () => {
  useEffect(() => {
    window.location.href = 'https://zhangzhengyi1024.github.io/404';
  }, []);
  return <></>;
};

export default NotFound;
