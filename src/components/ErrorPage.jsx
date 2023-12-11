import React, { useEffect, useState } from 'react';

const ErrorPage = ({ mensaje, tipo }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    if (mensaje && visible) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  if (!mensaje || !visible) {
    return null;
  }

  const color = tipo === 'exito' ? 'bg-green-500 text-white' : 'bg-red-500 text-white';

  return (
    <div className={`rounded-xl p-4 text-center ${color}`}>
      {mensaje}
    </div>
  );
}

export default ErrorPage;
