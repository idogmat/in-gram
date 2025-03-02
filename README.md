## 🚀 Backend

<details>
<summary style="cursor: pointer; color: #58a6ff; font-weight: bold; margin: 10px 0;">⚙️ Setup & Run</summary>
  🔒 <b>add env</b>
  <br>

    NODE_ENV=DEVELOPMENT
    APP_PORT=3003
    
  <br>
  🏃 <b>run dev</b>
  <br>

    yarn install
    yarn start:dev
    
</details>
<details>
<summary style="cursor: pointer; color: #58a6ff; font-weight: bold; margin: 10px 0;">🐳 Docker</summary>
  🔒<b>add env</b>

    NODE_ENV=DEVELOPMENT
    APP_PORT=3003

  🏃<b>run dev</b>

    yarn
    yarn docker:dev

  <img src="https://img.shields.io/badge/Node.js-22.x-green?logo=node.js" alt="Node Version"> <img src="https://img.shields.io/badge/Postgres-15-blue?logo=postgresql" alt="Postgres Version">
</details>


<details>
<summary style="cursor: pointer; color: #58a6ff; font-weight: bold; margin: 10px 0;">🗄️  PgAdmin Configuration</summary>

<div style="
  background:rgb(247, 247, 247);
  border-radius: 6px;
  padding: 15px;
  border: 1px solid rgb(155, 158, 161);
">

| **Parameter** | **Value**           |
|--------------|------------------------|
| `Host`         | `host.docker.internal` |
| `Database`     | `postgres`             |
| `Username`     | `postgres`             |
| `Password`     | `postgres`             |

</div>
</details>