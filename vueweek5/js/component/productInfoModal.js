export default{
    data(){
        return{
            tempProduct:{},
        }
    },
    watch:{
        product(){
            this.tempProduct = this.product
        }
    },
    props:['product'],
    template:`
<div class="modal fade" id="productInfoModal" tabindex="-1" aria-labelledby="productInfoModal" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">
        {{tempProduct.title}}
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
            <div class="col-md-6"><img :src="tempProduct.imageUrl" class="img-fluid"></div>
            <div class="col-md-6">
                <div class="badge rounded-pill bg-primary mb-3">{{tempProduct.category}}</div>
                <p>描述：{{tempProduct.description}}</p>
                <p>內容：{{tempProduct.content}}</p>
                <del>原價：{{tempProduct.origin_price}}</del>
                <h4>特價：{{tempProduct.price}}</h4>
                <div>
                
                </div>
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary text-light" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>`,
}