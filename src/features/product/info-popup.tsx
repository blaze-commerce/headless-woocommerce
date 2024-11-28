import { Dialog } from '@headlessui/react';
import { XCircleIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';
import WarningIcon from 'public/images/warning';
import { ShortcodeAttribute } from '@src/components/blocks/shortcode';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';

export const ProductInfoPopup = ({ attributes }: { attributes: ShortcodeAttribute[] }) => {
  const defaultAttributes: { [key: string]: string } = {
    button: 'Click Me',
    title: 'Title',
    content: 'Content',
    type: 'info',
  };

  attributes.forEach((attribute: ShortcodeAttribute) => {
    const name = String(attribute.name);
    if (name in defaultAttributes) {
      defaultAttributes[name] = String(attribute.value) ?? '';
    }
  });

  const { button, title, content, type } = defaultAttributes;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="product-popup-info">
      <button
        className="button-open"
        onClick={() => setIsOpen(true)}
      >
        {button}
      </button>
      <Dialog
        as="div"
        className="product-popup-holder bg-black/30"
        open={isOpen}
        onClose={setIsOpen}
      >
        <Dialog.Panel>
          <div className="product-popup-container">
            <div className="product-popup">
              <button
                type="button"
                className="button-close"
                onClick={() => setIsOpen(false)}
              >
                <XCircleIcon className="h-6 w-6" />
              </button>
              <Dialog.Title className="popup-title">{title}</Dialog.Title>
              <Dialog.Description
                as="div"
                className="popup-content-container"
              >
                {type === 'warning' && (
                  <div className="popup-icon">
                    <WarningIcon />
                  </div>
                )}
                <div className="popup-content">
                  <ReactHTMLParser html={content} />
                </div>
              </Dialog.Description>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};
