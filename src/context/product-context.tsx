import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { Dictionary } from '@reduxjs/toolkit';
import { cloneDeep, difference, isEmpty, pickBy, startsWith } from 'lodash';
import { useRouter } from 'next/router';
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useEffectOnce } from 'usehooks-ts';
import { v4 } from 'uuid';

import siteSettings from '@public/site.json';
import { useSiteContext } from '@src/context/site-context';
import { useAddToCartMutation } from '@src/lib/actions/add-to-cart';
import { ADD_COMPOSITE_TO_CART, GET_COMPOSITE_PRODUCT } from '@src/lib/graphql/queries';
import { track } from '@src/lib/track';
import { Product } from '@src/models/product';
import { ProductReviews } from '@src/models/product/reviews';
import { Image, ProductDialogs, ObjectData } from '@src/models/product/types';
import { CompositeProductComponent, SelectedCompositeComponent } from '@src/types';
import { GIFT_CARD_FORM_FIELD_KEYS } from '@src/lib/constants/giftcards';
import { useQuantity } from '@src/lib/hooks';
import { GiftCardInput } from '@src/lib/types/giftcards';

type ProductContextType = Partial<{
  product: Product;
  additionalData: {
    dialogs: ProductDialogs;
    attributeDisplayType: Dictionary<string>;
    review: Dictionary<string | boolean>;
    descriptionAfterContent?: string;
  };
  linkedProducts: {
    crossSellProducts: Product[];
    relatedProducts: Product[];
    upsellProducts: Product[];
  };
  customer: ProductReviews;
}> & {
  state: ProductState;
  actions: ProductActions;
  giftCards: ProductGiftCards;
  variation: ProductVariationImage;
  rating: ProductReviewsRating;
  bundle: ProductBundle;
  wooReviewImage: ProductWooReviewImages;
  fields: {
    required: [string[], Dispatch<SetStateAction<string[]>>];
    value: [ObjectData, Dispatch<SetStateAction<ObjectData>>];
  };
  addToCartStatus: [boolean, Dispatch<SetStateAction<boolean>>];
  outOfStockStatus: [boolean, Dispatch<SetStateAction<boolean>>];
};

type ProductWooReviewImages = {
  image: [boolean, Dispatch<SetStateAction<boolean>>];
  verified: [boolean, Dispatch<SetStateAction<boolean>>];
};

type ProductReviewsRating = {
  review: [string, Dispatch<SetStateAction<string>>];
};

type ProductBundle = {
  selected: [ObjectData, Dispatch<SetStateAction<ObjectData>>];
};

type ProductVariationImage = {
  image: [Image, Dispatch<SetStateAction<Image>>];
};

type ProductState = {
  quantity: number;
  addToCart: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    response: any;
    loading: boolean;
    error?: ApolloError;
  };
  selectedAttributes: Dictionary<string>;
  matchedVariant?: Product | false;
  compositeComponents?: CompositeProductComponent[];
  selectedCompositeComponents: SelectedCompositeComponent;
  hasLoaded: boolean;
};

type ProductActions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addToCart: () => Promise<any>;
  decrementQuantity: () => void;
  incrementQuantity: () => void;
  onQuantityChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  validateQuantity: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  onGiftCardQuantityChange: (_value: number) => void;
  // eslint-disable-next-line no-unused-vars
  onAttributeSelect: (attribute: string, value: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loadCompositeComponents: () => void;
  handleAddCompositeToCart: () => void;
  setHasLoaded: () => void;
  handleOnCompositeComponentSelect: (
    _componentId: number,
    _paroductId: number,
    _quantity: number
  ) => void;
};

type ProductGiftCards = {
  state: [GiftCardInput, Dispatch<SetStateAction<GiftCardInput>>];
  validation: [boolean, Dispatch<SetStateAction<boolean>>];
  emailValidation: [boolean, Dispatch<SetStateAction<boolean>>];
  productId: [number, Dispatch<SetStateAction<number>>];
};

