const form = document.querySelector("#match-form");
const result = document.querySelector("#result");
const again = document.querySelector("#again");

const matches = [
  {
    name: "Александра", date: "14 февраля", symbol: "☾", card: "THE MOON",
    description: "Между вами может возникнуть тихое, почти магическое взаимопонимание. Прислушивайся к интуиции — и не забывай делать первый шаг."
  },
  {
    name: "Алиса", date: "21 апреля", symbol: "✦", card: "THE STAR",
    description: "Карты обещают лёгкость, общие мечты и разговоры до глубокой ночи. Возможно, самое интересное знакомство ещё впереди."
  },
  {
    name: "Маргарита", date: "9 марта", symbol: "♡", card: "THE LOVERS",
    description: "Карты намекают на яркую искру, чувство юмора и удивительно тёплую связь. Главное — быть собой и не забывать про искренность."
  },
  {
    name: "Виктория", date: "17 августа", symbol: "☼", card: "THE SUN",
    description: "Вас может объединить энергия, спонтанные приключения и умение поддержать друг друга. Вместе скучно точно не будет."
  },
  {
    name: "Полина", date: "2 ноября", symbol: "♜", card: "THE EMPRESS",
    description: "Это союз заботы и любопытства: вы способны вдохновлять друг друга и находить уют даже в самых обычных днях."
  },
  {
    name: "Ева", date: "30 июня", symbol: "✧", card: "THE WORLD",
    description: "Возможно, вас ждёт история, в которой будет много открытий, неожиданных совпадений и поводов улыбаться."
  }
];

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#name").value.trim();
  const birthday = document.querySelector("#birthday").value;
  if (!name || !birthday) return;

  // Сравниваем имя без учёта регистра, а дату — только по дню и месяцу.
  const normalizedName = name.toLocaleLowerCase("ru-RU");
  const [, month, day] = birthday.split("-"); // формат date: YYYY-MM-DD
  const isArsenSpecial = normalizedName === "арсен" && month === "06" && day === "08";
  const isMargaritaSpecial = normalizedName === "маргарита" && month === "03" && day === "09";

  let match;
  if (isArsenSpecial || isMargaritaSpecial) {
    match = {
      name: isArsenSpecial ? "Маргарита" : "Арсен",
      date: isArsenSpecial ? "9 марта" : "8 июня",
      symbol: "♡",
      card: "THE LOVERS",
      description: isArsenSpecial
        ? "Звёзды сошлись не случайно: твоё имя и дата рождения открыли особый расклад. Карты выбрали Маргариту — родившуюся 9 марта. Совпадение? Решать тебе 😉"
        : "Звёзды сошлись не случайно: карты выбрали Арсена — родившегося 8 июня. Возможно, судьба приготовила тебе особенный сюрприз 😉"
    };
  } else {
    const otherMatches = matches.filter(
      item => !(item.name === "Маргарита" && item.date === "9 марта")
    );
    match = otherMatches[
      Math.floor(Math.random() * otherMatches.length)
    ];
  }

  document.querySelector("#result-heading").textContent = `Расклад для ${name}`;
  document.querySelector("#match-name").textContent = match.name;
  document.querySelector("#match-date").textContent = match.date;
  document.querySelector("#card-symbol").textContent = match.symbol;
  document.querySelector("#card-name").textContent = match.card;
  document.querySelector("#match-description").textContent = match.description;

  result.hidden = false;
  result.scrollIntoView({ behavior: "smooth", block: "center" });
});

again.addEventListener("click", () => {
  result.hidden = true;
  document.querySelector("#name").focus();
});
