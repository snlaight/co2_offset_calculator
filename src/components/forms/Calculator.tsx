'use client';

import { SearchSelect, SearchSelectItem, Text, Flex } from '@tremor/react';
import { trpc } from '@/providers/trpcProvider';
import { toast } from 'sonner';

import Loader from '@/components/Loader';
import useCalculationStore from '@/utils/store/calculation.store';
import Purchases from '@/components/forms/Purchases';

const CalculatorForm = () => {
  const { setOffset, currentOffset, valueToOffset, setCountry } = useCalculationStore();

  const { isLoading, data } = trpc.emissions.getAllEmissions.useQuery(undefined, {
    onError: (error) => toast.error(error.message),
    refetchOnWindowFocus: false,
  });

  const { isLoading: locationDataLoading, isFetching } = trpc.location.getUserLocation.useQuery(undefined, {
    initialData: {
      countryCode: 'US',
      country: 'United States',
    },
    onError: (error) => toast.error(`${error.message}, please select your location from the list.`),
    refetchOnWindowFocus: false,
    onSettled: (res) => {
      if (res?.countryCode) setCountry(res?.countryCode);
    },
  });

  if (isLoading && isFetching) return <Loader />;

  if (!data) return null;

  return (
    <Flex flexDirection='col' alignItems='start' justifyContent='center'>
      <div className='space-y-4'>
        <Flex flexDirection='row' className='space-x-5'>
          <Text>
            Country:
          </Text>
          <SearchSelect disabled={locationDataLoading}>
            {data.map((country) => (
              <SearchSelectItem
                value={country.country_code}
                key={country.country_code}
                onClick={() => {
                  setCountry(country.country_code);
                  setOffset(country.emissions_per_capita, currentOffset);
                }}

              >
                {country.country_name}
              </SearchSelectItem>
            ))}
          </SearchSelect>
        </Flex>

        <Flex>
          <Text>
            Emissions:
          </Text>
          {valueToOffset ? (
            <Text>
              {valueToOffset}
              {' '}
              kg CO2 per capita
            </Text>
          ) : null}
        </Flex>

      </div>
      <Purchases disabled={isLoading && locationDataLoading} />
    </Flex>
  );
};

export default CalculatorForm;