const initialState: ProductState = {
  quantity: 1,
  addToCart: {
    response: undefined,
    loading: false,
    error: undefined,
  },
  selectedAttributes: {},
  compositeComponents: undefined,
  selectedCompositeComponents: {},
  hasLoaded: false,
};

export const ProductContext = createContext<ProductContextType>({
  state: initialState,
  actions: {
    addToCart: () => Promise.resolve(),
    decrementQuantity: () => {},
    incrementQuantity: () => {},
    onAttributeSelect: () => {},
    onQuantityChange: () => {},
    validateQuantity: () => {},
    onGiftCardQuantityChange: () => {},
    loadCompositeComponents: () => {},
    handleAddCompositeToCart: () => {},
    handleOnCompositeComponentSelect: () => {},
    setHasLoaded: () => {},
  },
  giftCards: {
    state: [{}, () => {}],
    validation: [false, () => {}],
    emailValidation: [false, () => {}],
    productId: [0, () => {}],
  },
  variation: {
    image: [{ src: '' }, () => {}],
  },

  rating: {
    review: ['', () => {}],
  },
  wooReviewImage: {
    image: [false, () => {}],
    verified: [false, () => {}],
  },
  bundle: {
    selected: [{}, () => {}],
  },
  fields: {
    required: [[], () => {}],
    value: [{}, () => {}],
  },
  addToCartStatus: [false, () => {}],
  outOfStockStatus: [false, () => {}],
});

