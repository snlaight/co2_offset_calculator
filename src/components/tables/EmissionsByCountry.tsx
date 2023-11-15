'use client';

import { useState } from 'react';
import { Info } from 'lucide-react';
import {
  Flex,
  Icon,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
} from '@tremor/react';

import { type EmmissionsResponse } from '@/server/routers/subrouters/emissions.router';

const EmissionsByCountry = ({ data }: {data: EmmissionsResponse}) => {
  const [selectedCountry, setSelectedCountry] = useState('all');

  const isCountrySelected = (country: string) => {
    if (!selectedCountry) {
      setSelectedCountry('all');
      return true;
    }
    if (selectedCountry === 'all') return true;

    return selectedCountry.includes(country);
  };

  return (
    <>
      <div>
        <Flex className='space-x-0.5' justifyContent='start' alignItems='center'>
          <Title className='!text-primary-500'>Emissions by Country</Title>
          <Icon icon={Info} variant='simple' tooltip='Shows emissions by country' />
        </Flex>
      </div>
      <div className='flex space-x-2'>
        <Select
          className='max-w-full sm:max-w-xs'
          onValueChange={setSelectedCountry}
          defaultValue='all'
        >
          <SelectItem value='all'>All</SelectItem>
          {data.map((country) => (
            <SelectItem key={country.country_code} value={country.country_name}>
              {country.country_name}
            </SelectItem>
          ))}
        </Select>
      </div>
      <Table className='mt-6'>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Country</TableHeaderCell>
            <TableHeaderCell className='text-right'>Emissions per capita(yearly)</TableHeaderCell>
            <TableHeaderCell className='text-right'>Emissions per capita(monthly)</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.filter((country) => isCountrySelected(country.country_name)).map((country) => (
            <TableRow key={country.country_code}>
              <TableCell>{country.country_name}</TableCell>
              <TableCell className='text-right'>
                {country.emissions_per_capita}
              </TableCell>
              <TableCell className='text-right'>
                {(country.emissions_per_capita / 12).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default EmissionsByCountry;
