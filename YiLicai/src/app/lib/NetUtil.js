/**
 * Created by Administrator on 2017/3/29 0029.
 */
let NetUtil = {
    getJson(url, callback){//, data
        var fetchOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data;boundary=6ff46e0b6b5148d984f148b6542e5a5d'
            }
            // body:data
        };

        fetch(url, fetchOptions)
            .then((response) => response.text())
            .then((responseText) => {
                //  callback(JSON.parse(responseText));
                // var jsonobj=eval('('+responseText+')');
                // callback(jsonobj.state);
                callback(responseText);
            }).done();
    },
};
export default NetUtil;