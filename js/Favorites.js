import { GithubUser } from "./GithubUser.js"

export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root)

        this.tbody = this.root.querySelector('table tbody')

        this.load()
        this.onAdd()

        
    }

    load() {
        this.entries = JSON.parse(localStorage.getItem('@github-gitfav:')) || []
    }

    save() {
        localStorage.setItem('@github-gitfav:', JSON.stringify(this.entries))
    }

    async add(username) {
        try {

            const userExists = this.entries.find(entry => entry.login === username)

            if(userExists) {
                throw new Error('User already registered!')
            }

            const githubUser = await GithubUser.search(username)
            if(githubUser.login === undefined) {
                throw new Error('User not found!')
            }

            this.entries = [githubUser, ...this.entries]
            this.update()
            this.save()

        } catch(error) {
            alert(error.message)
        }
    }

    delete(user) {
        const filteredEntries = this.entries.filter(entry => entry.login !== user.login)

        this.entries = filteredEntries
        this.update()
        this.save()
    }
}

export class FavoritesView extends Favorites {
    constructor(root) {
        super(root)

        this.tbody = this.root.querySelector('table tbody')

        this.update()
        this.onAdd()
    }

    onAdd() {
        const addFavorite = this.root.querySelector('.search button')
        addFavorite.onclick = () => {
            const { value } = this.root.querySelector('.search input')

            this.add(value)
        }
    }

    update() {
        this.removeAllTr()
 
        this.entries.forEach(user => {
            const row = this.createRow()

            row.querySelector('.user img').src= `https://github.com/${user.login}.png`
            row.querySelector('.user img').alt= `Imagem de ${user.login}`
            row.querySelector('.user a').href = `https://github.com/${user.login}`
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