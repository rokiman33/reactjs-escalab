import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getDocument = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllDocument(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchDocument(pageNo+1,pageSize,search);
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


const addDocument = (data) => {
return api.post(`/document`,data)
}
const updateDocument = (DocumentId,data) => {
return api.put(`/document/${DocumentId}`,data)
}
const getAllDocument = (pageNo,pageSize) => {
return api.get(`/document/?pageNo=${pageNo}&pageSize=${pageSize}`)
}
const getOneDocument = (DocumentId) => {
return api.get(`/document/${DocumentId}`)
}
const searchDocument = (pageNo,pageSize,searchKey) => {
return api.get(`/document/search/${searchKey}/?pageNo=${pageNo}&pageSize=${pageSize}`)
}
const deleteDocument = (DocumentId) => {
return api.delete(`/document/${DocumentId}`)
}
export {getDocument,addDocument,updateDocument,getAllDocument,getOneDocument,searchDocument,deleteDocument}


