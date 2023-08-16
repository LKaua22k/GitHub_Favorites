// Class para coletar os dados

export class Favorites {
    constructor(root){
        this.root = document.querySelector(root)
        
        this.load()
    }
    

    load(){
        this.entrises = [
            {
                login: "Lkaua22k",
                name: "Kauã Aaujo",
                public_repos: '32',
                followers: '1'
            },
            {
                login: "diego3g",
                name: "Diego Fernades",
                public_repos: '100',
                followers: '400'
            }
        ]

    }
}

//Class para visualizar no html

export class FavoritesView extends Favorites {
    constructor(root){
        super(root)
        
        this.tbody = this.root.querySelector('table tbody')


        this.update()
    }

    update(){
        this.RemoveAllTr()
        
        this.entrises.forEach((user) => {
            const row = this.CreateRow()
            row.querySelector('.users img').src = `https://github.com/${user.login}.png`
            row.querySelector('.users img').alt = `Imagem de ${user.name}`
            row.querySelector('.users a p').textContent = `${user.login}`   
            row.querySelector('.users a span').textContent = `${user.name}`   
            row.querySelector('.Repositoris').textContent = user.public_repos
            row.querySelector('.Followes').textContent = user.followers
            this.tbody.append(row)
        })
    }

    CreateRow(){
        const tr = document.createElement('tr')

        tr.innerHTML = `
                    <td class="users">
                        <img src="https://github.com/lkaua22k.png" alt="Imagem do Kauça" srcset="">

                        <a href="https://github.com/lkaua22k" target="_blank">
                            <span>Kauã Araujo</span>
                            <p>lkaua22k</p>
                        </a>
                    </td>

                    <td class="Repositoris">
                        36
                    </td>
                    <td class="Followes">0</td>
                    
                    <td>
                        <button>&times;</button>
                    </td>
                </tr>
        `
        return tr
    }

    RemoveAllTr(){        
        this.tbody.querySelectorAll('tr').forEach((tr) => {
            tr.remove()            
        });

        
    }
}