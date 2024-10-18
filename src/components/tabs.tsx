import { Tab } from '@headlessui/react';
import cx from 'classnames';
import { findIndex } from 'lodash';

import { DialogItem } from '@src/features/product/product-dialogs';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';

export type AccordionItem = {
  title: string;
  key?: string;
  content?: string | React.ReactNode;
  isOpen?: boolean;
};

type Props = {
  data: AccordionItem[] | DialogItem[];
};

export const Tabs: React.FC<Props> = ({ data }) => {
  const activeTabIndex = findIndex(data, 'isOpen');
  return (
    <div>
      <Tab.Group defaultIndex={activeTabIndex}>
        <Tab.List className="flex p-1">
          {data.map((tab) => (
            <Tab
              key={`${tab.title}-tab`}
              id={`button-${tab.key}-tab`}
              className={({ selected }) =>
                cx('w-full py-2.5 text-sm leading-5 text-brand-font box-border border-b-4', {
                  'border-[--main-menu-background] font-medium': selected,
                })
              }
            >
              {tab.title}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {data.map((tab) => (
            <Tab.Panel
              key={`${tab.title}-panel`}
              className={cx(
                'tab-content rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 space-y-5'
              )}
            >
              {typeof tab.content === 'string' ? (
                <ReactHTMLParser html={tab.content as string} />
              ) : (
                tab.content
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
