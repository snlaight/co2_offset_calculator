'use client';

import { useState } from 'react';
import { Select, SelectItem, Text, Flex } from '@tremor/react';
import { trpc } from '@/providers/trpcProvider';
import { toast } from 'sonner';

import Loader from '@/components/Loader';
import Purchases from '@/components/forms/Purchases';

const CalculatorForm = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('US');

  const { isLoading, data } = trpc.emissions.getAllEmissions.useQuery(undefined, {
    onError: (error) => toast.error(error.message),
    refetchOnWindowFocus: false,
  });

  const { isLoading: locationDataLoading } = trpc.location.getUserLocation.useQuery(undefined, {
    onError: (error) => toast.error(error.message),
    refetchOnWindowFocus: false,
    onSettled: (res) => {
      if (res?.countryCode) setSelectedCountry(res?.countryCode);
      setSelectedCountry('US');
    },
  });

  if (isLoading && locationDataLoading) return <Loader />;

  if (!data) return null;

  return (
    <Flex flexDirection='col' alignItems='start' justifyContent='center'>
      <div className='space-y-4'>
        <Flex flexDirection='row' className='space-x-5'>
          <Text>
            Country:
          </Text>
          <Select defaultValue={selectedCountry} disabled={locationDataLoading}>
            {data.map((country) => (
              <SelectItem value={country.country_name} key={country.country_code}>
                {country.country_name}
              </SelectItem>
            ))}
          </Select>
        </Flex>
      </div>
      <Purchases disabled={isLoading && locationDataLoading} />
    </Flex>
  );
};

export default CalculatorForm;
