export default{
    
    props:['tempProduct'],
    template:`<div class="modal fade" id="delProModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header bg-danger">
        <h5 class="modal-title text-light" id="delProModalLabel">刪除產品</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        是否刪除<slot name="pro-name">預設值</slot>商品刪除後將無法恢復！！！
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" @click="$emit('close-modal')">取消</button>
        <button type="button" class="btn btn-danger" @click="$emit('del-product',tempProduct)">確定</button>
        </div>
    </div>
    </div>
</div>`,
}