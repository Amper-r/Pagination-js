class Pagination{
    countProductInPage = 5;
    countItemView = 1;
    indexSelectItem = 0;
    minCountPages = 6;

    constructor(func, prop){
        this.wraper = document.querySelector(prop.wraper);
        this.func = func;
        this.data = prop.data;
        this.minCountPages = prop.minCountPages ?? this.minCountPages;
        this.countProductInPage = prop.countProductInPage ?? this.countProductInPage;
        this.countItemView = prop.countItemView ?? this.countItemView;

        this.Render();
    }

    Render(){
        this.RenderFrame();

        this.paginationModule = this.wraper.querySelector(".pagination-module");
        this.paginationList = this.paginationModule.querySelector(".pagination-list");
        this.paginationBtnPrev = this.paginationModule.querySelector(".pagination-btn-prev");
        this.paginationBtnNext = this.paginationModule.querySelector(".pagination-btn-next");
        this.paginationContent = this.paginationModule.querySelector(".pagination-content");

        let pageBtnsStr = ""
        let countPages = Math.ceil(this.data.length / this.countProductInPage);
        for (let index = 0; index < countPages; index++) {
            let str;
            if(index == 0){
                str = `<li class="pagination-item first-item select" data-page="${index}"><a href="" class="pagination-link">${index + 1}</a></li>`;
            }
            else if (index == countPages - 1){
                str = `<li class="pagination-item last-item active" data-page="${index}"><a href="" class="pagination-link">${index + 1}</a></li>`
            }
            else{
                str = `<li class="pagination-item" data-page="${index}"><a href="" class="pagination-link">${index + 1}</a></li>`;
            }
            pageBtnsStr += str;
        }
        this.paginationList.insertAdjacentHTML("afterbegin", pageBtnsStr);

        this.paginationItems = this.paginationModule.querySelectorAll(".pagination-item");
        this.SelectItem();
        this.RenderData();

        this.paginationBtnNext.addEventListener("click", ()=>{
            if(this.indexSelectItem != this.paginationItems.length - 1){
                this.indexSelectItem++;
                this.SelectItem();
                this.RenderData(); 
            }
        });
        this.paginationBtnPrev.addEventListener("click", ()=>{
            if(this.indexSelectItem != 0){
                this.indexSelectItem--;
                this.SelectItem();
                this.RenderData();  
            }
        });

        this.paginationItems.forEach(paginationItem => {
            paginationItem.addEventListener("click", (e)=>{
                e.preventDefault();
                const index = Number(paginationItem.dataset.page);
                this.indexSelectItem = index;
                this.SelectItem();
                this.RenderData();
            });
        });

    }
    RenderFrame(){
        let temp = '<div class="pagination-module"><div class="pagination-wraper"><div class="pagination-btn-prev pagination-btn"><svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.1782 18.3738L9.17822 12.3738L15.1782 6.37378" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div><ul class="pagination-list"></ul><div class="pagination-btn-next pagination-btn"><svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18L15 12L9 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div></div><ul class="pagination-content"></ul></div>';
        this.wraper.insertAdjacentHTML("afterbegin", temp);
    }
    RenderData(){
        this.RemoveDataInPage();
        for (let index = this.indexSelectItem * this.countProductInPage; index < this.indexSelectItem * this.countProductInPage + this.countProductInPage && index < this.data.length; index++) {
            this.paginationContent.insertAdjacentHTML("beforeend", `<li>${this.func(this.data[index])}</li>`);
        }
    }
    RemoveDataInPage(){
        const items = this.paginationContent.querySelectorAll("li");
        items.forEach(item => {
            item.remove();
        });
    }
    SelectItem(){
        this.paginationList.querySelector(".select").classList.remove("select");
        this.paginationItems[this.indexSelectItem].classList.add("select");
    
        if(this.paginationItems.length > this.minCountPages){
            this.AddAllHidden();
            if(this.indexSelectItem == 0){
                this.paginationItems[this.indexSelectItem].classList.remove("hidden");
                for (let i = 1; i <= this.countItemView && this.indexSelectItem + this.countItemView < this.paginationItems.length - 1; i++) {
                    this.paginationItems[this.indexSelectItem + i].classList.remove("hidden");
                }
            }
            else if(this.indexSelectItem == this.paginationItems.length - 1){
                this.paginationItems[this.indexSelectItem].classList.remove("hidden");
                for (let i = 1; i <= this.countItemView && this.indexSelectItem > 0; i++) {
                    this.paginationItems[this.indexSelectItem - i].classList.remove("hidden");
                }
            }
            else if(this.indexSelectItem == this.paginationItems.length - this.countItemView){
                for (let i = 1; i <= this.countItemView && this.indexSelectItem + i < this.paginationItems.length - 1; i++) {
                    this.paginationItems[this.indexSelectItem + i].classList.remove("hidden");
                }
                this.paginationItems[this.indexSelectItem].classList.remove("hidden");
                for (let i = 1; i <= this.countItemView && this.indexSelectItem > 0; i++) {
                    this.paginationItems[this.indexSelectItem - i].classList.remove("hidden");
                }
            }
            else{
                this.paginationItems[this.indexSelectItem].classList.remove("hidden");
                for (let i = 1; i <= this.countItemView && this.indexSelectItem + i < this.paginationItems.length - 1; i++) {
                    this.paginationItems[this.indexSelectItem + i].classList.remove("hidden");
                }
                for (let i = 1; i <= this.countItemView && this.indexSelectItem - i > 0; i++) {
                    this.paginationItems[this.indexSelectItem - i].classList.remove("hidden");
                }
            }
    
            if(this.indexSelectItem >= this.paginationItems.length - this.countItemView - 2){
                this.paginationItems[this.paginationItems.length - 1].classList.remove("hidden");
                this.paginationItems[this.paginationItems.length - 1].classList.remove("active");
            }
            else{
                this.paginationItems[this.paginationItems.length - 1].classList.add("active");
            }
    
            if(this.indexSelectItem <= this.countItemView + 1){
                this.paginationItems[0].classList.remove("hidden");
                this.paginationItems[0].classList.remove("active");
            }
            else{
                this.paginationItems[0].classList.add("active");
            }
        }
        else{
            this.RemoveAllActive();
        }
    }
    RemoveAllActive(){
        this.paginationItems.forEach(paginationItem => {
            paginationItem.classList.remove("active");
        });
    }
    AddAllHidden(){
        this.paginationItems.forEach(paginationItem => {
            if(!paginationItem.classList.contains("active")){
                paginationItem.classList.add("hidden");
            }
        });
    }
}