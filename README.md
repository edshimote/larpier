# ✦ KELKEL — Nosso Infinito

Presente de aniversário interativo para **Kelkel**, 06/11/2026. Feito com Next.js, TypeScript, Tailwind 4, Motion e Three.js.

## Rodar no computador

Instale **Node.js 20.9+**. Abra a pasta no VS Code e execute:

```bash
npm install
npm run dev
```

Abra **http://localhost:3000**. Para validar produção:

```bash
npm run typecheck
npm run build
```

## Conteúdo do site

1. **Sharingan do Sasuke:** olho SVG animado; clique três vezes para revelar a frase secreta. Botão abre o universo.
2. **Jujutsu Kaisen:** retrato de Kelkel, fundo cósmico em Three.js, GIF do Gojo, expansão interativa.
3. **Demon Slayer:** GIFs de Mitsuri e Tanjiro, sete fotos com zoom e dedicatórias.
4. **Your Name:** GIF de Taki e Mitsuha, céu de estrelas, sete estrelas que formam a constelação.
5. **One Piece:** mapa clicável com quatro ilhas; três ilhas visitadas desbloqueiam o tesouro com GIF do Luffy.
6. **Final:** contagem até o aniversário, foto de vocês, carta romântica, confete.

A navegação funciona pelo menu, rolagem e botões. No celular, o menu vira um botão. Animações são reduzidas se o navegador solicitar menos movimento.

## Personalizar textos e fotos

Edite **`src/data/site.ts`** para mudar: nome, data, mensagens, legendas das fotos, carta final e GIFs. As sete fotos que você enviou já estão em **`public/photos/1.webp`** até **`7.webp`** (cópias convertidas do ZIP original).

## Música de fundo

- `public/audio/romantic.mp3`: **Retro Emporium — The Reytons**, única faixa de áudio do site, tocando em loop. Começa quando a visitante clica em **DESPERTAR NOSSO INFINITO** ou **PULAR ABERTURA**, com um breve fade-in. O botão de música permite pausar ou retomar.
- O Sharingan e as demais interações visuais não reproduzem efeitos sonoros.

Navegadores exigem interação para iniciar som. Verifique os direitos de reprodução da faixa antes da publicação.

## GIFs e fontes

Os GIFs estão **integrados como URLs externas**, não como cópias no ZIP: precisam de internet e podem deixar de funcionar caso o Tenor mude os links. O site inclui alternativas visuais CSS. URLs diretas em `src/data/site.ts`:

| Cena | Fonte original |
|---|---|
| Sasuke Sharingan | https://tenor.com/view/sasuke-sharingan-gif-5322036 |
| Sasuke Mangekyō | https://tenor.com/view/sasuke-mangekyou-sharingan-gif-14884501 |
| Gojo Domain | https://tenor.com/view/jujutsu-kaisen-satoru-gojo-domain-expansion-gif-19189720 |
| Gojo Infinito | https://tenor.com/view/gojo-infinity-gif-3208616838225963173 |
| Mitsuri | https://tenor.com/view/love-breathing-mitsuri-demon-slayer-demon-slayer-mitsuri-second-form-love-magic-gif-8864902031187457001 |
| Tanjiro | https://tenor.com/view/tanjiro-hinokami-kagura-gif-24878132 |
| Your Name | https://tenor.com/view/kimi-no-na-wa-your-name-mitsuha-miyamizu-taki-tachibana-anime-gif-25060484 |
| Luffy Gear 5 | https://tenor.com/view/luffy-gear-5-gif-15935145260970590707 |

**Direitos autorais:** GIFs de obras de anime normalmente pertencem aos respectivos titulares. A disponibilidade no Tenor não constitui licença para republicá-los. Antes de disponibilizar o site publicamente, confirme permissões ou substitua por criações próprias/autorizadas.

**Privacidade:** fotos em `public/photos/` são públicas para qualquer pessoa que tenha o endereço de cada arquivo quando o site é publicado. Um link secreto, `robots: noindex` ou uma senha implementada só no navegador não protegem as fotos. Se quiser mantê-las privadas, configure autenticação real no servidor / proteção do site antes de publicar.

## Publicar na Vercel

1. Suba esta pasta para um repositório **privado** no GitHub (sem os arquivos originais além do que pretende colocar na web).
2. Importe o projeto na Vercel (Framework: Next.js, padrão).
3. Configure controle de acesso apropriado **antes** de divulgar, se necessário.
4. Envie o link para ela no aniversário. ♡

## Performance

- Fotos convertidas para WebP e carregadas pelo componente Image do Next.js.
- Fundo Three.js inicializa somente quando a seção fica visível; interrompe e descarta recursos na desmontagem.
- GIFs carregam com `loading="lazy"`, fontes de sistema, e CSS como fallback.
- Motion respeita preferência de movimento reduzido.

**Não há backend, login ou banco de dados.**
