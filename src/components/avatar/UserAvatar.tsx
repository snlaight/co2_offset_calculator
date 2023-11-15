'use client';

import { Avatar } from '@nextui-org/react';
import { UserIcon } from 'lucide-react';
import { useUser } from '@clerk/nextjs';

const UserAvatar = () => {
  const { user } = useUser();

  return (
    <Avatar src={user?.imageUrl} radius='full' className='h-8 w-8' name={`${user?.fullName}`} showFallback fallback={<UserIcon />} />
  );
};

export default UserAvatar;
