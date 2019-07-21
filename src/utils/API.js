import axios from 'axios';
import qs from 'qs';
import BaseConfig from "../config/BaseConfig";

const fetch = (
    url,
    params = {},
    options
) => {
    let _options = Object.assign({
        method: 'post',
        withCredentials: true
    }, options)

    let [_params, _data] = _options.method === 'get' ? [params, ''] : ['', params]

    return axios({
        method: _options.method,
        url: BaseConfig.baseUrl + url,
        params: _params,
        data: qs.stringify(_data),
        withCredentials: _options.withCredentials
    }).then(res => {
        let _res = res.data
        return _res
    }).catch(e => {
        return e
    });
}

export default fetch;