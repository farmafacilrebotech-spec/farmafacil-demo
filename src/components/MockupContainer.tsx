import React from 'react';

interface MockupContainerProps {
  children: React.ReactNode;
  title?: string;
}

export const MockupContainer: React.FC<MockupContainerProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {title && (
          <h2 className="text-center text-gray-600 mb-4 text-sm font-medium">
            {title}
          </h2>
        )}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px]">
          {children}
        </div>
      </div>
    </div>
  );
};

