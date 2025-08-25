import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";

export default function DropDownMenu({ onOpen, setSwitchEditeMode }) {
  return (
    <div className="pe-4">
      <Dropdown>
        <DropdownTrigger>
          <svg
            className=" cursor-pointer w-fit outline-none"
            xmlns="http://www.w3.org/2000/svg"
            width={27}
            height={27}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#b0b0b0"
            strokeWidth={2}
            strokeLinecap="square"
            strokeLinejoin="round"
          >
            <circle cx={12} cy={12} r={1} />
            <circle cx={19} cy={12} r={1} />
            <circle cx={5} cy={12} r={1} />
          </svg>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="edit" onPress={() => setSwitchEditeMode(true)}>
            Edit{" "}
          </DropdownItem>
          <DropdownItem
            onPress={onOpen}
            key="delete"
            className="text-danger"
            color="danger"
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
