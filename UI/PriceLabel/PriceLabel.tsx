import { NumberFormatter, Text, TextProps } from '@mantine/core';
import { FunctionComponent } from 'react';

interface PriceLabelProps {
  fullPrice: number,
  priceWithDiscount?: number,
  classes?:{
    mainPrice?: string,
    oldPrice?: string,
  },
  fullPriceLabelProps?: TextProps,
  discountPriceLabelProps?: TextProps
}

const PriceLabel: FunctionComponent<PriceLabelProps> =
  ({ fullPrice, priceWithDiscount, classes, fullPriceLabelProps, discountPriceLabelProps }) => (
    <>
      {
        priceWithDiscount === undefined ?
        <Text className={classes?.mainPrice} {...fullPriceLabelProps}>
          <NumberFormatter
            value={fullPrice}
            decimalScale={2}
            suffix=" руб."
          />
        </Text>
        :
        <>
          <Text
            className={classes?.mainPrice}
            c="var(--mantine-color-discount)"
            {...discountPriceLabelProps}
          >
            <NumberFormatter
              value={priceWithDiscount}
              decimalScale={2}
              suffix=" руб"
            />
          </Text>
          <Text className={classes?.oldPrice} td="line-through" {...fullPriceLabelProps}>
            <NumberFormatter
              value={fullPrice}
              decimalScale={2}
              suffix=" руб."
            />
          </Text>
        </>
      }

    </>
   );

export default PriceLabel;
