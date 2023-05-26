import React, { useState } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Label } from 'reactstrap';

type PageSizeProps = {
  currentSize: number;
  onSizeChange: (size: number) => void;
};

const PageSize: React.FC<PageSizeProps> = ({ currentSize, onSizeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Label for="sort-dropdown" className="fw-normal h6 mb-3">
        Page Size
      </Label>
      <Dropdown id="sort-dropdown" isOpen={isOpen} toggle={toggle}>
        <DropdownToggle caret className="btn-md">
          {currentSize}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => onSizeChange(5)}>5</DropdownItem>
          <DropdownItem onClick={() => onSizeChange(10)}>10</DropdownItem>
          <DropdownItem onClick={() => onSizeChange(20)}>20</DropdownItem>
          <DropdownItem onClick={() => onSizeChange(50)}>50</DropdownItem>
          <DropdownItem onClick={() => onSizeChange(100)}>100</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export { PageSize };
