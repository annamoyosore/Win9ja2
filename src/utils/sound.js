const sounds = {
  play: "https://actions.google.com/sounds/v1/cartoon/pop.ogg",
  draw: "https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg",
  win: "https://actions.google.com/sounds/v1/cartoon/concussive_hit_guitar_boing.ogg",
  alert: "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg"
};

export function playSound(type) {
  try {
    const audio = new Audio(sounds[type]);
    audio.volume = 0.7;
    audio.play().catch(() => {});
  } catch (e) {}
}