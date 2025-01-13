import { Dialog, Transition } from '@headlessui/react';
import { decode } from 'html-entities';
import { Fragment, ReactNode, useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import dynamic from 'next/dynamic';

import { DynamicIconLoader } from '@src/components/dynamic-icon-loader';
import { Tabs } from '@src/components/tabs';
import { useProductContext } from '@src/context/product-context';
import { useSiteContext } from '@src/context/site-context';
import type { CalculateShippingProductParam } from '@src/types';
import type { DynamicIconLoaderProps } from '@src/components/dynamic-icon-loader';

const CalculateShipping = dynamic(() =>
  import('@src/features/product/calculate-shipping').then((mod) => mod.CalculateShipping)
);

import { ProductDialog } from '@src/models/product/types';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';

export type DialogItem = {
  content?: string | ReactNode;
  enabled: boolean;
  icon?: ReactNode;
  isOpen?: boolean;
  key: string;
  title: string;
  link?: string;
};

type TProp = {
  type?: 'horizontal' | 'vertical';
};

type Data = DialogItem[];

export const ProductDialogs = ({ type }: TProp) => {
  const { settings, calculateShipping } = useSiteContext();
  const {
    additionalData,
    product,
    state: { matchedVariant, quantity, selectedAttributes },
  } = useProductContext();

  const [open, setOpen] = useState(false);
  const [activeDialog, setActiveDialog] = useState<DialogItem>();

  const currentProduct: CalculateShippingProductParam = {
    id: product?.id as string,
    quantity,
  };

  if (product?.hasVariations && matchedVariant) {
    currentProduct.variation = {
      id: `${matchedVariant.id}`,
      ...selectedAttributes,
    };
  }

  const listData: Data = [];
  const tabData: Data = [];

  if (settings?.product?.features.calculateShipping.enabled) {
    const calculateList = {
      enabled: true,
      key: 'calculateShipping',
      title: 'Shipping',
      content: (
        <CalculateShipping
          products={[currentProduct]}
          showButton
          showRates
          title="Calculate Shipping"
        />
      ),
      icon: <DynamicIconLoader name="FiTruck" />,
    };
    listData.push(calculateList as DialogItem);
    tabData.push(calculateList as DialogItem);
  }

  if (additionalData?.dialogs) {
    additionalData.dialogs.map(function (dialog: ProductDialog, key: number) {
      if (!(dialog.content || dialog.link)) return;

      const data = {
        key: `list-data-${key}`,
        title: dialog.title,
        content: dialog.content,
        link: dialog.link,
        icon: <DynamicIconLoader name={dialog.icon as DynamicIconLoaderProps['name']} />,
      };

      listData.push(data as DialogItem);

      if (dialog.content) {
        tabData.push({
          ...data,
          enabled: true,
        });
      }
    });
  }

  const handleDialogOpen = (dataItem: DialogItem) => {
    setOpen(true);
    calculateShipping?.resetRates();
    setActiveDialog(dataItem);
  };

  const generateTabData = () => {
    return tabData.map((dialog) => ({
      ...dialog,
      isOpen: dialog.key === activeDialog?.key,
    }));
  };

  const dialogLinkStyle = {
    color: settings?.product?.font?.dialogs?.color,
  };

  const dialogLinkIconStyle = {
    color: settings?.product?.font?.dialogs?.color,
  };

  if (product?.metaData?.productLabel && settings?.isAdditionalWarningMessageEnabled) {
    dialogLinkIconStyle.color = 'red';
  }

  return (
    <>
      <div className={`product-dialogs ${type}`}>
        {listData.map((item) => (
          <a
            href={item.link ? item.link : '#'}
            key={item.key}
            id={`button-${item.key}`}
            onClick={(e) => {
              if (!item.link) {
                handleDialogOpen(item);
                e.preventDefault();
              }
            }}
            style={dialogLinkIconStyle}
          >
            {!!item.icon && item.icon}
            <span
              className="text-xs"
              style={dialogLinkStyle}
            >
              {item.title}
            </span>
          </a>
        ))}
      </div>
      {product?.metaData?.productLabel && settings?.isAdditionalWarningMessageEnabled && (
        <div className="additional-warning-message flex flex-row items-center space-x-3 border border-red-500 pl-1.5">
          <FaInfoCircle className="fill-red-500" />
          <ReactHTMLParser html={decode(product?.metaData?.productLabel as string)} />
        </div>
      )}

      {tabData.length > 0 && (
        <Transition.Root
          show={open}
          as={Fragment}
        >
          <Dialog
            as="div"
            className="offcanvas-dialog"
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="transition-element" />
            </Transition.Child>

            <div className="offcanvas-content-holder position-right">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="dialog-panel">
                  <div className="flex items-end justify-end">
                    <button
                      type="button"
                      className="button-offcanvas-close"
                      onClick={() => setOpen(false)}
                    >
                      <IoIosCloseCircleOutline
                        className="icon"
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  <div className="">
                    <div className="flow-root">
                      <Tabs data={generateTabData()} />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </>
  );
};

ProductDialogs.defaultProps = {
  type: 'horizontal',
};