export const ProductContextProvider: React.FC<{
  children: React.ReactNode;
  product: Product;
  additionalData: {
    dialogs: ProductDialogs;
    attributeDisplayType: Dictionary<string>;
    review: Dictionary<string | boolean>;
    descriptionAfterContent?: string;
  };
  linkedProducts: {
    crossSellProducts: Product[];
    relatedProducts: Product[];
    upsellProducts: Product[];
  };
  customer: ProductReviews;
}> = ({ children, product, additionalData, linkedProducts, customer }) => {
  const { currentCurrency } = useSiteContext();
  const [selectedAttributes, setSelectedAttributes] = useState<{ [key: string]: string }>({});
  const [matchedVariant, setMatchedVariant] = useState<Product | undefined | false>(undefined);
  const [compositeComponents, setCompositeComponents] = useState<CompositeProductComponent[]>();
  const [selectedCompositeComponents, setSelectedCompositeComponents] =
    useState<SelectedCompositeComponent>({});
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [imageThumbnailAttribute, setImageThumbnailAttribute] = useState<Image>({} as Image);

  const [giftCardInput, setGiftCardInput] = useState<GiftCardInput>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedReviewsWithImage, setSelectedReviewsWithImage] = useState<boolean>(false);
  const [selectedVerifiedReviews, setSelectedVerifiedReviews] = useState<boolean>(false);
  const [selectedBundle, setSelectedBundle] = useState<ObjectData>({});
  const [requiredFields, setRequiredFields] = useState<string[]>([]);
  const [fieldsValue, setFieldsValue] = useState<ObjectData>({});
  const [disableAddToCart, setDisableAddToCart] = useState(!product.purchasable);
  const [outOfStockStatus, setOutOfStockStatus] = useState(false);
  const [giftProductId, setGiftProductId] = useState<number>(0);

  const router = useRouter();

  useEffectOnce(() => {
    const dontTriggerViewItem = router.isFallback;
    if (!dontTriggerViewItem) {
      track.viewItem(product);
    }
  });

  const findVariationByAttribute = (attributes: { [key: string]: string } | undefined) => {
    if (typeof attributes === 'undefined') {
      return undefined;
    }

    const variation = product.variations?.find((variation) =>
      Object.keys(attributes).every((key) => {
        const variationAttr = JSON.parse(JSON.stringify(variation.attributes));

        return (
          variation.attributes &&
          typeof variationAttr === 'object' &&
          key in variationAttr &&
          (variationAttr[key] === attributes[key] || variationAttr[key] === '')
        );
      })
    );
    return variation;
  };

  // disable add to cart if product is out of stock ( includes bundle or addons )
  // @TODO need to refactor this because this should be in the product class checking if the product is purchasable or not
  useEffect(() => {
    if (outOfStockStatus) {
      setDisableAddToCart(true);
    }
  }, [outOfStockStatus]);

  const onAttributeSelect = (attribute: string, value: string) => {
    const newAttributes = {
      ...selectedAttributes,
      [attribute]: value,
    };

    if (value === '') {
      delete newAttributes[attribute];
    }

    setSelectedAttributes(newAttributes);

    const missingFields = difference(product.requiredAttributes, Object.keys(newAttributes));
    if (missingFields.length > 0) {
      setMatchedVariant(undefined);
      return;
    }
    const matchedVariant = findVariationByAttribute(newAttributes);

    if (typeof matchedVariant === 'undefined' || !matchedVariant.purchasable) {
      // Disable add to cart since there is no matching variant found.
      setMatchedVariant(false);
      setDisableAddToCart(true);

      return;
    }

    setMatchedVariant(matchedVariant);

    if (matchedVariant && matchedVariant.purchasable) {
      let allowAddToCart = true;
      if (matchedVariant.currencyPrice(currentCurrency) <= 0) {
        allowAddToCart = false;
      }
      setDisableAddToCart(!allowAddToCart);
    } else {
      setDisableAddToCart(true);
    }
  };

  const {
    fetchCart,
    miniCartState: [, setMiniCartOpen],
  } = useSiteContext();

  const {
    value: quantity,
    decrement: decrementQuantity,
    increment: incrementQuantity,
    onChange: onQuantityChange,
    onBlur: validateQuantity,
    onGiftCardChange: onGiftCardQuantityChange,
    reset: resetQuantity,
  } = useQuantity({ max: product?.maxQuantity });

  const getAddToCartQueryVariables = () => {
    if (!product.id) return {};

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const inputVariables: any = {
      clientMutationId: v4(), // Generate a unique id.
      productId: parseInt(product.id, 10),
      quantity,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const extraData: any = {};

    if ((product.hasVariations || product.isGiftCard) && matchedVariant && matchedVariant.id) {
      inputVariables.variationId = parseInt(matchedVariant.id);

      if (Object.keys(selectedAttributes).length > 0) {
        inputVariables.variation = [];
        Object.keys(selectedAttributes).forEach((key) => {
          inputVariables.variation.push({
            attributeName: key.replace('attribute_', ''),
            attributeValue: selectedAttributes[key],
          });
        });
      }
    }

    // bundle product
    if (product.hasBundle) {
      extraData.woolessGraphqlRequest = pickBy(fieldsValue, (_obj, key) =>
        startsWith(key, 'bundle')
      );
    }

    // gift card product
    if (product.isGiftCard) {
      inputVariables.variationId = giftProductId;

      if (!isEmpty(giftCardInput)) {
        for (const inputKey in giftCardInput) {
          extraData[GIFT_CARD_FORM_FIELD_KEYS[inputKey]] = giftCardInput[inputKey];
        }
      }
    }

    if (product.hasAddons()) {
      extraData.graphqlAddons = pickBy(fieldsValue, (_obj, key) => startsWith(key, 'addon'));
    }

    inputVariables.extraData = JSON.stringify(extraData);

    return inputVariables;
  };

  /**
   * Adding product to cart
   * Original and should be used is ADD_TO_CART
   */
  const [addToCart, { data: addToCartRes, loading: addToCartLoading, error: addToCartError }] =
    useAddToCartMutation({
      variables: {
        input: getAddToCartQueryVariables(),
      },
      onCompleted: () => {
        fetchCart();
        setMiniCartOpen((prev) => !prev);
        resetQuantity();
      },
    });

  const { refetch: fetchCompositeProduct } = useQuery(GET_COMPOSITE_PRODUCT, {
    onCompleted: (data) => {
      setCompositeComponents(data.product.components);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const selected = data.product.components.reduce((carry: any, item: any) => {
        carry[item.componentId] = {
          componentId: item.componentId,
          productId: item.defaultOption.databaseId,
          quantity: 1,
        };
        return carry;
      }, {});

      setSelectedCompositeComponents(selected);
    },
    skip: false === siteSettings.product.usingCompositeProduct,
  });

  const [addCompositeToCart, { loading: compositeAddToCartLoading }] = useMutation(
    ADD_COMPOSITE_TO_CART,
    {
      onCompleted: (data) => {
        if (data.addCompositeToCart?.cartItem?.product) {
          // On Success:
          // 1. Make the GET_CART query to update the cart with new values in React context.
          fetchCart();

          // 2. Show View Cart Button
          setMiniCartOpen((prev) => !prev);

          // 3. Reset the product state
          // resetProductContextState();
        }
      },
      onError: (error) => {
        if (error) {
          // eslint-disable-next-line no-console
          console.log(error?.graphQLErrors?.[0]?.message ?? '');
        }
      },
    }
  );

  const loadCompositeComponents = async () => {
    if (siteSettings.product.usingCompositeProduct) {
      await fetchCompositeProduct({
        id: product.id,
      });
    }
  };

  const handleAddCompositeToCart = async () => {
    await addCompositeToCart({
      variables: {
        input: {
          productId: parseInt(product?.id || ''),
          configuration: Object.values(selectedCompositeComponents),
          quantity,
        },
      },
    });
  };

  const handleOnCompositeComponentSelect = (
    componentId: number,
    productId: number,
    quantity = 1
  ) => {
    const newObject = cloneDeep(selectedCompositeComponents);
    newObject[componentId] = {
      componentId,
      productId,
      quantity,
    };

    setSelectedCompositeComponents(newObject);
  };

  return (
    <ProductContext.Provider
      value={{
        product,
        additionalData,
        linkedProducts,
        customer,
        state: {
          quantity,
          addToCart: {
            response: addToCartRes,
            loading: addToCartLoading || compositeAddToCartLoading,
            error: addToCartError,
          },
          selectedAttributes,
          matchedVariant,
          compositeComponents,
          selectedCompositeComponents,
          hasLoaded,
        },
        actions: {
          addToCart,
          // TODO: add validateAddToCartForm
          decrementQuantity,
          incrementQuantity,
          onAttributeSelect,
          onQuantityChange,
          validateQuantity,
          onGiftCardQuantityChange,
          loadCompositeComponents,
          handleAddCompositeToCart,
          handleOnCompositeComponentSelect,
          setHasLoaded: () => setHasLoaded(true),
        },
        giftCards: {
          state: [giftCardInput, setGiftCardInput],
          validation: [isFormValid, setIsFormValid],
          emailValidation: [isEmailValid, setIsEmailValid],
          productId: [giftProductId, setGiftProductId],
        },
        variation: {
          image: [imageThumbnailAttribute, setImageThumbnailAttribute],
        },
        rating: {
          review: [selectedRating, setSelectedRating],
        },
        wooReviewImage: {
          image: [selectedReviewsWithImage, setSelectedReviewsWithImage],
          verified: [selectedVerifiedReviews, setSelectedVerifiedReviews],
        },
        bundle: {
          selected: [selectedBundle, setSelectedBundle],
        },
        fields: {
          required: [requiredFields, setRequiredFields],
          value: [fieldsValue, setFieldsValue],
        },
        addToCartStatus: [disableAddToCart, setDisableAddToCart],
        outOfStockStatus: [outOfStockStatus, setOutOfStockStatus],
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
