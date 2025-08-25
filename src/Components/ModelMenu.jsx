import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

export default function ModelMenu({
  isOpen,
  onOpenChange,
  DeleteingFunction,
  target,
  IsLooding,
}) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete {target}
            </ModalHeader>
            <ModalBody>
              <p>
                Are you sure you Want to Delete this {target} ?! you will not
                able to recovery this
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                isLoading={IsLooding}
                variant="bordered"
                color="danger"
                onPress={() => DeleteingFunction(onClose)}
              >
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
