import { CloseCircleFilled, CopyOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React, { FC } from 'react';

interface CopyButtonProp {
  disabled: boolean;
  onCopy: () => void;
  tip: string;
}

export const CopyButton: FC<CopyButtonProp> = ({ disabled, onCopy, tip }) => (
  <Tooltip title={tip} color="#7DBCEA">
    <Button disabled={disabled} icon={<CopyOutlined />} onClick={onCopy} />
  </Tooltip>
);

interface ClearButtonProp {
  disabled: boolean;
  onClick: React.MouseEventHandler<HTMLElement>;
  tip: string;
}

export const ClearButton: FC<ClearButtonProp> = ({
  disabled,
  onClick,
  tip,
}) => (
  <Tooltip title={tip} color="#7DBCEA">
    <Button
      disabled={disabled}
      style={{ color: 'rgba(0, 0, 0, 0.25)' }}
      icon={<CloseCircleFilled />}
      onClick={onClick}
    />
  </Tooltip>
);
