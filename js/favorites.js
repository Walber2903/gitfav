export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root)

        this.tbody = this.root.querySelector('table tbody')

        this.load()
    }

    load() {
        this.entries = JSON.parse(localStorage.getItem('@github-gitfav:')) || []

        /*this.entries = [{
            login: 'Walber2903',
            name: 'Walber Araujo',
            public_repos: '76',
            followers: '123'
        },
        {
            login: 'diego3g',
            name: 'Diego Fernandes',
            public_repos: '48',
            followers: '22503'
        }]*/
    }

    delete(user) {
        const filteredEntries = this.entries.filter(entry => entry.login !== user.login)

        this.entries = filteredEntries
        this.update()
    }
}

export class FavoritesView extends Favorites {
    constructor(root) {
        super(root)

        this.update()
    }

    update() {
        this.removeAllTr()
 
        this.entries.forEach(user => {
            const row = this.createRow()

            row.querySelector('.user img').src= `https://github.com/${user.login}.png`
            row.querySelector('.user img').alt= `Imagem de ${user.login}`
            row.querySelector('.user p').textContent = user.name
            row.querySelector('.user span').textContent = user.login
            row.querySelector('.repositories').textContent = user.public_repos
            row.querySelector('.followers').textContent = user.followers
            
            row.querySelector('.remove').onclick = () => {
                const isOk = confirm('Are you shure?')

                if(isOk) {
                    this.delete(user)
                }
            }

            this.tbody.append(row)
        })    
    }

    removeAllTr() {
        this.tbody.querySelectorAll('tr').forEach((tr) => {
            tr.remove()
        })
    }

    createRow() {
        const tr = document.createElement('tr')

        const content = `
            <td class="user">
                <img src="https://github.com/Walber2903.png" alt="Imagem de Walber">
                <a href="https://github.com/Walber2903" target="_blank">
                    <p>Walber Araujo</p>
                    <span>/Walber2903</span>
                </a>
            </td>
            <td class="repositories">
                21
            </td>
            <td class="followers">
                6
            </td>
            <td>
                <button class="remove">Remover</button>
            </td>
        
        `

        tr.innerHTML = content

        return tr
    }
}