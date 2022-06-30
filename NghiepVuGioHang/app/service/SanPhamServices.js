 class SpService {
     getListSp() {
         return axios({
             method: "get",
             url: "https://62a2fa6121232ff9b214cbba.mockapi.io/Capstone",
             // responseType: 'stream'
         });
     }
     addSpAPI(food) {
         return axios({
             method: "post",
             url: "https://62a2fa6121232ff9b214cbba.mockapi.io/Capstone",
             data: food,
         });
     }
     getSpDetail(id) {
         return axios({
             method: "get",
             url: `https://62a2fa6121232ff9b214cbba.mockapi.io/Capstone/${id} `,
         });
     }
     updateSpAPI(id, food) {
         return axios({
             method: "put",
             url: `https://62a2fa6121232ff9b214cbba.mockapi.io/Capstone/${id} `,
             data: food
         });
     }
     deleteSp(id) {
         return axios({
             method: "delete",
             url: `https://62a2fa6121232ff9b214cbba.mockapi.io/Capstone/${id} `,
             // responseType: 'stream'
         });
     }
 }
 export default SpService