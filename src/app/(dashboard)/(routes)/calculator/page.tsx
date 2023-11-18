'use client';

import {
  Text,
  Title,
} from '@tremor/react';

import CalculatorForm from '@/components/forms/Calculator';

const CalculatorPage = () => (
  <main className='px-12 h-full'>
    <Title className='!text-primary-500'>
      Calculator
    </Title>
    <Text className='!text-primary-700'>
      Here you can calculate your carbon offset based on your tree purchases.
    </Text>
    <CalculatorForm />
  </main>
);

export default CalculatorPage;
