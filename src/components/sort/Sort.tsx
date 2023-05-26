import React, { useState } from 'react';
import { Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Label } from 'reactstrap';

type SortProps = {
  options: string[];
  selectedOption: { name: string; direction: 1 | -1 };
  onOptionSelect: (option: any) => void;
  onDirectionSelect: (direction: 1 | -1) => void;
};

const Sort: React.FC<SortProps> = ({ options, selectedOption, onOptionSelect, onDirectionSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [directionIsOpen, setDirectionIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const toggleDirection = () => setDirectionIsOpen(!directionIsOpen);

  return (
    <>
      <div>
        <Label for="sort-dropdown" className="fw-normal h6 mb-3">
          Sort
        </Label>
        <Dropdown id="sort-dropdown" isOpen={isOpen} toggle={toggle}>
          <DropdownToggle caret className="btn-md">
            {selectedOption.name}
          </DropdownToggle>
          <DropdownMenu>
            {options.map((val) => (
              <DropdownItem key={val} onClick={() => onOptionSelect(val)}>
                {val}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
      <div>
        <Label for="sort-direction" className="fw-normal h6 mb-3">
          Sort
        </Label>
        <Dropdown id="sort-direction" isOpen={directionIsOpen} toggle={toggleDirection}>
          <DropdownToggle caret className="btn-md">
            {selectedOption.direction === 1 ? 'ASC' : 'DESC'}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => onDirectionSelect(1)}>ASC</DropdownItem>
            <DropdownItem onClick={() => onDirectionSelect(-1)}>DESC</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </>
  );
};

export { Sort };
