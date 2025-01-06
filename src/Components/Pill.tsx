import React from 'react';

export const Pill = ({
  label,
  onClick,
  selected,
}: {
  label: string;
  onClick: () => void;
  selected: boolean;
}) => {
  return (
    <div className={`pill ${selected ? 'selected' : ''}`} onClick={onClick}>
      {label}
    </div>
  );
};
