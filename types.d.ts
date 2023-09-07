export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  JSON: { input: any; output: any; }
};

export type Query = {
  __typename?: 'Query';
  _sql?: Maybe<Scalars['JSON']['output']>;
  _tables?: Maybe<Scalars['JSON']['output']>;
  _table?: Maybe<Scalars['JSON']['output']>;
  posts_by_pk?: Maybe<Posts>;
  posts?: Maybe<Array<Maybe<Posts>>>;
  posts_aggregate?: Maybe<Posts_Aggregate>;
  about_by_pk?: Maybe<About>;
  about?: Maybe<Array<Maybe<About>>>;
  about_aggregate?: Maybe<About_Aggregate>;
};


export type Query_SqlArgs = {
  query: Scalars['String']['input'];
};


export type Query_TableArgs = {
  name: Scalars['String']['input'];
};


export type QueryPosts_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type QueryPostsArgs = {
  where?: InputMaybe<Posts_Bool_Exp>;
  order_by?: InputMaybe<Posts_Order_By>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAbout_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type QueryAboutArgs = {
  where?: InputMaybe<About_Bool_Exp>;
  order_by?: InputMaybe<About_Order_By>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Posts = {
  __typename?: 'posts';
  id?: Maybe<Scalars['Int']['output']>;
  title: Scalars['String']['output'];
  content: Scalars['String']['output'];
  images_json?: Maybe<Scalars['JSON']['output']>;
};


export type PostsTitleArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


export type PostsContentArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


export type PostsImages_JsonArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

export type Posts_Bool_Exp = {
  id?: InputMaybe<Int_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  content?: InputMaybe<String_Comparison_Exp>;
  images_json?: InputMaybe<String_Comparison_Exp>;
  _or?: InputMaybe<Array<Posts_Bool_Exp>>;
  _and?: InputMaybe<Array<Posts_Bool_Exp>>;
};

export type Int_Comparison_Exp = {
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type String_Comparison_Exp = {
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  _eq?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Posts_Order_By = {
  id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  content?: InputMaybe<Order_By>;
  images_json?: InputMaybe<Order_By>;
};

export enum Order_By {
  Asc = 'asc',
  AscNullsFirst = 'asc_nulls_first',
  AscNullsLast = 'asc_nulls_last',
  Desc = 'desc',
  DescNullsFirst = 'desc_nulls_first',
  DescNullsLast = 'desc_nulls_last'
}

export type Posts_Aggregate = {
  __typename?: 'posts_aggregate';
  aggregate?: Maybe<Aggregate>;
};

export type Aggregate = {
  __typename?: 'aggregate';
  count?: Maybe<Scalars['Int']['output']>;
};

export type About = {
  __typename?: 'about';
  id?: Maybe<Scalars['Int']['output']>;
  title: Scalars['String']['output'];
  content: Scalars['String']['output'];
};


export type AboutTitleArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


export type AboutContentArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

export type About_Bool_Exp = {
  id?: InputMaybe<Int_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  content?: InputMaybe<String_Comparison_Exp>;
  _or?: InputMaybe<Array<About_Bool_Exp>>;
  _and?: InputMaybe<Array<About_Bool_Exp>>;
};

export type About_Order_By = {
  id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  content?: InputMaybe<Order_By>;
};

export type About_Aggregate = {
  __typename?: 'about_aggregate';
  aggregate?: Maybe<Aggregate>;
};

export type Mutation = {
  __typename?: 'Mutation';
  update_posts_one?: Maybe<Posts>;
  delete_posts?: Maybe<Posts>;
  insert_posts_one?: Maybe<Posts>;
  insert_posts?: Maybe<Array<Maybe<Posts>>>;
  update_posts_many?: Maybe<Array<Maybe<Posts_Mutation_Response>>>;
  update_about_one?: Maybe<About>;
  delete_about?: Maybe<About>;
  insert_about_one?: Maybe<About>;
  insert_about?: Maybe<Array<Maybe<About>>>;
  update_about_many?: Maybe<Array<Maybe<About_Mutation_Response>>>;
};


export type MutationUpdate_Posts_OneArgs = {
  _set: Posts_Set_Input;
  pk_columns?: InputMaybe<Posts_Pk_Columns_Input>;
};


export type MutationDelete_PostsArgs = {
  where?: InputMaybe<Posts_Bool_Exp>;
};


export type MutationInsert_Posts_OneArgs = {
  object: Posts_Insert_Input;
  on_conflict?: InputMaybe<Posts_On_Conflict>;
};


export type MutationInsert_PostsArgs = {
  objects: Array<InputMaybe<Posts_Insert_Input>>;
  on_conflict?: InputMaybe<Posts_On_Conflict>;
};


export type MutationUpdate_Posts_ManyArgs = {
  updates: Array<Posts_Updates_Input>;
};


export type MutationUpdate_About_OneArgs = {
  _set: About_Set_Input;
  pk_columns?: InputMaybe<About_Pk_Columns_Input>;
};


export type MutationDelete_AboutArgs = {
  where?: InputMaybe<About_Bool_Exp>;
};


export type MutationInsert_About_OneArgs = {
  object: About_Insert_Input;
  on_conflict?: InputMaybe<About_On_Conflict>;
};


export type MutationInsert_AboutArgs = {
  objects: Array<InputMaybe<About_Insert_Input>>;
  on_conflict?: InputMaybe<About_On_Conflict>;
};


export type MutationUpdate_About_ManyArgs = {
  updates: Array<About_Updates_Input>;
};

export type Posts_Set_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  images_json?: InputMaybe<Scalars['JSON']['input']>;
};

export type Posts_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

export type Posts_Insert_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
  content: Scalars['String']['input'];
  images_json?: InputMaybe<Scalars['JSON']['input']>;
};

export type Posts_On_Conflict = {
  constraint?: InputMaybe<Scalars['String']['input']>;
  action: Conflict_Action;
};

export enum Conflict_Action {
  Nothing = 'nothing',
  Update = 'update'
}

export type Posts_Mutation_Response = {
  __typename?: 'posts_mutation_response';
  affected_rows?: Maybe<Scalars['Int']['output']>;
  returning: Array<Posts>;
};

export type Posts_Updates_Input = {
  where?: InputMaybe<Posts_Bool_Exp>;
  _inc?: InputMaybe<Posts_Inc>;
  _set?: InputMaybe<Posts_Set_Input>;
};

export type Posts_Inc = {
  id?: InputMaybe<Scalars['Int']['input']>;
};

export type About_Set_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
};

export type About_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

export type About_Insert_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
  content: Scalars['String']['input'];
};

export type About_On_Conflict = {
  constraint?: InputMaybe<Scalars['String']['input']>;
  action: Conflict_Action;
};

export type About_Mutation_Response = {
  __typename?: 'about_mutation_response';
  affected_rows?: Maybe<Scalars['Int']['output']>;
  returning: Array<About>;
};

export type About_Updates_Input = {
  where?: InputMaybe<About_Bool_Exp>;
  _inc?: InputMaybe<About_Inc>;
  _set?: InputMaybe<About_Set_Input>;
};

export type About_Inc = {
  id?: InputMaybe<Scalars['Int']['input']>;
};
