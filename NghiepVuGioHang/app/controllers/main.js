import SanPham from "../models/SanPham.js";
import SpService from "../service/SanPhamServices.js";

let Spser = new SpService();
let showSpList = (SpList) => {
    let content = "";
    for (const index in SpList) {
        let { name, price, screen, backCamera, frontCamera, img, desc, type } =
        SpList[index];

        content += `
        
                    <div class="col-12 col-md-6 col-lg-4">
                        <div class="card cardPhone">
                        
                            <img class="img-fluid card__img" src="../../img/product1.png" alt="">
                            <div class="cardBody">
                                <div class="body__tren d-flex justify-content-sm-between mt-1 mr-3 ml-3 ">
                                    <div>
                                        <h3 id ="name">${name}</h3>
                                        <p>Accessories</p>
                                    </div>
                                    <div>
                                        <h3 id="price">${Number(price).toLocaleString()}</h3>
                                    </div>
                                </div>
                                <div class="card-body d-flex justify-content-between">
                                    <div class="cardPhone__rating">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                    </div>
                                    <div class="div">
                                        <button class="BTN-byNow">By now</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
        
        
        
        
        
        `;
    }
    document.querySelector(".product__content1").innerHTML = content;
};

let renderSpList = () => {
    let promise = Spser.getListSp();

    promise
        .then((result) => {
            console.log(result.data);
            showSpList(result.data);
        })
        .catch((err) => {
            console.log(err);
        });
};
renderSpList();