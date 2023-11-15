'use client';

import { useState } from 'react';
import {
  Text,
  Title,
  LineChart,
  Card,
} from '@tremor/react';
import { toast } from 'sonner';

import { trpc } from '@/providers/trpcProvider';
import CalculatorForm from '@/components/forms/Calculator';
import Loader from '@/components/Loader';
import runSimulation from '@/utils/helpers/runSimulation';

const CalculatorPage = () => {
  const { isLoading, data } = trpc.purchase.userPurchases.useQuery(undefined, {
    onError: (error) => toast.error(error.message),
    refetchOnWindowFocus: false,
  });

  const loading = isLoading;

  if (loading) return <Loader />;

  return (
    <main className='px-12 h-full'>
      <Title className='!text-primary-500'>
        Calculator
      </Title>
      <Text className='!text-primary-700'>
        Here you can calculate your carbon offset based on your tree purchases.
      </Text>
      <CalculatorForm />
      <div className='mt-12'>
        <Title>
          Summary
        </Title>
      </div>
    </main>
  );
};

export default CalculatorPage;
