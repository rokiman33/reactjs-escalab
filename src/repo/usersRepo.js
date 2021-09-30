import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getUsers = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllUsers(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchUsers(pageNo+1,pageSize,search);
        } catch(err) {
            return {
                records:[],
                totalCount:0
            }
        }
    }
    if(res && res.data && res.data.document && res.data.document.records && res.data.document.records.length>0){
    return res.data.document;
    }else{
        return {
            records:[],
            totalCount:0
        }
    }
    return res.data.document;
}


const addUsers = (data) => {
return api.post(`/users`,data)
}
const updateUsers = (Id,data) => {
return api.put(`/users/${Id}`,data)
}
const getAllUsers = (pageNo,pageSize) => {
return api.get(`/users/?pageNo=${pageNo}&pageSize=${pageSize}`)
}
const getOneUsers = (Id) => {
return api.get(`/users/${Id}`)
}
const searchUsers = (pageNo,pageSize,searchKey) => {
return api.get(`/users/search/${searchKey}/?pageNo=${pageNo}&pageSize=${pageSize}`)
}
const deleteUsers = (Id) => {
return api.delete(`/users/${Id}`)
}
export {getUsers,addUsers,updateUsers,getAllUsers,getOneUsers,searchUsers,deleteUsers}


