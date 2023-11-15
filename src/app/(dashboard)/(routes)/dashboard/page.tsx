/* eslint-disable no-underscore-dangle */

'use client';

import {
  BarChart,
  Grid,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Text,
  Title,
} from '@tremor/react';
import { notFound } from 'next/navigation';
import { toast } from 'sonner';

import Loader from '@/components/Loader';
import KPICard from '@/components/cards/KPICard';
import EmissionsByCountry from '@/components/tables/EmissionsByCountry';
import { trpc } from '@/providers/trpcProvider';

const DashboardHome = () => {
  const { isLoading, data } = trpc.emissions.getCalculatedEmissions.useQuery(undefined, {
    onError: (error) => {
      toast.error(error.message);
    },
    refetchOnWindowFocus: false,
  });

  const { isLoading: isAllEmissionsLoading, data: allEmissionsData } = trpc.emissions.getAllEmissions.useQuery(undefined, {
    onError: (error) => toast.error(error.message),
    refetchOnWindowFocus: false,
  });

  if (isLoading && isAllEmissionsLoading) return <Loader />;

  if (!data || !allEmissionsData) return notFound();

  const chartArgs = {
    className: 'mt-5 h-72',
    data: allEmissionsData,
    categories: ['emissions_per_capita'],
    index: 'country_name',
    showXAxis: false,
  };

  return (
    <main className='px-12'>
      <Title className='!text-primary-500'>Dashboard</Title>
      <Text className='!text-primary-700'>
        Welcome to the dashboard! Here you can view your carbon footprint, and
        compare it to other users.
      </Text>
      <TabGroup className='mt-6'>
        <TabList color='cyan'>
          <Tab>Overview</Tab>
          <Tab>All Countries</Tab>
        </TabList>
        <TabPanels>
          {/** OVERVIEW PANEL */}
          <TabPanel>
            <Grid numItemsMd={2} numItemsLg={3} className='gap-6 mt-6'>
              <KPICard title='Highest Average' country={data.highestAverage.country_name} countryCode={data.highestAverage.country_code} delta={data.highestAverage.emissions_per_capita} timePeriod='Yearly' />
              <KPICard title='Average' country='' countryCode='' delta={data.average._avg.emissions_per_capita?.toFixed(2)} timePeriod='Yearly' />
              <KPICard title='Lowest Average' country={data.lowestAverage.country_name} countryCode={data.lowestAverage.country_code} delta={data.lowestAverage.emissions_per_capita} timePeriod='Yearly' />
            </Grid>
            <div className='mt-6'>
              <BarChart {...chartArgs} />
            </div>
          </TabPanel>

          {/** ALL COUNTRIES PANEL */}
          <TabPanel>
            <EmissionsByCountry data={allEmissionsData} />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
};

export default DashboardHome;
