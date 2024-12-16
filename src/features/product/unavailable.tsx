import { CiWarning } from 'react-icons/ci';

export const UnavailableProduct = () => {
  return (
    <div className="product-unavailable-message">
      <CiWarning
        color="#FF8A00"
        size={16}
      />
      Sorry, no products matched your selection. Please choose a different combination.
    </div>
  );
};
