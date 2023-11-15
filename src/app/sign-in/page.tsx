import { SignIn } from '@clerk/nextjs';

const SignInPage = () => (
  <main className='flex min-h-screen flex-col items-center justify-center bg-primary-950'>
    <SignIn />
  </main>
);

export default SignInPage;
