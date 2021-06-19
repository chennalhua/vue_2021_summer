export default{
    props:['products','loadingStatus'],
    template:`
    <ul class="product-list row p-0">
        <li class="card col-md-6 col-lg-4 px-2 mb-4 border-0"  v-for="(item) in products" :key="item.id">
            <img :src="item.imageUrl" class="card-img-top" :alt="item.title" style=" height: 280px; object-fit: cover;">
        <div class="card-body">
            <h5 class="card-title text-third">{{item.title}}</h5>
            <div class="d-flex justify-content-between mt-4">
                <del class="text-secondary">原價：{{item.origin_price}}</del>
                <p class="h5 text-danger">特價：{{item.price}}</p>
            </div>
        </div>
        <div class="card-footer bg-transparent border-0 d-flex justify-content-between align-items-center">
            <!--loading icon-->
            <button v-if="loadingStatus.loadingItem === item.id" type="button" class="btn btn-primary text-light" @click.prevent="$emit('addCart',item.id)" :disabled="loadingStatus.loadingItem === item.id">
            <div class="spinner-border text-light spinner-border-sm me-2" role="status"><span class="visually-hidden">Loading...</span>
            </div>加入購物車</button>
            <!--cart icon-->
            <button v-else type="button" class="btn btn-primary text-light" @click.prevent="$emit('addCart',item.id)"><i class="bi bi-cart-plus-fill me-2" ></i>加入購物車</button>
            <!--loading-->
            <div class="spinner-border text-third spinner-border-sm me-2" role="status" v-if="loadingStatus.loadingItem === item.title"><span class="visually-hidden">Loading...</span>
            </div>
            <!--info icon-->
            <a href="#" title="查看更多" v-else><i class="bi bi-info-circle-fill text-third h5" @click.prevent="$emit('clickModal',item)" ></i></a>
            
        </div>
        </li>  
    </ul>
`,
}