/* eslint-disable no-case-declarations */
import { combineReducers } from '@reduxjs/toolkit'
import { FETCH_MEMBERS, ADD_MEMBER, MODIFY_ROLE, DELETE_MEMBERS, FETCH_USERS, GIVE_VIP, FETCH_GROUPS, MODIFY_GROUP, DELETE_GROUP, DELETE_GROUPS } from '../constants/actionType'

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

export default combineReducers({ memberRudecer, userReducer, groupReducer })
