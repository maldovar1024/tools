import { CopyOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React, { FC } from 'react';

interface CopyButtonProp {
  disabled: boolean;
  onCopy: () => void;
  tip: string;
}

const CopyButton: FC<CopyButtonProp> = ({ disabled, onCopy, tip }) => (
  <Tooltip title={disabled ? '' : tip} color="cyan">
    <Button disabled={disabled} onClick={onCopy}>
      <CopyOutlined />
    </Button>
  </Tooltip>
);

export default CopyButton;
