import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Button } from './Button';

interface CopyToClipboardProps {
  children: React.ReactNode;
  textToCopy: string | number;
}

export const CopyToClipboard = ({ children, textToCopy }: CopyToClipboardProps) => {
  const [wasCopied, setWasCopied] = useState<boolean>(false);

  const handleClick = async () => {
    await navigator.clipboard.writeText(String(textToCopy));
    setWasCopied(true);
  };

  useEffect(() => {
    if (!wasCopied) {
      return;
    }

    const timeoutId = setTimeout(() => setWasCopied(false), 2000);

    return () => clearTimeout(timeoutId);
  }, [wasCopied]);

  return (
    <div className="flex gap-4">
      <p>{children}</p>
      <Button
        variant="link"
        className={clsx({ 'animate-strobe': wasCopied })}
        onClick={handleClick}
        disabled={wasCopied}
      >
        {wasCopied ? 'Copied!' : 'Copy'}
      </Button>
    </div>
  );
};
