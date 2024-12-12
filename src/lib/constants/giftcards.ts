import { GiftCardInput } from '@src/lib/types/giftcards';

export const GIFT_CARD_TYPE = 'pw-gift-card';
export const GIFT_CARD_FORM_FIELD_KEYS: GiftCardInput = {
  'giftcard-to-field': 'pw_gift_card_to',
  'giftcard-recipient-field': 'pw_gift_card_recipient_name',
  'giftcard-from-field': 'pw_gift_card_from',
  'giftcard-message-field': 'pw_gift_card_message',
  'giftcard-delivery-date-field': 'pw_gift_card_delivery_date',
  'giftcard-email-design-field': 'pw_gift_card_email_design_id',
  'giftcard-custom-amount-field': 'pw_gift_cards_custom_amount',
  'giftcard-amount-option': 'attribute_gift-card-amount',
};
