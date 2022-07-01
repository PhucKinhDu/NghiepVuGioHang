export default class SanPhamService{
    getList = function() {
        return axios({
            method: "get",
            url: "https://62a2fc9e21232ff9b2151283.mockapi.io/Products_Capstone",
        });
    };

    addItem = function(sp) {
        return axios({
            method: "post",
            url: "https://62a2fc9e21232ff9b2151283.mockapi.io/Products_Capstone",
            data: sp
        });
    }

    deleteItem = function(id) {
        return axios({
            method: "delete",
            url: `https://62a2fc9e21232ff9b2151283.mockapi.io/Products_Capstone/${id}`
        });
    }
    
    getProductItem = function(id) {
        return axios({
            method: "get",
            url: `https://62a2fc9e21232ff9b2151283.mockapi.io/Products_Capstone/${id}`
        });
    }

    updateProduct = function(id, sp) {
        return axios({
            method: "put",
            url: `https://62a2fc9e21232ff9b2151283.mockapi.io/Products_Capstone/${id}`,
            data: sp
        });
    }

}