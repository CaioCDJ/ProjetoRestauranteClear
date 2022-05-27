class HcodeGrid{

    constructor(configs){

        configs.listeners = Object.assign({
            
            afterUpdateClick: e =>{
                $('#modal-update').modal('show'); 
            },
            afterDeleteClick:(e)=>{
                window.location.reload();

            },
            afterFormCreate:(e)=>{
                window.location.reload();
            },
            afterFormUpdate:(e)=>{
                window.location.reload();
            },
            afterFormCreateError:(e)=>{
                alert('Nao foi possivel enviar o formulário');
            },
            afterFormUpdateError:(e)=>{
                alert('Nao foi possivel enviar o formulário');

            }
        }, configs.listeners)

        this.configs = Object.assign({},{
            formCreate:'#modal-create form',
            formUpdate: '#modal-update form' ,
            btnUpdate: '.btn-update',
            btnDelete: '.btn-delete', 
            onUpdateLoad:(form,name,data)=>{

              let input = form.querySelector('[name='+ name+ ']');
              if(input) input.value = data[name];
            }
        }, configs);

        this.initButtons();
        this.initForms();

    }

    fireEvent(name,args){

        if(typeof this.configs.listeners[name] === 'function') this.configs.listeners[name].apply(this, args);
    }

    initForms(){

        this.formCreate = document.querySelector(this.configs.formCreate);

        this.formCreate.save().then(json=>{
        
          this.fireEvent('afterFormCreate');
        
        }).catch(err=>{
            this.fireEvent('afterFormCreateError');
        
        
        });
    
        // -- Update --
        this.formUpdate = document.querySelector(this.configs.formUpdate);
    
        this.formUpdate.save().then(json=>{
        
          this.fireEvent('afterFormUpdate');
        
        }).catch(err=>{
            
            this.fireEvent('afterFormUpdateError');
        });
    }

    initButtons(){

        // update
        [...document.querySelectorAll(this.configs.btnUpdate)].forEach(btn=>{


            btn.addEventListener('click', e=> {

        
              let tr = e.srcElement.parentElement.parentElement;
        
              let data = JSON.parse(tr.dataset.row);
        
              for(let name in data){
        
                this.configs.onUpdateLoad(this.formUpdate,name,data);

              }
              setInterval(()=>{
                this.fireEvent('afterUpdateClick');
              },100)
            });
          });
        
          // delete
          [...document.querySelectorAll(this.configs.btnDelete)].forEach(btn=>{
            
            btn.addEventListener('click',e=>{
        
                this.fireEvent('beforeDeleteClick');

              let tr = e.srcElement.parentElement.parentElement;
        
              let data = JSON.parse(tr.dataset.row);
                
              if(confirm(eval('`'+this.configs.deleteMsg  +'`') )){
        
                fetch(eval('`'+this.configs.deleteUrl  +'`') ,{
                  method: 'DELETE'
                })
                .then(response => response.json())
                .then(json=>{

                    this.fireEvent('afterDeleteClick');
                })
              }
        
            });
          });
    }
}