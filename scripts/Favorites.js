export class GithubUser {
    static search(username){
        const endPoint = `https://api.github.com/users/${username}`

        return fetch(endPoint).then(data => data.json()).then(({login,name,public_repos,followers}) => ({
            login,
            name,
            public_repos,
            followers
        }))
    }

}


// Class para coletar os dados

export class Favorites {
    constructor(root){
        this.root = document.querySelector(root)
        this.load()
        this.onadd()

        GithubUser.search('lkaua22k').then(user => console.log(user))
    }

    async add(username){
        const gitUser = await GithubUser.search(username)

        console.log(gitUser)
    }
    

    load(){
        this.entrises = JSON.parse(localStorage.getItem("@github-Favorites")) || []

        console.log(this.entrises)

    }

    delete(user){
         const filteredEntriss = this.entrises.filter(entry => entry.login != user.login)

         this.entrises = filteredEntriss
         this.update()
    }
}

//Class para visualizar no html

export class FavoritesView extends Favorites {
    constructor(root){
        super(root)
        
        this.tbody = this.root.querySelector('table tbody')


        this.update()
        this.onadd()
    }

    onadd(){
        const addbutton = this.root.querySelector(".search button")

        addbutton.addEventListener('click', () => {
            const { value } = this.root.querySelector(".search input")

            this.add(value)
        })
        
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
            row.querySelector('.remove').addEventListener('click', () => {
                const isOk = confirm('Certeza que quer deletar?')

                if(isOk){
                    this.delete(user)
                }
            })
            
            
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
                        <button class="remove">&times;</button>
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