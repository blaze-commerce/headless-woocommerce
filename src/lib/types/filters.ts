export type CategoryFilterItems = {
  classes?: string;
  title: string;
  filterSlug?: string;
  enableDisclosure?: boolean;
};

export type CategoryFilterProps = {
  filters: CategoryFilterItems[];
  enableDisclosure?: boolean;
};
