import { TWidgetFilterProps } from './widget';

export type CategoryFilterItems = {
  classes?: string;
  title: string;
  filterSlug?: string;
} & TWidgetFilterProps;

export type CategoryFilterProps = {
  filters: CategoryFilterItems[];
} & TWidgetFilterProps;
