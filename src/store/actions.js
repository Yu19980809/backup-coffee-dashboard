import * as api from '../api'
import { LOGIN, FETCH_MEMBERS, ADD_MEMBER, MODIFY_ROLE, DELETE_MEMBERS, FETCH_USERS, GIVE_VIP, FETCH_GROUPS, MODIFY_GROUP, ADD_GROUP, DELETE_GROUP, DELETE_GROUPS, FETCH_COMMODITIES, FETCH_CATEGORIES, ADD_COMMODITY, ADD_CATEGORY, DELETE_CATEGORY, DELETE_CATEGORIES, ON_COMMODITY, OFF_COMMODITY, OFF_COMMODITIES, MODIFY_CATEGORIES, EDIT_COMMODITY, DELETE_COMMODITY, FETCH_COUPONS, ON_COUPON, OFF_COUPON, OFF_COUPONS, ADD_COUPON, EDIT_COUPON, DELETE_COUPON, FETCH_ORDERS, DELETE_ORDER, DELETE_ORDERS } from '../constants/actionType'

// 登录
const login = ( tel, password, navigate ) => async ( dispatch ) => {
  try {
    const { data } = await api.login( { tel, password } )
    dispatch( { type: LOGIN, payload: data } )
    navigate( '/' )
  } catch (error) {
    console.log( 'login error', error )
  }
}

// 成员管理
const fetchMembers = () => async ( dispatch ) => {
  try {
    const { data } = await api.fetchMembers()
    dispatch( { type: FETCH_MEMBERS, payload: data.data } )
    return data.data
  } catch (error) {
    console.log( 'fetchMembers error', error )
  }
}

const addMember = info => async ( dispatch ) => {
  try {
    const { data } = await api.addMember( info )
    dispatch( { type: ADD_MEMBER, payload: data.data } )
    return data.data
  } catch (error) {
    console.log( 'addMember error', error )
  }
}

const modifiyMembersRole = ( idList, role ) => async ( dispatch ) => {
  try {
    const { data } = await api.modifiyMembersRole( { idList, role } )
    dispatch( { type: DELETE_MEMBERS, payload: data.data } )
    return data
  } catch (error) {
    console.log( 'modifiyMemberRole error', error )
  }
}

const deleteMembers = idList => async ( dispatch ) => {
  try {
    await api.deleteMembers( idList )
    dispatch( { type: MODIFY_ROLE, payload: idList } )
  } catch (error) {
    console.log( 'deleteMembers error', error )
  }
}

// 用户管理
const fetchUsers = () => async ( dispatch ) => {
  try {
    const { data } = await api.fetchUsers()
    dispatch( { type: FETCH_USERS, payload: data.data } )
    return data.data
  } catch (error) {
    console.log( 'fetchUsers error', error )
  }
}

const giveVip = params => async ( dispatch ) => {
  try {
    const { data } = await api.giveVip( params )
    dispatch( { type: GIVE_VIP, payload: data.data } )
    return data.data
  } catch (error) {
    console.log( 'giveVip error', error )
  }
}

const fetchUserGroups = () => async ( dispatch ) => {
  try {
    const { data } = await api.fetchUserGroups()
    dispatch( { type: FETCH_GROUPS, payload: data.data } )
    return data.data
  } catch (error) {
    console.log( 'fetchUserGroups error', error )
  }
}

const setUserGroup = params => async () => {
  try {
    const { data } = await api.setUserGroup( params )
    // dispatch( { type: SET_GROUP, payload: data.data } )
    return data.data
  } catch (error) {
    console.log( 'setUserGroup error', error )
  }
}

// 用户分组
const modifyGroup = params => async ( dispatch ) => {
  try {
    const { data } = await api.modifyGroup( params )
    dispatch( { type: MODIFY_GROUP, payload: data.data } )
    return data.data
  } catch (error) {
    console.log( 'modifyGroup error', error )
  }
}

const addGroup = params => async ( dispatch ) => {
  try {
    const { data } = await api.addGroup( params )
    dispatch( { type: ADD_GROUP, payload: data.data } )
    return data.data
  } catch (error) {
    console.log( 'addGroup error', error )
  }
}

const deleteSingleGroup = id => async ( dispatch ) => {
  try {
    await api.deleteSingleGroup( id )
    dispatch( { type: DELETE_GROUP, payload: id } )
  } catch (error) {
    console.log( 'deleteSingleGroup error', error )
  }
}

const deleteGroups = idList => async ( dispatch ) => {
  try {
    await api.deleteGroups( idList )
    dispatch( { type: DELETE_GROUPS, payload: idList } )
  } catch (error) {
    console.log( 'deleteGroups error', error )
  }
}

// 商品管理
const fetchCommodities = () => async ( dispatch ) => {
  try {
    const { data } = await api.fetchCommodities()
    dispatch( { type: FETCH_COMMODITIES, payload: data.data } )
    return data.data
  } catch (error) {
    console.log( 'fetchCommodities error', error )
  }
}

const fetchCommodityCategories = () => async ( dispatch ) => {
  try {
    const { data } = await api.fetchCommodityCategories()
    dispatch( { type: FETCH_CATEGORIES, payload: data.data } )
    return data.data
  } catch (error) {
    console.log( 'fetchCommodityCategories error', error )
  }
}

const addCommodity = params => async ( dispatch ) => {
  try {
    const { data } = await api.addCommodity( params )
    dispatch( { type: ADD_COMMODITY, payload: data.data } )
    return data.data
  } catch (error) {
    console.log( 'addCommodity error', error )
  }
}

