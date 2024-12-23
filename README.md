# sanctuary
sanctuary will be an open source project for the community

## Commits Rules
  git add <file/folder> <br />
  git commit -m "<icon - description>" <br />
  git remote add origin git@github.com:dyson-mori/sanctuary.git <br />
  git push -u origin <branch>

  https://github.com/iuricode/padroes-de-commits

  icons: <br />
    - ✏️ `:pencil2:` <br />
    - 📦 `:package:` add new package <br />
    - 🛠️	`:hammer_and_wrench:` <br />
    - 🧪 `:test_tube:` <br />
    - ✨ `:sparkles:` new feature <br />
    - ♻️ `:recycle:` refactor <br />
    - 💥 `:boom:` <br />
    - 🚧 `:construction:` <br />

## Front Deploy
  https://render.com/

## Docker
  docker images
  
  docker ps
  docker exec -it ######### sh

  docker compose up -d
  docker compose down && docker compose up --build -d

## Generate Key
  ssh-keygen -f ~/.ssh/id_rsa -y
  &&
  ssh-keygen -f ~/.ssh/id_rsa -y > ~/.ssh/id_rsa.pub