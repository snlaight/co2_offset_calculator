import { SignUp } from '@clerk/nextjs';

import Modal from '@/components/modals/Modal';

const SignUpModal = () => (
  <Modal>
    <SignUp />
  </Modal>
);

export default SignUpModal;
