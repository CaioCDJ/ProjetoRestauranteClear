
HTMLFormElement.prototype.save = function(){

    return new Promise((resolve,reject)=>{
        let form = this;

        form.addEventListener('submit', e=> {
    
            e.preventDefault();
            
            let formData = new FormData(form);
            
            fetch("/admin/menus",{
            
                method:form.method,
                body: formData
            
                })
            .then(response => response.json())
            .then(json=>{
                resolve(json)
            }).catch(err=>{
                reject(err);
            });
        });
    })
    
}