import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getDocumentlog = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllDocumentlog(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchDocumentlog(pageNo+1,pageSize,search);
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


const addDocumentlog = (data) => {
return api.post(`/documentlog`,data)
}
const updateDocumentlog = (DocumentId,data) => {
return api.put(`/documentlog/${DocumentId}`,data)
}
const getAllDocumentlog = (pageNo,pageSize) => {
return api.get(`/documentlog/?pageNo=${pageNo}&pageSize=${pageSize}`)
}
const getOneDocumentlog = (DocumentId) => {
return api.get(`/documentlog/${DocumentId}`)
}
const searchDocumentlog = (pageNo,pageSize,searchKey) => {
return api.get(`/documentlog/search/${searchKey}/?pageNo=${pageNo}&pageSize=${pageSize}`)
}
const deleteDocumentlog = (DocumentId) => {
return api.delete(`/documentlog/${DocumentId}`)
}
export {getDocumentlog,addDocumentlog,updateDocumentlog,getAllDocumentlog,getOneDocumentlog,searchDocumentlog,deleteDocumentlog}


