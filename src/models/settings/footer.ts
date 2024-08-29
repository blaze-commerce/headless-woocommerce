type Subscription = Partial<{
  button: Partial<{
    label: string;
  }>;
  termsAndConditions: Partial<{
    label: string;
    content: string;
  }>;
}>;

type CustomColors = Partial<{
  enabled: boolean;
  background: Partial<{
    primary?: string | null;
    tertiary?: string | null;
    secondary?: string | null;
  }>;
  link: Partial<{
    color: string | null;
    background: string | null;
    hoverColor: string | null;
    hoverBackground: string | null;
  }>;
}>;

export type Footer = Partial<{
  customColors: CustomColors;
  subscription: Subscription;
}>;
