import { useFetchTaxonomyItems } from '@src/lib/hooks/taxonomy';
import { getDefaultTsQueryVars, getProducts } from '@src/lib/typesense/taxonomy';
import { ITSBreadcrumbs, ITSTaxonomy, ITSTaxonomyProductQueryVars } from '@src/lib/typesense/types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react';

type SelectProps = {
  defaultLabel?: string;
  options: ITSTaxonomy[];
  state: [getter: string, setter: React.Dispatch<React.SetStateAction<string>>];
  name: string;
  onChange?: () => void;
};

export const getCarCategorySlugsFromBreadCrumbs = (crumbs: ITSBreadcrumbs[] | undefined) => {
  if (crumbs) {
    const lastBreadcrumb = crumbs[crumbs.length - 1] || '';
    if (lastBreadcrumb.permalink) {
      const permalink = lastBreadcrumb.permalink.replace('/product-category/', '');
      return permalink.split('/');
    }
  }
  return undefined;
};

const Select = ({ defaultLabel = '', options, state, name, onChange }: SelectProps) => {
  const [value, setValue] = state;
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
    if (onChange) onChange();
  };

  return (
    <select
      name={name}
      value={value}
      onChange={handleSelectChange}
      className="block w-full text-sm leading-5 border-0 rounded-sm py-2.5 px-3 text-[#6E6E6E] ring-1 ring-inset ring-[#CECECE] focus:ring-2 focus:ring-brand-primary"
    >
      <option value="">{defaultLabel}</option>
      {options.map((term) => {
        return (
          <option
            key={term.slug}
            value={term.slug}
          >
            {term.name}
          </option>
        );
      })}
    </select>
  );
};

const Loading = ({ show = false }: { show: boolean }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="absolute inset-0 bg-white/80 cursor-pointer flex justify-center items-center">
      <svg
        className="animate-spin flex-inline -ml-1 mr-3 w-11 h-11 text-brand-primary"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
};
export const CarFinder = ({ categorySlugs = [] }: { categorySlugs?: string[] }) => {
  const router = useRouter();

  const [defaultMake = '', defaultModel = '', defaultBody = '', defaultYear = ''] = categorySlugs;

  const { data: makeData, loading: fetchingMake } = useFetchTaxonomyItems('product_cat', '0');
  const [selectedMake, setSelectedMake] = useState(defaultMake);

  const [selectedModel, setSelectedModel] = useState(defaultModel);
  const { data: modelData, loading: fetchingModel } = useFetchTaxonomyItems(
    'product_cat',
    selectedMake
  );

  const [selectedBody, setSelectedBody] = useState(defaultBody);
  const { data: bodyData, loading: fetchingBody } = useFetchTaxonomyItems(
    'product_cat',
    selectedModel
  );

  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const { data: yearData, loading: fetchingYear } = useFetchTaxonomyItems(
    'product_cat',
    selectedBody
  );
  const [productLink, setProductLink] = useState('');

  const onMakeChange = () => {
    setSelectedModel('');
    setSelectedBody('');
    setSelectedYear('');
  };

  const onModelChange = () => {
    setSelectedBody('');
    setSelectedYear('');
  };

  const onBodyChange = () => {
    setSelectedYear('');
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const defaultQueryVars = getDefaultTsQueryVars();
      const taxonomyProductQueryVars: ITSTaxonomyProductQueryVars = {
        ...defaultQueryVars,
        termSlug: selectedYear,
        page: 1,
        perPage: 1,
      };

      const tsFetchedData = await getProducts(taxonomyProductQueryVars);

      if (tsFetchedData.products && tsFetchedData.products[0].permalink) {
        setProductLink(tsFetchedData.products[0].permalink);
      }
    };

    if (!selectedYear) {
      setProductLink('');
    }

    if (selectedYear) {
      fetchProduct();
    }
  }, [selectedYear]);

  const isLoading = fetchingMake || fetchingModel || fetchingBody || fetchingYear;

  return (
    <div className="search-car w-full space-y-4 relative">
      <Loading show={isLoading} />
      <Select
        defaultLabel="Select Make"
        options={makeData}
        state={[selectedMake, setSelectedMake]}
        onChange={onMakeChange}
        name="make-select"
      />
      <Select
        defaultLabel="Select Model"
        options={modelData}
        state={[selectedModel, setSelectedModel]}
        onChange={onModelChange}
        name="model-select"
      />

      <Select
        defaultLabel="Select Body"
        options={bodyData}
        state={[selectedBody, setSelectedBody]}
        onChange={onBodyChange}
        name="body-select"
      />
      <Select
        defaultLabel="Select Year"
        options={yearData}
        state={[selectedYear, setSelectedYear]}
        name="year-select"
      />
      <button
        type="button"
        className="w-full rounded-sm bg-brand-primary hover:bg-[#32B13B] px-2 py-2.5 text-white text-lg font-normal leading-7 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary disabled:bg-[#F7F7F7] disabled:text-[#6E6E6E]"
        disabled={productLink ? false : true}
        onClick={() => router.push(productLink)}
      >
        Search
      </button>
    </div>
  );
};
