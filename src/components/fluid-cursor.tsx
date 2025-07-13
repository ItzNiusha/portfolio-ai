'use client';

import { useEffect } from 'react';
import fluidCursor from '@/use/use-fluid-effect';

const FluidCursor = () => {
  useEffect(() => {
    fluidCursor();
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <canvas id="fluid" className="h-full w-full" />
    </div>
  );
};

export default FluidCursor;
