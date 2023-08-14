import * as api from '../api'
import { FETCH_MEMBERS, ADD_MEMBER, MODIFY_ROLE, DELETE_MEMBERS, FETCH_USERS, GIVE_VIP, FETCH_GROUPS, MODIFY_GROUP, ADD_GROUP, DELETE_GROUP, DELETE_GROUPS } from '../constants/actionType'

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

export {
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
}
