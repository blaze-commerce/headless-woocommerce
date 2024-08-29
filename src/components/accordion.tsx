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
    <div>
      {data.map((tab, index) => (
        <Disclosure
          as="div"
          defaultOpen={tab.isOpen}
          className={cn('w-full', { 'border-t': index === 0 })}
          key={tab.title}
        >
          {({ open }) => (
            <>
              <h3>
                <Disclosure.Button
                  id={tab.title}
                  className={cn(
                    `group relative w-full py-5 flex justify-between items-center text-left ${titleClassname}`,
                    {
                      'border-b border-b-border-brand-second-gray': index !== data.length - 1,
                    }
                  )}
                >
                  <span
                    className={cn('text-black font-medium', {
                      uppercase: tabsCase === '2',
                    })}
                    style={tabTitleStyle}
                  >
                    {tab.title}
                  </span>
                  <span className="ml-6 flex items-center mr-1">
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
              </h3>
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
    </div>
  );
};
