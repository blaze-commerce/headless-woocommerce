import { gql } from '@apollo/client';
import siteData from '@public/site.json';

const BUNDLE_FRAGMENT = siteData.isBundleProductEnabled
  ? ` ... on BundleProduct {
        price(format: RAW)
        stockQuantity
      }`
  : '';

const CART_FIELDS = (currency?: string) => `
cart${currency ? `(currency: "${currency}")` : ''} {
    contents(first: 100) {
      nodes {
        ... on CartItem {
          extraData {
            key
            value
          }
        }
        key
        product {
          node {
            id
            productId: databaseId
            name
            description
            type
            onSale
            slug
            averageRating
            reviewCount
            link
            image {
              id
              sourceUrl
              srcSet
              altText
              title
            }
            galleryImages {
              nodes {
                id
                sourceUrl
                srcSet
                altText
                title
              }
            }
            sku
            ... on SimpleProduct {
              regularPrice
              price(format: RAW)
              stockQuantity
            }
            ${BUNDLE_FRAGMENT}
          }
        }
        variation {
          node {
            id
            variationId: databaseId
            name
            description
            type
            onSale
            price(format: RAW)
            regularPrice
            salePrice
            image {
              id
              sourceUrl
              srcSet
              altText
              title
            }
            sku
          }
          attributes {
            id
            name
            value
            label
          }
        }
        quantity
        total
        subtotal
        subtotalTax
      }
    }
    appliedCoupons {
      code
      description
      discountAmount(format: RAW)
      discountTax(format: RAW)
    }
    subtotal(format: RAW)
    subtotalTax(format: RAW)
    shippingTax(format: RAW)
    shippingTotal(format: RAW)
    total(format: RAW)
    totalTax(format: RAW)
    feeTax(format: RAW)
    feeTotal(format: RAW)
    discountTax(format: RAW)
    discountTotal(format: RAW)
    availableShippingMethods {
      packageDetails
      rates {
        cost
        id
        instanceId
        label
        methodId
        minAmount
      }
      supportsShippingCalculator
    }
    freeShippingMethods {
      cost
      id
      instanceId
      label
      methodId
      minAmount
    }
    chosenShippingMethods
  }
  allowedCountries
`;

const CART_FIELDS_COMPOSITE = (currency?: string) => `
cart${currency ? `(currency: "${currency}")` : ''} {
    contents(first: 100) {
      nodes {
        ... on CompositeCartItem {
          extraData {
            key
            value
          }
        }
        key
        product {
          node {
            id
            productId: databaseId
            name
            description
            type
            onSale
            slug
            link
            averageRating
            reviewCount
            image {
              id
              sourceUrl
              srcSet
              altText
              title
            }
            galleryImages {
              nodes {
                id
                sourceUrl
                srcSet
                altText
                title
              }
            }
            ... on SimpleProduct {
              price(format: RAW)
              stockQuantity
              sku
            }
            ... on CompositeProduct {
              price(format: RAW)
              stockQuantity
            }
          }
        }
        variation {
          node {
            id
            variationId: databaseId
            name
            description
            type
            onSale
            price
            regularPrice
            salePrice
            sku
            image {
              id
              sourceUrl
              srcSet
              altText
              title
            }
          }
          attributes {
            id
            name
            value
            label
          }
        }
        quantity
        total
        subtotal
        subtotalTax
      }
    }
    appliedCoupons {
      code
      description
      discountAmount(format: RAW)
      discountTax(format: RAW)
    }
    subtotal(format: RAW)
    subtotalTax(format: RAW)
    shippingTax(format: RAW)
    shippingTotal(format: RAW)
    total(format: RAW)
    totalTax(format: RAW)
    feeTax(format: RAW)
    feeTotal(format: RAW)
    discountTax(format: RAW)
    discountTotal(format: RAW)
    availableShippingMethods {
      packageDetails
      rates {
        cost
        id
        instanceId
        label
        methodId
        minAmount
      }
      supportsShippingCalculator
    }
    freeShippingMethods {
      cost
      id
      instanceId
      label
      methodId
      minAmount
    }
    chosenShippingMethods
  }
  allowedCountries
`;

export const GET_CART = (isComposite: boolean, currency: string) => gql`
query GET_CART {${isComposite ? CART_FIELDS_COMPOSITE(currency) : CART_FIELDS(currency)}}
`;

export const REMOVE_CART_ITEM = gql`
  mutation RemoveCartItem($cartKey: [ID]) {
    removeItemsFromCart(input: { keys: $cartKey }) {
      clientMutationId
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation addToCart($input: AddToCartInput!) {
    addToCart(input: $input) {
      cartItem {
        extraData {
          id
          key
          value
        }
        product {
          node {
            id
            sku
            name
            type
            slug
            image {
              altText
              id
              sourceUrl
            }
          }
        }
        quantity
        subtotal
        subtotalTax
        tax
        total
        totalRaw: total(format: RAW)
      }
    }
  }
`;

export const APPLY_COUPON = gql`
  mutation applyCoupon($input: ApplyCouponInput!) {
    applyCoupon(input: $input) {
      applied {
        code
        description
      }
    }
  }
`;

export const REMOVE_COUPONS = gql`
  mutation removeCoupons($input: RemoveCouponsInput!) {
    removeCoupons(input: $input) {
      cart {
        appliedCoupons {
          code
          description
          discountAmount(format: RAW)
          discountTax(format: RAW)
        }
      }
    }
  }
`;

export const UPDATE_SHIPPING_METHOD = gql`
  mutation updateShippingMethod($input: UpdateShippingMethodInput!) {
    updateShippingMethod(input: $input) {
      clientMutationId
      cart {
        chosenShippingMethods
        shippingTotal
        total
        subtotal
      }
    }
  }
`;

export const GET_ALLOWED_COUNTRY_STATES = gql`
  query GetAllowedCountryStates($country: CountriesEnum!) {
    allowedCountryStates(country: $country) {
      code
      name
    }
  }
`;

export const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomer($input: UpdateCustomerInput!) {
    updateCustomer(input: $input) {
      customer {
        shipping {
          country
          postcode
          state
        }
      }
    }
  }
`;

export const UPDATE_CART_ITEM_QUANTITY = gql`
  mutation UpdateCartItemQuantity($input: UpdateItemQuantitiesInput!) {
    updateItemQuantities(input: $input) {
      clientMutationId
    }
  }
`;

export const GET_COMPOSITE_PRODUCT = gql`
  query GetCompositeProduct($id: ID!) {
    product(idType: DATABASE_ID, id: $id) {
      ... on CompositeProduct {
        name
        components {
          componentId
          maxQuantity
          minQuantity
          slug
          title
          queryOptions {
            id
            name
            sku
            slug
            databaseId
            ... on SimpleProduct {
              stockStatus
            }
          }
          defaultOption {
            databaseId
          }
        }
      }
    }
  }
`;

export const ADD_COMPOSITE_TO_CART = gql`
  mutation AddCompositeToCart($input: AddCompositeToCartInput!) {
    addCompositeToCart(input: $input) {
      cartItem {
        product {
          node {
            name
          }
        }
      }
    }
  }
`;

export const ADD_TO_WISHLIST = gql`
  mutation AddProductToWishListMutation($productId: Int!) {
    addProductToWishList(input: { productId: $productId }) {
      added
      productId
      error
    }
  }
`;
