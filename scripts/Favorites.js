// Class para coletar os dados

export class Favorites {
    constructor(root){
        this.root = document.querySelector(root)
    }
    
}

//Class para visualizar no html

export class FavoritesView extends Favorites {
    constructor(root){
        super(root)
    
        this.update()
    }

    update(){
        this.RemoveAllTr()
    }

    RemoveAllTr(){
        const tbody = this.root.querySelector('table tbody')
        
        tbody.querySelectorAll('tr').forEach((tr) => {
            tr.remove()            
        });

        
    }
}