import React from 'react';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
nprogress.configure({ showSpinner: false });
export default function Loading() {
  React.useEffect(() => {
    nprogress.start();
    return () => {
      nprogress.done();
    };
  }, []);
  return null;
}
