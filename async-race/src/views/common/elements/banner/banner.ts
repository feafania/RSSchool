import "./banner.css";

export default function showWinnerBanner(text: string) {
  const banner = document.createElement("div");
  banner.className = "banner";
  banner.textContent = text;

  document.body.append(banner);

  setTimeout(() => {
    banner.remove();
  }, 3000);
}
