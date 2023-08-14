import axios from 'axios'

const API = axios.create( { baseURL: 'http://localhost:4000/api/v1' } )

// API.interceptors.request.use( req => {
//   const userData = localStorage.getItem( 'profile' )
//   if ( userData ) {
//     req.headers.Authorization = `Bearer ${ JSON.parse( userData ).token }`
//   }

//   return req
// } );

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
