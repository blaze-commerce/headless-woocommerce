export type CategoryFilterItems = {
  classes?: string;
  title: string;
  filterSlug?: string;
};

export type CategoryFilterProps = {
  filters: CategoryFilterItems[];
};