const setCommodityOn = id => async ( dispatch ) => {
  try {
    const { data } = await api.setCommodityOn( id )
    dispatch( { type: ON_COMMODITY, payload: data.data } )
    return data.data
  } catch (error) {
    console.log( 'setCommodityOn error', error )
  }
}

const setCommodityOff = id => async ( dispatch ) => {
  try {
    const { data } = await api.setCommodityOff( id )
    dispatch( { type: OFF_COMMODITY, payload: data.data } )
    return data.data
  } catch (error) {
    console.log( 'setCommodityOff error', error )
  }
}

const offCommodities = params => async ( dispatch ) => {
  try {
    await api.offCommodities( params )
    dispatch( { type: OFF_COMMODITIES, payload: params.idList } )
  } catch (error) {
    console.log( 'offCommodities error', error )
  }
}

const modifyCommoditiesCategory = params => async ( dispatch ) => {
  try {
    await api.modifyCommoditiesCategory( params )
    dispatch( { type: MODIFY_CATEGORIES, payload: params } )
  } catch (error) {
    console.log( 'modifyCommoditiesCategory error', error )
  }
}

const editCommodity = params => async ( dispatch ) => {
  try {
    const { data } = await api.editCommodity( params )
    dispatch( { type: EDIT_COMMODITY, payload: data.data } )
    return data.data
  } catch (error) {
    console.log( 'editCommodity error', error )
  }
}

const deleteCommodity = id => async ( dispatch ) => {
  try {
    await api.deleteCommodity( id )
    dispatch( { type: DELETE_COMMODITY, payload: id } )
  } catch (error) {
    console.log( 'deleteCommodity error', error )
  }
}

// 商品分类
const addCategory = params => async ( dispatch ) => {
  try {
    const { data } = await api.addCategory( params )
    dispatch( { type: ADD_CATEGORY, payload: data } )
    return data
  } catch (error) {
    console.log( 'addCategory error', error )
  }
}

const deleteSingleCategory = id => async ( dispatch ) => {
  try {
    await api.deleteSingleCategory( id )
    dispatch( { type: DELETE_CATEGORY, payload: id} )
  } catch (error) {
    console.log( 'deleteSingleCategory error', error )
  }
}

const deleteCategories = idList => async ( dispatch ) => {
  try {
    await api.deleteCategories( idList )
    dispatch( { type: DELETE_CATEGORIES, payload: idList } )
  } catch (error) {
    console.log( 'deleteCategories error', error )
  }
}

// 优惠券管理
const fetchCoupons = () => async ( dispatch ) => {
  try {
    const { data } = await api.fetchCoupons()
    dispatch( { type: FETCH_COUPONS, payload: data.data } )
    return data.data
  } catch (error) {
    console.log( 'fetchCoupons error', error )
  }
}

const setCouponOn = id => async ( dispatch ) => {
  try {
    const { data } = await api.setCouponOn( id )
    dispatch( { type: ON_COUPON, payload: data.data } )
  } catch (error) {
    console.log( 'setCouponOn error', error )
  }
}

const setCouponOff = id => async ( dispatch ) => {
  try {
    const { data } = await api.setCouponOff( id )
    dispatch( { type: OFF_COUPON, payload: data.data } )
  } catch (error) {
    console.log( 'setCouponOff error', error )
  }
}

const offCoupons = params => async ( dispatch ) => {
  try {
    await api.offCoupons( params )
    dispatch( { type: OFF_COUPONS, payload: params.idList } )
  } catch (error) {
    console.log( 'offCoupons error', error )
  }
}

const addCoupon = params => async ( dispatch ) => {
  try {
    const { data } = await api.addCoupon( params )
    dispatch( { type: ADD_COUPON, payload: data.data } )
    return data.data
  } catch (error) {
    console.log( 'addCoupon error', error )
  }
}

const editCoupon = params => async ( dispatch ) => {
  try {
    const { data } = await api.editCoupon( params )
    dispatch( { type: EDIT_COUPON, payload: data.data } )
    return data.data
  } catch (error) {
    console.log( 'editCoupon error', error )
  }
}

const deleteCoupon = id => async ( dispatch ) => {
  try {
    await api.deleteCoupon( id )
    dispatch( { type: DELETE_COUPON, payload: id } )
  } catch (error) {
    console.log( 'deleteCoupon error', error )
  }
}

// 订单管理
const fetchOrders = () => async ( dispatch ) => {
  try {
    const { data } = await api.fetchOrders()
    dispatch( { type: FETCH_ORDERS, payload: data.data } )
    return data.data
  } catch (error) {
    console.log( 'fetchOrders error', error )
  }
}

const deleteOrder = id => async ( dispatch ) => {
  try {
    await api.deleteOrder( id )
    dispatch( { type: DELETE_ORDER, payload: id } )
  } catch (error) {
    console.log( 'deleteOrder error', error )
  }
}

const deleteOrders = idList => async ( dispatch ) => {
  try {
    await api.deleteOrders( idList )
    dispatch( { type: DELETE_ORDERS, payload: idList } )
  } catch (error) {
    console.log( 'deleteOrders error', error )
  }
}


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
  setCouponOff,
  setCouponOn,
  offCoupons,
  addCoupon,
  editCoupon,
  deleteCoupon,
  fetchOrders,
  deleteOrder,
  deleteOrders,
}
