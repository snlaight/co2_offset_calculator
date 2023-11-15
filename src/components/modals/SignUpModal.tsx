import { SignUp } from '@clerk/nextjs';

import RoutingModal from '@/components/modals/RoutingModal';

const SignUpModal = () => (
  <RoutingModal>
    <SignUp />
  </RoutingModal>
);

export default SignUpModal;
