import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getCustomerlog = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllCustomerlog(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchCustomerlog(pageNo+1,pageSize,search);
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


const addCustomerlog = (data) => {
return api.post(`/customerlog`,data)
}
const updateCustomerlog = (CustomerId,data) => {
return api.put(`/customerlog/${CustomerId}`,data)
}
const getAllCustomerlog = (pageNo,pageSize) => {
return api.get(`/customerlog/?pageNo=${pageNo}&pageSize=${pageSize}`)
}
const getOneCustomerlog = (CustomerId) => {
return api.get(`/customerlog/${CustomerId}`)
}
const searchCustomerlog = (pageNo,pageSize,searchKey) => {
return api.get(`/customerlog/search/${searchKey}/?pageNo=${pageNo}&pageSize=${pageSize}`)
}
const deleteCustomerlog = (CustomerId) => {
return api.delete(`/customerlog/${CustomerId}`)
}
export {getCustomerlog,addCustomerlog,updateCustomerlog,getAllCustomerlog,getOneCustomerlog,searchCustomerlog,deleteCustomerlog}


