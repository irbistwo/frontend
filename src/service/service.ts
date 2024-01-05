//const api = 'https://localhost:3000';
const api = '';
export const sendPostData=(postname:string,arraytosend:any)=> {
    const url=api+postname;
    return new Promise<string>((resolve,reject)=> {
        let data= JSON.stringify(arraytosend);
        let is_error=false;
        let statusup:number;
        let headers:any={'Content-Type':'application/json'};
        const token=arraytosend.token;
        if(arraytosend.token) { headers={'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`};
        delete arraytosend.token;
        }
        console.info("spd", data);
        let result= fetch(url,{
            method: "post",
            headers:headers ,
            body:data
        });
        result.then(function(response) {
            // console.log('response', response)
            let status=response.status;
            if(status!=200) {is_error=true;//throw (" error status "+status);
                statusup=status;}
            let header=response.headers.get('Content-Type');
            if(header===null){throw "Network notify error";}
        return response.text();
        }).then(function(text) {
            let result=text;
           // if(is_error) throw ("status:"+statusup+" "+result);
            if(is_error) throw (result);
            resolve(result);

        }).catch(function(ex) {
            console.log('(service 33)failed', ex);
           reject(new Error( ex));
             //throw new Error( ex)
            //reject(ex);
        });
    });
}

export const sendGetData=(postname:string,token:string|null)=> {
    const url=api+postname;
    return new Promise<string>((resolve,reject)=> {

        let is_error=false;
        let statusup:number;
        let headers:any={'Content-Type':'application/json'};

        if(token)  headers={'Content-Type':'application/json',
            Authorization: `Bearer ${token}`};


        console.info("spd get url", url);
        let result= fetch(url,{
            method: "GET",
            headers: headers,

        });
        result.then(function(response) {
            let status=response.status;
            if(status!=200) {
                is_error=true;//throw (" error status "+status);
                statusup=status;
            }
            let header=response.headers.get('Content-Type');
            if(header===null){throw "Network notify error";}

            return response.text();
        }).then(function(text) {
            let result=text;
         //   if(is_error) throw ("status:"+statusup+" "+result);
            if(is_error) throw (result);

            resolve(result);

        }).catch(function(ex:any) {
           console.log('service 81 failed', ex);

           // throw ('failed send error '+ ex.toString());
            //For classic reactg work throw but for RN only bellow
            reject(new Error('failed send, '+ ex));

        });
    });
}


function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
function guid() {
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

export function guidsmall() {
    return (S4()+S4()+"-"+S4()+"-"+S4());
}
