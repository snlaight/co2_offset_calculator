'use client';

import { Card, Flex, Metric, Text, Badge } from '@tremor/react';
import ReactCountryFlag from 'react-country-flag';

interface Props {
  title: string;
  country: string;
  countryCode: string;
  delta: number | string | undefined;
  timePeriod: string;
}

const KPICard = ({ title, country, countryCode, delta, timePeriod } : Props) => (
  <Card className='max-w-lg mx-auto'>
    <Flex alignItems='start'>
      <div className='space-y-2'>
        <Text className='text-2xl font-semibold text-primary-800'>
          {title}
        </Text>
        <Text className='flex flex-row gap-x-4 h-8 items-center text-xl text-secondary-900'>
          <ReactCountryFlag countryCode={countryCode} />
          {country}
        </Text>
      </div>
      <Badge color='cyan' size='xs'>
        <span className='text-secondary-900'>{timePeriod}</span>
      </Badge>
    </Flex>
    <Flex className='mt-4'>
      <Text className='text-secondary-800'>
        Emissions per capita:
      </Text>
      <Metric className='text-medium'>
        {delta}
      </Metric>
    </Flex>
  </Card>

);

export default KPICard;
