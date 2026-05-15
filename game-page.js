(function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const games = window.GAMES || {};
  const game = id ? games[id] : null;

  const root = document.getElementById("game-detail-root");
  const missing = document.getElementById("game-detail-missing");

  if (!root || !missing) return;

  if (!game) {
    root.hidden = true;
    missing.hidden = false;
    document.title = "Игра не найдена | GameDesign Hub";
    return;
  }

  missing.hidden = true;
  root.hidden = false;

  const titleEl = document.getElementById("game-detail-title");
  const genreEl = document.getElementById("game-detail-genre");
  const imgEl = document.getElementById("game-detail-cover");
  const hookEl = document.getElementById("game-detail-hook");
  const lessonEl = document.getElementById("game-detail-lesson");
  const introEl = document.getElementById("game-detail-intro");
  const systemsEl = document.getElementById("game-detail-systems");
  const takeawayEl = document.getElementById("game-detail-takeaway");
  const studioEl = document.getElementById("game-detail-studio");
  const publisherEl = document.getElementById("game-detail-publisher");
  const yearEl = document.getElementById("game-detail-year");
  const engineEl = document.getElementById("game-detail-engine");
  const engineRow = document.getElementById("game-meta-engine-row");
  const contextEl = document.getElementById("game-detail-context");

  const coverUrl = `https://cdn.cloudflare.steamstatic.com/steam/apps/${id}/header.jpg`;

  document.title = `${game.title} — разбор | GameDesign Hub`;
  if (titleEl) titleEl.textContent = game.title;
  if (genreEl) genreEl.textContent = game.genreRu;
  if (imgEl) {
    imgEl.src = coverUrl;
    imgEl.alt = `Официальная обложка ${game.title}`;
  }
  if (studioEl) studioEl.textContent = game.studio || "—";
  if (publisherEl) publisherEl.textContent = game.publisher || "—";
  if (yearEl) yearEl.textContent = game.year != null ? String(game.year) : "—";
  if (engineRow && engineEl) {
    if (game.engine) {
      engineEl.textContent = game.engine;
      engineRow.hidden = false;
    } else {
      engineRow.hidden = true;
      engineEl.textContent = "";
    }
  }
  if (contextEl) {
    contextEl.textContent = game.context || "";
    contextEl.hidden = !game.context;
  }
  if (hookEl) hookEl.textContent = game.hook;
  if (lessonEl) lessonEl.textContent = game.lesson;
  if (introEl) introEl.textContent = game.intro;
  if (systemsEl) systemsEl.textContent = game.systems;
  if (takeawayEl) takeawayEl.textContent = game.takeaway;

  const mediaMap = window.GAME_MEDIA || {};
  const media = id ? mediaMap[id] : null;
  const mediaSection = document.getElementById("game-detail-media-section");
  const shotsRow = document.getElementById("game-media-shots-row");
  const shot1 = document.getElementById("game-media-shot-1");
  const shot2 = document.getElementById("game-media-shot-2");
  const cap1 = document.getElementById("game-media-cap-1");
  const cap2 = document.getElementById("game-media-cap-2");

  function setupTrailer(wrapId, videoId, titleId, trailer) {
    const wrap = document.getElementById(wrapId);
    const video = document.getElementById(videoId);
    const title = document.getElementById(titleId);
    if (!wrap || !video || !title) return;
    const hasFile = trailer && (trailer.webm || trailer.mp4);
    if (!hasFile) {
      wrap.hidden = true;
      video.innerHTML = "";
      return;
    }
    wrap.hidden = false;
    title.textContent = trailer.name ? `Видео: ${trailer.name}` : "Трейлер Steam";
    video.innerHTML = "";
    if (trailer.webm) {
      const s = document.createElement("source");
      s.src = trailer.webm;
      s.type = "video/webm";
      video.appendChild(s);
    }
    if (trailer.mp4) {
      const s = document.createElement("source");
      s.src = trailer.mp4;
      s.type = "video/mp4";
      video.appendChild(s);
    }
  }

  if (mediaSection && shotsRow && shot1 && shot2) {
    const hasShots = Boolean(media && !media.error && media.shot1 && media.shot2);
    const hasAnyVideo =
      media &&
      !media.error &&
      ((media.trailer1 && (media.trailer1.webm || media.trailer1.mp4)) ||
        (media.trailer2 && (media.trailer2.webm || media.trailer2.mp4)));
    if (media && !media.error && (hasShots || hasAnyVideo)) {
      mediaSection.hidden = false;
      shotsRow.hidden = !hasShots;
      if (hasShots) {
        shot1.src = media.shot1;
        shot1.alt = `${game.title} — скриншот с витрины Steam`;
        shot2.src = media.shot2;
        shot2.alt = `${game.title} — скриншот с витрины Steam`;
        if (cap1) cap1.textContent = "Скриншот 1 (Steam)";
        if (cap2) cap2.textContent = "Скриншот 2 (Steam)";
      } else {
        shot1.removeAttribute("src");
        shot2.removeAttribute("src");
        if (cap1) cap1.textContent = "";
        if (cap2) cap2.textContent = "";
      }
      setupTrailer("game-video-wrap-1", "game-video-1", "game-video-title-1", media.trailer1);
      setupTrailer("game-video-wrap-2", "game-video-2", "game-video-title-2", media.trailer2);
    } else {
      mediaSection.hidden = true;
    }
  } else if (mediaSection) {
    mediaSection.hidden = true;
  }
})();
