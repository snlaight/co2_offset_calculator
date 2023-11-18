/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useReducer, useEffect } from 'react';
import { Table, Icon, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, NumberInput, DatePicker, Flex } from '@tremor/react';
import { Trash, TreePine } from 'lucide-react';

import FormButton from '@/components/buttons/FormButton';
import Button from '@/components/buttons/Button';
import CalculationSummary from '@/components/sections/CalculationSummary';
import useCalculationStore from '@/utils/store/calculation.store';
import runSimulation, { type Purchase } from '@/utils/helpers/runSimulation';
// import { trpc } from '@/providers/trpcProvider';

type PurchaseAction = | { type: 'ADD_PURCHASE', payload: Purchase } | { type: 'UPDATE_PURCHASE', payload: { index: number, field: string, value: number } } | { type: 'DELETE_PURCHASE', payload: number } | {type: 'CALCULATE', payload: Purchase[], callback?:() => void} ;

const cleanPurchasesForSimulation = (purchases: Purchase[]) => {
  const cleanedPurchases = purchases.map((purchase) => ({
    year: purchase.year instanceof Date ? purchase.year : new Date(purchase.year),
    trees: purchase.trees,
  }));
  return cleanedPurchases;
};

const purchaseListReducer = (state: { purchases: Purchase[], result: number }, action: PurchaseAction) => {
  switch (action.type) {
    case 'ADD_PURCHASE':
      return { ...state, purchases: [...state.purchases, action.payload] };
    case 'UPDATE_PURCHASE':
      return { ...state,
        purchases: state.purchases.map((purchase: Purchase) => {
          if (purchase.index === action.payload.index) {
            return { ...purchase, [action.payload.field]: action.payload.value };
          }
          return purchase;
        }) };
    case 'DELETE_PURCHASE':
      return { ...state, purchases: state.purchases.filter((purchase: Purchase) => purchase.index !== action.payload) };
    case 'CALCULATE': {
      const cleanedPurchases = cleanPurchasesForSimulation(state.purchases);
      const result = runSimulation({
        purchases: cleanedPurchases,
        year: new Date(),
      });
      return { ...state, result };
    }
    default:
      return state;
  }
};

const Purchases = ({ disabled }: {disabled: boolean}) => {
  const [purchaseList, dispatch] = useReducer(purchaseListReducer, { purchases: [], result: 0 });
  const { setOffset, valueToOffset } = useCalculationStore();

  useEffect(() => {
    setOffset(valueToOffset, purchaseList.result);
  }, [purchaseList.result, setOffset, valueToOffset]);

  const addPurchase = () => {
    const newIndex = purchaseList.purchases.length + 1;
    const newPurchase: Purchase = {
      index: newIndex,
      year: new Date(),
      trees: 0,
    };
    dispatch({
      type: 'ADD_PURCHASE',
      payload: newPurchase,
    });
  };

  const handleInputChange = (index: number, field: string, value: number) => {
    dispatch({
      type: 'UPDATE_PURCHASE',
      payload: { index, field, value },
    });
  };

  const deletePurchase = (index: number) => {
    dispatch({
      type: 'DELETE_PURCHASE',
      payload: index,
    });
  };

  return (
    <>
      <form
        className='h-full w-full space-y-2'
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
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
            {!purchaseList.purchases.length && (
            <TableRow>
              <td colSpan={4}>No purchases yet.</td>
            </TableRow>
            )}
            {purchaseList.purchases.map((purchase) => (
              <TableRow key={purchase.index}>
                <TableCell>{purchase.index}</TableCell>
                <TableCell className='!py-1'>
                  <DatePicker
                    enableYearNavigation
                    displayFormat='MMM-yyyy'
                    minDate={new Date()}
                    value={purchase.year as Date}
                    // We use ts-ignore here as we are ok with it for this application, in a future version we will properly type this.
                    // @ts-ignore
                    onValueChange={(e) => handleInputChange(purchase.index as number, 'year', e || new Date() as unknown as Date)}
                  />
                </TableCell>
                <TableCell>
                  <NumberInput
                    icon={TreePine}
                    min={0}
                    height={5}
                    max={55}
                    error={purchase.trees > 55}
                    errorMessage='You can only purchase up to 55 trees per year.'
                    value={purchase.trees}
                    onChange={(e) => handleInputChange(purchase.index as number, 'trees', parseInt(e.target.value, 10))}
                  />
                </TableCell>
                <TableCell>
                  <Icon icon={Trash} variant='shadow' tooltip='Delete purchase' onClick={() => deletePurchase(purchase.index as number)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Flex className='w-1/2 space-x-24' justifyContent='between' alignItems='center'>
          <Button isLoading={disabled} onPress={addPurchase} color='gradient' className='p-2'>Add Purchase</Button>
          <FormButton
            className='p-2'
            onPress={() => {
              dispatch({
                type: 'CALCULATE',
                payload: purchaseList.purchases,
              });
            }}
            isDisabled={!purchaseList.purchases.length && disabled}
          >
            Calculate
          </FormButton>
        </Flex>
      </form>
      <CalculationSummary />
    </>
  );
};

export default Purchases;
