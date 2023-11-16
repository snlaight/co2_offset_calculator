/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { Table, Icon, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, NumberInput, DatePicker, Flex } from '@tremor/react';
import { Trash } from 'lucide-react';

import FormButton from '@/components/buttons/FormButton';
import Button from '@/components/buttons/Button';
import { trpc } from '@/providers/trpcProvider';

type Purchase = {
  index: number;
  monthYear: Date;
  numberOfTrees: number;
};

const Purchases = ({ disabled }: {disabled: boolean}) => {
  const [purchaseList, setPurchaseList] = useState<Purchase[]>([]);

  const addPurchase = () => {
    const newIndex = purchaseList.length + 1;
    const newPurchase: Purchase = {
      index: newIndex,
      monthYear: new Date(),
      numberOfTrees: 0,
    };
    setPurchaseList([...purchaseList, newPurchase]);
  };

  const handleInputChange = (index: number, field: keyof Purchase, value: string | number | Date) => {
    const updatedPurchaseList = purchaseList.map((purchase) => {
      if (purchase.index === index) {
        return { ...purchase, [field]: value };
      }
      console.log(purchase);
      return purchase;
    });
    console.log(updatedPurchaseList);
    setPurchaseList(updatedPurchaseList);
  };

  const deletePurchase = (index: number) => {
    const updatedPurchaseList = purchaseList.filter((purchase) => purchase.index !== index);
    setPurchaseList(updatedPurchaseList);
  };

  return (
    <form className='h-full w-full space-y-2'>
      <Table className='mt-6 !h-[calc(100vh_-_30rem)] !w-[90%]'>
        <TableHead>
          <TableRow>
            <TableHeaderCell>#</TableHeaderCell>
            <TableHeaderCell>Month & Year</TableHeaderCell>
            <TableHeaderCell>Number of Trees</TableHeaderCell>
            <TableHeaderCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {!purchaseList.length && (
          <TableRow>
            <td colSpan={4}>No purchases yet.</td>
          </TableRow>
          )}
          {purchaseList.map((purchase) => (
            <TableRow key={purchase.index}>
              <TableCell>{purchase.index}</TableCell>
              <TableCell>
                <DatePicker
                  enableYearNavigation
                  displayFormat='MMM-yyyy'
                  minDate={new Date()}
                  value={purchase.monthYear}
                  onValueChange={(e) => handleInputChange(purchase.index, 'monthYear', e || new Date())}
                />
              </TableCell>
              <TableCell>
                <NumberInput
                  min={0}
                  height={5}
                  max={55}
                  value={purchase.numberOfTrees}
                  onChange={(e) => handleInputChange(purchase.index, 'numberOfTrees', parseInt(e.target.value, 10))}
                />
              </TableCell>
              <TableCell>
                <Icon icon={Trash} variant='shadow' tooltip='Delete purchase' onClick={() => deletePurchase(purchase.index)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Flex className='w-1/2 space-x-24' justifyContent='between' alignItems='center'>
        <Button isLoading={disabled} onPress={addPurchase} color='gradient' className='p-2'>Add Purchase</Button>
        <FormButton className='p-2'>
          Calculate
        </FormButton>
      </Flex>
    </form>
  );
};

export default Purchases;
