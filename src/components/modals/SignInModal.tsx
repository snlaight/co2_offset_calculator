import { SignIn } from '@clerk/nextjs';

import Modal from '@/components/modals/Modal';

const SignInModal = () => (
  <Modal>
    <SignIn />
  </Modal>
);

export default SignInModal;
