import { useRef, useState, useEffect } from 'react';

function UseOutsideAlerter(initialValue: boolean) {
  const myRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(initialValue);

  const handleClickInside = (e: any) => {
    if (myRef.current !== null && !myRef.current.contains(e.target)) {
      setVisible(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickInside);
    return () => document.removeEventListener('mousedown', handleClickInside);
  });

  return { visible, setVisible, myRef };
}

export default UseOutsideAlerter;
