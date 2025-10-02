// 图片懒加载, 使用 IntIntersectionObserver API

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img[src] = img[data - src];
        img.removeAttribute("data-src");

        observer.unobserve(img);
      }
    });
  },
  { rootMargin: "100px" }
);

const imgs = document.querySelectorAll("img[data-src]");
imgs.forEach((img) => observer.observe(img));
