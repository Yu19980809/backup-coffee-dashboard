import axios from 'axios'

const API = axios.create( { baseURL: 'http://localhost:4000/api/v1' } )

// API.interceptors.request.use( req => {
//   const userData = localStorage.getItem( 'profile' )
//   if ( userData ) {
//     req.headers.Authorization = `Bearer ${ JSON.parse( userData ).token }`
//   }

//   return req
// } );

// 登录
const login = data => API.post( '/auth/login/web', data )

// 成员管理
const fetchMembers = () => API.get( '/member/web' )
const addMember = data =>  API.post( '/member/web', data )
const modifiyMembersRole = data => API.patch( '/member/web', data )
const deleteMembers = idList => API.delete( '/member/web', { params: { idList } } )

// 用户管理
const fetchUsers = () => API.get( '/user/web' )
const giveVip = data => API.patch( '/user/web/vip', data )
const fetchUserGroups = () => API.get( '/group/web' )
const setUserGroup = data => API.post( '/user_group/web', data )

// 用户分组
const modifyGroup = data => API.patch( '/group/web', data )
const addGroup = data => API.post( '/group/web', data )
const deleteSingleGroup = id => API.delete( `/group/web/single/${ id }` )
const deleteGroups = idList => API.delete( '/group/web', { params: { idList } } )

// 商品管理
const fetchCommodities = () => API.get( '/commodity/web' )
const fetchCommodityCategories = () => API.get( '/category/web' )
const addCommodity = data => API.post( '/commodity/web', data )
const setCommodityOn = id => API.post( `/commodity/web/on/${ id }` )
const setCommodityOff = id => API.post( `/commodity/web/off_single/${ id }` )
const offCommodities = data => API.post( '/commodity/web/off_multiple', data )
const modifyCommoditiesCategory = data => API.post( '/commodity/web/categories', data )
const editCommodity = data => API.patch( '/commodity/web', data )
const deleteCommodity = id => API.delete( `/commodity/web/${ id }` )

// 商品分类
const addCategory = data => API.post( '/category/web', data )
const deleteSingleCategory = id => API.delete( `/category/web/single/${ id }` )
const deleteCategories = idList => API.delete( '/category/web', { params: { idList } } )

// 优惠券管理
const fetchCoupons = () => API.get( '/coupon/web' )
const setCouponOn = id => API.patch( `/coupon/web/on/${ id }` )
const setCouponOff = id => API.patch( `/coupon/web/off_single/${ id }` )
const offCoupons = data => API.patch( '/coupon/web/off_multi', data )
const addCoupon = data => API.post( '/coupon/web', data )
const editCoupon = data => API.patch( '/coupon/web', data )
const deleteCoupon = id => API.delete( `/coupon/web/${ id }` )

// 订单管理
const fetchOrders = () => API.get( '/order/web' )
const deleteOrder = id => API.delete( `/order/web/single/${ id }` )
const deleteOrders = idList => API.delete( '/order/web/multi', { params: { idList } } )

export {
  login,
  fetchMembers,
  addMember,
  modifiyMembersRole,
  deleteMembers,
  fetchUsers,
  giveVip,
  fetchUserGroups,
  setUserGroup,
  modifyGroup,
  addGroup,
  deleteSingleGroup,
  deleteGroups,
  fetchCommodities,
  fetchCommodityCategories,
  addCommodity,
  setCommodityOn,
  setCommodityOff,
  offCommodities,
  modifyCommoditiesCategory,
  editCommodity,
  deleteCommodity,
  addCategory,
  deleteSingleCategory,
  deleteCategories,
  fetchCoupons,
  setCouponOn,
  setCouponOff,
  offCoupons,
  addCoupon,
  editCoupon,
  deleteCoupon,
  fetchOrders,
  deleteOrder,
  deleteOrders,
}
