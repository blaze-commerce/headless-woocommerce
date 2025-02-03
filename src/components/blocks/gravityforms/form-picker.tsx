import React from 'react';
import { ParsedBlock } from '@src/components/blocks';
import { BlockAttributes } from '@src/lib/block/types';
import { useGetForm } from '@src/modules/gravity-forms/utilities/gravity-forms';
import GravityForm from '@src/modules/gravity-forms/components/GravityForm';

type FormProps = {
  block: ParsedBlock;
};

export const FormPicker = ({ block }: FormProps) => {
  const attribute = block.attrs as BlockAttributes;

  const { loading, data: formData } = useGetForm(attribute.formId as string);

  if (!formData) {
    console.error('Could not get gravity form data', formData);
    return null;
  }

  if (loading) {
    return (
      <div className="group relative animate-pulse">
        <div className="w-1/6 min-h-80 bg-gray-300 rounded-sm overflow-hidden h-6"></div>
        <div className="mt-2.5 h-11 bg-gray-300 w-full rounded-sm"></div>
      </div>
    );
  }

  return <GravityForm form={formData.gravityFormsForm} />;
};
