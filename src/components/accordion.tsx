import { Disclosure } from '@headlessui/react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

import { cn } from '@src/lib/helpers/helper';

export type AccordionItem = {
  location?: string;
  title: string;
  content: React.ReactNode;
  isOpen?: boolean;
};

type Props = {
  data: AccordionItem[];
  titleClassname?: string;
  contentClassname?: string;
  tabTitleStyle?: React.CSSProperties;
  tabsCase?: string;
};

export const Accordion: React.FC<Props> = ({
  data,
  tabTitleStyle,
  titleClassname,
  contentClassname,
  tabsCase,
}) => {
  return (
    <>
      {data.map((tab, index) => (
        <Disclosure
          as="div"
          defaultOpen={tab.isOpen}
          className={cn('accordion-holder')}
          key={tab.title}
        >
          {({ open }) => (
            <>
              <Disclosure.Button
                as="h3"
                id={tab.title}
                className={cn(`accordion-title ${titleClassname}`)}
              >
                <span
                  className={cn('', {
                    uppercase: tabsCase === '2',
                  })}
                  style={tabTitleStyle}
                >
                  {tab.title}
                </span>
                <span className="accordion-button">
                  {open ? (
                    <FiChevronUp
                      width="8"
                      height="8"
                    />
                  ) : (
                    <FiChevronDown
                      width="8"
                      height="8"
                    />
                  )}
                </span>
              </Disclosure.Button>
              <Disclosure.Panel
                as="div"
                className="w-full"
              >
                <div
                  className={`tab-content w-full border-b border-brand-second-gray py-6 tab-${tab.title.toLowerCase()} ${contentClassname}`}
                >
                  {tab.content}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </>
  );
};
