const LandingLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <main className='h-full bg-primary-950 overflow-auto'>
    <div className='mx-auto max-w-screen-xl h-full w-full'>
      {children}
    </div>
  </main>
);

export default LandingLayout;
