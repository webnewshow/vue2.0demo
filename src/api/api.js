import {
    getAction,
    deleteAction,
    putAction,
    postAction,
    downFileAction,
    fileUploadAction
} from '@/api/manage'

const getTest = (params) => getAction("/api/user/get", params);
const deleteActionTest = (params) => deleteAction("/api/user/delete", params);
const putActionTest = (params) => putAction("/api/user/put", params);
const postActionTest = (params) => postAction("/api/services/Security/CarRealTimeInfoService/GetRealTimeInfo", params);
const downFileActionTest = (params) => downFileAction("/api/user/downfile", params);
const fileUploadActionTest = (params) => fileUploadAction("/api/user/fileupload", params);


export {
    getTest,
    deleteActionTest,
    putActionTest,
    postActionTest,
    downFileActionTest,
    fileUploadActionTest
}