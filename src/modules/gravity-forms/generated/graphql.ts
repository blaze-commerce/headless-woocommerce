export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** Gravity Forms Address field. */
export type AddressField = FormField & {
  __typename?: 'AddressField';
  /** Determines the type of address to be displayed. */
  addressType?: Maybe<AddressTypeEnum>;
  /** Address field value. */
  addressValues?: Maybe<AddressValueProperty>;
  /** When specified, the value of this property will be used on the admin pages instead of the label. It is useful for fields with long labels. */
  adminLabel?: Maybe<Scalars['String']>;
  /** Determines if this field should only visible on the administration pages. A value of 1 will mark the field as admin only and will hide it from the public form. Useful for fields such as “status” that help with managing entries, but don’t apply to users filling out the form. */
  adminOnly?: Maybe<Scalars['Boolean']>;
  /** Determines if the field’s value can be pre-populated dynamically. 1 to allow field to be pre-populated, 0 otherwise. */
  allowsPrepopulate?: Maybe<Scalars['Boolean']>;
  /** Controls the visibility of the field based on values selected by the user. */
  conditionalLogic?: Maybe<ConditionalLogic>;
  /** Determines whether the option to copy values is turned on or off by default. */
  copyValuesOptionDefault?: Maybe<Scalars['Boolean']>;
  /** The field id of the field being used as the copy source. */
  copyValuesOptionField?: Maybe<Scalars['Int']>;
  /** String containing the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields. */
  cssClass?: Maybe<Scalars['String']>;
  /**
   * Array of the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields.
   * @deprecated Please use `cssClass` instead.
   */
  cssClassList?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Contains the country that will be selected by default. Only applicable when &quot;addressType&quot; is set to &quot;INTERATIONAL&quot;. */
  defaultCountry?: Maybe<Scalars['String']>;
  /** Contains the province that will be selected by default. Only applicable when &quot;addressType&quot; is set to &quot;CANADA&quot;. */
  defaultProvince?: Maybe<Scalars['String']>;
  /** Contains the state that will be selected by default. Only applicable when &quot;addressType&quot; is set to &quot;US&quot;. */
  defaultState?: Maybe<Scalars['String']>;
  /** Field description. */
  description?: Maybe<Scalars['String']>;
  /** The placement of the field description. */
  descriptionPlacement?: Maybe<DescriptionPlacementPropertyEnum>;
  /** Indicates whether the copy values option can be used. This option allows users to skip filling out the field and use the same values as another. For example, if the mailing and billing address are the same. */
  enableCopyValuesOption?: Maybe<Scalars['Boolean']>;
  /** Contains the message that is displayed for fields that fail validation. */
  errorMessage?: Maybe<Scalars['String']>;
  /** The ID of the form this field belongs to. */
  formId: Scalars['Int'];
  /** Field ID. */
  id: Scalars['Int'];
  /**
   * Assigns a name to this field so that it can be populated dynamically via this input name. Only applicable when allowsPrepopulate is set to 1.
   * @deprecated This property is not associated with the Gravity Forms AddressField type. Please use `inputs { name }` instead.
   */
  inputName?: Maybe<Scalars['String']>;
  /** An array containing the the individual properties for each element of the address field. */
  inputs?: Maybe<Array<Maybe<AddressInputProperty>>>;
  /** Determines if the field requires the user to enter a value. 1 marks the field as required, 0 marks the field as not required. Fields marked as required will prevent the form from being submitted if the user has not entered a value in it. */
  isRequired?: Maybe<Scalars['Boolean']>;
  /** Field label that will be displayed on the form and on the admin pages. */
  label?: Maybe<Scalars['String']>;
  /** The field label position. */
  labelPlacement?: Maybe<LabelPlacementPropertyEnum>;
  /** Determines the size of the field when displayed on the page. */
  size?: Maybe<SizePropertyEnum>;
  /** The placement of the labels for the subfields within the group. This setting controls all of the subfields, they cannot be set individually. They may be aligned above or below the inputs. If this property is not set, the “Sub-Label Placement” setting on the Form Settings-&gt;Form Layout page is used. If no setting is specified, the default is above inputs. */
  subLabelPlacement?: Maybe<Scalars['String']>;
  /** The type of field to be displayed. */
  type: Scalars['String'];
  /** Field visibility. */
  visibility?: Maybe<VisibilityPropertyEnum>;
};

/** Gravity Forms address field values. */
export type AddressFieldValue = {
  __typename?: 'AddressFieldValue';
  /** City. */
  city?: Maybe<Scalars['String']>;
  /** Country. */
  country?: Maybe<Scalars['String']>;
  /** Address line two. */
  lineTwo?: Maybe<Scalars['String']>;
  /** State / province. */
  state?: Maybe<Scalars['String']>;
  /** Street address. */
  street?: Maybe<Scalars['String']>;
  /** ZIP / postal code. */
  zip?: Maybe<Scalars['String']>;
};

/** Input fields for address field. */
export type AddressInput = {
  /** Address city. */
  city?: Maybe<Scalars['String']>;
  /** Address country name. */
  country?: Maybe<Scalars['String']>;
  /** Address line two. */
  lineTwo?: Maybe<Scalars['String']>;
  /** Address state/region/province name. */
  state?: Maybe<Scalars['String']>;
  /** Street address. */
  street?: Maybe<Scalars['String']>;
  /** Address zip code */
  zip?: Maybe<Scalars['String']>;
};

/** An array containing the the individual properties for each element of the address field. */
export type AddressInputProperty = {
  __typename?: 'AddressInputProperty';
  /** The custom label for the input. When set, this is used in place of the label. */
  customLabel?: Maybe<Scalars['String']>;
  /** The default value to be displayed/chosen in the input field. */
  defaultValue?: Maybe<Scalars['String']>;
  /** The input ID. Input IDs follow the following naming convention: FIELDID.INPUTID (i.e. 5.1), where FIELDID is the id of the containing field and INPUTID specifies the input field. */
  id?: Maybe<Scalars['Float']>;
  /** Whether or not this field should be hidden. */
  isHidden?: Maybe<Scalars['Boolean']>;
  /** Key used to identify this input. */
  key?: Maybe<Scalars['String']>;
  /** Input label. */
  label?: Maybe<Scalars['String']>;
  /** When the field is configured with allowsPrepopulate set to 1, this property contains the parameter name to be used to populate this field (equivalent to the inputName property of single-input fields). */
  name?: Maybe<Scalars['String']>;
  /** Placeholder text to give the user a hint on how to fill out the field. This is not submitted with the form. */
  placeholder?: Maybe<Scalars['String']>;
};

/** Determines the type of address to be displayed. */
export enum AddressTypeEnum {
  /** Canada address type */
  Canada = 'CANADA',
  /** International address type. */
  International = 'INTERNATIONAL',
  /** United States address type. */
  Us = 'US',
}

/** The individual properties for each element of the address value field. */
export type AddressValueProperty = {
  __typename?: 'AddressValueProperty';
  /** Address city. */
  city?: Maybe<Scalars['String']>;
  /** Address country name. */
  country?: Maybe<Scalars['String']>;
  /** Address line two. */
  lineTwo?: Maybe<Scalars['String']>;
  /** Address state/region/province name. */
  state?: Maybe<Scalars['String']>;
  /** Street address. */
  street?: Maybe<Scalars['String']>;
  /** Address zip code */
  zip?: Maybe<Scalars['String']>;
};

/** Avatars are profile images for users. WordPress by default uses the Gravatar service to host and fetch avatars from. */
export type Avatar = {
  __typename?: 'Avatar';
  /** URL for the default image or a default type. Accepts &#039;404&#039; (return a 404 instead of a default image), &#039;retro&#039; (8bit), &#039;monsterid&#039; (monster), &#039;wavatar&#039; (cartoon face), &#039;indenticon&#039; (the &#039;quilt&#039;), &#039;mystery&#039;, &#039;mm&#039;, or &#039;mysteryman&#039; (The Oyster Man), &#039;blank&#039; (transparent GIF), or &#039;gravatar_default&#039; (the Gravatar logo). */
  default?: Maybe<Scalars['String']>;
  /** HTML attributes to insert in the IMG element. Is not sanitized. */
  extraAttr?: Maybe<Scalars['String']>;
  /** Whether to always show the default image, never the Gravatar. */
  forceDefault?: Maybe<Scalars['Boolean']>;
  /** Whether the avatar was successfully found. */
  foundAvatar?: Maybe<Scalars['Boolean']>;
  /** Height of the avatar image. */
  height?: Maybe<Scalars['Int']>;
  /** Whether the object is restricted from the current viewer */
  isRestricted?: Maybe<Scalars['Boolean']>;
  /** What rating to display avatars up to. Accepts &#039;G&#039;, &#039;PG&#039;, &#039;R&#039;, &#039;X&#039;, and are judged in that order. */
  rating?: Maybe<Scalars['String']>;
  /** Type of url scheme to use. Typically HTTP vs. HTTPS. */
  scheme?: Maybe<Scalars['String']>;
  /** The size of the avatar in pixels. A value of 96 will match a 96px x 96px gravatar image. */
  size?: Maybe<Scalars['Int']>;
  /** URL for the gravatar image source. */
  url?: Maybe<Scalars['String']>;
  /** Width of the avatar image. */
  width?: Maybe<Scalars['Int']>;
};

/** What rating to display avatars up to. Accepts 'G', 'PG', 'R', 'X', and are judged in that order. Default is the value of the 'avatar_rating' option */
export enum AvatarRatingEnum {
  /** Indicates a G level avatar rating level. */
  G = 'G',
  /** Indicates a PG level avatar rating level. */
  Pg = 'PG',
  /** Indicates an R level avatar rating level. */
  R = 'R',
  /** Indicates an X level avatar rating level. */
  X = 'X',
}

/** Gravity Forms button. */
export type Button = {
  __typename?: 'Button';
  /** Controls when the form button should be visible based on values selected on the form. */
  conditionalLogic?: Maybe<ConditionalLogic>;
  /** Contains the URL for the image button. Only applicable when type is set to image. */
  imageUrl?: Maybe<Scalars['String']>;
  /** Contains the button text. Only applicable when type is set to text. */
  text?: Maybe<Scalars['String']>;
  /** Specifies the type of button to be displayed. Defaults to TEXT. */
  type?: Maybe<ButtonTypeEnum>;
};

/** Type of button to be displayed. Default is TEXT. */
export enum ButtonTypeEnum {
  /** Image button. */
  Image = 'IMAGE',
  /** Text button (default). */
  Text = 'TEXT',
}

/** How the date field displays its calendar icon. */
export enum CalendarIconTypeEnum {
  /** Default calendar icon. */
  Calendar = 'CALENDAR',
  /** Custom calendar icon. */
  Custom = 'CUSTOM',
  /** No calendar icon. */
  None = 'NONE',
}

/** Gravity Forms CAPTCHA field. */
export type CaptchaField = FormField & {
  __typename?: 'CaptchaField';
  /**
   * When specified, the value of this property will be used on the admin pages instead of the label. It is useful for fields with long labels.
   * @deprecated This property is not associated with the Gravity Forms CaptchaField type.
   */
  adminLabel?: Maybe<Scalars['String']>;
  /**
   * Determines if this field should only visible on the administration pages. A value of 1 will mark the field as admin only and will hide it from the public form. Useful for fields such as “status” that help with managing entries, but don’t apply to users filling out the form.
   * @deprecated This property is not associated with the Gravity Forms CaptchaField type.
   */
  adminOnly?: Maybe<Scalars['Boolean']>;
  /**
   * Determines if the field’s value can be pre-populated dynamically. 1 to allow field to be pre-populated, 0 otherwise.
   * @deprecated This property is not associated with the Gravity Forms CaptchaField type.
   */
  allowsPrepopulate?: Maybe<Scalars['Boolean']>;
  /** The language used when the captcha is displayed. This property is available when the captchaType is “captcha”, the default. The possible values are the language codes used by WordPress. */
  captchaLanguage?: Maybe<Scalars['String']>;
  /** Determines the theme to be used for the reCAPTCHA field. Only applicable to the recaptcha captcha type. */
  captchaTheme?: Maybe<CaptchaThemeEnum>;
  /** Determines the type of CAPTCHA field to be used. */
  captchaType?: Maybe<CaptchaTypeEnum>;
  /** Controls the visibility of the field based on values selected by the user. */
  conditionalLogic?: Maybe<ConditionalLogic>;
  /** String containing the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields. */
  cssClass?: Maybe<Scalars['String']>;
  /**
   * Array of the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields.
   * @deprecated Please use `cssClass` instead.
   */
  cssClassList?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Field description. */
  description?: Maybe<Scalars['String']>;
  /** The placement of the field description. */
  descriptionPlacement?: Maybe<DescriptionPlacementPropertyEnum>;
  /** Contains the message that is displayed for fields that fail validation. */
  errorMessage?: Maybe<Scalars['String']>;
  /** The ID of the form this field belongs to. */
  formId: Scalars['Int'];
  /** Field ID. */
  id: Scalars['Int'];
  /** Field label that will be displayed on the form and on the admin pages. */
  label?: Maybe<Scalars['String']>;
  /** Determines the image’s background color, in HEX format (i.e. #CCCCCC). Only applicable to simple_captcha and math captcha types. */
  simpleCaptchaBackgroundColor?: Maybe<Scalars['String']>;
  /** Determines the image’s font color, in HEX format (i.e. #CCCCCC). Only applicable to simple_captcha and math captcha types. */
  simpleCaptchaFontColor?: Maybe<Scalars['String']>;
  /** Determines the CAPTCHA image size. Only applicable to simple_captcha and math captcha types. */
  simpleCaptchaSize?: Maybe<SizePropertyEnum>;
  /** Determines the size of the field when displayed on the page. */
  size?: Maybe<SizePropertyEnum>;
  /** The type of field to be displayed. */
  type: Scalars['String'];
  /**
   * Field visibility.
   * @deprecated This property is not associated with the Gravity Forms CaptchaField type.
   */
  visibility?: Maybe<VisibilityPropertyEnum>;
};

/** The theme to be used for the reCAPTCHA field. */
export enum CaptchaThemeEnum {
  /** Black glass reCAPTCHA theme. */
  Blackglass = 'BLACKGLASS',
  /** Clean reCAPTCHA theme. */
  Clean = 'CLEAN',
  /** Red reCAPTCHA theme. */
  Red = 'RED',
  /** White reCAPTCHA theme. */
  White = 'WHITE',
}

/** Type of CAPTCHA field to be used. */
export enum CaptchaTypeEnum {
  /** Math CAPTCHA type. */
  Math = 'MATH',
  /** reCAPTCHA type. */
  Recaptcha = 'RECAPTCHA',
  /** Simple CAPTCHA type. */
  Simple = 'SIMPLE',
}

/** The category type */
export type Category = Node &
  TermNode &
  DatabaseIdentifier &
  UniformResourceIdentifiable &
  HierarchicalTermNode &
  MenuItemLinkable & {
    __typename?: 'Category';
    /** The ancestors of the node. Default ordered as lowest (closest to the child) to highest (closest to the root). */
    ancestors?: Maybe<CategoryToAncestorsCategoryConnection>;
    /**
     * The id field matches the WP_Post-&gt;ID field.
     * @deprecated Deprecated in favor of databaseId
     */
    categoryId?: Maybe<Scalars['Int']>;
    /** Connection between the category type and the category type */
    children?: Maybe<CategoryToCategoryConnection>;
    /** Connection between the category type and the ContentNode type */
    contentNodes?: Maybe<CategoryToContentNodeConnection>;
    /** The number of objects connected to the object */
    count?: Maybe<Scalars['Int']>;
    /** Identifies the primary key from the database. */
    databaseId: Scalars['Int'];
    /** The description of the object */
    description?: Maybe<Scalars['String']>;
    /** Connection between the TermNode type and the EnqueuedScript type */
    enqueuedScripts?: Maybe<TermNodeToEnqueuedScriptConnection>;
    /** Connection between the TermNode type and the EnqueuedStylesheet type */
    enqueuedStylesheets?: Maybe<TermNodeToEnqueuedStylesheetConnection>;
    /** The globally unique ID for the object */
    id: Scalars['ID'];
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']>;
    /** The link to the term */
    link?: Maybe<Scalars['String']>;
    /** The human friendly name of the object. */
    name?: Maybe<Scalars['String']>;
    /** Connection between the category type and the category type */
    parent?: Maybe<CategoryToParentCategoryConnectionEdge>;
    /** Database id of the parent node */
    parentDatabaseId?: Maybe<Scalars['Int']>;
    /** The globally unique identifier of the parent node. */
    parentId?: Maybe<Scalars['ID']>;
    /** Connection between the category type and the post type */
    posts?: Maybe<CategoryToPostConnection>;
    /** An alphanumeric identifier for the object unique to its type. */
    slug?: Maybe<Scalars['String']>;
    /** Connection between the category type and the Taxonomy type */
    taxonomy?: Maybe<CategoryToTaxonomyConnectionEdge>;
    /** The ID of the term group that this term object belongs to */
    termGroupId?: Maybe<Scalars['Int']>;
    /** The taxonomy ID that the object is associated with */
    termTaxonomyId?: Maybe<Scalars['Int']>;
    /** The unique resource identifier path */
    uri: Scalars['String'];
  };

/** The category type */
export type CategoryAncestorsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

/** The category type */
export type CategoryChildrenArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<CategoryToCategoryConnectionWhereArgs>;
};

/** The category type */
export type CategoryContentNodesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<CategoryToContentNodeConnectionWhereArgs>;
};

/** The category type */
export type CategoryEnqueuedScriptsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

/** The category type */
export type CategoryEnqueuedStylesheetsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

/** The category type */
export type CategoryPostsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<CategoryToPostConnectionWhereArgs>;
};

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum CategoryIdType {
  /** The Database ID for the node */
  DatabaseId = 'DATABASE_ID',
  /** The hashed Global ID */
  Id = 'ID',
  /** The name of the node */
  Name = 'NAME',
  /** Url friendly name of the node */
  Slug = 'SLUG',
  /** The URI for the node */
  Uri = 'URI',
}

/** Connection between the category type and the category type */
export type CategoryToAncestorsCategoryConnection = {
  __typename?: 'CategoryToAncestorsCategoryConnection';
  /** Edges for the CategoryToAncestorsCategoryConnection connection */
  edges?: Maybe<Array<Maybe<CategoryToAncestorsCategoryConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Category>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type CategoryToAncestorsCategoryConnectionEdge = {
  __typename?: 'CategoryToAncestorsCategoryConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<Category>;
};

/** Connection between the category type and the category type */
export type CategoryToCategoryConnection = {
  __typename?: 'CategoryToCategoryConnection';
  /** Edges for the CategoryToCategoryConnection connection */
  edges?: Maybe<Array<Maybe<CategoryToCategoryConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Category>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type CategoryToCategoryConnectionEdge = {
  __typename?: 'CategoryToCategoryConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<Category>;
};

/** Arguments for filtering the CategoryToCategoryConnection connection */
export type CategoryToCategoryConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: Maybe<Scalars['String']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: Maybe<Scalars['Int']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: Maybe<Scalars['Boolean']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: Maybe<Scalars['String']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: Maybe<Scalars['Boolean']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: Maybe<Scalars['Boolean']>;
  /** Array of term ids to include. Default empty array. */
  include?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: Maybe<Scalars['String']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Direction the connection should be ordered in */
  order?: Maybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: Maybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: Maybe<Scalars['Boolean']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: Maybe<Scalars['Int']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: Maybe<Scalars['String']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: Maybe<Scalars['Boolean']>;
};

/** Connection between the category type and the ContentNode type */
export type CategoryToContentNodeConnection = {
  __typename?: 'CategoryToContentNodeConnection';
  /** Edges for the CategoryToContentNodeConnection connection */
  edges?: Maybe<Array<Maybe<CategoryToContentNodeConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ContentNode>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type CategoryToContentNodeConnectionEdge = {
  __typename?: 'CategoryToContentNodeConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<ContentNode>;
};

/** Arguments for filtering the CategoryToContentNodeConnection connection */
export type CategoryToContentNodeConnectionWhereArgs = {
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>;
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>;
  /** Title of the object */
  title?: Maybe<Scalars['String']>;
};

/** Connection between the category type and the category type */
export type CategoryToParentCategoryConnectionEdge = {
  __typename?: 'CategoryToParentCategoryConnectionEdge';
  /** The nodes of the connection, without the edges */
  node?: Maybe<Category>;
};

/** Connection between the category type and the post type */
export type CategoryToPostConnection = {
  __typename?: 'CategoryToPostConnection';
  /** Edges for the CategoryToPostConnection connection */
  edges?: Maybe<Array<Maybe<CategoryToPostConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Post>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type CategoryToPostConnectionEdge = {
  __typename?: 'CategoryToPostConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<Post>;
};

/** Arguments for filtering the CategoryToPostConnection connection */
export type CategoryToPostConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: Maybe<Scalars['Int']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: Maybe<Scalars['String']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Category ID */
  categoryId?: Maybe<Scalars['Int']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Use Category Slug */
  categoryName?: Maybe<Scalars['String']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>;
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>;
  /** Tag Slug */
  tag?: Maybe<Scalars['String']>;
  /** Use Tag ID */
  tagId?: Maybe<Scalars['String']>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of tag slugs, used to display objects from one tag OR another */
  tagSlugAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Array of tag slugs, used to exclude objects in specified tags */
  tagSlugIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Title of the object */
  title?: Maybe<Scalars['String']>;
};

/** Connection between the category type and the Taxonomy type */
export type CategoryToTaxonomyConnectionEdge = {
  __typename?: 'CategoryToTaxonomyConnectionEdge';
  /** The nodes of the connection, without the edges */
  node?: Maybe<Taxonomy>;
};

/** Gravity Forms Chained Select field choice property. */
export type ChainedSelectChoiceProperty = {
  __typename?: 'ChainedSelectChoiceProperty';
  /** Choices used to populate the dropdown field. These can be nested multiple levels deep. */
  choices?: Maybe<Array<Maybe<ChainedSelectChoiceProperty>>>;
  /** Determines if this choice should be selected by default when displayed. The value true will select the choice, whereas false will display it unselected. */
  isSelected?: Maybe<Scalars['Boolean']>;
  /** The text to be displayed to the user when displaying this choice. */
  text?: Maybe<Scalars['String']>;
  /** The value to be stored in the database when this choice is selected. Note: This property is only supported by the Drop Down and Post Category fields. Checkboxes and Radio fields will store the text property in the database regardless of the value property. */
  value?: Maybe<Scalars['String']>;
};

/** Gravity Forms Chained Select field. */
export type ChainedSelectField = FormField & {
  __typename?: 'ChainedSelectField';
  /** When specified, the value of this property will be used on the admin pages instead of the label. It is useful for fields with long labels. */
  adminLabel?: Maybe<Scalars['String']>;
  /** Determines if this field should only visible on the administration pages. A value of 1 will mark the field as admin only and will hide it from the public form. Useful for fields such as “status” that help with managing entries, but don’t apply to users filling out the form. */
  adminOnly?: Maybe<Scalars['Boolean']>;
  /** Determines if the field’s value can be pre-populated dynamically. 1 to allow field to be pre-populated, 0 otherwise. */
  allowsPrepopulate?: Maybe<Scalars['Boolean']>;
  /** Alignment of the dropdown fields. */
  chainedSelectsAlignment?: Maybe<ChainedSelectsAlignmentEnum>;
  /** Whether inactive dropdowns should be hidden. */
  chainedSelectsHideInactive?: Maybe<Scalars['Boolean']>;
  /** Choices used to populate the dropdown field. These can be nested multiple levels deep. */
  choices?: Maybe<Array<Maybe<ChainedSelectChoiceProperty>>>;
  /** Controls the visibility of the field based on values selected by the user. */
  conditionalLogic?: Maybe<ConditionalLogic>;
  /** String containing the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields. */
  cssClass?: Maybe<Scalars['String']>;
  /**
   * Array of the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields.
   * @deprecated Please use `cssClass` instead.
   */
  cssClassList?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Field description. */
  description?: Maybe<Scalars['String']>;
  /** The placement of the field description. */
  descriptionPlacement?: Maybe<DescriptionPlacementPropertyEnum>;
  /** Contains the message that is displayed for fields that fail validation. */
  errorMessage?: Maybe<Scalars['String']>;
  /** The ID of the form this field belongs to. */
  formId: Scalars['Int'];
  /** Field ID. */
  id: Scalars['Int'];
  /** An array containing the the individual properties for each element of the Chained Select field. */
  inputs?: Maybe<Array<Maybe<ChainedSelectInputProperty>>>;
  /** Determines if the field requires the user to enter a value. 1 marks the field as required, 0 marks the field as not required. Fields marked as required will prevent the form from being submitted if the user has not entered a value in it. */
  isRequired?: Maybe<Scalars['Boolean']>;
  /** Field label that will be displayed on the form and on the admin pages. */
  label?: Maybe<Scalars['String']>;
  /** Determines if the field allows duplicate submissions. 1 to prevent users from submitting the same value more than once, 0 to allow duplicate values. */
  noDuplicates?: Maybe<Scalars['Boolean']>;
  /** Determines the size of the field when displayed on the page. */
  size?: Maybe<SizePropertyEnum>;
  /** The placement of the labels for the subfields within the group. This setting controls all of the subfields, they cannot be set individually. They may be aligned above or below the inputs. If this property is not set, the “Sub-Label Placement” setting on the Form Settings-&gt;Form Layout page is used. If no setting is specified, the default is above inputs. */
  subLabelPlacement?: Maybe<Scalars['String']>;
  /** The type of field to be displayed. */
  type: Scalars['String'];
  /** ChainedSelect field value. */
  values?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Field visibility. */
  visibility?: Maybe<VisibilityPropertyEnum>;
};

/** Chained Select field values. */
export type ChainedSelectFieldValue = {
  __typename?: 'ChainedSelectFieldValue';
  /** Field values. */
  values?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** Input fields for a single ChainedSelect. */
export type ChainedSelectInput = {
  /** Input ID. */
  inputId?: Maybe<Scalars['Float']>;
  /** Input value */
  value?: Maybe<Scalars['String']>;
};

/** An array containing the the individual properties for each element of the address field. */
export type ChainedSelectInputProperty = {
  __typename?: 'ChainedSelectInputProperty';
  /** The input ID. Input IDs follow the following naming convention: FIELDID.INPUTID (i.e. 5.1), where FIELDID is the id of the containing field and INPUTID specifies the input field. */
  id?: Maybe<Scalars['Float']>;
  /**
   * Whether or not this field should be hidden.
   * @deprecated This property is not associated with the Gravity Forms ChainedSelectInputProperty type.
   */
  isHidden?: Maybe<Scalars['Boolean']>;
  /**
   * Key used to identify this input.
   * @deprecated This property is not associated with the Gravity Forms ChainedSelectInputProperty type.
   */
  key?: Maybe<Scalars['String']>;
  /** Input label. */
  label?: Maybe<Scalars['String']>;
  /**
   * When the field is configured with allowsPrepopulate set to 1, this property contains the parameter name to be used to populate this field (equivalent to the inputName property of single-input fields).
   * @deprecated This property is not associated with the Gravity Forms ChainedSelectInputProperty type.
   */
  name?: Maybe<Scalars['String']>;
};

/** Alignment of the dropdown fields. */
export enum ChainedSelectsAlignmentEnum {
  /** Horizontal alignment (in a row). */
  Horizontal = 'HORIZONTAL',
  /** Vertical alignment (in a column). */
  Vertical = 'VERTICAL',
}

/** Gravity Forms Checkbox field. */
export type CheckboxField = FormField & {
  __typename?: 'CheckboxField';
  /** When specified, the value of this property will be used on the admin pages instead of the label. It is useful for fields with long labels. */
  adminLabel?: Maybe<Scalars['String']>;
  /** Determines if this field should only visible on the administration pages. A value of 1 will mark the field as admin only and will hide it from the public form. Useful for fields such as “status” that help with managing entries, but don’t apply to users filling out the form. */
  adminOnly?: Maybe<Scalars['Boolean']>;
  /** Determines if the field’s value can be pre-populated dynamically. 1 to allow field to be pre-populated, 0 otherwise. */
  allowsPrepopulate?: Maybe<Scalars['Boolean']>;
  /** Checkbox field value. */
  checkboxValues?: Maybe<Array<Maybe<CheckboxValueProperty>>>;
  /** Contains the available choices for the field. For instance, drop down items and checkbox items are configured with this property. */
  choices?: Maybe<Array<Maybe<ChoiceProperty>>>;
  /** Controls the visibility of the field based on values selected by the user. */
  conditionalLogic?: Maybe<ConditionalLogic>;
  /** String containing the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields. */
  cssClass?: Maybe<Scalars['String']>;
  /**
   * Array of the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields.
   * @deprecated Please use `cssClass` instead.
   */
  cssClassList?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Field description. */
  description?: Maybe<Scalars['String']>;
  /** The placement of the field description. */
  descriptionPlacement?: Maybe<DescriptionPlacementPropertyEnum>;
  /** Determines if the field (checkbox, select or radio) have choice values enabled, which allows the field to have choice values different from the labels that are displayed to the user. */
  enableChoiceValue?: Maybe<Scalars['Boolean']>;
  /** This property is used when the radio button is a product option field and will be set to true. If not associated with a product, then it is false. */
  enablePrice?: Maybe<Scalars['Boolean']>;
  /** Whether the &quot;select all&quot; choice should be displayed. */
  enableSelectAll?: Maybe<Scalars['Boolean']>;
  /** Contains the message that is displayed for fields that fail validation. */
  errorMessage?: Maybe<Scalars['String']>;
  /** The ID of the form this field belongs to. */
  formId: Scalars['Int'];
  /** Field ID. */
  id: Scalars['Int'];
  /** Assigns a name to this field so that it can be populated dynamically via this input name. Only applicable when allowsPrepopulate is set to 1. */
  inputName?: Maybe<Scalars['String']>;
  /** List of inputs. Checkboxes are treated as multi-input fields, since each checkbox item is stored separately. */
  inputs?: Maybe<Array<Maybe<CheckboxInputProperty>>>;
  /** Determines if the field requires the user to enter a value. 1 marks the field as required, 0 marks the field as not required. Fields marked as required will prevent the form from being submitted if the user has not entered a value in it. */
  isRequired?: Maybe<Scalars['Boolean']>;
  /** Field label that will be displayed on the form and on the admin pages. */
  label?: Maybe<Scalars['String']>;
  /** Determines the size of the field when displayed on the page. */
  size?: Maybe<SizePropertyEnum>;
  /** The type of field to be displayed. */
  type: Scalars['String'];
  /** Field visibility. */
  visibility?: Maybe<VisibilityPropertyEnum>;
};

/** Checkbox field value. */
export type CheckboxFieldValue = {
  __typename?: 'CheckboxFieldValue';
  /** Values. */
  checkboxValues?: Maybe<Array<Maybe<CheckboxInputValue>>>;
};

/** Input fields for a single checkbox. */
export type CheckboxInput = {
  /** Input ID. */
  inputId?: Maybe<Scalars['Float']>;
  /** Input value */
  value?: Maybe<Scalars['String']>;
};

/** An array containing the the individual properties for each element of the checkbox field. */
export type CheckboxInputProperty = {
  __typename?: 'CheckboxInputProperty';
  /** The input ID. Input IDs follow the following naming convention: FIELDID.INPUTID (i.e. 5.1), where FIELDID is the id of the containing field and INPUTID specifies the input field. */
  id?: Maybe<Scalars['Float']>;
  /** Input label. */
  label?: Maybe<Scalars['String']>;
  /** When the field is configured with allowsPrepopulate set to 1, this property contains the parameter name to be used to populate this field (equivalent to the inputName property of single-input fields). */
  name?: Maybe<Scalars['String']>;
};

/** Value for a single input within a checkbox field. */
export type CheckboxInputValue = {
  __typename?: 'CheckboxInputValue';
  /** Input ID. */
  inputId?: Maybe<Scalars['Float']>;
  /** Input value */
  value?: Maybe<Scalars['String']>;
};

/** The individual properties for each element of the Checkbox value field. */
export type CheckboxValueProperty = {
  __typename?: 'CheckboxValueProperty';
  /** Input ID. */
  inputId?: Maybe<Scalars['Float']>;
  /** Input value */
  value?: Maybe<Scalars['String']>;
};

/** Gravity Forms choice property. */
export type ChoiceProperty = {
  __typename?: 'ChoiceProperty';
  /** Determines if this choice should be selected by default when displayed. The value true will select the choice, whereas false will display it unselected. */
  isSelected?: Maybe<Scalars['Boolean']>;
  /** The text to be displayed to the user when displaying this choice. */
  text?: Maybe<Scalars['String']>;
  /** The value to be stored in the database when this choice is selected. Note: This property is only supported by the Drop Down and Post Category fields. Checkboxes and Radio fields will store the text property in the database regardless of the value property. */
  value?: Maybe<Scalars['String']>;
};

/** A Comment object */
export type Comment = Node &
  DatabaseIdentifier & {
    __typename?: 'Comment';
    /** User agent used to post the comment. This field is equivalent to WP_Comment-&gt;comment_agent and the value matching the &quot;comment_agent&quot; column in SQL. */
    agent?: Maybe<Scalars['String']>;
    /** The approval status of the comment. This field is equivalent to WP_Comment-&gt;comment_approved and the value matching the &quot;comment_approved&quot; column in SQL. */
    approved?: Maybe<Scalars['Boolean']>;
    /** The author of the comment */
    author?: Maybe<CommentToCommenterConnectionEdge>;
    /** IP address for the author. This field is equivalent to WP_Comment-&gt;comment_author_IP and the value matching the &quot;comment_author_IP&quot; column in SQL. */
    authorIp?: Maybe<Scalars['String']>;
    /**
     * ID for the comment, unique among comments.
     * @deprecated Deprecated in favor of databaseId
     */
    commentId?: Maybe<Scalars['Int']>;
    /** Connection between the Comment type and the ContentNode type */
    commentedOn?: Maybe<CommentToContentNodeConnectionEdge>;
    /** Content of the comment. This field is equivalent to WP_Comment-&gt;comment_content and the value matching the &quot;comment_content&quot; column in SQL. */
    content?: Maybe<Scalars['String']>;
    /** The unique identifier stored in the database */
    databaseId: Scalars['Int'];
    /** Date the comment was posted in local time. This field is equivalent to WP_Comment-&gt;date and the value matching the &quot;date&quot; column in SQL. */
    date?: Maybe<Scalars['String']>;
    /** Date the comment was posted in GMT. This field is equivalent to WP_Comment-&gt;date_gmt and the value matching the &quot;date_gmt&quot; column in SQL. */
    dateGmt?: Maybe<Scalars['String']>;
    /** The globally unique identifier for the comment object */
    id: Scalars['ID'];
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']>;
    /** Karma value for the comment. This field is equivalent to WP_Comment-&gt;comment_karma and the value matching the &quot;comment_karma&quot; column in SQL. */
    karma?: Maybe<Scalars['Int']>;
    /** Connection between the Comment type and the Comment type */
    parent?: Maybe<CommentToParentCommentConnectionEdge>;
    /** The database id of the parent comment node or null if it is the root comment */
    parentDatabaseId?: Maybe<Scalars['Int']>;
    /** The globally unique identifier of the parent comment node. */
    parentId?: Maybe<Scalars['ID']>;
    /** Connection between the Comment type and the Comment type */
    replies?: Maybe<CommentToCommentConnection>;
    /** Type of comment. This field is equivalent to WP_Comment-&gt;comment_type and the value matching the &quot;comment_type&quot; column in SQL. */
    type?: Maybe<Scalars['String']>;
  };

/** A Comment object */
export type CommentContentArgs = {
  format?: Maybe<PostObjectFieldFormatEnum>;
};

/** A Comment object */
export type CommentParentArgs = {
  where?: Maybe<CommentToParentCommentConnectionWhereArgs>;
};

/** A Comment object */
export type CommentRepliesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<CommentToCommentConnectionWhereArgs>;
};

/** A Comment Author object */
export type CommentAuthor = Node &
  Commenter & {
    __typename?: 'CommentAuthor';
    /** Identifies the primary key from the database. */
    databaseId: Scalars['Int'];
    /** The email for the comment author */
    email?: Maybe<Scalars['String']>;
    /** The globally unique identifier for the comment author object */
    id: Scalars['ID'];
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']>;
    /** The name for the comment author. */
    name?: Maybe<Scalars['String']>;
    /** The url the comment author. */
    url?: Maybe<Scalars['String']>;
  };

/** Connection between the Comment type and the Comment type */
export type CommentToCommentConnection = {
  __typename?: 'CommentToCommentConnection';
  /** Edges for the CommentToCommentConnection connection */
  edges?: Maybe<Array<Maybe<CommentToCommentConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Comment>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type CommentToCommentConnectionEdge = {
  __typename?: 'CommentToCommentConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<Comment>;
};

/** Arguments for filtering the CommentToCommentConnection connection */
export type CommentToCommentConnectionWhereArgs = {
  /** Comment author email address. */
  authorEmail?: Maybe<Scalars['String']>;
  /** Array of author IDs to include comments for. */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Comment author URL. */
  authorUrl?: Maybe<Scalars['String']>;
  /** Array of comment IDs to include. */
  commentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Include comments of a given type. */
  commentType?: Maybe<Scalars['String']>;
  /** Include comments from a given array of comment types. */
  commentTypeIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: Maybe<Scalars['String']>;
  /** Content object author ID to limit results by. */
  contentAuthor?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: Maybe<Scalars['ID']>;
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Content object name to retrieve affiliated comments for. */
  contentName?: Maybe<Scalars['String']>;
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: Maybe<Scalars['Int']>;
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: Maybe<Array<Maybe<PostStatusEnum>>>;
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: Maybe<Array<Maybe<ContentTypeEnum>>>;
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Karma score to retrieve matching comments for. */
  karma?: Maybe<Scalars['Int']>;
  /** The cardinality of the order of the connection */
  order?: Maybe<OrderEnum>;
  /** Field to order the comments by. */
  orderby?: Maybe<CommentsConnectionOrderbyEnum>;
  /** Parent ID of comment to retrieve children of. */
  parent?: Maybe<Scalars['Int']>;
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Search term(s) to retrieve matching comments for. */
  search?: Maybe<Scalars['String']>;
  /** Comment status to limit results by. */
  status?: Maybe<Scalars['String']>;
  /** Include comments for a specific user ID. */
  userId?: Maybe<Scalars['ID']>;
};

/** Connection between the Comment type and the Commenter type */
export type CommentToCommenterConnectionEdge = {
  __typename?: 'CommentToCommenterConnectionEdge';
  /** The nodes of the connection, without the edges */
  node?: Maybe<Commenter>;
};

/** Connection between the Comment type and the ContentNode type */
export type CommentToContentNodeConnectionEdge = {
  __typename?: 'CommentToContentNodeConnectionEdge';
  /** The nodes of the connection, without the edges */
  node?: Maybe<ContentNode>;
};

/** Connection between the Comment type and the Comment type */
export type CommentToParentCommentConnectionEdge = {
  __typename?: 'CommentToParentCommentConnectionEdge';
  /** The nodes of the connection, without the edges */
  node?: Maybe<Comment>;
};

/** Arguments for filtering the CommentToParentCommentConnection connection */
export type CommentToParentCommentConnectionWhereArgs = {
  /** Comment author email address. */
  authorEmail?: Maybe<Scalars['String']>;
  /** Array of author IDs to include comments for. */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Comment author URL. */
  authorUrl?: Maybe<Scalars['String']>;
  /** Array of comment IDs to include. */
  commentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Include comments of a given type. */
  commentType?: Maybe<Scalars['String']>;
  /** Include comments from a given array of comment types. */
  commentTypeIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: Maybe<Scalars['String']>;
  /** Content object author ID to limit results by. */
  contentAuthor?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: Maybe<Scalars['ID']>;
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Content object name to retrieve affiliated comments for. */
  contentName?: Maybe<Scalars['String']>;
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: Maybe<Scalars['Int']>;
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: Maybe<Array<Maybe<PostStatusEnum>>>;
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: Maybe<Array<Maybe<ContentTypeEnum>>>;
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Karma score to retrieve matching comments for. */
  karma?: Maybe<Scalars['Int']>;
  /** The cardinality of the order of the connection */
  order?: Maybe<OrderEnum>;
  /** Field to order the comments by. */
  orderby?: Maybe<CommentsConnectionOrderbyEnum>;
  /** Parent ID of comment to retrieve children of. */
  parent?: Maybe<Scalars['Int']>;
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Search term(s) to retrieve matching comments for. */
  search?: Maybe<Scalars['String']>;
  /** Comment status to limit results by. */
  status?: Maybe<Scalars['String']>;
  /** Include comments for a specific user ID. */
  userId?: Maybe<Scalars['ID']>;
};

/** The author of a comment */
export type Commenter = {
  /** Identifies the primary key from the database. */
  databaseId: Scalars['Int'];
  /** The email address of the author of a comment. */
  email?: Maybe<Scalars['String']>;
  /** The globally unique identifier for the comment author. */
  id: Scalars['ID'];
  /** Whether the author information is considered restricted. (not fully public) */
  isRestricted?: Maybe<Scalars['Boolean']>;
  /** The name of the author of a comment. */
  name?: Maybe<Scalars['String']>;
  /** The url of the author of a comment. */
  url?: Maybe<Scalars['String']>;
};

/** Options for ordering the connection */
export enum CommentsConnectionOrderbyEnum {
  /** Order by browser user agent of the commenter. */
  CommentAgent = 'COMMENT_AGENT',
  /** Order by true/false approval of the comment. */
  CommentApproved = 'COMMENT_APPROVED',
  /** Order by name of the comment author. */
  CommentAuthor = 'COMMENT_AUTHOR',
  /** Order by e-mail of the comment author. */
  CommentAuthorEmail = 'COMMENT_AUTHOR_EMAIL',
  /** Order by IP address of the comment author. */
  CommentAuthorIp = 'COMMENT_AUTHOR_IP',
  /** Order by URL address of the comment author. */
  CommentAuthorUrl = 'COMMENT_AUTHOR_URL',
  /** Order by the comment contents. */
  CommentContent = 'COMMENT_CONTENT',
  /** Order by date/time timestamp of the comment. */
  CommentDate = 'COMMENT_DATE',
  /** Order by GMT timezone date/time timestamp of the comment. */
  CommentDateGmt = 'COMMENT_DATE_GMT',
  /** Order by the globally unique identifier for the comment object */
  CommentId = 'COMMENT_ID',
  /** Order by the array list of comment IDs listed in the where clause. */
  CommentIn = 'COMMENT_IN',
  /** Order by the comment karma score. */
  CommentKarma = 'COMMENT_KARMA',
  /** Order by the comment parent ID. */
  CommentParent = 'COMMENT_PARENT',
  /** Order by the post object ID. */
  CommentPostId = 'COMMENT_POST_ID',
  /** Order by the the type of comment, such as 'comment', 'pingback', or 'trackback'. */
  CommentType = 'COMMENT_TYPE',
  /** Order by the user ID. */
  UserId = 'USER_ID',
}

/** Gravity Forms conditional logic. */
export type ConditionalLogic = {
  __typename?: 'ConditionalLogic';
  /** The type of action the conditional logic will perform. */
  actionType?: Maybe<ConditionalLogicActionTypeEnum>;
  /** Determines how to the rules should be evaluated. */
  logicType?: Maybe<ConditionalLogicLogicTypeEnum>;
  /** Conditional logic rules. */
  rules?: Maybe<Array<Maybe<ConditionalLogicRule>>>;
};

/** The type of action the conditional logic will perform. */
export enum ConditionalLogicActionTypeEnum {
  /** Text button (default). */
  Hide = 'HIDE',
  /** Image button. */
  Show = 'SHOW',
}

/** Determines how to the rules should be evaluated. */
export enum ConditionalLogicLogicTypeEnum {
  /** Evaulate all logic rules. */
  All = 'ALL',
  /** Evaluate any logic rule. */
  Any = 'ANY',
}

/** Gravity Forms conditional logic rule. */
export type ConditionalLogicRule = {
  __typename?: 'ConditionalLogicRule';
  /** Target field Id. Field that will have it’s value compared with the value property to determine if this rule is a match. */
  fieldId?: Maybe<Scalars['Float']>;
  /** Operator to be used when evaluating this rule. */
  operator?: Maybe<RuleOperatorEnum>;
  /** The value to compare with field specified by fieldId. */
  value?: Maybe<Scalars['String']>;
};

/** Type of form confirmation to be used. */
export enum ConfirmationTypeEnum {
  /** Use a confirmation "message". */
  Message = 'MESSAGE',
  /** Use a redirect to a different WordPress "page". */
  Page = 'PAGE',
  /** Use a "redirect" to a given URL. */
  Redirect = 'REDIRECT',
}

/** Gravity Forms Consent field. */
export type ConsentField = FormField & {
  __typename?: 'ConsentField';
  /** When specified, the value of this property will be used on the admin pages instead of the label. It is useful for fields with long labels. */
  adminLabel?: Maybe<Scalars['String']>;
  /** Determines if this field should only visible on the administration pages. A value of 1 will mark the field as admin only and will hide it from the public form. Useful for fields such as “status” that help with managing entries, but don’t apply to users filling out the form. */
  adminOnly?: Maybe<Scalars['Boolean']>;
  /** Text of the consent checkbox */
  checkboxLabel?: Maybe<Scalars['String']>;
  /** Controls the visibility of the field based on values selected by the user. */
  conditionalLogic?: Maybe<ConditionalLogic>;
  /** String containing the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields. */
  cssClass?: Maybe<Scalars['String']>;
  /**
   * Array of the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields.
   * @deprecated Please use `cssClass` instead.
   */
  cssClassList?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Field description. */
  description?: Maybe<Scalars['String']>;
  /** The placement of the field description. */
  descriptionPlacement?: Maybe<DescriptionPlacementPropertyEnum>;
  /** Contains the message that is displayed for fields that fail validation. */
  errorMessage?: Maybe<Scalars['String']>;
  /** The ID of the form this field belongs to. */
  formId: Scalars['Int'];
  /** Field ID. */
  id: Scalars['Int'];
  /** Assigns a name to this field so that it can be populated dynamically via this input name. Only applicable when allowsPrepopulate is set to 1. */
  inputName?: Maybe<Scalars['String']>;
  /** Determines if the field requires the user to enter a value. 1 marks the field as required, 0 marks the field as not required. Fields marked as required will prevent the form from being submitted if the user has not entered a value in it. */
  isRequired?: Maybe<Scalars['Boolean']>;
  /** Field label that will be displayed on the form and on the admin pages. */
  label?: Maybe<Scalars['String']>;
  /** The type of field to be displayed. */
  type: Scalars['String'];
  /** Consent field value. */
  value?: Maybe<Scalars['String']>;
  /** Field visibility. */
  visibility?: Maybe<VisibilityPropertyEnum>;
};

/** Consent field value. */
export type ConsentFieldValue = {
  __typename?: 'ConsentFieldValue';
  /** The value. Returns the consent message on `true`, `null` on false. */
  value?: Maybe<Scalars['String']>;
};

/** Nodes used to manage content */
export type ContentNode = {
  /** Connection between the ContentNode type and the ContentType type */
  contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>;
  /** The ID of the node in the database. */
  databaseId: Scalars['Int'];
  /** Post publishing date. */
  date?: Maybe<Scalars['String']>;
  /** The publishing date set in GMT. */
  dateGmt?: Maybe<Scalars['String']>;
  /** The desired slug of the post */
  desiredSlug?: Maybe<Scalars['String']>;
  /** If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn't exist or is greater than 15 seconds */
  editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>;
  /** The RSS enclosure for the object */
  enclosure?: Maybe<Scalars['String']>;
  /** Connection between the ContentNode type and the EnqueuedScript type */
  enqueuedScripts?: Maybe<ContentNodeToEnqueuedScriptConnection>;
  /** Connection between the ContentNode type and the EnqueuedStylesheet type */
  enqueuedStylesheets?: Maybe<ContentNodeToEnqueuedStylesheetConnection>;
  /** The global unique identifier for this post. This currently matches the value stored in WP_Post->guid and the guid column in the "post_objects" database table. */
  guid?: Maybe<Scalars['String']>;
  /** The globally unique identifier of the node. */
  id: Scalars['ID'];
  /** Whether the object is a node in the preview state */
  isPreview?: Maybe<Scalars['Boolean']>;
  /** Whether the object is restricted from the current viewer */
  isRestricted?: Maybe<Scalars['Boolean']>;
  /** The user that most recently edited the node */
  lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>;
  /** The permalink of the post */
  link?: Maybe<Scalars['String']>;
  /** The local modified time for a post. If a post was recently updated the modified field will change to match the corresponding time. */
  modified?: Maybe<Scalars['String']>;
  /** The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT. */
  modifiedGmt?: Maybe<Scalars['String']>;
  /** The database id of the preview node */
  previewRevisionDatabaseId?: Maybe<Scalars['Int']>;
  /** Whether the object is a node in the preview state */
  previewRevisionId?: Maybe<Scalars['ID']>;
  /** The uri slug for the post. This is equivalent to the WP_Post->post_name field and the post_name column in the database for the "post_objects" table. */
  slug?: Maybe<Scalars['String']>;
  /** The current status of the object */
  status?: Maybe<Scalars['String']>;
  /** The template assigned to a node of content */
  template?: Maybe<ContentTemplate>;
  /** URI path for the resource */
  uri: Scalars['String'];
};

/** Nodes used to manage content */
export type ContentNodeEnqueuedScriptsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

/** Nodes used to manage content */
export type ContentNodeEnqueuedStylesheetsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum ContentNodeIdTypeEnum {
  /** Identify a resource by the Database ID. */
  DatabaseId = 'DATABASE_ID',
  /** Identify a resource by the (hashed) Global ID. */
  Id = 'ID',
  /** Identify a resource by the URI. */
  Uri = 'URI',
}

/** Connection between the ContentNode type and the ContentType type */
export type ContentNodeToContentTypeConnectionEdge = {
  __typename?: 'ContentNodeToContentTypeConnectionEdge';
  /** The nodes of the connection, without the edges */
  node?: Maybe<ContentType>;
};

/** Connection between the ContentNode type and the User type */
export type ContentNodeToEditLastConnectionEdge = {
  __typename?: 'ContentNodeToEditLastConnectionEdge';
  /** The nodes of the connection, without the edges */
  node?: Maybe<User>;
};

/** Connection between the ContentNode type and the User type */
export type ContentNodeToEditLockConnectionEdge = {
  __typename?: 'ContentNodeToEditLockConnectionEdge';
  /** The timestamp for when the node was last edited */
  lockTimestamp?: Maybe<Scalars['String']>;
  /** The nodes of the connection, without the edges */
  node?: Maybe<User>;
};

/** Connection between the ContentNode type and the EnqueuedScript type */
export type ContentNodeToEnqueuedScriptConnection = {
  __typename?: 'ContentNodeToEnqueuedScriptConnection';
  /** Edges for the ContentNodeToEnqueuedScriptConnection connection */
  edges?: Maybe<Array<Maybe<ContentNodeToEnqueuedScriptConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<EnqueuedScript>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type ContentNodeToEnqueuedScriptConnectionEdge = {
  __typename?: 'ContentNodeToEnqueuedScriptConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<EnqueuedScript>;
};

/** Connection between the ContentNode type and the EnqueuedStylesheet type */
export type ContentNodeToEnqueuedStylesheetConnection = {
  __typename?: 'ContentNodeToEnqueuedStylesheetConnection';
  /** Edges for the ContentNodeToEnqueuedStylesheetConnection connection */
  edges?: Maybe<Array<Maybe<ContentNodeToEnqueuedStylesheetConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<EnqueuedStylesheet>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type ContentNodeToEnqueuedStylesheetConnectionEdge = {
  __typename?: 'ContentNodeToEnqueuedStylesheetConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<EnqueuedStylesheet>;
};

/** A union of Content Node Types that support revisions */
export type ContentRevisionUnion = Post | Page;

/** The template assigned to a node of content */
export type ContentTemplate = {
  /** The name of the template */
  templateName?: Maybe<Scalars['String']>;
};

/** An Post Type object */
export type ContentType = Node &
  UniformResourceIdentifiable & {
    __typename?: 'ContentType';
    /** Whether this content type should can be exported. */
    canExport?: Maybe<Scalars['Boolean']>;
    /** Connection between the ContentType type and the Taxonomy type */
    connectedTaxonomies?: Maybe<ContentTypeToTaxonomyConnection>;
    /** Connection between the ContentType type and the ContentNode type */
    contentNodes?: Maybe<ContentTypeToContentNodeConnection>;
    /** Whether content of this type should be deleted when the author of it is deleted from the system. */
    deleteWithUser?: Maybe<Scalars['Boolean']>;
    /** Description of the content type. */
    description?: Maybe<Scalars['String']>;
    /** Whether to exclude nodes of this content type from front end search results. */
    excludeFromSearch?: Maybe<Scalars['Boolean']>;
    /** The plural name of the content type within the GraphQL Schema. */
    graphqlPluralName?: Maybe<Scalars['String']>;
    /** The singular name of the content type within the GraphQL Schema. */
    graphqlSingleName?: Maybe<Scalars['String']>;
    /** Whether this content type should have archives. Content archives are generated by type and by date. */
    hasArchive?: Maybe<Scalars['Boolean']>;
    /** Whether the content type is hierarchical, for example pages. */
    hierarchical?: Maybe<Scalars['Boolean']>;
    /** The globally unique identifier of the post-type object. */
    id: Scalars['ID'];
    /** Whether this page is set to the static front page. */
    isFrontPage: Scalars['Boolean'];
    /** Whether this page is set to the blog posts page. */
    isPostsPage: Scalars['Boolean'];
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']>;
    /** Display name of the content type. */
    label?: Maybe<Scalars['String']>;
    /** Details about the content type labels. */
    labels?: Maybe<PostTypeLabelDetails>;
    /** The name of the icon file to display as a menu icon. */
    menuIcon?: Maybe<Scalars['String']>;
    /** The position of this post type in the menu. Only applies if show_in_menu is true. */
    menuPosition?: Maybe<Scalars['Int']>;
    /** The internal name of the post type. This should not be used for display purposes. */
    name?: Maybe<Scalars['String']>;
    /** Whether a content type is intended for use publicly either via the admin interface or by front-end users. While the default settings of exclude_from_search, publicly_queryable, show_ui, and show_in_nav_menus are inherited from public, each does not rely on this relationship and controls a very specific intention. */
    public?: Maybe<Scalars['Boolean']>;
    /** Whether queries can be performed on the front end for the content type as part of parse_request(). */
    publiclyQueryable?: Maybe<Scalars['Boolean']>;
    /** Name of content type to display in REST API &quot;wp/v2&quot; namespace. */
    restBase?: Maybe<Scalars['String']>;
    /** The REST Controller class assigned to handling this content type. */
    restControllerClass?: Maybe<Scalars['String']>;
    /** Makes this content type available via the admin bar. */
    showInAdminBar?: Maybe<Scalars['Boolean']>;
    /** Whether to add the content type to the GraphQL Schema. */
    showInGraphql?: Maybe<Scalars['Boolean']>;
    /** Where to show the content type in the admin menu. To work, $show_ui must be true. If true, the post type is shown in its own top level menu. If false, no menu is shown. If a string of an existing top level menu (eg. &quot;tools.php&quot; or &quot;edit.php?post_type=page&quot;), the post type will be placed as a sub-menu of that. */
    showInMenu?: Maybe<Scalars['Boolean']>;
    /** Makes this content type available for selection in navigation menus. */
    showInNavMenus?: Maybe<Scalars['Boolean']>;
    /** Whether the content type is associated with a route under the the REST API &quot;wp/v2&quot; namespace. */
    showInRest?: Maybe<Scalars['Boolean']>;
    /** Whether to generate and allow a UI for managing this content type in the admin. */
    showUi?: Maybe<Scalars['Boolean']>;
    /** The unique resource identifier path */
    uri?: Maybe<Scalars['String']>;
  };

/** An Post Type object */
export type ContentTypeConnectedTaxonomiesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

/** An Post Type object */
export type ContentTypeContentNodesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ContentTypeToContentNodeConnectionWhereArgs>;
};

/** Allowed Content Types */
export enum ContentTypeEnum {
  /** The Type of Content object */
  Attachment = 'ATTACHMENT',
  /** The Type of Content object */
  Page = 'PAGE',
  /** The Type of Content object */
  Post = 'POST',
}

/** The Type of Identifier used to fetch a single Content Type node. To be used along with the "id" field. Default is "ID". */
export enum ContentTypeIdTypeEnum {
  /** The globally unique ID */
  Id = 'ID',
  /** The name of the content type. */
  Name = 'NAME',
}

/** Connection between the ContentType type and the ContentNode type */
export type ContentTypeToContentNodeConnection = {
  __typename?: 'ContentTypeToContentNodeConnection';
  /** Edges for the ContentTypeToContentNodeConnection connection */
  edges?: Maybe<Array<Maybe<ContentTypeToContentNodeConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ContentNode>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type ContentTypeToContentNodeConnectionEdge = {
  __typename?: 'ContentTypeToContentNodeConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<ContentNode>;
};

/** Arguments for filtering the ContentTypeToContentNodeConnection connection */
export type ContentTypeToContentNodeConnectionWhereArgs = {
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>;
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>;
  /** Title of the object */
  title?: Maybe<Scalars['String']>;
};

/** Connection between the ContentType type and the Taxonomy type */
export type ContentTypeToTaxonomyConnection = {
  __typename?: 'ContentTypeToTaxonomyConnection';
  /** Edges for the ContentTypeToTaxonomyConnection connection */
  edges?: Maybe<Array<Maybe<ContentTypeToTaxonomyConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Taxonomy>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type ContentTypeToTaxonomyConnectionEdge = {
  __typename?: 'ContentTypeToTaxonomyConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<Taxonomy>;
};

/** Input for the createCategory mutation */
export type CreateCategoryInput = {
  /** The slug that the category will be an alias of */
  aliasOf?: Maybe<Scalars['String']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The description of the category object */
  description?: Maybe<Scalars['String']>;
  /** The name of the category object to mutate */
  name: Scalars['String'];
  /** The ID of the category that should be set as the parent */
  parentId?: Maybe<Scalars['ID']>;
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: Maybe<Scalars['String']>;
};

/** The payload for the createCategory mutation */
export type CreateCategoryPayload = {
  __typename?: 'CreateCategoryPayload';
  /** The created category */
  category?: Maybe<Category>;
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Input for the createComment mutation */
export type CreateCommentInput = {
  /** The approval status of the comment. */
  approved?: Maybe<Scalars['String']>;
  /** The name of the comment's author. */
  author?: Maybe<Scalars['String']>;
  /** The email of the comment's author. */
  authorEmail?: Maybe<Scalars['String']>;
  /** The url of the comment's author. */
  authorUrl?: Maybe<Scalars['String']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The ID of the post object the comment belongs to. */
  commentOn?: Maybe<Scalars['Int']>;
  /** Content of the comment. */
  content?: Maybe<Scalars['String']>;
  /** The date of the object. Preferable to enter as year/month/day ( e.g. 01/31/2017 ) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: Maybe<Scalars['String']>;
  /** Parent comment of current comment. */
  parent?: Maybe<Scalars['ID']>;
  /** Type of comment. */
  type?: Maybe<Scalars['String']>;
};

/** The payload for the createComment mutation */
export type CreateCommentPayload = {
  __typename?: 'CreateCommentPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The comment that was created */
  comment?: Maybe<Comment>;
  /** Whether the mutation succeeded. If the comment is not approved, the server will not return the comment to a non authenticated user, but a success message can be returned if the create succeeded, and the client can optimistically add the comment to the client cache */
  success?: Maybe<Scalars['Boolean']>;
};

/** Input for the createGravityFormsDraftEntry mutation */
export type CreateGravityFormsDraftEntryInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The form ID. */
  formId: Scalars['Int'];
  /** Optional. If set, a new draft entry will be created from the existing Entry.  */
  fromEntryId?: Maybe<Scalars['Int']>;
  /** Optional. The IP address of the user who submitted the draft entry. Default is an empty string. */
  ip?: Maybe<Scalars['String']>;
  /** Optional. The page number where the user left off. Default is 1. */
  pageNumber?: Maybe<Scalars['Int']>;
};

/** The payload for the createGravityFormsDraftEntry mutation */
export type CreateGravityFormsDraftEntryPayload = {
  __typename?: 'CreateGravityFormsDraftEntryPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Draft resume token. */
  resumeToken?: Maybe<Scalars['String']>;
  /** Draft resume URL. If the &quot;Referer&quot; header is not included in the request, this will be an empty string. */
  resumeUrl?: Maybe<Scalars['String']>;
};

/** Input for the createMediaItem mutation */
export type CreateMediaItemInput = {
  /** Alternative text to display when mediaItem is not displayed */
  altText?: Maybe<Scalars['String']>;
  /** The userId to assign as the author of the mediaItem */
  authorId?: Maybe<Scalars['ID']>;
  /** The caption for the mediaItem */
  caption?: Maybe<Scalars['String']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The comment status for the mediaItem */
  commentStatus?: Maybe<Scalars['String']>;
  /** The date of the mediaItem */
  date?: Maybe<Scalars['String']>;
  /** The date (in GMT zone) of the mediaItem */
  dateGmt?: Maybe<Scalars['String']>;
  /** Description of the mediaItem */
  description?: Maybe<Scalars['String']>;
  /** The file name of the mediaItem */
  filePath?: Maybe<Scalars['String']>;
  /** The file type of the mediaItem */
  fileType?: Maybe<MimeTypeEnum>;
  /** The WordPress post ID or the graphQL postId of the parent object */
  parentId?: Maybe<Scalars['ID']>;
  /** The ping status for the mediaItem */
  pingStatus?: Maybe<Scalars['String']>;
  /** The slug of the mediaItem */
  slug?: Maybe<Scalars['String']>;
  /** The status of the mediaItem */
  status?: Maybe<MediaItemStatusEnum>;
  /** The title of the mediaItem */
  title?: Maybe<Scalars['String']>;
};

/** The payload for the createMediaItem mutation */
export type CreateMediaItemPayload = {
  __typename?: 'CreateMediaItemPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The MediaItem object mutation type. */
  mediaItem?: Maybe<MediaItem>;
};

/** Input for the createPage mutation */
export type CreatePageInput = {
  /** The userId to assign as the author of the object */
  authorId?: Maybe<Scalars['ID']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The comment status for the object */
  commentStatus?: Maybe<Scalars['String']>;
  /** The content of the object */
  content?: Maybe<Scalars['String']>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: Maybe<Scalars['String']>;
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: Maybe<Scalars['Int']>;
  /** The ID of the parent object */
  parentId?: Maybe<Scalars['ID']>;
  /** The password used to protect the content of the object */
  password?: Maybe<Scalars['String']>;
  /** The slug of the object */
  slug?: Maybe<Scalars['String']>;
  /** The status of the object */
  status?: Maybe<PostStatusEnum>;
  /** The title of the object */
  title?: Maybe<Scalars['String']>;
};

/** The payload for the createPage mutation */
export type CreatePagePayload = {
  __typename?: 'CreatePagePayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The Post object mutation type. */
  page?: Maybe<Page>;
};

/** Input for the createPostFormat mutation */
export type CreatePostFormatInput = {
  /** The slug that the post_format will be an alias of */
  aliasOf?: Maybe<Scalars['String']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The description of the post_format object */
  description?: Maybe<Scalars['String']>;
  /** The name of the post_format object to mutate */
  name: Scalars['String'];
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: Maybe<Scalars['String']>;
};

/** The payload for the createPostFormat mutation */
export type CreatePostFormatPayload = {
  __typename?: 'CreatePostFormatPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The created post_format */
  postFormat?: Maybe<PostFormat>;
};

/** Input for the createPost mutation */
export type CreatePostInput = {
  /** The userId to assign as the author of the object */
  authorId?: Maybe<Scalars['ID']>;
  /** Set connections between the post and categories */
  categories?: Maybe<PostCategoriesInput>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The comment status for the object */
  commentStatus?: Maybe<Scalars['String']>;
  /** The content of the object */
  content?: Maybe<Scalars['String']>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: Maybe<Scalars['String']>;
  /** The excerpt of the object */
  excerpt?: Maybe<Scalars['String']>;
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: Maybe<Scalars['Int']>;
  /** The password used to protect the content of the object */
  password?: Maybe<Scalars['String']>;
  /** The ping status for the object */
  pingStatus?: Maybe<Scalars['String']>;
  /** URLs that have been pinged. */
  pinged?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Set connections between the post and postFormats */
  postFormats?: Maybe<PostPostFormatsInput>;
  /** The slug of the object */
  slug?: Maybe<Scalars['String']>;
  /** The status of the object */
  status?: Maybe<PostStatusEnum>;
  /** Set connections between the post and tags */
  tags?: Maybe<PostTagsInput>;
  /** The title of the object */
  title?: Maybe<Scalars['String']>;
  /** URLs queued to be pinged. */
  toPing?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** The payload for the createPost mutation */
export type CreatePostPayload = {
  __typename?: 'CreatePostPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The Post object mutation type. */
  post?: Maybe<Post>;
};

/** Input for the createTag mutation */
export type CreateTagInput = {
  /** The slug that the post_tag will be an alias of */
  aliasOf?: Maybe<Scalars['String']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The description of the post_tag object */
  description?: Maybe<Scalars['String']>;
  /** The name of the post_tag object to mutate */
  name: Scalars['String'];
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: Maybe<Scalars['String']>;
};

/** The payload for the createTag mutation */
export type CreateTagPayload = {
  __typename?: 'CreateTagPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The created post_tag */
  tag?: Maybe<Tag>;
};

/** Input for the createUser mutation */
export type CreateUserInput = {
  /** User's AOL IM account. */
  aim?: Maybe<Scalars['String']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** A string containing content about the user. */
  description?: Maybe<Scalars['String']>;
  /** A string that will be shown on the site. Defaults to user's username. It is likely that you will want to change this, for both appearance and security through obscurity (that is if you dont use and delete the default admin user). */
  displayName?: Maybe<Scalars['String']>;
  /** A string containing the user's email address. */
  email?: Maybe<Scalars['String']>;
  /** 	The user's first name. */
  firstName?: Maybe<Scalars['String']>;
  /** User's Jabber account. */
  jabber?: Maybe<Scalars['String']>;
  /** The user's last name. */
  lastName?: Maybe<Scalars['String']>;
  /** User's locale. */
  locale?: Maybe<Scalars['String']>;
  /** A string that contains a URL-friendly name for the user. The default is the user's username. */
  nicename?: Maybe<Scalars['String']>;
  /** The user's nickname, defaults to the user's username. */
  nickname?: Maybe<Scalars['String']>;
  /** A string that contains the plain text password for the user. */
  password?: Maybe<Scalars['String']>;
  /** The date the user registered. Format is Y-m-d H:i:s. */
  registered?: Maybe<Scalars['String']>;
  /** A string for whether to enable the rich editor or not. False if not empty. */
  richEditing?: Maybe<Scalars['String']>;
  /** An array of roles to be assigned to the user. */
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** A string that contains the user's username for logging in. */
  username: Scalars['String'];
  /** A string containing the user's URL for the user's web site. */
  websiteUrl?: Maybe<Scalars['String']>;
  /** User's Yahoo IM account. */
  yim?: Maybe<Scalars['String']>;
};

/** The payload for the createUser mutation */
export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The User object mutation type. */
  user?: Maybe<User>;
};

/** Object that can be identified with a Database ID */
export type DatabaseIdentifier = {
  /** The unique identifier stored in the database */
  databaseId: Scalars['Int'];
};

/** Gravity Forms Date field. */
export type DateField = FormField & {
  __typename?: 'DateField';
  /** When specified, the value of this property will be used on the admin pages instead of the label. It is useful for fields with long labels. */
  adminLabel?: Maybe<Scalars['String']>;
  /** Determines if this field should only visible on the administration pages. A value of 1 will mark the field as admin only and will hide it from the public form. Useful for fields such as “status” that help with managing entries, but don’t apply to users filling out the form. */
  adminOnly?: Maybe<Scalars['Boolean']>;
  /** Determines if the field’s value can be pre-populated dynamically. 1 to allow field to be pre-populated, 0 otherwise. */
  allowsPrepopulate?: Maybe<Scalars['Boolean']>;
  /** Determines how the date field displays it’s calendar icon. */
  calendarIconType?: Maybe<CalendarIconTypeEnum>;
  /** Contains the URL to the custom calendar icon. Only applicable when calendarIconType is set to custom. */
  calendarIconUrl?: Maybe<Scalars['String']>;
  /** Controls the visibility of the field based on values selected by the user. */
  conditionalLogic?: Maybe<ConditionalLogic>;
  /** String containing the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields. */
  cssClass?: Maybe<Scalars['String']>;
  /**
   * Array of the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields.
   * @deprecated Please use `cssClass` instead.
   */
  cssClassList?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Determines how the date is displayed. */
  dateFormat?: Maybe<DateFieldFormatEnum>;
  /** The type of date field to display. */
  dateType?: Maybe<DateTypeEnum>;
  /** Contains the default value for the field. When specified, the field&#039;s value will be populated with the contents of this property when the form is displayed. */
  defaultValue?: Maybe<Scalars['String']>;
  /** Field description. */
  description?: Maybe<Scalars['String']>;
  /** The placement of the field description. */
  descriptionPlacement?: Maybe<DescriptionPlacementPropertyEnum>;
  /** Contains the message that is displayed for fields that fail validation. */
  errorMessage?: Maybe<Scalars['String']>;
  /** The ID of the form this field belongs to. */
  formId: Scalars['Int'];
  /** Field ID. */
  id: Scalars['Int'];
  /** Assigns a name to this field so that it can be populated dynamically via this input name. Only applicable when allowsPrepopulate is set to 1. */
  inputName?: Maybe<Scalars['String']>;
  /** An array containing the the individual properties for each element of the field. */
  inputs?: Maybe<Array<Maybe<InputProperty>>>;
  /** Determines if the field requires the user to enter a value. 1 marks the field as required, 0 marks the field as not required. Fields marked as required will prevent the form from being submitted if the user has not entered a value in it. */
  isRequired?: Maybe<Scalars['Boolean']>;
  /** Field label that will be displayed on the form and on the admin pages. */
  label?: Maybe<Scalars['String']>;
  /** Determines if the field allows duplicate submissions. 1 to prevent users from submitting the same value more than once, 0 to allow duplicate values. */
  noDuplicates?: Maybe<Scalars['Boolean']>;
  /** Field placeholder. */
  placeholder?: Maybe<Scalars['String']>;
  /** Determines the size of the field when displayed on the page. */
  size?: Maybe<SizePropertyEnum>;
  /** The placement of the labels for the subfields within the group. This setting controls all of the subfields, they cannot be set individually. They may be aligned above or below the inputs. If this property is not set, the “Sub-Label Placement” setting on the Form Settings-&gt;Form Layout page is used. If no setting is specified, the default is above inputs. */
  subLabelPlacement?: Maybe<Scalars['String']>;
  /** The type of field to be displayed. */
  type: Scalars['String'];
  /** Date field value. */
  value?: Maybe<Scalars['String']>;
  /** Field visibility. */
  visibility?: Maybe<VisibilityPropertyEnum>;
};

/** How the DateField date is displayed */
export enum DateFieldFormatEnum {
  /** DMY format. */
  Dmy = 'DMY',
  /** MDY format. */
  Mdy = 'MDY',
}

/** Date field value. */
export type DateFieldValue = {
  __typename?: 'DateFieldValue';
  /** The value. */
  value?: Maybe<Scalars['String']>;
};

/** Date values */
export type DateInput = {
  /** Day of the month (from 1 to 31) */
  day?: Maybe<Scalars['Int']>;
  /** Month number (from 1 to 12) */
  month?: Maybe<Scalars['Int']>;
  /** 4 digit year (e.g. 2017) */
  year?: Maybe<Scalars['Int']>;
};

/** Filter the connection based on input */
export type DateQueryInput = {
  /** Nodes should be returned after this date */
  after?: Maybe<DateInput>;
  /** Nodes should be returned before this date */
  before?: Maybe<DateInput>;
  /** Column to query against */
  column?: Maybe<PostObjectsConnectionDateColumnEnum>;
  /** For after/before, whether exact value should be matched or not */
  compare?: Maybe<Scalars['String']>;
  /** Day of the month (from 1 to 31) */
  day?: Maybe<Scalars['Int']>;
  /** Hour (from 0 to 23) */
  hour?: Maybe<Scalars['Int']>;
  /** For after/before, whether exact value should be matched or not */
  inclusive?: Maybe<Scalars['Boolean']>;
  /** Minute (from 0 to 59) */
  minute?: Maybe<Scalars['Int']>;
  /** Month number (from 1 to 12) */
  month?: Maybe<Scalars['Int']>;
  /** OR or AND, how the sub-arrays should be compared */
  relation?: Maybe<RelationEnum>;
  /** Second (0 to 59) */
  second?: Maybe<Scalars['Int']>;
  /** Week of the year (from 0 to 53) */
  week?: Maybe<Scalars['Int']>;
  /** 4 digit year (e.g. 2017) */
  year?: Maybe<Scalars['Int']>;
};

/** Type of date field to display. */
export enum DateTypeEnum {
  /** A date dropdown. */
  Dropdown = 'DROPDOWN',
  /** A simple date field. */
  Field = 'FIELD',
  /** A datepicker. */
  Picker = 'PICKER',
}

/** The template assigned to the node */
export type DefaultTemplate = ContentTemplate & {
  __typename?: 'DefaultTemplate';
  /** The name of the template */
  templateName?: Maybe<Scalars['String']>;
};

/** Input for the deleteCategory mutation */
export type DeleteCategoryInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The ID of the category to delete */
  id: Scalars['ID'];
};

/** The payload for the deleteCategory mutation */
export type DeleteCategoryPayload = {
  __typename?: 'DeleteCategoryPayload';
  /** The deteted term object */
  category?: Maybe<Category>;
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The ID of the deleted object */
  deletedId?: Maybe<Scalars['ID']>;
};

/** Input for the deleteComment mutation */
export type DeleteCommentInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Whether the comment should be force deleted instead of being moved to the trash */
  forceDelete?: Maybe<Scalars['Boolean']>;
  /** The deleted comment ID */
  id: Scalars['ID'];
};

/** The payload for the deleteComment mutation */
export type DeleteCommentPayload = {
  __typename?: 'DeleteCommentPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The deleted comment object */
  comment?: Maybe<Comment>;
  /** The deleted comment ID */
  deletedId?: Maybe<Scalars['ID']>;
};

/** Input for the deleteGravityFormsDraftEntry mutation */
export type DeleteGravityFormsDraftEntryInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Resume token of the draft to delete. */
  resumeToken: Scalars['String'];
};

/** The payload for the deleteGravityFormsDraftEntry mutation */
export type DeleteGravityFormsDraftEntryPayload = {
  __typename?: 'DeleteGravityFormsDraftEntryPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Resume token of the draft that was deleted. */
  resumeToken?: Maybe<Scalars['String']>;
};

/** Input for the deleteGravityFormsEntry mutation */
export type DeleteGravityFormsEntryInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** ID of the entry to delete */
  entryId: Scalars['Int'];
};

/** The payload for the deleteGravityFormsEntry mutation */
export type DeleteGravityFormsEntryPayload = {
  __typename?: 'DeleteGravityFormsEntryPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The ID of the entry that was deleted. */
  entryId?: Maybe<Scalars['Int']>;
};

/** Input for the deleteMediaItem mutation */
export type DeleteMediaItemInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Whether the mediaItem should be force deleted instead of being moved to the trash */
  forceDelete?: Maybe<Scalars['Boolean']>;
  /** The ID of the mediaItem to delete */
  id: Scalars['ID'];
};

/** The payload for the deleteMediaItem mutation */
export type DeleteMediaItemPayload = {
  __typename?: 'DeleteMediaItemPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The ID of the deleted mediaItem */
  deletedId?: Maybe<Scalars['ID']>;
  /** The mediaItem before it was deleted */
  mediaItem?: Maybe<MediaItem>;
};

/** Input for the deletePage mutation */
export type DeletePageInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Whether the object should be force deleted instead of being moved to the trash */
  forceDelete?: Maybe<Scalars['Boolean']>;
  /** The ID of the page to delete */
  id: Scalars['ID'];
};

/** The payload for the deletePage mutation */
export type DeletePagePayload = {
  __typename?: 'DeletePagePayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The ID of the deleted object */
  deletedId?: Maybe<Scalars['ID']>;
  /** The object before it was deleted */
  page?: Maybe<Page>;
};

/** Input for the deletePostFormat mutation */
export type DeletePostFormatInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The ID of the postFormat to delete */
  id: Scalars['ID'];
};

/** The payload for the deletePostFormat mutation */
export type DeletePostFormatPayload = {
  __typename?: 'DeletePostFormatPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The ID of the deleted object */
  deletedId?: Maybe<Scalars['ID']>;
  /** The deteted term object */
  postFormat?: Maybe<PostFormat>;
};

/** Input for the deletePost mutation */
export type DeletePostInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Whether the object should be force deleted instead of being moved to the trash */
  forceDelete?: Maybe<Scalars['Boolean']>;
  /** The ID of the post to delete */
  id: Scalars['ID'];
};

/** The payload for the deletePost mutation */
export type DeletePostPayload = {
  __typename?: 'DeletePostPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The ID of the deleted object */
  deletedId?: Maybe<Scalars['ID']>;
  /** The object before it was deleted */
  post?: Maybe<Post>;
};

/** Input for the deleteTag mutation */
export type DeleteTagInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The ID of the tag to delete */
  id: Scalars['ID'];
};

/** The payload for the deleteTag mutation */
export type DeleteTagPayload = {
  __typename?: 'DeleteTagPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The ID of the deleted object */
  deletedId?: Maybe<Scalars['ID']>;
  /** The deteted term object */
  tag?: Maybe<Tag>;
};

/** Input for the deleteUser mutation */
export type DeleteUserInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The ID of the user you want to delete */
  id: Scalars['ID'];
  /** Reassign posts and links to new User ID. */
  reassignId?: Maybe<Scalars['ID']>;
};

/** The payload for the deleteUser mutation */
export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The ID of the user that you just deleted */
  deletedId?: Maybe<Scalars['ID']>;
  /** The deleted user object */
  user?: Maybe<User>;
};

/** Determines where the field description is displayed relative to the field. */
export enum DescriptionPlacementPropertyEnum {
  /** The field description is displayed above the field input (i.e. immediately after the field label) */
  Above = 'ABOVE',
  /** The field description is displayed below the field input. */
  Below = 'BELOW',
  /** The field description is inherited from the form default settings. */
  Inherit = 'INHERIT',
}

/** The discussion setting type */
export type DiscussionSettings = {
  __typename?: 'DiscussionSettings';
  /** Allow people to submit comments on new posts. */
  defaultCommentStatus?: Maybe<Scalars['String']>;
  /** Allow link notifications from other blogs (pingbacks and trackbacks) on new articles. */
  defaultPingStatus?: Maybe<Scalars['String']>;
};

/** Gravity Forms Email field. */
export type EmailField = FormField & {
  __typename?: 'EmailField';
  /** When specified, the value of this property will be used on the admin pages instead of the label. It is useful for fields with long labels. */
  adminLabel?: Maybe<Scalars['String']>;
  /** Determines if this field should only visible on the administration pages. A value of 1 will mark the field as admin only and will hide it from the public form. Useful for fields such as “status” that help with managing entries, but don’t apply to users filling out the form. */
  adminOnly?: Maybe<Scalars['Boolean']>;
  /** Determines if the field’s value can be pre-populated dynamically. 1 to allow field to be pre-populated, 0 otherwise. */
  allowsPrepopulate?: Maybe<Scalars['Boolean']>;
  /** Controls the visibility of the field based on values selected by the user. */
  conditionalLogic?: Maybe<ConditionalLogic>;
  /** String containing the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields. */
  cssClass?: Maybe<Scalars['String']>;
  /**
   * Array of the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields.
   * @deprecated Please use `cssClass` instead.
   */
  cssClassList?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Contains the default value for the field. When specified, the field&#039;s value will be populated with the contents of this property when the form is displayed. */
  defaultValue?: Maybe<Scalars['String']>;
  /** Field description. */
  description?: Maybe<Scalars['String']>;
  /** The placement of the field description. */
  descriptionPlacement?: Maybe<DescriptionPlacementPropertyEnum>;
  /** Determines whether the Confirm Email field is active. */
  emailConfirmEnabled?: Maybe<Scalars['Boolean']>;
  /** Contains the message that is displayed for fields that fail validation. */
  errorMessage?: Maybe<Scalars['String']>;
  /** The ID of the form this field belongs to. */
  formId: Scalars['Int'];
  /** Field ID. */
  id: Scalars['Int'];
  /** Assigns a name to this field so that it can be populated dynamically via this input name. Only applicable when allowsPrepopulate is set to 1. */
  inputName?: Maybe<Scalars['String']>;
  /** An array containing the the individual properties for each element of the field. */
  inputs?: Maybe<Array<Maybe<InputProperty>>>;
  /** Determines if the field requires the user to enter a value. 1 marks the field as required, 0 marks the field as not required. Fields marked as required will prevent the form from being submitted if the user has not entered a value in it. */
  isRequired?: Maybe<Scalars['Boolean']>;
  /** Field label that will be displayed on the form and on the admin pages. */
  label?: Maybe<Scalars['String']>;
  /** Determines if the field allows duplicate submissions. 1 to prevent users from submitting the same value more than once, 0 to allow duplicate values. */
  noDuplicates?: Maybe<Scalars['Boolean']>;
  /** Field placeholder. */
  placeholder?: Maybe<Scalars['String']>;
  /** Determines the size of the field when displayed on the page. */
  size?: Maybe<SizePropertyEnum>;
  /** The placement of the labels for the subfields within the group. This setting controls all of the subfields, they cannot be set individually. They may be aligned above or below the inputs. If this property is not set, the “Sub-Label Placement” setting on the Form Settings-&gt;Form Layout page is used. If no setting is specified, the default is above inputs. */
  subLabelPlacement?: Maybe<Scalars['String']>;
  /** The type of field to be displayed. */
  type: Scalars['String'];
  /** Email field value. */
  value?: Maybe<Scalars['String']>;
  /** Field visibility. */
  visibility?: Maybe<VisibilityPropertyEnum>;
};

/** Email field value. */
export type EmailFieldValue = {
  __typename?: 'EmailFieldValue';
  /** The value. */
  value?: Maybe<Scalars['String']>;
};

/** Input fields for a single checkbox. */
export type EmailInput = {
  /** Email confirmation input value. Only used when email confirmation is enabled. */
  confirmationValue?: Maybe<Scalars['String']>;
  /** Email input value */
  value?: Maybe<Scalars['String']>;
};

/** Asset enqueued by the CMS */
export type EnqueuedAsset = {
  /** @todo */
  args?: Maybe<Scalars['Boolean']>;
  /** Dependencies needed to use this asset */
  dependencies?: Maybe<Array<Maybe<EnqueuedScript>>>;
  /** Extra information needed for the script */
  extra?: Maybe<Scalars['String']>;
  /** The handle of the enqueued asset */
  handle?: Maybe<Scalars['String']>;
  /** The ID of the enqueued asset */
  id: Scalars['ID'];
  /** The source of the asset */
  src?: Maybe<Scalars['String']>;
  /** The version of the enqueued asset */
  version?: Maybe<Scalars['String']>;
};

/** Script enqueued by the CMS */
export type EnqueuedScript = Node &
  EnqueuedAsset & {
    __typename?: 'EnqueuedScript';
    /** @todo */
    args?: Maybe<Scalars['Boolean']>;
    /** Dependencies needed to use this asset */
    dependencies?: Maybe<Array<Maybe<EnqueuedScript>>>;
    /** Extra information needed for the script */
    extra?: Maybe<Scalars['String']>;
    /** The handle of the enqueued asset */
    handle?: Maybe<Scalars['String']>;
    /** The globally unique ID for the object */
    id: Scalars['ID'];
    /** The source of the asset */
    src?: Maybe<Scalars['String']>;
    /** The version of the enqueued asset */
    version?: Maybe<Scalars['String']>;
  };

/** Stylesheet enqueued by the CMS */
export type EnqueuedStylesheet = Node &
  EnqueuedAsset & {
    __typename?: 'EnqueuedStylesheet';
    /** @todo */
    args?: Maybe<Scalars['Boolean']>;
    /** Dependencies needed to use this asset */
    dependencies?: Maybe<Array<Maybe<EnqueuedScript>>>;
    /** Extra information needed for the script */
    extra?: Maybe<Scalars['String']>;
    /** The handle of the enqueued asset */
    handle?: Maybe<Scalars['String']>;
    /** The globally unique ID for the object */
    id: Scalars['ID'];
    /** The source of the asset */
    src?: Maybe<Scalars['String']>;
    /** The version of the enqueued asset */
    version?: Maybe<Scalars['String']>;
  };

/** Date Filters input fields for Entries queries. */
export type EntriesDateFiltersInput = {
  /** End date in Y-m-d H:i:s format. */
  endDate?: Maybe<Scalars['String']>;
  /** Start date in Y-m-d H:i:s format. */
  startDate?: Maybe<Scalars['String']>;
};

/** Field Filters input fields for Entries queries. */
export type EntriesFieldFiltersInput = {
  /** The field value(s) to filter by. Must be boolean values. If using this field, do not also use stringValues, intValues or floatValues. */
  boolValues?: Maybe<Array<Maybe<Scalars['Boolean']>>>;
  /** The field value(s) to filter by. Must be float values. If using this field, do not also use stringValues, intValues or boolValues. */
  floatValues?: Maybe<Array<Maybe<Scalars['Float']>>>;
  /** The field value(s) to filter by. Must be integer values. If using this field, do not also use stringValues, floatValues or boolValues. */
  intValues?: Maybe<Array<Maybe<Scalars['Int']>>>;
  /** The ID of the field to filter by. Use "0" to search all keys. You can also use the names of the columns in Gravity Forms' database table for entries, such as "date_created", "is_read, "created_by", etc. */
  key?: Maybe<Scalars['String']>;
  /** The operator to use for filtering. */
  operator?: Maybe<FieldFiltersOperatorInputEnum>;
  /** The field value(s) to filter by. Must be string values. If using this field, do not also use intValues, floatValues or boolValues. */
  stringValues?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** Sorting input fields for Entries queries. */
export type EntriesSortingInput = {
  /** The sorting direction. */
  direction?: Maybe<SortingInputEnum>;
  /** Whether the sorting field's values are numeric. */
  isNumeric?: Maybe<Scalars['Boolean']>;
  /** The key of the field to sort by. */
  key?: Maybe<Scalars['String']>;
};

/** The Gravity Forms form associated with the entry. */
export type EntryForm = {
  __typename?: 'EntryForm';
  /** The Gravity Forms form associated with the entry. */
  node?: Maybe<GravityFormsForm>;
};

/** Status of entries to get. Default is ACTIVE. */
export enum EntryStatusEnum {
  /** Active entries (default). */
  Active = 'ACTIVE',
  /** All entries. */
  All = 'ALL',
  /** Spam entries */
  Spam = 'SPAM',
  /** Entries in the trash. */
  Trash = 'TRASH',
}

/** The user who created the entry. */
export type EntryUser = {
  __typename?: 'EntryUser';
  /** The user who created the entry. */
  node?: Maybe<User>;
};

/** Field error. */
export type FieldError = {
  __typename?: 'FieldError';
  /** The field with the associated error message */
  id?: Maybe<Scalars['Float']>;
  /** Error message. */
  message?: Maybe<Scalars['String']>;
};

/** Whether to filter by ALL or ANY of the field filters. Default is ALL. */
export enum FieldFiltersModeEnum {
  /** All field filters (default). */
  All = 'ALL',
  /** Any field filters */
  Any = 'ANY',
}

/** The operator to use for filtering. */
export enum FieldFiltersOperatorInputEnum {
  /** Find field values that contain the value in the values array. Only the first value in the values array will be used; any others will be disregarded. */
  Contains = 'CONTAINS',
  /** Find field values that are greater than the value in the values array. Only the first value in the values array will be used; any others will be disregarded. */
  GreaterThan = 'GREATER_THAN',
  /** Find field values that match those in the values array (default). */
  In = 'IN',
  /** Find field values that are less than the value in the values array. Only the first value in the values array will be used; any others will be disregarded. */
  LessThan = 'LESS_THAN',
  /** Find field values that do NOT match those in the values array. */
  NotIn = 'NOT_IN',
}

/** Input fields for address field. */
export type FieldValuesInput = {
  /** The form field values for Address fields. */
  addressValues?: Maybe<AddressInput>;
  /** The form field values for ChainedSelect fields */
  chainedSelectValues?: Maybe<Array<Maybe<ChainedSelectInput>>>;
  /** The form field values for Checkbox fields */
  checkboxValues?: Maybe<Array<Maybe<CheckboxInput>>>;
  /** The form field values for Email fields. */
  emailValues?: Maybe<EmailInput>;
  /** The field id. */
  id: Scalars['Int'];
  /** The form field values for List fields */
  listValues?: Maybe<Array<Maybe<ListInput>>>;
  /** The form field values for Name fields */
  nameValues?: Maybe<NameInput>;
  /** The form field values for basic fields */
  value?: Maybe<Scalars['String']>;
  /** The form field values for fields that accept multiple string values. Used by MultiSelect, Post Category, Post Custom, and Post Tags fields. */
  values?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** Gravity Forms File Upload field. */
export type FileUploadField = FormField & {
  __typename?: 'FileUploadField';
  /** When specified, the value of this property will be used on the admin pages instead of the label. It is useful for fields with long labels. */
  adminLabel?: Maybe<Scalars['String']>;
  /** Determines if this field should only visible on the administration pages. A value of 1 will mark the field as admin only and will hide it from the public form. Useful for fields such as “status” that help with managing entries, but don’t apply to users filling out the form. */
  adminOnly?: Maybe<Scalars['Boolean']>;
  /** A comma-delimited list of the file extensions which may be uploaded. */
  allowedExtensions?: Maybe<Scalars['String']>;
  /**
   * Determines if the field’s value can be pre-populated dynamically. 1 to allow field to be pre-populated, 0 otherwise.
   * @deprecated This property is not associated with the Gravity Forms FileUploadField type.
   */
  allowsPrepopulate?: Maybe<Scalars['Boolean']>;
  /** Controls the visibility of the field based on values selected by the user. */
  conditionalLogic?: Maybe<ConditionalLogic>;
  /** String containing the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields. */
  cssClass?: Maybe<Scalars['String']>;
  /**
   * Array of the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields.
   * @deprecated Please use `cssClass` instead.
   */
  cssClassList?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Field description. */
  description?: Maybe<Scalars['String']>;
  /** The placement of the field description. */
  descriptionPlacement?: Maybe<DescriptionPlacementPropertyEnum>;
  /** Contains the message that is displayed for fields that fail validation. */
  errorMessage?: Maybe<Scalars['String']>;
  /** The ID of the form this field belongs to. */
  formId: Scalars['Int'];
  /** Field ID. */
  id: Scalars['Int'];
  /**
   * Assigns a name to this field so that it can be populated dynamically via this input name. Only applicable when allowsPrepopulate is set to 1.
   * @deprecated This property is not associated with the Gravity Forms FileUploadField type.
   */
  inputName?: Maybe<Scalars['String']>;
  /** Determines if the field requires the user to enter a value. 1 marks the field as required, 0 marks the field as not required. Fields marked as required will prevent the form from being submitted if the user has not entered a value in it. */
  isRequired?: Maybe<Scalars['Boolean']>;
  /** Field label that will be displayed on the form and on the admin pages. */
  label?: Maybe<Scalars['String']>;
  /** The maximum size (in MB) an uploaded file may be . */
  maxFileSize?: Maybe<Scalars['Int']>;
  /** When the field is set to allow multiple files to be uploaded, this property is available to set a limit on how many may be uploaded. */
  maxFiles?: Maybe<Scalars['String']>;
  /** Indicates whether multiple files may be uploaded. */
  multipleFiles?: Maybe<Scalars['Boolean']>;
  /** Determines the size of the field when displayed on the page. */
  size?: Maybe<SizePropertyEnum>;
  /** The type of field to be displayed. */
  type: Scalars['String'];
  /** FileUpload field value. */
  value?: Maybe<Scalars['String']>;
  /** Field visibility. */
  visibility?: Maybe<VisibilityPropertyEnum>;
};

/** File upload field value. */
export type FileUploadFieldValue = {
  __typename?: 'FileUploadFieldValue';
  /**
   * URL to the uploaded file.
   * @deprecated Please use `value` instead.
   */
  url?: Maybe<Scalars['String']>;
  /** URL to the uploaded file. */
  value?: Maybe<Scalars['String']>;
};

/** Properties for all the email notifications which exist for a form. */
export type FormConfirmation = {
  __typename?: 'FormConfirmation';
  /** ID. */
  id?: Maybe<Scalars['String']>;
  /** Whether this is the default confirmation. */
  isDefault?: Maybe<Scalars['Boolean']>;
  /** Contains the confirmation message that will be displayed. Only applicable when type is set to &quot;MESSAGE&quot;. */
  message?: Maybe<Scalars['String']>;
  /** Name. */
  name?: Maybe<Scalars['String']>;
  /** Contains the Id of the WordPress page that the browser will be redirected to. Only applicable when type is set to &quot;PAGE&quot;. */
  pageId?: Maybe<Scalars['Int']>;
  /** Contains the query string to be appended to the redirection url. Only applicable when type is set to redirect. */
  queryString?: Maybe<Scalars['String']>;
  /** Determines the type of confirmation to be used. */
  type?: Maybe<ConfirmationTypeEnum>;
  /** Contains the URL that the browser will be redirected to. Only applicable when type is set to &quot;REDIRECT&quot;. */
  url?: Maybe<Scalars['String']>;
};

/** Determines where the field description is displayed relative to the field. */
export enum FormDescriptionPlacementEnum {
  /** The field description is displayed above the field input (i.e. immediately after the field label) */
  Above = 'ABOVE',
  /** The field description is displayed below the field input. */
  Below = 'BELOW',
}

/** Gravity Forms field */
export type FormField = {
  /** Controls the visibility of the field based on values selected by the user. */
  conditionalLogic?: Maybe<ConditionalLogic>;
  /** String containing the custom CSS classes to be added to the <li> tag that contains the field. Useful for applying custom formatting to specific fields. */
  cssClass?: Maybe<Scalars['String']>;
  /**
   * Array of the custom CSS classes to be added to the <li> tag that contains the field. Useful for applying custom formatting to specific fields.
   * @deprecated Please use `cssClass` instead.
   */
  cssClassList?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** The ID of the form this field belongs to. */
  formId: Scalars['Int'];
  /** Field ID. */
  id: Scalars['Int'];
  databaseId: Scalars['Int'];
  /** The type of field to be displayed. */
  type: Scalars['String'];
};

/** Determines where the field labels should be placed in relation to the field. */
export enum FormLabelPlacementEnum {
  /** Field labels are displayed beside the fields and aligned to the left. */
  Left = 'LEFT',
  /** Field labels are displayed beside the fields and aligned to the right. */
  Right = 'RIGHT',
  /** Field labels are displayed on top of the fields. */
  Top = 'TOP',
}

/** When limitEntries is set to 1, this property specifies the time period during which submissions are allowed. */
export enum FormLimitEntriesPeriodEnum {
  /** Limit entries by "day". */
  Day = 'DAY',
  /** Limit entries by "month". */
  Month = 'MONTH',
  /** Limit entries by "week". */
  Week = 'WEEK',
  /** Limit entries by "year". */
  Year = 'YEAR',
}

/** Properties for all the email notifications which exist for a form. */
export type FormNotification = {
  __typename?: 'FormNotification';
  /** The email or merge tags to be used as the email bcc address. */
  bcc?: Maybe<Scalars['String']>;
  /** An associative array containing the conditional logic rules. See the Conditional Logic Object for more details. */
  conditionalLogic?: Maybe<ConditionalLogic>;
  /** Determines if the email message should be formatted so that paragraphs are automatically added for new lines. Default is false (auto-formatting enabled). */
  disableAutoformat?: Maybe<Scalars['Boolean']>;
  /** Determines if files uploaded on the form should be included when the notification is sent. */
  enableAttachments?: Maybe<Scalars['Boolean']>;
  /** The notification event. Default is form_submission. */
  event?: Maybe<Scalars['String']>;
  /** The email or merge tag to be used as the email from address. */
  from?: Maybe<Scalars['String']>;
  /** The text or merge tag to be used as the email from name. */
  fromName?: Maybe<Scalars['String']>;
  /** The notification ID. A 13 character unique ID. */
  id?: Maybe<Scalars['String']>;
  /** Is the notification active or inactive. The default is true (active). */
  isActive?: Maybe<Scalars['Boolean']>;
  /** The email body/content. Merge tags supported. */
  message?: Maybe<Scalars['String']>;
  /** The notification name. */
  name?: Maybe<Scalars['String']>;
  /** The email or merge tags to be used as the email reply to address. */
  replyTo?: Maybe<Scalars['String']>;
  /** Routing rules. */
  routing?: Maybe<Array<Maybe<FormNotificationRouting>>>;
  /** The name of the service to be used when sending this notification. Default is wordpress. */
  service?: Maybe<Scalars['String']>;
  /** The email subject line. Merge tags supported. */
  subject?: Maybe<Scalars['String']>;
  /** The ID of an email field, an email address or merge tag to be used as the email to address. */
  to?: Maybe<Scalars['String']>;
  /** Identifies what to use for the notification &quot;to&quot;. */
  toType?: Maybe<NotificationToTypeEnum>;
};

/** Properties for all the email notifications which exist for a form. */
export type FormNotificationRouting = {
  __typename?: 'FormNotificationRouting';
  /** The email or merge tag to be used as the email To address if this rule is a match. */
  email?: Maybe<Scalars['String']>;
  /** Target field ID. The field that will have it’s value compared with the value property to determine if this rule is a match. */
  fieldId?: Maybe<Scalars['Int']>;
  /** Operator to be used when evaluating this rule. */
  operator?: Maybe<RuleOperatorEnum>;
  /** The value to compare with the field specified by fieldId. */
  value?: Maybe<Scalars['String']>;
};

/** Gravity Forms form pagination data. */
export type FormPagination = {
  __typename?: 'FormPagination';
  /** Progress bar background color. Can be any CSS color value. Only applies when &quot;style&quot; is set to &quot;CUSTOM&quot;. */
  backgroundColor?: Maybe<Scalars['String']>;
  /** Progress bar text color. Can be any CSS color value. Only applies when &quot;style&quot; is set to &quot;CUSTOM&quot;. */
  color?: Maybe<Scalars['String']>;
  /** Whether the confirmation bar should be displayed with the confirmation text. */
  displayProgressbarOnConfirmation?: Maybe<Scalars['Boolean']>;
  /** Names of the form&#039;s pages. */
  pages?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** The confirmation text to display once the end of the progress bar has been reached. Only applies when displayProgressbarOnConfirmation is set to true. */
  progressbarCompletionText?: Maybe<Scalars['String']>;
  /** Style of progress bar. */
  style?: Maybe<PageProgressStyleEnum>;
  /** Type of progress indicator. */
  type?: Maybe<PageProgressTypeEnum>;
};

/** Status of forms to get. Default is ACTIVE. */
export enum FormStatusEnum {
  /** Active forms (default). */
  Active = 'ACTIVE',
  /** Inactive forms */
  Inactive = 'INACTIVE',
  /** Inactive forms in the trash. */
  InactiveTrashed = 'INACTIVE_TRASHED',
  /** Active forms in the trash. */
  Trashed = 'TRASHED',
}

/** Determines how sub-labels are aligned. */
export enum FormSubLabelPlacementEnum {
  /** The sub-label is displayed above the sub-field input (i.e. immediately after the field label) */
  Above = 'ABOVE',
  /** The sub-label is displayed below the sub-field input. */
  Below = 'BELOW',
}

/** The general setting type */
export type GeneralSettings = {
  __typename?: 'GeneralSettings';
  /** A date format for all date strings. */
  dateFormat?: Maybe<Scalars['String']>;
  /** Site tagline. */
  description?: Maybe<Scalars['String']>;
  /** This address is used for admin purposes, like new user notification. */
  email?: Maybe<Scalars['String']>;
  /** WordPress locale code. */
  language?: Maybe<Scalars['String']>;
  /** A day number of the week that the week should start on. */
  startOfWeek?: Maybe<Scalars['Int']>;
  /** A time format for all time strings. */
  timeFormat?: Maybe<Scalars['String']>;
  /** A city in the same timezone as you. */
  timezone?: Maybe<Scalars['String']>;
  /** Site title. */
  title?: Maybe<Scalars['String']>;
  /** Site URL. */
  url?: Maybe<Scalars['String']>;
};

/** Gravity Forms entry. */
export type GravityFormsEntry = {
  __typename?: 'GravityFormsEntry';
  /** The user who created the entry. */
  createdBy?: Maybe<EntryUser>;
  /** ID of the user that submitted of the form if a logged in user submitted the form. */
  createdById?: Maybe<Scalars['Int']>;
  /** The date and time that the entry was created, in the format &quot;yyyy-mm-dd hh:mi:ss&quot; (i.e. 2010-07-15 17:26:58). */
  dateCreated?: Maybe<Scalars['String']>;
  /** The date and time that the entry was updated, in the format &quot;yyyy-mm-dd hh:mi:ss&quot; (i.e. 2010-07-15 17:26:58). */
  dateUpdated?: Maybe<Scalars['String']>;
  /** The entry ID. Returns null for draft entries. */
  entryId?: Maybe<Scalars['Int']>;
  /** The Gravity Forms form associated with the entry. */
  form?: Maybe<EntryForm>;
  /** Connection between the GravityFormsEntry type and the FormField type */
  formFields?: Maybe<GravityFormsEntryToFormFieldConnection>;
  /** The ID of the form that was submitted to generate this entry. */
  formId?: Maybe<Scalars['Int']>;
  /** Unique global ID for the object. */
  id: Scalars['ID'];
  /** Client IP of user who submitted the form. */
  ip?: Maybe<Scalars['String']>;
  /** Whether the entry is a draft. */
  isDraft?: Maybe<Scalars['Boolean']>;
  /** Indicates if the entry has been read. 1 for entries that are read and 0 for entries that have not been read. */
  isRead?: Maybe<Scalars['Boolean']>;
  /** Indicates if the entry has been starred (i.e marked with a star). 1 for entries that are starred and 0 for entries that are not starred. */
  isStarred?: Maybe<Scalars['Boolean']>;
  /** For forms with Post fields, this property contains the Id of the Post that was created. */
  postId?: Maybe<Scalars['Int']>;
  /** The resume token. Only applies to draft entries. */
  resumeToken?: Maybe<Scalars['String']>;
  /** Source URL of page that contained the form when it was submitted. */
  sourceUrl?: Maybe<Scalars['String']>;
  /** The current status of the entry. */
  status?: Maybe<EntryStatusEnum>;
  /** Provides the name and version of both the browser and operating system from which the entry was submitted. */
  userAgent?: Maybe<Scalars['String']>;
};

/** Gravity Forms entry. */
export type GravityFormsEntryFormFieldsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

/** Connection between the GravityFormsEntry type and the FormField type */
export type GravityFormsEntryToFormFieldConnection = {
  __typename?: 'GravityFormsEntryToFormFieldConnection';
  /** Edges for the GravityFormsEntryToFormFieldConnection connection */
  edges?: Maybe<Array<Maybe<GravityFormsEntryToFormFieldConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<FormField>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type GravityFormsEntryToFormFieldConnectionEdge = {
  __typename?: 'GravityFormsEntryToFormFieldConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /**
   * Field value.
   * @deprecated Please use `formFields.nodes.value` instead.
   */
  fieldValue?: Maybe<ObjectFieldValueUnion>;
  /** The item at the end of the edge */
  node?: Maybe<FormField>;
};

/** Gravity Forms form. */
export type GravityFormsForm = {
  __typename?: 'GravityFormsForm';
  /** Contains the form button settings such as the button text or image button source. */
  button?: Maybe<Button>;
  /** Contains the form confirmation settings such as confirmation text or redirect URL */
  confirmations?: Maybe<Array<Maybe<FormConfirmation>>>;
  /** String containing the custom CSS classes to be added to the &lt;form&gt; tag. */
  cssClass?: Maybe<Scalars['String']>;
  /**
   * Array of the custom CSS classes to be added to the &lt;form&gt; tag.
   * @deprecated Please use `cssClass` instead.
   */
  cssClassList?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** The date the form was created in this format: YYYY-MM-DD HH:mm:ss. */
  dateCreated?: Maybe<Scalars['String']>;
  /** Form description. */
  description?: Maybe<Scalars['String']>;
  /** Determines if the field description is displayed above the field input (i.e. immediately after the field label) or below the field input. */
  descriptionPlacement?: Maybe<FormDescriptionPlacementEnum>;
  /** When enabled, conditional logic hide/show operation will be performed with a jQuery slide animation. Only applicable to forms with conditional logic. */
  enableAnimation?: Maybe<Scalars['Boolean']>;
  /** Specifies if the form has the Honeypot spam-protection feature. */
  enableHoneypot?: Maybe<Scalars['Boolean']>;
  /** Connection between the GravityFormsForm type and the GravityFormsEntry type */
  entries?: Maybe<GravityFormsFormToGravityFormsEntryConnection>;
  /** CSS class for the first page. */
  firstPageCssClass?: Maybe<Scalars['String']>;
  /** Connection between the GravityFormsForm type and the FormField type */
  formFields?: Maybe<GravityFormsFormToFormFieldConnection>;
  /** Form ID. */
  formId?: Maybe<Scalars['Int']>;
  /** Unique global ID for the object. */
  id: Scalars['ID'];
  /** Determines whether the form is active. */
  isActive?: Maybe<Scalars['Boolean']>;
  /** Determines whether the form is in the trash. */
  isTrash?: Maybe<Scalars['Boolean']>;
  /** Determines where the field labels should be placed in relation to the field. */
  labelPlacement?: Maybe<FormLabelPlacementEnum>;
  /** Last page button data. */
  lastPageButton?: Maybe<LastPageButton>;
  /** Specifies if this form has a limit on the number of submissions. 1 if the form limits submissions, 0 otherwise. */
  limitEntries?: Maybe<Scalars['Boolean']>;
  /** When limitEntries is set to 1, this property specifies the number of submissions allowed. */
  limitEntriesCount?: Maybe<Scalars['Int']>;
  /** Message that will be displayed when the maximum number of submissions have been reached. */
  limitEntriesMessage?: Maybe<Scalars['String']>;
  /** When limitEntries is set to 1, this property specifies the time period during which submissions are allowed. */
  limitEntriesPeriod?: Maybe<FormLimitEntriesPeriodEnum>;
  /** The ID to assign to the next field that is added to the form. */
  nextFieldId?: Maybe<Scalars['Int']>;
  /** The properties for all the email notifications which exist for a form. */
  notifications?: Maybe<Array<Maybe<FormNotification>>>;
  /** Pagination data. */
  pagination?: Maybe<FormPagination>;
  /** When useCurrentUserAsAuthor is set to 0, this property contains the user Id that will be used as the Post author. */
  postAuthor?: Maybe<Scalars['Int']>;
  /** Form forms with Post fields, but without a Post Category field, this property determines the default category that the post will be associated with when created. */
  postCategory?: Maybe<Scalars['Int']>;
  /** Template to be used when creating the post content. Field variables (i.e. {Name:3} ) can be added to the template to insert user submitted values into the post content. Only applicable when postContentTemplateEnabled is true. */
  postContentTemplate?: Maybe<Scalars['String']>;
  /** Determines if the post template functionality is enabled. When enabled, the post content will be created based on the template specified by postContentTemplate. */
  postContentTemplateEnabled?: Maybe<Scalars['Boolean']>;
  /** For forms with Post fields, determines the format that the Post should be created with. */
  postFormat?: Maybe<Scalars['String']>;
  /** For forms with Post fields, determines the status that the Post should be created with. */
  postStatus?: Maybe<Scalars['String']>;
  /** Template to be used when creating the post title. Field variables (i.e. {Name:3} ) can be added to the template to insert user submitted values into the post title. Only applicable when postTitleTemplateEnabled is true */
  postTitleTemplate?: Maybe<Scalars['String']>;
  /** Determines if the post title template functionality is enabled. When enabled, the post title will be created based on the template specified by postTitleTemplate. */
  postTitleTemplateEnabled?: Maybe<Scalars['Boolean']>;
  /** Whether the form is configured to be displayed only to logged in users. */
  requireLogin?: Maybe<Scalars['Boolean']>;
  /** When requireLogin is set to true, this controls the message displayed when non-logged in user tries to access the form. */
  requireLoginMessage?: Maybe<Scalars['String']>;
  /** &quot;Save and Continue&quot; data. */
  save?: Maybe<SaveAndContinue>;
  /** Date in the format (mm/dd/yyyy) that the form will become inactive/hidden. */
  scheduleEnd?: Maybe<Scalars['String']>;
  /** &quot;am? or &quot;pm?. Applies to scheduleEndHour */
  scheduleEndAmpm?: Maybe<Scalars['String']>;
  /** Hour (1 to 12) that the form will become inactive/hidden. */
  scheduleEndHour?: Maybe<Scalars['Int']>;
  /** Minute that the form will become inactive/hidden. */
  scheduleEndMinute?: Maybe<Scalars['Int']>;
  /** Specifies if this form is scheduled to be displayed only during a certain configured date/time. */
  scheduleForm?: Maybe<Scalars['Boolean']>;
  /** Message to be displayed when form is no longer available */
  scheduleMessage?: Maybe<Scalars['String']>;
  /** Message to be displayed when form is not yet available. */
  schedulePendingMessage?: Maybe<Scalars['String']>;
  /** Date in the format (mm/dd/yyyy) that the form will become active/visible. */
  scheduleStart?: Maybe<Scalars['String']>;
  /** &quot;am&quot; or &quot;pm&quot;. Applies to scheduleStartHour */
  scheduleStartAmpm?: Maybe<Scalars['String']>;
  /** Hour (1 to 12) that the form will become active/visible. */
  scheduleStartHour?: Maybe<Scalars['Int']>;
  /** Minute that the form will become active/visible. */
  scheduleStartMinute?: Maybe<Scalars['Int']>;
  /** How sub-labels are aligned. */
  subLabelPlacement?: Maybe<FormSubLabelPlacementEnum>;
  /** Form title. */
  title?: Maybe<Scalars['String']>;
  /** For forms with Post fields, this determines if the post should be created using the current logged in user as the author. 1 to use the current user, 0 otherwise. */
  useCurrentUserAsAuthor?: Maybe<Scalars['Boolean']>;
};

/** Gravity Forms form. */
export type GravityFormsFormEntriesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

/** Gravity Forms form. */
export type GravityFormsFormFormFieldsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

/** Connection between the GravityFormsForm type and the FormField type */
export type GravityFormsFormToFormFieldConnection = {
  __typename?: 'GravityFormsFormToFormFieldConnection';
  /** Edges for the GravityFormsFormToFormFieldConnection connection */
  edges?: Maybe<Array<Maybe<GravityFormsFormToFormFieldConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<FormField>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type GravityFormsFormToFormFieldConnectionEdge = {
  __typename?: 'GravityFormsFormToFormFieldConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<FormField>;
};

/** Connection between the GravityFormsForm type and the GravityFormsEntry type */
export type GravityFormsFormToGravityFormsEntryConnection = {
  __typename?: 'GravityFormsFormToGravityFormsEntryConnection';
  /** Edges for the GravityFormsFormToGravityFormsEntryConnection connection */
  edges?: Maybe<Array<Maybe<GravityFormsFormToGravityFormsEntryConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<GravityFormsEntry>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type GravityFormsFormToGravityFormsEntryConnectionEdge = {
  __typename?: 'GravityFormsFormToGravityFormsEntryConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<GravityFormsEntry>;
};

/** Gravity Forms Hidden field. */
export type HiddenField = FormField & {
  __typename?: 'HiddenField';
  /**
   * When specified, the value of this property will be used on the admin pages instead of the label. It is useful for fields with long labels.
   * @deprecated This property is not associated with the Gravity Forms HiddenField type.
   */
  adminLabel?: Maybe<Scalars['String']>;
  /**
   * Determines if this field should only visible on the administration pages. A value of 1 will mark the field as admin only and will hide it from the public form. Useful for fields such as “status” that help with managing entries, but don’t apply to users filling out the form.
   * @deprecated This property is not associated with the Gravity Forms HiddenField type.
   */
  adminOnly?: Maybe<Scalars['Boolean']>;
  /** Determines if the field’s value can be pre-populated dynamically. 1 to allow field to be pre-populated, 0 otherwise. */
  allowsPrepopulate?: Maybe<Scalars['Boolean']>;
  /** Controls the visibility of the field based on values selected by the user. */
  conditionalLogic?: Maybe<ConditionalLogic>;
  /** String containing the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields. */
  cssClass?: Maybe<Scalars['String']>;
  /**
   * Array of the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields.
   * @deprecated Please use `cssClass` instead.
   */
  cssClassList?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Contains the default value for the field. When specified, the field&#039;s value will be populated with the contents of this property when the form is displayed. */
  defaultValue?: Maybe<Scalars['String']>;
  /** The ID of the form this field belongs to. */
  formId: Scalars['Int'];
  /** Field ID. */
  id: Scalars['Int'];
  /** Assigns a name to this field so that it can be populated dynamically via this input name. Only applicable when allowsPrepopulate is set to 1. */
  inputName?: Maybe<Scalars['String']>;
  /**
   * Determines if the field requires the user to enter a value. 1 marks the field as required, 0 marks the field as not required. Fields marked as required will prevent the form from being submitted if the user has not entered a value in it.
   * @deprecated This property is not associated with the Gravity Forms HiddenField type.
   */
  isRequired?: Maybe<Scalars['Boolean']>;
  /** Field label that will be displayed on the form and on the admin pages. */
  label?: Maybe<Scalars['String']>;
  /**
   * Determines if the field allows duplicate submissions. 1 to prevent users from submitting the same value more than once, 0 to allow duplicate values.
   * @deprecated This property is not associated with the Gravity Forms HiddenField type.
   */
  noDuplicates?: Maybe<Scalars['Boolean']>;
  /** Determines the size of the field when displayed on the page. */
  size?: Maybe<SizePropertyEnum>;
  /** The type of field to be displayed. */
  type: Scalars['String'];
  /** Hidden field value. */
  value?: Maybe<Scalars['String']>;
  /**
   * Field visibility.
   * @deprecated This property is not associated with the Gravity Forms HiddenField type.
   */
  visibility?: Maybe<VisibilityPropertyEnum>;
};

/** Hidden field value. */
export type HiddenFieldValue = {
  __typename?: 'HiddenFieldValue';
  /** The value. */
  value?: Maybe<Scalars['String']>;
};

/** Content node with hierarchical (parent/child) relationships */
export type HierarchicalContentNode = {
  /** Returns ancestors of the node. Default ordered as lowest (closest to the child) to highest (closest to the root). */
  ancestors?: Maybe<HierarchicalContentNodeToContentNodeAncestorsConnection>;
  /** Connection between the HierarchicalContentNode type and the ContentNode type */
  children?: Maybe<HierarchicalContentNodeToContentNodeChildrenConnection>;
  /** The parent of the node. The parent object can be of various types */
  parent?: Maybe<HierarchicalContentNodeToParentContentNodeConnectionEdge>;
  /** Database id of the parent node */
  parentDatabaseId?: Maybe<Scalars['Int']>;
  /** The globally unique identifier of the parent node. */
  parentId?: Maybe<Scalars['ID']>;
};

/** Content node with hierarchical (parent/child) relationships */
export type HierarchicalContentNodeAncestorsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<HierarchicalContentNodeToContentNodeAncestorsConnectionWhereArgs>;
};

/** Content node with hierarchical (parent/child) relationships */
export type HierarchicalContentNodeChildrenArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<HierarchicalContentNodeToContentNodeChildrenConnectionWhereArgs>;
};

/** Connection between the HierarchicalContentNode type and the ContentNode type */
export type HierarchicalContentNodeToContentNodeAncestorsConnection = {
  __typename?: 'HierarchicalContentNodeToContentNodeAncestorsConnection';
  /** Edges for the HierarchicalContentNodeToContentNodeAncestorsConnection connection */
  edges?: Maybe<Array<Maybe<HierarchicalContentNodeToContentNodeAncestorsConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ContentNode>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type HierarchicalContentNodeToContentNodeAncestorsConnectionEdge = {
  __typename?: 'HierarchicalContentNodeToContentNodeAncestorsConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<ContentNode>;
};

/** Arguments for filtering the HierarchicalContentNodeToContentNodeAncestorsConnection connection */
export type HierarchicalContentNodeToContentNodeAncestorsConnectionWhereArgs = {
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>;
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>;
  /** Title of the object */
  title?: Maybe<Scalars['String']>;
};

/** Connection between the HierarchicalContentNode type and the ContentNode type */
export type HierarchicalContentNodeToContentNodeChildrenConnection = {
  __typename?: 'HierarchicalContentNodeToContentNodeChildrenConnection';
  /** Edges for the HierarchicalContentNodeToContentNodeChildrenConnection connection */
  edges?: Maybe<Array<Maybe<HierarchicalContentNodeToContentNodeChildrenConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ContentNode>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type HierarchicalContentNodeToContentNodeChildrenConnectionEdge = {
  __typename?: 'HierarchicalContentNodeToContentNodeChildrenConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<ContentNode>;
};

/** Arguments for filtering the HierarchicalContentNodeToContentNodeChildrenConnection connection */
export type HierarchicalContentNodeToContentNodeChildrenConnectionWhereArgs = {
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>;
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>;
  /** Title of the object */
  title?: Maybe<Scalars['String']>;
};

/** Connection between the HierarchicalContentNode type and the ContentNode type */
export type HierarchicalContentNodeToParentContentNodeConnectionEdge = {
  __typename?: 'HierarchicalContentNodeToParentContentNodeConnectionEdge';
  /** The nodes of the connection, without the edges */
  node?: Maybe<ContentNode>;
};

/** Term node with hierarchical (parent/child) relationships */
export type HierarchicalTermNode = {
  /** Database id of the parent node */
  parentDatabaseId?: Maybe<Scalars['Int']>;
  /** The globally unique identifier of the parent node. */
  parentId?: Maybe<Scalars['ID']>;
};

/** Gravity Forms HTML field. */
export type HtmlField = FormField & {
  __typename?: 'HtmlField';
  /**
   * When specified, the value of this property will be used on the admin pages instead of the label. It is useful for fields with long labels.
   * @deprecated This property is not associated with the Gravity Forms HtmlField type.
   */
  adminLabel?: Maybe<Scalars['String']>;
  /**
   * Determines if this field should only visible on the administration pages. A value of 1 will mark the field as admin only and will hide it from the public form. Useful for fields such as “status” that help with managing entries, but don’t apply to users filling out the form.
   * @deprecated This property is not associated with the Gravity Forms HtmlField type.
   */
  adminOnly?: Maybe<Scalars['Boolean']>;
  /**
   * Determines if the field’s value can be pre-populated dynamically. 1 to allow field to be pre-populated, 0 otherwise.
   * @deprecated This property is not associated with the Gravity Forms HtmlField type.
   */
  allowsPrepopulate?: Maybe<Scalars['Boolean']>;
  /** Controls the visibility of the field based on values selected by the user. */
  conditionalLogic?: Maybe<ConditionalLogic>;
  /** Content of an HTML block field to be displayed on the form. */
  content?: Maybe<Scalars['String']>;
  /** String containing the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields. */
  cssClass?: Maybe<Scalars['String']>;
  /**
   * Array of the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields.
   * @deprecated Please use `cssClass` instead.
   */
  cssClassList?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Indicates whether the default margins are turned on to align the HTML content with other fields. */
  disableMargins?: Maybe<Scalars['Boolean']>;
  /** Indicates the field is only displayed and its contents are not submitted with the form/saved with the entry. This is set to true. */
  displayOnly?: Maybe<Scalars['Boolean']>;
  /** The ID of the form this field belongs to. */
  formId: Scalars['Int'];
  /** Field ID. */
  id: Scalars['Int'];
  /**
   * Assigns a name to this field so that it can be populated dynamically via this input name. Only applicable when allowsPrepopulate is set to 1.
   * @deprecated This property is not associated with the Gravity Forms HtmlField type.
   */
  inputName?: Maybe<Scalars['String']>;
  /** Field label that will be displayed on the form and on the admin pages. */
  label?: Maybe<Scalars['String']>;
  /** Determines the size of the field when displayed on the page. */
  size?: Maybe<SizePropertyEnum>;
  /** The type of field to be displayed. */
  type: Scalars['String'];
  /**
   * Field visibility.
   * @deprecated This property is not associated with the Gravity Forms HtmlField type.
   */
  visibility?: Maybe<VisibilityPropertyEnum>;
};

/** Type of button to be displayed. Default is TEXT. */
export enum IdTypeEnum {
  /** The database ID assigned by Gravity Forms */
  DatabaseId = 'DATABASE_ID',
  /** Unique global ID for the object. */
  Id = 'ID',
}

/** Gravity Forms input property. */
export type InputProperty = {
  __typename?: 'InputProperty';
  /** The custom label for the input. When set, this is used in place of the label. */
  customLabel?: Maybe<Scalars['String']>;
  /** The default value to be displayed/chosen in the input field. */
  defaultValue?: Maybe<Scalars['String']>;
  /** The input ID. Input IDs follow the following naming convention: FIELDID.INPUTID (i.e. 5.1), where FIELDID is the id of the containing field and INPUTID specifies the input field. */
  id?: Maybe<Scalars['Float']>;
  /**
   * Whether or not this field should be hidden.
   * @deprecated This property is not associated with the Gravity Forms InputProperty type.
   */
  isHidden?: Maybe<Scalars['Boolean']>;
  /**
   * Key used to identify this input.
   * @deprecated This property is not associated with the Gravity Forms InputProperty type.
   */
  key?: Maybe<Scalars['String']>;
  /** Input label. */
  label?: Maybe<Scalars['String']>;
  /**
   * When the field is configured with allowsPrepopulate set to 1, this property contains the parameter name to be used to populate this field (equivalent to the inputName property of single-input fields).
   * @deprecated This property is not associated with the Gravity Forms InputProperty type.
   */
  name?: Maybe<Scalars['String']>;
  /** Placeholder text to give the user a hint on how to fill out the field. This is not submitted with the form. */
  placeholder?: Maybe<Scalars['String']>;
};

/** The field label position. Empty when using the form defaults or a value of "hidden_label". */
export enum LabelPlacementPropertyEnum {
  /** Field label is hidden. */
  Hidden = 'HIDDEN',
  /** Field label is inherited from the form defaults. */
  Inherit = 'INHERIT',
  /** Field label is displayed beside the fields and aligned to the left. */
  Left = 'LEFT',
  /** Field label is displayed beside the fields and aligned to the right. */
  Right = 'RIGHT',
  /** Field label is displayed on top of the fields. */
  Top = 'TOP',
}

/** Gravity Forms button. */
export type LastPageButton = {
  __typename?: 'LastPageButton';
  /** Contains the URL for the image button. Only applicable when type is set to image. */
  imageUrl?: Maybe<Scalars['String']>;
  /** Contains the button text. Only applicable when type is set to text. */
  text?: Maybe<Scalars['String']>;
  /** Specifies the type of button to be displayed. Defaults to TEXT. */
  type?: Maybe<ButtonTypeEnum>;
};

/** List field column labels. */
export type ListChoiceProperty = {
  __typename?: 'ListChoiceProperty';
  /** The text to be displayed in the column header. Required. */
  text?: Maybe<Scalars['String']>;
  /** The text to be displayed in the column header. */
  value?: Maybe<Scalars['String']>;
};

/** Gravity Forms List field. */
export type ListField = FormField & {
  __typename?: 'ListField';
  /** The URL of the image to be used for the add row button. */
  addIconUrl?: Maybe<Scalars['String']>;
  /** When specified, the value of this property will be used on the admin pages instead of the label. It is useful for fields with long labels. */
  adminLabel?: Maybe<Scalars['String']>;
  /** Determines if this field should only visible on the administration pages. A value of 1 will mark the field as admin only and will hide it from the public form. Useful for fields such as “status” that help with managing entries, but don’t apply to users filling out the form. */
  adminOnly?: Maybe<Scalars['Boolean']>;
  /** Determines if the field’s value can be pre-populated dynamically. 1 to allow field to be pre-populated, 0 otherwise. */
  allowsPrepopulate?: Maybe<Scalars['Boolean']>;
  /** The column labels. Only used when enableColumns is true. */
  choices?: Maybe<Array<Maybe<ListChoiceProperty>>>;
  /** Controls the visibility of the field based on values selected by the user. */
  conditionalLogic?: Maybe<ConditionalLogic>;
  /** String containing the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields. */
  cssClass?: Maybe<Scalars['String']>;
  /**
   * Array of the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields.
   * @deprecated Please use `cssClass` instead.
   */
  cssClassList?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** The URL of the image to be used for the delete row button. */
  deleteIconUrl?: Maybe<Scalars['String']>;
  /** Field description. */
  description?: Maybe<Scalars['String']>;
  /** The placement of the field description. */
  descriptionPlacement?: Maybe<DescriptionPlacementPropertyEnum>;
  /** Determines if the field should use multiple columns. Default is false. */
  enableColumns?: Maybe<Scalars['Boolean']>;
  /** Contains the message that is displayed for fields that fail validation. */
  errorMessage?: Maybe<Scalars['String']>;
  /** The ID of the form this field belongs to. */
  formId: Scalars['Int'];
  /** Field ID. */
  id: Scalars['Int'];
  /** Assigns a name to this field so that it can be populated dynamically via this input name. Only applicable when allowsPrepopulate is set to 1. */
  inputName?: Maybe<Scalars['String']>;
  /** Determines if the field requires the user to enter a value. 1 marks the field as required, 0 marks the field as not required. Fields marked as required will prevent the form from being submitted if the user has not entered a value in it. */
  isRequired?: Maybe<Scalars['Boolean']>;
  /** Field label that will be displayed on the form and on the admin pages. */
  label?: Maybe<Scalars['String']>;
  /** The field label position. */
  labelPlacement?: Maybe<LabelPlacementPropertyEnum>;
  /** List field value. */
  listValues?: Maybe<Array<Maybe<ListValueProperty>>>;
  /** The maximum number of rows the user can add to the field. */
  maxRows?: Maybe<Scalars['Int']>;
  /** The form page this field is located on. Default is 1. */
  pageNumber?: Maybe<Scalars['Int']>;
  /** Determines the size of the field when displayed on the page. */
  size?: Maybe<SizePropertyEnum>;
  /** The type of field to be displayed. */
  type: Scalars['String'];
  /** Field visibility. */
  visibility?: Maybe<VisibilityPropertyEnum>;
};

/** List field values. */
export type ListFieldValue = {
  __typename?: 'ListFieldValue';
  /** Field values. */
  listValues?: Maybe<Array<Maybe<ListInputValue>>>;
};

/** Input fields for a single List field item. */
export type ListInput = {
  /** Input values for the specific listField row. */
  rowValues?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Input value. Deprecated - please use `rowValues` instead. */
  values?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** Value for a single input within a list field. */
export type ListInputValue = {
  __typename?: 'ListInputValue';
  /**
   * Input value
   * @deprecated Please use `values` instead.
   */
  value?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Input values */
  values?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** The individual properties for each element of the List value field. */
export type ListValueProperty = {
  __typename?: 'ListValueProperty';
  /**
   * Input value
   * @deprecated Please use `values` instead.
   */
  value?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Input values */
  values?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** File details for a Media Item */
export type MediaDetails = {
  __typename?: 'MediaDetails';
  /** The filename of the mediaItem */
  file?: Maybe<Scalars['String']>;
  /** The height of the mediaItem */
  height?: Maybe<Scalars['Int']>;
  /** Meta information associated with the mediaItem */
  meta?: Maybe<MediaItemMeta>;
  /** The available sizes of the mediaItem */
  sizes?: Maybe<Array<Maybe<MediaSize>>>;
  /** The width of the mediaItem */
  width?: Maybe<Scalars['Int']>;
};

/** The mediaItem type */
export type MediaItem = Node &
  ContentNode &
  DatabaseIdentifier &
  NodeWithTemplate &
  UniformResourceIdentifiable &
  NodeWithTitle &
  NodeWithAuthor &
  NodeWithComments &
  HierarchicalContentNode & {
    __typename?: 'MediaItem';
    /** Alternative text to display when resource is not displayed */
    altText?: Maybe<Scalars['String']>;
    /** Returns ancestors of the node. Default ordered as lowest (closest to the child) to highest (closest to the root). */
    ancestors?: Maybe<HierarchicalContentNodeToContentNodeAncestorsConnection>;
    /** Connection between the NodeWithAuthor type and the User type */
    author?: Maybe<NodeWithAuthorToUserConnectionEdge>;
    /** The database identifier of the author of the node */
    authorDatabaseId?: Maybe<Scalars['Int']>;
    /** The globally unique identifier of the author of the node */
    authorId?: Maybe<Scalars['ID']>;
    /** The caption for the resource */
    caption?: Maybe<Scalars['String']>;
    /** Connection between the HierarchicalContentNode type and the ContentNode type */
    children?: Maybe<HierarchicalContentNodeToContentNodeChildrenConnection>;
    /** The number of comments. Even though WPGraphQL denotes this field as an integer, in WordPress this field should be saved as a numeric string for compatibility. */
    commentCount?: Maybe<Scalars['Int']>;
    /** Whether the comments are open or closed for this particular post. */
    commentStatus?: Maybe<Scalars['String']>;
    /** Connection between the mediaItem type and the Comment type */
    comments?: Maybe<MediaItemToCommentConnection>;
    /** Connection between the ContentNode type and the ContentType type */
    contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>;
    /** The ID of the node in the database. */
    databaseId: Scalars['Int'];
    /** Post publishing date. */
    date?: Maybe<Scalars['String']>;
    /** The publishing date set in GMT. */
    dateGmt?: Maybe<Scalars['String']>;
    /** Description of the image (stored as post_content) */
    description?: Maybe<Scalars['String']>;
    /** The desired slug of the post */
    desiredSlug?: Maybe<Scalars['String']>;
    /** If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn&#039;t exist or is greater than 15 seconds */
    editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>;
    /** The RSS enclosure for the object */
    enclosure?: Maybe<Scalars['String']>;
    /** Connection between the ContentNode type and the EnqueuedScript type */
    enqueuedScripts?: Maybe<ContentNodeToEnqueuedScriptConnection>;
    /** Connection between the ContentNode type and the EnqueuedStylesheet type */
    enqueuedStylesheets?: Maybe<ContentNodeToEnqueuedStylesheetConnection>;
    /** The filesize in bytes of the resource */
    fileSize?: Maybe<Scalars['Int']>;
    /** The global unique identifier for this post. This currently matches the value stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot; database table. */
    guid?: Maybe<Scalars['String']>;
    /** The globally unique identifier of the attachment object. */
    id: Scalars['ID'];
    /** Whether the object is a node in the preview state */
    isPreview?: Maybe<Scalars['Boolean']>;
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']>;
    /** The user that most recently edited the node */
    lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>;
    /** The permalink of the post */
    link?: Maybe<Scalars['String']>;
    /** Details about the mediaItem */
    mediaDetails?: Maybe<MediaDetails>;
    /**
     * The id field matches the WP_Post-&gt;ID field.
     * @deprecated Deprecated in favor of the databaseId field
     */
    mediaItemId: Scalars['Int'];
    /** Url of the mediaItem */
    mediaItemUrl?: Maybe<Scalars['String']>;
    /** Type of resource */
    mediaType?: Maybe<Scalars['String']>;
    /** The mime type of the mediaItem */
    mimeType?: Maybe<Scalars['String']>;
    /** The local modified time for a post. If a post was recently updated the modified field will change to match the corresponding time. */
    modified?: Maybe<Scalars['String']>;
    /** The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT. */
    modifiedGmt?: Maybe<Scalars['String']>;
    /** The parent of the node. The parent object can be of various types */
    parent?: Maybe<HierarchicalContentNodeToParentContentNodeConnectionEdge>;
    /** Database id of the parent node */
    parentDatabaseId?: Maybe<Scalars['Int']>;
    /** The globally unique identifier of the parent node. */
    parentId?: Maybe<Scalars['ID']>;
    /** The database id of the preview node */
    previewRevisionDatabaseId?: Maybe<Scalars['Int']>;
    /** Whether the object is a node in the preview state */
    previewRevisionId?: Maybe<Scalars['ID']>;
    /** The sizes attribute value for an image. */
    sizes?: Maybe<Scalars['String']>;
    /** The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name field and the post_name column in the database for the &quot;post_objects&quot; table. */
    slug?: Maybe<Scalars['String']>;
    /** Url of the mediaItem */
    sourceUrl?: Maybe<Scalars['String']>;
    /** The srcset attribute specifies the URL of the image to use in different situations. It is a comma separated string of urls and their widths. */
    srcSet?: Maybe<Scalars['String']>;
    /** The current status of the object */
    status?: Maybe<Scalars['String']>;
    /** The template assigned to a node of content */
    template?: Maybe<ContentTemplate>;
    /** The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made. */
    title?: Maybe<Scalars['String']>;
    /** URI path for the resource */
    uri: Scalars['String'];
  };

/** The mediaItem type */
export type MediaItemAncestorsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<HierarchicalContentNodeToContentNodeAncestorsConnectionWhereArgs>;
};

/** The mediaItem type */
export type MediaItemCaptionArgs = {
  format?: Maybe<PostObjectFieldFormatEnum>;
};

/** The mediaItem type */
export type MediaItemChildrenArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<HierarchicalContentNodeToContentNodeChildrenConnectionWhereArgs>;
};

/** The mediaItem type */
export type MediaItemCommentsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<MediaItemToCommentConnectionWhereArgs>;
};

/** The mediaItem type */
export type MediaItemDescriptionArgs = {
  format?: Maybe<PostObjectFieldFormatEnum>;
};

/** The mediaItem type */
export type MediaItemEnqueuedScriptsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

/** The mediaItem type */
export type MediaItemEnqueuedStylesheetsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

/** The mediaItem type */
export type MediaItemFileSizeArgs = {
  size?: Maybe<MediaItemSizeEnum>;
};

/** The mediaItem type */
export type MediaItemSizesArgs = {
  size?: Maybe<MediaItemSizeEnum>;
};

/** The mediaItem type */
export type MediaItemSourceUrlArgs = {
  size?: Maybe<MediaItemSizeEnum>;
};

/** The mediaItem type */
export type MediaItemSrcSetArgs = {
  size?: Maybe<MediaItemSizeEnum>;
};

/** The mediaItem type */
export type MediaItemTitleArgs = {
  format?: Maybe<PostObjectFieldFormatEnum>;
};

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum MediaItemIdType {
  /** Identify a resource by the Database ID. */
  DatabaseId = 'DATABASE_ID',
  /** Identify a resource by the (hashed) Global ID. */
  Id = 'ID',
  /** Identify a resource by the slug. Available to non-hierarchcial Types where the slug is a unique identifier. */
  Slug = 'SLUG',
  /** Identify a media item by its source url */
  SourceUrl = 'SOURCE_URL',
  /** Identify a resource by the URI. */
  Uri = 'URI',
}

/** Meta connected to a MediaItem */
export type MediaItemMeta = {
  __typename?: 'MediaItemMeta';
  /** Aperture measurement of the media item. */
  aperture?: Maybe<Scalars['Float']>;
  /** Information about the camera used to create the media item. */
  camera?: Maybe<Scalars['String']>;
  /** The text string description associated with the media item. */
  caption?: Maybe<Scalars['String']>;
  /** Copyright information associated with the media item. */
  copyright?: Maybe<Scalars['String']>;
  /** The date/time when the media was created. */
  createdTimestamp?: Maybe<Scalars['Int']>;
  /** The original creator of the media item. */
  credit?: Maybe<Scalars['String']>;
  /** The focal length value of the media item. */
  focalLength?: Maybe<Scalars['Float']>;
  /** The ISO (International Organization for Standardization) value of the media item. */
  iso?: Maybe<Scalars['Int']>;
  /** List of keywords used to describe or identfy the media item. */
  keywords?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** The vertical or horizontal aspect of the media item. */
  orientation?: Maybe<Scalars['String']>;
  /** The shutter speed information of the media item. */
  shutterSpeed?: Maybe<Scalars['Float']>;
  /** A useful title for the media item. */
  title?: Maybe<Scalars['String']>;
};

/** The size of the media item object. */
export enum MediaItemSizeEnum {
  /** MediaItem with the large size */
  Large = 'LARGE',
  /** MediaItem with the medium size */
  Medium = 'MEDIUM',
  /** MediaItem with the medium_large size */
  MediumLarge = 'MEDIUM_LARGE',
  /** MediaItem with the post-thumbnail size */
  PostThumbnail = 'POST_THUMBNAIL',
  /** MediaItem with the thumbnail size */
  Thumbnail = 'THUMBNAIL',
  /** MediaItem with the 1536x1536 size */
  '1536X1536' = '_1536X1536',
  /** MediaItem with the 2048x2048 size */
  '2048X2048' = '_2048X2048',
}

/** The status of the media item object. */
export enum MediaItemStatusEnum {
  /** Objects with the auto-draft status */
  AutoDraft = 'AUTO_DRAFT',
  /** Objects with the inherit status */
  Inherit = 'INHERIT',
  /** Objects with the private status */
  Private = 'PRIVATE',
  /** Objects with the trash status */
  Trash = 'TRASH',
}

/** Connection between the mediaItem type and the Comment type */
export type MediaItemToCommentConnection = {
  __typename?: 'MediaItemToCommentConnection';
  /** Edges for the MediaItemToCommentConnection connection */
  edges?: Maybe<Array<Maybe<MediaItemToCommentConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Comment>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type MediaItemToCommentConnectionEdge = {
  __typename?: 'MediaItemToCommentConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<Comment>;
};

/** Arguments for filtering the MediaItemToCommentConnection connection */
export type MediaItemToCommentConnectionWhereArgs = {
  /** Comment author email address. */
  authorEmail?: Maybe<Scalars['String']>;
  /** Array of author IDs to include comments for. */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Comment author URL. */
  authorUrl?: Maybe<Scalars['String']>;
  /** Array of comment IDs to include. */
  commentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Include comments of a given type. */
  commentType?: Maybe<Scalars['String']>;
  /** Include comments from a given array of comment types. */
  commentTypeIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: Maybe<Scalars['String']>;
  /** Content object author ID to limit results by. */
  contentAuthor?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: Maybe<Scalars['ID']>;
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Content object name to retrieve affiliated comments for. */
  contentName?: Maybe<Scalars['String']>;
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: Maybe<Scalars['Int']>;
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: Maybe<Array<Maybe<PostStatusEnum>>>;
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: Maybe<Array<Maybe<ContentTypeEnum>>>;
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Karma score to retrieve matching comments for. */
  karma?: Maybe<Scalars['Int']>;
  /** The cardinality of the order of the connection */
  order?: Maybe<OrderEnum>;
  /** Field to order the comments by. */
  orderby?: Maybe<CommentsConnectionOrderbyEnum>;
  /** Parent ID of comment to retrieve children of. */
  parent?: Maybe<Scalars['Int']>;
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Search term(s) to retrieve matching comments for. */
  search?: Maybe<Scalars['String']>;
  /** Comment status to limit results by. */
  status?: Maybe<Scalars['String']>;
  /** Include comments for a specific user ID. */
  userId?: Maybe<Scalars['ID']>;
};

/** Details of an available size for a media item */
export type MediaSize = {
  __typename?: 'MediaSize';
  /** The filename of the referenced size */
  file?: Maybe<Scalars['String']>;
  /** The filesize of the resource */
  fileSize?: Maybe<Scalars['Int']>;
  /** The height of the referenced size */
  height?: Maybe<Scalars['String']>;
  /** The mime type of the referenced size */
  mimeType?: Maybe<Scalars['String']>;
  /** The referenced size name */
  name?: Maybe<Scalars['String']>;
  /** The url of the referenced size */
  sourceUrl?: Maybe<Scalars['String']>;
  /** The width of the referenced size */
  width?: Maybe<Scalars['String']>;
};

/** Menus are the containers for navigation items. Menus can be assigned to menu locations, which are typically registered by the active theme. */
export type Menu = Node &
  DatabaseIdentifier & {
    __typename?: 'Menu';
    /** The number of items in the menu */
    count?: Maybe<Scalars['Int']>;
    /** The unique identifier stored in the database */
    databaseId: Scalars['Int'];
    /** The globally unique identifier of the nav menu object. */
    id: Scalars['ID'];
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']>;
    /** The locations a menu is assigned to */
    locations?: Maybe<Array<Maybe<MenuLocationEnum>>>;
    /**
     * WP ID of the nav menu.
     * @deprecated Deprecated in favor of the databaseId field
     */
    menuId?: Maybe<Scalars['Int']>;
    /** Connection between the Menu type and the MenuItem type */
    menuItems?: Maybe<MenuToMenuItemConnection>;
    /** Display name of the menu. Equivalent to WP_Term-&gt;name. */
    name?: Maybe<Scalars['String']>;
    /** The url friendly name of the menu. Equivalent to WP_Term-&gt;slug */
    slug?: Maybe<Scalars['String']>;
  };

/** Menus are the containers for navigation items. Menus can be assigned to menu locations, which are typically registered by the active theme. */
export type MenuMenuItemsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<MenuToMenuItemConnectionWhereArgs>;
};

/** Navigation menu items are the individual items assigned to a menu. These are rendered as the links in a navigation menu. */
export type MenuItem = Node &
  DatabaseIdentifier & {
    __typename?: 'MenuItem';
    /** Connection between the MenuItem type and the MenuItem type */
    childItems?: Maybe<MenuItemToMenuItemConnection>;
    /** Connection from MenuItem to it&#039;s connected node */
    connectedNode?: Maybe<MenuItemToMenuItemLinkableConnectionEdge>;
    /**
     * The object connected to this menu item.
     * @deprecated Deprecated in favor of the connectedNode field
     */
    connectedObject?: Maybe<MenuItemObjectUnion>;
    /** Class attribute for the menu item link */
    cssClasses?: Maybe<Array<Maybe<Scalars['String']>>>;
    /** The unique identifier stored in the database */
    databaseId: Scalars['Int'];
    /** Description of the menu item. */
    description?: Maybe<Scalars['String']>;
    /** The globally unique identifier of the nav menu item object. */
    id: Scalars['ID'];
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']>;
    /** Label or title of the menu item. */
    label?: Maybe<Scalars['String']>;
    /** Link relationship (XFN) of the menu item. */
    linkRelationship?: Maybe<Scalars['String']>;
    /** The locations the menu item&#039;s Menu is assigned to */
    locations?: Maybe<Array<Maybe<MenuLocationEnum>>>;
    /** The Menu a MenuItem is part of */
    menu?: Maybe<MenuItemToMenuConnectionEdge>;
    /**
     * WP ID of the menu item.
     * @deprecated Deprecated in favor of the databaseId field
     */
    menuItemId?: Maybe<Scalars['Int']>;
    /** Menu item order */
    order?: Maybe<Scalars['Int']>;
    /** The database id of the parent menu item or null if it is the root */
    parentDatabaseId?: Maybe<Scalars['Int']>;
    /** The globally unique identifier of the parent nav menu item object. */
    parentId?: Maybe<Scalars['ID']>;
    /** Path for the resource. Relative path for internal resources. Absolute path for external resources. */
    path: Scalars['String'];
    /** Target attribute for the menu item link. */
    target?: Maybe<Scalars['String']>;
    /** Title attribute for the menu item link */
    title?: Maybe<Scalars['String']>;
    /** URL or destination of the menu item. */
    url?: Maybe<Scalars['String']>;
  };

/** Navigation menu items are the individual items assigned to a menu. These are rendered as the links in a navigation menu. */
export type MenuItemChildItemsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<MenuItemToMenuItemConnectionWhereArgs>;
};

/** Nodes that can be linked to as Menu Items */
export type MenuItemLinkable = {
  /** The unique resource identifier path */
  databaseId: Scalars['Int'];
  /** The unique resource identifier path */
  id: Scalars['ID'];
  /** The unique resource identifier path */
  uri: Scalars['String'];
};

/** The Type of Identifier used to fetch a single node. Default is "ID". To be used along with the "id" field. */
export enum MenuItemNodeIdTypeEnum {
  /** Identify a resource by the Database ID. */
  DatabaseId = 'DATABASE_ID',
  /** Identify a resource by the (hashed) Global ID. */
  Id = 'ID',
}

/** Deprecated in favor of MenuItemLinkeable Interface */
export type MenuItemObjectUnion = Post | Page | Category | Tag | PostFormat;

/** Connection between the MenuItem type and the Menu type */
export type MenuItemToMenuConnectionEdge = {
  __typename?: 'MenuItemToMenuConnectionEdge';
  /** The nodes of the connection, without the edges */
  node?: Maybe<Menu>;
};

/** Connection between the MenuItem type and the MenuItem type */
export type MenuItemToMenuItemConnection = {
  __typename?: 'MenuItemToMenuItemConnection';
  /** Edges for the MenuItemToMenuItemConnection connection */
  edges?: Maybe<Array<Maybe<MenuItemToMenuItemConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<MenuItem>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type MenuItemToMenuItemConnectionEdge = {
  __typename?: 'MenuItemToMenuItemConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<MenuItem>;
};

/** Arguments for filtering the MenuItemToMenuItemConnection connection */
export type MenuItemToMenuItemConnectionWhereArgs = {
  /** The ID of the object */
  id?: Maybe<Scalars['Int']>;
  /** The menu location for the menu being queried */
  location?: Maybe<MenuLocationEnum>;
  /** The database ID of the parent menu object */
  parentDatabaseId?: Maybe<Scalars['Int']>;
  /** The ID of the parent menu object */
  parentId?: Maybe<Scalars['ID']>;
};

/** Connection between the MenuItem type and the MenuItemLinkable type */
export type MenuItemToMenuItemLinkableConnectionEdge = {
  __typename?: 'MenuItemToMenuItemLinkableConnectionEdge';
  /** The nodes of the connection, without the edges */
  node?: Maybe<MenuItemLinkable>;
};

/** Options for filtering the connection */
export type MenuItemsWhereArgs = {
  /** The ID of the object */
  id?: Maybe<Scalars['Int']>;
  /** The menu location for the menu being queried */
  location?: Maybe<MenuLocationEnum>;
};

/** Registered menu locations */
export enum MenuLocationEnum {
  /** Put the menu in the footer location */
  Footer = 'FOOTER',
  /** Put the menu in the primary location */
  Primary = 'PRIMARY',
}

/** The Type of Identifier used to fetch a single node. Default is "ID". To be used along with the "id" field. */
export enum MenuNodeIdTypeEnum {
  /** Identify a menu node by the Database ID. */
  DatabaseId = 'DATABASE_ID',
  /** Identify a menu node by the (hashed) Global ID. */
  Id = 'ID',
  /** Identify a menu node by it's name */
  Name = 'NAME',
}

/** Connection between the Menu type and the MenuItem type */
export type MenuToMenuItemConnection = {
  __typename?: 'MenuToMenuItemConnection';
  /** Edges for the MenuToMenuItemConnection connection */
  edges?: Maybe<Array<Maybe<MenuToMenuItemConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<MenuItem>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type MenuToMenuItemConnectionEdge = {
  __typename?: 'MenuToMenuItemConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<MenuItem>;
};

/** Arguments for filtering the MenuToMenuItemConnection connection */
export type MenuToMenuItemConnectionWhereArgs = {
  /** The ID of the object */
  id?: Maybe<Scalars['Int']>;
  /** The menu location for the menu being queried */
  location?: Maybe<MenuLocationEnum>;
  /** The database ID of the parent menu object */
  parentDatabaseId?: Maybe<Scalars['Int']>;
  /** The ID of the parent menu object */
  parentId?: Maybe<Scalars['ID']>;
};

/** The MimeType of the object */
export enum MimeTypeEnum {
  /** MimeType application/java */
  ApplicationJava = 'APPLICATION_JAVA',
  /** MimeType application/msword */
  ApplicationMsword = 'APPLICATION_MSWORD',
  /** MimeType application/octet-stream */
  ApplicationOctetStream = 'APPLICATION_OCTET_STREAM',
  /** MimeType application/onenote */
  ApplicationOnenote = 'APPLICATION_ONENOTE',
  /** MimeType application/oxps */
  ApplicationOxps = 'APPLICATION_OXPS',
  /** MimeType application/pdf */
  ApplicationPdf = 'APPLICATION_PDF',
  /** MimeType application/rar */
  ApplicationRar = 'APPLICATION_RAR',
  /** MimeType application/rtf */
  ApplicationRtf = 'APPLICATION_RTF',
  /** MimeType application/ttaf+xml */
  ApplicationTtafXml = 'APPLICATION_TTAF_XML',
  /** MimeType application/vnd.apple.keynote */
  ApplicationVndAppleKeynote = 'APPLICATION_VND_APPLE_KEYNOTE',
  /** MimeType application/vnd.apple.numbers */
  ApplicationVndAppleNumbers = 'APPLICATION_VND_APPLE_NUMBERS',
  /** MimeType application/vnd.apple.pages */
  ApplicationVndApplePages = 'APPLICATION_VND_APPLE_PAGES',
  /** MimeType application/vnd.ms-access */
  ApplicationVndMsAccess = 'APPLICATION_VND_MS_ACCESS',
  /** MimeType application/vnd.ms-excel */
  ApplicationVndMsExcel = 'APPLICATION_VND_MS_EXCEL',
  /** MimeType application/vnd.ms-excel.addin.macroEnabled.12 */
  ApplicationVndMsExcelAddinMacroenabled_12 = 'APPLICATION_VND_MS_EXCEL_ADDIN_MACROENABLED_12',
  /** MimeType application/vnd.ms-excel.sheet.binary.macroEnabled.12 */
  ApplicationVndMsExcelSheetBinaryMacroenabled_12 = 'APPLICATION_VND_MS_EXCEL_SHEET_BINARY_MACROENABLED_12',
  /** MimeType application/vnd.ms-excel.sheet.macroEnabled.12 */
  ApplicationVndMsExcelSheetMacroenabled_12 = 'APPLICATION_VND_MS_EXCEL_SHEET_MACROENABLED_12',
  /** MimeType application/vnd.ms-excel.template.macroEnabled.12 */
  ApplicationVndMsExcelTemplateMacroenabled_12 = 'APPLICATION_VND_MS_EXCEL_TEMPLATE_MACROENABLED_12',
  /** MimeType application/vnd.ms-powerpoint */
  ApplicationVndMsPowerpoint = 'APPLICATION_VND_MS_POWERPOINT',
  /** MimeType application/vnd.ms-powerpoint.addin.macroEnabled.12 */
  ApplicationVndMsPowerpointAddinMacroenabled_12 = 'APPLICATION_VND_MS_POWERPOINT_ADDIN_MACROENABLED_12',
  /** MimeType application/vnd.ms-powerpoint.presentation.macroEnabled.12 */
  ApplicationVndMsPowerpointPresentationMacroenabled_12 = 'APPLICATION_VND_MS_POWERPOINT_PRESENTATION_MACROENABLED_12',
  /** MimeType application/vnd.ms-powerpoint.slideshow.macroEnabled.12 */
  ApplicationVndMsPowerpointSlideshowMacroenabled_12 = 'APPLICATION_VND_MS_POWERPOINT_SLIDESHOW_MACROENABLED_12',
  /** MimeType application/vnd.ms-powerpoint.slide.macroEnabled.12 */
  ApplicationVndMsPowerpointSlideMacroenabled_12 = 'APPLICATION_VND_MS_POWERPOINT_SLIDE_MACROENABLED_12',
  /** MimeType application/vnd.ms-powerpoint.template.macroEnabled.12 */
  ApplicationVndMsPowerpointTemplateMacroenabled_12 = 'APPLICATION_VND_MS_POWERPOINT_TEMPLATE_MACROENABLED_12',
  /** MimeType application/vnd.ms-project */
  ApplicationVndMsProject = 'APPLICATION_VND_MS_PROJECT',
  /** MimeType application/vnd.ms-word.document.macroEnabled.12 */
  ApplicationVndMsWordDocumentMacroenabled_12 = 'APPLICATION_VND_MS_WORD_DOCUMENT_MACROENABLED_12',
  /** MimeType application/vnd.ms-word.template.macroEnabled.12 */
  ApplicationVndMsWordTemplateMacroenabled_12 = 'APPLICATION_VND_MS_WORD_TEMPLATE_MACROENABLED_12',
  /** MimeType application/vnd.ms-write */
  ApplicationVndMsWrite = 'APPLICATION_VND_MS_WRITE',
  /** MimeType application/vnd.ms-xpsdocument */
  ApplicationVndMsXpsdocument = 'APPLICATION_VND_MS_XPSDOCUMENT',
  /** MimeType application/vnd.oasis.opendocument.chart */
  ApplicationVndOasisOpendocumentChart = 'APPLICATION_VND_OASIS_OPENDOCUMENT_CHART',
  /** MimeType application/vnd.oasis.opendocument.database */
  ApplicationVndOasisOpendocumentDatabase = 'APPLICATION_VND_OASIS_OPENDOCUMENT_DATABASE',
  /** MimeType application/vnd.oasis.opendocument.formula */
  ApplicationVndOasisOpendocumentFormula = 'APPLICATION_VND_OASIS_OPENDOCUMENT_FORMULA',
  /** MimeType application/vnd.oasis.opendocument.graphics */
  ApplicationVndOasisOpendocumentGraphics = 'APPLICATION_VND_OASIS_OPENDOCUMENT_GRAPHICS',
  /** MimeType application/vnd.oasis.opendocument.presentation */
  ApplicationVndOasisOpendocumentPresentation = 'APPLICATION_VND_OASIS_OPENDOCUMENT_PRESENTATION',
  /** MimeType application/vnd.oasis.opendocument.spreadsheet */
  ApplicationVndOasisOpendocumentSpreadsheet = 'APPLICATION_VND_OASIS_OPENDOCUMENT_SPREADSHEET',
  /** MimeType application/vnd.oasis.opendocument.text */
  ApplicationVndOasisOpendocumentText = 'APPLICATION_VND_OASIS_OPENDOCUMENT_TEXT',
  /** MimeType application/vnd.openxmlformats-officedocument.presentationml.presentation */
  ApplicationVndOpenxmlformatsOfficedocumentPresentationmlPresentation = 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_PRESENTATION',
  /** MimeType application/vnd.openxmlformats-officedocument.presentationml.slide */
  ApplicationVndOpenxmlformatsOfficedocumentPresentationmlSlide = 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_SLIDE',
  /** MimeType application/vnd.openxmlformats-officedocument.presentationml.slideshow */
  ApplicationVndOpenxmlformatsOfficedocumentPresentationmlSlideshow = 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_SLIDESHOW',
  /** MimeType application/vnd.openxmlformats-officedocument.presentationml.template */
  ApplicationVndOpenxmlformatsOfficedocumentPresentationmlTemplate = 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_TEMPLATE',
  /** MimeType application/vnd.openxmlformats-officedocument.spreadsheetml.sheet */
  ApplicationVndOpenxmlformatsOfficedocumentSpreadsheetmlSheet = 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_SPREADSHEETML_SHEET',
  /** MimeType application/vnd.openxmlformats-officedocument.spreadsheetml.template */
  ApplicationVndOpenxmlformatsOfficedocumentSpreadsheetmlTemplate = 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_SPREADSHEETML_TEMPLATE',
  /** MimeType application/vnd.openxmlformats-officedocument.wordprocessingml.document */
  ApplicationVndOpenxmlformatsOfficedocumentWordprocessingmlDocument = 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_DOCUMENT',
  /** MimeType application/vnd.openxmlformats-officedocument.wordprocessingml.template */
  ApplicationVndOpenxmlformatsOfficedocumentWordprocessingmlTemplate = 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_TEMPLATE',
  /** MimeType application/wordperfect */
  ApplicationWordperfect = 'APPLICATION_WORDPERFECT',
  /** MimeType application/x-7z-compressed */
  ApplicationX_7ZCompressed = 'APPLICATION_X_7Z_COMPRESSED',
  /** MimeType application/x-gzip */
  ApplicationXGzip = 'APPLICATION_X_GZIP',
  /** MimeType application/x-tar */
  ApplicationXTar = 'APPLICATION_X_TAR',
  /** MimeType application/zip */
  ApplicationZip = 'APPLICATION_ZIP',
  /** MimeType audio/aac */
  AudioAac = 'AUDIO_AAC',
  /** MimeType audio/flac */
  AudioFlac = 'AUDIO_FLAC',
  /** MimeType audio/midi */
  AudioMidi = 'AUDIO_MIDI',
  /** MimeType audio/mpeg */
  AudioMpeg = 'AUDIO_MPEG',
  /** MimeType audio/ogg */
  AudioOgg = 'AUDIO_OGG',
  /** MimeType audio/wav */
  AudioWav = 'AUDIO_WAV',
  /** MimeType audio/x-matroska */
  AudioXMatroska = 'AUDIO_X_MATROSKA',
  /** MimeType audio/x-ms-wax */
  AudioXMsWax = 'AUDIO_X_MS_WAX',
  /** MimeType audio/x-ms-wma */
  AudioXMsWma = 'AUDIO_X_MS_WMA',
  /** MimeType audio/x-realaudio */
  AudioXRealaudio = 'AUDIO_X_REALAUDIO',
  /** MimeType image/bmp */
  ImageBmp = 'IMAGE_BMP',
  /** MimeType image/gif */
  ImageGif = 'IMAGE_GIF',
  /** MimeType image/heic */
  ImageHeic = 'IMAGE_HEIC',
  /** MimeType image/jpeg */
  ImageJpeg = 'IMAGE_JPEG',
  /** MimeType image/png */
  ImagePng = 'IMAGE_PNG',
  /** MimeType image/tiff */
  ImageTiff = 'IMAGE_TIFF',
  /** MimeType image/x-icon */
  ImageXIcon = 'IMAGE_X_ICON',
  /** MimeType text/calendar */
  TextCalendar = 'TEXT_CALENDAR',
  /** MimeType text/css */
  TextCss = 'TEXT_CSS',
  /** MimeType text/csv */
  TextCsv = 'TEXT_CSV',
  /** MimeType text/plain */
  TextPlain = 'TEXT_PLAIN',
  /** MimeType text/richtext */
  TextRichtext = 'TEXT_RICHTEXT',
  /** MimeType text/tab-separated-values */
  TextTabSeparatedValues = 'TEXT_TAB_SEPARATED_VALUES',
  /** MimeType text/vtt */
  TextVtt = 'TEXT_VTT',
  /** MimeType video/3gpp */
  Video_3Gpp = 'VIDEO_3GPP',
  /** MimeType video/3gpp2 */
  Video_3Gpp2 = 'VIDEO_3GPP2',
  /** MimeType video/avi */
  VideoAvi = 'VIDEO_AVI',
  /** MimeType video/divx */
  VideoDivx = 'VIDEO_DIVX',
  /** MimeType video/mp4 */
  VideoMp4 = 'VIDEO_MP4',
  /** MimeType video/mpeg */
  VideoMpeg = 'VIDEO_MPEG',
  /** MimeType video/ogg */
  VideoOgg = 'VIDEO_OGG',
  /** MimeType video/quicktime */
  VideoQuicktime = 'VIDEO_QUICKTIME',
  /** MimeType video/webm */
  VideoWebm = 'VIDEO_WEBM',
  /** MimeType video/x-flv */
  VideoXFlv = 'VIDEO_X_FLV',
  /** MimeType video/x-matroska */
  VideoXMatroska = 'VIDEO_X_MATROSKA',
  /** MimeType video/x-ms-asf */
  VideoXMsAsf = 'VIDEO_X_MS_ASF',
  /** MimeType video/x-ms-wm */
  VideoXMsWm = 'VIDEO_X_MS_WM',
  /** MimeType video/x-ms-wmv */
  VideoXMsWmv = 'VIDEO_X_MS_WMV',
  /** MimeType video/x-ms-wmx */
  VideoXMsWmx = 'VIDEO_X_MS_WMX',
}

/** Indicates how strong the password should be. */
export enum MinPasswordStrengthEnum {
  /** The password strength must be "bad" or better. */
  Bad = 'BAD',
  /** The password strength must be "good" or better. */
  Good = 'GOOD',
  /** The password strength must be "short" or better. */
  Short = 'SHORT',
  /** The password strength must be "strong". */
  Strong = 'STRONG',
}

/** Gravity Forms Multi-Select field. */
export type MultiSelectField = FormField & {
  __typename?: 'MultiSelectField';
  /** When specified, the value of this property will be used on the admin pages instead of the label. It is useful for fields with long labels. */
  adminLabel?: Maybe<Scalars['String']>;
  /** Determines if this field should only visible on the administration pages. A value of 1 will mark the field as admin only and will hide it from the public form. Useful for fields such as “status” that help with managing entries, but don’t apply to users filling out the form. */
  adminOnly?: Maybe<Scalars['Boolean']>;
  /** Determines if the field’s value can be pre-populated dynamically. 1 to allow field to be pre-populated, 0 otherwise. */
  allowsPrepopulate?: Maybe<Scalars['Boolean']>;
  /** Contains the available choices for the field. For instance, drop down items and checkbox items are configured with this property. */
  choices?: Maybe<Array<Maybe<ChoiceProperty>>>;
  /** Controls the visibility of the field based on values selected by the user. */
  conditionalLogic?: Maybe<ConditionalLogic>;
  /** String containing the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields. */
  cssClass?: Maybe<Scalars['String']>;
  /**
   * Array of the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields.
   * @deprecated Please use `cssClass` instead.
   */
  cssClassList?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Field description. */
  description?: Maybe<Scalars['String']>;
  /** The placement of the field description. */
  descriptionPlacement?: Maybe<DescriptionPlacementPropertyEnum>;
  /** Determines if the field (checkbox, select or radio) have choice values enabled, which allows the field to have choice values different from the labels that are displayed to the user. */
  enableChoiceValue?: Maybe<Scalars['Boolean']>;
  /** When set to true, the &quot;Chosen&quot; jQuery script will be applied to this field, enabling search capabilities to Drop Down fields and a more user-friendly interface for Multi Select fields. */
  enableEnhancedUI?: Maybe<Scalars['Boolean']>;
  /** Contains the message that is displayed for fields that fail validation. */
  errorMessage?: Maybe<Scalars['String']>;
  /** The ID of the form this field belongs to. */
  formId: Scalars['Int'];
  /** Field ID. */
  id: Scalars['Int'];
  /** Assigns a name to this field so that it can be populated dynamically via this input name. Only applicable when allowsPrepopulate is set to 1. */
  inputName?: Maybe<Scalars['String']>;
  /** Determines if the field requires the user to enter a value. 1 marks the field as required, 0 marks the field as not required. Fields marked as required will prevent the form from being submitted if the user has not entered a value in it. */
  isRequired?: Maybe<Scalars['Boolean']>;
  /** Field label that will be displayed on the form and on the admin pages. */
  label?: Maybe<Scalars['String']>;
  /** Determines the size of the field when displayed on the page. */
  size?: Maybe<SizePropertyEnum>;
  /** The type of field to be displayed. */
  type: Scalars['String'];
  /** MultiSelect field value. */
  values?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Field visibility. */
  visibility?: Maybe<VisibilityPropertyEnum>;
};

/** Multiselect field values. */
export type MultiSelectFieldValue = {
  __typename?: 'MultiSelectFieldValue';
  /** Field values. */
  values?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** Gravity Forms Name field. */
export type NameField = FormField & {
  __typename?: 'NameField';
  /** When specified, the value of this property will be used on the admin pages instead of the label. It is useful for fields with long labels. */
  adminLabel?: Maybe<Scalars['String']>;
  /** Determines if this field should only visible on the administration pages. A value of 1 will mark the field as admin only and will hide it from the public form. Useful for fields such as “status” that help with managing entries, but don’t apply to users filling out the form. */
  adminOnly?: Maybe<Scalars['Boolean']>;
  /** Determines if the field’s value can be pre-populated dynamically. 1 to allow field to be pre-populated, 0 otherwise. */
  allowsPrepopulate?: Maybe<Scalars['Boolean']>;
  /** Controls the visibility of the field based on values selected by the user. */
  conditionalLogic?: Maybe<ConditionalLogic>;
  /** String containing the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields. */
  cssClass?: Maybe<Scalars['String']>;
  /**
   * Array of the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields.
   * @deprecated Please use `cssClass` instead.
   */
  cssClassList?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Field description. */
  description?: Maybe<Scalars['String']>;
  /** The placement of the field description. */
  descriptionPlacement?: Maybe<DescriptionPlacementPropertyEnum>;
  /** Contains the message that is displayed for fields that fail validation. */
  errorMessage?: Maybe<Scalars['String']>;
  /** The ID of the form this field belongs to. */
  formId: Scalars['Int'];
  /** Field ID. */
  id: Scalars['Int'];
  /**
   * Assigns a name to this field so that it can be populated dynamically via this input name. Only applicable when allowsPrepopulate is set to 1.
   * @deprecated This property is not associated with the Gravity Forms NameField type. Please use `inputs { name }` instead.
   */
  inputName?: Maybe<Scalars['String']>;
  /** An array containing the the individual properties for each element of the name field. */
  inputs?: Maybe<Array<Maybe<NameInputProperty>>>;
  /** Determines if the field requires the user to enter a value. 1 marks the field as required, 0 marks the field as not required. Fields marked as required will prevent the form from being submitted if the user has not entered a value in it. */
  isRequired?: Maybe<Scalars['Boolean']>;
  /** Field label that will be displayed on the form and on the admin pages. */
  label?: Maybe<Scalars['String']>;
  /** The format of the name field. Originally, the name field could be a “normal” format with just First and Last being the fields displayed or an “extended” format which included prefix and suffix fields, or a “simple” format which just had one input field. These are legacy formats which are no longer used when adding a Name field to a form. The Name field was modified in a way which allows each of the components of the normal and extended formats to be able to be turned on or off. The nameFormat is now only “advanced”. Name fields in the previous formats are automatically upgraded to the new type if the form field is modified in the admin. The code is backwards-compatible and will continue to handle the “normal”, “extended”, “simple” formats for fields which have not yet been upgraded. */
  nameFormat?: Maybe<Scalars['String']>;
  /** Name field value. */
  nameValues?: Maybe<NameValueProperty>;
  /** Determines the size of the field when displayed on the page. */
  size?: Maybe<SizePropertyEnum>;
  /** The placement of the labels for the subfields within the group. This setting controls all of the subfields, they cannot be set individually. They may be aligned above or below the inputs. If this property is not set, the “Sub-Label Placement” setting on the Form Settings-&gt;Form Layout page is used. If no setting is specified, the default is above inputs. */
  subLabelPlacement?: Maybe<Scalars['String']>;
  /** The type of field to be displayed. */
  type: Scalars['String'];
  /** Field visibility. */
  visibility?: Maybe<VisibilityPropertyEnum>;
};

/** Name field values. */
export type NameFieldValue = {
  __typename?: 'NameFieldValue';
  /** First name. */
  first?: Maybe<Scalars['String']>;
  /** Last name. */
  last?: Maybe<Scalars['String']>;
  /** Middle name. */
  middle?: Maybe<Scalars['String']>;
  /** Prefix, such as Mr., Mrs. etc. */
  prefix?: Maybe<Scalars['String']>;
  /** Suffix, such as Sr., Jr. etc. */
  suffix?: Maybe<Scalars['String']>;
};

/** Input fields for name field. */
export type NameInput = {
  /** First name. */
  first?: Maybe<Scalars['String']>;
  /** Last name. */
  last?: Maybe<Scalars['String']>;
  /** Middle name. */
  middle?: Maybe<Scalars['String']>;
  /** Prefix, such as Mr., Mrs. etc. */
  prefix?: Maybe<Scalars['String']>;
  /** Suffix, such as Sr., Jr. etc. */
  suffix?: Maybe<Scalars['String']>;
};

/** An array containing the the individual properties for each element of the name field. */
export type NameInputProperty = {
  __typename?: 'NameInputProperty';
  /** This array only exists when the Prefix field is used. It holds the prefix options that display in the drop down. These have been chosen in the admin. */
  choices?: Maybe<Array<Maybe<ChoiceProperty>>>;
  /** The custom label for the input. When set, this is used in place of the label. */
  customLabel?: Maybe<Scalars['String']>;
  /** The default value to be displayed/chosen in the input field. */
  defaultValue?: Maybe<Scalars['String']>;
  /** Indicates whether the choice has a value, not just the text. This is only available for the Prefix field. */
  enableChoiceValue?: Maybe<Scalars['Boolean']>;
  /** The input ID. Input IDs follow the following naming convention: FIELDID.INPUTID (i.e. 5.1), where FIELDID is the id of the containing field and INPUTID specifies the input field. */
  id?: Maybe<Scalars['Float']>;
  /** Whether or not this field should be hidden. */
  isHidden?: Maybe<Scalars['Boolean']>;
  /** Key used to identify this input. */
  key?: Maybe<Scalars['String']>;
  /** Input label. */
  label?: Maybe<Scalars['String']>;
  /** When the field is configured with allowsPrepopulate set to 1, this property contains the parameter name to be used to populate this field (equivalent to the inputName property of single-input fields). */
  name?: Maybe<Scalars['String']>;
  /** Placeholder text to give the user a hint on how to fill out the field. This is not submitted with the form. */
  placeholder?: Maybe<Scalars['String']>;
};

/** The individual properties for each element of the Name value field. */
export type NameValueProperty = {
  __typename?: 'NameValueProperty';
  /** First name. */
  first?: Maybe<Scalars['String']>;
  /** Last name. */
  last?: Maybe<Scalars['String']>;
  /** Middle name. */
  middle?: Maybe<Scalars['String']>;
  /** Prefix, such as Mr., Mrs. etc. */
  prefix?: Maybe<Scalars['String']>;
  /** Suffix, such as Sr., Jr. etc. */
  suffix?: Maybe<Scalars['String']>;
};

/** An object with an ID */
export type Node = {
  /** The globally unique ID for the object */
  id: Scalars['ID'];
};

/** A node that can have an author assigned to it */
export type NodeWithAuthor = {
  /** Connection between the NodeWithAuthor type and the User type */
  author?: Maybe<NodeWithAuthorToUserConnectionEdge>;
  /** The database identifier of the author of the node */
  authorDatabaseId?: Maybe<Scalars['Int']>;
  /** The globally unique identifier of the author of the node */
  authorId?: Maybe<Scalars['ID']>;
};

/** Connection between the NodeWithAuthor type and the User type */
export type NodeWithAuthorToUserConnectionEdge = {
  __typename?: 'NodeWithAuthorToUserConnectionEdge';
  /** The nodes of the connection, without the edges */
  node?: Maybe<User>;
};

/** A node that can have comments associated with it */
export type NodeWithComments = {
  /** The number of comments. Even though WPGraphQL denotes this field as an integer, in WordPress this field should be saved as a numeric string for compatibility. */
  commentCount?: Maybe<Scalars['Int']>;
  /** Whether the comments are open or closed for this particular post. */
  commentStatus?: Maybe<Scalars['String']>;
};

/** A node that supports the content editor */
export type NodeWithContentEditor = {
  /** The content of the post. */
  content?: Maybe<Scalars['String']>;
};

/** A node that supports the content editor */
export type NodeWithContentEditorContentArgs = {
  format?: Maybe<PostObjectFieldFormatEnum>;
};

/** A node that can have an excerpt */
export type NodeWithExcerpt = {
  /** The excerpt of the post. */
  excerpt?: Maybe<Scalars['String']>;
};

/** A node that can have an excerpt */
export type NodeWithExcerptExcerptArgs = {
  format?: Maybe<PostObjectFieldFormatEnum>;
};

/** A node that can have a featured image set */
export type NodeWithFeaturedImage = {
  /** Connection between the NodeWithFeaturedImage type and the MediaItem type */
  featuredImage?: Maybe<NodeWithFeaturedImageToMediaItemConnectionEdge>;
  /** The database identifier for the featured image node assigned to the content node */
  featuredImageDatabaseId?: Maybe<Scalars['Int']>;
  /** Globally unique ID of the featured image assigned to the node */
  featuredImageId?: Maybe<Scalars['ID']>;
};

/** Connection between the NodeWithFeaturedImage type and the MediaItem type */
export type NodeWithFeaturedImageToMediaItemConnectionEdge = {
  __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge';
  /** The nodes of the connection, without the edges */
  node?: Maybe<MediaItem>;
};

/** A node that can have page attributes */
export type NodeWithPageAttributes = {
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: Maybe<Scalars['Int']>;
};

/** A node that can have revisions */
export type NodeWithRevisions = {
  /** True if the node is a revision of another node */
  isRevision?: Maybe<Scalars['Boolean']>;
  /** If the current node is a revision, this field exposes the node this is a revision of. Returns null if the node is not a revision of another node. */
  revisionOf?: Maybe<NodeWithRevisionsToContentNodeConnectionEdge>;
};

/** Connection between the NodeWithRevisions type and the ContentNode type */
export type NodeWithRevisionsToContentNodeConnectionEdge = {
  __typename?: 'NodeWithRevisionsToContentNodeConnectionEdge';
  /** The nodes of the connection, without the edges */
  node?: Maybe<ContentNode>;
};

/** A node that can have a template associated with it */
export type NodeWithTemplate = {
  /** The template assigned to the node */
  template?: Maybe<ContentTemplate>;
};

/** A node that NodeWith a title */
export type NodeWithTitle = {
  /** The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made. */
  title?: Maybe<Scalars['String']>;
};

/** A node that NodeWith a title */
export type NodeWithTitleTitleArgs = {
  format?: Maybe<PostObjectFieldFormatEnum>;
};

/** A node that can have trackbacks and pingbacks */
export type NodeWithTrackbacks = {
  /** Whether the pings are open or closed for this particular post. */
  pingStatus?: Maybe<Scalars['String']>;
  /** URLs that have been pinged. */
  pinged?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** URLs queued to be pinged. */
  toPing?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** What to use for the notification "to". */
export enum NotificationToTypeEnum {
  /** Email address. */
  Email = 'EMAIL',
  /** Form field. */
  Field = 'FIELD',
  /** Hidden. */
  Hidden = 'HIDDEN',
  /** Routing using conditional rules. */
  Routing = 'ROUTING',
}

/** Gravity Forms Number field. */
export type NumberField = FormField & {
  __typename?: 'NumberField';
  /** When specified, the value of this property will be used on the admin pages instead of the label. It is useful for fields with long labels. */
  adminLabel?: Maybe<Scalars['String']>;
  /** Determines if this field should only visible on the administration pages. A value of 1 will mark the field as admin only and will hide it from the public form. Useful for fields such as “status” that help with managing entries, but don’t apply to users filling out the form. */
  adminOnly?: Maybe<Scalars['Boolean']>;
  /** Determines if the field’s value can be pre-populated dynamically. 1 to allow field to be pre-populated, 0 otherwise. */
  allowsPrepopulate?: Maybe<Scalars['Boolean']>;
  /** The formula used for the number field. */
  calculationFormula?: Maybe<Scalars['String']>;
  /** Specifies to how many decimal places the number should be rounded. This is available when enableCalculation is true, but is not available when the chosen format is “Currency”. */
  calculationRounding?: Maybe<Scalars['String']>;
  /** Controls the visibility of the field based on values selected by the user. */
  conditionalLogic?: Maybe<ConditionalLogic>;
  /** String containing the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields. */
  cssClass?: Maybe<Scalars['String']>;
  /**
   * Array of the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields.
   * @deprecated Please use `cssClass` instead.
   */
  cssClassList?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Contains the default value for the field. When specified, the field&#039;s value will be populated with the contents of this property when the form is displayed. */
  defaultValue?: Maybe<Scalars['String']>;
  /** Field description. */
  description?: Maybe<Scalars['String']>;
  /** The placement of the field description. */
  descriptionPlacement?: Maybe<DescriptionPlacementPropertyEnum>;
  /** Indicates whether the number field is a calculation. */
  enableCalculation?: Maybe<Scalars['Boolean']>;
  /** Contains the message that is displayed for fields that fail validation. */
  errorMessage?: Maybe<Scalars['String']>;
  /** The ID of the form this field belongs to. */
  formId: Scalars['Int'];
  /** Field ID. */
  id: Scalars['Int'];
  /** Assigns a name to this field so that it can be populated dynamically via this input name. Only applicable when allowsPrepopulate is set to 1. */
  inputName?: Maybe<Scalars['String']>;
  /** Determines if the field requires the user to enter a value. 1 marks the field as required, 0 marks the field as not required. Fields marked as required will prevent the form from being submitted if the user has not entered a value in it. */
  isRequired?: Maybe<Scalars['Boolean']>;
  /** Field label that will be displayed on the form and on the admin pages. */
  label?: Maybe<Scalars['String']>;
  /** Determines if the field allows duplicate submissions. 1 to prevent users from submitting the same value more than once, 0 to allow duplicate values. */
  noDuplicates?: Maybe<Scalars['Boolean']>;
  /** Specifies the format allowed for the number field. */
  numberFormat?: Maybe<NumberFieldFormatEnum>;
  /** Field placeholder. */
  placeholder?: Maybe<Scalars['String']>;
  /** Maximum allowed value for a number field. Values higher than the number specified by this property will cause the field to fail validation. */
  rangeMax?: Maybe<Scalars['Float']>;
  /** Minimum allowed value for a number field. Values lower than the number specified by this property will cause the field to fail validation. */
  rangeMin?: Maybe<Scalars['Float']>;
  /** Determines the size of the field when displayed on the page. */
  size?: Maybe<SizePropertyEnum>;
  /** The type of field to be displayed. */
  type: Scalars['String'];
  /** Number field value. */
  value?: Maybe<Scalars['String']>;
  /** Field visibility. */
  visibility?: Maybe<VisibilityPropertyEnum>;
};

/** The format allowed for the number field.  */
export enum NumberFieldFormatEnum {
  /** Currency format. */
  Currency = 'CURRENCY',
  /** Decimal-comma format (e.g. 9.999,99). */
  DecimalComma = 'DECIMAL_COMMA',
  /** Decimal-dot format (e.g. 9,999.99). */
  DecimalDot = 'DECIMAL_DOT',
}

/** Number field value. */
export type NumberFieldValue = {
  __typename?: 'NumberFieldValue';
  /** The value. */
  value?: Maybe<Scalars['String']>;
};

export type ObjectFieldValueUnion =
  | AddressFieldValue
  | ChainedSelectFieldValue
  | CheckboxFieldValue
  | ConsentFieldValue
  | DateFieldValue
  | EmailFieldValue
  | HiddenFieldValue
  | FileUploadFieldValue
  | ListFieldValue
  | MultiSelectFieldValue
  | NameFieldValue
  | NumberFieldValue
  | PhoneFieldValue
  | PostCategoryFieldValue
  | PostContentFieldValue
  | PostCustomFieldValue
  | PostExcerptFieldValue
  | PostImageFieldValue
  | PostTagsFieldValue
  | PostTitleFieldValue
  | RadioFieldValue
  | SelectFieldValue
  | SignatureFieldValue
  | TextAreaFieldValue
  | TextFieldValue
  | TimeFieldValue
  | WebsiteFieldValue;

/** The cardinality of the connection order */
export enum OrderEnum {
  /** Sort the query result set in an ascending order */
  Asc = 'ASC',
  /** Sort the query result set in a descending order */
  Desc = 'DESC',
}

/** The page type */
export type Page = Node &
  ContentNode &
  DatabaseIdentifier &
  NodeWithTemplate &
  UniformResourceIdentifiable &
  NodeWithTitle &
  NodeWithContentEditor &
  NodeWithAuthor &
  NodeWithFeaturedImage &
  NodeWithComments &
  NodeWithRevisions &
  NodeWithPageAttributes &
  HierarchicalContentNode &
  MenuItemLinkable & {
    __typename?: 'Page';
    /** Returns ancestors of the node. Default ordered as lowest (closest to the child) to highest (closest to the root). */
    ancestors?: Maybe<HierarchicalContentNodeToContentNodeAncestorsConnection>;
    /** Connection between the NodeWithAuthor type and the User type */
    author?: Maybe<NodeWithAuthorToUserConnectionEdge>;
    /** The database identifier of the author of the node */
    authorDatabaseId?: Maybe<Scalars['Int']>;
    /** The globally unique identifier of the author of the node */
    authorId?: Maybe<Scalars['ID']>;
    /** Connection between the HierarchicalContentNode type and the ContentNode type */
    children?: Maybe<HierarchicalContentNodeToContentNodeChildrenConnection>;
    /** The number of comments. Even though WPGraphQL denotes this field as an integer, in WordPress this field should be saved as a numeric string for compatibility. */
    commentCount?: Maybe<Scalars['Int']>;
    /** Whether the comments are open or closed for this particular post. */
    commentStatus?: Maybe<Scalars['String']>;
    /** Connection between the page type and the Comment type */
    comments?: Maybe<PageToCommentConnection>;
    /** The content of the post. */
    content?: Maybe<Scalars['String']>;
    /** Connection between the ContentNode type and the ContentType type */
    contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>;
    /** The ID of the node in the database. */
    databaseId: Scalars['Int'];
    /** Post publishing date. */
    date?: Maybe<Scalars['String']>;
    /** The publishing date set in GMT. */
    dateGmt?: Maybe<Scalars['String']>;
    /** The desired slug of the post */
    desiredSlug?: Maybe<Scalars['String']>;
    /** If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn&#039;t exist or is greater than 15 seconds */
    editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>;
    /** The RSS enclosure for the object */
    enclosure?: Maybe<Scalars['String']>;
    /** Connection between the ContentNode type and the EnqueuedScript type */
    enqueuedScripts?: Maybe<ContentNodeToEnqueuedScriptConnection>;
    /** Connection between the ContentNode type and the EnqueuedStylesheet type */
    enqueuedStylesheets?: Maybe<ContentNodeToEnqueuedStylesheetConnection>;
    /** Connection between the NodeWithFeaturedImage type and the MediaItem type */
    featuredImage?: Maybe<NodeWithFeaturedImageToMediaItemConnectionEdge>;
    /** The database identifier for the featured image node assigned to the content node */
    featuredImageDatabaseId?: Maybe<Scalars['Int']>;
    /** Globally unique ID of the featured image assigned to the node */
    featuredImageId?: Maybe<Scalars['ID']>;
    /** The global unique identifier for this post. This currently matches the value stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot; database table. */
    guid?: Maybe<Scalars['String']>;
    /** The globally unique identifier of the page object. */
    id: Scalars['ID'];
    /** Whether this page is set to the static front page. */
    isFrontPage: Scalars['Boolean'];
    /** Whether this page is set to the blog posts page. */
    isPostsPage: Scalars['Boolean'];
    /** Whether the object is a node in the preview state */
    isPreview?: Maybe<Scalars['Boolean']>;
    /** Whether this page is set to the privacy page. */
    isPrivacyPage: Scalars['Boolean'];
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']>;
    /** True if the node is a revision of another node */
    isRevision?: Maybe<Scalars['Boolean']>;
    /** The user that most recently edited the node */
    lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>;
    /** The permalink of the post */
    link?: Maybe<Scalars['String']>;
    /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
    menuOrder?: Maybe<Scalars['Int']>;
    /** The local modified time for a post. If a post was recently updated the modified field will change to match the corresponding time. */
    modified?: Maybe<Scalars['String']>;
    /** The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT. */
    modifiedGmt?: Maybe<Scalars['String']>;
    /**
     * The id field matches the WP_Post-&gt;ID field.
     * @deprecated Deprecated in favor of the databaseId field
     */
    pageId: Scalars['Int'];
    /** The parent of the node. The parent object can be of various types */
    parent?: Maybe<HierarchicalContentNodeToParentContentNodeConnectionEdge>;
    /** Database id of the parent node */
    parentDatabaseId?: Maybe<Scalars['Int']>;
    /** The globally unique identifier of the parent node. */
    parentId?: Maybe<Scalars['ID']>;
    /** Connection between the page type and the page type */
    preview?: Maybe<PageToPreviewConnectionEdge>;
    /** The database id of the preview node */
    previewRevisionDatabaseId?: Maybe<Scalars['Int']>;
    /** Whether the object is a node in the preview state */
    previewRevisionId?: Maybe<Scalars['ID']>;
    /** If the current node is a revision, this field exposes the node this is a revision of. Returns null if the node is not a revision of another node. */
    revisionOf?: Maybe<NodeWithRevisionsToContentNodeConnectionEdge>;
    /** Connection between the page type and the page type */
    revisions?: Maybe<PageToRevisionConnection>;
    /** The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name field and the post_name column in the database for the &quot;post_objects&quot; table. */
    slug?: Maybe<Scalars['String']>;
    /** The current status of the object */
    status?: Maybe<Scalars['String']>;
    /** The template assigned to a node of content */
    template?: Maybe<ContentTemplate>;
    /** The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made. */
    title?: Maybe<Scalars['String']>;
    /** URI path for the resource */
    uri: Scalars['String'];
  };

/** The page type */
export type PageAncestorsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<HierarchicalContentNodeToContentNodeAncestorsConnectionWhereArgs>;
};

/** The page type */
export type PageChildrenArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<HierarchicalContentNodeToContentNodeChildrenConnectionWhereArgs>;
};

/** The page type */
export type PageCommentsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<PageToCommentConnectionWhereArgs>;
};

/** The page type */
export type PageContentArgs = {
  format?: Maybe<PostObjectFieldFormatEnum>;
};

/** The page type */
export type PageEnqueuedScriptsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

/** The page type */
export type PageEnqueuedStylesheetsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

/** The page type */
export type PageRevisionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<PageToRevisionConnectionWhereArgs>;
};

/** The page type */
export type PageTitleArgs = {
  format?: Maybe<PostObjectFieldFormatEnum>;
};

/** Gravity Forms Page field. */
export type PageField = FormField & {
  __typename?: 'PageField';
  /**
   * When specified, the value of this property will be used on the admin pages instead of the label. It is useful for fields with long labels.
   * @deprecated This property is not associated with the Gravity Forms PageField type.
   */
  adminLabel?: Maybe<Scalars['String']>;
  /**
   * Determines if this field should only visible on the administration pages. A value of 1 will mark the field as admin only and will hide it from the public form. Useful for fields such as “status” that help with managing entries, but don’t apply to users filling out the form.
   * @deprecated This property is not associated with the Gravity Forms PageField type.
   */
  adminOnly?: Maybe<Scalars['Boolean']>;
  /**
   * Determines if the field’s value can be pre-populated dynamically. 1 to allow field to be pre-populated, 0 otherwise.
   * @deprecated This property is not associated with the Gravity Forms PageField type.
   */
  allowsPrepopulate?: Maybe<Scalars['Boolean']>;
  /** Controls the visibility of the field based on values selected by the user. */
  conditionalLogic?: Maybe<ConditionalLogic>;
  /** String containing the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields. */
  cssClass?: Maybe<Scalars['String']>;
  /**
   * Array of the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields.
   * @deprecated Please use `cssClass` instead.
   */
  cssClassList?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Indicates the field is only displayed and its contents are not submitted with the form/saved with the entry. This is set to true. */
  displayOnly?: Maybe<Scalars['Boolean']>;
  /** The ID of the form this field belongs to. */
  formId: Scalars['Int'];
  /** Field ID. */
  id: Scalars['Int'];
  /**
   * Field label that will be displayed on the form and on the admin pages.
   * @deprecated This property is not associated with the Gravity Forms PageField type.
   */
  label?: Maybe<Scalars['String']>;
  /** An array containing the the individual properties for the &quot;Next&quot; button. */
  nextButton?: Maybe<Button>;
  /** The page number of the current page. */
  pageNumber?: Maybe<Scalars['Int']>;
  /** An array containing the the individual properties for the &quot;Previous&quot; button. */
  previousButton?: Maybe<Button>;
  /** Determines the size of the field when displayed on the page. */
  size?: Maybe<SizePropertyEnum>;
  /** The type of field to be displayed. */
  type: Scalars['String'];
  /**
   * Field visibility.
   * @deprecated This property is not associated with the Gravity Forms PageField type.
   */
  visibility?: Maybe<VisibilityPropertyEnum>;
};

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum PageIdType {
  /** Identify a resource by the Database ID. */
  DatabaseId = 'DATABASE_ID',
  /** Identify a resource by the (hashed) Global ID. */
  Id = 'ID',
  /** Identify a resource by the URI. */
  Uri = 'URI',
}

/** Style of progress bar. */
export enum PageProgressStyleEnum {
  /** Blue progress bar style. */
  Blue = 'BLUE',
  /** Custom progress bar style. */
  Custom = 'CUSTOM',
  /** Green progress bar style. */
  Green = 'GREEN',
  /** Grey progress bar style. */
  Grey = 'GREY',
  /** Orange progress bar style. */
  Orange = 'ORANGE',
  /** Red progress bar style. */
  Red = 'RED',
}

/** Type of page progress indicator to be displayed */
export enum PageProgressTypeEnum {
  /** Don't show a page progress indicator. */
  None = 'NONE',
  /** Show page progress indicator as a percentage. */
  Percentage = 'PERCENTAGE',
  /** Show page progress indicator as steps. */
  Steps = 'STEPS',
}

/** Connection between the page type and the Comment type */
export type PageToCommentConnection = {
  __typename?: 'PageToCommentConnection';
  /** Edges for the PageToCommentConnection connection */
  edges?: Maybe<Array<Maybe<PageToCommentConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Comment>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type PageToCommentConnectionEdge = {
  __typename?: 'PageToCommentConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<Comment>;
};

/** Arguments for filtering the PageToCommentConnection connection */
export type PageToCommentConnectionWhereArgs = {
  /** Comment author email address. */
  authorEmail?: Maybe<Scalars['String']>;
  /** Array of author IDs to include comments for. */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Comment author URL. */
  authorUrl?: Maybe<Scalars['String']>;
  /** Array of comment IDs to include. */
  commentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Include comments of a given type. */
  commentType?: Maybe<Scalars['String']>;
  /** Include comments from a given array of comment types. */
  commentTypeIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: Maybe<Scalars['String']>;
  /** Content object author ID to limit results by. */
  contentAuthor?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: Maybe<Scalars['ID']>;
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Content object name to retrieve affiliated comments for. */
  contentName?: Maybe<Scalars['String']>;
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: Maybe<Scalars['Int']>;
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: Maybe<Array<Maybe<PostStatusEnum>>>;
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: Maybe<Array<Maybe<ContentTypeEnum>>>;
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Karma score to retrieve matching comments for. */
  karma?: Maybe<Scalars['Int']>;
  /** The cardinality of the order of the connection */
  order?: Maybe<OrderEnum>;
  /** Field to order the comments by. */
  orderby?: Maybe<CommentsConnectionOrderbyEnum>;
  /** Parent ID of comment to retrieve children of. */
  parent?: Maybe<Scalars['Int']>;
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Search term(s) to retrieve matching comments for. */
  search?: Maybe<Scalars['String']>;
  /** Comment status to limit results by. */
  status?: Maybe<Scalars['String']>;
  /** Include comments for a specific user ID. */
  userId?: Maybe<Scalars['ID']>;
};

/** Connection between the page type and the page type */
export type PageToPreviewConnectionEdge = {
  __typename?: 'PageToPreviewConnectionEdge';
  /** The nodes of the connection, without the edges */
  node?: Maybe<Page>;
};

/** Connection between the page type and the page type */
export type PageToRevisionConnection = {
  __typename?: 'PageToRevisionConnection';
  /** Edges for the pageToRevisionConnection connection */
  edges?: Maybe<Array<Maybe<PageToRevisionConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Page>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type PageToRevisionConnectionEdge = {
  __typename?: 'PageToRevisionConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<Page>;
};

/** Arguments for filtering the pageToRevisionConnection connection */
export type PageToRevisionConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: Maybe<Scalars['Int']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: Maybe<Scalars['String']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>;
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>;
  /** Title of the object */
  title?: Maybe<Scalars['String']>;
};

/** Gravity Forms Password field. */
export type PasswordField = FormField & {
  __typename?: 'PasswordField';
  /** When specified, the value of this property will be used on the admin pages instead of the label. It is useful for fields with long labels. */
  adminLabel?: Maybe<Scalars['String']>;
  /** Determines if this field should only visible on the administration pages. A value of 1 will mark the field as admin only and will hide it from the public form. Useful for fields such as “status” that help with managing entries, but don’t apply to users filling out the form. */
  adminOnly?: Maybe<Scalars['Boolean']>;
  /**
   * Determines if the field’s value can be pre-populated dynamically. 1 to allow field to be pre-populated, 0 otherwise.
   * @deprecated This property is not associated with the Gravity Forms PasswordField type.
   */
  allowsPrepopulate?: Maybe<Scalars['Boolean']>;
  /** Controls the visibility of the field based on values selected by the user. */
  conditionalLogic?: Maybe<ConditionalLogic>;
  /** String containing the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields. */
  cssClass?: Maybe<Scalars['String']>;
  /**
   * Array of the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields.
   * @deprecated Please use `cssClass` instead.
   */
  cssClassList?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Field description. */
  description?: Maybe<Scalars['String']>;
  /** The placement of the field description. */
  descriptionPlacement?: Maybe<DescriptionPlacementPropertyEnum>;
  /** Contains the message that is displayed for fields that fail validation. */
  errorMessage?: Maybe<Scalars['String']>;
  /** The ID of the form this field belongs to. */
  formId: Scalars['Int'];
  /** Field ID. */
  id: Scalars['Int'];
  /** Individual properties for each element of the password field. */
  inputs?: Maybe<Array<Maybe<PasswordInputProperty>>>;
  /** Determines if the field requires the user to enter a value. 1 marks the field as required, 0 marks the field as not required. Fields marked as required will prevent the form from being submitted if the user has not entered a value in it. */
  isRequired?: Maybe<Scalars['Boolean']>;
  /** Field label that will be displayed on the form and on the admin pages. */
  label?: Maybe<Scalars['String']>;
  /** Indicates how strong the password should be. */
  minPasswordStrength?: Maybe<MinPasswordStrengthEnum>;
  /** Indicates whether the field displays the password strength indicator. */
  passwordStrengthEnabled?: Maybe<Scalars['Boolean']>;
  /** Field placeholder. */
  placeholder?: Maybe<Scalars['String']>;
  /** Determines the size of the field when displayed on the page. */
  size?: Maybe<SizePropertyEnum>;
  /** The placement of the labels for the subfields within the group. This setting controls all of the subfields, they cannot be set individually. They may be aligned above or below the inputs. If this property is not set, the “Sub-Label Placement” setting on the Form Settings-&gt;Form Layout page is used. If no setting is specified, the default is above inputs. */
  subLabelPlacement?: Maybe<Scalars['String']>;
  /** The type of field to be displayed. */
  type: Scalars['String'];
  /**
   * Field visibility.
   * @deprecated This property is not associated with the Gravity Forms PasswordField type.
   */
  visibility?: Maybe<VisibilityPropertyEnum>;
};

/** An array containing the the individual properties for each element of the password field. */
export type PasswordInputProperty = {
  __typename?: 'PasswordInputProperty';
  /** The custom label for the input. When set, this is used in place of the label. */
  customLabel?: Maybe<Scalars['String']>;
  /** The input ID. Input IDs follow the following naming convention: FIELDID.INPUTID (i.e. 5.1), where FIELDID is the id of the containing field and INPUTID specifies the input field. */
  id?: Maybe<Scalars['Float']>;
  /** Whether or not this field should be hidden. */
  isHidden?: Maybe<Scalars['Boolean']>;
  /** Input label. */
  label?: Maybe<Scalars['String']>;
  /** Placeholder text to give the user a hint on how to fill out the field. This is not submitted with the form. */
  placeholder?: Maybe<Scalars['String']>;
};

/** Gravity Forms Phone field. */
export type PhoneField = FormField & {
  __typename?: 'PhoneField';
  /** When specified, the value of this property will be used on the admin pages instead of the label. It is useful for fields with long labels. */
  adminLabel?: Maybe<Scalars['String']>;
  /** Determines if this field should only visible on the administration pages. A value of 1 will mark the field as admin only and will hide it from the public form. Useful for fields such as “status” that help with managing entries, but don’t apply to users filling out the form. */
  adminOnly?: Maybe<Scalars['Boolean']>;
  /** Determines if the field’s value can be pre-populated dynamically. 1 to allow field to be pre-populated, 0 otherwise. */
  allowsPrepopulate?: Maybe<Scalars['Boolean']>;
  /** Controls the visibility of the field based on values selected by the user. */
  conditionalLogic?: Maybe<ConditionalLogic>;
  /** String containing the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields. */
  cssClass?: Maybe<Scalars['String']>;
  /**
   * Array of the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields.
   * @deprecated Please use `cssClass` instead.
   */
  cssClassList?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Contains the default value for the field. When specified, the field&#039;s value will be populated with the contents of this property when the form is displayed. */
  defaultValue?: Maybe<Scalars['String']>;
  /** Field description. */
  description?: Maybe<Scalars['String']>;
  /** The placement of the field description. */
  descriptionPlacement?: Maybe<DescriptionPlacementPropertyEnum>;
  /** Contains the message that is displayed for fields that fail validation. */
  errorMessage?: Maybe<Scalars['String']>;
  /** The ID of the form this field belongs to. */
  formId: Scalars['Int'];
  /** Field ID. */
  id: Scalars['Int'];
  /** Assigns a name to this field so that it can be populated dynamically via this input name. Only applicable when allowsPrepopulate is set to 1. */
  inputName?: Maybe<Scalars['String']>;
  /** Determines if the field requires the user to enter a value. 1 marks the field as required, 0 marks the field as not required. Fields marked as required will prevent the form from being submitted if the user has not entered a value in it. */
  isRequired?: Maybe<Scalars['Boolean']>;
  /** Field label that will be displayed on the form and on the admin pages. */
  label?: Maybe<Scalars['String']>;
  /** Determines if the field allows duplicate submissions. 1 to prevent users from submitting the same value more than once, 0 to allow duplicate values. */
  noDuplicates?: Maybe<Scalars['Boolean']>;
  /** Determines the allowed format for phones. If the phone value does not conform with the specified format, the field will fail validation. */
  phoneFormat?: Maybe<PhoneFieldFormatEnum>;
  /** Field placeholder. */
  placeholder?: Maybe<Scalars['String']>;
  /** Determines the size of the field when displayed on the page. */
  size?: Maybe<SizePropertyEnum>;
  /** The type of field to be displayed. */
  type: Scalars['String'];
  /** Phone field value. */
  value?: Maybe<Scalars['String']>;
  /** Field visibility. */
  visibility?: Maybe<VisibilityPropertyEnum>;
};

/** Tthe allowed format for phone numbers. */
export enum PhoneFieldFormatEnum {
  /** International phone number format. */
  International = 'INTERNATIONAL',
  /** Standard phone number format. */
  Standard = 'STANDARD',
}

/** Phone field value. */
export type PhoneFieldValue = {
  __typename?: 'PhoneFieldValue';
  /** The value. */
  value?: Maybe<Scalars['String']>;
};

/** An plugin object */
export type Plugin = Node & {
  __typename?: 'Plugin';
  /** Name of the plugin author(s), may also be a company name. */
  author?: Maybe<Scalars['String']>;
  /** URI for the related author(s)/company website. */
  authorUri?: Maybe<Scalars['String']>;
  /** Description of the plugin. */
  description?: Maybe<Scalars['String']>;
  /** The globally unique identifier of the plugin object. */
  id: Scalars['ID'];
  /** Whether the object is restricted from the current viewer */
  isRestricted?: Maybe<Scalars['Boolean']>;
  /** Display name of the plugin. */
  name?: Maybe<Scalars['String']>;
  /** Plugin path. */
  path?: Maybe<Scalars['String']>;
  /** URI for the plugin website. This is useful for directing users for support requests etc. */
  pluginUri?: Maybe<Scalars['String']>;
  /** Current version of the plugin. */
  version?: Maybe<Scalars['String']>;
};

/** The post type */
export type Post = Node &
  ContentNode &
  DatabaseIdentifier &
  NodeWithTemplate &
  UniformResourceIdentifiable &
  NodeWithTitle &
  NodeWithContentEditor &
  NodeWithAuthor &
  NodeWithFeaturedImage &
  NodeWithExcerpt &
  NodeWithComments &
  NodeWithTrackbacks &
  NodeWithRevisions &
  MenuItemLinkable & {
    __typename?: 'Post';
    /** Connection between the NodeWithAuthor type and the User type */
    author?: Maybe<NodeWithAuthorToUserConnectionEdge>;
    /** The database identifier of the author of the node */
    authorDatabaseId?: Maybe<Scalars['Int']>;
    /** The globally unique identifier of the author of the node */
    authorId?: Maybe<Scalars['ID']>;
    /** Connection between the post type and the category type */
    categories?: Maybe<PostToCategoryConnection>;
    /** The number of comments. Even though WPGraphQL denotes this field as an integer, in WordPress this field should be saved as a numeric string for compatibility. */
    commentCount?: Maybe<Scalars['Int']>;
    /** Whether the comments are open or closed for this particular post. */
    commentStatus?: Maybe<Scalars['String']>;
    /** Connection between the post type and the Comment type */
    comments?: Maybe<PostToCommentConnection>;
    /** The content of the post. */
    content?: Maybe<Scalars['String']>;
    /** Connection between the ContentNode type and the ContentType type */
    contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>;
    /** The ID of the node in the database. */
    databaseId: Scalars['Int'];
    /** Post publishing date. */
    date?: Maybe<Scalars['String']>;
    /** The publishing date set in GMT. */
    dateGmt?: Maybe<Scalars['String']>;
    /** The desired slug of the post */
    desiredSlug?: Maybe<Scalars['String']>;
    /** If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn&#039;t exist or is greater than 15 seconds */
    editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>;
    /** The RSS enclosure for the object */
    enclosure?: Maybe<Scalars['String']>;
    /** Connection between the ContentNode type and the EnqueuedScript type */
    enqueuedScripts?: Maybe<ContentNodeToEnqueuedScriptConnection>;
    /** Connection between the ContentNode type and the EnqueuedStylesheet type */
    enqueuedStylesheets?: Maybe<ContentNodeToEnqueuedStylesheetConnection>;
    /** The excerpt of the post. */
    excerpt?: Maybe<Scalars['String']>;
    /** Connection between the NodeWithFeaturedImage type and the MediaItem type */
    featuredImage?: Maybe<NodeWithFeaturedImageToMediaItemConnectionEdge>;
    /** The database identifier for the featured image node assigned to the content node */
    featuredImageDatabaseId?: Maybe<Scalars['Int']>;
    /** Globally unique ID of the featured image assigned to the node */
    featuredImageId?: Maybe<Scalars['ID']>;
    /** The global unique identifier for this post. This currently matches the value stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot; database table. */
    guid?: Maybe<Scalars['String']>;
    /** The globally unique identifier of the post object. */
    id: Scalars['ID'];
    /** Whether the object is a node in the preview state */
    isPreview?: Maybe<Scalars['Boolean']>;
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']>;
    /** True if the node is a revision of another node */
    isRevision?: Maybe<Scalars['Boolean']>;
    /** Whether this page is sticky */
    isSticky: Scalars['Boolean'];
    /** The user that most recently edited the node */
    lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>;
    /** The permalink of the post */
    link?: Maybe<Scalars['String']>;
    /** The local modified time for a post. If a post was recently updated the modified field will change to match the corresponding time. */
    modified?: Maybe<Scalars['String']>;
    /** The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT. */
    modifiedGmt?: Maybe<Scalars['String']>;
    /** Whether the pings are open or closed for this particular post. */
    pingStatus?: Maybe<Scalars['String']>;
    /** URLs that have been pinged. */
    pinged?: Maybe<Array<Maybe<Scalars['String']>>>;
    /** Connection between the post type and the postFormat type */
    postFormats?: Maybe<PostToPostFormatConnection>;
    /**
     * The id field matches the WP_Post-&gt;ID field.
     * @deprecated Deprecated in favor of the databaseId field
     */
    postId: Scalars['Int'];
    /** Connection between the post type and the post type */
    preview?: Maybe<PostToPreviewConnectionEdge>;
    /** The database id of the preview node */
    previewRevisionDatabaseId?: Maybe<Scalars['Int']>;
    /** Whether the object is a node in the preview state */
    previewRevisionId?: Maybe<Scalars['ID']>;
    /** If the current node is a revision, this field exposes the node this is a revision of. Returns null if the node is not a revision of another node. */
    revisionOf?: Maybe<NodeWithRevisionsToContentNodeConnectionEdge>;
    /** Connection between the post type and the post type */
    revisions?: Maybe<PostToRevisionConnection>;
    /** The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name field and the post_name column in the database for the &quot;post_objects&quot; table. */
    slug?: Maybe<Scalars['String']>;
    /** The current status of the object */
    status?: Maybe<Scalars['String']>;
    /** Connection between the post type and the tag type */
    tags?: Maybe<PostToTagConnection>;
    /** The template assigned to a node of content */
    template?: Maybe<ContentTemplate>;
    /** Connection between the post type and the TermNode type */
    terms?: Maybe<PostToTermNodeConnection>;
    /** The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made. */
    title?: Maybe<Scalars['String']>;
    /** URLs queued to be pinged. */
    toPing?: Maybe<Array<Maybe<Scalars['String']>>>;
    /** URI path for the resource */
    uri: Scalars['String'];
  };

/** The post type */
export type PostCategoriesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<PostToCategoryConnectionWhereArgs>;
};

/** The post type */
export type PostCommentsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<PostToCommentConnectionWhereArgs>;
};

/** The post type */
export type PostContentArgs = {
  format?: Maybe<PostObjectFieldFormatEnum>;
};

/** The post type */
export type PostEnqueuedScriptsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

/** The post type */
export type PostEnqueuedStylesheetsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

/** The post type */
export type PostExcerptArgs = {
  format?: Maybe<PostObjectFieldFormatEnum>;
};

/** The post type */
export type PostPostFormatsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<PostToPostFormatConnectionWhereArgs>;
};

/** The post type */
export type PostRevisionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<PostToRevisionConnectionWhereArgs>;
};

/** The post type */
export type PostTagsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<PostToTagConnectionWhereArgs>;
};

/** The post type */
export type PostTermsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<PostToTermNodeConnectionWhereArgs>;
};

/** The post type */
export type PostTitleArgs = {
  format?: Maybe<PostObjectFieldFormatEnum>;
};

/** Set relationships between the post to categories */
export type PostCategoriesInput = {
  /** If true, this will append the category to existing related categories. If false, this will replace existing relationships. Default true. */
  append?: Maybe<Scalars['Boolean']>;
  /** The input list of items to set. */
  nodes?: Maybe<Array<Maybe<PostCategoriesNodeInput>>>;
};

/** List of categories to connect the post to. If an ID is set, it will be used to create the connection. If not, it will look for a slug. If neither are valid existing terms, and the site is configured to allow terms to be created during post mutations, a term will be created using the Name if it exists in the input, then fallback to the slug if it exists. */
export type PostCategoriesNodeInput = {
  /** The description of the category. This field is used to set a description of the category if a new one is created during the mutation. */
  description?: Maybe<Scalars['String']>;
  /** The ID of the category. If present, this will be used to connect to the post. If no existing category exists with this ID, no connection will be made. */
  id?: Maybe<Scalars['ID']>;
  /** The name of the category. This field is used to create a new term, if term creation is enabled in nested mutations, and if one does not already exist with the provided slug or ID or if a slug or ID is not provided. If no name is included and a term is created, the creation will fallback to the slug field. */
  name?: Maybe<Scalars['String']>;
  /** The slug of the category. If no ID is present, this field will be used to make a connection. If no existing term exists with this slug, this field will be used as a fallback to the Name field when creating a new term to connect to, if term creation is enabled as a nested mutation. */
  slug?: Maybe<Scalars['String']>;
};

/** Gravity Forms Post Category field. */
export type PostCategoryField = FormField & {
  __typename?: 'PostCategoryField';
  /** When specified, the value of this property will be used on the admin pages instead of the label. It is useful for fields with long labels. */
  adminLabel?: Maybe<Scalars['String']>;
  /** Determines if this field should only visible on the administration pages. A value of 1 will mark the field as admin only and will hide it from the public form. Useful for fields such as “status” that help with managing entries, but don’t apply to users filling out the form. */
  adminOnly?: Maybe<Scalars['Boolean']>;
  /** Determines if the field’s value can be pre-populated dynamically. 1 to allow field to be pre-populated, 0 otherwise. */
  allowsPrepopulate?: Maybe<Scalars['Boolean']>;
  /** Contains the available choices for the field. For instance, drop down items and checkbox items are configured with this property. */
  choices?: Maybe<Array<Maybe<ChoiceProperty>>>;
  /** Controls the visibility of the field based on values selected by the user. */
  conditionalLogic?: Maybe<ConditionalLogic>;
  /** String containing the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields. */
  cssClass?: Maybe<Scalars['String']>;
  /**
   * Array of the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields.
   * @deprecated Please use `cssClass` instead.
   */
  cssClassList?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Field description. */
  description?: Maybe<Scalars['String']>;
  /** The placement of the field description. */
  descriptionPlacement?: Maybe<DescriptionPlacementPropertyEnum>;
  /** Determines if all categories should be displayed on the Post Category drop down. If this property is true (display all categories), the Post Category drop down will display the categories hierarchically. */
  displayAllCategories?: Maybe<Scalars['Boolean']>;
  /** Contains the message that is displayed for fields that fail validation. */
  errorMessage?: Maybe<Scalars['String']>;
  /** The ID of the form this field belongs to. */
  formId: Scalars['Int'];
  /** Field ID. */
  id: Scalars['Int'];
  /** Assigns a name to this field so that it can be populated dynamically via this input name. Only applicable when allowsPrepopulate is set to 1. */
  inputName?: Maybe<Scalars['String']>;
  /** Determines if the field requires the user to enter a value. 1 marks the field as required, 0 marks the field as not required. Fields marked as required will prevent the form from being submitted if the user has not entered a value in it. */
  isRequired?: Maybe<Scalars['Boolean']>;
  /** Field label that will be displayed on the form and on the admin pages. */
  label?: Maybe<Scalars['String']>;
  /** Determines if the field allows duplicate submissions. 1 to prevent users from submitting the same value more than once, 0 to allow duplicate values. */
  noDuplicates?: Maybe<Scalars['Boolean']>;
  /** Field placeholder. */
  placeholder?: Maybe<Scalars['String']>;
  /** Determines the size of the field when displayed on the page. */
  size?: Maybe<SizePropertyEnum>;
  /** The type of field to be displayed. */
  type: Scalars['String'];
  /** PostCategory field value. */
  values?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Field visibility. */
  visibility?: Maybe<VisibilityPropertyEnum>;
};

/** Post category field value. */
export type PostCategoryFieldValue = {
  __typename?: 'PostCategoryFieldValue';
  /** The values. */
  values?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** Gravity Forms Post Content field. */
export type PostContentField = FormField & {
  __typename?: 'PostContentField';
  /** When specified, the value of this property will be used on the admin pages instead of the label. It is useful for fields with long labels. */
  adminLabel?: Maybe<Scalars['String']>;
  /** Determines if this field should only visible on the administration pages. A value of 1 will mark the field as admin only and will hide it from the public form. Useful for fields such as “status” that help with managing entries, but don’t apply to users filling out the form. */
  adminOnly?: Maybe<Scalars['Boolean']>;
  /** Controls the visibility of the field based on values selected by the user. */
  conditionalLogic?: Maybe<ConditionalLogic>;
  /** String containing the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields. */
  cssClass?: Maybe<Scalars['String']>;
  /**
   * Array of the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields.
   * @deprecated Please use `cssClass` instead.
   */
  cssClassList?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Contains the default value for the field. When specified, the field&#039;s value will be populated with the contents of this property when the form is displayed. */
  defaultValue?: Maybe<Scalars['String']>;
  /** Field description. */
  description?: Maybe<Scalars['String']>;
  /** The placement of the field description. */
  descriptionPlacement?: Maybe<DescriptionPlacementPropertyEnum>;
  /** Contains the message that is displayed for fields that fail validation. */
  errorMessage?: Maybe<Scalars['String']>;
  /** The ID of the form this field belongs to. */
  formId: Scalars['Int'];
  /** Field ID. */
  id: Scalars['Int'];
  /** Assigns a name to this field so that it can be populated dynamically via this input name. Only applicable when allowsPrepopulate is set to 1. */
  inputName?: Maybe<Scalars['String']>;
  /** Determines if the field requires the user to enter a value. 1 marks the field as required, 0 marks the field as not required. Fields marked as required will prevent the form from being submitted if the user has not entered a value in it. */
  isRequired?: Maybe<Scalars['Boolean']>;
  /** Field label that will be displayed on the form and on the admin pages. */
  label?: Maybe<Scalars['String']>;
  /** Specifies the maximum number of characters allowed in a text or textarea (paragraph) field. */
  maxLength?: Maybe<Scalars['Int']>;
  /** Field placeholder. */
  placeholder?: Maybe<Scalars['String']>;
  /** Determines the size of the field when displayed on the page. */
  size?: Maybe<SizePropertyEnum>;
  /** The type of field to be displayed. */
  type: Scalars['String'];
  /** PostContent field value. */
  value?: Maybe<Scalars['String']>;
  /** Field visibility. */
  visibility?: Maybe<VisibilityPropertyEnum>;
};

/** Post content field value. */
export type PostContentFieldValue = {
  __typename?: 'PostContentFieldValue';
  /** The value. */
  value?: Maybe<Scalars['String']>;
};

/** Gravity Forms Post Custom Field field. */
export type PostCustomField = FormField & {
  __typename?: 'PostCustomField';
  /** When specified, the value of this property will be used on the admin pages instead of the label. It is useful for fields with long labels. */
  adminLabel?: Maybe<Scalars['String']>;
  /** Determines if this field should only visible on the administration pages. A value of 1 will mark the field as admin only and will hide it from the public form. Useful for fields such as “status” that help with managing entries, but don’t apply to users filling out the form. */
  adminOnly?: Maybe<Scalars['Boolean']>;
  /** Determines if the field’s value can be pre-populated dynamically. 1 to allow field to be pre-populated, 0 otherwise. */
  allowsPrepopulate?: Maybe<Scalars['Boolean']>;
  /** Controls the visibility of the field based on values selected by the user. */
  conditionalLogic?: Maybe<ConditionalLogic>;
  /** String containing the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields. */
  cssClass?: Maybe<Scalars['String']>;
  /**
   * Array of the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields.
   * @deprecated Please use `cssClass` instead.
   */
  cssClassList?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Contains the default value for the field. When specified, the field&#039;s value will be populated with the contents of this property when the form is displayed. */
  defaultValue?: Maybe<Scalars['String']>;
  /** Field description. */
  description?: Maybe<Scalars['String']>;
  /** The placement of the field description. */
  descriptionPlacement?: Maybe<DescriptionPlacementPropertyEnum>;
  /** Contains the message that is displayed for fields that fail validation. */
  errorMessage?: Maybe<Scalars['String']>;
  /** The ID of the form this field belongs to. */
  formId: Scalars['Int'];
  /** Field ID. */
  id: Scalars['Int'];
  /** Assigns a name to this field so that it can be populated dynamically via this input name. Only applicable when allowsPrepopulate is set to 1. */
  inputName?: Maybe<Scalars['String']>;
  /** Contains a field type and allows a field type to be displayed as another field type. A good example is the Post Custom Field, that can be displayed as various different types of fields. */
  inputType?: Maybe<Scalars['String']>;
  /** Determines if the field requires the user to enter a value. 1 marks the field as required, 0 marks the field as not required. Fields marked as required will prevent the form from being submitted if the user has not entered a value in it. */
  isRequired?: Maybe<Scalars['Boolean']>;
  /** Field label that will be displayed on the form and on the admin pages. */
  label?: Maybe<Scalars['String']>;
  /** Specifies the maximum number of characters allowed in a text or textarea (paragraph) field. */
  maxLength?: Maybe<Scalars['Int']>;
  /** Determines if the field allows duplicate submissions. 1 to prevent users from submitting the same value more than once, 0 to allow duplicate values. */
  noDuplicates?: Maybe<Scalars['Boolean']>;
  /** Field placeholder. */
  placeholder?: Maybe<Scalars['String']>;
  /** The name of the Post Custom Field that the submitted value should be assigned to. */
  postCustomFieldName?: Maybe<Scalars['String']>;
  /** Determines the size of the field when displayed on the page. */
  size?: Maybe<SizePropertyEnum>;
  /** The type of field to be displayed. */
  type: Scalars['String'];
  /** PostCustom field value. */
  values?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Field visibility. */
  visibility?: Maybe<VisibilityPropertyEnum>;
};

/** Post custom field value. */
export type PostCustomFieldValue = {
  __typename?: 'PostCustomFieldValue';
  /** The value. */
  values?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** Gravity Forms Post Excerpt field. */
export type PostExcerptField = FormField & {
  __typename?: 'PostExcerptField';
  /** When specified, the value of this property will be used on the admin pages instead of the label. It is useful for fields with long labels. */
  adminLabel?: Maybe<Scalars['String']>;
  /** Determines if this field should only visible on the administration pages. A value of 1 will mark the field as admin only and will hide it from the public form. Useful for fields such as “status” that help with managing entries, but don’t apply to users filling out the form. */
  adminOnly?: Maybe<Scalars['Boolean']>;
  /** Determines if the field’s value can be pre-populated dynamically. 1 to allow field to be pre-populated, 0 otherwise. */
  allowsPrepopulate?: Maybe<Scalars['Boolean']>;
  /** Controls the visibility of the field based on values selected by the user. */
  conditionalLogic?: Maybe<ConditionalLogic>;
  /** String containing the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields. */
  cssClass?: Maybe<Scalars['String']>;
  /**
   * Array of the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields.
   * @deprecated Please use `cssClass` instead.
   */
  cssClassList?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Contains the default value for the field. When specified, the field&#039;s value will be populated with the contents of this property when the form is displayed. */
  defaultValue?: Maybe<Scalars['String']>;
  /** Field description. */
  description?: Maybe<Scalars['String']>;
  /** The placement of the field description. */
  descriptionPlacement?: Maybe<DescriptionPlacementPropertyEnum>;
  /** Contains the message that is displayed for fields that fail validation. */
  errorMessage?: Maybe<Scalars['String']>;
  /** The ID of the form this field belongs to. */
  formId: Scalars['Int'];
  /** Field ID. */
  id: Scalars['Int'];
  /** Assigns a name to this field so that it can be populated dynamically via this input name. Only applicable when allowsPrepopulate is set to 1. */
  inputName?: Maybe<Scalars['String']>;
  /** Determines if the field requires the user to enter a value. 1 marks the field as required, 0 marks the field as not required. Fields marked as required will prevent the form from being submitted if the user has not entered a value in it. */
  isRequired?: Maybe<Scalars['Boolean']>;
  /** Field label that will be displayed on the form and on the admin pages. */
  label?: Maybe<Scalars['String']>;
  /** Specifies the maximum number of characters allowed in a text or textarea (paragraph) field. */
  maxLength?: Maybe<Scalars['Int']>;
  /** Field placeholder. */
  placeholder?: Maybe<Scalars['String']>;
  /** Determines the size of the field when displayed on the page. */
  size?: Maybe<SizePropertyEnum>;
  /** The type of field to be displayed. */
  type: Scalars['String'];
  /** PostExcerpt field value. */
  value?: Maybe<Scalars['String']>;
  /** Field visibility. */
  visibility?: Maybe<VisibilityPropertyEnum>;
};

/** Post excerpt field value. */
export type PostExcerptFieldValue = {
  __typename?: 'PostExcerptFieldValue';
  /** The value. */
  value?: Maybe<Scalars['String']>;
};

/** The postFormat type */
export type PostFormat = Node &
  TermNode &
  DatabaseIdentifier &
  UniformResourceIdentifiable &
  MenuItemLinkable & {
    __typename?: 'PostFormat';
    /** Connection between the postFormat type and the ContentNode type */
    contentNodes?: Maybe<PostFormatToContentNodeConnection>;
    /** The number of objects connected to the object */
    count?: Maybe<Scalars['Int']>;
    /** Identifies the primary key from the database. */
    databaseId: Scalars['Int'];
    /** The description of the object */
    description?: Maybe<Scalars['String']>;
    /** Connection between the TermNode type and the EnqueuedScript type */
    enqueuedScripts?: Maybe<TermNodeToEnqueuedScriptConnection>;
    /** Connection between the TermNode type and the EnqueuedStylesheet type */
    enqueuedStylesheets?: Maybe<TermNodeToEnqueuedStylesheetConnection>;
    /** The globally unique ID for the object */
    id: Scalars['ID'];
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']>;
    /** The link to the term */
    link?: Maybe<Scalars['String']>;
    /** The human friendly name of the object. */
    name?: Maybe<Scalars['String']>;
    /**
     * The id field matches the WP_Post-&gt;ID field.
     * @deprecated Deprecated in favor of databaseId
     */
    postFormatId?: Maybe<Scalars['Int']>;
    /** Connection between the postFormat type and the post type */
    posts?: Maybe<PostFormatToPostConnection>;
    /** An alphanumeric identifier for the object unique to its type. */
    slug?: Maybe<Scalars['String']>;
    /** Connection between the postFormat type and the Taxonomy type */
    taxonomy?: Maybe<PostFormatToTaxonomyConnectionEdge>;
    /** The ID of the term group that this term object belongs to */
    termGroupId?: Maybe<Scalars['Int']>;
    /** The taxonomy ID that the object is associated with */
    termTaxonomyId?: Maybe<Scalars['Int']>;
    /** The unique resource identifier path */
    uri: Scalars['String'];
  };

/** The postFormat type */
export type PostFormatContentNodesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<PostFormatToContentNodeConnectionWhereArgs>;
};

/** The postFormat type */
export type PostFormatEnqueuedScriptsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

/** The postFormat type */
export type PostFormatEnqueuedStylesheetsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

/** The postFormat type */
export type PostFormatPostsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<PostFormatToPostConnectionWhereArgs>;
};

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum PostFormatIdType {
  /** The Database ID for the node */
  DatabaseId = 'DATABASE_ID',
  /** The hashed Global ID */
  Id = 'ID',
  /** The name of the node */
  Name = 'NAME',
  /** Url friendly name of the node */
  Slug = 'SLUG',
  /** The URI for the node */
  Uri = 'URI',
}

/** Connection between the postFormat type and the ContentNode type */
export type PostFormatToContentNodeConnection = {
  __typename?: 'PostFormatToContentNodeConnection';
  /** Edges for the PostFormatToContentNodeConnection connection */
  edges?: Maybe<Array<Maybe<PostFormatToContentNodeConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ContentNode>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type PostFormatToContentNodeConnectionEdge = {
  __typename?: 'PostFormatToContentNodeConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<ContentNode>;
};

/** Arguments for filtering the PostFormatToContentNodeConnection connection */
export type PostFormatToContentNodeConnectionWhereArgs = {
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>;
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>;
  /** Title of the object */
  title?: Maybe<Scalars['String']>;
};

/** Connection between the postFormat type and the post type */
export type PostFormatToPostConnection = {
  __typename?: 'PostFormatToPostConnection';
  /** Edges for the PostFormatToPostConnection connection */
  edges?: Maybe<Array<Maybe<PostFormatToPostConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Post>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type PostFormatToPostConnectionEdge = {
  __typename?: 'PostFormatToPostConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<Post>;
};

/** Arguments for filtering the PostFormatToPostConnection connection */
export type PostFormatToPostConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: Maybe<Scalars['Int']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: Maybe<Scalars['String']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Category ID */
  categoryId?: Maybe<Scalars['Int']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Use Category Slug */
  categoryName?: Maybe<Scalars['String']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>;
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>;
  /** Tag Slug */
  tag?: Maybe<Scalars['String']>;
  /** Use Tag ID */
  tagId?: Maybe<Scalars['String']>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of tag slugs, used to display objects from one tag OR another */
  tagSlugAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Array of tag slugs, used to exclude objects in specified tags */
  tagSlugIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Title of the object */
  title?: Maybe<Scalars['String']>;
};

/** Connection between the postFormat type and the Taxonomy type */
export type PostFormatToTaxonomyConnectionEdge = {
  __typename?: 'PostFormatToTaxonomyConnectionEdge';
  /** The nodes of the connection, without the edges */
  node?: Maybe<Taxonomy>;
};

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum PostIdType {
  /** Identify a resource by the Database ID. */
  DatabaseId = 'DATABASE_ID',
  /** Identify a resource by the (hashed) Global ID. */
  Id = 'ID',
  /** Identify a resource by the slug. Available to non-hierarchcial Types where the slug is a unique identifier. */
  Slug = 'SLUG',
  /** Identify a resource by the URI. */
  Uri = 'URI',
}

/** Gravity Forms Post Image field. */
export type PostImageField = FormField & {
  __typename?: 'PostImageField';
  /** When specified, the value of this property will be used on the admin pages instead of the label. It is useful for fields with long labels. */
  adminLabel?: Maybe<Scalars['String']>;
  /** Determines if this field should only visible on the administration pages. A value of 1 will mark the field as admin only and will hide it from the public form. Useful for fields such as “status” that help with managing entries, but don’t apply to users filling out the form. */
  adminOnly?: Maybe<Scalars['Boolean']>;
  /** Determines if the field’s value can be pre-populated dynamically. 1 to allow field to be pre-populated, 0 otherwise. */
  allowsPrepopulate?: Maybe<Scalars['Boolean']>;
  /** Controls the visibility of the field based on values selected by the user. */
  conditionalLogic?: Maybe<ConditionalLogic>;
  /** String containing the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields. */
  cssClass?: Maybe<Scalars['String']>;
  /**
   * Array of the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields.
   * @deprecated Please use `cssClass` instead.
   */
  cssClassList?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Field description. */
  description?: Maybe<Scalars['String']>;
  /** The placement of the field description. */
  descriptionPlacement?: Maybe<DescriptionPlacementPropertyEnum>;
  /** Controls the visibility of the caption metadata for Post Image fields. 1 will display the caption field, 0 will hide it. */
  displayCaption?: Maybe<Scalars['Boolean']>;
  /** Controls the visibility of the description metadata for Post Image fields. 1 will display the description field, 0 will hide it. */
  displayDescription?: Maybe<Scalars['Boolean']>;
  /** Controls the visibility of the title metadata for Post Image fields. 1 will display the title field, 0 will hide it. */
  displayTitle?: Maybe<Scalars['Boolean']>;
  /** Contains the message that is displayed for fields that fail validation. */
  errorMessage?: Maybe<Scalars['String']>;
  /** The ID of the form this field belongs to. */
  formId: Scalars['Int'];
  /** Field ID. */
  id: Scalars['Int'];
  /** PostImage field value. */
  imageValues?: Maybe<PostImageValueProperty>;
  /** Assigns a name to this field so that it can be populated dynamically via this input name. Only applicable when allowsPrepopulate is set to 1. */
  inputName?: Maybe<Scalars['String']>;
  /** Determines if the field requires the user to enter a value. 1 marks the field as required, 0 marks the field as not required. Fields marked as required will prevent the form from being submitted if the user has not entered a value in it. */
  isRequired?: Maybe<Scalars['Boolean']>;
  /** Field label that will be displayed on the form and on the admin pages. */
  label?: Maybe<Scalars['String']>;
  /** Determines the size of the field when displayed on the page. */
  size?: Maybe<SizePropertyEnum>;
  /** The type of field to be displayed. */
  type: Scalars['String'];
  /** Field visibility. */
  visibility?: Maybe<VisibilityPropertyEnum>;
};

/** Post title field value. */
export type PostImageFieldValue = {
  __typename?: 'PostImageFieldValue';
  /** The image caption. */
  caption?: Maybe<Scalars['String']>;
  /** The image description. */
  description?: Maybe<Scalars['String']>;
  /** The image title. */
  title?: Maybe<Scalars['String']>;
  /** The image url. */
  url?: Maybe<Scalars['String']>;
};

/** The individual properties for each element of the PostImage value field. */
export type PostImageValueProperty = {
  __typename?: 'PostImageValueProperty';
  /** The image caption. */
  caption?: Maybe<Scalars['String']>;
  /** The image description. */
  description?: Maybe<Scalars['String']>;
  /** The image title. */
  title?: Maybe<Scalars['String']>;
  /** The image url. */
  url?: Maybe<Scalars['String']>;
};

/** The format of post field data. */
export enum PostObjectFieldFormatEnum {
  /** Provide the field value directly from database */
  Raw = 'RAW',
  /** Apply the default WordPress rendering */
  Rendered = 'RENDERED',
}

/** Union between the post, page and media item types */
export type PostObjectUnion = Post | Page | MediaItem;

/** The column to use when filtering by date */
export enum PostObjectsConnectionDateColumnEnum {
  /** The date the comment was created in local time. */
  Date = 'DATE',
  /** The most recent modification date of the comment. */
  Modified = 'MODIFIED',
}

/** Field to order the connection by */
export enum PostObjectsConnectionOrderbyEnum {
  /** Order by author */
  Author = 'AUTHOR',
  /** Order by the number of comments it has acquired */
  CommentCount = 'COMMENT_COUNT',
  /** Order by publish date */
  Date = 'DATE',
  /** Preserve the ID order given in the IN array */
  In = 'IN',
  /** Order by the menu order value */
  MenuOrder = 'MENU_ORDER',
  /** Order by last modified date */
  Modified = 'MODIFIED',
  /** Preserve slug order given in the NAME_IN array */
  NameIn = 'NAME_IN',
  /** Order by parent ID */
  Parent = 'PARENT',
  /** Order by slug */
  Slug = 'SLUG',
  /** Order by title */
  Title = 'TITLE',
}

/** Options for ordering the connection */
export type PostObjectsConnectionOrderbyInput = {
  /** The field to order the connection by */
  field: PostObjectsConnectionOrderbyEnum;
  /** Possible directions in which to order a list of items */
  order: OrderEnum;
};

/** Set relationships between the post to postFormats */
export type PostPostFormatsInput = {
  /** If true, this will append the postFormat to existing related postFormats. If false, this will replace existing relationships. Default true. */
  append?: Maybe<Scalars['Boolean']>;
  /** The input list of items to set. */
  nodes?: Maybe<Array<Maybe<PostPostFormatsNodeInput>>>;
};

/** List of postFormats to connect the post to. If an ID is set, it will be used to create the connection. If not, it will look for a slug. If neither are valid existing terms, and the site is configured to allow terms to be created during post mutations, a term will be created using the Name if it exists in the input, then fallback to the slug if it exists. */
export type PostPostFormatsNodeInput = {
  /** The description of the postFormat. This field is used to set a description of the postFormat if a new one is created during the mutation. */
  description?: Maybe<Scalars['String']>;
  /** The ID of the postFormat. If present, this will be used to connect to the post. If no existing postFormat exists with this ID, no connection will be made. */
  id?: Maybe<Scalars['ID']>;
  /** The name of the postFormat. This field is used to create a new term, if term creation is enabled in nested mutations, and if one does not already exist with the provided slug or ID or if a slug or ID is not provided. If no name is included and a term is created, the creation will fallback to the slug field. */
  name?: Maybe<Scalars['String']>;
  /** The slug of the postFormat. If no ID is present, this field will be used to make a connection. If no existing term exists with this slug, this field will be used as a fallback to the Name field when creating a new term to connect to, if term creation is enabled as a nested mutation. */
  slug?: Maybe<Scalars['String']>;
};

/** The status of the object. */
export enum PostStatusEnum {
  /** Objects with the auto-draft status */
  AutoDraft = 'AUTO_DRAFT',
  /** Objects with the draft status */
  Draft = 'DRAFT',
  /** Objects with the future status */
  Future = 'FUTURE',
  /** Objects with the inherit status */
  Inherit = 'INHERIT',
  /** Objects with the pending status */
  Pending = 'PENDING',
  /** Objects with the private status */
  Private = 'PRIVATE',
  /** Objects with the publish status */
  Publish = 'PUBLISH',
  /** Objects with the request-completed status */
  RequestCompleted = 'REQUEST_COMPLETED',
  /** Objects with the request-confirmed status */
  RequestConfirmed = 'REQUEST_CONFIRMED',
  /** Objects with the request-failed status */
  RequestFailed = 'REQUEST_FAILED',
  /** Objects with the request-pending status */
  RequestPending = 'REQUEST_PENDING',
  /** Objects with the trash status */
  Trash = 'TRASH',
}

/** Gravity Forms Post Tags field. */
export type PostTagsField = FormField & {
  __typename?: 'PostTagsField';
  /** When specified, the value of this property will be used on the admin pages instead of the label. It is useful for fields with long labels. */
  adminLabel?: Maybe<Scalars['String']>;
  /** Determines if this field should only visible on the administration pages. A value of 1 will mark the field as admin only and will hide it from the public form. Useful for fields such as “status” that help with managing entries, but don’t apply to users filling out the form. */
  adminOnly?: Maybe<Scalars['Boolean']>;
  /** Determines if the field’s value can be pre-populated dynamically. 1 to allow field to be pre-populated, 0 otherwise. */
  allowsPrepopulate?: Maybe<Scalars['Boolean']>;
  /** Controls the visibility of the field based on values selected by the user. */
  conditionalLogic?: Maybe<ConditionalLogic>;
  /** String containing the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields. */
  cssClass?: Maybe<Scalars['String']>;
  /**
   * Array of the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields.
   * @deprecated Please use `cssClass` instead.
   */
  cssClassList?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Contains the default value for the field. When specified, the field&#039;s value will be populated with the contents of this property when the form is displayed. */
  defaultValue?: Maybe<Scalars['String']>;
  /** Field description. */
  description?: Maybe<Scalars['String']>;
  /** The placement of the field description. */
  descriptionPlacement?: Maybe<DescriptionPlacementPropertyEnum>;
  /** Whether the &quot;select all&quot; choice should be displayed. */
  enableSelectAll?: Maybe<Scalars['Boolean']>;
  /** Contains the message that is displayed for fields that fail validation. */
  errorMessage?: Maybe<Scalars['String']>;
  /** The ID of the form this field belongs to. */
  formId: Scalars['Int'];
  /** Field ID. */
  id: Scalars['Int'];
  /** Assigns a name to this field so that it can be populated dynamically via this input name. Only applicable when allowsPrepopulate is set to 1. */
  inputName?: Maybe<Scalars['String']>;
  /** Determines if the field requires the user to enter a value. 1 marks the field as required, 0 marks the field as not required. Fields marked as required will prevent the form from being submitted if the user has not entered a value in it. */
  isRequired?: Maybe<Scalars['Boolean']>;
  /** Field label that will be displayed on the form and on the admin pages. */
  label?: Maybe<Scalars['String']>;
  /** Specifies the maximum number of characters allowed in a text or textarea (paragraph) field. */
  maxLength?: Maybe<Scalars['Int']>;
  /** Field placeholder. */
  placeholder?: Maybe<Scalars['String']>;
  /** Determines the size of the field when displayed on the page. */
  size?: Maybe<SizePropertyEnum>;
  /** The type of field to be displayed. */
  type: Scalars['String'];
  /** PostTags field value. */
  values?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Field visibility. */
  visibility?: Maybe<VisibilityPropertyEnum>;
};

/** Post tags field value. */
export type PostTagsFieldValue = {
  __typename?: 'PostTagsFieldValue';
  /** The values. */
  values?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** Set relationships between the post to tags */
export type PostTagsInput = {
  /** If true, this will append the tag to existing related tags. If false, this will replace existing relationships. Default true. */
  append?: Maybe<Scalars['Boolean']>;
  /** The input list of items to set. */
  nodes?: Maybe<Array<Maybe<PostTagsNodeInput>>>;
};

/** List of tags to connect the post to. If an ID is set, it will be used to create the connection. If not, it will look for a slug. If neither are valid existing terms, and the site is configured to allow terms to be created during post mutations, a term will be created using the Name if it exists in the input, then fallback to the slug if it exists. */
export type PostTagsNodeInput = {
  /** The description of the tag. This field is used to set a description of the tag if a new one is created during the mutation. */
  description?: Maybe<Scalars['String']>;
  /** The ID of the tag. If present, this will be used to connect to the post. If no existing tag exists with this ID, no connection will be made. */
  id?: Maybe<Scalars['ID']>;
  /** The name of the tag. This field is used to create a new term, if term creation is enabled in nested mutations, and if one does not already exist with the provided slug or ID or if a slug or ID is not provided. If no name is included and a term is created, the creation will fallback to the slug field. */
  name?: Maybe<Scalars['String']>;
  /** The slug of the tag. If no ID is present, this field will be used to make a connection. If no existing term exists with this slug, this field will be used as a fallback to the Name field when creating a new term to connect to, if term creation is enabled as a nested mutation. */
  slug?: Maybe<Scalars['String']>;
};

/** Gravity Forms Post Title field. */
export type PostTitleField = FormField & {
  __typename?: 'PostTitleField';
  /** When specified, the value of this property will be used on the admin pages instead of the label. It is useful for fields with long labels. */
  adminLabel?: Maybe<Scalars['String']>;
  /** Determines if this field should only visible on the administration pages. A value of 1 will mark the field as admin only and will hide it from the public form. Useful for fields such as “status” that help with managing entries, but don’t apply to users filling out the form. */
  adminOnly?: Maybe<Scalars['Boolean']>;
  /** Determines if the field’s value can be pre-populated dynamically. 1 to allow field to be pre-populated, 0 otherwise. */
  allowsPrepopulate?: Maybe<Scalars['Boolean']>;
  /** Controls the visibility of the field based on values selected by the user. */
  conditionalLogic?: Maybe<ConditionalLogic>;
  /** String containing the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields. */
  cssClass?: Maybe<Scalars['String']>;
  /**
   * Array of the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields.
   * @deprecated Please use `cssClass` instead.
   */
  cssClassList?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Contains the default value for the field. When specified, the field&#039;s value will be populated with the contents of this property when the form is displayed. */
  defaultValue?: Maybe<Scalars['String']>;
  /** Field description. */
  description?: Maybe<Scalars['String']>;
  /** The placement of the field description. */
  descriptionPlacement?: Maybe<DescriptionPlacementPropertyEnum>;
  /** Contains the message that is displayed for fields that fail validation. */
  errorMessage?: Maybe<Scalars['String']>;
  /** The ID of the form this field belongs to. */
  formId: Scalars['Int'];
  /** Field ID. */
  id: Scalars['Int'];
  /** Assigns a name to this field so that it can be populated dynamically via this input name. Only applicable when allowsPrepopulate is set to 1. */
  inputName?: Maybe<Scalars['String']>;
  /** Determines if the field requires the user to enter a value. 1 marks the field as required, 0 marks the field as not required. Fields marked as required will prevent the form from being submitted if the user has not entered a value in it. */
  isRequired?: Maybe<Scalars['Boolean']>;
  /** Field label that will be displayed on the form and on the admin pages. */
  label?: Maybe<Scalars['String']>;
  /** Field placeholder. */
  placeholder?: Maybe<Scalars['String']>;
  /** Determines the size of the field when displayed on the page. */
  size?: Maybe<SizePropertyEnum>;
  /** The type of field to be displayed. */
  type: Scalars['String'];
  /** PostTitle field value. */
  value?: Maybe<Scalars['String']>;
  /** Field visibility. */
  visibility?: Maybe<VisibilityPropertyEnum>;
};

/** Post title field value. */
export type PostTitleFieldValue = {
  __typename?: 'PostTitleFieldValue';
  /** The value. */
  value?: Maybe<Scalars['String']>;
};

/** Connection between the post type and the category type */
export type PostToCategoryConnection = {
  __typename?: 'PostToCategoryConnection';
  /** Edges for the PostToCategoryConnection connection */
  edges?: Maybe<Array<Maybe<PostToCategoryConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Category>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type PostToCategoryConnectionEdge = {
  __typename?: 'PostToCategoryConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<Category>;
};

/** Arguments for filtering the PostToCategoryConnection connection */
export type PostToCategoryConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: Maybe<Scalars['String']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: Maybe<Scalars['Int']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: Maybe<Scalars['Boolean']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: Maybe<Scalars['String']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: Maybe<Scalars['Boolean']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: Maybe<Scalars['Boolean']>;
  /** Array of term ids to include. Default empty array. */
  include?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: Maybe<Scalars['String']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Direction the connection should be ordered in */
  order?: Maybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: Maybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: Maybe<Scalars['Boolean']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: Maybe<Scalars['Int']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: Maybe<Scalars['String']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: Maybe<Scalars['Boolean']>;
};

/** Connection between the post type and the Comment type */
export type PostToCommentConnection = {
  __typename?: 'PostToCommentConnection';
  /** Edges for the PostToCommentConnection connection */
  edges?: Maybe<Array<Maybe<PostToCommentConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Comment>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type PostToCommentConnectionEdge = {
  __typename?: 'PostToCommentConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<Comment>;
};

/** Arguments for filtering the PostToCommentConnection connection */
export type PostToCommentConnectionWhereArgs = {
  /** Comment author email address. */
  authorEmail?: Maybe<Scalars['String']>;
  /** Array of author IDs to include comments for. */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Comment author URL. */
  authorUrl?: Maybe<Scalars['String']>;
  /** Array of comment IDs to include. */
  commentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Include comments of a given type. */
  commentType?: Maybe<Scalars['String']>;
  /** Include comments from a given array of comment types. */
  commentTypeIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: Maybe<Scalars['String']>;
  /** Content object author ID to limit results by. */
  contentAuthor?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: Maybe<Scalars['ID']>;
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Content object name to retrieve affiliated comments for. */
  contentName?: Maybe<Scalars['String']>;
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: Maybe<Scalars['Int']>;
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: Maybe<Array<Maybe<PostStatusEnum>>>;
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: Maybe<Array<Maybe<ContentTypeEnum>>>;
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Karma score to retrieve matching comments for. */
  karma?: Maybe<Scalars['Int']>;
  /** The cardinality of the order of the connection */
  order?: Maybe<OrderEnum>;
  /** Field to order the comments by. */
  orderby?: Maybe<CommentsConnectionOrderbyEnum>;
  /** Parent ID of comment to retrieve children of. */
  parent?: Maybe<Scalars['Int']>;
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Search term(s) to retrieve matching comments for. */
  search?: Maybe<Scalars['String']>;
  /** Comment status to limit results by. */
  status?: Maybe<Scalars['String']>;
  /** Include comments for a specific user ID. */
  userId?: Maybe<Scalars['ID']>;
};

/** Connection between the post type and the postFormat type */
export type PostToPostFormatConnection = {
  __typename?: 'PostToPostFormatConnection';
  /** Edges for the PostToPostFormatConnection connection */
  edges?: Maybe<Array<Maybe<PostToPostFormatConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<PostFormat>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type PostToPostFormatConnectionEdge = {
  __typename?: 'PostToPostFormatConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<PostFormat>;
};

/** Arguments for filtering the PostToPostFormatConnection connection */
export type PostToPostFormatConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: Maybe<Scalars['String']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: Maybe<Scalars['Int']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: Maybe<Scalars['Boolean']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: Maybe<Scalars['String']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: Maybe<Scalars['Boolean']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: Maybe<Scalars['Boolean']>;
  /** Array of term ids to include. Default empty array. */
  include?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: Maybe<Scalars['String']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Direction the connection should be ordered in */
  order?: Maybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: Maybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: Maybe<Scalars['Boolean']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: Maybe<Scalars['Int']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: Maybe<Scalars['String']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: Maybe<Scalars['Boolean']>;
};

/** Connection between the post type and the post type */
export type PostToPreviewConnectionEdge = {
  __typename?: 'PostToPreviewConnectionEdge';
  /** The nodes of the connection, without the edges */
  node?: Maybe<Post>;
};

/** Connection between the post type and the post type */
export type PostToRevisionConnection = {
  __typename?: 'PostToRevisionConnection';
  /** Edges for the postToRevisionConnection connection */
  edges?: Maybe<Array<Maybe<PostToRevisionConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Post>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type PostToRevisionConnectionEdge = {
  __typename?: 'PostToRevisionConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<Post>;
};

/** Arguments for filtering the postToRevisionConnection connection */
export type PostToRevisionConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: Maybe<Scalars['Int']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: Maybe<Scalars['String']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Category ID */
  categoryId?: Maybe<Scalars['Int']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Use Category Slug */
  categoryName?: Maybe<Scalars['String']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>;
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>;
  /** Tag Slug */
  tag?: Maybe<Scalars['String']>;
  /** Use Tag ID */
  tagId?: Maybe<Scalars['String']>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of tag slugs, used to display objects from one tag OR another */
  tagSlugAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Array of tag slugs, used to exclude objects in specified tags */
  tagSlugIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Title of the object */
  title?: Maybe<Scalars['String']>;
};

/** Connection between the post type and the tag type */
export type PostToTagConnection = {
  __typename?: 'PostToTagConnection';
  /** Edges for the PostToTagConnection connection */
  edges?: Maybe<Array<Maybe<PostToTagConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Tag>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type PostToTagConnectionEdge = {
  __typename?: 'PostToTagConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<Tag>;
};

/** Arguments for filtering the PostToTagConnection connection */
export type PostToTagConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: Maybe<Scalars['String']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: Maybe<Scalars['Int']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: Maybe<Scalars['Boolean']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: Maybe<Scalars['String']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: Maybe<Scalars['Boolean']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: Maybe<Scalars['Boolean']>;
  /** Array of term ids to include. Default empty array. */
  include?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: Maybe<Scalars['String']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Direction the connection should be ordered in */
  order?: Maybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: Maybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: Maybe<Scalars['Boolean']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: Maybe<Scalars['Int']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: Maybe<Scalars['String']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: Maybe<Scalars['Boolean']>;
};

/** Connection between the post type and the TermNode type */
export type PostToTermNodeConnection = {
  __typename?: 'PostToTermNodeConnection';
  /** Edges for the PostToTermNodeConnection connection */
  edges?: Maybe<Array<Maybe<PostToTermNodeConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<TermNode>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type PostToTermNodeConnectionEdge = {
  __typename?: 'PostToTermNodeConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<TermNode>;
};

/** Arguments for filtering the PostToTermNodeConnection connection */
export type PostToTermNodeConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: Maybe<Scalars['String']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: Maybe<Scalars['Int']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: Maybe<Scalars['Boolean']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: Maybe<Scalars['String']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: Maybe<Scalars['Boolean']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: Maybe<Scalars['Boolean']>;
  /** Array of term ids to include. Default empty array. */
  include?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: Maybe<Scalars['String']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Direction the connection should be ordered in */
  order?: Maybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: Maybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: Maybe<Scalars['Boolean']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: Maybe<Scalars['Int']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: Maybe<Scalars['String']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** The Taxonomy to filter terms by */
  taxonomies?: Maybe<Array<Maybe<TaxonomyEnum>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: Maybe<Scalars['Boolean']>;
};

/** Details for labels of the PostType */
export type PostTypeLabelDetails = {
  __typename?: 'PostTypeLabelDetails';
  /** Default is ‘Add New’ for both hierarchical and non-hierarchical types. */
  addNew?: Maybe<Scalars['String']>;
  /** Label for adding a new singular item. */
  addNewItem?: Maybe<Scalars['String']>;
  /** Label to signify all items in a submenu link. */
  allItems?: Maybe<Scalars['String']>;
  /** Label for archives in nav menus */
  archives?: Maybe<Scalars['String']>;
  /** Label for the attributes meta box. */
  attributes?: Maybe<Scalars['String']>;
  /** Label for editing a singular item. */
  editItem?: Maybe<Scalars['String']>;
  /** Label for the Featured Image meta box title. */
  featuredImage?: Maybe<Scalars['String']>;
  /** Label for the table views hidden heading. */
  filterItemsList?: Maybe<Scalars['String']>;
  /** Label for the media frame button. */
  insertIntoItem?: Maybe<Scalars['String']>;
  /** Label for the table hidden heading. */
  itemsList?: Maybe<Scalars['String']>;
  /** Label for the table pagination hidden heading. */
  itemsListNavigation?: Maybe<Scalars['String']>;
  /** Label for the menu name. */
  menuName?: Maybe<Scalars['String']>;
  /** General name for the post type, usually plural. */
  name?: Maybe<Scalars['String']>;
  /** Label for the new item page title. */
  newItem?: Maybe<Scalars['String']>;
  /** Label used when no items are found. */
  notFound?: Maybe<Scalars['String']>;
  /** Label used when no items are in the trash. */
  notFoundInTrash?: Maybe<Scalars['String']>;
  /** Label used to prefix parents of hierarchical items. */
  parentItemColon?: Maybe<Scalars['String']>;
  /** Label for removing the featured image. */
  removeFeaturedImage?: Maybe<Scalars['String']>;
  /** Label for searching plural items. */
  searchItems?: Maybe<Scalars['String']>;
  /** Label for setting the featured image. */
  setFeaturedImage?: Maybe<Scalars['String']>;
  /** Name for one object of this post type. */
  singularName?: Maybe<Scalars['String']>;
  /** Label for the media frame filter. */
  uploadedToThisItem?: Maybe<Scalars['String']>;
  /** Label in the media frame for using a featured image. */
  useFeaturedImage?: Maybe<Scalars['String']>;
  /** Label for viewing a singular item. */
  viewItem?: Maybe<Scalars['String']>;
  /** Label for viewing post type archives. */
  viewItems?: Maybe<Scalars['String']>;
};

/** Gravity Forms Chained Select field choice property. */
export type RadioChoiceProperty = {
  __typename?: 'RadioChoiceProperty';
  /** Indicates the radio button item is the “Other” choice. */
  isOtherChoice?: Maybe<Scalars['Boolean']>;
  /** Determines if this choice should be selected by default when displayed. The value true will select the choice, whereas false will display it unselected. */
  isSelected?: Maybe<Scalars['Boolean']>;
  /** The text to be displayed to the user when displaying this choice. */
  text?: Maybe<Scalars['String']>;
  /** The value to be stored in the database when this choice is selected. Note: This property is only supported by the Drop Down and Post Category fields. Checkboxes and Radio fields will store the text property in the database regardless of the value property. */
  value?: Maybe<Scalars['String']>;
};

/** Gravity Forms Radio field. */
export type RadioField = FormField & {
  __typename?: 'RadioField';
  /** When specified, the value of this property will be used on the admin pages instead of the label. It is useful for fields with long labels. */
  adminLabel?: Maybe<Scalars['String']>;
  /** Determines if this field should only visible on the administration pages. A value of 1 will mark the field as admin only and will hide it from the public form. Useful for fields such as “status” that help with managing entries, but don’t apply to users filling out the form. */
  adminOnly?: Maybe<Scalars['Boolean']>;
  /** Determines if the field’s value can be pre-populated dynamically. 1 to allow field to be pre-populated, 0 otherwise. */
  allowsPrepopulate?: Maybe<Scalars['Boolean']>;
  /** Choices used to populate the dropdown field. These can be nested multiple levels deep. */
  choices?: Maybe<Array<Maybe<RadioChoiceProperty>>>;
  /** Controls the visibility of the field based on values selected by the user. */
  conditionalLogic?: Maybe<ConditionalLogic>;
  /** String containing the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields. */
  cssClass?: Maybe<Scalars['String']>;
  /**
   * Array of the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields.
   * @deprecated Please use `cssClass` instead.
   */
  cssClassList?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Field description. */
  description?: Maybe<Scalars['String']>;
  /** The placement of the field description. */
  descriptionPlacement?: Maybe<DescriptionPlacementPropertyEnum>;
  /** Determines if the field (checkbox, select or radio) have choice values enabled, which allows the field to have choice values different from the labels that are displayed to the user. */
  enableChoiceValue?: Maybe<Scalars['Boolean']>;
  /** Indicates whether the &#039;Enable &quot;other&quot; choice&#039; option is checked in the editor. */
  enableOtherChoice?: Maybe<Scalars['Boolean']>;
  /** This property is used when the radio button is a product option field and will be set to true. If not associated with a product, then it is false. */
  enablePrice?: Maybe<Scalars['Boolean']>;
  /** Contains the message that is displayed for fields that fail validation. */
  errorMessage?: Maybe<Scalars['String']>;
  /** The ID of the form this field belongs to. */
  formId: Scalars['Int'];
  /** Field ID. */
  id: Scalars['Int'];
  /** Assigns a name to this field so that it can be populated dynamically via this input name. Only applicable when allowsPrepopulate is set to 1. */
  inputName?: Maybe<Scalars['String']>;
  /** Determines if the field requires the user to enter a value. 1 marks the field as required, 0 marks the field as not required. Fields marked as required will prevent the form from being submitted if the user has not entered a value in it. */
  isRequired?: Maybe<Scalars['Boolean']>;
  /** Field label that will be displayed on the form and on the admin pages. */
  label?: Maybe<Scalars['String']>;
  /** Determines if the field allows duplicate submissions. 1 to prevent users from submitting the same value more than once, 0 to allow duplicate values. */
  noDuplicates?: Maybe<Scalars['Boolean']>;
  /** Determines the size of the field when displayed on the page. */
  size?: Maybe<SizePropertyEnum>;
  /** The type of field to be displayed. */
  type: Scalars['String'];
  /** Radio field value. */
  value?: Maybe<Scalars['String']>;
  /** Field visibility. */
  visibility?: Maybe<VisibilityPropertyEnum>;
};

/** Radio field value. */
export type RadioFieldValue = {
  __typename?: 'RadioFieldValue';
  /** The value. */
  value?: Maybe<Scalars['String']>;
};

/** The reading setting type */
export type ReadingSettings = {
  __typename?: 'ReadingSettings';
  /** Blog pages show at most. */
  postsPerPage?: Maybe<Scalars['Int']>;
};

/** Input for the registerUser mutation */
export type RegisterUserInput = {
  /** User's AOL IM account. */
  aim?: Maybe<Scalars['String']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** A string containing content about the user. */
  description?: Maybe<Scalars['String']>;
  /** A string that will be shown on the site. Defaults to user's username. It is likely that you will want to change this, for both appearance and security through obscurity (that is if you dont use and delete the default admin user). */
  displayName?: Maybe<Scalars['String']>;
  /** A string containing the user's email address. */
  email?: Maybe<Scalars['String']>;
  /** 	The user's first name. */
  firstName?: Maybe<Scalars['String']>;
  /** User's Jabber account. */
  jabber?: Maybe<Scalars['String']>;
  /** The user's last name. */
  lastName?: Maybe<Scalars['String']>;
  /** User's locale. */
  locale?: Maybe<Scalars['String']>;
  /** A string that contains a URL-friendly name for the user. The default is the user's username. */
  nicename?: Maybe<Scalars['String']>;
  /** The user's nickname, defaults to the user's username. */
  nickname?: Maybe<Scalars['String']>;
  /** A string that contains the plain text password for the user. */
  password?: Maybe<Scalars['String']>;
  /** The date the user registered. Format is Y-m-d H:i:s. */
  registered?: Maybe<Scalars['String']>;
  /** A string for whether to enable the rich editor or not. False if not empty. */
  richEditing?: Maybe<Scalars['String']>;
  /** A string that contains the user's username. */
  username: Scalars['String'];
  /** A string containing the user's URL for the user's web site. */
  websiteUrl?: Maybe<Scalars['String']>;
  /** User's Yahoo IM account. */
  yim?: Maybe<Scalars['String']>;
};

/** The payload for the registerUser mutation */
export type RegisterUserPayload = {
  __typename?: 'RegisterUserPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The User object mutation type. */
  user?: Maybe<User>;
};

/** The logical relation between each item in the array when there are more than one. */
export enum RelationEnum {
  /** The logical AND condition returns true if both operands are true, otherwise, it returns false. */
  And = 'AND',
  /** The logical OR condition returns false if both operands are false, otherwise, it returns true. */
  Or = 'OR',
}

/** Input for the resetUserPassword mutation */
export type ResetUserPasswordInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Password reset key */
  key?: Maybe<Scalars['String']>;
  /** The user's login (username). */
  login?: Maybe<Scalars['String']>;
  /** The new password. */
  password?: Maybe<Scalars['String']>;
};

/** The payload for the resetUserPassword mutation */
export type ResetUserPasswordPayload = {
  __typename?: 'ResetUserPasswordPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The User object mutation type. */
  user?: Maybe<User>;
};

/** Input for the restoreComment mutation */
export type RestoreCommentInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The ID of the comment to be restored */
  id: Scalars['ID'];
};

/** The payload for the restoreComment mutation */
export type RestoreCommentPayload = {
  __typename?: 'RestoreCommentPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The restored comment object */
  comment?: Maybe<Comment>;
  /** The ID of the restored comment */
  restoredId?: Maybe<Scalars['ID']>;
};

/** The root mutation */
export type RootMutation = {
  __typename?: 'RootMutation';
  /** The payload for the createCategory mutation */
  createCategory?: Maybe<CreateCategoryPayload>;
  /** The payload for the createComment mutation */
  createComment?: Maybe<CreateCommentPayload>;
  /** The payload for the createGravityFormsDraftEntry mutation */
  createGravityFormsDraftEntry?: Maybe<CreateGravityFormsDraftEntryPayload>;
  /** The payload for the createMediaItem mutation */
  createMediaItem?: Maybe<CreateMediaItemPayload>;
  /** The payload for the createPage mutation */
  createPage?: Maybe<CreatePagePayload>;
  /** The payload for the createPost mutation */
  createPost?: Maybe<CreatePostPayload>;
  /** The payload for the createPostFormat mutation */
  createPostFormat?: Maybe<CreatePostFormatPayload>;
  /** The payload for the createTag mutation */
  createTag?: Maybe<CreateTagPayload>;
  /** The payload for the createUser mutation */
  createUser?: Maybe<CreateUserPayload>;
  /** The payload for the deleteCategory mutation */
  deleteCategory?: Maybe<DeleteCategoryPayload>;
  /** The payload for the deleteComment mutation */
  deleteComment?: Maybe<DeleteCommentPayload>;
  /** The payload for the deleteGravityFormsDraftEntry mutation */
  deleteGravityFormsDraftEntry?: Maybe<DeleteGravityFormsDraftEntryPayload>;
  /** The payload for the deleteGravityFormsEntry mutation */
  deleteGravityFormsEntry?: Maybe<DeleteGravityFormsEntryPayload>;
  /** The payload for the deleteMediaItem mutation */
  deleteMediaItem?: Maybe<DeleteMediaItemPayload>;
  /** The payload for the deletePage mutation */
  deletePage?: Maybe<DeletePagePayload>;
  /** The payload for the deletePost mutation */
  deletePost?: Maybe<DeletePostPayload>;
  /** The payload for the deletePostFormat mutation */
  deletePostFormat?: Maybe<DeletePostFormatPayload>;
  /** The payload for the deleteTag mutation */
  deleteTag?: Maybe<DeleteTagPayload>;
  /** The payload for the deleteUser mutation */
  deleteUser?: Maybe<DeleteUserPayload>;
  /** Increase the count. */
  increaseCount?: Maybe<Scalars['Int']>;
  /** The payload for the registerUser mutation */
  registerUser?: Maybe<RegisterUserPayload>;
  /** The payload for the resetUserPassword mutation */
  resetUserPassword?: Maybe<ResetUserPasswordPayload>;
  /** The payload for the restoreComment mutation */
  restoreComment?: Maybe<RestoreCommentPayload>;
  /** The payload for the sendPasswordResetEmail mutation */
  sendPasswordResetEmail?: Maybe<SendPasswordResetEmailPayload>;
  /** The payload for the submitGravityFormsDraftEntry mutation */
  submitGravityFormsDraftEntry?: Maybe<SubmitGravityFormsDraftEntryPayload>;
  /** The payload for the submitGravityFormsForm mutation */
  submitGravityFormsForm?: Maybe<SubmitGravityFormsFormPayload>;
  /** The payload for the UpdateCategory mutation */
  updateCategory?: Maybe<UpdateCategoryPayload>;
  /** The payload for the updateComment mutation */
  updateComment?: Maybe<UpdateCommentPayload>;
  /** The payload for the updateDraftEntryAddressFieldValue mutation */
  updateDraftEntryAddressFieldValue?: Maybe<UpdateDraftEntryAddressFieldValuePayload>;
  /** The payload for the updateDraftEntryChainedSelectFieldValue mutation */
  updateDraftEntryChainedSelectFieldValue?: Maybe<UpdateDraftEntryChainedSelectFieldValuePayload>;
  /** The payload for the updateDraftEntryCheckboxFieldValue mutation */
  updateDraftEntryCheckboxFieldValue?: Maybe<UpdateDraftEntryCheckboxFieldValuePayload>;
  /** The payload for the updateDraftEntryConsentFieldValue mutation */
  updateDraftEntryConsentFieldValue?: Maybe<UpdateDraftEntryConsentFieldValuePayload>;
  /** The payload for the updateDraftEntryDateFieldValue mutation */
  updateDraftEntryDateFieldValue?: Maybe<UpdateDraftEntryDateFieldValuePayload>;
  /** The payload for the updateDraftEntryEmailFieldValue mutation */
  updateDraftEntryEmailFieldValue?: Maybe<UpdateDraftEntryEmailFieldValuePayload>;
  /** The payload for the updateDraftEntryHiddenFieldValue mutation */
  updateDraftEntryHiddenFieldValue?: Maybe<UpdateDraftEntryHiddenFieldValuePayload>;
  /** The payload for the updateDraftEntryListFieldValue mutation */
  updateDraftEntryListFieldValue?: Maybe<UpdateDraftEntryListFieldValuePayload>;
  /** The payload for the updateDraftEntryMultiSelectFieldValue mutation */
  updateDraftEntryMultiSelectFieldValue?: Maybe<UpdateDraftEntryMultiSelectFieldValuePayload>;
  /** The payload for the updateDraftEntryNameFieldValue mutation */
  updateDraftEntryNameFieldValue?: Maybe<UpdateDraftEntryNameFieldValuePayload>;
  /** The payload for the updateDraftEntryNumberFieldValue mutation */
  updateDraftEntryNumberFieldValue?: Maybe<UpdateDraftEntryNumberFieldValuePayload>;
  /** The payload for the updateDraftEntryPhoneFieldValue mutation */
  updateDraftEntryPhoneFieldValue?: Maybe<UpdateDraftEntryPhoneFieldValuePayload>;
  /** The payload for the updateDraftEntryPostCategoryFieldValue mutation */
  updateDraftEntryPostCategoryFieldValue?: Maybe<UpdateDraftEntryPostCategoryFieldValuePayload>;
  /** The payload for the updateDraftEntryPostContentFieldValue mutation */
  updateDraftEntryPostContentFieldValue?: Maybe<UpdateDraftEntryPostContentFieldValuePayload>;
  /** The payload for the updateDraftEntryPostCustomFieldValue mutation */
  updateDraftEntryPostCustomFieldValue?: Maybe<UpdateDraftEntryPostCustomFieldValuePayload>;
  /** The payload for the updateDraftEntryPostExcerptFieldValue mutation */
  updateDraftEntryPostExcerptFieldValue?: Maybe<UpdateDraftEntryPostExcerptFieldValuePayload>;
  /** The payload for the updateDraftEntryPostTagsFieldValue mutation */
  updateDraftEntryPostTagsFieldValue?: Maybe<UpdateDraftEntryPostTagsFieldValuePayload>;
  /** The payload for the updateDraftEntryPostTitleFieldValue mutation */
  updateDraftEntryPostTitleFieldValue?: Maybe<UpdateDraftEntryPostTitleFieldValuePayload>;
  /** The payload for the updateDraftEntryRadioFieldValue mutation */
  updateDraftEntryRadioFieldValue?: Maybe<UpdateDraftEntryRadioFieldValuePayload>;
  /** The payload for the updateDraftEntrySelectFieldValue mutation */
  updateDraftEntrySelectFieldValue?: Maybe<UpdateDraftEntrySelectFieldValuePayload>;
  /** The payload for the updateDraftEntrySignatureFieldValue mutation */
  updateDraftEntrySignatureFieldValue?: Maybe<UpdateDraftEntrySignatureFieldValuePayload>;
  /** The payload for the updateDraftEntryTextAreaFieldValue mutation */
  updateDraftEntryTextAreaFieldValue?: Maybe<UpdateDraftEntryTextAreaFieldValuePayload>;
  /** The payload for the updateDraftEntryTextFieldValue mutation */
  updateDraftEntryTextFieldValue?: Maybe<UpdateDraftEntryTextFieldValuePayload>;
  /** The payload for the updateDraftEntryTimeFieldValue mutation */
  updateDraftEntryTimeFieldValue?: Maybe<UpdateDraftEntryTimeFieldValuePayload>;
  /** The payload for the updateDraftEntryWebsiteFieldValue mutation */
  updateDraftEntryWebsiteFieldValue?: Maybe<UpdateDraftEntryWebsiteFieldValuePayload>;
  /** The payload for the updateGravityFormsDraftEntry mutation */
  updateGravityFormsDraftEntry?: Maybe<UpdateGravityFormsDraftEntryPayload>;
  /** The payload for the updateGravityFormsEntry mutation */
  updateGravityFormsEntry?: Maybe<UpdateGravityFormsEntryPayload>;
  /** The payload for the updateMediaItem mutation */
  updateMediaItem?: Maybe<UpdateMediaItemPayload>;
  /** The payload for the updatePage mutation */
  updatePage?: Maybe<UpdatePagePayload>;
  /** The payload for the updatePost mutation */
  updatePost?: Maybe<UpdatePostPayload>;
  /** The payload for the UpdatePostFormat mutation */
  updatePostFormat?: Maybe<UpdatePostFormatPayload>;
  /** The payload for the updateSettings mutation */
  updateSettings?: Maybe<UpdateSettingsPayload>;
  /** The payload for the UpdateTag mutation */
  updateTag?: Maybe<UpdateTagPayload>;
  /** The payload for the updateUser mutation */
  updateUser?: Maybe<UpdateUserPayload>;
};

/** The root mutation */
export type RootMutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};

/** The root mutation */
export type RootMutationCreateCommentArgs = {
  input: CreateCommentInput;
};

/** The root mutation */
export type RootMutationCreateGravityFormsDraftEntryArgs = {
  input: CreateGravityFormsDraftEntryInput;
};

/** The root mutation */
export type RootMutationCreateMediaItemArgs = {
  input: CreateMediaItemInput;
};

/** The root mutation */
export type RootMutationCreatePageArgs = {
  input: CreatePageInput;
};

/** The root mutation */
export type RootMutationCreatePostArgs = {
  input: CreatePostInput;
};

/** The root mutation */
export type RootMutationCreatePostFormatArgs = {
  input: CreatePostFormatInput;
};

/** The root mutation */
export type RootMutationCreateTagArgs = {
  input: CreateTagInput;
};

/** The root mutation */
export type RootMutationCreateUserArgs = {
  input: CreateUserInput;
};

/** The root mutation */
export type RootMutationDeleteCategoryArgs = {
  input: DeleteCategoryInput;
};

/** The root mutation */
export type RootMutationDeleteCommentArgs = {
  input: DeleteCommentInput;
};

/** The root mutation */
export type RootMutationDeleteGravityFormsDraftEntryArgs = {
  input: DeleteGravityFormsDraftEntryInput;
};

/** The root mutation */
export type RootMutationDeleteGravityFormsEntryArgs = {
  input: DeleteGravityFormsEntryInput;
};

/** The root mutation */
export type RootMutationDeleteMediaItemArgs = {
  input: DeleteMediaItemInput;
};

/** The root mutation */
export type RootMutationDeletePageArgs = {
  input: DeletePageInput;
};

/** The root mutation */
export type RootMutationDeletePostArgs = {
  input: DeletePostInput;
};

/** The root mutation */
export type RootMutationDeletePostFormatArgs = {
  input: DeletePostFormatInput;
};

/** The root mutation */
export type RootMutationDeleteTagArgs = {
  input: DeleteTagInput;
};

/** The root mutation */
export type RootMutationDeleteUserArgs = {
  input: DeleteUserInput;
};

/** The root mutation */
export type RootMutationIncreaseCountArgs = {
  count?: Maybe<Scalars['Int']>;
};

/** The root mutation */
export type RootMutationRegisterUserArgs = {
  input: RegisterUserInput;
};

/** The root mutation */
export type RootMutationResetUserPasswordArgs = {
  input: ResetUserPasswordInput;
};

/** The root mutation */
export type RootMutationRestoreCommentArgs = {
  input: RestoreCommentInput;
};

/** The root mutation */
export type RootMutationSendPasswordResetEmailArgs = {
  input: SendPasswordResetEmailInput;
};

/** The root mutation */
export type RootMutationSubmitGravityFormsDraftEntryArgs = {
  input: SubmitGravityFormsDraftEntryInput;
};

/** The root mutation */
export type RootMutationSubmitGravityFormsFormArgs = {
  input: SubmitGravityFormsFormInput;
};

/** The root mutation */
export type RootMutationUpdateCategoryArgs = {
  input: UpdateCategoryInput;
};

/** The root mutation */
export type RootMutationUpdateCommentArgs = {
  input: UpdateCommentInput;
};

/** The root mutation */
export type RootMutationUpdateDraftEntryAddressFieldValueArgs = {
  input: UpdateDraftEntryAddressFieldValueInput;
};

/** The root mutation */
export type RootMutationUpdateDraftEntryChainedSelectFieldValueArgs = {
  input: UpdateDraftEntryChainedSelectFieldValueInput;
};

/** The root mutation */
export type RootMutationUpdateDraftEntryCheckboxFieldValueArgs = {
  input: UpdateDraftEntryCheckboxFieldValueInput;
};

/** The root mutation */
export type RootMutationUpdateDraftEntryConsentFieldValueArgs = {
  input: UpdateDraftEntryConsentFieldValueInput;
};

/** The root mutation */
export type RootMutationUpdateDraftEntryDateFieldValueArgs = {
  input: UpdateDraftEntryDateFieldValueInput;
};

/** The root mutation */
export type RootMutationUpdateDraftEntryEmailFieldValueArgs = {
  input: UpdateDraftEntryEmailFieldValueInput;
};

/** The root mutation */
export type RootMutationUpdateDraftEntryHiddenFieldValueArgs = {
  input: UpdateDraftEntryHiddenFieldValueInput;
};

/** The root mutation */
export type RootMutationUpdateDraftEntryListFieldValueArgs = {
  input: UpdateDraftEntryListFieldValueInput;
};

/** The root mutation */
export type RootMutationUpdateDraftEntryMultiSelectFieldValueArgs = {
  input: UpdateDraftEntryMultiSelectFieldValueInput;
};

/** The root mutation */
export type RootMutationUpdateDraftEntryNameFieldValueArgs = {
  input: UpdateDraftEntryNameFieldValueInput;
};

/** The root mutation */
export type RootMutationUpdateDraftEntryNumberFieldValueArgs = {
  input: UpdateDraftEntryNumberFieldValueInput;
};

/** The root mutation */
export type RootMutationUpdateDraftEntryPhoneFieldValueArgs = {
  input: UpdateDraftEntryPhoneFieldValueInput;
};

/** The root mutation */
export type RootMutationUpdateDraftEntryPostCategoryFieldValueArgs = {
  input: UpdateDraftEntryPostCategoryFieldValueInput;
};

/** The root mutation */
export type RootMutationUpdateDraftEntryPostContentFieldValueArgs = {
  input: UpdateDraftEntryPostContentFieldValueInput;
};

/** The root mutation */
export type RootMutationUpdateDraftEntryPostCustomFieldValueArgs = {
  input: UpdateDraftEntryPostCustomFieldValueInput;
};

/** The root mutation */
export type RootMutationUpdateDraftEntryPostExcerptFieldValueArgs = {
  input: UpdateDraftEntryPostExcerptFieldValueInput;
};

/** The root mutation */
export type RootMutationUpdateDraftEntryPostTagsFieldValueArgs = {
  input: UpdateDraftEntryPostTagsFieldValueInput;
};

/** The root mutation */
export type RootMutationUpdateDraftEntryPostTitleFieldValueArgs = {
  input: UpdateDraftEntryPostTitleFieldValueInput;
};

/** The root mutation */
export type RootMutationUpdateDraftEntryRadioFieldValueArgs = {
  input: UpdateDraftEntryRadioFieldValueInput;
};

/** The root mutation */
export type RootMutationUpdateDraftEntrySelectFieldValueArgs = {
  input: UpdateDraftEntrySelectFieldValueInput;
};

/** The root mutation */
export type RootMutationUpdateDraftEntrySignatureFieldValueArgs = {
  input: UpdateDraftEntrySignatureFieldValueInput;
};

/** The root mutation */
export type RootMutationUpdateDraftEntryTextAreaFieldValueArgs = {
  input: UpdateDraftEntryTextAreaFieldValueInput;
};

/** The root mutation */
export type RootMutationUpdateDraftEntryTextFieldValueArgs = {
  input: UpdateDraftEntryTextFieldValueInput;
};

/** The root mutation */
export type RootMutationUpdateDraftEntryTimeFieldValueArgs = {
  input: UpdateDraftEntryTimeFieldValueInput;
};

/** The root mutation */
export type RootMutationUpdateDraftEntryWebsiteFieldValueArgs = {
  input: UpdateDraftEntryWebsiteFieldValueInput;
};

/** The root mutation */
export type RootMutationUpdateGravityFormsDraftEntryArgs = {
  input: UpdateGravityFormsDraftEntryInput;
};

/** The root mutation */
export type RootMutationUpdateGravityFormsEntryArgs = {
  input: UpdateGravityFormsEntryInput;
};

/** The root mutation */
export type RootMutationUpdateMediaItemArgs = {
  input: UpdateMediaItemInput;
};

/** The root mutation */
export type RootMutationUpdatePageArgs = {
  input: UpdatePageInput;
};

/** The root mutation */
export type RootMutationUpdatePostArgs = {
  input: UpdatePostInput;
};

/** The root mutation */
export type RootMutationUpdatePostFormatArgs = {
  input: UpdatePostFormatInput;
};

/** The root mutation */
export type RootMutationUpdateSettingsArgs = {
  input: UpdateSettingsInput;
};

/** The root mutation */
export type RootMutationUpdateTagArgs = {
  input: UpdateTagInput;
};

/** The root mutation */
export type RootMutationUpdateUserArgs = {
  input: UpdateUserInput;
};

/** The root entry point into the Graph */
export type RootQuery = {
  __typename?: 'RootQuery';
  /** Entry point to get all settings for the site */
  allSettings?: Maybe<Settings>;
  /** Connection between the RootQuery type and the category type */
  categories?: Maybe<RootQueryToCategoryConnection>;
  /** A 0bject */
  category?: Maybe<Category>;
  /** Returns a Comment */
  comment?: Maybe<Comment>;
  /** Connection between the RootQuery type and the Comment type */
  comments?: Maybe<RootQueryToCommentConnection>;
  /** A node used to manage content */
  contentNode?: Maybe<ContentNode>;
  /** Connection between the RootQuery type and the ContentNode type */
  contentNodes?: Maybe<RootQueryToContentNodeConnection>;
  /** Fetch a Content Type node by unique Identifier */
  contentType?: Maybe<ContentType>;
  /** Connection between the RootQuery type and the ContentType type */
  contentTypes?: Maybe<RootQueryToContentTypeConnection>;
  /** Fields of the &#039;DiscussionSettings&#039; settings group */
  discussionSettings?: Maybe<DiscussionSettings>;
  /** Fields of the &#039;GeneralSettings&#039; settings group */
  generalSettings?: Maybe<GeneralSettings>;
  /** Connection between the RootQuery type and the GravityFormsEntry type */
  gravityFormsEntries?: Maybe<RootQueryToGravityFormsEntryConnection>;
  /** Get a Gravity Forms entry. */
  gravityFormsEntry?: Maybe<GravityFormsEntry>;
  /** Get a Gravity Forms form. */
  gravityFormsForm?: Maybe<GravityFormsForm>;
  /** Connection between the RootQuery type and the GravityFormsForm type */
  gravityFormsForms?: Maybe<RootQueryToGravityFormsFormConnection>;
  /** An object of the mediaItem Type.  */
  mediaItem?: Maybe<MediaItem>;
  /**
   * A mediaItem object
   * @deprecated Deprecated in favor of using the single entry point for this type with ID and IDType fields. For example, instead of postBy( id: &quot;&quot; ), use post(id: &quot;&quot; idType: &quot;&quot;)
   */
  mediaItemBy?: Maybe<MediaItem>;
  /** Connection between the RootQuery type and the mediaItem type */
  mediaItems?: Maybe<RootQueryToMediaItemConnection>;
  /** A WordPress navigation menu */
  menu?: Maybe<Menu>;
  /** A WordPress navigation menu item */
  menuItem?: Maybe<MenuItem>;
  /** Connection between the RootQuery type and the MenuItem type */
  menuItems?: Maybe<RootQueryToMenuItemConnection>;
  /** Connection between the RootQuery type and the Menu type */
  menus?: Maybe<RootQueryToMenuConnection>;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Fetches an object given its Unique Resource Identifier */
  nodeByUri?: Maybe<UniformResourceIdentifiable>;
  /** An object of the page Type.  */
  page?: Maybe<Page>;
  /**
   * A page object
   * @deprecated Deprecated in favor of using the single entry point for this type with ID and IDType fields. For example, instead of postBy( id: &quot;&quot; ), use post(id: &quot;&quot; idType: &quot;&quot;)
   */
  pageBy?: Maybe<Page>;
  /** Connection between the RootQuery type and the page type */
  pages?: Maybe<RootQueryToPageConnection>;
  /** A WordPress plugin */
  plugin?: Maybe<Plugin>;
  /** Connection between the RootQuery type and the Plugin type */
  plugins?: Maybe<RootQueryToPluginConnection>;
  /** An object of the post Type.  */
  post?: Maybe<Post>;
  /**
   * A post object
   * @deprecated Deprecated in favor of using the single entry point for this type with ID and IDType fields. For example, instead of postBy( id: &quot;&quot; ), use post(id: &quot;&quot; idType: &quot;&quot;)
   */
  postBy?: Maybe<Post>;
  /** A 0bject */
  postFormat?: Maybe<PostFormat>;
  /** Connection between the RootQuery type and the postFormat type */
  postFormats?: Maybe<RootQueryToPostFormatConnection>;
  /** Connection between the RootQuery type and the post type */
  posts?: Maybe<RootQueryToPostConnection>;
  /** Fields of the &#039;ReadingSettings&#039; settings group */
  readingSettings?: Maybe<ReadingSettings>;
  /** Connection between the RootQuery type and the EnqueuedScript type */
  registeredScripts?: Maybe<RootQueryToEnqueuedScriptConnection>;
  /** Connection between the RootQuery type and the EnqueuedStylesheet type */
  registeredStylesheets?: Maybe<RootQueryToEnqueuedStylesheetConnection>;
  /** Connection between the RootQuery type and the ContentRevisionUnion type */
  revisions?: Maybe<RootQueryToContentRevisionUnionConnection>;
  /** A 0bject */
  tag?: Maybe<Tag>;
  /** Connection between the RootQuery type and the tag type */
  tags?: Maybe<RootQueryToTagConnection>;
  /** Connection between the RootQuery type and the Taxonomy type */
  taxonomies?: Maybe<RootQueryToTaxonomyConnection>;
  /** Fetch a Taxonomy node by unique Identifier */
  taxonomy?: Maybe<Taxonomy>;
  /** A node in a taxonomy used to group and relate content nodes */
  termNode?: Maybe<TermNode>;
  /** Connection between the RootQuery type and the TermNode type */
  terms?: Maybe<RootQueryToTermNodeConnection>;
  /** A Theme object */
  theme?: Maybe<Theme>;
  /** Connection between the RootQuery type and the Theme type */
  themes?: Maybe<RootQueryToThemeConnection>;
  /** Returns a user */
  user?: Maybe<User>;
  /** Returns a user role */
  userRole?: Maybe<UserRole>;
  /** Connection between the RootQuery type and the UserRole type */
  userRoles?: Maybe<RootQueryToUserRoleConnection>;
  /** Connection between the RootQuery type and the User type */
  users?: Maybe<RootQueryToUserConnection>;
  /** Returns the current user */
  viewer?: Maybe<User>;
  /** Fields of the &#039;WritingSettings&#039; settings group */
  writingSettings?: Maybe<WritingSettings>;
};

/** The root entry point into the Graph */
export type RootQueryCategoriesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<RootQueryToCategoryConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type RootQueryCategoryArgs = {
  id: Scalars['ID'];
  idType?: Maybe<CategoryIdType>;
};

/** The root entry point into the Graph */
export type RootQueryCommentArgs = {
  id: Scalars['ID'];
};

/** The root entry point into the Graph */
export type RootQueryCommentsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<RootQueryToCommentConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type RootQueryContentNodeArgs = {
  id: Scalars['ID'];
  idType?: Maybe<ContentNodeIdTypeEnum>;
  contentType?: Maybe<ContentTypeEnum>;
  asPreview?: Maybe<Scalars['Boolean']>;
};

/** The root entry point into the Graph */
export type RootQueryContentNodesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<RootQueryToContentNodeConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type RootQueryContentTypeArgs = {
  id: Scalars['ID'];
  idType?: Maybe<ContentTypeIdTypeEnum>;
};

/** The root entry point into the Graph */
export type RootQueryContentTypesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

/** The root entry point into the Graph */
export type RootQueryGravityFormsEntriesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<RootQueryToGravityFormsEntryConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type RootQueryGravityFormsEntryArgs = {
  id: Scalars['ID'];
  idType?: Maybe<IdTypeEnum>;
};

/** The root entry point into the Graph */
export type RootQueryGravityFormsFormArgs = {
  id: Scalars['ID'];
  idType?: Maybe<IdTypeEnum>;
};

/** The root entry point into the Graph */
export type RootQueryGravityFormsFormsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<RootQueryToGravityFormsFormConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type RootQueryMediaItemArgs = {
  id: Scalars['ID'];
  idType?: Maybe<MediaItemIdType>;
  asPreview?: Maybe<Scalars['Boolean']>;
};

/** The root entry point into the Graph */
export type RootQueryMediaItemByArgs = {
  id?: Maybe<Scalars['ID']>;
  mediaItemId?: Maybe<Scalars['Int']>;
  uri?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};

/** The root entry point into the Graph */
export type RootQueryMediaItemsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<RootQueryToMediaItemConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type RootQueryMenuArgs = {
  id: Scalars['ID'];
  idType?: Maybe<MenuNodeIdTypeEnum>;
};

/** The root entry point into the Graph */
export type RootQueryMenuItemArgs = {
  id: Scalars['ID'];
  idType?: Maybe<MenuItemNodeIdTypeEnum>;
};

/** The root entry point into the Graph */
export type RootQueryMenuItemsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<RootQueryToMenuItemConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type RootQueryMenusArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<RootQueryToMenuConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type RootQueryNodeArgs = {
  id?: Maybe<Scalars['ID']>;
};

/** The root entry point into the Graph */
export type RootQueryNodeByUriArgs = {
  uri: Scalars['String'];
};

/** The root entry point into the Graph */
export type RootQueryPageArgs = {
  id: Scalars['ID'];
  idType?: Maybe<PageIdType>;
  asPreview?: Maybe<Scalars['Boolean']>;
};

/** The root entry point into the Graph */
export type RootQueryPageByArgs = {
  id?: Maybe<Scalars['ID']>;
  pageId?: Maybe<Scalars['Int']>;
  uri?: Maybe<Scalars['String']>;
};

/** The root entry point into the Graph */
export type RootQueryPagesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<RootQueryToPageConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type RootQueryPluginArgs = {
  id: Scalars['ID'];
};

/** The root entry point into the Graph */
export type RootQueryPluginsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

/** The root entry point into the Graph */
export type RootQueryPostArgs = {
  id: Scalars['ID'];
  idType?: Maybe<PostIdType>;
  asPreview?: Maybe<Scalars['Boolean']>;
};

/** The root entry point into the Graph */
export type RootQueryPostByArgs = {
  id?: Maybe<Scalars['ID']>;
  postId?: Maybe<Scalars['Int']>;
  uri?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};

/** The root entry point into the Graph */
export type RootQueryPostFormatArgs = {
  id: Scalars['ID'];
  idType?: Maybe<PostFormatIdType>;
};

/** The root entry point into the Graph */
export type RootQueryPostFormatsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<RootQueryToPostFormatConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type RootQueryPostsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<RootQueryToPostConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type RootQueryRegisteredScriptsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

/** The root entry point into the Graph */
export type RootQueryRegisteredStylesheetsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

/** The root entry point into the Graph */
export type RootQueryRevisionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<RootQueryToContentRevisionUnionConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type RootQueryTagArgs = {
  id: Scalars['ID'];
  idType?: Maybe<TagIdType>;
};

/** The root entry point into the Graph */
export type RootQueryTagsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<RootQueryToTagConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type RootQueryTaxonomiesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

/** The root entry point into the Graph */
export type RootQueryTaxonomyArgs = {
  id: Scalars['ID'];
  idType?: Maybe<TaxonomyIdTypeEnum>;
};

/** The root entry point into the Graph */
export type RootQueryTermNodeArgs = {
  id: Scalars['ID'];
  idType?: Maybe<TermNodeIdTypeEnum>;
  taxonomy?: Maybe<TaxonomyEnum>;
};

/** The root entry point into the Graph */
export type RootQueryTermsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<RootQueryToTermNodeConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type RootQueryThemeArgs = {
  id: Scalars['ID'];
};

/** The root entry point into the Graph */
export type RootQueryThemesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

/** The root entry point into the Graph */
export type RootQueryUserArgs = {
  id: Scalars['ID'];
  idType?: Maybe<UserNodeIdTypeEnum>;
};

/** The root entry point into the Graph */
export type RootQueryUserRoleArgs = {
  id: Scalars['ID'];
};

/** The root entry point into the Graph */
export type RootQueryUserRolesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

/** The root entry point into the Graph */
export type RootQueryUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<RootQueryToUserConnectionWhereArgs>;
};

/** Connection between the RootQuery type and the category type */
export type RootQueryToCategoryConnection = {
  __typename?: 'RootQueryToCategoryConnection';
  /** Edges for the RootQueryToCategoryConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToCategoryConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Category>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type RootQueryToCategoryConnectionEdge = {
  __typename?: 'RootQueryToCategoryConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<Category>;
};

/** Arguments for filtering the RootQueryToCategoryConnection connection */
export type RootQueryToCategoryConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: Maybe<Scalars['String']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: Maybe<Scalars['Int']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: Maybe<Scalars['Boolean']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: Maybe<Scalars['String']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: Maybe<Scalars['Boolean']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: Maybe<Scalars['Boolean']>;
  /** Array of term ids to include. Default empty array. */
  include?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: Maybe<Scalars['String']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Direction the connection should be ordered in */
  order?: Maybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: Maybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: Maybe<Scalars['Boolean']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: Maybe<Scalars['Int']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: Maybe<Scalars['String']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: Maybe<Scalars['Boolean']>;
};

/** Connection between the RootQuery type and the Comment type */
export type RootQueryToCommentConnection = {
  __typename?: 'RootQueryToCommentConnection';
  /** Edges for the RootQueryToCommentConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToCommentConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Comment>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type RootQueryToCommentConnectionEdge = {
  __typename?: 'RootQueryToCommentConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<Comment>;
};

/** Arguments for filtering the RootQueryToCommentConnection connection */
export type RootQueryToCommentConnectionWhereArgs = {
  /** Comment author email address. */
  authorEmail?: Maybe<Scalars['String']>;
  /** Array of author IDs to include comments for. */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Comment author URL. */
  authorUrl?: Maybe<Scalars['String']>;
  /** Array of comment IDs to include. */
  commentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Include comments of a given type. */
  commentType?: Maybe<Scalars['String']>;
  /** Include comments from a given array of comment types. */
  commentTypeIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: Maybe<Scalars['String']>;
  /** Content object author ID to limit results by. */
  contentAuthor?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: Maybe<Scalars['ID']>;
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Content object name to retrieve affiliated comments for. */
  contentName?: Maybe<Scalars['String']>;
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: Maybe<Scalars['Int']>;
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: Maybe<Array<Maybe<PostStatusEnum>>>;
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: Maybe<Array<Maybe<ContentTypeEnum>>>;
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Karma score to retrieve matching comments for. */
  karma?: Maybe<Scalars['Int']>;
  /** The cardinality of the order of the connection */
  order?: Maybe<OrderEnum>;
  /** Field to order the comments by. */
  orderby?: Maybe<CommentsConnectionOrderbyEnum>;
  /** Parent ID of comment to retrieve children of. */
  parent?: Maybe<Scalars['Int']>;
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Search term(s) to retrieve matching comments for. */
  search?: Maybe<Scalars['String']>;
  /** Comment status to limit results by. */
  status?: Maybe<Scalars['String']>;
  /** Include comments for a specific user ID. */
  userId?: Maybe<Scalars['ID']>;
};

/** Connection between the RootQuery type and the ContentNode type */
export type RootQueryToContentNodeConnection = {
  __typename?: 'RootQueryToContentNodeConnection';
  /** Edges for the RootQueryToContentNodeConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToContentNodeConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ContentNode>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type RootQueryToContentNodeConnectionEdge = {
  __typename?: 'RootQueryToContentNodeConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<ContentNode>;
};

/** Arguments for filtering the RootQueryToContentNodeConnection connection */
export type RootQueryToContentNodeConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: Maybe<Array<Maybe<ContentTypeEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>;
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>;
  /** Title of the object */
  title?: Maybe<Scalars['String']>;
};

/** Connection between the RootQuery type and the ContentRevisionUnion type */
export type RootQueryToContentRevisionUnionConnection = {
  __typename?: 'RootQueryToContentRevisionUnionConnection';
  /** Edges for the RootQueryToContentRevisionUnionConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToContentRevisionUnionConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ContentRevisionUnion>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type RootQueryToContentRevisionUnionConnectionEdge = {
  __typename?: 'RootQueryToContentRevisionUnionConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<ContentRevisionUnion>;
};

/** Arguments for filtering the RootQueryToContentRevisionUnionConnection connection */
export type RootQueryToContentRevisionUnionConnectionWhereArgs = {
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>;
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>;
  /** Title of the object */
  title?: Maybe<Scalars['String']>;
};

/** Connection between the RootQuery type and the ContentType type */
export type RootQueryToContentTypeConnection = {
  __typename?: 'RootQueryToContentTypeConnection';
  /** Edges for the RootQueryToContentTypeConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToContentTypeConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ContentType>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type RootQueryToContentTypeConnectionEdge = {
  __typename?: 'RootQueryToContentTypeConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<ContentType>;
};

/** Connection between the RootQuery type and the EnqueuedScript type */
export type RootQueryToEnqueuedScriptConnection = {
  __typename?: 'RootQueryToEnqueuedScriptConnection';
  /** Edges for the RootQueryToEnqueuedScriptConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToEnqueuedScriptConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<EnqueuedScript>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type RootQueryToEnqueuedScriptConnectionEdge = {
  __typename?: 'RootQueryToEnqueuedScriptConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<EnqueuedScript>;
};

/** Connection between the RootQuery type and the EnqueuedStylesheet type */
export type RootQueryToEnqueuedStylesheetConnection = {
  __typename?: 'RootQueryToEnqueuedStylesheetConnection';
  /** Edges for the RootQueryToEnqueuedStylesheetConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToEnqueuedStylesheetConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<EnqueuedStylesheet>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type RootQueryToEnqueuedStylesheetConnectionEdge = {
  __typename?: 'RootQueryToEnqueuedStylesheetConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<EnqueuedStylesheet>;
};

/** Connection between the RootQuery type and the GravityFormsEntry type */
export type RootQueryToGravityFormsEntryConnection = {
  __typename?: 'RootQueryToGravityFormsEntryConnection';
  /** Edges for the RootQueryToGravityFormsEntryConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToGravityFormsEntryConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<GravityFormsEntry>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type RootQueryToGravityFormsEntryConnectionEdge = {
  __typename?: 'RootQueryToGravityFormsEntryConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<GravityFormsEntry>;
};

/** Arguments for filtering the RootQueryToGravityFormsEntryConnection connection */
export type RootQueryToGravityFormsEntryConnectionWhereArgs = {
  /** Date filters to apply. */
  dateFilters?: Maybe<EntriesDateFiltersInput>;
  /** Field-specific filters to apply. */
  fieldFilters?: Maybe<Array<Maybe<EntriesFieldFiltersInput>>>;
  /** Whether to filter by ALL or ANY of the field filters. Default is ALL. */
  fieldFiltersMode?: Maybe<FieldFiltersModeEnum>;
  /** Array of form IDs to limit the entries to. Exclude this argument to query all forms. */
  formIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** How to sort the entries. */
  sort?: Maybe<EntriesSortingInput>;
  /** Entry status. Default is "ACTIVE". */
  status?: Maybe<EntryStatusEnum>;
};

/** Connection between the RootQuery type and the GravityFormsForm type */
export type RootQueryToGravityFormsFormConnection = {
  __typename?: 'RootQueryToGravityFormsFormConnection';
  /** Edges for the RootQueryToGravityFormsFormConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToGravityFormsFormConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<GravityFormsForm>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type RootQueryToGravityFormsFormConnectionEdge = {
  __typename?: 'RootQueryToGravityFormsFormConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<GravityFormsForm>;
};

/** Arguments for filtering the RootQueryToGravityFormsFormConnection connection */
export type RootQueryToGravityFormsFormConnectionWhereArgs = {
  /** Status of the forms to get. */
  status?: Maybe<FormStatusEnum>;
};

/** Connection between the RootQuery type and the mediaItem type */
export type RootQueryToMediaItemConnection = {
  __typename?: 'RootQueryToMediaItemConnection';
  /** Edges for the RootQueryToMediaItemConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToMediaItemConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<MediaItem>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type RootQueryToMediaItemConnectionEdge = {
  __typename?: 'RootQueryToMediaItemConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<MediaItem>;
};

/** Arguments for filtering the RootQueryToMediaItemConnection connection */
export type RootQueryToMediaItemConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: Maybe<Scalars['Int']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: Maybe<Scalars['String']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>;
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>;
  /** Title of the object */
  title?: Maybe<Scalars['String']>;
};

/** Connection between the RootQuery type and the Menu type */
export type RootQueryToMenuConnection = {
  __typename?: 'RootQueryToMenuConnection';
  /** Edges for the RootQueryToMenuConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToMenuConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Menu>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type RootQueryToMenuConnectionEdge = {
  __typename?: 'RootQueryToMenuConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<Menu>;
};

/** Arguments for filtering the RootQueryToMenuConnection connection */
export type RootQueryToMenuConnectionWhereArgs = {
  /** The ID of the object */
  id?: Maybe<Scalars['Int']>;
  /** The menu location for the menu being queried */
  location?: Maybe<MenuLocationEnum>;
  /** The slug of the menu to query items for */
  slug?: Maybe<Scalars['String']>;
};

/** Connection between the RootQuery type and the MenuItem type */
export type RootQueryToMenuItemConnection = {
  __typename?: 'RootQueryToMenuItemConnection';
  /** Edges for the RootQueryToMenuItemConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToMenuItemConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<MenuItem>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type RootQueryToMenuItemConnectionEdge = {
  __typename?: 'RootQueryToMenuItemConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<MenuItem>;
};

/** Arguments for filtering the RootQueryToMenuItemConnection connection */
export type RootQueryToMenuItemConnectionWhereArgs = {
  /** The ID of the object */
  id?: Maybe<Scalars['Int']>;
  /** The menu location for the menu being queried */
  location?: Maybe<MenuLocationEnum>;
  /** The database ID of the parent menu object */
  parentDatabaseId?: Maybe<Scalars['Int']>;
  /** The ID of the parent menu object */
  parentId?: Maybe<Scalars['ID']>;
};

/** Connection between the RootQuery type and the page type */
export type RootQueryToPageConnection = {
  __typename?: 'RootQueryToPageConnection';
  /** Edges for the RootQueryToPageConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToPageConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Page>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type RootQueryToPageConnectionEdge = {
  __typename?: 'RootQueryToPageConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<Page>;
};

/** Arguments for filtering the RootQueryToPageConnection connection */
export type RootQueryToPageConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: Maybe<Scalars['Int']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: Maybe<Scalars['String']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>;
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>;
  /** Title of the object */
  title?: Maybe<Scalars['String']>;
};

/** Connection between the RootQuery type and the Plugin type */
export type RootQueryToPluginConnection = {
  __typename?: 'RootQueryToPluginConnection';
  /** Edges for the RootQueryToPluginConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToPluginConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Plugin>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type RootQueryToPluginConnectionEdge = {
  __typename?: 'RootQueryToPluginConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<Plugin>;
};

/** Connection between the RootQuery type and the post type */
export type RootQueryToPostConnection = {
  __typename?: 'RootQueryToPostConnection';
  /** Edges for the RootQueryToPostConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToPostConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Post>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type RootQueryToPostConnectionEdge = {
  __typename?: 'RootQueryToPostConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<Post>;
};

/** Arguments for filtering the RootQueryToPostConnection connection */
export type RootQueryToPostConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: Maybe<Scalars['Int']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: Maybe<Scalars['String']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Category ID */
  categoryId?: Maybe<Scalars['Int']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Use Category Slug */
  categoryName?: Maybe<Scalars['String']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>;
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>;
  /** Tag Slug */
  tag?: Maybe<Scalars['String']>;
  /** Use Tag ID */
  tagId?: Maybe<Scalars['String']>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of tag slugs, used to display objects from one tag OR another */
  tagSlugAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Array of tag slugs, used to exclude objects in specified tags */
  tagSlugIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Title of the object */
  title?: Maybe<Scalars['String']>;
};

/** Connection between the RootQuery type and the postFormat type */
export type RootQueryToPostFormatConnection = {
  __typename?: 'RootQueryToPostFormatConnection';
  /** Edges for the RootQueryToPostFormatConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToPostFormatConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<PostFormat>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type RootQueryToPostFormatConnectionEdge = {
  __typename?: 'RootQueryToPostFormatConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<PostFormat>;
};

/** Arguments for filtering the RootQueryToPostFormatConnection connection */
export type RootQueryToPostFormatConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: Maybe<Scalars['String']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: Maybe<Scalars['Int']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: Maybe<Scalars['Boolean']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: Maybe<Scalars['String']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: Maybe<Scalars['Boolean']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: Maybe<Scalars['Boolean']>;
  /** Array of term ids to include. Default empty array. */
  include?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: Maybe<Scalars['String']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Direction the connection should be ordered in */
  order?: Maybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: Maybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: Maybe<Scalars['Boolean']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: Maybe<Scalars['Int']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: Maybe<Scalars['String']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: Maybe<Scalars['Boolean']>;
};

/** Connection between the RootQuery type and the tag type */
export type RootQueryToTagConnection = {
  __typename?: 'RootQueryToTagConnection';
  /** Edges for the RootQueryToTagConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToTagConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Tag>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type RootQueryToTagConnectionEdge = {
  __typename?: 'RootQueryToTagConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<Tag>;
};

/** Arguments for filtering the RootQueryToTagConnection connection */
export type RootQueryToTagConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: Maybe<Scalars['String']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: Maybe<Scalars['Int']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: Maybe<Scalars['Boolean']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: Maybe<Scalars['String']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: Maybe<Scalars['Boolean']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: Maybe<Scalars['Boolean']>;
  /** Array of term ids to include. Default empty array. */
  include?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: Maybe<Scalars['String']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Direction the connection should be ordered in */
  order?: Maybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: Maybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: Maybe<Scalars['Boolean']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: Maybe<Scalars['Int']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: Maybe<Scalars['String']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: Maybe<Scalars['Boolean']>;
};

/** Connection between the RootQuery type and the Taxonomy type */
export type RootQueryToTaxonomyConnection = {
  __typename?: 'RootQueryToTaxonomyConnection';
  /** Edges for the RootQueryToTaxonomyConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToTaxonomyConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Taxonomy>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type RootQueryToTaxonomyConnectionEdge = {
  __typename?: 'RootQueryToTaxonomyConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<Taxonomy>;
};

/** Connection between the RootQuery type and the TermNode type */
export type RootQueryToTermNodeConnection = {
  __typename?: 'RootQueryToTermNodeConnection';
  /** Edges for the RootQueryToTermNodeConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToTermNodeConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<TermNode>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type RootQueryToTermNodeConnectionEdge = {
  __typename?: 'RootQueryToTermNodeConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<TermNode>;
};

/** Arguments for filtering the RootQueryToTermNodeConnection connection */
export type RootQueryToTermNodeConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: Maybe<Scalars['String']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: Maybe<Scalars['Int']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: Maybe<Scalars['Boolean']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: Maybe<Scalars['String']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: Maybe<Scalars['Boolean']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: Maybe<Scalars['Boolean']>;
  /** Array of term ids to include. Default empty array. */
  include?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: Maybe<Scalars['String']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Direction the connection should be ordered in */
  order?: Maybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: Maybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: Maybe<Scalars['Boolean']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: Maybe<Scalars['Int']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: Maybe<Scalars['String']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** The Taxonomy to filter terms by */
  taxonomies?: Maybe<Array<Maybe<TaxonomyEnum>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: Maybe<Scalars['Boolean']>;
};

/** Connection between the RootQuery type and the Theme type */
export type RootQueryToThemeConnection = {
  __typename?: 'RootQueryToThemeConnection';
  /** Edges for the RootQueryToThemeConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToThemeConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Theme>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type RootQueryToThemeConnectionEdge = {
  __typename?: 'RootQueryToThemeConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<Theme>;
};

/** Connection between the RootQuery type and the User type */
export type RootQueryToUserConnection = {
  __typename?: 'RootQueryToUserConnection';
  /** Edges for the RootQueryToUserConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToUserConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<User>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type RootQueryToUserConnectionEdge = {
  __typename?: 'RootQueryToUserConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<User>;
};

/** Arguments for filtering the RootQueryToUserConnection connection */
export type RootQueryToUserConnectionWhereArgs = {
  /** Array of userIds to exclude. */
  exclude?: Maybe<Array<Maybe<Scalars['Int']>>>;
  /** Pass an array of post types to filter results to users who have published posts in those post types. */
  hasPublishedPosts?: Maybe<Array<Maybe<ContentTypeEnum>>>;
  /** Array of userIds to include. */
  include?: Maybe<Array<Maybe<Scalars['Int']>>>;
  /** The user login. */
  login?: Maybe<Scalars['String']>;
  /** An array of logins to include. Users matching one of these logins will be included in results. */
  loginIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** An array of logins to exclude. Users matching one of these logins will not be included in results. */
  loginNotIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** The user nicename. */
  nicename?: Maybe<Scalars['String']>;
  /** An array of nicenames to include. Users matching one of these nicenames will be included in results. */
  nicenameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** An array of nicenames to exclude. Users matching one of these nicenames will not be included in results. */
  nicenameNotIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<UsersConnectionOrderbyInput>>>;
  /** An array of role names that users must match to be included in results. Note that this is an inclusive list: users must match *each* role. */
  role?: Maybe<UserRoleEnum>;
  /** An array of role names. Matched users must have at least one of these roles. */
  roleIn?: Maybe<Array<Maybe<UserRoleEnum>>>;
  /** An array of role names to exclude. Users matching one or more of these roles will not be included in results. */
  roleNotIn?: Maybe<Array<Maybe<UserRoleEnum>>>;
  /** Search keyword. Searches for possible string matches on columns. When "searchColumns" is left empty, it tries to determine which column to search in based on search string. */
  search?: Maybe<Scalars['String']>;
  /** Array of column names to be searched. Accepts 'ID', 'login', 'nicename', 'email', 'url'. */
  searchColumns?: Maybe<Array<Maybe<UsersConnectionSearchColumnEnum>>>;
};

/** Connection between the RootQuery type and the UserRole type */
export type RootQueryToUserRoleConnection = {
  __typename?: 'RootQueryToUserRoleConnection';
  /** Edges for the RootQueryToUserRoleConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToUserRoleConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<UserRole>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type RootQueryToUserRoleConnectionEdge = {
  __typename?: 'RootQueryToUserRoleConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<UserRole>;
};

/** Operator to be used when evaluating logic rules. */
export enum RuleOperatorEnum {
  /** Evaluates values that CONTAIN the comparison value. */
  Contains = 'CONTAINS',
  /** Evaluates values that END with the comparison value. */
  EndsWith = 'ENDS_WITH',
  /** Evaluates values that are GREATER than the comparison value. */
  GreaterThan = 'GREATER_THAN',
  /** Evaluates values that match the comparison value. */
  Is = 'IS',
  /** Evaluates values that do NOT match the comparison value. */
  IsNot = 'IS_NOT',
  /** Evaluates values that are LESS than the comparison value. */
  LessThan = 'LESS_THAN',
  /** Evaluates values that START with the comparison value. */
  StartsWith = 'STARTS_WITH',
}

/** Gravity Forms form Save and Continue data. */
export type SaveAndContinue = {
  __typename?: 'SaveAndContinue';
  /** Contains the save button text. */
  buttonText?: Maybe<Scalars['String']>;
  /** Whether the Save And Continue feature is enabled. */
  enabled?: Maybe<Scalars['Boolean']>;
};

/** Gravity Forms Section field. */
export type SectionField = FormField & {
  __typename?: 'SectionField';
  /**
   * When specified, the value of this property will be used on the admin pages instead of the label. It is useful for fields with long labels.
   * @deprecated This property is not associated with the Gravity Forms SectionField type.
   */
  adminLabel?: Maybe<Scalars['String']>;
  /**
   * Determines if this field should only visible on the administration pages. A value of 1 will mark the field as admin only and will hide it from the public form. Useful for fields such as “status” that help with managing entries, but don’t apply to users filling out the form.
   * @deprecated This property is not associated with the Gravity Forms SectionField type.
   */
  adminOnly?: Maybe<Scalars['Boolean']>;
  /**
   * Determines if the field’s value can be pre-populated dynamically. 1 to allow field to be pre-populated, 0 otherwise.
   * @deprecated This property is not associated with the Gravity Forms SectionField type.
   */
  allowsPrepopulate?: Maybe<Scalars['Boolean']>;
  /** Controls the visibility of the field based on values selected by the user. */
  conditionalLogic?: Maybe<ConditionalLogic>;
  /** String containing the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields. */
  cssClass?: Maybe<Scalars['String']>;
  /**
   * Array of the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields.
   * @deprecated Please use `cssClass` instead.
   */
  cssClassList?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Field description. */
  description?: Maybe<Scalars['String']>;
  /** Indicates the field is only displayed and its contents are not submitted with the form/saved with the entry. This is set to true. */
  displayOnly?: Maybe<Scalars['Boolean']>;
  /** The ID of the form this field belongs to. */
  formId: Scalars['Int'];
  /** Field ID. */
  id: Scalars['Int'];
  /** Field label that will be displayed on the form and on the admin pages. */
  label?: Maybe<Scalars['String']>;
  /** Determines the size of the field when displayed on the page. */
  size?: Maybe<SizePropertyEnum>;
  /** The type of field to be displayed. */
  type: Scalars['String'];
  /** Field visibility. */
  visibility?: Maybe<VisibilityPropertyEnum>;
};

/** Gravity Forms Select field. */
export type SelectField = FormField & {
  __typename?: 'SelectField';
  /** When specified, the value of this property will be used on the admin pages instead of the label. It is useful for fields with long labels. */
  adminLabel?: Maybe<Scalars['String']>;
  /** Determines if this field should only visible on the administration pages. A value of 1 will mark the field as admin only and will hide it from the public form. Useful for fields such as “status” that help with managing entries, but don’t apply to users filling out the form. */
  adminOnly?: Maybe<Scalars['Boolean']>;
  /** Determines if the field’s value can be pre-populated dynamically. 1 to allow field to be pre-populated, 0 otherwise. */
  allowsPrepopulate?: Maybe<Scalars['Boolean']>;
  /** Contains the available choices for the field. For instance, drop down items and checkbox items are configured with this property. */
  choices?: Maybe<Array<Maybe<ChoiceProperty>>>;
  /** Controls the visibility of the field based on values selected by the user. */
  conditionalLogic?: Maybe<ConditionalLogic>;
  /** String containing the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields. */
  cssClass?: Maybe<Scalars['String']>;
  /**
   * Array of the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields.
   * @deprecated Please use `cssClass` instead.
   */
  cssClassList?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Contains the default value for the field. When specified, the field&#039;s value will be populated with the contents of this property when the form is displayed. */
  defaultValue?: Maybe<Scalars['String']>;
  /** Field description. */
  description?: Maybe<Scalars['String']>;
  /** The placement of the field description. */
  descriptionPlacement?: Maybe<DescriptionPlacementPropertyEnum>;
  /** Determines if the field (checkbox, select or radio) have choice values enabled, which allows the field to have choice values different from the labels that are displayed to the user. */
  enableChoiceValue?: Maybe<Scalars['Boolean']>;
  /** When set to true, the &quot;Chosen&quot; jQuery script will be applied to this field, enabling search capabilities to Drop Down fields and a more user-friendly interface for Multi Select fields. */
  enableEnhancedUI?: Maybe<Scalars['Boolean']>;
  /** This property is used when the radio button is a product option field and will be set to true. If not associated with a product, then it is false. */
  enablePrice?: Maybe<Scalars['Boolean']>;
  /** Contains the message that is displayed for fields that fail validation. */
  errorMessage?: Maybe<Scalars['String']>;
  /** The ID of the form this field belongs to. */
  formId: Scalars['Int'];
  /** Field ID. */
  id: Scalars['Int'];
  /** Assigns a name to this field so that it can be populated dynamically via this input name. Only applicable when allowsPrepopulate is set to 1. */
  inputName?: Maybe<Scalars['String']>;
  /** Determines if the field requires the user to enter a value. 1 marks the field as required, 0 marks the field as not required. Fields marked as required will prevent the form from being submitted if the user has not entered a value in it. */
  isRequired?: Maybe<Scalars['Boolean']>;
  /** Field label that will be displayed on the form and on the admin pages. */
  label?: Maybe<Scalars['String']>;
  /** Determines if the field allows duplicate submissions. 1 to prevent users from submitting the same value more than once, 0 to allow duplicate values. */
  noDuplicates?: Maybe<Scalars['Boolean']>;
  /** Field placeholder. */
  placeholder?: Maybe<Scalars['String']>;
  /** Determines the size of the field when displayed on the page. */
  size?: Maybe<SizePropertyEnum>;
  /** The type of field to be displayed. */
  type: Scalars['String'];
  /** Select field value. */
  value?: Maybe<Scalars['String']>;
  /** Field visibility. */
  visibility?: Maybe<VisibilityPropertyEnum>;
};

/** Select field value. */
export type SelectFieldValue = {
  __typename?: 'SelectFieldValue';
  /** The value. */
  value?: Maybe<Scalars['String']>;
};

/** Input for the sendPasswordResetEmail mutation */
export type SendPasswordResetEmailInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** A string that contains the user's username or email address. */
  username: Scalars['String'];
};

/** The payload for the sendPasswordResetEmail mutation */
export type SendPasswordResetEmailPayload = {
  __typename?: 'SendPasswordResetEmailPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The user that the password reset email was sent to */
  user?: Maybe<User>;
};

/** All of the registered settings */
export type Settings = {
  __typename?: 'Settings';
  /** Settings of the the string Settings Group */
  discussionSettingsDefaultCommentStatus?: Maybe<Scalars['String']>;
  /** Settings of the the string Settings Group */
  discussionSettingsDefaultPingStatus?: Maybe<Scalars['String']>;
  /** Settings of the the string Settings Group */
  generalSettingsDateFormat?: Maybe<Scalars['String']>;
  /** Settings of the the string Settings Group */
  generalSettingsDescription?: Maybe<Scalars['String']>;
  /** Settings of the the string Settings Group */
  generalSettingsEmail?: Maybe<Scalars['String']>;
  /** Settings of the the string Settings Group */
  generalSettingsLanguage?: Maybe<Scalars['String']>;
  /** Settings of the the integer Settings Group */
  generalSettingsStartOfWeek?: Maybe<Scalars['Int']>;
  /** Settings of the the string Settings Group */
  generalSettingsTimeFormat?: Maybe<Scalars['String']>;
  /** Settings of the the string Settings Group */
  generalSettingsTimezone?: Maybe<Scalars['String']>;
  /** Settings of the the string Settings Group */
  generalSettingsTitle?: Maybe<Scalars['String']>;
  /** Settings of the the string Settings Group */
  generalSettingsUrl?: Maybe<Scalars['String']>;
  /** Settings of the the integer Settings Group */
  readingSettingsPostsPerPage?: Maybe<Scalars['Int']>;
  /** Settings of the the integer Settings Group */
  writingSettingsDefaultCategory?: Maybe<Scalars['Int']>;
  /** Settings of the the string Settings Group */
  writingSettingsDefaultPostFormat?: Maybe<Scalars['String']>;
  /** Settings of the the boolean Settings Group */
  writingSettingsUseSmilies?: Maybe<Scalars['Boolean']>;
};

/** Border style to be used around the signature area. */
export enum SignatureBorderStyleEnum {
  /** A "dashed" border style. */
  Dashed = 'DASHED',
  /** A "dotted" border style. */
  Dotted = 'DOTTED',
  /** A "double" border style. */
  Double = 'DOUBLE',
  /** An "inset" border style. */
  Inset = 'INSET',
  /** An "outset" border style. */
  Outset = 'OUTSET',
  /** A "ridge" border style. */
  Ridge = 'RIDGE',
  /** A "solid" border style. */
  Solid = 'SOLID',
}

/** Width of the border around the signature area. */
export enum SignatureBorderWidthEnum {
  /** A large border width */
  Large = 'LARGE',
  /** A medium border width */
  Medium = 'MEDIUM',
  /** No border width. */
  None = 'NONE',
  /** A small border width */
  Small = 'SMALL',
}

/** Gravity Forms Signature field. */
export type SignatureField = FormField & {
  __typename?: 'SignatureField';
  /** When specified, the value of this property will be used on the admin pages instead of the label. It is useful for fields with long labels. */
  adminLabel?: Maybe<Scalars['String']>;
  /** Determines if this field should only visible on the administration pages. A value of 1 will mark the field as admin only and will hide it from the public form. Useful for fields such as “status” that help with managing entries, but don’t apply to users filling out the form. */
  adminOnly?: Maybe<Scalars['Boolean']>;
  /** Color to be used for the background of the signature area. Can be any valid CSS color value. */
  backgroundColor?: Maybe<Scalars['String']>;
  /** Color to be used for the border around the signature area. Can be any valid CSS color value. */
  borderColor?: Maybe<Scalars['String']>;
  /** Border style to be used around the signature area. */
  borderStyle?: Maybe<SignatureBorderStyleEnum>;
  /** Width of the border around the signature area. */
  borderWidth?: Maybe<SignatureBorderWidthEnum>;
  /** Width of the signature field in pixels. */
  boxWidth?: Maybe<Scalars['Int']>;
  /** Controls the visibility of the field based on values selected by the user. */
  conditionalLogic?: Maybe<ConditionalLogic>;
  /** String containing the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields. */
  cssClass?: Maybe<Scalars['String']>;
  /**
   * Array of the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields.
   * @deprecated Please use `cssClass` instead.
   */
  cssClassList?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Field description. */
  description?: Maybe<Scalars['String']>;
  /** The placement of the field description. */
  descriptionPlacement?: Maybe<DescriptionPlacementPropertyEnum>;
  /** Contains the message that is displayed for fields that fail validation. */
  errorMessage?: Maybe<Scalars['String']>;
  /** The ID of the form this field belongs to. */
  formId: Scalars['Int'];
  /** Field ID. */
  id: Scalars['Int'];
  /** Determines if the field requires the user to enter a value. 1 marks the field as required, 0 marks the field as not required. Fields marked as required will prevent the form from being submitted if the user has not entered a value in it. */
  isRequired?: Maybe<Scalars['Boolean']>;
  /** Field label that will be displayed on the form and on the admin pages. */
  label?: Maybe<Scalars['String']>;
  /** Color of the pen to be used for the signature. Can be any valid CSS color value. */
  penColor?: Maybe<Scalars['String']>;
  /** Size of the pen cursor. */
  penSize?: Maybe<Scalars['Int']>;
  /** Determines the size of the field when displayed on the page. */
  size?: Maybe<SizePropertyEnum>;
  /** The type of field to be displayed. */
  type: Scalars['String'];
  /** Signature field value. */
  value?: Maybe<Scalars['String']>;
  /** Field visibility. */
  visibility?: Maybe<VisibilityPropertyEnum>;
};

/** Signature field value. */
export type SignatureFieldValue = {
  __typename?: 'SignatureFieldValue';
  /**
   * URL to the  file.
   * @deprecated Please use `value` instead.
   */
  url?: Maybe<Scalars['String']>;
  /** The URL to the signature image. */
  value?: Maybe<Scalars['String']>;
};

/** The size of the field when displayed on the page. */
export enum SizePropertyEnum {
  /** Large field size. */
  Large = 'LARGE',
  /** Medium field size. */
  Medium = 'MEDIUM',
  /** Small field size. */
  Small = 'SMALL',
}

/** Sorting Direction. Default is DESC */
export enum SortingInputEnum {
  /** Sort by ascending. */
  Asc = 'ASC',
  /** Sort by descending (default). */
  Desc = 'DESC',
}

/** Input for the submitGravityFormsDraftEntry mutation */
export type SubmitGravityFormsDraftEntryInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Draft resume token. */
  resumeToken: Scalars['String'];
};

/** The payload for the submitGravityFormsDraftEntry mutation */
export type SubmitGravityFormsDraftEntryPayload = {
  __typename?: 'SubmitGravityFormsDraftEntryPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The entry that was created. */
  entry?: Maybe<GravityFormsEntry>;
  /** The ID of the entry that was created. */
  entryId?: Maybe<Scalars['Int']>;
  /** Field errors. */
  errors?: Maybe<Array<Maybe<FieldError>>>;
};

/** Input for the submitGravityFormsForm mutation */
export type SubmitGravityFormsFormInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Optional. ID of the user that submitted of the form if a logged in user submitted the form. */
  createdBy?: Maybe<Scalars['Int']>;
  /** The field ids and their values. */
  fieldValues?: Maybe<Array<Maybe<FieldValuesInput>>>;
  /** The form ID. */
  formId: Scalars['Int'];
  /** Optional. The IP address of the user who submitted the draft entry. Default is an empty string. */
  ip?: Maybe<Scalars['String']>;
  /** Optional. Set to `true` if submitting a draft entry. */
  saveAsDraft?: Maybe<Scalars['Boolean']>;
  /** Optional. Useful for multi-page forms to indicate which page of the form was just submitted. */
  sourcePage?: Maybe<Scalars['Int']>;
  /** Optional. Useful for multi-page forms to indicate which page is to be loaded if the current page passes validation. */
  targetPage?: Maybe<Scalars['Int']>;
};

/** The payload for the submitGravityFormsForm mutation */
export type SubmitGravityFormsFormPayload = {
  __typename?: 'SubmitGravityFormsFormPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The entry that was created. */
  entry?: Maybe<GravityFormsEntry>;
  /** The ID of the entry that was created. Null if the entry was only partially submitted or submitted as a draft. */
  entryId?: Maybe<Scalars['Int']>;
  /** Field errors. */
  errors?: Maybe<Array<Maybe<FieldError>>>;
  /** Draft resume token. */
  resumeToken?: Maybe<Scalars['String']>;
  /** Draft resume URL. If the &quot;Referer&quot; header is not included in the request, this will be an empty string. */
  resumeUrl?: Maybe<Scalars['String']>;
};

/** The tag type */
export type Tag = Node &
  TermNode &
  DatabaseIdentifier &
  UniformResourceIdentifiable &
  MenuItemLinkable & {
    __typename?: 'Tag';
    /** Connection between the tag type and the ContentNode type */
    contentNodes?: Maybe<TagToContentNodeConnection>;
    /** The number of objects connected to the object */
    count?: Maybe<Scalars['Int']>;
    /** Identifies the primary key from the database. */
    databaseId: Scalars['Int'];
    /** The description of the object */
    description?: Maybe<Scalars['String']>;
    /** Connection between the TermNode type and the EnqueuedScript type */
    enqueuedScripts?: Maybe<TermNodeToEnqueuedScriptConnection>;
    /** Connection between the TermNode type and the EnqueuedStylesheet type */
    enqueuedStylesheets?: Maybe<TermNodeToEnqueuedStylesheetConnection>;
    /** The globally unique ID for the object */
    id: Scalars['ID'];
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']>;
    /** The link to the term */
    link?: Maybe<Scalars['String']>;
    /** The human friendly name of the object. */
    name?: Maybe<Scalars['String']>;
    /** Connection between the tag type and the post type */
    posts?: Maybe<TagToPostConnection>;
    /** An alphanumeric identifier for the object unique to its type. */
    slug?: Maybe<Scalars['String']>;
    /**
     * The id field matches the WP_Post-&gt;ID field.
     * @deprecated Deprecated in favor of databaseId
     */
    tagId?: Maybe<Scalars['Int']>;
    /** Connection between the tag type and the Taxonomy type */
    taxonomy?: Maybe<TagToTaxonomyConnectionEdge>;
    /** The ID of the term group that this term object belongs to */
    termGroupId?: Maybe<Scalars['Int']>;
    /** The taxonomy ID that the object is associated with */
    termTaxonomyId?: Maybe<Scalars['Int']>;
    /** The unique resource identifier path */
    uri: Scalars['String'];
  };

/** The tag type */
export type TagContentNodesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<TagToContentNodeConnectionWhereArgs>;
};

/** The tag type */
export type TagEnqueuedScriptsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

/** The tag type */
export type TagEnqueuedStylesheetsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

/** The tag type */
export type TagPostsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<TagToPostConnectionWhereArgs>;
};

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum TagIdType {
  /** The Database ID for the node */
  DatabaseId = 'DATABASE_ID',
  /** The hashed Global ID */
  Id = 'ID',
  /** The name of the node */
  Name = 'NAME',
  /** Url friendly name of the node */
  Slug = 'SLUG',
  /** The URI for the node */
  Uri = 'URI',
}

/** Connection between the tag type and the ContentNode type */
export type TagToContentNodeConnection = {
  __typename?: 'TagToContentNodeConnection';
  /** Edges for the TagToContentNodeConnection connection */
  edges?: Maybe<Array<Maybe<TagToContentNodeConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ContentNode>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type TagToContentNodeConnectionEdge = {
  __typename?: 'TagToContentNodeConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<ContentNode>;
};

/** Arguments for filtering the TagToContentNodeConnection connection */
export type TagToContentNodeConnectionWhereArgs = {
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>;
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>;
  /** Title of the object */
  title?: Maybe<Scalars['String']>;
};

/** Connection between the tag type and the post type */
export type TagToPostConnection = {
  __typename?: 'TagToPostConnection';
  /** Edges for the TagToPostConnection connection */
  edges?: Maybe<Array<Maybe<TagToPostConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Post>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type TagToPostConnectionEdge = {
  __typename?: 'TagToPostConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<Post>;
};

/** Arguments for filtering the TagToPostConnection connection */
export type TagToPostConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: Maybe<Scalars['Int']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: Maybe<Scalars['String']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Category ID */
  categoryId?: Maybe<Scalars['Int']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Use Category Slug */
  categoryName?: Maybe<Scalars['String']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>;
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>;
  /** Tag Slug */
  tag?: Maybe<Scalars['String']>;
  /** Use Tag ID */
  tagId?: Maybe<Scalars['String']>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of tag slugs, used to display objects from one tag OR another */
  tagSlugAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Array of tag slugs, used to exclude objects in specified tags */
  tagSlugIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Title of the object */
  title?: Maybe<Scalars['String']>;
};

/** Connection between the tag type and the Taxonomy type */
export type TagToTaxonomyConnectionEdge = {
  __typename?: 'TagToTaxonomyConnectionEdge';
  /** The nodes of the connection, without the edges */
  node?: Maybe<Taxonomy>;
};

/** A taxonomy object */
export type Taxonomy = Node & {
  __typename?: 'Taxonomy';
  /** List of Content Types associated with the Taxonomy */
  connectedContentTypes?: Maybe<TaxonomyToContentTypeConnection>;
  /** Description of the taxonomy. This field is equivalent to WP_Taxonomy-&gt;description */
  description?: Maybe<Scalars['String']>;
  /** The plural name of the post type within the GraphQL Schema. */
  graphqlPluralName?: Maybe<Scalars['String']>;
  /** The singular name of the post type within the GraphQL Schema. */
  graphqlSingleName?: Maybe<Scalars['String']>;
  /** Whether the taxonomy is hierarchical */
  hierarchical?: Maybe<Scalars['Boolean']>;
  /** The globally unique identifier of the taxonomy object. */
  id: Scalars['ID'];
  /** Whether the object is restricted from the current viewer */
  isRestricted?: Maybe<Scalars['Boolean']>;
  /** Name of the taxonomy shown in the menu. Usually plural. */
  label?: Maybe<Scalars['String']>;
  /** The display name of the taxonomy. This field is equivalent to WP_Taxonomy-&gt;label */
  name?: Maybe<Scalars['String']>;
  /** Whether the taxonomy is publicly queryable */
  public?: Maybe<Scalars['Boolean']>;
  /** Name of content type to diplay in REST API &quot;wp/v2&quot; namespace. */
  restBase?: Maybe<Scalars['String']>;
  /** The REST Controller class assigned to handling this content type. */
  restControllerClass?: Maybe<Scalars['String']>;
  /** Whether to show the taxonomy as part of a tag cloud widget. This field is equivalent to WP_Taxonomy-&gt;show_tagcloud */
  showCloud?: Maybe<Scalars['Boolean']>;
  /** Whether to display a column for the taxonomy on its post type listing screens. */
  showInAdminColumn?: Maybe<Scalars['Boolean']>;
  /** Whether to add the post type to the GraphQL Schema. */
  showInGraphql?: Maybe<Scalars['Boolean']>;
  /** Whether to show the taxonomy in the admin menu */
  showInMenu?: Maybe<Scalars['Boolean']>;
  /** Whether the taxonomy is available for selection in navigation menus. */
  showInNavMenus?: Maybe<Scalars['Boolean']>;
  /** Whether to show the taxonomy in the quick/bulk edit panel. */
  showInQuickEdit?: Maybe<Scalars['Boolean']>;
  /** Whether to add the post type route in the REST API &quot;wp/v2&quot; namespace. */
  showInRest?: Maybe<Scalars['Boolean']>;
  /** Whether to generate and allow a UI for managing terms in this taxonomy in the admin */
  showUi?: Maybe<Scalars['Boolean']>;
};

/** A taxonomy object */
export type TaxonomyConnectedContentTypesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

/** Allowed taxonomies */
export enum TaxonomyEnum {
  /** Taxonomy enum category */
  Category = 'CATEGORY',
  /** Taxonomy enum post_format */
  Postformat = 'POSTFORMAT',
  /** Taxonomy enum post_tag */
  Tag = 'TAG',
}

/** The Type of Identifier used to fetch a single Taxonomy node. To be used along with the "id" field. Default is "ID". */
export enum TaxonomyIdTypeEnum {
  /** The globally unique ID */
  Id = 'ID',
  /** The name of the taxonomy */
  Name = 'NAME',
}

/** Connection between the Taxonomy type and the ContentType type */
export type TaxonomyToContentTypeConnection = {
  __typename?: 'TaxonomyToContentTypeConnection';
  /** Edges for the TaxonomyToContentTypeConnection connection */
  edges?: Maybe<Array<Maybe<TaxonomyToContentTypeConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ContentType>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type TaxonomyToContentTypeConnectionEdge = {
  __typename?: 'TaxonomyToContentTypeConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<ContentType>;
};

/** Terms are nodes within a Taxonomy, used to group and relate other nodes. */
export type TermNode = {
  /** The number of objects connected to the object */
  count?: Maybe<Scalars['Int']>;
  /** Identifies the primary key from the database. */
  databaseId: Scalars['Int'];
  /** The description of the object */
  description?: Maybe<Scalars['String']>;
  /** Connection between the TermNode type and the EnqueuedScript type */
  enqueuedScripts?: Maybe<TermNodeToEnqueuedScriptConnection>;
  /** Connection between the TermNode type and the EnqueuedStylesheet type */
  enqueuedStylesheets?: Maybe<TermNodeToEnqueuedStylesheetConnection>;
  /** Unique identifier for the term */
  id: Scalars['ID'];
  /** Whether the object is restricted from the current viewer */
  isRestricted?: Maybe<Scalars['Boolean']>;
  /** The link to the term */
  link?: Maybe<Scalars['String']>;
  /** The human friendly name of the object. */
  name?: Maybe<Scalars['String']>;
  /** An alphanumeric identifier for the object unique to its type. */
  slug?: Maybe<Scalars['String']>;
  /** The ID of the term group that this term object belongs to */
  termGroupId?: Maybe<Scalars['Int']>;
  /** The taxonomy ID that the object is associated with */
  termTaxonomyId?: Maybe<Scalars['Int']>;
  /** The unique resource identifier path */
  uri: Scalars['String'];
};

/** Terms are nodes within a Taxonomy, used to group and relate other nodes. */
export type TermNodeEnqueuedScriptsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

/** Terms are nodes within a Taxonomy, used to group and relate other nodes. */
export type TermNodeEnqueuedStylesheetsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

/** The Type of Identifier used to fetch a single resource. Default is "ID". To be used along with the "id" field. */
export enum TermNodeIdTypeEnum {
  /** The Database ID for the node */
  DatabaseId = 'DATABASE_ID',
  /** The hashed Global ID */
  Id = 'ID',
  /** The name of the node */
  Name = 'NAME',
  /** Url friendly name of the node */
  Slug = 'SLUG',
  /** The URI for the node */
  Uri = 'URI',
}

/** Connection between the TermNode type and the EnqueuedScript type */
export type TermNodeToEnqueuedScriptConnection = {
  __typename?: 'TermNodeToEnqueuedScriptConnection';
  /** Edges for the TermNodeToEnqueuedScriptConnection connection */
  edges?: Maybe<Array<Maybe<TermNodeToEnqueuedScriptConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<EnqueuedScript>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type TermNodeToEnqueuedScriptConnectionEdge = {
  __typename?: 'TermNodeToEnqueuedScriptConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<EnqueuedScript>;
};

/** Connection between the TermNode type and the EnqueuedStylesheet type */
export type TermNodeToEnqueuedStylesheetConnection = {
  __typename?: 'TermNodeToEnqueuedStylesheetConnection';
  /** Edges for the TermNodeToEnqueuedStylesheetConnection connection */
  edges?: Maybe<Array<Maybe<TermNodeToEnqueuedStylesheetConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<EnqueuedStylesheet>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type TermNodeToEnqueuedStylesheetConnectionEdge = {
  __typename?: 'TermNodeToEnqueuedStylesheetConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<EnqueuedStylesheet>;
};

/** Union between the Category, Tag and PostFormatPost types */
export type TermObjectUnion = Category | Tag | PostFormat;

/** Options for ordering the connection by */
export enum TermObjectsConnectionOrderbyEnum {
  /** Order the connection by item count. */
  Count = 'COUNT',
  /** Order the connection by description. */
  Description = 'DESCRIPTION',
  /** Order the connection by name. */
  Name = 'NAME',
  /** Order the connection by slug. */
  Slug = 'SLUG',
  /** Order the connection by term group. */
  TermGroup = 'TERM_GROUP',
  /** Order the connection by term id. */
  TermId = 'TERM_ID',
  /** Order the connection by term order. */
  TermOrder = 'TERM_ORDER',
}

/** Gravity Forms Textarea (Paragraph Text) field. */
export type TextAreaField = FormField & {
  __typename?: 'TextAreaField';
  /** When specified, the value of this property will be used on the admin pages instead of the label. It is useful for fields with long labels. */
  adminLabel?: Maybe<Scalars['String']>;
  /** Determines if this field should only visible on the administration pages. A value of 1 will mark the field as admin only and will hide it from the public form. Useful for fields such as “status” that help with managing entries, but don’t apply to users filling out the form. */
  adminOnly?: Maybe<Scalars['Boolean']>;
  /** Determines if the field’s value can be pre-populated dynamically. 1 to allow field to be pre-populated, 0 otherwise. */
  allowsPrepopulate?: Maybe<Scalars['Boolean']>;
  /** Controls the visibility of the field based on values selected by the user. */
  conditionalLogic?: Maybe<ConditionalLogic>;
  /** String containing the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields. */
  cssClass?: Maybe<Scalars['String']>;
  /**
   * Array of the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields.
   * @deprecated Please use `cssClass` instead.
   */
  cssClassList?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Contains the default value for the field. When specified, the field&#039;s value will be populated with the contents of this property when the form is displayed. */
  defaultValue?: Maybe<Scalars['String']>;
  /** Field description. */
  description?: Maybe<Scalars['String']>;
  /** The placement of the field description. */
  descriptionPlacement?: Maybe<DescriptionPlacementPropertyEnum>;
  /** Contains the message that is displayed for fields that fail validation. */
  errorMessage?: Maybe<Scalars['String']>;
  /** The ID of the form this field belongs to. */
  formId: Scalars['Int'];
  /** Field ID. */
  id: Scalars['Int'];
  /** Assigns a name to this field so that it can be populated dynamically via this input name. Only applicable when allowsPrepopulate is set to 1. */
  inputName?: Maybe<Scalars['String']>;
  /** Determines if the field requires the user to enter a value. 1 marks the field as required, 0 marks the field as not required. Fields marked as required will prevent the form from being submitted if the user has not entered a value in it. */
  isRequired?: Maybe<Scalars['Boolean']>;
  /** Field label that will be displayed on the form and on the admin pages. */
  label?: Maybe<Scalars['String']>;
  /** Specifies the maximum number of characters allowed in a text or textarea (paragraph) field. */
  maxLength?: Maybe<Scalars['Int']>;
  /** Determines if the field allows duplicate submissions. 1 to prevent users from submitting the same value more than once, 0 to allow duplicate values. */
  noDuplicates?: Maybe<Scalars['Boolean']>;
  /** Field placeholder. */
  placeholder?: Maybe<Scalars['String']>;
  /** Determines the size of the field when displayed on the page. */
  size?: Maybe<SizePropertyEnum>;
  /** The type of field to be displayed. */
  type: Scalars['String'];
  /** Indicates whether the field uses the rich text editor interface. */
  useRichTextEditor?: Maybe<Scalars['Boolean']>;
  /** TextArea field value. */
  value?: Maybe<Scalars['String']>;
  /** Field visibility. */
  visibility?: Maybe<VisibilityPropertyEnum>;
};

/** Textarea field value. */
export type TextAreaFieldValue = {
  __typename?: 'TextAreaFieldValue';
  /** The value. */
  value?: Maybe<Scalars['String']>;
};

/** Gravity Forms Single Line Text field. */
export type TextField = FormField & {
  __typename?: 'TextField';
  /** When specified, the value of this property will be used on the admin pages instead of the label. It is useful for fields with long labels. */
  adminLabel?: Maybe<Scalars['String']>;
  /** Determines if this field should only visible on the administration pages. A value of 1 will mark the field as admin only and will hide it from the public form. Useful for fields such as “status” that help with managing entries, but don’t apply to users filling out the form. */
  adminOnly?: Maybe<Scalars['Boolean']>;
  /** Determines if the field’s value can be pre-populated dynamically. 1 to allow field to be pre-populated, 0 otherwise. */
  allowsPrepopulate?: Maybe<Scalars['Boolean']>;
  /** Controls the visibility of the field based on values selected by the user. */
  conditionalLogic?: Maybe<ConditionalLogic>;
  /** String containing the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields. */
  cssClass?: Maybe<Scalars['String']>;
  /**
   * Array of the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields.
   * @deprecated Please use `cssClass` instead.
   */
  cssClassList?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Contains the default value for the field. When specified, the field&#039;s value will be populated with the contents of this property when the form is displayed. */
  defaultValue?: Maybe<Scalars['String']>;
  /** Field description. */
  description?: Maybe<Scalars['String']>;
  /** The placement of the field description. */
  descriptionPlacement?: Maybe<DescriptionPlacementPropertyEnum>;
  /** Determines if a text field input tag should be created with a &quot;password&quot; type. */
  enablePasswordInput?: Maybe<Scalars['Boolean']>;
  /** Contains the message that is displayed for fields that fail validation. */
  errorMessage?: Maybe<Scalars['String']>;
  /** The ID of the form this field belongs to. */
  formId: Scalars['Int'];
  /** Field ID. */
  id: Scalars['Int'];
  /** Assigns a name to this field so that it can be populated dynamically via this input name. Only applicable when allowsPrepopulate is set to 1. */
  inputName?: Maybe<Scalars['String']>;
  /** Determines if the field requires the user to enter a value. 1 marks the field as required, 0 marks the field as not required. Fields marked as required will prevent the form from being submitted if the user has not entered a value in it. */
  isRequired?: Maybe<Scalars['Boolean']>;
  /** Field label that will be displayed on the form and on the admin pages. */
  label?: Maybe<Scalars['String']>;
  /** Specifies the maximum number of characters allowed in a text or textarea (paragraph) field. */
  maxLength?: Maybe<Scalars['Int']>;
  /** Determines if the field allows duplicate submissions. 1 to prevent users from submitting the same value more than once, 0 to allow duplicate values. */
  noDuplicates?: Maybe<Scalars['Boolean']>;
  /** Field placeholder. */
  placeholder?: Maybe<Scalars['String']>;
  /** Determines the size of the field when displayed on the page. */
  size?: Maybe<SizePropertyEnum>;
  /** The type of field to be displayed. */
  type: Scalars['String'];
  /** Text field value. */
  value?: Maybe<Scalars['String']>;
  /** Field visibility. */
  visibility?: Maybe<VisibilityPropertyEnum>;
};

/** Text field value. */
export type TextFieldValue = {
  __typename?: 'TextFieldValue';
  /** The value. */
  value?: Maybe<Scalars['String']>;
};

/** A theme object */
export type Theme = Node & {
  __typename?: 'Theme';
  /** Name of the theme author(s), could also be a company name. This field is equivalent to WP_Theme-&gt;get( &quot;Author&quot; ). */
  author?: Maybe<Scalars['String']>;
  /** URI for the author/company website. This field is equivalent to WP_Theme-&gt;get( &quot;AuthorURI&quot; ). */
  authorUri?: Maybe<Scalars['String']>;
  /** The description of the theme. This field is equivalent to WP_Theme-&gt;get( &quot;Description&quot; ). */
  description?: Maybe<Scalars['String']>;
  /** The globally unique identifier of the theme object. */
  id: Scalars['ID'];
  /** Whether the object is restricted from the current viewer */
  isRestricted?: Maybe<Scalars['Boolean']>;
  /** Display name of the theme. This field is equivalent to WP_Theme-&gt;get( &quot;Name&quot; ). */
  name?: Maybe<Scalars['String']>;
  /** The URL of the screenshot for the theme. The screenshot is intended to give an overview of what the theme looks like. This field is equivalent to WP_Theme-&gt;get_screenshot(). */
  screenshot?: Maybe<Scalars['String']>;
  /** The theme slug is used to internally match themes. Theme slugs can have subdirectories like: my-theme/sub-theme. This field is equivalent to WP_Theme-&gt;get_stylesheet(). */
  slug?: Maybe<Scalars['String']>;
  /** URI for the author/company website. This field is equivalent to WP_Theme-&gt;get( &quot;Tags&quot; ). */
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** A URI if the theme has a website associated with it. The Theme URI is handy for directing users to a theme site for support etc. This field is equivalent to WP_Theme-&gt;get( &quot;ThemeURI&quot; ). */
  themeUri?: Maybe<Scalars['String']>;
  /** The current version of the theme. This field is equivalent to WP_Theme-&gt;get( &quot;Version&quot; ). */
  version?: Maybe<Scalars['String']>;
};

/** Gravity Forms Time field. */
export type TimeField = FormField & {
  __typename?: 'TimeField';
  /** When specified, the value of this property will be used on the admin pages instead of the label. It is useful for fields with long labels. */
  adminLabel?: Maybe<Scalars['String']>;
  /** Determines if this field should only visible on the administration pages. A value of 1 will mark the field as admin only and will hide it from the public form. Useful for fields such as “status” that help with managing entries, but don’t apply to users filling out the form. */
  adminOnly?: Maybe<Scalars['Boolean']>;
  /** Determines if the field’s value can be pre-populated dynamically. 1 to allow field to be pre-populated, 0 otherwise. */
  allowsPrepopulate?: Maybe<Scalars['Boolean']>;
  /** Controls the visibility of the field based on values selected by the user. */
  conditionalLogic?: Maybe<ConditionalLogic>;
  /** String containing the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields. */
  cssClass?: Maybe<Scalars['String']>;
  /**
   * Array of the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields.
   * @deprecated Please use `cssClass` instead.
   */
  cssClassList?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Field description. */
  description?: Maybe<Scalars['String']>;
  /** The placement of the field description. */
  descriptionPlacement?: Maybe<DescriptionPlacementPropertyEnum>;
  /** Contains the message that is displayed for fields that fail validation. */
  errorMessage?: Maybe<Scalars['String']>;
  /** The ID of the form this field belongs to. */
  formId: Scalars['Int'];
  /** Field ID. */
  id: Scalars['Int'];
  /** Assigns a name to this field so that it can be populated dynamically via this input name. Only applicable when allowsPrepopulate is set to 1. */
  inputName?: Maybe<Scalars['String']>;
  /** An array containing the the individual properties for each element of the field. */
  inputs?: Maybe<Array<Maybe<InputProperty>>>;
  /** Determines if the field requires the user to enter a value. 1 marks the field as required, 0 marks the field as not required. Fields marked as required will prevent the form from being submitted if the user has not entered a value in it. */
  isRequired?: Maybe<Scalars['Boolean']>;
  /** Field label that will be displayed on the form and on the admin pages. */
  label?: Maybe<Scalars['String']>;
  /** Determines if the field allows duplicate submissions. 1 to prevent users from submitting the same value more than once, 0 to allow duplicate values. */
  noDuplicates?: Maybe<Scalars['Boolean']>;
  /** Determines the size of the field when displayed on the page. */
  size?: Maybe<SizePropertyEnum>;
  /** The placement of the labels for the subfields within the group. This setting controls all of the subfields, they cannot be set individually. They may be aligned above or below the inputs. If this property is not set, the “Sub-Label Placement” setting on the Form Settings-&gt;Form Layout page is used. If no setting is specified, the default is above inputs. */
  subLabelPlacement?: Maybe<Scalars['String']>;
  /** Determines how the time is displayed. */
  timeFormat?: Maybe<TimeFieldFormatEnum>;
  /** Time field value. */
  timeValues?: Maybe<TimeValueProperty>;
  /** The type of field to be displayed. */
  type: Scalars['String'];
  /** Field visibility. */
  visibility?: Maybe<VisibilityPropertyEnum>;
};

/** How the time is displayed. */
export enum TimeFieldFormatEnum {
  /** 12-hour time format. */
  H12 = 'H12',
  /** 24-hour time format */
  H24 = 'H24',
}

/** Time field values. */
export type TimeFieldValue = {
  __typename?: 'TimeFieldValue';
  /** AM or PM. */
  amPm?: Maybe<Scalars['String']>;
  /** The full display value. Example: &quot;08:25 am&quot;. */
  displayValue?: Maybe<Scalars['String']>;
  /** The hours, in this format: hh. */
  hours?: Maybe<Scalars['String']>;
  /** The minutes, in this format: mm. */
  minutes?: Maybe<Scalars['String']>;
};

/** The individual properties for each element of the Time value field. */
export type TimeValueProperty = {
  __typename?: 'TimeValueProperty';
  /** AM or PM. */
  amPm?: Maybe<Scalars['String']>;
  /** The full display value. Example: &quot;08:25 am&quot;. */
  displayValue?: Maybe<Scalars['String']>;
  /** The hours, in this format: hh. */
  hours?: Maybe<Scalars['String']>;
  /** The minutes, in this format: mm. */
  minutes?: Maybe<Scalars['String']>;
};

/** Available timezones */
export enum TimezoneEnum {
  /** Abidjan */
  AfricaAbidjan = 'AFRICA_ABIDJAN',
  /** Accra */
  AfricaAccra = 'AFRICA_ACCRA',
  /** Addis Ababa */
  AfricaAddisAbaba = 'AFRICA_ADDIS_ABABA',
  /** Algiers */
  AfricaAlgiers = 'AFRICA_ALGIERS',
  /** Asmara */
  AfricaAsmara = 'AFRICA_ASMARA',
  /** Bamako */
  AfricaBamako = 'AFRICA_BAMAKO',
  /** Bangui */
  AfricaBangui = 'AFRICA_BANGUI',
  /** Banjul */
  AfricaBanjul = 'AFRICA_BANJUL',
  /** Bissau */
  AfricaBissau = 'AFRICA_BISSAU',
  /** Blantyre */
  AfricaBlantyre = 'AFRICA_BLANTYRE',
  /** Brazzaville */
  AfricaBrazzaville = 'AFRICA_BRAZZAVILLE',
  /** Bujumbura */
  AfricaBujumbura = 'AFRICA_BUJUMBURA',
  /** Cairo */
  AfricaCairo = 'AFRICA_CAIRO',
  /** Casablanca */
  AfricaCasablanca = 'AFRICA_CASABLANCA',
  /** Ceuta */
  AfricaCeuta = 'AFRICA_CEUTA',
  /** Conakry */
  AfricaConakry = 'AFRICA_CONAKRY',
  /** Dakar */
  AfricaDakar = 'AFRICA_DAKAR',
  /** Dar es Salaam */
  AfricaDarEsSalaam = 'AFRICA_DAR_ES_SALAAM',
  /** Djibouti */
  AfricaDjibouti = 'AFRICA_DJIBOUTI',
  /** Douala */
  AfricaDouala = 'AFRICA_DOUALA',
  /** El Aaiun */
  AfricaElAaiun = 'AFRICA_EL_AAIUN',
  /** Freetown */
  AfricaFreetown = 'AFRICA_FREETOWN',
  /** Gaborone */
  AfricaGaborone = 'AFRICA_GABORONE',
  /** Harare */
  AfricaHarare = 'AFRICA_HARARE',
  /** Johannesburg */
  AfricaJohannesburg = 'AFRICA_JOHANNESBURG',
  /** Juba */
  AfricaJuba = 'AFRICA_JUBA',
  /** Kampala */
  AfricaKampala = 'AFRICA_KAMPALA',
  /** Khartoum */
  AfricaKhartoum = 'AFRICA_KHARTOUM',
  /** Kigali */
  AfricaKigali = 'AFRICA_KIGALI',
  /** Kinshasa */
  AfricaKinshasa = 'AFRICA_KINSHASA',
  /** Lagos */
  AfricaLagos = 'AFRICA_LAGOS',
  /** Libreville */
  AfricaLibreville = 'AFRICA_LIBREVILLE',
  /** Lome */
  AfricaLome = 'AFRICA_LOME',
  /** Luanda */
  AfricaLuanda = 'AFRICA_LUANDA',
  /** Lubumbashi */
  AfricaLubumbashi = 'AFRICA_LUBUMBASHI',
  /** Lusaka */
  AfricaLusaka = 'AFRICA_LUSAKA',
  /** Malabo */
  AfricaMalabo = 'AFRICA_MALABO',
  /** Maputo */
  AfricaMaputo = 'AFRICA_MAPUTO',
  /** Maseru */
  AfricaMaseru = 'AFRICA_MASERU',
  /** Mbabane */
  AfricaMbabane = 'AFRICA_MBABANE',
  /** Mogadishu */
  AfricaMogadishu = 'AFRICA_MOGADISHU',
  /** Monrovia */
  AfricaMonrovia = 'AFRICA_MONROVIA',
  /** Nairobi */
  AfricaNairobi = 'AFRICA_NAIROBI',
  /** Ndjamena */
  AfricaNdjamena = 'AFRICA_NDJAMENA',
  /** Niamey */
  AfricaNiamey = 'AFRICA_NIAMEY',
  /** Nouakchott */
  AfricaNouakchott = 'AFRICA_NOUAKCHOTT',
  /** Ouagadougou */
  AfricaOuagadougou = 'AFRICA_OUAGADOUGOU',
  /** Porto-Novo */
  AfricaPortoNovo = 'AFRICA_PORTO_NOVO',
  /** Sao Tome */
  AfricaSaoTome = 'AFRICA_SAO_TOME',
  /** Tripoli */
  AfricaTripoli = 'AFRICA_TRIPOLI',
  /** Tunis */
  AfricaTunis = 'AFRICA_TUNIS',
  /** Windhoek */
  AfricaWindhoek = 'AFRICA_WINDHOEK',
  /** Adak */
  AmericaAdak = 'AMERICA_ADAK',
  /** Anchorage */
  AmericaAnchorage = 'AMERICA_ANCHORAGE',
  /** Anguilla */
  AmericaAnguilla = 'AMERICA_ANGUILLA',
  /** Antigua */
  AmericaAntigua = 'AMERICA_ANTIGUA',
  /** Araguaina */
  AmericaAraguaina = 'AMERICA_ARAGUAINA',
  /** Argentina - Buenos Aires */
  AmericaArgentinaBuenosAires = 'AMERICA_ARGENTINA_BUENOS_AIRES',
  /** Argentina - Catamarca */
  AmericaArgentinaCatamarca = 'AMERICA_ARGENTINA_CATAMARCA',
  /** Argentina - Cordoba */
  AmericaArgentinaCordoba = 'AMERICA_ARGENTINA_CORDOBA',
  /** Argentina - Jujuy */
  AmericaArgentinaJujuy = 'AMERICA_ARGENTINA_JUJUY',
  /** Argentina - La Rioja */
  AmericaArgentinaLaRioja = 'AMERICA_ARGENTINA_LA_RIOJA',
  /** Argentina - Mendoza */
  AmericaArgentinaMendoza = 'AMERICA_ARGENTINA_MENDOZA',
  /** Argentina - Rio Gallegos */
  AmericaArgentinaRioGallegos = 'AMERICA_ARGENTINA_RIO_GALLEGOS',
  /** Argentina - Salta */
  AmericaArgentinaSalta = 'AMERICA_ARGENTINA_SALTA',
  /** Argentina - San Juan */
  AmericaArgentinaSanJuan = 'AMERICA_ARGENTINA_SAN_JUAN',
  /** Argentina - San Luis */
  AmericaArgentinaSanLuis = 'AMERICA_ARGENTINA_SAN_LUIS',
  /** Argentina - Tucuman */
  AmericaArgentinaTucuman = 'AMERICA_ARGENTINA_TUCUMAN',
  /** Argentina - Ushuaia */
  AmericaArgentinaUshuaia = 'AMERICA_ARGENTINA_USHUAIA',
  /** Aruba */
  AmericaAruba = 'AMERICA_ARUBA',
  /** Asuncion */
  AmericaAsuncion = 'AMERICA_ASUNCION',
  /** Atikokan */
  AmericaAtikokan = 'AMERICA_ATIKOKAN',
  /** Bahia */
  AmericaBahia = 'AMERICA_BAHIA',
  /** Bahia Banderas */
  AmericaBahiaBanderas = 'AMERICA_BAHIA_BANDERAS',
  /** Barbados */
  AmericaBarbados = 'AMERICA_BARBADOS',
  /** Belem */
  AmericaBelem = 'AMERICA_BELEM',
  /** Belize */
  AmericaBelize = 'AMERICA_BELIZE',
  /** Blanc-Sablon */
  AmericaBlancSablon = 'AMERICA_BLANC_SABLON',
  /** Boa Vista */
  AmericaBoaVista = 'AMERICA_BOA_VISTA',
  /** Bogota */
  AmericaBogota = 'AMERICA_BOGOTA',
  /** Boise */
  AmericaBoise = 'AMERICA_BOISE',
  /** Cambridge Bay */
  AmericaCambridgeBay = 'AMERICA_CAMBRIDGE_BAY',
  /** Campo Grande */
  AmericaCampoGrande = 'AMERICA_CAMPO_GRANDE',
  /** Cancun */
  AmericaCancun = 'AMERICA_CANCUN',
  /** Caracas */
  AmericaCaracas = 'AMERICA_CARACAS',
  /** Cayenne */
  AmericaCayenne = 'AMERICA_CAYENNE',
  /** Cayman */
  AmericaCayman = 'AMERICA_CAYMAN',
  /** Chicago */
  AmericaChicago = 'AMERICA_CHICAGO',
  /** Chihuahua */
  AmericaChihuahua = 'AMERICA_CHIHUAHUA',
  /** Costa Rica */
  AmericaCostaRica = 'AMERICA_COSTA_RICA',
  /** Creston */
  AmericaCreston = 'AMERICA_CRESTON',
  /** Cuiaba */
  AmericaCuiaba = 'AMERICA_CUIABA',
  /** Curacao */
  AmericaCuracao = 'AMERICA_CURACAO',
  /** Danmarkshavn */
  AmericaDanmarkshavn = 'AMERICA_DANMARKSHAVN',
  /** Dawson */
  AmericaDawson = 'AMERICA_DAWSON',
  /** Dawson Creek */
  AmericaDawsonCreek = 'AMERICA_DAWSON_CREEK',
  /** Denver */
  AmericaDenver = 'AMERICA_DENVER',
  /** Detroit */
  AmericaDetroit = 'AMERICA_DETROIT',
  /** Dominica */
  AmericaDominica = 'AMERICA_DOMINICA',
  /** Edmonton */
  AmericaEdmonton = 'AMERICA_EDMONTON',
  /** Eirunepe */
  AmericaEirunepe = 'AMERICA_EIRUNEPE',
  /** El Salvador */
  AmericaElSalvador = 'AMERICA_EL_SALVADOR',
  /** Fortaleza */
  AmericaFortaleza = 'AMERICA_FORTALEZA',
  /** Fort Nelson */
  AmericaFortNelson = 'AMERICA_FORT_NELSON',
  /** Glace Bay */
  AmericaGlaceBay = 'AMERICA_GLACE_BAY',
  /** Goose Bay */
  AmericaGooseBay = 'AMERICA_GOOSE_BAY',
  /** Grand Turk */
  AmericaGrandTurk = 'AMERICA_GRAND_TURK',
  /** Grenada */
  AmericaGrenada = 'AMERICA_GRENADA',
  /** Guadeloupe */
  AmericaGuadeloupe = 'AMERICA_GUADELOUPE',
  /** Guatemala */
  AmericaGuatemala = 'AMERICA_GUATEMALA',
  /** Guayaquil */
  AmericaGuayaquil = 'AMERICA_GUAYAQUIL',
  /** Guyana */
  AmericaGuyana = 'AMERICA_GUYANA',
  /** Halifax */
  AmericaHalifax = 'AMERICA_HALIFAX',
  /** Havana */
  AmericaHavana = 'AMERICA_HAVANA',
  /** Hermosillo */
  AmericaHermosillo = 'AMERICA_HERMOSILLO',
  /** Indiana - Indianapolis */
  AmericaIndianaIndianapolis = 'AMERICA_INDIANA_INDIANAPOLIS',
  /** Indiana - Knox */
  AmericaIndianaKnox = 'AMERICA_INDIANA_KNOX',
  /** Indiana - Marengo */
  AmericaIndianaMarengo = 'AMERICA_INDIANA_MARENGO',
  /** Indiana - Petersburg */
  AmericaIndianaPetersburg = 'AMERICA_INDIANA_PETERSBURG',
  /** Indiana - Tell City */
  AmericaIndianaTellCity = 'AMERICA_INDIANA_TELL_CITY',
  /** Indiana - Vevay */
  AmericaIndianaVevay = 'AMERICA_INDIANA_VEVAY',
  /** Indiana - Vincennes */
  AmericaIndianaVincennes = 'AMERICA_INDIANA_VINCENNES',
  /** Indiana - Winamac */
  AmericaIndianaWinamac = 'AMERICA_INDIANA_WINAMAC',
  /** Inuvik */
  AmericaInuvik = 'AMERICA_INUVIK',
  /** Iqaluit */
  AmericaIqaluit = 'AMERICA_IQALUIT',
  /** Jamaica */
  AmericaJamaica = 'AMERICA_JAMAICA',
  /** Juneau */
  AmericaJuneau = 'AMERICA_JUNEAU',
  /** Kentucky - Louisville */
  AmericaKentuckyLouisville = 'AMERICA_KENTUCKY_LOUISVILLE',
  /** Kentucky - Monticello */
  AmericaKentuckyMonticello = 'AMERICA_KENTUCKY_MONTICELLO',
  /** Kralendijk */
  AmericaKralendijk = 'AMERICA_KRALENDIJK',
  /** La Paz */
  AmericaLaPaz = 'AMERICA_LA_PAZ',
  /** Lima */
  AmericaLima = 'AMERICA_LIMA',
  /** Los Angeles */
  AmericaLosAngeles = 'AMERICA_LOS_ANGELES',
  /** Lower Princes */
  AmericaLowerPrinces = 'AMERICA_LOWER_PRINCES',
  /** Maceio */
  AmericaMaceio = 'AMERICA_MACEIO',
  /** Managua */
  AmericaManagua = 'AMERICA_MANAGUA',
  /** Manaus */
  AmericaManaus = 'AMERICA_MANAUS',
  /** Marigot */
  AmericaMarigot = 'AMERICA_MARIGOT',
  /** Martinique */
  AmericaMartinique = 'AMERICA_MARTINIQUE',
  /** Matamoros */
  AmericaMatamoros = 'AMERICA_MATAMOROS',
  /** Mazatlan */
  AmericaMazatlan = 'AMERICA_MAZATLAN',
  /** Menominee */
  AmericaMenominee = 'AMERICA_MENOMINEE',
  /** Merida */
  AmericaMerida = 'AMERICA_MERIDA',
  /** Metlakatla */
  AmericaMetlakatla = 'AMERICA_METLAKATLA',
  /** Mexico City */
  AmericaMexicoCity = 'AMERICA_MEXICO_CITY',
  /** Miquelon */
  AmericaMiquelon = 'AMERICA_MIQUELON',
  /** Moncton */
  AmericaMoncton = 'AMERICA_MONCTON',
  /** Monterrey */
  AmericaMonterrey = 'AMERICA_MONTERREY',
  /** Montevideo */
  AmericaMontevideo = 'AMERICA_MONTEVIDEO',
  /** Montserrat */
  AmericaMontserrat = 'AMERICA_MONTSERRAT',
  /** Nassau */
  AmericaNassau = 'AMERICA_NASSAU',
  /** New York */
  AmericaNewYork = 'AMERICA_NEW_YORK',
  /** Nipigon */
  AmericaNipigon = 'AMERICA_NIPIGON',
  /** Nome */
  AmericaNome = 'AMERICA_NOME',
  /** Noronha */
  AmericaNoronha = 'AMERICA_NORONHA',
  /** North Dakota - Beulah */
  AmericaNorthDakotaBeulah = 'AMERICA_NORTH_DAKOTA_BEULAH',
  /** North Dakota - Center */
  AmericaNorthDakotaCenter = 'AMERICA_NORTH_DAKOTA_CENTER',
  /** North Dakota - New Salem */
  AmericaNorthDakotaNewSalem = 'AMERICA_NORTH_DAKOTA_NEW_SALEM',
  /** Nuuk */
  AmericaNuuk = 'AMERICA_NUUK',
  /** Ojinaga */
  AmericaOjinaga = 'AMERICA_OJINAGA',
  /** Panama */
  AmericaPanama = 'AMERICA_PANAMA',
  /** Pangnirtung */
  AmericaPangnirtung = 'AMERICA_PANGNIRTUNG',
  /** Paramaribo */
  AmericaParamaribo = 'AMERICA_PARAMARIBO',
  /** Phoenix */
  AmericaPhoenix = 'AMERICA_PHOENIX',
  /** Porto Velho */
  AmericaPortoVelho = 'AMERICA_PORTO_VELHO',
  /** Port-au-Prince */
  AmericaPortAuPrince = 'AMERICA_PORT_AU_PRINCE',
  /** Port of Spain */
  AmericaPortOfSpain = 'AMERICA_PORT_OF_SPAIN',
  /** Puerto Rico */
  AmericaPuertoRico = 'AMERICA_PUERTO_RICO',
  /** Punta Arenas */
  AmericaPuntaArenas = 'AMERICA_PUNTA_ARENAS',
  /** Rainy River */
  AmericaRainyRiver = 'AMERICA_RAINY_RIVER',
  /** Rankin Inlet */
  AmericaRankinInlet = 'AMERICA_RANKIN_INLET',
  /** Recife */
  AmericaRecife = 'AMERICA_RECIFE',
  /** Regina */
  AmericaRegina = 'AMERICA_REGINA',
  /** Resolute */
  AmericaResolute = 'AMERICA_RESOLUTE',
  /** Rio Branco */
  AmericaRioBranco = 'AMERICA_RIO_BRANCO',
  /** Santarem */
  AmericaSantarem = 'AMERICA_SANTAREM',
  /** Santiago */
  AmericaSantiago = 'AMERICA_SANTIAGO',
  /** Santo Domingo */
  AmericaSantoDomingo = 'AMERICA_SANTO_DOMINGO',
  /** Sao Paulo */
  AmericaSaoPaulo = 'AMERICA_SAO_PAULO',
  /** Scoresbysund */
  AmericaScoresbysund = 'AMERICA_SCORESBYSUND',
  /** Sitka */
  AmericaSitka = 'AMERICA_SITKA',
  /** St Barthelemy */
  AmericaStBarthelemy = 'AMERICA_ST_BARTHELEMY',
  /** St Johns */
  AmericaStJohns = 'AMERICA_ST_JOHNS',
  /** St Kitts */
  AmericaStKitts = 'AMERICA_ST_KITTS',
  /** St Lucia */
  AmericaStLucia = 'AMERICA_ST_LUCIA',
  /** St Thomas */
  AmericaStThomas = 'AMERICA_ST_THOMAS',
  /** St Vincent */
  AmericaStVincent = 'AMERICA_ST_VINCENT',
  /** Swift Current */
  AmericaSwiftCurrent = 'AMERICA_SWIFT_CURRENT',
  /** Tegucigalpa */
  AmericaTegucigalpa = 'AMERICA_TEGUCIGALPA',
  /** Thule */
  AmericaThule = 'AMERICA_THULE',
  /** Thunder Bay */
  AmericaThunderBay = 'AMERICA_THUNDER_BAY',
  /** Tijuana */
  AmericaTijuana = 'AMERICA_TIJUANA',
  /** Toronto */
  AmericaToronto = 'AMERICA_TORONTO',
  /** Tortola */
  AmericaTortola = 'AMERICA_TORTOLA',
  /** Vancouver */
  AmericaVancouver = 'AMERICA_VANCOUVER',
  /** Whitehorse */
  AmericaWhitehorse = 'AMERICA_WHITEHORSE',
  /** Winnipeg */
  AmericaWinnipeg = 'AMERICA_WINNIPEG',
  /** Yakutat */
  AmericaYakutat = 'AMERICA_YAKUTAT',
  /** Yellowknife */
  AmericaYellowknife = 'AMERICA_YELLOWKNIFE',
  /** Casey */
  AntarcticaCasey = 'ANTARCTICA_CASEY',
  /** Davis */
  AntarcticaDavis = 'ANTARCTICA_DAVIS',
  /** DumontDUrville */
  AntarcticaDumontdurville = 'ANTARCTICA_DUMONTDURVILLE',
  /** Macquarie */
  AntarcticaMacquarie = 'ANTARCTICA_MACQUARIE',
  /** Mawson */
  AntarcticaMawson = 'ANTARCTICA_MAWSON',
  /** McMurdo */
  AntarcticaMcmurdo = 'ANTARCTICA_MCMURDO',
  /** Palmer */
  AntarcticaPalmer = 'ANTARCTICA_PALMER',
  /** Rothera */
  AntarcticaRothera = 'ANTARCTICA_ROTHERA',
  /** Syowa */
  AntarcticaSyowa = 'ANTARCTICA_SYOWA',
  /** Troll */
  AntarcticaTroll = 'ANTARCTICA_TROLL',
  /** Vostok */
  AntarcticaVostok = 'ANTARCTICA_VOSTOK',
  /** Longyearbyen */
  ArcticLongyearbyen = 'ARCTIC_LONGYEARBYEN',
  /** Aden */
  AsiaAden = 'ASIA_ADEN',
  /** Almaty */
  AsiaAlmaty = 'ASIA_ALMATY',
  /** Amman */
  AsiaAmman = 'ASIA_AMMAN',
  /** Anadyr */
  AsiaAnadyr = 'ASIA_ANADYR',
  /** Aqtau */
  AsiaAqtau = 'ASIA_AQTAU',
  /** Aqtobe */
  AsiaAqtobe = 'ASIA_AQTOBE',
  /** Ashgabat */
  AsiaAshgabat = 'ASIA_ASHGABAT',
  /** Atyrau */
  AsiaAtyrau = 'ASIA_ATYRAU',
  /** Baghdad */
  AsiaBaghdad = 'ASIA_BAGHDAD',
  /** Bahrain */
  AsiaBahrain = 'ASIA_BAHRAIN',
  /** Baku */
  AsiaBaku = 'ASIA_BAKU',
  /** Bangkok */
  AsiaBangkok = 'ASIA_BANGKOK',
  /** Barnaul */
  AsiaBarnaul = 'ASIA_BARNAUL',
  /** Beirut */
  AsiaBeirut = 'ASIA_BEIRUT',
  /** Bishkek */
  AsiaBishkek = 'ASIA_BISHKEK',
  /** Brunei */
  AsiaBrunei = 'ASIA_BRUNEI',
  /** Chita */
  AsiaChita = 'ASIA_CHITA',
  /** Choibalsan */
  AsiaChoibalsan = 'ASIA_CHOIBALSAN',
  /** Colombo */
  AsiaColombo = 'ASIA_COLOMBO',
  /** Damascus */
  AsiaDamascus = 'ASIA_DAMASCUS',
  /** Dhaka */
  AsiaDhaka = 'ASIA_DHAKA',
  /** Dili */
  AsiaDili = 'ASIA_DILI',
  /** Dubai */
  AsiaDubai = 'ASIA_DUBAI',
  /** Dushanbe */
  AsiaDushanbe = 'ASIA_DUSHANBE',
  /** Famagusta */
  AsiaFamagusta = 'ASIA_FAMAGUSTA',
  /** Gaza */
  AsiaGaza = 'ASIA_GAZA',
  /** Hebron */
  AsiaHebron = 'ASIA_HEBRON',
  /** Hong Kong */
  AsiaHongKong = 'ASIA_HONG_KONG',
  /** Hovd */
  AsiaHovd = 'ASIA_HOVD',
  /** Ho Chi Minh */
  AsiaHoChiMinh = 'ASIA_HO_CHI_MINH',
  /** Irkutsk */
  AsiaIrkutsk = 'ASIA_IRKUTSK',
  /** Jakarta */
  AsiaJakarta = 'ASIA_JAKARTA',
  /** Jayapura */
  AsiaJayapura = 'ASIA_JAYAPURA',
  /** Jerusalem */
  AsiaJerusalem = 'ASIA_JERUSALEM',
  /** Kabul */
  AsiaKabul = 'ASIA_KABUL',
  /** Kamchatka */
  AsiaKamchatka = 'ASIA_KAMCHATKA',
  /** Karachi */
  AsiaKarachi = 'ASIA_KARACHI',
  /** Kathmandu */
  AsiaKathmandu = 'ASIA_KATHMANDU',
  /** Khandyga */
  AsiaKhandyga = 'ASIA_KHANDYGA',
  /** Kolkata */
  AsiaKolkata = 'ASIA_KOLKATA',
  /** Krasnoyarsk */
  AsiaKrasnoyarsk = 'ASIA_KRASNOYARSK',
  /** Kuala Lumpur */
  AsiaKualaLumpur = 'ASIA_KUALA_LUMPUR',
  /** Kuching */
  AsiaKuching = 'ASIA_KUCHING',
  /** Kuwait */
  AsiaKuwait = 'ASIA_KUWAIT',
  /** Macau */
  AsiaMacau = 'ASIA_MACAU',
  /** Magadan */
  AsiaMagadan = 'ASIA_MAGADAN',
  /** Makassar */
  AsiaMakassar = 'ASIA_MAKASSAR',
  /** Manila */
  AsiaManila = 'ASIA_MANILA',
  /** Muscat */
  AsiaMuscat = 'ASIA_MUSCAT',
  /** Nicosia */
  AsiaNicosia = 'ASIA_NICOSIA',
  /** Novokuznetsk */
  AsiaNovokuznetsk = 'ASIA_NOVOKUZNETSK',
  /** Novosibirsk */
  AsiaNovosibirsk = 'ASIA_NOVOSIBIRSK',
  /** Omsk */
  AsiaOmsk = 'ASIA_OMSK',
  /** Oral */
  AsiaOral = 'ASIA_ORAL',
  /** Phnom Penh */
  AsiaPhnomPenh = 'ASIA_PHNOM_PENH',
  /** Pontianak */
  AsiaPontianak = 'ASIA_PONTIANAK',
  /** Pyongyang */
  AsiaPyongyang = 'ASIA_PYONGYANG',
  /** Qatar */
  AsiaQatar = 'ASIA_QATAR',
  /** Qostanay */
  AsiaQostanay = 'ASIA_QOSTANAY',
  /** Qyzylorda */
  AsiaQyzylorda = 'ASIA_QYZYLORDA',
  /** Riyadh */
  AsiaRiyadh = 'ASIA_RIYADH',
  /** Sakhalin */
  AsiaSakhalin = 'ASIA_SAKHALIN',
  /** Samarkand */
  AsiaSamarkand = 'ASIA_SAMARKAND',
  /** Seoul */
  AsiaSeoul = 'ASIA_SEOUL',
  /** Shanghai */
  AsiaShanghai = 'ASIA_SHANGHAI',
  /** Singapore */
  AsiaSingapore = 'ASIA_SINGAPORE',
  /** Srednekolymsk */
  AsiaSrednekolymsk = 'ASIA_SREDNEKOLYMSK',
  /** Taipei */
  AsiaTaipei = 'ASIA_TAIPEI',
  /** Tashkent */
  AsiaTashkent = 'ASIA_TASHKENT',
  /** Tbilisi */
  AsiaTbilisi = 'ASIA_TBILISI',
  /** Tehran */
  AsiaTehran = 'ASIA_TEHRAN',
  /** Thimphu */
  AsiaThimphu = 'ASIA_THIMPHU',
  /** Tokyo */
  AsiaTokyo = 'ASIA_TOKYO',
  /** Tomsk */
  AsiaTomsk = 'ASIA_TOMSK',
  /** Ulaanbaatar */
  AsiaUlaanbaatar = 'ASIA_ULAANBAATAR',
  /** Urumqi */
  AsiaUrumqi = 'ASIA_URUMQI',
  /** Ust-Nera */
  AsiaUstNera = 'ASIA_UST_NERA',
  /** Vientiane */
  AsiaVientiane = 'ASIA_VIENTIANE',
  /** Vladivostok */
  AsiaVladivostok = 'ASIA_VLADIVOSTOK',
  /** Yakutsk */
  AsiaYakutsk = 'ASIA_YAKUTSK',
  /** Yangon */
  AsiaYangon = 'ASIA_YANGON',
  /** Yekaterinburg */
  AsiaYekaterinburg = 'ASIA_YEKATERINBURG',
  /** Yerevan */
  AsiaYerevan = 'ASIA_YEREVAN',
  /** Azores */
  AtlanticAzores = 'ATLANTIC_AZORES',
  /** Bermuda */
  AtlanticBermuda = 'ATLANTIC_BERMUDA',
  /** Canary */
  AtlanticCanary = 'ATLANTIC_CANARY',
  /** Cape Verde */
  AtlanticCapeVerde = 'ATLANTIC_CAPE_VERDE',
  /** Faroe */
  AtlanticFaroe = 'ATLANTIC_FAROE',
  /** Madeira */
  AtlanticMadeira = 'ATLANTIC_MADEIRA',
  /** Reykjavik */
  AtlanticReykjavik = 'ATLANTIC_REYKJAVIK',
  /** South Georgia */
  AtlanticSouthGeorgia = 'ATLANTIC_SOUTH_GEORGIA',
  /** Stanley */
  AtlanticStanley = 'ATLANTIC_STANLEY',
  /** St Helena */
  AtlanticStHelena = 'ATLANTIC_ST_HELENA',
  /** Adelaide */
  AustraliaAdelaide = 'AUSTRALIA_ADELAIDE',
  /** Brisbane */
  AustraliaBrisbane = 'AUSTRALIA_BRISBANE',
  /** Broken Hill */
  AustraliaBrokenHill = 'AUSTRALIA_BROKEN_HILL',
  /** Currie */
  AustraliaCurrie = 'AUSTRALIA_CURRIE',
  /** Darwin */
  AustraliaDarwin = 'AUSTRALIA_DARWIN',
  /** Eucla */
  AustraliaEucla = 'AUSTRALIA_EUCLA',
  /** Hobart */
  AustraliaHobart = 'AUSTRALIA_HOBART',
  /** Lindeman */
  AustraliaLindeman = 'AUSTRALIA_LINDEMAN',
  /** Lord Howe */
  AustraliaLordHowe = 'AUSTRALIA_LORD_HOWE',
  /** Melbourne */
  AustraliaMelbourne = 'AUSTRALIA_MELBOURNE',
  /** Perth */
  AustraliaPerth = 'AUSTRALIA_PERTH',
  /** Sydney */
  AustraliaSydney = 'AUSTRALIA_SYDNEY',
  /** Amsterdam */
  EuropeAmsterdam = 'EUROPE_AMSTERDAM',
  /** Andorra */
  EuropeAndorra = 'EUROPE_ANDORRA',
  /** Astrakhan */
  EuropeAstrakhan = 'EUROPE_ASTRAKHAN',
  /** Athens */
  EuropeAthens = 'EUROPE_ATHENS',
  /** Belgrade */
  EuropeBelgrade = 'EUROPE_BELGRADE',
  /** Berlin */
  EuropeBerlin = 'EUROPE_BERLIN',
  /** Bratislava */
  EuropeBratislava = 'EUROPE_BRATISLAVA',
  /** Brussels */
  EuropeBrussels = 'EUROPE_BRUSSELS',
  /** Bucharest */
  EuropeBucharest = 'EUROPE_BUCHAREST',
  /** Budapest */
  EuropeBudapest = 'EUROPE_BUDAPEST',
  /** Busingen */
  EuropeBusingen = 'EUROPE_BUSINGEN',
  /** Chisinau */
  EuropeChisinau = 'EUROPE_CHISINAU',
  /** Copenhagen */
  EuropeCopenhagen = 'EUROPE_COPENHAGEN',
  /** Dublin */
  EuropeDublin = 'EUROPE_DUBLIN',
  /** Gibraltar */
  EuropeGibraltar = 'EUROPE_GIBRALTAR',
  /** Guernsey */
  EuropeGuernsey = 'EUROPE_GUERNSEY',
  /** Helsinki */
  EuropeHelsinki = 'EUROPE_HELSINKI',
  /** Isle of Man */
  EuropeIsleOfMan = 'EUROPE_ISLE_OF_MAN',
  /** Istanbul */
  EuropeIstanbul = 'EUROPE_ISTANBUL',
  /** Jersey */
  EuropeJersey = 'EUROPE_JERSEY',
  /** Kaliningrad */
  EuropeKaliningrad = 'EUROPE_KALININGRAD',
  /** Kiev */
  EuropeKiev = 'EUROPE_KIEV',
  /** Kirov */
  EuropeKirov = 'EUROPE_KIROV',
  /** Lisbon */
  EuropeLisbon = 'EUROPE_LISBON',
  /** Ljubljana */
  EuropeLjubljana = 'EUROPE_LJUBLJANA',
  /** London */
  EuropeLondon = 'EUROPE_LONDON',
  /** Luxembourg */
  EuropeLuxembourg = 'EUROPE_LUXEMBOURG',
  /** Madrid */
  EuropeMadrid = 'EUROPE_MADRID',
  /** Malta */
  EuropeMalta = 'EUROPE_MALTA',
  /** Mariehamn */
  EuropeMariehamn = 'EUROPE_MARIEHAMN',
  /** Minsk */
  EuropeMinsk = 'EUROPE_MINSK',
  /** Monaco */
  EuropeMonaco = 'EUROPE_MONACO',
  /** Moscow */
  EuropeMoscow = 'EUROPE_MOSCOW',
  /** Oslo */
  EuropeOslo = 'EUROPE_OSLO',
  /** Paris */
  EuropeParis = 'EUROPE_PARIS',
  /** Podgorica */
  EuropePodgorica = 'EUROPE_PODGORICA',
  /** Prague */
  EuropePrague = 'EUROPE_PRAGUE',
  /** Riga */
  EuropeRiga = 'EUROPE_RIGA',
  /** Rome */
  EuropeRome = 'EUROPE_ROME',
  /** Samara */
  EuropeSamara = 'EUROPE_SAMARA',
  /** San Marino */
  EuropeSanMarino = 'EUROPE_SAN_MARINO',
  /** Sarajevo */
  EuropeSarajevo = 'EUROPE_SARAJEVO',
  /** Saratov */
  EuropeSaratov = 'EUROPE_SARATOV',
  /** Simferopol */
  EuropeSimferopol = 'EUROPE_SIMFEROPOL',
  /** Skopje */
  EuropeSkopje = 'EUROPE_SKOPJE',
  /** Sofia */
  EuropeSofia = 'EUROPE_SOFIA',
  /** Stockholm */
  EuropeStockholm = 'EUROPE_STOCKHOLM',
  /** Tallinn */
  EuropeTallinn = 'EUROPE_TALLINN',
  /** Tirane */
  EuropeTirane = 'EUROPE_TIRANE',
  /** Ulyanovsk */
  EuropeUlyanovsk = 'EUROPE_ULYANOVSK',
  /** Uzhgorod */
  EuropeUzhgorod = 'EUROPE_UZHGOROD',
  /** Vaduz */
  EuropeVaduz = 'EUROPE_VADUZ',
  /** Vatican */
  EuropeVatican = 'EUROPE_VATICAN',
  /** Vienna */
  EuropeVienna = 'EUROPE_VIENNA',
  /** Vilnius */
  EuropeVilnius = 'EUROPE_VILNIUS',
  /** Volgograd */
  EuropeVolgograd = 'EUROPE_VOLGOGRAD',
  /** Warsaw */
  EuropeWarsaw = 'EUROPE_WARSAW',
  /** Zagreb */
  EuropeZagreb = 'EUROPE_ZAGREB',
  /** Zaporozhye */
  EuropeZaporozhye = 'EUROPE_ZAPOROZHYE',
  /** Zurich */
  EuropeZurich = 'EUROPE_ZURICH',
  /** Antananarivo */
  IndianAntananarivo = 'INDIAN_ANTANANARIVO',
  /** Chagos */
  IndianChagos = 'INDIAN_CHAGOS',
  /** Christmas */
  IndianChristmas = 'INDIAN_CHRISTMAS',
  /** Cocos */
  IndianCocos = 'INDIAN_COCOS',
  /** Comoro */
  IndianComoro = 'INDIAN_COMORO',
  /** Kerguelen */
  IndianKerguelen = 'INDIAN_KERGUELEN',
  /** Mahe */
  IndianMahe = 'INDIAN_MAHE',
  /** Maldives */
  IndianMaldives = 'INDIAN_MALDIVES',
  /** Mauritius */
  IndianMauritius = 'INDIAN_MAURITIUS',
  /** Mayotte */
  IndianMayotte = 'INDIAN_MAYOTTE',
  /** Reunion */
  IndianReunion = 'INDIAN_REUNION',
  /** Apia */
  PacificApia = 'PACIFIC_APIA',
  /** Auckland */
  PacificAuckland = 'PACIFIC_AUCKLAND',
  /** Bougainville */
  PacificBougainville = 'PACIFIC_BOUGAINVILLE',
  /** Chatham */
  PacificChatham = 'PACIFIC_CHATHAM',
  /** Chuuk */
  PacificChuuk = 'PACIFIC_CHUUK',
  /** Easter */
  PacificEaster = 'PACIFIC_EASTER',
  /** Efate */
  PacificEfate = 'PACIFIC_EFATE',
  /** Enderbury */
  PacificEnderbury = 'PACIFIC_ENDERBURY',
  /** Fakaofo */
  PacificFakaofo = 'PACIFIC_FAKAOFO',
  /** Fiji */
  PacificFiji = 'PACIFIC_FIJI',
  /** Funafuti */
  PacificFunafuti = 'PACIFIC_FUNAFUTI',
  /** Galapagos */
  PacificGalapagos = 'PACIFIC_GALAPAGOS',
  /** Gambier */
  PacificGambier = 'PACIFIC_GAMBIER',
  /** Guadalcanal */
  PacificGuadalcanal = 'PACIFIC_GUADALCANAL',
  /** Guam */
  PacificGuam = 'PACIFIC_GUAM',
  /** Honolulu */
  PacificHonolulu = 'PACIFIC_HONOLULU',
  /** Kiritimati */
  PacificKiritimati = 'PACIFIC_KIRITIMATI',
  /** Kosrae */
  PacificKosrae = 'PACIFIC_KOSRAE',
  /** Kwajalein */
  PacificKwajalein = 'PACIFIC_KWAJALEIN',
  /** Majuro */
  PacificMajuro = 'PACIFIC_MAJURO',
  /** Marquesas */
  PacificMarquesas = 'PACIFIC_MARQUESAS',
  /** Midway */
  PacificMidway = 'PACIFIC_MIDWAY',
  /** Nauru */
  PacificNauru = 'PACIFIC_NAURU',
  /** Niue */
  PacificNiue = 'PACIFIC_NIUE',
  /** Norfolk */
  PacificNorfolk = 'PACIFIC_NORFOLK',
  /** Noumea */
  PacificNoumea = 'PACIFIC_NOUMEA',
  /** Pago Pago */
  PacificPagoPago = 'PACIFIC_PAGO_PAGO',
  /** Palau */
  PacificPalau = 'PACIFIC_PALAU',
  /** Pitcairn */
  PacificPitcairn = 'PACIFIC_PITCAIRN',
  /** Pohnpei */
  PacificPohnpei = 'PACIFIC_POHNPEI',
  /** Port Moresby */
  PacificPortMoresby = 'PACIFIC_PORT_MORESBY',
  /** Rarotonga */
  PacificRarotonga = 'PACIFIC_RAROTONGA',
  /** Saipan */
  PacificSaipan = 'PACIFIC_SAIPAN',
  /** Tahiti */
  PacificTahiti = 'PACIFIC_TAHITI',
  /** Tarawa */
  PacificTarawa = 'PACIFIC_TARAWA',
  /** Tongatapu */
  PacificTongatapu = 'PACIFIC_TONGATAPU',
  /** Wake */
  PacificWake = 'PACIFIC_WAKE',
  /** Wallis */
  PacificWallis = 'PACIFIC_WALLIS',
  /** UTC offset: UTC+0 */
  Utc_0 = 'UTC_0',
  /** UTC offset: UTC+0:30 */
  Utc_0_30 = 'UTC_0_30',
  /** UTC offset: UTC+1 */
  Utc_1 = 'UTC_1',
  /** UTC offset: UTC+10 */
  Utc_10 = 'UTC_10',
  /** UTC offset: UTC+10:30 */
  Utc_10_30 = 'UTC_10_30',
  /** UTC offset: UTC+11 */
  Utc_11 = 'UTC_11',
  /** UTC offset: UTC+11:30 */
  Utc_11_30 = 'UTC_11_30',
  /** UTC offset: UTC+12 */
  Utc_12 = 'UTC_12',
  /** UTC offset: UTC+12:45 */
  Utc_12_45 = 'UTC_12_45',
  /** UTC offset: UTC+13 */
  Utc_13 = 'UTC_13',
  /** UTC offset: UTC+13:45 */
  Utc_13_45 = 'UTC_13_45',
  /** UTC offset: UTC+14 */
  Utc_14 = 'UTC_14',
  /** UTC offset: UTC+1:30 */
  Utc_1_30 = 'UTC_1_30',
  /** UTC offset: UTC+2 */
  Utc_2 = 'UTC_2',
  /** UTC offset: UTC+2:30 */
  Utc_2_30 = 'UTC_2_30',
  /** UTC offset: UTC+3 */
  Utc_3 = 'UTC_3',
  /** UTC offset: UTC+3:30 */
  Utc_3_30 = 'UTC_3_30',
  /** UTC offset: UTC+4 */
  Utc_4 = 'UTC_4',
  /** UTC offset: UTC+4:30 */
  Utc_4_30 = 'UTC_4_30',
  /** UTC offset: UTC+5 */
  Utc_5 = 'UTC_5',
  /** UTC offset: UTC+5:30 */
  Utc_5_30 = 'UTC_5_30',
  /** UTC offset: UTC+5:45 */
  Utc_5_45 = 'UTC_5_45',
  /** UTC offset: UTC+6 */
  Utc_6 = 'UTC_6',
  /** UTC offset: UTC+6:30 */
  Utc_6_30 = 'UTC_6_30',
  /** UTC offset: UTC+7 */
  Utc_7 = 'UTC_7',
  /** UTC offset: UTC+7:30 */
  Utc_7_30 = 'UTC_7_30',
  /** UTC offset: UTC+8 */
  Utc_8 = 'UTC_8',
  /** UTC offset: UTC+8:30 */
  Utc_8_30 = 'UTC_8_30',
  /** UTC offset: UTC+8:45 */
  Utc_8_45 = 'UTC_8_45',
  /** UTC offset: UTC+9 */
  Utc_9 = 'UTC_9',
  /** UTC offset: UTC+9:30 */
  Utc_9_30 = 'UTC_9_30',
}

/** Any node that has a URI */
export type UniformResourceIdentifiable = {
  /** The unique resource identifier path */
  id: Scalars['ID'];
  /** The unique resource identifier path */
  uri?: Maybe<Scalars['String']>;
};

/** Input for the UpdateCategory mutation */
export type UpdateCategoryInput = {
  /** The slug that the category will be an alias of */
  aliasOf?: Maybe<Scalars['String']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The description of the category object */
  description?: Maybe<Scalars['String']>;
  /** The ID of the category object to update */
  id: Scalars['ID'];
  /** The name of the category object to mutate */
  name?: Maybe<Scalars['String']>;
  /** The ID of the category that should be set as the parent */
  parentId?: Maybe<Scalars['ID']>;
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: Maybe<Scalars['String']>;
};

/** The payload for the UpdateCategory mutation */
export type UpdateCategoryPayload = {
  __typename?: 'UpdateCategoryPayload';
  /** The created category */
  category?: Maybe<Category>;
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Input for the updateComment mutation */
export type UpdateCommentInput = {
  /** The approval status of the comment. */
  approved?: Maybe<Scalars['String']>;
  /** The name of the comment's author. */
  author?: Maybe<Scalars['String']>;
  /** The email of the comment's author. */
  authorEmail?: Maybe<Scalars['String']>;
  /** The url of the comment's author. */
  authorUrl?: Maybe<Scalars['String']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The ID of the post object the comment belongs to. */
  commentOn?: Maybe<Scalars['Int']>;
  /** Content of the comment. */
  content?: Maybe<Scalars['String']>;
  /** The date of the object. Preferable to enter as year/month/day ( e.g. 01/31/2017 ) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: Maybe<Scalars['String']>;
  /** The ID of the comment being updated. */
  id: Scalars['ID'];
  /** Parent comment of current comment. */
  parent?: Maybe<Scalars['ID']>;
  /** Type of comment. */
  type?: Maybe<Scalars['String']>;
};

/** The payload for the updateComment mutation */
export type UpdateCommentPayload = {
  __typename?: 'UpdateCommentPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The comment that was created */
  comment?: Maybe<Comment>;
  /** Whether the mutation succeeded. If the comment is not approved, the server will not return the comment to a non authenticated user, but a success message can be returned if the create succeeded, and the client can optimistically add the comment to the client cache */
  success?: Maybe<Scalars['Boolean']>;
};

/** Input for the updateDraftEntryAddressFieldValue mutation */
export type UpdateDraftEntryAddressFieldValueInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Field ID. */
  fieldId?: Maybe<Scalars['Int']>;
  /** Draft resume token. */
  resumeToken?: Maybe<Scalars['String']>;
  /** The form field value. */
  value?: Maybe<AddressInput>;
};

/** The payload for the updateDraftEntryAddressFieldValue mutation */
export type UpdateDraftEntryAddressFieldValuePayload = {
  __typename?: 'UpdateDraftEntryAddressFieldValuePayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The draft entry after the update mutation has been applied. If a validation error occurred, the draft entry will NOT have been updated with the invalid value provided. */
  entry?: Maybe<GravityFormsEntry>;
  /** Field errors. */
  errors?: Maybe<Array<Maybe<FieldError>>>;
  /** Draft entry resume token. */
  resumeToken: Scalars['String'];
};

/** Input for the updateDraftEntryChainedSelectFieldValue mutation */
export type UpdateDraftEntryChainedSelectFieldValueInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Field ID. */
  fieldId?: Maybe<Scalars['Int']>;
  /** Draft resume token. */
  resumeToken?: Maybe<Scalars['String']>;
  /** ChainedSelect input values. */
  value?: Maybe<Array<Maybe<ChainedSelectInput>>>;
};

/** The payload for the updateDraftEntryChainedSelectFieldValue mutation */
export type UpdateDraftEntryChainedSelectFieldValuePayload = {
  __typename?: 'UpdateDraftEntryChainedSelectFieldValuePayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The draft entry after the update mutation has been applied. If a validation error occurred, the draft entry will NOT have been updated with the invalid value provided. */
  entry?: Maybe<GravityFormsEntry>;
  /** Field errors. */
  errors?: Maybe<Array<Maybe<FieldError>>>;
  /** Draft entry resume token. */
  resumeToken: Scalars['String'];
};

/** Input for the updateDraftEntryCheckboxFieldValue mutation */
export type UpdateDraftEntryCheckboxFieldValueInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Field ID. */
  fieldId?: Maybe<Scalars['Int']>;
  /** Draft resume token. */
  resumeToken?: Maybe<Scalars['String']>;
  /** Checkbox input values. */
  value?: Maybe<Array<Maybe<CheckboxInput>>>;
};

/** The payload for the updateDraftEntryCheckboxFieldValue mutation */
export type UpdateDraftEntryCheckboxFieldValuePayload = {
  __typename?: 'UpdateDraftEntryCheckboxFieldValuePayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The draft entry after the update mutation has been applied. If a validation error occurred, the draft entry will NOT have been updated with the invalid value provided. */
  entry?: Maybe<GravityFormsEntry>;
  /** Field errors. */
  errors?: Maybe<Array<Maybe<FieldError>>>;
  /** Draft entry resume token. */
  resumeToken: Scalars['String'];
};

/** Input for the updateDraftEntryConsentFieldValue mutation */
export type UpdateDraftEntryConsentFieldValueInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Field ID. */
  fieldId?: Maybe<Scalars['Int']>;
  /** Draft resume token. */
  resumeToken?: Maybe<Scalars['String']>;
  /** Consent input values. */
  value?: Maybe<Scalars['Boolean']>;
};

/** The payload for the updateDraftEntryConsentFieldValue mutation */
export type UpdateDraftEntryConsentFieldValuePayload = {
  __typename?: 'UpdateDraftEntryConsentFieldValuePayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The draft entry after the update mutation has been applied. If a validation error occurred, the draft entry will NOT have been updated with the invalid value provided. */
  entry?: Maybe<GravityFormsEntry>;
  /** Field errors. */
  errors?: Maybe<Array<Maybe<FieldError>>>;
  /** Draft entry resume token. */
  resumeToken: Scalars['String'];
};

/** Input for the updateDraftEntryDateFieldValue mutation */
export type UpdateDraftEntryDateFieldValueInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Field ID. */
  fieldId?: Maybe<Scalars['Int']>;
  /** Draft resume token. */
  resumeToken?: Maybe<Scalars['String']>;
  /** The form field value. */
  value?: Maybe<Scalars['String']>;
};

/** The payload for the updateDraftEntryDateFieldValue mutation */
export type UpdateDraftEntryDateFieldValuePayload = {
  __typename?: 'UpdateDraftEntryDateFieldValuePayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The draft entry after the update mutation has been applied. If a validation error occurred, the draft entry will NOT have been updated with the invalid value provided. */
  entry?: Maybe<GravityFormsEntry>;
  /** Field errors. */
  errors?: Maybe<Array<Maybe<FieldError>>>;
  /** Draft entry resume token. */
  resumeToken: Scalars['String'];
};

/** Input for the updateDraftEntryEmailFieldValue mutation */
export type UpdateDraftEntryEmailFieldValueInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Field ID. */
  fieldId?: Maybe<Scalars['Int']>;
  /** Draft resume token. */
  resumeToken?: Maybe<Scalars['String']>;
  /** The form field value. */
  value?: Maybe<EmailInput>;
};

/** The payload for the updateDraftEntryEmailFieldValue mutation */
export type UpdateDraftEntryEmailFieldValuePayload = {
  __typename?: 'UpdateDraftEntryEmailFieldValuePayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The draft entry after the update mutation has been applied. If a validation error occurred, the draft entry will NOT have been updated with the invalid value provided. */
  entry?: Maybe<GravityFormsEntry>;
  /** Field errors. */
  errors?: Maybe<Array<Maybe<FieldError>>>;
  /** Draft entry resume token. */
  resumeToken: Scalars['String'];
};

/** Input for the updateDraftEntryHiddenFieldValue mutation */
export type UpdateDraftEntryHiddenFieldValueInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Field ID. */
  fieldId?: Maybe<Scalars['Int']>;
  /** Draft resume token. */
  resumeToken?: Maybe<Scalars['String']>;
  /** The form field value. */
  value?: Maybe<Scalars['String']>;
};

/** The payload for the updateDraftEntryHiddenFieldValue mutation */
export type UpdateDraftEntryHiddenFieldValuePayload = {
  __typename?: 'UpdateDraftEntryHiddenFieldValuePayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The draft entry after the update mutation has been applied. If a validation error occurred, the draft entry will NOT have been updated with the invalid value provided. */
  entry?: Maybe<GravityFormsEntry>;
  /** Field errors. */
  errors?: Maybe<Array<Maybe<FieldError>>>;
  /** Draft entry resume token. */
  resumeToken: Scalars['String'];
};

/** Input for the updateDraftEntryListFieldValue mutation */
export type UpdateDraftEntryListFieldValueInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Field ID. */
  fieldId?: Maybe<Scalars['Int']>;
  /** Draft resume token. */
  resumeToken?: Maybe<Scalars['String']>;
  /** The form field values. */
  value?: Maybe<Array<Maybe<ListInput>>>;
};

/** The payload for the updateDraftEntryListFieldValue mutation */
export type UpdateDraftEntryListFieldValuePayload = {
  __typename?: 'UpdateDraftEntryListFieldValuePayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The draft entry after the update mutation has been applied. If a validation error occurred, the draft entry will NOT have been updated with the invalid value provided. */
  entry?: Maybe<GravityFormsEntry>;
  /** Field errors. */
  errors?: Maybe<Array<Maybe<FieldError>>>;
  /** Draft entry resume token. */
  resumeToken: Scalars['String'];
};

/** Input for the updateDraftEntryMultiSelectFieldValue mutation */
export type UpdateDraftEntryMultiSelectFieldValueInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Field ID. */
  fieldId?: Maybe<Scalars['Int']>;
  /** Draft resume token. */
  resumeToken?: Maybe<Scalars['String']>;
  /** The form field values. */
  value?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** The payload for the updateDraftEntryMultiSelectFieldValue mutation */
export type UpdateDraftEntryMultiSelectFieldValuePayload = {
  __typename?: 'UpdateDraftEntryMultiSelectFieldValuePayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The draft entry after the update mutation has been applied. If a validation error occurred, the draft entry will NOT have been updated with the invalid value provided. */
  entry?: Maybe<GravityFormsEntry>;
  /** Field errors. */
  errors?: Maybe<Array<Maybe<FieldError>>>;
  /** Draft entry resume token. */
  resumeToken: Scalars['String'];
};

/** Input for the updateDraftEntryNameFieldValue mutation */
export type UpdateDraftEntryNameFieldValueInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Field ID. */
  fieldId?: Maybe<Scalars['Int']>;
  /** Draft resume token. */
  resumeToken?: Maybe<Scalars['String']>;
  /** The form field value. */
  value?: Maybe<NameInput>;
};

/** The payload for the updateDraftEntryNameFieldValue mutation */
export type UpdateDraftEntryNameFieldValuePayload = {
  __typename?: 'UpdateDraftEntryNameFieldValuePayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The draft entry after the update mutation has been applied. If a validation error occurred, the draft entry will NOT have been updated with the invalid value provided. */
  entry?: Maybe<GravityFormsEntry>;
  /** Field errors. */
  errors?: Maybe<Array<Maybe<FieldError>>>;
  /** Draft entry resume token. */
  resumeToken: Scalars['String'];
};

/** Input for the updateDraftEntryNumberFieldValue mutation */
export type UpdateDraftEntryNumberFieldValueInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Field ID. */
  fieldId?: Maybe<Scalars['Int']>;
  /** Draft resume token. */
  resumeToken?: Maybe<Scalars['String']>;
  /** The form field value. */
  value?: Maybe<Scalars['String']>;
};

/** The payload for the updateDraftEntryNumberFieldValue mutation */
export type UpdateDraftEntryNumberFieldValuePayload = {
  __typename?: 'UpdateDraftEntryNumberFieldValuePayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The draft entry after the update mutation has been applied. If a validation error occurred, the draft entry will NOT have been updated with the invalid value provided. */
  entry?: Maybe<GravityFormsEntry>;
  /** Field errors. */
  errors?: Maybe<Array<Maybe<FieldError>>>;
  /** Draft entry resume token. */
  resumeToken: Scalars['String'];
};

/** Input for the updateDraftEntryPhoneFieldValue mutation */
export type UpdateDraftEntryPhoneFieldValueInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Field ID. */
  fieldId?: Maybe<Scalars['Int']>;
  /** Draft resume token. */
  resumeToken?: Maybe<Scalars['String']>;
  /** The form field value. */
  value?: Maybe<Scalars['String']>;
};

/** The payload for the updateDraftEntryPhoneFieldValue mutation */
export type UpdateDraftEntryPhoneFieldValuePayload = {
  __typename?: 'UpdateDraftEntryPhoneFieldValuePayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The draft entry after the update mutation has been applied. If a validation error occurred, the draft entry will NOT have been updated with the invalid value provided. */
  entry?: Maybe<GravityFormsEntry>;
  /** Field errors. */
  errors?: Maybe<Array<Maybe<FieldError>>>;
  /** Draft entry resume token. */
  resumeToken: Scalars['String'];
};

/** Input for the updateDraftEntryPostCategoryFieldValue mutation */
export type UpdateDraftEntryPostCategoryFieldValueInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Field ID. */
  fieldId?: Maybe<Scalars['Int']>;
  /** Draft resume token. */
  resumeToken?: Maybe<Scalars['String']>;
  /** The form field values. Values should be formatted as {categoryName}:{categoryId}. */
  value?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** The payload for the updateDraftEntryPostCategoryFieldValue mutation */
export type UpdateDraftEntryPostCategoryFieldValuePayload = {
  __typename?: 'UpdateDraftEntryPostCategoryFieldValuePayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The draft entry after the update mutation has been applied. If a validation error occurred, the draft entry will NOT have been updated with the invalid value provided. */
  entry?: Maybe<GravityFormsEntry>;
  /** Field errors. */
  errors?: Maybe<Array<Maybe<FieldError>>>;
  /** Draft entry resume token. */
  resumeToken: Scalars['String'];
};

/** Input for the updateDraftEntryPostContentFieldValue mutation */
export type UpdateDraftEntryPostContentFieldValueInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Field ID. */
  fieldId?: Maybe<Scalars['Int']>;
  /** Draft resume token. */
  resumeToken?: Maybe<Scalars['String']>;
  /** The form field value. */
  value?: Maybe<Scalars['String']>;
};

/** The payload for the updateDraftEntryPostContentFieldValue mutation */
export type UpdateDraftEntryPostContentFieldValuePayload = {
  __typename?: 'UpdateDraftEntryPostContentFieldValuePayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The draft entry after the update mutation has been applied. If a validation error occurred, the draft entry will NOT have been updated with the invalid value provided. */
  entry?: Maybe<GravityFormsEntry>;
  /** Field errors. */
  errors?: Maybe<Array<Maybe<FieldError>>>;
  /** Draft entry resume token. */
  resumeToken: Scalars['String'];
};

/** Input for the updateDraftEntryPostCustomFieldValue mutation */
export type UpdateDraftEntryPostCustomFieldValueInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Field ID. */
  fieldId?: Maybe<Scalars['Int']>;
  /** Draft resume token. */
  resumeToken?: Maybe<Scalars['String']>;
  /** The form field values. */
  value?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** The payload for the updateDraftEntryPostCustomFieldValue mutation */
export type UpdateDraftEntryPostCustomFieldValuePayload = {
  __typename?: 'UpdateDraftEntryPostCustomFieldValuePayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The draft entry after the update mutation has been applied. If a validation error occurred, the draft entry will NOT have been updated with the invalid value provided. */
  entry?: Maybe<GravityFormsEntry>;
  /** Field errors. */
  errors?: Maybe<Array<Maybe<FieldError>>>;
  /** Draft entry resume token. */
  resumeToken: Scalars['String'];
};

/** Input for the updateDraftEntryPostExcerptFieldValue mutation */
export type UpdateDraftEntryPostExcerptFieldValueInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Field ID. */
  fieldId?: Maybe<Scalars['Int']>;
  /** Draft resume token. */
  resumeToken?: Maybe<Scalars['String']>;
  /** The form field value. */
  value?: Maybe<Scalars['String']>;
};

/** The payload for the updateDraftEntryPostExcerptFieldValue mutation */
export type UpdateDraftEntryPostExcerptFieldValuePayload = {
  __typename?: 'UpdateDraftEntryPostExcerptFieldValuePayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The draft entry after the update mutation has been applied. If a validation error occurred, the draft entry will NOT have been updated with the invalid value provided. */
  entry?: Maybe<GravityFormsEntry>;
  /** Field errors. */
  errors?: Maybe<Array<Maybe<FieldError>>>;
  /** Draft entry resume token. */
  resumeToken: Scalars['String'];
};

/** Input for the updateDraftEntryPostTagsFieldValue mutation */
export type UpdateDraftEntryPostTagsFieldValueInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Field ID. */
  fieldId?: Maybe<Scalars['Int']>;
  /** Draft resume token. */
  resumeToken?: Maybe<Scalars['String']>;
  /** The form field value. */
  value?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** The payload for the updateDraftEntryPostTagsFieldValue mutation */
export type UpdateDraftEntryPostTagsFieldValuePayload = {
  __typename?: 'UpdateDraftEntryPostTagsFieldValuePayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The draft entry after the update mutation has been applied. If a validation error occurred, the draft entry will NOT have been updated with the invalid value provided. */
  entry?: Maybe<GravityFormsEntry>;
  /** Field errors. */
  errors?: Maybe<Array<Maybe<FieldError>>>;
  /** Draft entry resume token. */
  resumeToken: Scalars['String'];
};

/** Input for the updateDraftEntryPostTitleFieldValue mutation */
export type UpdateDraftEntryPostTitleFieldValueInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Field ID. */
  fieldId?: Maybe<Scalars['Int']>;
  /** Draft resume token. */
  resumeToken?: Maybe<Scalars['String']>;
  /** The form field value. */
  value?: Maybe<Scalars['String']>;
};

/** The payload for the updateDraftEntryPostTitleFieldValue mutation */
export type UpdateDraftEntryPostTitleFieldValuePayload = {
  __typename?: 'UpdateDraftEntryPostTitleFieldValuePayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The draft entry after the update mutation has been applied. If a validation error occurred, the draft entry will NOT have been updated with the invalid value provided. */
  entry?: Maybe<GravityFormsEntry>;
  /** Field errors. */
  errors?: Maybe<Array<Maybe<FieldError>>>;
  /** Draft entry resume token. */
  resumeToken: Scalars['String'];
};

/** Input for the updateDraftEntryRadioFieldValue mutation */
export type UpdateDraftEntryRadioFieldValueInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Field ID. */
  fieldId?: Maybe<Scalars['Int']>;
  /** Draft resume token. */
  resumeToken?: Maybe<Scalars['String']>;
  /** The form field value. */
  value?: Maybe<Scalars['String']>;
};

/** The payload for the updateDraftEntryRadioFieldValue mutation */
export type UpdateDraftEntryRadioFieldValuePayload = {
  __typename?: 'UpdateDraftEntryRadioFieldValuePayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The draft entry after the update mutation has been applied. If a validation error occurred, the draft entry will NOT have been updated with the invalid value provided. */
  entry?: Maybe<GravityFormsEntry>;
  /** Field errors. */
  errors?: Maybe<Array<Maybe<FieldError>>>;
  /** Draft entry resume token. */
  resumeToken: Scalars['String'];
};

/** Input for the updateDraftEntrySelectFieldValue mutation */
export type UpdateDraftEntrySelectFieldValueInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Field ID. */
  fieldId?: Maybe<Scalars['Int']>;
  /** Draft resume token. */
  resumeToken?: Maybe<Scalars['String']>;
  /** The form field value. */
  value?: Maybe<Scalars['String']>;
};

/** The payload for the updateDraftEntrySelectFieldValue mutation */
export type UpdateDraftEntrySelectFieldValuePayload = {
  __typename?: 'UpdateDraftEntrySelectFieldValuePayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The draft entry after the update mutation has been applied. If a validation error occurred, the draft entry will NOT have been updated with the invalid value provided. */
  entry?: Maybe<GravityFormsEntry>;
  /** Field errors. */
  errors?: Maybe<Array<Maybe<FieldError>>>;
  /** Draft entry resume token. */
  resumeToken: Scalars['String'];
};

/** Input for the updateDraftEntrySignatureFieldValue mutation */
export type UpdateDraftEntrySignatureFieldValueInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Field ID. */
  fieldId?: Maybe<Scalars['Int']>;
  /** Draft resume token. */
  resumeToken?: Maybe<Scalars['String']>;
  /** The signature as a base-64 encoded data URL with a MIME type of image/png. */
  value?: Maybe<Scalars['String']>;
};

/** The payload for the updateDraftEntrySignatureFieldValue mutation */
export type UpdateDraftEntrySignatureFieldValuePayload = {
  __typename?: 'UpdateDraftEntrySignatureFieldValuePayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The draft entry after the update mutation has been applied. If a validation error occurred, the draft entry will NOT have been updated with the invalid value provided. */
  entry?: Maybe<GravityFormsEntry>;
  /** Field errors. */
  errors?: Maybe<Array<Maybe<FieldError>>>;
  /** Draft entry resume token. */
  resumeToken: Scalars['String'];
};

/** Input for the updateDraftEntryTextAreaFieldValue mutation */
export type UpdateDraftEntryTextAreaFieldValueInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Field ID. */
  fieldId?: Maybe<Scalars['Int']>;
  /** Draft resume token. */
  resumeToken?: Maybe<Scalars['String']>;
  /** The form field value. */
  value?: Maybe<Scalars['String']>;
};

/** The payload for the updateDraftEntryTextAreaFieldValue mutation */
export type UpdateDraftEntryTextAreaFieldValuePayload = {
  __typename?: 'UpdateDraftEntryTextAreaFieldValuePayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The draft entry after the update mutation has been applied. If a validation error occurred, the draft entry will NOT have been updated with the invalid value provided. */
  entry?: Maybe<GravityFormsEntry>;
  /** Field errors. */
  errors?: Maybe<Array<Maybe<FieldError>>>;
  /** Draft entry resume token. */
  resumeToken: Scalars['String'];
};

/** Input for the updateDraftEntryTextFieldValue mutation */
export type UpdateDraftEntryTextFieldValueInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Field ID. */
  fieldId?: Maybe<Scalars['Int']>;
  /** Draft resume token. */
  resumeToken?: Maybe<Scalars['String']>;
  /** The form field value. */
  value?: Maybe<Scalars['String']>;
};

/** The payload for the updateDraftEntryTextFieldValue mutation */
export type UpdateDraftEntryTextFieldValuePayload = {
  __typename?: 'UpdateDraftEntryTextFieldValuePayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The draft entry after the update mutation has been applied. If a validation error occurred, the draft entry will NOT have been updated with the invalid value provided. */
  entry?: Maybe<GravityFormsEntry>;
  /** Field errors. */
  errors?: Maybe<Array<Maybe<FieldError>>>;
  /** Draft entry resume token. */
  resumeToken: Scalars['String'];
};

/** Input for the updateDraftEntryTimeFieldValue mutation */
export type UpdateDraftEntryTimeFieldValueInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Field ID. */
  fieldId?: Maybe<Scalars['Int']>;
  /** Draft resume token. */
  resumeToken?: Maybe<Scalars['String']>;
  /** The form field value. */
  value?: Maybe<Scalars['String']>;
};

/** The payload for the updateDraftEntryTimeFieldValue mutation */
export type UpdateDraftEntryTimeFieldValuePayload = {
  __typename?: 'UpdateDraftEntryTimeFieldValuePayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The draft entry after the update mutation has been applied. If a validation error occurred, the draft entry will NOT have been updated with the invalid value provided. */
  entry?: Maybe<GravityFormsEntry>;
  /** Field errors. */
  errors?: Maybe<Array<Maybe<FieldError>>>;
  /** Draft entry resume token. */
  resumeToken: Scalars['String'];
};

/** Input for the updateDraftEntryWebsiteFieldValue mutation */
export type UpdateDraftEntryWebsiteFieldValueInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Field ID. */
  fieldId?: Maybe<Scalars['Int']>;
  /** Draft resume token. */
  resumeToken?: Maybe<Scalars['String']>;
  /** The form field value. */
  value?: Maybe<Scalars['String']>;
};

/** The payload for the updateDraftEntryWebsiteFieldValue mutation */
export type UpdateDraftEntryWebsiteFieldValuePayload = {
  __typename?: 'UpdateDraftEntryWebsiteFieldValuePayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The draft entry after the update mutation has been applied. If a validation error occurred, the draft entry will NOT have been updated with the invalid value provided. */
  entry?: Maybe<GravityFormsEntry>;
  /** Field errors. */
  errors?: Maybe<Array<Maybe<FieldError>>>;
  /** Draft entry resume token. */
  resumeToken: Scalars['String'];
};

/** Input for the updateGravityFormsDraftEntry mutation */
export type UpdateGravityFormsDraftEntryInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** ID of the user that submitted of the form if a logged in user submitted the form. */
  createdBy?: Maybe<Scalars['Int']>;
  /** The field ids and their values. */
  fieldValues?: Maybe<Array<Maybe<FieldValuesInput>>>;
  /** Client IP of user who submitted the form. */
  ip?: Maybe<Scalars['String']>;
  /** Draft resume token. */
  resumeToken: Scalars['String'];
};

/** The payload for the updateGravityFormsDraftEntry mutation */
export type UpdateGravityFormsDraftEntryPayload = {
  __typename?: 'UpdateGravityFormsDraftEntryPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The draft entry after the update mutation has been applied. If a validation error occurred, the draft entry will NOT have been updated with the invalid value provided. */
  entry?: Maybe<GravityFormsEntry>;
  /** Field errors. */
  errors?: Maybe<Array<Maybe<FieldError>>>;
  /** Draft entry resume token. */
  resumeToken?: Maybe<Scalars['String']>;
  /** Draft resume URL. If the &quot;Referer&quot; header is not included in the request, this will be an empty string. */
  resumeUrl?: Maybe<Scalars['String']>;
};

/** Input for the updateGravityFormsEntry mutation */
export type UpdateGravityFormsEntryInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** ID of the user that submitted of the form if a logged in user submitted the form. */
  createdBy?: Maybe<Scalars['Int']>;
  /** The Gravity Forms entry id. */
  entryId: Scalars['Int'];
  /** The field ids and their values. */
  fieldValues?: Maybe<Array<Maybe<FieldValuesInput>>>;
  /** Client IP of user who submitted the form. */
  ip?: Maybe<Scalars['String']>;
  /** Indicates if the entry has been read. 1 for entries that are read and 0 for entries that have not been read. */
  isRead?: Maybe<Scalars['Boolean']>;
  /** Indicates if the entry has been starred (i.e marked with a star). */
  isStarred?: Maybe<Scalars['Boolean']>;
  /** The current status of the entry. */
  status?: Maybe<EntryStatusEnum>;
};

/** The payload for the updateGravityFormsEntry mutation */
export type UpdateGravityFormsEntryPayload = {
  __typename?: 'UpdateGravityFormsEntryPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The entry that was created. */
  entry?: Maybe<GravityFormsEntry>;
  /** The ID of the entry that was created. Null if the entry was only partially submitted or submitted as a draft. */
  entryId?: Maybe<Scalars['Int']>;
  /** Field errors. */
  errors?: Maybe<Array<Maybe<FieldError>>>;
};

/** Input for the updateMediaItem mutation */
export type UpdateMediaItemInput = {
  /** Alternative text to display when mediaItem is not displayed */
  altText?: Maybe<Scalars['String']>;
  /** The userId to assign as the author of the mediaItem */
  authorId?: Maybe<Scalars['ID']>;
  /** The caption for the mediaItem */
  caption?: Maybe<Scalars['String']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The comment status for the mediaItem */
  commentStatus?: Maybe<Scalars['String']>;
  /** The date of the mediaItem */
  date?: Maybe<Scalars['String']>;
  /** The date (in GMT zone) of the mediaItem */
  dateGmt?: Maybe<Scalars['String']>;
  /** Description of the mediaItem */
  description?: Maybe<Scalars['String']>;
  /** The file name of the mediaItem */
  filePath?: Maybe<Scalars['String']>;
  /** The file type of the mediaItem */
  fileType?: Maybe<MimeTypeEnum>;
  /** The ID of the mediaItem object */
  id: Scalars['ID'];
  /** The WordPress post ID or the graphQL postId of the parent object */
  parentId?: Maybe<Scalars['ID']>;
  /** The ping status for the mediaItem */
  pingStatus?: Maybe<Scalars['String']>;
  /** The slug of the mediaItem */
  slug?: Maybe<Scalars['String']>;
  /** The status of the mediaItem */
  status?: Maybe<MediaItemStatusEnum>;
  /** The title of the mediaItem */
  title?: Maybe<Scalars['String']>;
};

/** The payload for the updateMediaItem mutation */
export type UpdateMediaItemPayload = {
  __typename?: 'UpdateMediaItemPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The MediaItem object mutation type. */
  mediaItem?: Maybe<MediaItem>;
};

/** Input for the updatePage mutation */
export type UpdatePageInput = {
  /** The userId to assign as the author of the object */
  authorId?: Maybe<Scalars['ID']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The comment status for the object */
  commentStatus?: Maybe<Scalars['String']>;
  /** The content of the object */
  content?: Maybe<Scalars['String']>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: Maybe<Scalars['String']>;
  /** The ID of the page object */
  id: Scalars['ID'];
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: Maybe<Scalars['Int']>;
  /** The ID of the parent object */
  parentId?: Maybe<Scalars['ID']>;
  /** The password used to protect the content of the object */
  password?: Maybe<Scalars['String']>;
  /** The slug of the object */
  slug?: Maybe<Scalars['String']>;
  /** The status of the object */
  status?: Maybe<PostStatusEnum>;
  /** The title of the object */
  title?: Maybe<Scalars['String']>;
};

/** The payload for the updatePage mutation */
export type UpdatePagePayload = {
  __typename?: 'UpdatePagePayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The Post object mutation type. */
  page?: Maybe<Page>;
};

/** Input for the UpdatePostFormat mutation */
export type UpdatePostFormatInput = {
  /** The slug that the post_format will be an alias of */
  aliasOf?: Maybe<Scalars['String']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The description of the post_format object */
  description?: Maybe<Scalars['String']>;
  /** The ID of the postFormat object to update */
  id: Scalars['ID'];
  /** The name of the post_format object to mutate */
  name?: Maybe<Scalars['String']>;
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: Maybe<Scalars['String']>;
};

/** The payload for the UpdatePostFormat mutation */
export type UpdatePostFormatPayload = {
  __typename?: 'UpdatePostFormatPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The created post_format */
  postFormat?: Maybe<PostFormat>;
};

/** Input for the updatePost mutation */
export type UpdatePostInput = {
  /** The userId to assign as the author of the object */
  authorId?: Maybe<Scalars['ID']>;
  /** Set connections between the post and categories */
  categories?: Maybe<PostCategoriesInput>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The comment status for the object */
  commentStatus?: Maybe<Scalars['String']>;
  /** The content of the object */
  content?: Maybe<Scalars['String']>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: Maybe<Scalars['String']>;
  /** The excerpt of the object */
  excerpt?: Maybe<Scalars['String']>;
  /** The ID of the post object */
  id: Scalars['ID'];
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: Maybe<Scalars['Int']>;
  /** The password used to protect the content of the object */
  password?: Maybe<Scalars['String']>;
  /** The ping status for the object */
  pingStatus?: Maybe<Scalars['String']>;
  /** URLs that have been pinged. */
  pinged?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Set connections between the post and postFormats */
  postFormats?: Maybe<PostPostFormatsInput>;
  /** The slug of the object */
  slug?: Maybe<Scalars['String']>;
  /** The status of the object */
  status?: Maybe<PostStatusEnum>;
  /** Set connections between the post and tags */
  tags?: Maybe<PostTagsInput>;
  /** The title of the object */
  title?: Maybe<Scalars['String']>;
  /** URLs queued to be pinged. */
  toPing?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** The payload for the updatePost mutation */
export type UpdatePostPayload = {
  __typename?: 'UpdatePostPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The Post object mutation type. */
  post?: Maybe<Post>;
};

/** Input for the updateSettings mutation */
export type UpdateSettingsInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Allow people to submit comments on new posts. */
  discussionSettingsDefaultCommentStatus?: Maybe<Scalars['String']>;
  /** Allow link notifications from other blogs (pingbacks and trackbacks) on new articles. */
  discussionSettingsDefaultPingStatus?: Maybe<Scalars['String']>;
  /** A date format for all date strings. */
  generalSettingsDateFormat?: Maybe<Scalars['String']>;
  /** Site tagline. */
  generalSettingsDescription?: Maybe<Scalars['String']>;
  /** This address is used for admin purposes, like new user notification. */
  generalSettingsEmail?: Maybe<Scalars['String']>;
  /** WordPress locale code. */
  generalSettingsLanguage?: Maybe<Scalars['String']>;
  /** A day number of the week that the week should start on. */
  generalSettingsStartOfWeek?: Maybe<Scalars['Int']>;
  /** A time format for all time strings. */
  generalSettingsTimeFormat?: Maybe<Scalars['String']>;
  /** A city in the same timezone as you. */
  generalSettingsTimezone?: Maybe<Scalars['String']>;
  /** Site title. */
  generalSettingsTitle?: Maybe<Scalars['String']>;
  /** Site URL. */
  generalSettingsUrl?: Maybe<Scalars['String']>;
  /** Blog pages show at most. */
  readingSettingsPostsPerPage?: Maybe<Scalars['Int']>;
  /** Default post category. */
  writingSettingsDefaultCategory?: Maybe<Scalars['Int']>;
  /** Default post format. */
  writingSettingsDefaultPostFormat?: Maybe<Scalars['String']>;
  /** Convert emoticons like :-) and :-P to graphics on display. */
  writingSettingsUseSmilies?: Maybe<Scalars['Boolean']>;
};

/** The payload for the updateSettings mutation */
export type UpdateSettingsPayload = {
  __typename?: 'UpdateSettingsPayload';
  /** Update all settings. */
  allSettings?: Maybe<Settings>;
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Update the discussion setting. */
  discussionSettings?: Maybe<DiscussionSettings>;
  /** Update the general setting. */
  generalSettings?: Maybe<GeneralSettings>;
  /** Update the reading setting. */
  readingSettings?: Maybe<ReadingSettings>;
  /** Update the writing setting. */
  writingSettings?: Maybe<WritingSettings>;
};

/** Input for the UpdateTag mutation */
export type UpdateTagInput = {
  /** The slug that the post_tag will be an alias of */
  aliasOf?: Maybe<Scalars['String']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The description of the post_tag object */
  description?: Maybe<Scalars['String']>;
  /** The ID of the tag object to update */
  id: Scalars['ID'];
  /** The name of the post_tag object to mutate */
  name?: Maybe<Scalars['String']>;
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: Maybe<Scalars['String']>;
};

/** The payload for the UpdateTag mutation */
export type UpdateTagPayload = {
  __typename?: 'UpdateTagPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The created post_tag */
  tag?: Maybe<Tag>;
};

/** Input for the updateUser mutation */
export type UpdateUserInput = {
  /** User's AOL IM account. */
  aim?: Maybe<Scalars['String']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** A string containing content about the user. */
  description?: Maybe<Scalars['String']>;
  /** A string that will be shown on the site. Defaults to user's username. It is likely that you will want to change this, for both appearance and security through obscurity (that is if you dont use and delete the default admin user). */
  displayName?: Maybe<Scalars['String']>;
  /** A string containing the user's email address. */
  email?: Maybe<Scalars['String']>;
  /** 	The user's first name. */
  firstName?: Maybe<Scalars['String']>;
  /** The ID of the user */
  id: Scalars['ID'];
  /** User's Jabber account. */
  jabber?: Maybe<Scalars['String']>;
  /** The user's last name. */
  lastName?: Maybe<Scalars['String']>;
  /** User's locale. */
  locale?: Maybe<Scalars['String']>;
  /** A string that contains a URL-friendly name for the user. The default is the user's username. */
  nicename?: Maybe<Scalars['String']>;
  /** The user's nickname, defaults to the user's username. */
  nickname?: Maybe<Scalars['String']>;
  /** A string that contains the plain text password for the user. */
  password?: Maybe<Scalars['String']>;
  /** The date the user registered. Format is Y-m-d H:i:s. */
  registered?: Maybe<Scalars['String']>;
  /** A string for whether to enable the rich editor or not. False if not empty. */
  richEditing?: Maybe<Scalars['String']>;
  /** An array of roles to be assigned to the user. */
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** A string containing the user's URL for the user's web site. */
  websiteUrl?: Maybe<Scalars['String']>;
  /** User's Yahoo IM account. */
  yim?: Maybe<Scalars['String']>;
};

/** The payload for the updateUser mutation */
export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The User object mutation type. */
  user?: Maybe<User>;
};

/** A User object */
export type User = Node &
  UniformResourceIdentifiable &
  Commenter &
  DatabaseIdentifier & {
    __typename?: 'User';
    /** Avatar object for user. The avatar object can be retrieved in different sizes by specifying the size argument. */
    avatar?: Maybe<Avatar>;
    /** User metadata option name. Usually it will be &quot;wp_capabilities&quot;. */
    capKey?: Maybe<Scalars['String']>;
    /** A list of capabilities (permissions) granted to the user */
    capabilities?: Maybe<Array<Maybe<Scalars['String']>>>;
    /** Connection between the User type and the Comment type */
    comments?: Maybe<UserToCommentConnection>;
    /** Identifies the primary key from the database. */
    databaseId: Scalars['Int'];
    /** Description of the user. */
    description?: Maybe<Scalars['String']>;
    /** Email address of the user. This is equivalent to the WP_User-&gt;user_email property. */
    email?: Maybe<Scalars['String']>;
    /** Connection between the User type and the EnqueuedScript type */
    enqueuedScripts?: Maybe<UserToEnqueuedScriptConnection>;
    /** Connection between the User type and the EnqueuedStylesheet type */
    enqueuedStylesheets?: Maybe<UserToEnqueuedStylesheetConnection>;
    /** A complete list of capabilities including capabilities inherited from a role. This is equivalent to the array keys of WP_User-&gt;allcaps. */
    extraCapabilities?: Maybe<Array<Maybe<Scalars['String']>>>;
    /** First name of the user. This is equivalent to the WP_User-&gt;user_first_name property. */
    firstName?: Maybe<Scalars['String']>;
    /** The globally unique identifier for the user object. */
    id: Scalars['ID'];
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']>;
    /** Last name of the user. This is equivalent to the WP_User-&gt;user_last_name property. */
    lastName?: Maybe<Scalars['String']>;
    /** The preferred language locale set for the user. Value derived from get_user_locale(). */
    locale?: Maybe<Scalars['String']>;
    /** Connection between the User type and the mediaItem type */
    mediaItems?: Maybe<UserToMediaItemConnection>;
    /** Display name of the user. This is equivalent to the WP_User-&gt;dispaly_name property. */
    name?: Maybe<Scalars['String']>;
    /** The nicename for the user. This field is equivalent to WP_User-&gt;user_nicename */
    nicename?: Maybe<Scalars['String']>;
    /** Nickname of the user. */
    nickname?: Maybe<Scalars['String']>;
    /** Connection between the User type and the page type */
    pages?: Maybe<UserToPageConnection>;
    /** Connection between the User type and the post type */
    posts?: Maybe<UserToPostConnection>;
    /** The date the user registered or was created. The field follows a full ISO8601 date string format. */
    registeredDate?: Maybe<Scalars['String']>;
    /** Connection between the User and Revisions authored by the user */
    revisions?: Maybe<UserToContentRevisionUnionConnection>;
    /** Connection between the User type and the UserRole type */
    roles?: Maybe<UserToUserRoleConnection>;
    /** The slug for the user. This field is equivalent to WP_User-&gt;user_nicename */
    slug?: Maybe<Scalars['String']>;
    /** The unique resource identifier path */
    uri?: Maybe<Scalars['String']>;
    /** A website url that is associated with the user. */
    url?: Maybe<Scalars['String']>;
    /**
     * The Id of the user. Equivalent to WP_User-&gt;ID
     * @deprecated Deprecated in favor of the databaseId field
     */
    userId?: Maybe<Scalars['Int']>;
    /** Username for the user. This field is equivalent to WP_User-&gt;user_login. */
    username?: Maybe<Scalars['String']>;
  };

/** A User object */
export type UserAvatarArgs = {
  size?: Maybe<Scalars['Int']>;
  forceDefault?: Maybe<Scalars['Boolean']>;
  rating?: Maybe<AvatarRatingEnum>;
};

/** A User object */
export type UserCommentsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<UserToCommentConnectionWhereArgs>;
};

/** A User object */
export type UserEnqueuedScriptsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

/** A User object */
export type UserEnqueuedStylesheetsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

/** A User object */
export type UserMediaItemsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<UserToMediaItemConnectionWhereArgs>;
};

/** A User object */
export type UserPagesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<UserToPageConnectionWhereArgs>;
};

/** A User object */
export type UserPostsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<UserToPostConnectionWhereArgs>;
};

/** A User object */
export type UserRevisionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<UserToContentRevisionUnionConnectionWhereArgs>;
};

/** A User object */
export type UserRolesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

/** The Type of Identifier used to fetch a single User node. To be used along with the "id" field. Default is "ID". */
export enum UserNodeIdTypeEnum {
  /** The Database ID for the node */
  DatabaseId = 'DATABASE_ID',
  /** The Email of the User */
  Email = 'EMAIL',
  /** The hashed Global ID */
  Id = 'ID',
  /** The slug of the User */
  Slug = 'SLUG',
  /** The URI for the node */
  Uri = 'URI',
  /** The username the User uses to login with */
  Username = 'USERNAME',
}

/** A user role object */
export type UserRole = Node & {
  __typename?: 'UserRole';
  /** The capabilities that belong to this role */
  capabilities?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** The display name of the role */
  displayName?: Maybe<Scalars['String']>;
  /** The globally unique identifier for the user role object. */
  id: Scalars['ID'];
  /** Whether the object is restricted from the current viewer */
  isRestricted?: Maybe<Scalars['Boolean']>;
  /** The registered name of the role */
  name?: Maybe<Scalars['String']>;
};

/** Names of available user roles */
export enum UserRoleEnum {
  /** User role with specific capabilities */
  Administrator = 'ADMINISTRATOR',
  /** User role with specific capabilities */
  Author = 'AUTHOR',
  /** User role with specific capabilities */
  Contributor = 'CONTRIBUTOR',
  /** User role with specific capabilities */
  Editor = 'EDITOR',
  /** User role with specific capabilities */
  Subscriber = 'SUBSCRIBER',
}

/** Connection between the User type and the Comment type */
export type UserToCommentConnection = {
  __typename?: 'UserToCommentConnection';
  /** Edges for the UserToCommentConnection connection */
  edges?: Maybe<Array<Maybe<UserToCommentConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Comment>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type UserToCommentConnectionEdge = {
  __typename?: 'UserToCommentConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<Comment>;
};

/** Arguments for filtering the UserToCommentConnection connection */
export type UserToCommentConnectionWhereArgs = {
  /** Comment author email address. */
  authorEmail?: Maybe<Scalars['String']>;
  /** Array of author IDs to include comments for. */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Comment author URL. */
  authorUrl?: Maybe<Scalars['String']>;
  /** Array of comment IDs to include. */
  commentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Include comments of a given type. */
  commentType?: Maybe<Scalars['String']>;
  /** Include comments from a given array of comment types. */
  commentTypeIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: Maybe<Scalars['String']>;
  /** Content object author ID to limit results by. */
  contentAuthor?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: Maybe<Scalars['ID']>;
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Content object name to retrieve affiliated comments for. */
  contentName?: Maybe<Scalars['String']>;
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: Maybe<Scalars['Int']>;
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: Maybe<Array<Maybe<PostStatusEnum>>>;
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: Maybe<Array<Maybe<ContentTypeEnum>>>;
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Karma score to retrieve matching comments for. */
  karma?: Maybe<Scalars['Int']>;
  /** The cardinality of the order of the connection */
  order?: Maybe<OrderEnum>;
  /** Field to order the comments by. */
  orderby?: Maybe<CommentsConnectionOrderbyEnum>;
  /** Parent ID of comment to retrieve children of. */
  parent?: Maybe<Scalars['Int']>;
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Search term(s) to retrieve matching comments for. */
  search?: Maybe<Scalars['String']>;
  /** Comment status to limit results by. */
  status?: Maybe<Scalars['String']>;
  /** Include comments for a specific user ID. */
  userId?: Maybe<Scalars['ID']>;
};

/** Connection between the User type and the ContentRevisionUnion type */
export type UserToContentRevisionUnionConnection = {
  __typename?: 'UserToContentRevisionUnionConnection';
  /** Edges for the UserToContentRevisionUnionConnection connection */
  edges?: Maybe<Array<Maybe<UserToContentRevisionUnionConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ContentRevisionUnion>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type UserToContentRevisionUnionConnectionEdge = {
  __typename?: 'UserToContentRevisionUnionConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<ContentRevisionUnion>;
};

/** Arguments for filtering the UserToContentRevisionUnionConnection connection */
export type UserToContentRevisionUnionConnectionWhereArgs = {
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>;
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>;
  /** Title of the object */
  title?: Maybe<Scalars['String']>;
};

/** Connection between the User type and the EnqueuedScript type */
export type UserToEnqueuedScriptConnection = {
  __typename?: 'UserToEnqueuedScriptConnection';
  /** Edges for the UserToEnqueuedScriptConnection connection */
  edges?: Maybe<Array<Maybe<UserToEnqueuedScriptConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<EnqueuedScript>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type UserToEnqueuedScriptConnectionEdge = {
  __typename?: 'UserToEnqueuedScriptConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<EnqueuedScript>;
};

/** Connection between the User type and the EnqueuedStylesheet type */
export type UserToEnqueuedStylesheetConnection = {
  __typename?: 'UserToEnqueuedStylesheetConnection';
  /** Edges for the UserToEnqueuedStylesheetConnection connection */
  edges?: Maybe<Array<Maybe<UserToEnqueuedStylesheetConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<EnqueuedStylesheet>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type UserToEnqueuedStylesheetConnectionEdge = {
  __typename?: 'UserToEnqueuedStylesheetConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<EnqueuedStylesheet>;
};

/** Connection between the User type and the mediaItem type */
export type UserToMediaItemConnection = {
  __typename?: 'UserToMediaItemConnection';
  /** Edges for the UserToMediaItemConnection connection */
  edges?: Maybe<Array<Maybe<UserToMediaItemConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<MediaItem>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type UserToMediaItemConnectionEdge = {
  __typename?: 'UserToMediaItemConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<MediaItem>;
};

/** Arguments for filtering the UserToMediaItemConnection connection */
export type UserToMediaItemConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: Maybe<Scalars['Int']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: Maybe<Scalars['String']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>;
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>;
  /** Title of the object */
  title?: Maybe<Scalars['String']>;
};

/** Connection between the User type and the page type */
export type UserToPageConnection = {
  __typename?: 'UserToPageConnection';
  /** Edges for the UserToPageConnection connection */
  edges?: Maybe<Array<Maybe<UserToPageConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Page>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type UserToPageConnectionEdge = {
  __typename?: 'UserToPageConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<Page>;
};

/** Arguments for filtering the UserToPageConnection connection */
export type UserToPageConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: Maybe<Scalars['Int']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: Maybe<Scalars['String']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>;
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>;
  /** Title of the object */
  title?: Maybe<Scalars['String']>;
};

/** Connection between the User type and the post type */
export type UserToPostConnection = {
  __typename?: 'UserToPostConnection';
  /** Edges for the UserToPostConnection connection */
  edges?: Maybe<Array<Maybe<UserToPostConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Post>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type UserToPostConnectionEdge = {
  __typename?: 'UserToPostConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<Post>;
};

/** Arguments for filtering the UserToPostConnection connection */
export type UserToPostConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: Maybe<Scalars['Int']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: Maybe<Scalars['String']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Category ID */
  categoryId?: Maybe<Scalars['Int']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Use Category Slug */
  categoryName?: Maybe<Scalars['String']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>;
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>;
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>;
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>;
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>;
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>;
  /** Tag Slug */
  tag?: Maybe<Scalars['String']>;
  /** Use Tag ID */
  tagId?: Maybe<Scalars['String']>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Array of tag slugs, used to display objects from one tag OR another */
  tagSlugAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Array of tag slugs, used to exclude objects in specified tags */
  tagSlugIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Title of the object */
  title?: Maybe<Scalars['String']>;
};

/** Connection between the User type and the UserRole type */
export type UserToUserRoleConnection = {
  __typename?: 'UserToUserRoleConnection';
  /** Edges for the UserToUserRoleConnection connection */
  edges?: Maybe<Array<Maybe<UserToUserRoleConnectionEdge>>>;
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<UserRole>>>;
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type UserToUserRoleConnectionEdge = {
  __typename?: 'UserToUserRoleConnectionEdge';
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>;
  /** The item at the end of the edge */
  node?: Maybe<UserRole>;
};

/** Field to order the connection by */
export enum UsersConnectionOrderbyEnum {
  /** Order by display name */
  DisplayName = 'DISPLAY_NAME',
  /** Order by email address */
  Email = 'EMAIL',
  /** Order by login */
  Login = 'LOGIN',
  /** Preserve the login order given in the LOGIN_IN array */
  LoginIn = 'LOGIN_IN',
  /** Order by nice name */
  NiceName = 'NICE_NAME',
  /** Preserve the nice name order given in the NICE_NAME_IN array */
  NiceNameIn = 'NICE_NAME_IN',
  /** Order by registration date */
  Registered = 'REGISTERED',
  /** Order by URL */
  Url = 'URL',
}

/** Options for ordering the connection */
export type UsersConnectionOrderbyInput = {
  /** The field name used to sort the results. */
  field: UsersConnectionOrderbyEnum;
  /** The cardinality of the order of the connection */
  order?: Maybe<OrderEnum>;
};

/** Column used for searching for users. */
export enum UsersConnectionSearchColumnEnum {
  /** The user's email address. */
  Email = 'EMAIL',
  /** The globally unique ID. */
  Id = 'ID',
  /** The username the User uses to login with. */
  Login = 'LOGIN',
  /** A URL-friendly name for the user. The default is the user's username. */
  Nicename = 'NICENAME',
  /** The URL of the user\s website. */
  Url = 'URL',
}

/** Field visibility. */
export enum VisibilityPropertyEnum {
  /** The field is for "administrative" use. */
  Administrative = 'ADMINISTRATIVE',
  /** The field is "hidden". */
  Hidden = 'HIDDEN',
  /** The field is "visible". */
  Visible = 'VISIBLE',
}

/** Information about pagination in a connection. */
export type WpPageInfo = {
  __typename?: 'WPPageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

/** Gravity Forms Website field. */
export type WebsiteField = FormField & {
  __typename?: 'WebsiteField';
  /** When specified, the value of this property will be used on the admin pages instead of the label. It is useful for fields with long labels. */
  adminLabel?: Maybe<Scalars['String']>;
  /** Determines if this field should only visible on the administration pages. A value of 1 will mark the field as admin only and will hide it from the public form. Useful for fields such as “status” that help with managing entries, but don’t apply to users filling out the form. */
  adminOnly?: Maybe<Scalars['Boolean']>;
  /** Determines if the field’s value can be pre-populated dynamically. 1 to allow field to be pre-populated, 0 otherwise. */
  allowsPrepopulate?: Maybe<Scalars['Boolean']>;
  /** Controls the visibility of the field based on values selected by the user. */
  conditionalLogic?: Maybe<ConditionalLogic>;
  /** String containing the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields. */
  cssClass?: Maybe<Scalars['String']>;
  /**
   * Array of the custom CSS classes to be added to the &lt;li&gt; tag that contains the field. Useful for applying custom formatting to specific fields.
   * @deprecated Please use `cssClass` instead.
   */
  cssClassList?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Contains the default value for the field. When specified, the field&#039;s value will be populated with the contents of this property when the form is displayed. */
  defaultValue?: Maybe<Scalars['String']>;
  /** Field description. */
  description?: Maybe<Scalars['String']>;
  /** The placement of the field description. */
  descriptionPlacement?: Maybe<DescriptionPlacementPropertyEnum>;
  /** Contains the message that is displayed for fields that fail validation. */
  errorMessage?: Maybe<Scalars['String']>;
  /** The ID of the form this field belongs to. */
  formId: Scalars['Int'];
  /** Field ID. */
  id: Scalars['Int'];
  /** Assigns a name to this field so that it can be populated dynamically via this input name. Only applicable when allowsPrepopulate is set to 1. */
  inputName?: Maybe<Scalars['String']>;
  /** Determines if the field requires the user to enter a value. 1 marks the field as required, 0 marks the field as not required. Fields marked as required will prevent the form from being submitted if the user has not entered a value in it. */
  isRequired?: Maybe<Scalars['Boolean']>;
  /** Field label that will be displayed on the form and on the admin pages. */
  label?: Maybe<Scalars['String']>;
  /** Determines if the field allows duplicate submissions. 1 to prevent users from submitting the same value more than once, 0 to allow duplicate values. */
  noDuplicates?: Maybe<Scalars['Boolean']>;
  /** Field placeholder. */
  placeholder?: Maybe<Scalars['String']>;
  /** Determines the size of the field when displayed on the page. */
  size?: Maybe<SizePropertyEnum>;
  /** The type of field to be displayed. */
  type: Scalars['String'];
  /** Website field value. */
  value?: Maybe<Scalars['String']>;
  /** Field visibility. */
  visibility?: Maybe<VisibilityPropertyEnum>;
};

/** Website field value. */
export type WebsiteFieldValue = {
  __typename?: 'WebsiteFieldValue';
  /** The value. */
  value?: Maybe<Scalars['String']>;
};

/** The writing setting type */
export type WritingSettings = {
  __typename?: 'WritingSettings';
  /** Default post category. */
  defaultCategory?: Maybe<Scalars['Int']>;
  /** Default post format. */
  defaultPostFormat?: Maybe<Scalars['String']>;
  /** Convert emoticons like :-) and :-P to graphics on display. */
  useSmilies?: Maybe<Scalars['Boolean']>;
};
