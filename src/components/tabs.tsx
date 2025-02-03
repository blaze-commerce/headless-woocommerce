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
    <>
      <Tab.Group defaultIndex={activeTabIndex}>
        <Tab.List className="tab-header">
          {data.map((tab) => (
            <Tab
              key={`${tab.title}-tab`}
              id={`button-${tab.key}-tab`}
              className={({ selected }) =>
                cx('tab-item', {
                  active: selected,
                })
              }
            >
              {tab.title}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="tab-panels">
          {data.map((tab) => (
            <Tab.Panel
              key={`${tab.title}-panel`}
              className={'tab-content'}
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
    </>
  );
};
