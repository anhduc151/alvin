import copy from 'copy-to-clipboard';
import React, { useState } from 'react';

import FileCopyIcon from '@mui/icons-material/FileCopy';
import { IconButton, Tooltip } from '@mui/material';

interface CopyButtonProps {
  value: string | null;
  showText?: boolean;
}

const CopyButton = ({ value, showText = true }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    copy(text);
    setCopied(true);
    console.log(`Copied to clipboard: ${text}`);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  if (!value) return null;

  const formatTransactionHash = (hash: string) => {
    const visibleChars = 7;
    const hiddenPart = '...';
    const lastChars = hash.substring(hash.length - 5);
    return `${hash.substring(0, visibleChars)}${hiddenPart}${lastChars}`;
  };

  return (
    <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'}>
      <span>
        {showText && <span>{formatTransactionHash(value)}</span>}
        <IconButton
          aria-label="Copy"
          onClick={() => handleCopy(value)}
          size="small"
        >
          <FileCopyIcon fontSize="small" />
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default CopyButton;
