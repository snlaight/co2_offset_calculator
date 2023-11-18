import { Title, Flex, Text } from '@tremor/react';

import useCalculationStore from '@/utils/store/calculation.store';

const SummaryStatus = {
  NEGATIVE: {
    message: 'You are not offsetting your carbon footprint.',
    color: 'red',
  },
  NEUTRAL: {
    message: 'You are offsetting your carbon footprint.',
    color: 'green',
  },
};

const CalculationSummary = () => {
  const { currentOffset, valueToOffset, country } = useCalculationStore();

  const status = currentOffset > valueToOffset * 1000 ? SummaryStatus.NEUTRAL : SummaryStatus.NEGATIVE;

  const generateSummaryMessage = () => {
    if (currentOffset > valueToOffset * 1000) {
      return `Citizens of ${country} offset ${valueToOffset} tonnes of CO2 per year. You are currently offsetting ${currentOffset} tonnes of CO2 per year.`;
    }
    if (!currentOffset && country) {
      return `Citizens of ${country} offset ${valueToOffset * 1000} tonnes of CO2 per year. You are currently offsetting ${currentOffset} tonnes of CO2 per year. You still need to offset ${valueToOffset * 1000 - currentOffset} tonnes of CO2 per year to be carbon neutral.`;
    }
    if (currentOffset < valueToOffset * 1000) {
      return `Citizens of ${country} offset ${valueToOffset * 1000} tonnes of CO2 per year. You are currently offsetting ${currentOffset} tonnes of CO2 per year. You still need to offset ${valueToOffset * 1000 - currentOffset} tonnes of CO2 per year to be carbon neutral.`;
    }
    return 'Please select a country to see your carbon offset status.';
  };

  return (
    <Flex className='mt-12' flexDirection='col' alignItems='start'>
      <Title>
        Summary
      </Title>
      <Text className='flex flex-row !space-x-4'>
        {status.message}
        {generateSummaryMessage()}
      </Text>
    </Flex>
  );
};

export default CalculationSummary;
