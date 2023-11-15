'use client';

import { Modal, ModalContent, ModalHeader, ModalBody, Divider, ModalFooter, useDisclosure, type ModalProps } from '@nextui-org/react';

import Button from '@/components/buttons/Button';

interface ModalComponentProps extends ModalProps {
  children: React.ReactNode;
  title: string;
  actionText: string;
  footer: (props: {onClose: () => void}) => React.ReactNode;
}

const ModalComponent = ({
  children,
  actionText,
  title,
  footer,
}: Partial<ModalComponentProps>) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const renderTitle = () => (
    title && (
      <>
        <ModalHeader className='flex flex-col gap-1'>{title}</ModalHeader>
        <Divider className='mx-auto w-[90%]' />
      </>
    )
  );

  const renderBody = () => (
    children && (
      <ModalBody>
        {children}
      </ModalBody>
    )
  );

  const renderFooter = () => (
    footer && (
      <>
        <Divider />
        <ModalFooter>
          {footer({ onClose })}
        </ModalFooter>
      </>
    )
  );

  return (
    <>
      <Button onPress={onOpen}>
        {actionText}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur'>
        <ModalContent>
          {renderTitle()}
          {renderBody()}
          {renderFooter()}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComponent;
