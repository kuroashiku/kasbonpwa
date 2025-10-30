export const RESPONSE_OK = 200;
export const RESPONSE_NOK = 500;
export const IS_DEMO = true;
export const API_HOST = import.meta.env.VITE_API_HOST;

export const httpGet = async (url) => {
    try{
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        if(token!=''){
            headers['Authorization'] = `Bearer ${token}`;
        }
        const response = await fetch(url, {
            method: 'GET',
            headers
        });
        const respJson = await response.json();
        if(respJson){
            return {
                error: "",
                data: respJson
            }
        }return {
            error: "No data",
            data: null
        }
    }catch(err){
        return {
            error: JSON.stringify(err),
            data: null
        }
    }
}

export const httpUpload = async (url, file) => {
    try{
        const formData = new FormData();
        formData.append("files", file);
        const resp = await fetch(url,{
            method: 'POST',
            headers:{ 
                'Authorization' : `Bearer ${window.token}`
            },
            body: formData
        });
        const respStatus = resp.status;
        if(respStatus !== 200){
            return{
                data: null,
                error: respStatus
            }
        }
        const respJson = await resp.json();
        if(respJson[0]){
            return {
                error: "",
                data: respJson[0]
            }
        }return {
            error: "",
            data: true
        }
    }catch(err){
        return {
            data: null,
            error: JSON.stringify(err)
        }
    }
}

export const httpPostOpen = async (url, data) => {
    try{
        const resp = await fetch(url,{
            method: 'POST',
            headers:{ 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        const respStatus = resp.status;
        if(respStatus !== 200){
            return{
                data: null,
                error: respStatus
            }
        }
        const respJson = await resp.json();
        if(respJson){
            return {
                error: "",
                data: respJson
            }
        }
        return {
            error: "",
            data: true
        }
    }catch(err){
        return {
            data: null,
            error: JSON.stringify(err)
        }
    }
}

export const httpPostFormDataAuth = async (url, data) => {
    try{
        const resp = await fetch(url,{
            method: 'POST',
            headers:{ 'Content-Type': 'application/x-www-form-urlencoded'},
            body: new URLSearchParams({
                'client_id': data.client_id,
                'client_secret': data.client_secret
            })
        });
        const respStatus = resp.status;
        if(respStatus !== 200){
            return{
                data: null,
                error: respStatus
            }
        }
        const respJson = await resp.json();
        return {
            error: null,
            data: respJson
        }
    }catch(err){
        return {
            data: null,
            error: JSON.stringify(err)
        }
    }
}

export const httpPost = async (url, data) => {
    try{
        const headers = {
            'Content-Type': 'application/json'
        }
        console.log("window token = ",window.token);
        if(window.token){
            // console.log(window.token);
            headers['Authorization'] = `Bearer ${window.token}`;
        }
        const resp = await fetch(url,{
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });
        const respStatus = resp.status;
        if(respStatus !== 200){
            return{
                data: null,
                error: respStatus
            }
        }
        const respJson = await resp.json();
        if(respJson.data){
            return {
                error: respJson.error,
                data: respJson.data
            }
        }
        if(respJson.content_data){
            return {
                error: "",
                content_data: respJson.content_data,
                content: respJson.content,
            }
        }
        return {
            error: respJson.error,
            data: true
        }
    }catch(err){
        return {
            data: null,
            error: JSON.stringify(err)
        }
    }
}

export const httpPut = async (url, data) => {
    try{
        const headers = {
            'Content-Type': 'application/json'
        }
        if(window.token){
            headers['Authorization'] = `Bearer ${window.token}`;
        }
        const resp = await fetch(url,{
            method: 'PUT',
            headers,
            body: JSON.stringify(data)
        });
        const respStatus = resp.status;
        if(respStatus !== 200){
            return{
                data: null,
                error: respStatus
            }
        }
        const respJson = await resp.json();
        if(respJson){
            return {
                error: "",
                data: respJson
            }
        }return {
            error: "",
            data: true
        }
    }catch(err){
        return {
            data: null,
            error: JSON.stringify(err)
        }
    }
}


export const httpDelete = async (url) => {
    try{
        const headers = {
            'Content-Type': 'application/json'
        }
        if(window.token){
            headers['Authorization'] = `Bearer ${window.token}`;
        }
        const resp = await fetch(url,{
            method: 'DELETE',
            headers
        });
        const respStatus = resp.status;
        if(respStatus !== 200){
            return{
                data: null,
                error: respStatus
            }
        }
        const respJson = await resp.json();
        if(respJson){
            return {
                error: "",
                data: respJson
            }
        }return {
            error: "",
            data: true
        }
    }catch(err){
        return {
            data: null,
            error: JSON.stringify(err)
        }
    }
}