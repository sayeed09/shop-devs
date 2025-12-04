import { IProductTag } from "../interface/search-product-list"

export interface SpotlightCategoryList {
  image: string
  link: string
}

export interface Section {
  title: string
  handle: string
  sub_collections: SubCollection[]
}

export interface SubCollection {
  title: string
  id: string
  handle: string
  image: string
}

export interface CertificateList {
  image: string
  title: string
  description: string
}

export interface Spotlight {
  categories: Category[]
}

export interface Category {
  title: string
  id: string
  handle: string
  image: string
}

export interface NewLaunches {
  title: string
  id: string
  handle: string
}

export interface SectionBanner {
  title: string
  image: string
  link: string
}

export interface Lbt {
  content: Content[]
}

export interface Content {
  video: string
  thumbnail: string
  image: string
  review: string
  customerName: string
  youtubeVideoId: string
}

export interface InTheNewsModel {
  image: string;
  description: string;
}
export interface BadgesModel {
  image: string;
  title: string;
  description;
}



export interface CollectionByHandleResponse {
  data: CollectionByHandleData
  error: Error
}

export interface CollectionByHandleData {
  id: string
  title: string
  handle: string
  products: Product[]
  subCollections: Collections[]
  banners: ICollectionBanner[];
}

export interface ICollectionBanner {
  desktopImage: string;
  mobileImage: string;
  position: number;
}

export interface Collections {
  handle: string;
  imgSrc: string;
  name: string;
}

export interface Product {
  id: string
  handle: string
  title: string
  image: string
  benefits: string[]
  compareAtPrice: number
  price: number
  variantId: string
  averageRating?: string;
  numberOfReviews?: string;
  productTag?: IProductTag;
  benefitsNew?: INewBenefit;
  options?: string[];
}

export interface Error { }

export interface HomePageResponseModel {
  banners: Banner[]
  spotlightCategoryList: SpotlightCategoryList[]
  sections: Section[]
  certificateList: CertificateList[]
  spotlight: Spotlight
  new_launches: NewLaunches
  section_banners: SectionBanner[]
  lbt: Lbt
  inTheNewsSection: InTheNewsSection[]
  badges: Badge[]
  cleanProteinList: CleanProtein[];
  productAdvice: ProductAdvice;
  dataBlocks: DataBlock[];
}

export interface ProductAdvice {
  image: string;
  mobileImage: string;
  link: string;
}
export interface CleanProtein {
  image: string;
  link: string;
}
export interface Banner {
  image: string
  title: string
  mobileImage: string
  link: string
}

export interface SpotlightCategoryList {
  image: string
  link: string
}

export interface Section {
  title: string
  handle: string
  subCollections: SubCollection[]
}

export interface SubCollection {
  title: string
  id: string
  handle: string
  image: string
}

export interface CertificateList {
  image: string
  title: string
  description: string
}

export interface Spotlight {
  categories: Category[]
}

export interface Category {
  title: string
  id: string
  handle: string
  image: string
}

export interface NewLaunches {
  title: string
  id: string
  handle: string
}

export interface SectionBanner {
  title: string
  image: string
  link: string
}

export interface Lbt {
  content: Content[]
}

export interface Content {
  image: string
  review: string
  customerName: string
  youtubeVideoId: string
}

export interface InTheNewsSection {
  image: string
  description: string
}

export interface Badge {
  title: string
  image: string
  description: string
}

export interface AppBanner {
  image: string
  title: string
  link: string
}



export interface CollectionListState {
  isActive: boolean;
  sectionTitle: string;
  loading: boolean;
  handle: string;
}
export interface CollectionDataState {
  [title: string]: CollectionByHandleResponse
}

export interface INewBenefit {
  for: string
  with: string
}

export interface BaseSection {
  id: number;
  type: string;
  sort?: number;
}

export interface HighlightsSection extends BaseSection {
  type: "highlights";
  data: string[];
  separator: string;
}

export interface ProductSection extends BaseSection {
  type: "productSection";
  title: string;
  subtitle: string;
  handle: string;
  img: string;
}

export interface BannerSection extends BaseSection {
  type: "banner";
  desktop: string;
  mobile: string;
}

export interface LovedByMillionSection extends BaseSection {
  type: "lovedByMillion";
  title: string;
  subtitle: string;
  data: LovedByMillionData[];
}

export interface LovedByMillionData {
  image: string;
  review: string;
  customerName: string;
  youtubeVideoId: string;
  video: string;
  thumbnail: string;
}

export interface CertificatesSection extends BaseSection {
  type: "certificates";
  title: string;
  subtitle: string;
  data: CertificateData[];
}

export interface CertificateData {
  image: string;
  title: string;
  description: string;
}

export interface InTheNews extends BaseSection {
  type: "inTheNewsSection";
  title: string;
  data: InTheNewsData[];
}

export interface InTheNewsData {
  image: string;
  description: string;
}

export type DataBlock = HighlightsSection | ProductSection | BannerSection | LovedByMillionSection | CertificatesSection | InTheNews;
