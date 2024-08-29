export type CustomColors = Partial<{
  enabled: boolean;
  backgroundColor: string;
  borderColor: string;
  color: string;
  iconColor: string;
}>;

type Font = Partial<{
  font: Partial<{
    size: string;
    weight: string;
    color: string;
  }>;
}>;

type Results = Partial<{
  categoryCount: string;
  productCount: string;
  showSku: boolean;
  showBlogPost: boolean;
  customColors: CustomColors;
  header: Font;
  texts: Font;
  price: Font;
  salePrice: Font;
  seeAll: Font;
}>;

type Input = Partial<{ transparent: boolean; customColors: CustomColors }>;

export type Search = {
  input: Input;
  results: Results;
};
