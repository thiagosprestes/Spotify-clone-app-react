![Spotify clone with react](spotify-clone-app-screenshots.jpg)

## Spotify clone app

Link da aplicação rodando no netlify: https://tsprestes-spotifycloneapp.netlify.com

## Sobre o projeto

Um clone do spotify com algumas modificações visuais pequenas que em minha opinião melhoram a usabilidade.

Este projeto faz parte do meu potfólio pessoal, qualquer feedback sobre estrutura, código ou funcionalidades que podem melhorar o projeto serão bem vindos.

Sinta-se livre para dar um fork, ou enviar um pull request, você pode usar este projeto para estudar ou fazer melhorias!

### Observações

1 - Existem algums pequenos detalhes em relação a responsividade que ainda não foram corrigidos, mas que não atrapalham em nada a experiênica do usuário.

2 - Por enquanto só é possível escutar um preview de apenas 30 segundos das músicas, já que a API disponibilizada pelo Spotify só permite que usuários premium tenham total acesso as informações do player.

### Funcionalidades

* Consultar as ultimas músicas escutadas por você

* Consultar as músicas e artistas mais escutadas por você em todos os tempos ou nos últimos 6 meses ou 4 semanas

* Consultar seus artistas favoritos

* Realizar buscas por artistas, álbuns ou playlists

* Consultar as músicas que você curtiu

* Consultar suas playlists

* Consultar seus artistas e álbuns salvos

* Adicionar ou remover músicas, artistas, playlists, e álbuns da sua biblioteca

### Desenvolvido utilizando

* [React](https://pt-br.reactjs.org/) - Single page application
* [React Router](https://reacttraining.com/react-router/web/guides/quick-start) - Controle de rotas
* [Redux](https://redux.js.org/) - Controle de estado da track atual
* [React redux](https://react-redux.js.org/) - Controle de estado da track atual
* [React audio player](https://www.npmjs.com/package/react-h5-audio-player) - Player de áudio
* [React icons](https://react-icons.netlify.com/#/) - Ícones da aplicação
* [Axios](https://github.com/axios/axios) - Comunicação com a API do Spotify

### Rodando app localmente

```javascript

//Frontend

cd my-app
yarn start

//Backend

//Renomeie o arquivo .env-example como .env e preencha as váriaveis client_id e client_secret com as chaves fornecidas pelo spotify após criar um app em: https://developer.spotify.com/dashboard/applications 
//Após isso dentro da dashboard do spotify clique em "Edit settings" em redirect URIs adicione o seguinte link: http://localhost:8888/callback
//Após isso execute os seguintes comandos

cd auth-api
npm run dev
```
