/* eslint-disable no-case-declarations */
import { combineReducers } from '@reduxjs/toolkit'
import { LOGIN, FETCH_MEMBERS, ADD_MEMBER, MODIFY_ROLE, DELETE_MEMBERS, FETCH_USERS, GIVE_VIP, FETCH_GROUPS, MODIFY_GROUP, DELETE_GROUP, DELETE_GROUPS, FETCH_COMMODITIES, FETCH_CATEGORIES, ADD_COMMODITY, ADD_CATEGORY, DELETE_CATEGORY, DELETE_CATEGORIES, ON_COMMODITY, OFF_COMMODITY, OFF_COMMODITIES, MODIFY_CATEGORIES, EDIT_COMMODITY, DELETE_COMMODITY, FETCH_COUPONS, ON_COUPON, OFF_COUPON, OFF_COUPONS, ADD_COUPON, EDIT_COUPON, DELETE_COUPON, FETCH_ORDERS, DELETE_ORDER, DELETE_ORDERS } from '../constants/actionType'

const loginReducer = ( auth = null, action ) => {
  switch ( action.type ) {
    case LOGIN:
      localStorage.setItem( 'profile', JSON.stringify( { ...action.payload } ) )
      auth = action.payload
      return auth

    default:
      return auth
  }
}

const memberRudecer = ( members = [], action ) => {
  switch ( action.type ) {
    case FETCH_MEMBERS:
      members = action.payload
      return members
    
    case ADD_MEMBER:
      return [ action.payload, ...members ]
    
    case MODIFY_ROLE:
      const idList = action.payload.map( item => item._id )
      members = members.map( item => idList.indexOf( item._id ) === -1 ? item : action.payload[ idList.indexOf( item._id ) ] )
      return members

    case DELETE_MEMBERS:
      members = members.filter( item => !action.payload.includes( item._id ) )
      return members
    
    default:
      return members
  }
}

const userReducer = ( users = [], action ) => {
  switch ( action.type ) {
    case FETCH_USERS:
      users = action.payload
      return users
    
    case GIVE_VIP:
      const idList = action.payload.map( item => item._id )
      users = users.map( item => idList.indexOf( item._id ) === -1 ? item : { ...action.payload[ idList.indexOf( item._id ) ], groups: item.groups } )
      return users

    default:
      return users
  }
}

const groupReducer = ( groups = [], action ) => {
  switch ( action.type ) {
    case FETCH_GROUPS:
      groups = action.payload
      return groups

    case MODIFY_GROUP:
      groups = groups.map( item => item === action.payload._id ? action.payload : item )
      return groups

    case DELETE_GROUP:
      groups = groups.filter( item => item._id !== action.payload )
      return groups
    
    case DELETE_GROUPS:
      groups = groups.filter( item => !action.payload.includes( item._id ) )
      return groups

    default:
      return groups
  }
}

const commodityReducer = ( commodities = [], action ) => {
  switch ( action.type ) {
    case FETCH_COMMODITIES:
      commodities = action.payload
      return commodities
    
    case ADD_COMMODITY:
      commodities = [ ...commodities, action.payload ]
      return commodities
    
    case ON_COMMODITY:
    case OFF_COMMODITY:
    case EDIT_COMMODITY:
      commodities = commodities.map( item => item._id === action.payload._id ? action.payload : item )
      return commodities
    
    case OFF_COMMODITIES:
      commodities = commodities.map( item => action.payload.includes( item._id ) ? { ...item, status: 'off' } : item )
      return commodities

    case MODIFY_CATEGORIES:
      commodities = commodities.map( item => action.payload.idList.includes( item._id ) ? { ...item, category: action.payload.category.name } : item )
      return commodities

    case DELETE_COMMODITY:
      commodities = commodities.filter( item => item !== action.payload )
      return commodities

    default:
      return commodities
  }
}

const categoryReducer = ( categories = [], action ) => {
  switch ( action.type ) {
    case FETCH_CATEGORIES:
      categories = action.payload
      return categories

    case ADD_CATEGORY:
      categories = action.payload.success ? [ action.payload.data, ...categories ] : categories
      return categories

    case DELETE_CATEGORY:
      categories = categories.filter( item => item._id !== action.payload )
      return categories
    
    case DELETE_CATEGORIES:
      categories = categories.filter( item => action.payload.includes( item._id ) )
      return categories

    default:
      return categories
  }
}

const couponReducer = ( coupons = [], action ) => {
  switch ( action.type ) {
    case FETCH_COUPONS:
      coupons = action.payload
      return coupons

    case ON_COUPON:
    case OFF_COUPON:
    case EDIT_COUPON:
      coupons = coupons.map( item => item._id === action.payload._id ? action.payload : item )
      return coupons

    case OFF_COUPONS:
      coupons = coupons.map( item => action.payload.includes( item._id ) ? { ...item, status: 'off' } : item )
      return coupons
    
    case ADD_COUPON:
      coupons = [ action.payload, ...coupons ]
      return coupons

    case DELETE_COUPON:
      coupons = coupons.filter( item => item._id !== action.payload )
      return coupons
    
    default:
      return coupons
  }
}

const orderReducer = ( orders = [], action ) => {
  switch ( action.type ) {
    case FETCH_ORDERS:
      orders = action.payload
      return orders

    case DELETE_ORDER:
      orders = orders.filter( item => item._id !== action.payload )
      return orders

    case DELETE_ORDERS:
      orders = orders.filter( item => action.payload.includes( item._id ) )
      return orders

    default:
      return orders
  }
}

export default combineReducers({ loginReducer, memberRudecer, userReducer, groupReducer, commodityReducer, categoryReducer, couponReducer, orderReducer })
