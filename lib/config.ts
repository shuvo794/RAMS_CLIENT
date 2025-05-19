// export const BASE_URL = "https://api.bluebayit.com";
export const BASE_URL = "http://192.168.68.137:8010";
export const GET_IMAGE_BY_without_pagination = `${BASE_URL}/cms_menu_content_image/api/v1/cms_menu_content_image/without_pagination/all/`;
export const GET_CONTENT_BY_without_pagination = `${BASE_URL}/cms_menu_content/api/v1/cms_menu_content/without_pagination/all/`;
// export const GET_HOMEPAGE_SLIDER = `${BASE_URL}/homepage_slider/api/v1/first_homepage_slider/`;
export const GET_BANNER = `${BASE_URL}/banner/api/v1/banner/all/`;
export const GET_SERVICE_SLIDER = `${BASE_URL}/service_slider/api/v1/service_slider/all/`;
export const GET_SERVICEID = `${BASE_URL}/service_slider/api/v1/service_slider/`;
export const GET_PORTFOLIO_CATEGORIES = `${BASE_URL}/portfolio_category/api/v1/portfolio_category/all/`;
export const GET_PORTFOLIO_BY_CATEGORY = (categoryId: number) =>
  `${BASE_URL}/portfolio/api/v1/portfolio/all/?category=${categoryId}`;
export const GET_ALL_PORTFOLIOS = `${BASE_URL}/portfolio/api/v1/portfolio/is_portfolio/all/`;
export const GET_PORTFOLIOID = `${BASE_URL}/portfolio/api/v1/portfolio/`;
export const GET_TESTIMONIALS = `${BASE_URL}/testimonial/api/v1/testimonial/all/`;

export const GET_GALLERIES = `${BASE_URL}/gallery/api/v1/gallery/all/`;
export const GET_CLIENTS = `${BASE_URL}/client/api/v1/client/all/`;
export const GET_CLIENTS_ALL = `${BASE_URL}/client/api/v1/client/without_pagination/all/`;

export const GET_CLIENTS_DETAILS = `${BASE_URL}/client/api/v1/client/without_pagination/all/`;
export const GET_ABOUTS = `${BASE_URL}/about/api/v1/about/all/`;
export const GET_SITESETTINGS = `${BASE_URL}/general_setting/api/v1/general_setting/all/`;
export const GET_MODULES = `${BASE_URL}/module/api/v1/module/all/`;
export const GET_SOLUTIONS = `${BASE_URL}/solution/api/v1/solution/all/`;
