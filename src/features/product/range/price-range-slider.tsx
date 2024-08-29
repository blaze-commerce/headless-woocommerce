import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SyntheticEvent, useState } from 'react';
import { useIsomorphicLayoutEffect } from 'usehooks-ts';

import { useSiteContext } from '@src/context/site-context';
import { isDollar } from '@src/lib/helpers/helper';
import { IFilterOptionData, IFilterOptionState } from '@src/lib/types/taxonomy';

type Props = {
  min?: number;
  max?: number;
  color?: string;
  height?: number;
  thumbBorderColor?: `#${string}`;
  disclosureProp: IFilterOptionState;
};

export const PriceRangeSlider: React.FC<Props> = ({
  min = 0,
  max = 5000,
  color = '#4A5468',
  height = 4,
  thumbBorderColor = '#fff',
  disclosureProp,
}) => {
  const { currentCurrency } = useSiteContext();
  const [, , price, setPrice] = disclosureProp;

  const priceValue = (price as IFilterOptionData)?.label.split('-');
  const priceValueMin = priceValue?.[0]?.match(/(\d+)/);
  const priceValueMax = priceValue?.[1]?.match(/(\d+)/);

  const [value, setValue] = useState<number[]>([
    +(priceValueMin as string[])?.[0] || min,
    +(priceValueMax as string[])?.[0] || max,
  ]);

  useIsomorphicLayoutEffect(() => {
    if (!price) setValue([min, max]);
  }, [max, min, price]);

  const handleChange = (
    _event: Event | SyntheticEvent<Element, Event>,
    newValue: number | number[]
  ) => {
    setValue(newValue as number[]);
  };

  const handleOnSliderChange = (
    _event: Event | SyntheticEvent<Element, Event>,
    newValue: number | number[]
  ) => {
    const minValue = (newValue as number[])[0];
    const maxValue = (newValue as number[])[1];
    setPrice(() => {
      return {
        label: `$${minValue} - $${maxValue}`,
        value: `price.${currentCurrency}:>=${minValue} && price.${currentCurrency}:<=${maxValue}`,
      };
    });
  };

  const handleMinInputChange = (minValue: number) => {
    setValue([minValue, value[1]]);

    setPrice(() => {
      return {
        label: `$${minValue} - $${value[1]}`,
        value: `price.${currentCurrency}:>=${minValue} && price.${currentCurrency}:<=${value[1]}`,
      };
    });
  };

  const handleMaxInputChange = (maxValue: number) => {
    setValue([value[0], maxValue]);

    setPrice(() => {
      return {
        label: `$${value[0]} - $${maxValue}`,
        value: `price.${currentCurrency}:>=${value[0]} && price.${currentCurrency}:<=${maxValue}`,
      };
    });
  };

  const theme = createTheme({
    components: {
      MuiSlider: {
        styleOverrides: {
          root: {
            color,
            height,
            width: '100%',
          },
          thumb: {
            height: 20,
            width: 20,
            backgroundColor: 'currentColor',
            borderWidth: '3px',
            borderStyle: 'solid',
            borderColor: thumbBorderColor,
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
          },
        },
      },
    },
  });

  return (
    <>
      <Box
        px={3}
        sx={{ width: '100%' }}
      >
        <ThemeProvider theme={theme}>
          <Slider
            min={min}
            max={max}
            value={value}
            onChange={handleChange}
            onChangeCommitted={handleOnSliderChange}
            valueLabelDisplay="auto"
          />
          <span className="text-[#303030]">
            {isDollar(currentCurrency) && '$'}
            {min} - {isDollar(currentCurrency) && '$'}
            {max}
          </span>
        </ThemeProvider>
      </Box>

      <Box
        mt={2}
        px={1}
        sx={{ width: '100%' }}
      >
        <Grid
          container
          spacing={2}
          alignItems="center"
        >
          <Grid
            item
            xs={5.5}
          >
            <input
              className="bg-[#F7F9FC] w-full h-11 p-3 border border-[#A0ABC0]"
              type="number"
              value={+(priceValueMin as string[])?.[0]}
              placeholder="Low"
              onChange={(e) =>
                handleMinInputChange(value[1] > +e.target.value ? +e.target.value : value[0])
              }
              min={min}
              max={max}
            />
          </Grid>
          <Grid
            item
            xs={1}
          >
            to
          </Grid>
          <Grid
            item
            xs={5.5}
          >
            <input
              className="bg-[#F7F9FC] w-full h-11 p-3 border border-[#A0ABC0]"
              type="number"
              value={+(priceValueMax as string[])?.[0]}
              placeholder="High"
              onChange={(e) =>
                handleMaxInputChange(value[0] < +e.target.value ? +e.target.value : value[0])
              }
              min={min}
              max={max}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
