// 商店地区与界面语言分开；所有入口始终指向同一个 App ID。
window.CoworkAppStore = {
  url: function (lang) {
    return 'https://apps.apple.com/' + (lang === 'zh' ? 'cn' : 'us') +
      '/app/cowork-agent/id6816690478' + (lang === 'zh' ? '?l=zh-Hans-CN' : '?l=en-US');
  },
  apply: function (lang) {
    var url = this.url(lang);
    document.querySelectorAll('[data-app-store]').forEach(function (el) { el.href = url; });
  },
  isAppleMobile: function () {
    // iPad 的桌面浏览模式会报告 Mac 平台，需同时检查触控能力。
    return /iPhone|iPad|iPod/i.test(navigator.userAgent || '') ||
      (/Mac/i.test(navigator.platform || '') && navigator.maxTouchPoints > 1);
  }
};
