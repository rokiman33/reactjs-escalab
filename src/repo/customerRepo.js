import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getCustomer = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllCustomer(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchCustomer(pageNo+1,pageSize,search);
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


const addCustomer = (data) => {
return api.post(`/customer`,data)
}
const updateCustomer = (CustomerId,data) => {
return api.put(`/customer/${CustomerId}`,data)
}
const getAllCustomer = (pageNo,pageSize) => {
return api.get(`/customer/?pageNo=${pageNo}&pageSize=${pageSize}`)
}
const getOneCustomer = (CustomerId) => {
return api.get(`/customer/${CustomerId}`)
}
const searchCustomer = (pageNo,pageSize,searchKey) => {
return api.get(`/customer/search/${searchKey}/?pageNo=${pageNo}&pageSize=${pageSize}`)
}
const deleteCustomer = (CustomerId) => {
return api.delete(`/customer/${CustomerId}`)
}
export {getCustomer,addCustomer,updateCustomer,getAllCustomer,getOneCustomer,searchCustomer,deleteCustomer}


