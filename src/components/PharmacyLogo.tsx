import React from 'react';

interface PharmacyLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const PharmacyLogo: React.FC<PharmacyLogoProps> = ({ 
  size = 'md',
  className = '' 
}) => {
  const logoUrl = 'https://zvxxdmfljbtlenjatqgm.supabase.co/storage/v1/object/public/farmacias-logos/logos/1763991491076-prueba.png';
  
  const sizeClasses = {
    sm: 'h-12',
    md: 'h-14',
    lg: 'h-16',
  };

  return (
    <img 
      src={logoUrl}
      alt="Farmacia Mediterráneo"
      className={`${sizeClasses[size]} object-contain ${className}`}
      onError={(e) => {
        // Fallback si la imagen no carga
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
      }}
    />
  );
};

